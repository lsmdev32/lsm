<script setup lang="ts">
import { blogColumns, publicationColumns } from "~/components/admin/table/columns";

definePageMeta({ layout: "auth" });

const longTitle =
  "Analisis Yuridis Terhadap Implementasi Prinsip Keterbukaan Informasi Publik Dalam Penyelenggaraan Pemerintahan Daerah Di Indonesia Tahun 2024";

const now = { _seconds: 1_760_000_000, _nanoseconds: 0 };

const blogs = [
  {
    objectID: "b1",
    title: longTitle,
    status: "published" as const,
    cover_image_url: null,
    tags: [],
    created_at: now,
    published_at: now,
    slug: "blog-panjang",
  },
  {
    objectID: "b2",
    title: "Judul pendek",
    status: "not_published" as const,
    cover_image_url: null,
    tags: [],
    created_at: now,
    published_at: null,
    slug: "pendek",
  },
];

const publications = [
  {
    ...blogs[0],
    objectID: "p1",
    publication: "Jurnal Hukum",
    slug: "publikasi-panjang",
  },
  {
    ...blogs[1],
    objectID: "p2",
    publication: "Jurnal Hukum",
    slug: "publikasi-pendek",
  },
];
</script>

<template>
  <div class="flex flex-col gap-8 p-6">
    <AdminTableDataTable
      :columns="blogColumns as []"
      :data="blogs"
      :page-size="10"
      no-toggle-column-visibility
    />
    <AdminTableDataTable
      :columns="publicationColumns as []"
      :data="publications"
      :page-size="10"
      no-toggle-column-visibility
    />
  </div>
</template>
