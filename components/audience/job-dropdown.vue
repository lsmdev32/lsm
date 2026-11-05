<template>
  <div class="relative w-full">
    <h2 class="font-[marcellus] text-3xl text-[#DAB38D]">Requirements</h2>
    <select
      disabled
      v-model="selectedJob"
      class="focus:ring-opacity-50 mx-auto mt-4 block w-full rounded-md pl-2 font-[Ubuntu] font-light text-[#4B3D2A] focus:ring"
      @change="showRequirements"
    >
      <option value="" disabled>Select a position</option>
      <option v-for="job in jobs" :key="job.position" :value="job.position">
        {{ job.position }}
      </option>
    </select>
    <div v-if="selectedJob" class="mt-4 p-4">
      <h3 class="font-[marcellus] text-xl text-[#4B3D2A] sm:text-2xl">
        {{ selectedJob }}
      </h3>
      <ul class="mt-2 list-inside list-disc sm:pl-2">
        <li
          v-for="req in jobs.find((j) => j.position === selectedJob)
            .requirements"
          :key="req"
          class="font-[Ubuntu] leading-relaxed font-light text-[#949494] sm:text-sm"
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
            "Bachelor of Laws (LL.B.) degree from a reputable university",
            "Minimum GPA of 3.00 (on a 4.00 scale)",
            "Minimum of 5 (five) years of experience practicing law",
            "Holds a valid Advocate License",
            "Strong commitment to delivering excellent legal services to clients",
            "Excellent interpersonal and communication skills",
            "Fluent in English, both written and spoken",
            "Ability to work effectively both independently and as part of a team",
            "Able to perform well under pressure and manage multiple assignments",
          ],
        },
        /*	{
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
					position: "Internship",
					requirements: [
						"Having a law bachelor's degree from a reputable University or in the last semester of the Faculty of Law",
						"Excellent English speaking and writing skills",
						"Committed to self-development and learning",
						"Able to work as a team",
						"Having good communication skills and personality ",
						"Having experience working/interning in the legal field is preferable",
					],
				}, */
        {
          position: "Receptionist ",
          requirements: [
            "Female",
            "Aged between 20 – 28 years old",
            "Minimum D 1 Degree",
            "At least 1 (one) year of experience ",
            "Good command or English language",
            "Pleasant personality with strong interpersonal and communication skills",
            "Professional appearance and customer-oriented attitude",
          ],
        },
      ],
    };
  },
};
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
