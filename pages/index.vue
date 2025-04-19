<script setup lang="ts">
</script>

<template lang="html">
	<div>
		<section class="md:min-w-full">
			<div class="banner sm:h-[445px] sm:w-auto md:h-[575px] z-0">
				<div class="flex flex-col items-start justify-start text-left pl-[30px] py-[30px] md:pl-12 ">
					<div class="z-10">
						<h1 class="text-6xl font-bold">
							Lubis,<br> Santosa <br>& Mitra
						</h1>
					</div>
					<div class="pt-[160px]">
						<h2 class="text-2xl font-bold">
							Local Wisdom,<br>Legal Insight
						</h2>
					</div>
				</div>
			</div>
		</section>
		<section class="md:min-w-full">
			<div class="banner-small sm:h-[445px] sm:w-auto pl-[30px] z-0">
				<div class=" text-left font-philosopher z-10">
					<h2 class="text-2xl font-bold">
						Dispute Resolution
					</h2>
				</div>
			</div>
		</section>
		<section class="sm:justify-center md:min-w-full">
			<div class="banner-small sm:h-[445px] sm:w-auto pl-[30px] z-0">
				<div class="text-center font-philosopher z-10">
					<h2 class="text-2xl font-bold">
						Corporate Commercial
					</h2>
				</div>
			</div>
		</section>
		<section class="sm:justify-center md:min-w-full">
			<div class="banner-small sm:h-[445px] sm:w-auto pl-[30px] z-0">
				<div class="text-center font-philosopher z-10">
					<h2 class="text-2xl font-bold">
						Intelectual Property
					</h2>
				</div>
			</div>
		</section>
		<section class="sm:justify-center md:min-w-full">
			<h1 class="text-3xl font-bold text-center pt-[15px] pb-[30px]">
				News and Publication
			</h1>
		</section>
	</div>
</template>

<style>
.banner {
	background: url('~/assets/images/banner1.svg') no-repeat center center;
	background-size: cover;
	height: 445px;
	display: flex;
	align-items: center;
	margin-right: 15px;
	margin-left: 15px;
	margin-bottom: 15px; /* Added margin-bottom */
	z-index: 0;
}
.banner-small {
	background: url('~/assets/images/banner1.svg') no-repeat center center;
	background-size: cover;
	height: 89px;
	display: flex;
	align-items: center;
	justify-content: left;
	margin-right: 15px;
	margin-left: 15px;
	margin-bottom: 15px;
	z-index: 0;
}
</style>
