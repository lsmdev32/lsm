<template>
	<div>
		<div
			class="hamburger-menu"

			@click="toggleMenu"
		>
			<span />
			<span />
			<span />
		</div>
		<div
			class="menu-panel"
			:class="{ open: isOpen }"
		>
			<ul>
				<li>
					<NuxtLink
						style="font-size:medium;"
						to="#"
					>Home</NuxtLink>
				</li>
				<li>
					<NuxtLink
						style="font-size:medium;"
						to="#"
					>About LSM</NuxtLink>
				</li>
				<li>
					<NuxtLink
						style="font-size:medium;"
						to="#"
					>Practice Area</NuxtLink>
				</li>
				<li>
					<NuxtLink
						style="font-size:medium;"
						to="#"
					>Attorneys</NuxtLink>
				</li>
				<li>
					<NuxtLink
						style="font-size:medium;"
						to="#"
					>Publication</NuxtLink>
				</li>
				<li>
					<NuxtLink
						style="font-size:medium;"
						to="#"
					>Blog</NuxtLink>
				</li>
				<li>
					<NuxtLink
						style="font-size:medium;"
						to="#"
					>Contact Us</NuxtLink>
				</li>
				<li>
					<NuxtLink
						style="font-size:medium;"
						to="#"
					>Career</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
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
.hamburger-menu {
    width: 30px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    margin-top: 30px;
    margin-right: 10px;

}

.hamburger-menu span {
    display: block;
    height: 4px;
    background-color: #4B3D2A;
    border-radius: 2px;
}

.menu-panel {
    position: fixed;
    top: 0;
    right: -250px;
    width: 250px;
    height: 100%;
    background-color: #4B3D2A;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    transition: right 0.3s ease;
    padding: 20px;
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
    color: #FAE4CE;
    font-size: 18px;
}
</style>
