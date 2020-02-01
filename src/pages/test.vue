<template>
	<div class="test">
		{{ $route.params }}
		<br />
		<input v-model="val" placeholder="请输入一些东西" />
	</div>
</template>

<script>

export default {
	name:"test",
	data() {
		return {
			val: 'x',
			test:this.$route.params.id
		};
	},
	created() {},
	methods: {},
};
</script>

<style lang="scss" scoped></style>
