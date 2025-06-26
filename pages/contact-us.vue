<script setup lang="ts">
import { set } from "firebase/database"
import Button from "~/components/audience/Button.vue"

const name = ref("")
const email = ref("")
const description = ref("")
const info = ref("")
const loading = ref(false)

const submit = async () => {
	if (!name.value || !email.value || !description.value) {
		info.value = "Semua field wajib diisi."
		return
	}

	loading.value = true
	const { data } = await useFetch("/api/send-email", {
		method: "POST",
		body: {
			name: name.value,
			email: email.value,
			type: "contact",
			description: description.value,
		},
	})
	loading.value = false

	if (data.value?.success) {
		info.value = "Pesan berhasil dikirim!"
		name.value = ""
		email.value = ""
		description.value = ""
	}
	else {
		info.value = "Gagal mengirim pesan."
	}

	setTimeout(() => {
		info.value = ""
	}, 2000)
}
</script>

<template>
	<div>
		<section class="hidden md:block">
			<div class="max-w-7xl mx-auto px-2 pb-12 sm:px-6 lg:px-8 md:pt-12 z-0 grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Left column with Light gray text -->
				<div class="row mb-150">
					<!-- Form Section -->
					<div class="col-12 col-md-6">
						<h3 class="fs-48 font-[Marcellus]">
							Contact Us
						</h3>
						<div class="sub mb-5 mt-2">
							Contact us for legal support or questions.
						</div>
						<form @submit.prevent="submit">
							<div class="input-row">
								<input
									v-model="name"
									type="text"
									class="px-4 font-[Ubuntu] input-box"
									placeholder="Name*"
									required
								>
								<input
									v-model="email"
									type="email"
									class="px-4 font-[Ubuntu] input-box"
									placeholder="Email*"
									required
								>
							</div>
							<textarea
								v-model="description"
								class="px-4 pt-4 font-[Ubuntu]"
								placeholder="Please describe what you need."
								required
							/>
							<Button
								type="submit"
								class="mt-2 cursor-pointer"
								text-button="Send Message"
							>
								{{ loading ? "Mengirim..." : "Kirim" }}
							</button>
							<p v-if="info">
								{{ info }}
							</p>
						</form>
					</div>
				</div>
				<!-- Right column with content -->
				<div class="space-y-8">
					<!-- Two paragraphs of text -->
					<div class="col-12 col-md-6 right-col">
						<h4 class="reach">
							Reach Out Now
						</h4>
						<div class="left-section">
							Equity Tower<br>
							12th Floor Sudirman Central Business District (SCBD)<br>
							Lot.9 Jl. Jend. Sudirman Kav. 52-53, Jakarta 12190<br>
							Indonesia<br><br>
							E-mail: lsmlawfirm@lsmlaw.co.id<br>
							Telephone: (62-21)2903-5900<br>
							Fax: (62-21)2903-5909<br><br>
							<div class="flex items-center text-[#C19A6B] font-semibold space-x-2">
								<img
									class="mr-2"
									src="../assets/images/icon-maps.svg"
									alt="icon-map"
									height="20"
									width="20"
								>
								<nuxt-link
									href="https://maps.app.goo.gl/QThiKek4Pg5E4B4p7?g_st=iw"
									target="_blank"
									rel="noopener"
									class="map-link"
								>
									View on Google Map
								</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Mobile -->
		<section class="md:hidden px-4">
			<div class="max-w-7xl mx-auto px-2 sm:px-6 grid gap-12">
				<!-- Left column with Light gray text -->
				<div class="row ">
					<!-- Form Section -->
					<div class="col-12 col-md-6">
						<h3 class="fs-48 font-[Marcellus]">
							Contact Us
						</h3>
						<div class="sub mb-5 mt-2">
							Contact us for legal support or questions.
						</div>
						<form @submit.prevent="submit">
							<div class="input-row">
								<input
									v-model="name"
									type="text"
									class="px-4 font-[Ubuntu] input-box"
									placeholder="Name*"
									required
								>
								<input
									v-model="email"
									type="email"
									class="px-4 font-[Ubuntu] input-box"
									placeholder="Email*"
									required
								>
							</div>
							<textarea
								v-model="description"
								type="textarea"
								class="px-4 pt-4 font-[Ubuntu]"
								placeholder="Please describe what you need."
								required
							/>
							<Button
								class="mt-2 cursor-pointer"
								text-button="Send Message"
							/>
						</form>
					</div>
				</div>
				<!-- Right column with content -->
				<div class="space-y-8">
					<!-- Two paragraphs of text -->
					<div class="">
						<h4 class="reach">
							Reach Out Now
						</h4>
						<div class="left-section">
							Equity Tower<br>
							12th Floor Sudirman Central Business District (SCBD)<br>
							Lot.9 Jl. Jend. Sudirman Kav. 52-53, Jakarta 12190<br>
							Indonesia<br><br>
							E-mail: lsmlawfirm@lsmlaw.co.id<br>
							Telephone: (62-21)2903-5900<br>
							Fax: (62-21)2903-5909<br><br>
							<div class="flex items-center text-[#C19A6B] font-semibold pb-16 space-x-2">
								<img
									class="mr-2"
									src="../assets/images/icon-maps.svg"
									alt="icon-map"
									height="20"
									width="20"
								>
								<nuxt-link
									href="https://maps.app.goo.gl/QThiKek4Pg5E4B4p7?g_st=iw"
									target="_blank"
									rel="noopener"
									class="map-link"
								>
									View on Google Map
								</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.fs-48 {
  line-height: 115%;
  font-weight: 400;
  font-size: 48px;
  color: #4b3d2a;
}

.sub {
  font-family: Ubuntu;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  color: #949494;
}

.reach {
  font-family: Marcellus;
  font-size: 32px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0px;
  text-align: left;
  color: #dab38d;
  margin-bottom: 18px;
}

input {
  height: 55px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f0eded;
  border: none;
  color: grey;
  width: 100%;
}

textarea {
  width: 100%;
  height: 147px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f0eded;
  border: none;
  color: grey;
}

.input-row {
  display: flex;
  gap: 20px;
  width: 100%;
}

.input-box {
  flex: 1;
  width: 100%;
  height: 55px;
  padding: 0 1rem;
  border-radius: 10px;
  background-color: #f0eded;
  border: none;
  color: grey;
}

.left-section {
  font-family: Ubuntu;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: #949494;
}

.right-col {
  margin-top: 100px;
  padding-left: 60px;
}

@media (max-width: 768px) {
  .right-col {
    margin-top: 50px;
    padding-left: 15px;
    margin-bottom: 65px;
  }

  .fs-48 {
    font-size: 32px;
    margin-bottom: 15px;
  }

}
</style>
