<script setup lang="ts">
import { NuxtImg } from "#components";
import CheckIc from "~/assets/images/check-icon.svg";
import Button from "~/components/audience/Button.vue";
import JobDropdown from "~/components/audience/JobDropdown.vue";

const name = ref("");
const email = ref("");
const description = ref("");
const info = ref("");
const loading = ref(false);

const submit = async () => {
  if (!name.value || !email.value || !description.value) {
    info.value = "Semua field wajib diisi.";

    return;
  }

  loading.value = true;

  const { data } = await useFetch("/api/send-email", {
    method: "POST",
    body: {
      name: name.value,
      email: email.value,
      type: "career",
      description: description.value,
    },
  });

  loading.value = false;

  if (data.value?.success) {
    info.value = "Pesan berhasil dikirim!";
    name.value = "";
    email.value = "";
    description.value = "";
  } else {
    info.value = "Gagal mengirim pesan.";
  }

  setTimeout(() => {
    info.value = "";
  }, 2000);
};
</script>

<template>
  <div>
    <!-- Mobile -->
    <section class="md:hidden md:min-w-full">
      <div class="z-0 flex flex-col items-start justify-center px-4 py-6">
        <div class="flex-1">
          <h1 class="font-[marcellus] text-4xl text-[#4B3D2A]">Career</h1>
          <h3
            class="mt-6 text-justify font-[Ubuntu] text-2xl font-light text-[#949494]"
          >
            Your next big case begins here!
          </h3>
          <p
            class="mt-6 mb-6 text-left font-[Ubuntu] text-xl font-light text-[#949494]"
          >
            We are always eager to meet with new colleagues.
            <!--<a class="font-bold">We are currently hiring</a>, so checks out our "Updates" for open position.-->
            Please check on “Updates” for hiring announcement and open position.
          </p>
          <JobDropdown />
          <p class="mt-6">
            <img src="/images/hiring-Mid-level-Associate.jpg" />
          </p>
          <p class="mt-6"><img src="/images/hiring-Receptonist.jpg" /></p>
          <p
            class="text-md mt-6 text-left font-[Ubuntu] font-light text-[#949494]"
          >
            Please send your Application Letter, CV and Recent Photograph to the
            following email address:
          </p>
          <p
            class="text-md mt-2 text-left font-[Ubuntu] font-light text-[#949494]"
          >
            <a
              class="hover:text-[#DAB38D] hover:underline"
              href="mailto:hrd@lsmlaw.co.id"
              >hrd@lsmlaw.co.id</a
            >
          </p>
          <!-- <h1 class="mt-6 text-4xl font-[marcellus] text-[#DAB38D]">
						Lawyers
					</h1>
					<p class="mt-6 text-xl font-[Ubuntu] font-light text-left text-[#949494]">
						LSM is looking for outstanding lawyers to join our Dispute Resolution (DR) and
						Corporate & Commercial (CC) Practice. The applications must have:
						<br>
						<br>
						Requirements:
					</p>
					<div class="flex flex-col mt-6 text-lg font-[Ubuntu] font-light text-left text-[#949494] list-disk list-inside">
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>a Law Degree (Sarjana Hukum), with impressive academic record.</div>
						</div>
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>an advocates license.</div>
						</div>
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>commitment to provide best services to clients.</div>
						</div>
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>an excellent English speaking and writing skills.</div>
						</div>
					</div> -->
        </div>
      </div>
    </section>
    <section class="md:hidden md:min-w-full">
      <!-- <form
				class="flex flex-col px-4 pt-4 pb-6 z-0"
				@submit.prevent="submit"
			>
				<div class="flex-1 w-full">
					<input
						v-model="name"
						required
						type="text"
						placeholder="Name*"
						class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
					>
				</div>
				<div class="flex-1 w-full">
					<input
						v-model="email"
						required
						type="email"
						placeholder="Email*"
						class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
					>
				</div>
				<div class="flex-1 w-full items-start">
					<textarea
						v-model="description"
						class="w-full py-3 px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
						placeholder="Please describe your interest in joining LSM*"
						:rows="4"
						required
					/>
					<Button
						type="submit"
						class="mt-6 cursor-pointer"
						text-button="Submit"
					>
						{{ loading ? "Mengirim..." : "Kirim" }}
					</button>
					<p v-if="info">
						{{ info }}
					</p>
				</div>
			</form> -->
    </section>
    <!-- Desktop -->
    <section
      class="sm:px6 hidden flex-row items-start justify-center px-10 md:flex md:min-w-full lg:px-8"
    >
      <div
        class="z-0 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-2 pb-12 sm:px-6 md:grid-cols-2 md:pt-16 lg:px-8"
      >
        <div class="flex-1">
          <h1 class="font-[marcellus] text-5xl text-[#4B3D2A]">Career</h1>
          <h3
            class="mt-6 text-left font-[Ubuntu] text-3xl font-light text-[#949494]"
          >
            Your next big case begins here!
          </h3>
          <p
            class="mt-6 mb-6 text-left font-[Ubuntu] text-xl font-light text-[#949494]"
          >
            We are always eager to meet with new colleagues.
            <!--<a class="font-bold">We are currently hiring</a>, so checks out our "Updates" for open position.-->
            Please check on “Updates” for hiring announcement and open position.
          </p>
        </div>

        <!-- <form
					class="flex flex-col z-0"
					@submit.prevent="submit"
				>
					<div class="flex-1">
						<h1 class="text-5xl font-[marcellus] text-[#4B3D2A]">
							Carrer
						</h1>
						<p class="mt-6 text-md font-[Ubuntu] font-light text-left text-[#949494]">
							LUBIS, SANTOSA & PARTNERS (LSM) is a leading Indonesia law firm with strong dispute
							resolution and corporate & commercial practices, providing assistance to a wide range of
							clients throughout Indonesia and abroad including individuals, corporations, major governmental
							and private financial institutions and large, medium and small businesses.
						</p>
					</div>
					<div class="flex flex-row w-full gap-6 mt-6">
						<div class="flex-1 ">
							<input
								v-model="name"
								required
								type="text"
								placeholder="Name*"
								class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
							>
						</div>
						<div class="flex-1 ">
							<input
								v-model="email"
								required
								type="email"
								placeholder="Email*"
								class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
							>
						</div>
					</div>
					<div class="flex-1 w-full items-start">
						<textarea
							v-model="description"
							class="w-full py-3 px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
							placeholder="Please describe your interest in joining LSM*"
							:rows="4"
							required
						/>
						<Button
							type="submit"
							class="mt-6 cursor-pointer"
							text-button="Submit"
						>
							{{ loading ? "Mengirim..." : "Kirim" }}
						</button>
						<p v-if="info">
							{{ info }}
						</p>
					</div>
				</form> -->
        <div class="z-0 flex flex-col items-center justify-center pt-14">
          <JobDropdown />
          <p class="mt-6">
            <img src="/images/hiring-Mid-level-Associate.jpg" />
          </p>
          <p class="mt-6"><img src="/images/hiring-Receptonist.jpg" /></p>
          <p
            class="text-md mt-6 text-left font-[Ubuntu] font-light text-[#949494]"
          >
            Please send your Application Letter, CV and Recent Photograph to the
            following email address:
          </p>
          <p
            class="text-md mt-2 text-left font-[Ubuntu] font-light text-[#949494]"
          >
            <a
              class="hover:text-[#DAB38D] hover:underline"
              href="mailto:hrd@lsmlaw.co.id"
              >hrd@lsmlaw.co.id</a
            >
          </p>
          <!-- <div class="flex-1 mt-14 pl-16">
						<h1 class=" text-3xl font-[marcellus] text-[#DAB38D]">
							Lawyers
						</h1>
						<p class="mt-6 text-md font-[Ubuntu] font-light text-left text-[#949494]">
							LSM is looking for outstanding lawyers to join our Dispute Resolution (DR) and
							Corporate & Commercial (CC) Practice. The applications must have:
							<br>
							<br>
							Requirements:
						</p>
						<div class="flex flex-col mt-6 text-md font-[Ubuntu] font-light text-left text-[#949494] list-disk list-inside">
							<div class="flex flex-row items-center">
								<NuxtImg
									:src="CheckIc"
									alt="point"
									width="20"
									height="20"
									class="mr-2"
								/>
								<div>a Law Degree (Sarjana Hukum), with impressive academic record.</div>
							</div>
							<div class="flex flex-row items-center">
								<NuxtImg
									:src="CheckIc"
									alt="point"
									width="20"
									height="20"
									class="mr-2"
								/>
								<div>an advocates license.</div>
							</div>
							<div class="flex flex-row items-center">
								<NuxtImg
									:src="CheckIc"
									alt="point"
									width="20"
									height="20"
									class="mr-2"
								/>
								<div>commitment to provide best services to clients.</div>
							</div>
							<div class="flex flex-row items-center">
								<NuxtImg
									:src="CheckIc"
									alt="point"
									width="20"
									height="20"
									class="mr-2"
								/>
								<div>an excellent English speaking and writing skills.</div>
							</div>
						</div>
					</div> -->
        </div>
      </div>
    </section>
  </div>
</template>
