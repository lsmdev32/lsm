import { toTypedSchema } from "@vee-validate/zod";
import { useDebounce } from "@vueuse/core";
import { addDoc, getDocs, limit, query, where } from "firebase/firestore";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";

import { useUploader } from "~/composables/firebase/use-uploader";
import {
  DEBOUNCE_DEFAULT_TIME,
  IMAGES_STORAGE_PATH,
  SESSION_STORAGE_KEYS,
} from "~/lib/constants";
import { getCollectionRef } from "~/lib/firestore-model";
import {
  CREATE_STAFF_FORM_SCHEMA,
  STAFF_FORM_SCHEMA_KEYS,
  STAFF_TYPES_LIST,
} from "~/lib/schemas/form";

const validationSchema = toTypedSchema(CREATE_STAFF_FORM_SCHEMA);

const storedFormSchema = z
  .object({
    [STAFF_FORM_SCHEMA_KEYS.profile_picture]: z.custom<File>(),
    [STAFF_FORM_SCHEMA_KEYS.type]: z.enum(STAFF_TYPES_LIST),
    [STAFF_FORM_SCHEMA_KEYS.fullname]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.short_bio]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.bio]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.email]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.linkedin_url]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.slug]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.cv]: z.custom<File>(),
  })
  .partial();

export function useCreateStaffForm() {
  const form = useForm({
    validationSchema,
    validateOnMount: false,
  });

  const firestore = useFirestore();
  const router = useRouter();
  const values = useDebounce(form.controlledValues, DEBOUNCE_DEFAULT_TIME);
  const ppUploader = useUploader(IMAGES_STORAGE_PATH.PROFILE_PICTURE);
  const cvUploader = useUploader(IMAGES_STORAGE_PATH.CV);

  onMounted(() => {
    const saved = sessionStorage.getItem(
      SESSION_STORAGE_KEYS.CREATE_STAFF_FORM
    );

    if (saved === null || saved === "") {
      return;
    }

    const stored: unknown = JSON.parse(saved);
    const parsed = storedFormSchema.safeParse(stored);

    if (!parsed.success) {
      return;
    }

    form.setValues(parsed.data);
  });

  watch(
    values,
    (v) => {
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.CREATE_STAFF_FORM,
        JSON.stringify(v)
      );
    },
    {
      deep: true,
    }
  );

  watch(
    () => values.value.fullname,
    (v) => {
      if (v === undefined || v === "") {
        form.resetField(STAFF_FORM_SCHEMA_KEYS.slug);

        return;
      }

      const slug = v
        .toLowerCase()
        .replaceAll(/[^a-z0-9]+/gu, "-")
        .replaceAll(/^-|-$/gu, "");

      form.setFieldValue(STAFF_FORM_SCHEMA_KEYS.slug, slug);
    }
  );

  function resetForm() {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.CREATE_STAFF_FORM);
    form.resetForm();
  }

  function resetFields() {
    form.handleReset();
    form.resetForm();
  }

  const onSubmit = form.handleSubmit(async (v) => {
    toast.info("Mengupload file...");

    const res = await Promise.all([
      ppUploader.upload(v.profile_picture),
      cvUploader.upload(v.cv),
    ]);

    const success = res.every((p) => !!p);

    if (!success) {
      toast.error("Gagal mengupload file");

      return;
    }

    const [profilePictureURL, cvURL] = res;

    const collectionRef = getCollectionRef(firestore, "staff");

    const duplicateSlugQuery = query(
      collectionRef,
      where("slug", "==", v.slug),
      limit(1)
    );

    const docs = await getDocs(duplicateSlugQuery);

    if (!docs.empty) {
      toast.error("Harap gunakan nama lain, nama ini sudah digunakan");

      return;
    }

    toast.info("Harap tunggu profil sedang dibuat...", { duration: 3000 });

    try {
      await addDoc(collectionRef, {
        type: v.type,
        fullname: v.fullname,
        slug: v.slug,
        email: v.email,
        linkedin_url: v.linkedin_url,
        short_bio: v.short_bio,
        bio: v.bio,
        cv_url: cvURL,
        profile_picture_url: profilePictureURL,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch {
      toast.error("Gagal membuat profil");

      return;
    }

    toast.success("Profil sukses dibuat");
    resetForm();

    void router.replace("/dashboard/profiles");
  });

  return {
    form,
    resetForm,
    resetFields,
    onSubmit,
  };
}
