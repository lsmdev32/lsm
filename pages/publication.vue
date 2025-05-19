<script setup lang="ts">
import PublicationQuery from "~/components/audience/PublicationQuery.vue"
import Publications from "~/components/audience/Publications.vue"
</script>

<template>
	<div>
		<!-- Mobile -->
		<section class="md:hidden">
			<PublicationQuery />
		</section>
		<section class="md:hidden">
			<div class="p-4">
				<Publications />
			</div>
		</section>
	</div>
</template>
