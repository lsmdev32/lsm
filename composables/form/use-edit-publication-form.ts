import { useDebounce } from "@vueuse/core";
import { updateDoc } from "firebase/firestore";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

import {
  DEBOUNCE_DEFAULT_TIME,
  IMAGES_STORAGE_PATH,
  SESSION_STORAGE_KEYS,
} from "~/lib/constants";
import { getPublicationDocRef } from "~/lib/firestore-model";
import {
  validationSchemas,
  CONTENT_FORM_TYPE,
  CONTENT_FORM_SCHEMA_KEYS,
  CONTENT_FORM_STATUS,
} from "~/lib/schemas/form";

export function useEditPublicationForm(id: string) {
  const form = useForm({
    validationSchema: validationSchemas.editPublicationForm,
    initialValues: {
      type: CONTENT_FORM_TYPE.publication,
    },
  });

  const { isSubmitting } = form;

  const firestore = useFirestore();
  const router = useRouter();

  const publicationDocRef = getPublicationDocRef(firestore, id);
  const publication = useDocument(publicationDocRef);

  const values = useDebounce(form.controlledValues, DEBOUNCE_DEFAULT_TIME);
  const coverUploader = useUploader(IMAGES_STORAGE_PATH.PUBLICATION_IMAGES);
  const publicationUploader = useUploader(IMAGES_STORAGE_PATH.PUBLICATIONS);

  watch(publication.data, (v) => {
    if (!v) {
      return;
    }

    form.setValues({
      title: v.title,
      content: v.content,
      slug: v.slug,
      category: v.category_id,
      author: v.author_id ?? null,
      status: v.status,
      image_url: v.cover_image_url ?? undefined,
      // @ts-expect-error - assuming v.published_at is a Firestore Timestamp
      published_at: v.published_at
        ? new Date(v.published_at.seconds * 1000)
        : undefined,
      tags: v.tags,
      type: CONTENT_FORM_TYPE.publication,
      publication_url: v.publication,
    });
  });

  onMounted(() => {
    const saved = sessionStorage.getItem(
      SESSION_STORAGE_KEYS.EDIT_PUBLICATION_FORM
    );

    if (!saved) {
      return;
    }

    const parsed = JSON.parse(saved);
    form.setValues(parsed);
  });

  watch(
    values,
    (v) => {
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.EDIT_PUBLICATION_FORM,
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
      if (!v) {
        form.resetField(CONTENT_FORM_SCHEMA_KEYS.slug);

        return;
      }

      const slug = v
        .toLowerCase()
        .replaceAll(/[^a-z0-9]+/g, "-")
        .replaceAll(/^-|-$/g, "");

      form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.slug, slug);
    }
  );

  function resetForm() {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.EDIT_PUBLICATION_FORM);
    form.resetForm();
  }

  function resetFields() {
    form.handleReset();
    form.resetForm();
  }

  const onSubmit = form.handleSubmit(async (v) => {
    toast.info("Harap tunggu publikasi sedang diperbarui...");

    try {
      await updateDoc(publicationDocRef, {
        type: v.type,
        cover_image_url: v.image_url,
        title: v.title,
        content: v.content,
        category_id: v.category,
        author_id: v.author ?? null,
        slug: v.slug,
        status: v.status,
        published_at: v.published_at,
        tags: v.tags,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch {
      toast.error("Gagal memperbarui publikasi");

      return;
    }

    toast.success("Publikasi sukses diperbarui");
    resetForm();
    router.replace("/dashboard/publications");
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

    if (!form.values.published_at) {
      form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.published_at, new Date());
    }

    await onSubmit();
  }

  async function uploadCoverImage(file: File) {
    const url = await coverUploader.upload(file);

    if (!url) {
      toast.error("Gagal mengupload gambar sampul");

      return;
    }

    await updateDoc(publicationDocRef, {
      cover_image_url: url,
    }).catch(() => {
      toast.error("Gagal memperbarui gambar sampul");
    });
  }

  async function uploadPublication(file: File) {
    if (!file) {
      toast.error("File publikasi tidak boleh kosong");

      return;
    }

    if (!file.type.includes("pdf")) {
      toast.error("File publikasi harus berupa PDF");

      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      // 20MB
      toast.error("Ukuran file publikasi maksimal 20MB");

      return;
    }

    const url = await publicationUploader.upload(file);

    if (!url) {
      toast.error("Gagal mengupload file publikasi");

      return;
    }

    await updateDoc(publicationDocRef, {
      publication: url,
    })
      .then(() => {
        toast.success("File publikasi berhasil diperbarui");
      })
      .catch(() => {
        toast.error("Gagal memperbarui file publikasi");
      });
  }

  async function removeCoverImage() {
    await updateDoc(publicationDocRef, {
      cover_image_url: null,
    })
      .then(() => {
        toast.success("Gambar sampul berhasil dihapus");
      })
      .catch(() => {
        toast.error("Gagal menghapus gambar sampul");
      });
  }

  return {
    saveAsDraft,
    saveAsPublished,
    uploadCoverImage,
    uploadPublication,
    onSubmit,
    resetForm,
    resetFields,
    removeCoverImage,
    form,
    isSubmitting,
    values,
  };
}
