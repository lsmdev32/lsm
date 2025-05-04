<script setup lang="ts">
definePageMeta({
	layout: "auth",
})

const breadcrumbs = [
	{ text: "Staffs", href: "/dashboard/staffs" },
	{ text: "Create", href: "/dashboard/staffs/create" },
]
</script>

<template>
	<AdminPage
		page-title="Create Staff"
		:breadcrumbs="breadcrumbs"
	>
		<p>Hello</p>
	</AdminPage>
</template>
