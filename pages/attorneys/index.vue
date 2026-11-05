<script setup lang="ts">
import Associate from "~/components/audience/Associate.vue";
import Partners from "~/components/audience/Partners.vue";

const response = await useCustomFetch("/api/page-data/staffs");
const { data } = response.data;
</script>

<template>
  <div>
    <!-- Desktop -->
    <section class="hidden md:block">
      <div
        class="z-0 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-2 sm:px-6 md:grid-cols-2 md:pt-16 lg:px-8"
      >
        <!-- Left column with title and arrow -->
        <div class="relative">
          <h2
            class="font-[Marcellus] text-5xl font-light"
            style="color: #dab38d"
          >
            OUR
            <br />
            ATTORNEYS
          </h2>
          <!-- <div class="max-w-7xl mx-auto md:mt-28 lg:mt-16 ">
						<img
							src="../../assets/Arrow 1.png"
							height="60px"
							alt=""
							style=""
						>
					</div> -->
        </div>
        <!-- Right column with content -->
        <div class="space-y-8">
          <!-- Top description -->
          <div class="mb-8">
            <p class="font-[Ubuntu] leading-relaxed font-light text-gray-500">
              We are dedicated to providing top-quality legal representation for
              our clients. Our attorneys are highly skilled and experienced in
              their respective areas of practice, and are committed to achieving
              the best possible outcomes for our clients.
            </p>
          </div>
        </div>
      </div>
      <div class="z-0 grid grid-cols-1 gap-12 md:grid-cols-2">
        <!-- Left column with Down arrow -->
        <div />
        <!-- Right column with content -->
        <div class="space-y-8">
          <!-- Image section -->
          <div class="h-64 w-full overflow-hidden md:h-72 lg:h-72">
            <img
              src="../../assets/attorneys-1.png"
              alt=""
              class="h-full w-full transform object-cover"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div>
          <div class="container mx-auto mt-8 max-w-7xl px-2 py-2 lg:px-8">
            <h2 class="text-center font-[Marcellus] text-3xl text-[#4B3D2A]">
              FOUNDERS
            </h2>
          </div>
          <div
            class="container mx-auto h-[2px] w-full max-w-7xl justify-center bg-[#949494]"
          />
          <div
            class="container mx-auto mt-4 grid max-w-7xl grid-cols-2 gap-10 px-2 py-4 sm:px-6 md:grid-cols-2 lg:px-8"
          >
            <Partners
              v-for="partner in data?.founders.data"
              :key="partner.id"
              :image="partner.image_url"
              :name="partner.name"
              :linkedin="partner.linkedin_url"
              :email="partner.email"
              :slug="partner.slug"
            />
          </div>
          <div class="container mx-auto mt-8 max-w-7xl px-2 py-2 lg:px-8">
            <h2 class="text-center font-[Marcellus] text-3xl text-[#4B3D2A]">
              PARTNERS
            </h2>
          </div>
          <div
            class="container mx-auto h-[2px] w-full max-w-7xl justify-center bg-[#949494]"
          />
          <div
            class="container mx-auto mt-4 grid max-w-7xl grid-cols-2 gap-10 px-2 py-4 sm:px-6 md:grid-cols-2 lg:px-8"
          >
            <Partners
              v-for="partner in data?.partners.data"
              :key="partner.id"
              :image="partner.image_url"
              :name="partner.name"
              :linkedin="partner.linkedin_url"
              :email="partner.email"
              :slug="partner.slug"
            />
          </div>
          <div class="container mx-auto mt-8 max-w-7xl px-2 py-2 lg:px-8">
            <h2 class="text-center font-[Marcellus] text-3xl text-[#4B3D2A]">
              OF COUNSEL
            </h2>
          </div>
          <div
            class="container mx-auto h-[2px] w-full max-w-7xl justify-center bg-[#949494]"
          />
          <div
            class="container mx-auto mt-4 grid max-w-7xl gap-10 px-2 py-4 sm:px-6 lg:px-8"
          >
            <Partners
              v-for="partner in data?.of_counsels.data"
              :key="partner.id"
              :image="partner.image_url"
              :name="partner.name"
              :linkedin="partner.linkedin_url"
              :email="partner.email"
              :slug="partner.slug"
            />
          </div>
        </div>
      </div>
      <div class="container mx-auto mt-4 max-w-7xl px-2 py-2 lg:px-8">
        <h2 class="text-center font-[Marcellus] text-3xl text-[#4B3D2A]">
          ASSOCIATE
        </h2>
      </div>
      <div
        class="container mx-auto h-[2px] w-full max-w-7xl justify-center bg-[#949494]"
      />
      <div
        class="container mx-auto mt-4 mb-8 grid max-w-7xl grid-cols-1 gap-10 px-2 py-4 sm:px-6 md:grid-cols-4 lg:px-8"
      >
        <Associate
          v-for="associate in data?.associates.data"
          :key="associate.id"
          :image="associate.image_url"
          :name="associate.name"
          :linkedin="associate.linkedin_url"
          :email="associate.email"
          :slug="associate.slug"
        />
      </div>
    </section>

    <!-- Mobile -->
    <section class="md:hidden">
      <div class="flex flex-col items-center space-y-4 px-4 py-6">
        <!-- Gambar dengan ABOUT LSM -->
        <div class="relative w-full">
          <img
            src="../../assets/mobile_attorneys.png"
            alt=""
            class="h-[556px] w-full object-cover"
          />
          <h2
            class="absolute bottom-6 left-6 font-[Marcellus] text-3xl font-light text-white"
          >
            OUR ATTORNEYS
          </h2>
        </div>
        <div class="flex w-full py-6">
          <!-- Panah -->
          <!-- <div class="">
						<img
							src="../../assets/Arrow 1.png"
							alt=""
							style="height: 34px; width: 16px;"
						>
					</div> -->

          <!-- Deskripsi -->
          <p
            class="text-justify font-[Ubuntu] text-xl font-light text-[#4B3D2A]"
          >
            We are dedicated to providing top-quality legal representation for
            our clients. Our attorneys are highly skilled and experienced in
            their respective areas of practice, and are committed to achieving
            the best possible outcomes for our clients.
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <div calss="px-4">
          <div class="container mx-auto mt-8 max-w-7xl px-2 py-2 lg:px-8">
            <h2 class="text-center font-[Marcellus] text-3xl text-[#4B3D2A]">
              FOUNDERS
            </h2>
          </div>
          <div
            class="container mx-auto h-[2px] w-full max-w-7xl justify-center bg-[#949494]"
          />
          <div
            class="container mx-auto mt-4 grid max-w-7xl grid-cols-2 gap-10 px-2 py-4 sm:px-6 md:grid-cols-2 lg:px-8"
          >
            <Partners
              v-for="partner in data?.founders.data"
              :key="partner.id"
              :image="partner.image_url"
              :name="partner.name"
              :linkedin="partner.linkedin_url"
              :email="partner.email"
              :slug="partner.slug"
            />
          </div>
          <div class="container mx-auto mt-8 max-w-7xl px-2 py-2 lg:px-8">
            <h2 class="text-center font-[Marcellus] text-3xl text-[#4B3D2A]">
              PARTNERS
            </h2>
          </div>
          <div
            class="container mx-auto h-[2px] w-full max-w-7xl justify-center bg-[#949494]"
          />
          <div
            class="container mx-auto mt-4 grid max-w-7xl grid-cols-2 gap-10 px-2 py-4 sm:px-6 md:grid-cols-2 lg:px-8"
          >
            <Partners
              v-for="partner in data?.partners.data"
              :key="partner.id"
              :image="partner.image_url"
              :name="partner.name"
              :linkedin="partner.linkedin_url"
              :email="partner.email"
              :slug="partner.slug"
            />
          </div>
          <div class="container mx-auto mt-8 max-w-7xl px-2 py-2 lg:px-8">
            <h2 class="text-center font-[Marcellus] text-3xl text-[#4B3D2A]">
              OF COUNSEL
            </h2>
          </div>
          <div
            class="container mx-auto h-[2px] w-full max-w-7xl justify-center bg-[#949494]"
          />
          <div
            class="container mx-auto mt-4 grid max-w-7xl gap-10 px-2 py-4 sm:px-6 lg:px-8"
          >
            <Partners
              v-for="partner in data?.of_counsels.data"
              :key="partner.id"
              :image="partner.image_url"
              :name="partner.name"
              :linkedin="partner.linkedin_url"
              :email="partner.email"
              :slug="partner.slug"
            />
          </div>
        </div>
      </div>
      <div class="container mx-auto mt-4 max-w-7xl px-2 py-2 lg:px-8">
        <h2 class="text-center font-[Marcellus] text-3xl text-[#4B3D2A]">
          ASSOCIATE
        </h2>
      </div>
      <div
        class="container mx-auto h-[2px] w-full max-w-7xl justify-center bg-[#949494]"
      />
      <div
        class="container mx-auto mt-4 mb-8 grid max-w-7xl grid-cols-2 gap-10 px-2 py-4 sm:grid-cols-2 sm:px-6 md:grid-cols-4 lg:px-8"
      >
        <Associate
          v-for="associate in data?.associates.data"
          :key="associate.id"
          :image="associate.image_url"
          :name="associate.name"
          :linkedin="associate.linkedin_url"
          :email="associate.email"
          :slug="associate.slug"
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
  background-color: #91aeac;
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
