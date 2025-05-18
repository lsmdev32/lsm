<script setup>
import { getDocRef } from "~/lib/firestore-model"

definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})

const route = useRoute()
const firestore = useFirestore()

const staff = useDocument(getDocRef(firestore, "staff", route.params.id))
</script>

<template>
	<AdminPage
		page-title="Edit Profile"
		:transform-crumbs="{
			2: () => staff?.fullname,
		}"
	>
		<div class="flex flex-col py-10 gap-y-2">
			<p>Hello</p>
		</div>
	</AdminPage>
</template>
