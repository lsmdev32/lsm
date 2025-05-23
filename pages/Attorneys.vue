<script setup lang="ts">
import Partners from "~/components/audience/Partners.vue"
import Associate from "~/components/audience/Associate.vue"

const response = await useCustomFetch("/rest/page-data/staffs")

console.log("response", response.data)
</script>

<template>
	<div>
		<!-- Desktop -->
		<section class="hidden md:block">
			<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 md:pt-16 z-0 grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Left column with title and arrow -->
				<div class="relative">
					<h2
						class="text-5xl font-light font-[Marcellus]"
						style="color: #DAB38D;"
					>
						OUR
						<br>
						ATTORNEYS
					</h2>
					<div class="max-w-7xl mx-auto md:mt-28 lg:mt-16 ">
						<img
							src="../assets/Arrow 1.png"
							height="60px"
							alt=""
							style=""
						>
					</div>
				</div>
				<!-- Right column with content -->
				<div class="space-y-8 ">
					<!-- Top description -->
					<div class="mb-8">
						<p class="text-gray-500 leading-relaxed font-[Ubuntu] font-light">
							We are dedicated to providing top-quality legal representation for our
							clients. Our attorneys are highly skilled and experienced in their
							respective areas of practice, and are committed to achieving the best
							possible outcomes for our clients.
						</p>
					</div>
				</div>
			</div>
			<div class="z-0 grid grid-cols-1 md:grid-cols-2 gap-12 md:mt-[-70px] lg:mt-[-70px]">
				<!-- Left column with Down arrow -->
				<div />
				<!-- Right column with content -->
				<div class="space-y-8">
					<!-- Image section -->
					<div class="w-full h-64 md:h-72 lg:h-72 overflow-hidden">
						<img
							src="../assets/attorneys-1.png"
							alt=""
							class="w-full h-full object-cover transform "
						>
					</div>
				</div>
			</div>
			<div class="container max-w-7xl mx-auto px-2  lg:px-8 mt-8 py-2">
				<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
					PARTNERS
				</h2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 ">
				<Partners
					v-for="(partner) in response.data?.data?.partners.data"
					:key="partner.id"
					:image="partner.image_url"
					:name="partner.name"
					:linkedin="partner.linkedin_url"
					:email="partner.email"
				/>
			</div>
			<div class="container max-w-7xl mx-auto px-2  lg:px-8 mt-4 py-2">
				<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
					ASSOCIATE
				</h2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-4 gap-10 container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 mb-8">
				<Associate
					v-for="(associate) in response.data?.data?.associates.data"
					:key="associate.id"
					:image="associate.image_url"
					:name="associate.name"
					:linkedin="associate.linkedin_url"
					:email="associate.email"
				/>
			</div>
		</section>

		<!-- Mobile -->
		<section class="md:hidden">
			<div class="flex flex-col items-center px-4 py-6 space-y-4">
				<!-- Gambar dengan ABOUT LSM -->
				<div class="relative w-full">
					<img
						src="../assets/mobile_attorneys.png"
						alt=""
						class="w-full h-[358px] object-cover"
					>
					<h2 class="absolute bottom-6 left-6 text-white text-3xl font-[Marcellus] font-light">
						OUR ATTORNEYS
					</h2>
				</div>
				<div class="w-full grid grid-cols-2 md:grid-cols-2 gap-6">
					<!-- Panah -->
					<div class="">
						<img
							src="../assets/Arrow 1.png"
							alt=""
							style="height: 34px; width: 16px;"
						>
					</div>

					<!-- Deskripsi -->
					<p class="text-[#D9B28C] text-1xl font-[Marcellus] ml-[-100px] eading-relaxed">
						We are dedicated to providing top-quality legal representation for our
						clients. Our attorneys are highly skilled and experienced in their
						respective areas of practice, and are committed to achieving the best
						possible outcomes for our clients.
					</p>
				</div>
			</div>
			<div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 py-2">
				<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
					PARTNERS
				</h2>
			</div>
			<div class="grid grid-cols-1 gap-4 container max-w-7xl mx-auto px-20 sm:px-6 lg:px-8 py-4 ">
				<Partners
					v-for="(partner) in response.data?.data?.partners.data"
					:key="partner.id"
					:image="partner.image_url"
					:name="partner.name"
					:linkedin="partner.linkedin_url"
					:email="partner.email"
				/>
			</div>
			<div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 py-2">
				<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
					ASSOCIATE
				</h2>
			</div>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-10 mt-2 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
				<Associate
					v-for="(associate) in response.data?.data?.associates.data"
					:key="associate.id"
					:image="associate.image_url"
					:name="associate.name"
					:linkedin="associate.linkedin_url"
					:email="associate.email"
				/>
			</div>
		</section>
	</div>
</template>

<style scoped>
.last-section {
  margin-top: 50px;
  padding: 70px 10%;
  display: flex;
  background-color: #91AEAC;
  color: white;
  justify-content: space-between;
  align-items: center;
}

.last-section-text {
  font-size: 32px;
  margin-right: 40px;
  line-height: 110%;
}

.custom-button-about {
  background-color: white;
  padding: 20px 25px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #dab38d;
}

@media (max-width: 768px) {
  .custom-button-about {
    margin-top: 30px;
  }
  .last-section-text {
    width: 100%;
    text-align: center;
    font-size: 24px;
  }
  .last-section-text {
    margin: 0;
  }
  .last-section {
    padding: 40px 5%;
    flex-direction: column;
  }
}
</style>
