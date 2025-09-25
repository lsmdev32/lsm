<template>
	<div class="relative w-full">
		<h2 class="text-3xl font-[marcellus] text-[#DAB38D]">
			Requirements
		</h2>
		<select 
			v-model="selectedJob"
			class="mx-auto mt-4 pl-2 block font-[Ubuntu] font-light text-[#4B3D2A] w-full rounded-md focus:ring  focus:ring-opacity-50"
			@change="showRequirements"
		>
			<option
				value=""
				disabled
			>
				Select a position
			</option>
			<option
				v-for="job in jobs"
				:key="job.position"
				:value="job.position"
			>
				{{ job.position }}
			</option>
		</select>
		<div
			v-if="selectedJob"
			class="mt-4 p-4"
		>
			<h3 class="text-xl sm:text-2xl font-[marcellus] text-[#4B3D2A]">
				{{ selectedJob }}
			</h3>
			<ul class="mt-2 list-disc list-inside sm:pl-2">
				<li
					v-for="req in jobs.find(j => j.position === selectedJob).requirements"
					:key="req"
					class="sm:text-sm leading-relaxed font-[Ubuntu] font-light text-[#949494]"
				>
					{{ req }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: "JobDropdown",
	data() {
		return {
			selectedJob: "",
			jobs: [
				{
					position: "Mid-Level Associate",
					requirements: [
						"Having a law bachelor's degree",
						"A minimum of 5 years' experience working as a lawyer",
						"An advocates license",
						"Commitment to provide the best services to clients",
						"Strong communication skills",
						"Excellent English speaking and writing skills",
						"Able to work well under pressure",
					],
				},
				{
					position: "Junior Associate",
					requirements: [
						"Having a law bachelor's degree from a reputable University",
						"Minimum 1.5 years' experience working in relevant law areas",
						"Excellent English speaking and writing skills",
						"Committed to self-development and learning",
						"Able to work as a team",
						"Having a good communication skill and personality",
						"Able to work well under pressure",
					],
				},
				{
					position: "Trainee Associate",
					requirements: [
						"Having a law bachelor's degree",
						"Experience working in the legal field is preferable",
						"Fluent in English, both writing and verbal",
						"Able to work as a team",
						"Having a good communication skill and personality",
					],
				},
				{
					position: "Internship",
					requirements: [
						"Having a law bachelor's degree from a reputable University or in the last semester of the Faculty of Law",
						"Excellent English speaking and writing skills",
						"Committed to self-development and learning",
						"Able to work as a team",
						"Having good communication skills and personality ",
						"Having experience working/interning in the legal field is preferable",
					],
				},
			],
		}
	},
}
</script>

<style scoped>
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
