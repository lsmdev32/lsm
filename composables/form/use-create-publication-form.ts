import { useDebounce } from "@vueuse/core";
import { query, getDocs, addDoc, where, limit } from "firebase/firestore";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";

import {
  DEBOUNCE_DEFAULT_TIME,
  IMAGES_STORAGE_PATH,
  SESSION_STORAGE_KEYS,
} from "~/lib/constants";
import { getPublicationCollectionRef } from "~/lib/firestore-model";
import {
  CONTENT_FORM_SCHEMA_KEYS,
  CONTENT_FORM_STATUS,
  CONTENT_FORM_TYPE,
  validationSchemas,
} from "~/lib/schemas/form";

const storedFormSchema = z
  .object({
    [CONTENT_FORM_SCHEMA_KEYS.type]: z.literal(CONTENT_FORM_TYPE.publication),
    [CONTENT_FORM_SCHEMA_KEYS.title]: z.string(),
    [CONTENT_FORM_SCHEMA_KEYS.slug]: z.string(),
    [CONTENT_FORM_SCHEMA_KEYS.category]: z.string(),
    [CONTENT_FORM_SCHEMA_KEYS.author]: z.string().nullish(),
    [CONTENT_FORM_SCHEMA_KEYS.content]: z.string(),
    [CONTENT_FORM_SCHEMA_KEYS.cover_image]: z.custom<File | null>(),
    [CONTENT_FORM_SCHEMA_KEYS.status]: z.enum([
      CONTENT_FORM_STATUS.not_published,
      CONTENT_FORM_STATUS.publish,
    ]),
    [CONTENT_FORM_SCHEMA_KEYS.published_at]: z.coerce.date(),
    [CONTENT_FORM_SCHEMA_KEYS.tags]: z.array(z.string()),
    publication: z.custom<File | null>(),
  })
  .partial();

export function useCreatePublicationForm() {
  const form = useForm({
    validationSchema: validationSchemas.createPublicationForm,
    initialValues: {
      type: CONTENT_FORM_TYPE.publication,
      status: CONTENT_FORM_STATUS.not_published,
      published_at: new Date(),
      tags: [],
    },
  });

  const { isSubmitting } = form;

  const firestore = useFirestore();
  const router = useRouter();
  const values = useDebounce(form.controlledValues, DEBOUNCE_DEFAULT_TIME);
  const coverUploader = useUploader(IMAGES_STORAGE_PATH.PUBLICATION_IMAGES);
  const publicationUploader = useUploader(IMAGES_STORAGE_PATH.PUBLICATIONS);

  onMounted(() => {
    const saved = sessionStorage.getItem(
      SESSION_STORAGE_KEYS.CREATE_PUBLICATION_FORM
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
        SESSION_STORAGE_KEYS.CREATE_PUBLICATION_FORM,
        JSON.stringify(v)
      );
    },
    {
      deep: true,
    }
  );

  watch(
    () => values.value.title,
    (v) => {
      if (v === undefined || v === "") {
        form.resetField(CONTENT_FORM_SCHEMA_KEYS.slug);

        return;
      }

      const slug = v
        .toLowerCase()
        .replaceAll(/[^a-z0-9]+/gu, "-")
        .replaceAll(/^-|-$/gu, "");

      form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.slug, slug);
    }
  );

  function resetForm() {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.CREATE_PUBLICATION_FORM);
    form.resetForm();
  }

  function resetFields() {
    form.handleReset();
    form.resetForm();
  }

  const onSubmit = form.handleSubmit(async (v) => {
    toast.info("Mengupload file...", { duration: 3000 });

    const colRef = getPublicationCollectionRef(firestore);

    const duplicateSlugQuery = query(
      colRef,
      where("slug", "==", v.slug),
      limit(1)
    );

    const docs = await getDocs(duplicateSlugQuery);

    if (!docs.empty) {
      toast.error("Harap gunakan judul lain, judul ini sudah digunakan");

      return;
    }

    let coverImageURL: string | null = null;

    if (v.cover_image !== null && v.cover_image !== undefined) {
      coverImageURL = await coverUploader.upload(v.cover_image);

      if (coverImageURL === "") {
        toast.error("Gagal mengupload gambar sampul");

        return;
      }
    }

    let publicationURL = "";

    if (v.publication !== null && v.publication !== undefined) {
      publicationURL = await publicationUploader.upload(v.publication);

      if (publicationURL === "") {
        toast.error("Gagal mengupload publikasi");

        return;
      }
    }

    toast.info("Harap tunggu publikasi sedang dibuat...");

    try {
      await addDoc(colRef, {
        type: v.type,
        cover_image_url: coverImageURL ?? null,
        title: v.title,
        content: v.content,
        category_id: v.category,
        author_id: v.author ?? null,
        slug: v.slug,
        status: v.status,
        published_at: v.published_at,
        tags: v.tags,
        publication: publicationURL,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch {
      toast.error("Gagal membuat publikasi");

      return;
    }

    toast.success("Publikasi sukses dibuat");
    resetForm();
    void router.replace("/dashboard/publications");
  });

  async function saveAsDraft() {
    form.setFieldValue(
      CONTENT_FORM_SCHEMA_KEYS.status,
      CONTENT_FORM_STATUS.not_published
    );
    await onSubmit();
  }

  async function saveAsPublished() {
    form.setFieldValue(
      CONTENT_FORM_SCHEMA_KEYS.status,
      CONTENT_FORM_STATUS.publish
    );
    await onSubmit();
  }

  async function removeCoverImage() {
    form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.cover_image, null);
  }

  return {
    form,
    isSubmitting,
    values,
    onSubmit,
    resetForm,
    resetFields,
    saveAsDraft,
    saveAsPublished,
    removeCoverImage,
  };
}
