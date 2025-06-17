<script setup lang="ts">
import { ref } from "vue"
import Button from "../../components/audience/Button.vue"

const name = ref("")
const email = ref("")
const message = ref("")
const loading = ref(false)

const subscribe = async () => {
	loading.value = true
	message.value = ""

	if (!name.value.trim() || !email.value.trim()) {
		message.value = "Please enter both name and email before subscribing."
		loading.value = false
		return
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(email.value)) {
		message.value = "Please enter a valid email address."
		loading.value = false
		return
	}

	const resetMessageAfterDelay = () => {
		setTimeout(() => {
			message.value = ""
		}, 5000)
	}
	try {
		const res = await $fetch("/api/subscribe", {
			method: "POST",
			body: { name: name.value, email: email.value },
		})

		if (res.success) {
			message.value = `Success! ${email.value} was subscribed to our newsletter.`
			name.value = ""
			email.value = ""
		}
		else {
			message.value = res.message || "Subscription failed."
		}
	}
	catch (e) {
		message.value = "Something went wrong during subscription."
	}

	loading.value = false
	resetMessageAfterDelay()
}
</script>

<template>
	<div class="container-footer background-footer">
		<div>
			<img
				src="../../assets/images/LSM_Logo-White.svg"
				alt="lsm-white"
				class="logo-white"
			>

			<div class="left-section">
				Equity Tower, 12th Floor <br>
				Sudirman Central Business District (SCBD) <br>
				Jl. Jend. Sudirman Kav. 52-53, Jakarta 12190 <br>
				Indonesia<br><br>

				E-mail: lsmlawfirm@lsmlaw.co.id <br>Telephone: (62-21)2903-5900
				<br>Fax: (62-21)2903-5909 <br><br><br>
				<a
					href="/"
					class="bottom-text-style"
				>
					WWW.LSMLAW.CO.ID
				</a>
				<br><br><br>
				<div class="bottom-text-style">
					© 2025 All Rights Reserved.
				</div>
			</div>
		</div>
		<div>
			<div>
				<div
					class="font-marcellus"
					style="font-size: 32px; color: black; margin-bottom: 40px"
				>
					Subscribe to our newsletter
				</div>

				<input
					v-model="name"
					type="text"
					placeholder="Name"
					class="text-black"
					required
				>
				<br>
				<input
					v-model="email"
					type="email"
					placeholder="Email"
					class="text-black"
					required
				>

				<!-- Pesan sukses / gagal -->
				<div
					v-if="message"
					class="mb-6 mt-[-10px] text-sm text-black font-bold message-box"
				>
					{{ message }}
				</div>

				<div class="button-wrapper">
					<Button
						:text-button="loading ? 'Loading...' : 'Subscribe'"
						:type="'button'"
						@click="subscribe"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container-footer {
  padding: 70px 10%;
  display: flex;
  background-color: #dab38d;
  color: white;
  justify-content: space-between;
  align-items: center;
}

.message-box {
  color: #4b3d2a;
  font-size: 14px;
  font-weight: 500;
  max-width: 20rem;

  text-align: center;
  word-wrap: break-word;
}

.font-philosopher {
  font-size: 20px;
}

.left-section {
  color: #4b3d2a;
  font-size: 16px;
  margin-top: 40px;
  line-height: 140%;
}

input {
  height: 3rem !important;
  width: 20rem;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 5px;
  overflow: visible;
  margin-bottom: 30px;
  padding: 5px 10px;
}

input:focus {
  outline: none;
}

.background-footer {
  background-image: url("../../assets/images/footer-bg.svg");
  background-position: right center;
  background-repeat: no-repeat;
  background-size: contain;
}

.font-philosopher {
  font-size: 25px;
}

.bottom-text-style {
  letter-spacing: 1.5px;
  color: #4b3d2a;
  font-size: 10px;
}

@media (max-width: 768px) {
  .background-footer {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .left-section {
    font-size: 15px;
  }
  .font-philosopher {
    font-size: 20px;
  }
  .container-footer {
    flex-direction: column-reverse;
    padding: 40px 5%;
  }

  .font-marcellus {
    text-align: center;
  }

  input {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
  }
}
</style>
