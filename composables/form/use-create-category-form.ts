import { addDoc, getDocs, limit, query, where } from "firebase/firestore";
import { toast } from "vue-sonner";

import { getCategoryCollectionRef } from "~/lib/firestore-model";

export function useCreateCategory() {
  const firestore = useFirestore();

  const isSubmitting = ref(false);
  const tempCategory = ref("");

  async function submit() {
    const value = tempCategory.value.trim();

    if (!value) {
      toast.error("Nama kategori tidak boleh kosong");

      return;
    }

    if (value.length < 4) {
      toast.error("Nama kategori harus lebih dari 4 karakter");

      return;
    }

    if (value.length > 50) {
      toast.error("Nama kategori tidak boleh lebih dari 50 karakter");

      return;
    }

    isSubmitting.value = true;

    const colRef = getCategoryCollectionRef(firestore);

    // check if category already exists
    const q = query(colRef, where("name", "==", value), limit(1));

    const result = await getDocs(q);

    if (!result.empty) {
      toast.error("Nama kategori sudah ada");
      isSubmitting.value = false;

      return;
    }

    await addDoc(colRef, {
      name: tempCategory.value,
    })
      .then(() => toast.success("Berhasil menambahkan kategori"))
      .catch(() => {
        toast.error("Gagal menambahkan kategori");
      })
      .finally(() => {
        isSubmitting.value = false;
      });
  }

  function onChange(value: string) {
    tempCategory.value = value;
  }

  return {
    submit,
    isSubmitting,
    onChange,
  };
}
