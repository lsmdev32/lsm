import { createColumnHelper } from "@tanstack/vue-table";
import type { ColumnDef } from "@tanstack/vue-table";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import {
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CopyIcon,
  DownloadIcon,
  ImageOffIcon,
  PencilIcon,
  PinIcon,
  SaveIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

import {
  AdminTableAction,
  NuxtImg,
  NuxtLink,
  UiBadge,
  UiButton,
  UiInput,
} from "#components";
import { confirmAction } from "~/composables/use-confirm";
import { RTDB_KEYS } from "~/lib/constants";
import {
  getBlogDocRef,
  getCategoryDocRef,
  getPublicationCollectionRef,
} from "~/lib/firestore-model";
import { cn } from "~/lib/utils";

export interface Category {
  objectID: string;
  name: string;
  created_at: Date;
}

export interface Blog {
  objectID: string;
  title: string;
  status: "published" | "not_published";
  cover_image_url: string | null;
  tags: string[];
  created_at: { _seconds: number; _nanoseconds: number };
  published_at: { _seconds: number; _nanoseconds: number } | null;
  slug: string;
}

export interface Publication {
  objectID: string;
  title: string;
  status: "published" | "not_published";
  cover_image_url: string | null;
  tags: string[];
  created_at: { _seconds: number; _nanoseconds: number };
  published_at: { _seconds: number; _nanoseconds: number } | null;
  publication: string;
  slug: string;
}

const categoryHelper = createColumnHelper<Category>();
const blogHelper = createColumnHelper<Blog>();
const publicationHelper = createColumnHelper<Publication>();

export const categoryColumns: ColumnDef<Category, string>[] = [
  categoryHelper.display({
    id: "rowNumber",
    header: () => h("span", { class: cn("w-[20px] text-center") }, "#"),
    cell: ({ row }) => {
      const numbering = row.index + 1;

      return h("span", { class: cn("text-center") }, `${numbering}.`);
    },
    enableHiding: false,
    filterFn: "includesString",
    sortingFn: "alphanumeric",
    enableSorting: true,
  }),
  categoryHelper.accessor("name", {
    header: "Category Name",
    enableHiding: false,
    cell: ({ row, getValue }) => {
      const id = row.original.objectID;
      const inputRef = ref("");
      const firestore = useFirestore();
      const docRef = getCategoryDocRef(firestore, id);

      async function updateCategoryName() {
        const inputValue = inputRef.value.trim();

        if (inputValue === getValue()) {
          toast.info("Tidak ada perubahan pada nama kategori");

          return;
        }

        if (!inputValue) {
          toast.error("Nama kategori tidak boleh kosong");

          return;
        }

        if (inputValue.length < 4) {
          toast.error("Nama kategori harus lebih dari 4 karakter");

          return;
        }

        if (inputValue.length > 50) {
          toast.error("Nama kategori tidak boleh lebih dari 50 karakter");

          return;
        }

        try {
          await updateDoc(docRef, {
            name: inputValue,
          });
        } catch (error) {
          toast.error(
            `Gagal memperbarui kategori: ${
              error instanceof Error ? error.message : String(error)
            }`
          );

          return;
        }

        toast.success("Kategori berhasil diperbarui");
      }

      async function handleDeleteCategory() {
        const confirmed = await confirmAction({
          title: "Hapus kategori?",
          description: "Apakah Anda yakin ingin menghapus kategori ini?",
          confirmLabel: "Hapus kategori",
          tone: "destructive",
        });

        if (!confirmed) {
          return;
        }

        // Cascade delete publications that use this category
        const publicationsQuery = query(
          getPublicationCollectionRef(firestore),
          where("category_id", "==", id)
        );

        const publicationsSnapshot = await getDocs(publicationsQuery);

        const batch = writeBatch(firestore);

        for (const publicationDoc of publicationsSnapshot.docs) {
          batch.delete(publicationDoc.ref);
        }

        await batch.commit();

        try {
          await deleteDoc(docRef);
        } catch {
          toast.error("Gagal menghapus kategori");

          return;
        }

        toast.success("Kategori berhasil dihapus");
      }

      function handleChange(value: string | number) {
        inputRef.value = String(value);
      }

      return h(
        "div",
        {
          key: id,
          class: cn("flex gap-x-2 text-sm"),
        },
        [
          h(UiInput, {
            defaultValue: getValue(),
            "onUpdate:modelValue": handleChange,
            class: cn("w-[200px]"),
          }),
          h(
            UiButton,
            {
              variant: "ghost",
              title: "Simpan perubahan nama kategori",
              onClick: updateCategoryName,
            },
            h(SaveIcon)
          ),
          h(
            UiButton,
            {
              variant: "ghost",
              title: "Hapus kategori ini",
              onClick: handleDeleteCategory,
            },
            h(Trash2Icon)
          ),
        ]
      );
    },
  }),
];

function renderCoverImageCell(src: string | null | undefined) {
  if (src === null || src === undefined || src === "") {
    return h(
      "div",
      {
        class: cn(
          "flex aspect-video w-[100px] flex-col items-center justify-center gap-y-1 rounded border border-dashed text-muted-foreground"
        ),
        title: "Tidak ada gambar sampul",
      },
      h(ImageOffIcon, { size: 20 }),
      h("span", { class: cn("text-xs leading-none") }, "Tanpa sampul")
    );
  }

  return h(NuxtImg, {
    src,
    class: cn("aspect-video w-[100px] object-cover"),
  });
}

export const blogColumns: ColumnDef<Blog, never>[] = [
  blogHelper.accessor("cover_image_url", {
    id: "Gambar sampul",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Gambar Sampul"
      ),
    cell: ({ getValue }) => renderCoverImageCell(getValue()),
  }),
  blogHelper.accessor("title", {
    id: "Judul",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Judul"
      ),
    cell: ({ row }) => {
      const isPublished = row.original.status === "published";
      const { title } = row.original;
      const { slug } = row.original;

      function copy() {
        navigator.clipboard
          .writeText(slug)
          .then(() => toast.success("Judul tersalin ke clipboard"))
          .catch(() => {
            toast.error("Gagal menyalin judul");
          });
      }

      return h(
        "div",
        {
          class: cn("flex items-center gap-x-2"),
        },
        [
          isPublished
            ? h(
                NuxtLink,
                {
                  href: `/blogs/${row.original.slug}`,
                  target: "_blank",
                  class: cn("line-clamp-2 underline"),
                },
                title
              )
            : h("span", {}, title),
          h(CopyIcon, {
            class: cn("text-xs text-muted-foreground"),
            size: 20,
            onClick: copy,
          }),
        ]
      );
    },
  }),
  blogHelper.accessor("status", {
    id: "Status",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Status"
      ),
    cell: ({ row }) => {
      const value = row.original.status;
      const isPublished = value === "published";

      return h(
        UiBadge,
        {
          class: cn(
            "flex w-[100px] justify-center text-xs",
            isPublished
              ? "bg-success/15 text-success"
              : "bg-destructive/15 text-destructive"
          ),
        },
        isPublished ? "Terbit" : "Tidak Terbit"
      );
    },
  }),
  blogHelper.accessor("created_at", {
    id: "Dibuat",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Dibuat pada"
      ),
    cell: ({ row }) => {
      const dayjs = useDayjs();
      const value = row.original.created_at;
      const ms = value._seconds * 1000;

      return h("span", {}, dayjs(new Date(ms)).format("DD MMM YYYY HH:mm"));
    },
  }),
  blogHelper.accessor("published_at", {
    id: "Terbit",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Diterbitkan pada"
      ),
    cell: ({ row }) => {
      const dayjs = useDayjs();

      const value = row.original.published_at;

      if (!value) {
        return h("span", {}, "Belum diterbitkan");
      }

      const ms = value._seconds * 1000;

      return h("span", {}, dayjs(new Date(ms)).format("DD MMM YYYY HH:mm"));
    },
  }),

  blogHelper.display({
    id: "actions",
    enableHiding: false,
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Aksi"
      ),
    cell: ({ row }) => {
      const id = row.original.objectID;
      const firestore = useFirestore();
      const docRef = getBlogDocRef(firestore, id);
      const currentStatus = row.original.status;
      const isPublished = currentStatus === "published";

      async function handleDelete() {
        const confirmed = await confirmAction({
          title: "Hapus blog?",
          description: "Apakah Anda yakin ingin menghapus blog ini?",
          confirmLabel: "Hapus blog",
          tone: "destructive",
        });

        if (!confirmed) {
          return;
        }

        try {
          await deleteDoc(docRef);
        } catch {
          toast.error("Gagal menghapus blog");

          return;
        }

        toast.success("Blog berhasil dihapus");
      }

      async function handlePinHome() {
        const db = getDatabase();
        const pinRef = dbRef(db, RTDB_KEYS.HOME_PINNED_CONTENT);
        await set(pinRef, id);
        toast.success(`Berhasil pin konten ke Home`);
      }

      function handleUpdatePublish() {
        const newStatus = isPublished ? "not_published" : "published";

        const newValue = {
          status: newStatus,
        };

        void updateDoc(docRef, newValue)
          .then(() =>
            toast.success(`Status blog berhasil diubah menjadi ${newStatus}`)
          )
          .catch(() => {
            toast.error("Gagal memperbarui status blog");
          })
          .finally(() => {
            window.location.reload();
          });
      }

      return h(AdminTableAction, {
        actions: [
          {
            label: "Edit",
            icon: PencilIcon,
            href: `/dashboard/blogs/${row.original.objectID}/edit`,
          },
          {
            label: isPublished ? "Unpublish" : "Publish",
            icon: isPublished ? ArrowDownIcon : ArrowUpIcon,
            onClick: handleUpdatePublish,
          },
          {
            label: "Delete",
            icon: TrashIcon,
            onClick: handleDelete,
          },
          {
            label: "Pin ke Home",
            icon: PinIcon,
            onClick: handlePinHome,
          },
        ],
      });
    },
  }),
];

