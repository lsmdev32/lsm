import { addDoc, getDocs, limit, query, where } from "firebase/firestore";
import { toast } from "vue-sonner";

import { getCategoryCollectionRef } from "~/lib/firestore-model";

export function useCreateCategory() {
  const firestore = useFirestore();

  const isSubmitting = ref(false);
  const tempCategory = ref("");

  async function submit(): Promise<boolean> {
    const value = tempCategory.value.trim();

    if (!value) {
      toast.error("Nama kategori tidak boleh kosong");

      return false;
    }

    if (value.length < 4) {
      toast.error("Nama kategori harus lebih dari 4 karakter");

      return false;
    }

    if (value.length > 50) {
      toast.error("Nama kategori tidak boleh lebih dari 50 karakter");

      return false;
    }

    isSubmitting.value = true;

    try {
      const colRef = getCategoryCollectionRef(firestore);

      const duplicate = await getDocs(
        query(colRef, where("name", "==", value), limit(1))
      );

      if (!duplicate.empty) {
        toast.error("Nama kategori sudah ada");

        return false;
      }

      await addDoc(colRef, { name: value });
    } catch {
      toast.error("Gagal menambahkan kategori");

      return false;
    } finally {
      isSubmitting.value = false;
    }

    toast.success("Kategori ditambahkan");
    tempCategory.value = "";

    return true;
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
