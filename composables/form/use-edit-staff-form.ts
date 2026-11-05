import { toTypedSchema } from "@vee-validate/zod";
import { useDebounce } from "@vueuse/core";
import { updateDoc } from "firebase/firestore";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";

import {
  DEBOUNCE_DEFAULT_TIME,
  IMAGES_STORAGE_PATH,
  SESSION_STORAGE_KEYS,
} from "~/lib/constants";
import { getDocRef } from "~/lib/firestore-model";
import {
  EDIT_STAFF_FORM_SCHEMA,
  STAFF_FORM_SCHEMA_KEYS,
  STAFF_TYPES_LIST,
} from "~/lib/schemas/form";

const validationSchema = toTypedSchema(EDIT_STAFF_FORM_SCHEMA);

const storedFormSchema = z
  .object({
    [STAFF_FORM_SCHEMA_KEYS.type]: z.enum(STAFF_TYPES_LIST),
    [STAFF_FORM_SCHEMA_KEYS.fullname]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.short_bio]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.bio]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.email]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.linkedin_url]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.slug]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.cv_url]: z.string(),
    [STAFF_FORM_SCHEMA_KEYS.pp_url]: z.string(),
  })
  .partial();

export function useEditStaffForm(id: Ref<string>) {
  const router = useRouter();
  const firestore = useFirestore();

  const docRef = getDocRef(firestore, "staff", id.value);
  const staff = useDocument(docRef);

  const form = useForm({
    validationSchema,
    validateOnMount: false,
  });

  const ppUploader = useUploader(IMAGES_STORAGE_PATH.PROFILE_PICTURE);
  const cvUploader = useUploader(IMAGES_STORAGE_PATH.CV);

  const values = useDebounce(form.controlledValues, DEBOUNCE_DEFAULT_TIME);

  watch(staff.data, (v) => {
    if (!v) {
      return;
    }

    form.setValues({
      ...v,
      pp_url: v.profile_picture_url,
      cv_url: v.cv_url,
    });
  });

  onMounted(() => {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEYS.EDIT_STAFF_FORM);

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
        SESSION_STORAGE_KEYS.EDIT_STAFF_FORM,
        JSON.stringify(v)
      );
    },
    {
      deep: true,
    }
  );

  function resetForm() {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.EDIT_STAFF_FORM);
    form.resetForm();
  }

  function resetFields() {
    form.handleReset();
    form.resetForm();
  }

  const onSubmit = form.handleSubmit(async (v) => {
    toast.info("Harap tunggu profil sedang diperbarui...", { duration: 3000 });

    try {
      await updateDoc(docRef, {
        type: v.type,
        fullname: v.fullname,
        slug: v.slug,
        email: v.email,
        linkedin_url: v.linkedin_url,
        short_bio: v.short_bio,
        bio: v.bio,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch {
      toast.error("Gagal memperbarui profil");

      return;
    }

    toast.success("Profil sukses diperbarui");
    resetForm();

    void router.replace("/dashboard/profiles");
  });

  async function updateProfilePicture(file: File) {
    const res = await ppUploader.upload(file);

    if (res === "") {
      toast.error("Gagal memperbarui foto profil");

      return;
    }

    const res2 = await updateDoc(docRef, {
      profile_picture_url: res,
    })
      .then(() => true)
      .catch(() => false);

    if (!res2) {
      toast.error("Gagal memperbarui foto profil");

      return;
    }

    toast.success("Foto profil sukses diperbarui");
  }

  async function updateCV(file: File) {
    const res = await cvUploader.upload(file);

    if (res === "") {
      toast.error("Gagal memperbarui CV");

      return;
    }

    const res2 = await updateDoc(docRef, {
      cv_url: res,
    })
      .then(() => true)
      .catch(() => false);

    if (!res2) {
      toast.error("Gagal memperbarui CV");

      return;
    }

    toast.success("CV sukses diperbarui");
  }

  return {
    form,
    resetForm,
    resetFields,
    onSubmit,
    updateProfilePicture,
    updateCV,
    ppURL: staff.value?.profile_picture_url,
    cvURL: staff.value?.cv_url,
  };
}