export const publicationColumns: ColumnDef<Publication, never>[] = [
  publicationHelper.accessor("cover_image_url", {
    id: "Gambar sampul",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Gambar Sampul"
      ),
    cell: ({ getValue }) => renderCoverImageCell(getValue()),
  }),
  publicationHelper.accessor("title", {
    id: "Judul",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Judul"
      ),
    cell: ({ row }) => {
      const isPublished = row.original.status === "published";
      const { title } = row.original;
      const { slug } = row.original;

      function copy() {
        navigator.clipboard
          .writeText(slug)
          .then(() => toast.success("Judul tersalin ke clipboard"))
          .catch(() => {
            toast.error("Gagal menyalin judul");
          });
      }

      return h(
        "div",
        {
          class: cn("flex items-center gap-x-2"),
        },
        [
          isPublished
            ? h(
                NuxtLink,
                {
                  href: `/publications/${row.original.slug}`,
                  target: "_blank",
                  class: cn("line-clamp-2 underline"),
                },
                title
              )
            : h("span", {}, title),
          h(CopyIcon, {
            class: cn("text-xs text-muted-foreground"),
            size: 20,
            onClick: copy,
          }),
        ]
      );
    },
  }),
  publicationHelper.accessor("status", {
    id: "Status",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Status"
      ),
    cell: ({ row }) => {
      const value = row.original.status;
      const isPublished = value === "published";

      return h(
        UiBadge,
        {
          class: cn(
            "flex w-[100px] justify-center text-xs",
            isPublished
              ? "bg-success/15 text-success"
              : "bg-destructive/15 text-destructive"
          ),
        },
        isPublished ? "Terbit" : "Tidak Terbit"
      );
    },
  }),
  publicationHelper.accessor("created_at", {
    id: "Dibuat",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Dibuat pada"
      ),
    cell: ({ row }) => {
      const dayjs = useDayjs();
      const value = row.original.created_at;
      const ms = value._seconds * 1000;

      return h("span", {}, dayjs(new Date(ms)).format("DD MMM YYYY HH:mm"));
    },
  }),
  publicationHelper.accessor("published_at", {
    id: "Terbit",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Diterbitkan pada"
      ),
    cell: ({ row }) => {
      const dayjs = useDayjs();

      const value = row.original.published_at;

      if (!value) {
        return h("span", {}, "Belum diterbitkan");
      }

      const ms = value._seconds * 1000;

      return h("span", {}, dayjs(new Date(ms)).format("DD MMM YYYY HH:mm"));
    },
  }),

  publicationHelper.accessor("publication", {
    id: "publikasi",
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Link Publikasi"
      ),
    cell: ({ row }) =>
      h(
        NuxtLink,
        {
          href: row.original.publication,
          class: cn(
            "flex w-[50px] justify-center text-primary hover:underline"
          ),
          target: "_blank",
        },
        h(DownloadIcon)
      ),
  }),

  publicationHelper.display({
    id: "actions",
    enableHiding: false,
    header: () =>
      h(
        "span",
        {
          class: cn("w-[20px] text-center"),
        },
        "Aksi"
      ),
    cell: ({ row }) => {
      const id = row.original.objectID;
      const firestore = useFirestore();
      const docRef = getBlogDocRef(firestore, id);
      const currentStatus = row.original.status;
      const isPublished = currentStatus === "published";

      async function handleDelete() {
        const confirmed = await confirmAction({
          title: "Hapus publikasi?",
          description: "Yakin ingin menghapus publikasi ini?",
          confirmLabel: "Hapus publikasi",
          tone: "destructive",
        });

        if (!confirmed) {
          return;
        }

        try {
          await deleteDoc(docRef);
        } catch {
          toast.error("Gagal menghapus publikasi");

          return;
        }

        toast.success("Publikasi berhasil dihapus");
      }

      async function handlePinHome() {
        const db = getDatabase();
        const pinRef = dbRef(db, RTDB_KEYS.HOME_PINNED_CONTENT);
        await set(pinRef, id);
        toast.success(`Berhasil pin konten ke Home`);
      }

      function handleUpdatePublish() {
        const newStatus = isPublished ? "not_published" : "published";

        const newValue = {
          status: newStatus,
        };

        void updateDoc(docRef, newValue)
          .then(() =>
            toast.success(
              `Status publikasi berhasil diubah menjadi ${newStatus}`
            )
          )
          .catch(() => {
            toast.error("Gagal mengubah status publikasi");
          })
          .finally(() => {
            window.location.reload();
          });
      }

      return h(AdminTableAction, {
        actions: [
          {
            label: "Edit",
            icon: PencilIcon,
            href: `/dashboard/publications/${row.original.objectID}/edit`,
          },
          {
            label: isPublished ? "Unpublish" : "Publish",
            icon: isPublished ? ArrowDownIcon : ArrowUpIcon,
            onClick: handleUpdatePublish,
          },
          {
            label: "Delete",
            icon: TrashIcon,
            onClick: handleDelete,
          },
          {
            label: "Pin ke Home",
            icon: PinIcon,
            onClick: handlePinHome,
          },
        ],
      });
    },
  }),
];
