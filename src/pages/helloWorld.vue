<template>
	<div class="hellowWorld">
		<div style="border-bottom: 1px solid black;height: 20px;">global state</div>
		<br />
		count:{{ count }}
		<br />
		alisCount:{{ alisCount }}
		<br />
		countFunc:{{ countFunc }}
		<br />
		<button @click="addCount(2)">addCount++</button>
		<button @click="addCount_emit_type(1.1)">addCount_emit_type++</button>
		<button @click="emitAddCount(2.6)">emitAddCount++</button>
		<div style="border-bottom: 1px solid black;height: 20px;">module state</div>
		<br />
		cart.num:{{ num }}
		<br />
		cart.alisNum:{{ alisNum }}
		<br />
		<button @click="addNum(21)">addNum++</button>
		<button @click="emitAddNum(90)">emitAddNum++</button>
		<!-- d -->
		<button @click="openPage('/test/123')">/test/123</button>
		<button @click="openPage('/test/sdfsd')">/test/sdfsd</button>
		{{ cacheRouter }}
		<el-tabs v-model="tab" type="card">
			<el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name" :name="item.path"><router-view></router-view></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import MyPriviewImage from '@/components/my-priview-image';

export default {
	name: 'hellowWorld', //
	data() {
		return {
			text: 'count值：',
			tabs: [],
			tab: ''
		};
	},
	computed: {
		...mapState({
			count: state => state.count,
			alisCount: 'count',
			countFunc(state) {
				return this.text + state.count;
			}
		}),
		...mapState('cart', {
			num: state => state.num,
			alisNum: 'num'
		}),
		cacheRouter() {
			return ['test'];
		}
	},
	watch: {
		tab(to) {
			// this.$router.replace({
			// 	path: to
			// });
			if (to) location.hash = to;
		},
		$route(to) {
			if (to.path.split('/').length > 1) this.tab = to.path;
		}
	},
	created() {},
	mounted() {
		const img = 'http://p2.qhimg.com/dmfd/320_180_/t01a314476c59a37121.jpg';
		const priv = MyPriviewImage.open({
			index: 0,
			list: [img, img, img, img, img],
			change(index) {
				console.log('图片下标', index);
			}
		});
		setTimeout(() => {
			priv.close();
		}, 3000);
	},
	methods: {
		...mapMutations(['addCount']),
		...mapActions(['emitAddCount']),
		...mapMutations('cart', ['addNum']),
		...mapActions('cart', ['emitAddNum']),
		addCount_emit_type(val) {
			this.$store.commit('addCount', val);
			// this.$store.commit({
			// 	type:'addCount',
			// 	val
			// });
		},
		openPage(url) {
			// this.$router.push({
			// 	path: url,
			// 	query: {
			// 		dt: 'xx',
			// 		time: Date.now()
			// 	}
			// });
			const path = url;
			const has = this.tabs.filter(item => item.path == path);
			if (has.length <= 0) {
				this.tabs.push({
					path: url,
					name: url
				});
				this.$router.push({
					path: url,
					query: {
						time: Date.now()
					}
				});
			}
			this.tab = path;
		}
	}
};
</script>

<style lang="scss" scoped></style>
