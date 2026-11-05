<template>
  <IconMenu
    v-if="!isOpen"
    class="hamburger-menu animate-in spin-in my-4 size-[40px] cursor-pointer text-[#4B3D2A] duration-200"
    @click="toggleMenu"
  />
  <IconX
    v-else
    class="hamburger-menu animate-in spin-in my-auto size-[40px] cursor-pointer text-[#4B3D2A] duration-200"
    @click="toggleMenu"
  />

  <div ref="menuPanel" class="menu-panel" :class="{ open: isOpen }">
    <ul>
      <li>
        <NuxtLink to="/" @click="closeMenu">Home</NuxtLink>
      </li>
      <!-- <li>
				<NuxtLink
					to="/about"
					@click="closeMenu"
				>About LSM</NuxtLink>
			</li> -->
      <li>
        <NuxtLink to="/practice-area" @click="closeMenu"
          >Practice Area</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/attorneys" @click="closeMenu">Attorneys</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/publications" @click="closeMenu">Publication</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/blogs" @click="closeMenu">Updates</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contact-us" @click="closeMenu">Contact Us</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/career" @click="closeMenu">Career</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { Menu as IconMenu, X as IconX } from "lucide-vue-next";

export default {
  components: {
    IconMenu,
    IconX,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    toggleMenu(event) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
    handleOutsideClick(event) {
      const { menuPanel } = this.$refs;
      const { target } = event;

      if (!(target instanceof Element)) {
        return;
      }

      if (!menuPanel?.contains(target) && !target.closest(".hamburger-menu")) {
        this.closeMenu();
      }
    },
  },
};
</script>

<style scoped>
.menu-panel {
  position: fixed;
  top: 80px; /* Start below the navbar */
  right: -100%;
  width: 100%;
  height: calc(100% - 60px); /* Adjust height to not cover the navbar */
  background: url("~/assets/images/accent2.svg");
  background-color: #dab38d;
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
  color: #4b3d2a;
  text-decoration: none;
  font-family: Macellus;
  font-size: 24px;
}

.menu-panel a:hover {
  text-decoration: none;
  color: #4b3d2a;
  font-size: 18px;
}
</style>
