<template>
	<IconMenu
		v-if="!isOpen"
		class="hamburger-menu size-[40px] cursor-pointer my-4 text-[#4B3D2A] animate-in spin-in duration-200"
		@click="toggleMenu"
	/>
	<IconX
		v-else
		class="hamburger-menu size-[40px] cursor-pointer my-auto text-[#4B3D2A] animate-in spin-in duration-200"
		@click="toggleMenu"
	/>

	<div
		class="menu-panel"
		:class="{ open: isOpen }"
	>
		<ul>
			<li>
				<NuxtLink
					style="font-size:medium;"
					to="/"
					@click="closeMenu"
				>Home</NuxtLink>
			</li>
			<li>
				<NuxtLink
					style="font-size:medium;"
					to="/about"
					@click="closeMenu"
				>About LSM</NuxtLink>
			</li>
			<li>
				<NuxtLink
					style="font-size:medium;"
					to="/practiceArea"
					@click="closeMenu"
				>Practice Area</NuxtLink>
			</li>
			<li>
				<NuxtLink
					style="font-size:medium;"
					to="/Attorneys"
					@click="closeMenu"
				>Attorneys</NuxtLink>
			</li>
			<li>
				<NuxtLink
					style="font-size:medium;"
					to="/publication"
					@click="closeMenu"
				>Publication</NuxtLink>
			</li>
			<li>
				<NuxtLink
					style="font-size:medium;"
					to="#"
					@click="closeMenu"
				>Blog</NuxtLink>
			</li>
			<li>
				<NuxtLink
					style="font-size:medium;"
					to="/ContactUs"
					@click="closeMenu"
				>Contact Us</NuxtLink>
			</li>
			<li>
				<NuxtLink
					style="font-size:medium;"
					to="/career"
					@click="closeMenu"
				>Career</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script>
import { Menu as IconMenu, X as IconX } from "lucide-vue-next"

export default {
	components: {
		IconMenu,
		IconX,
	},
	data() {
		return {
			isOpen: false,
		}
	},
	mounted() {
		document.addEventListener("click", this.handleOutsideClick)
	},
	beforeUnmount() {
		document.removeEventListener("click", this.handleOutsideClick)
	},
	methods: {
		toggleMenu(event) {
			event.stopPropagation()
			this.isOpen = !this.isOpen
		},
		closeMenu() {
			this.isOpen = false
		},
		handleOutsideClick(event) {
			const menuPanel = this.$el.querySelector(".menu-panel")
			const hamburgerMenu = this.$el.querySelector(".hamburger-menu")
			if (
				!menuPanel.contains(event.target)
				&& !hamburgerMenu.contains(event.target)
			) {
				this.closeMenu()
			}
		},
	},
}
</script>

<style scoped>
.menu-panel {
	position: fixed;
	top: 80px; /* Start below the navbar */
	right: -100%;
	width: 100%;
	height: calc(100% - 60px); /* Adjust height to not cover the navbar */
	background: url('~/assets/images/accent2.svg');
	background-color: #DAB38D;
	background-size: cover;
	background-position: center;
	box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
	transition: right 0.3s ease;
	padding: 20px;
	z-index: 1000; /* Ensure it stays below the navbar */
}

.menu-panel.open {
	right: 0;
}

.menu-panel ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.menu-panel li {
	margin: 30px 0;
}

.menu-panel a {
	text-decoration: none;
	color: #fff;
	font-size: 18px;
}

.menu-panel a:hover {
	text-decoration: none;
	color: #4B3D2A;
	font-size: 18px;
}
</style>
