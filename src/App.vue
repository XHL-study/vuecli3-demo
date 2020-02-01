<template>
	<div id="app">
		<keep-alive><router-view /></keep-alive>
	</div>
</template>
<script>
export default {
	name: 'app',
	data() {
		return {};
	}
};
</script>
<style lang="scss">
* {
	margin: 0;
	padding: 0;
	word-break: break-all;
	word-wrap: break-word;
}
</style>
