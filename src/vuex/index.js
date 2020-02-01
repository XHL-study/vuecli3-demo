import Vuex from 'vuex';
import Vue from 'vue'
Vue.use(Vuex);

import mutations from './mutations.js';
import actions from './actions.js';

import cart from './module/cart';

const store = new Vuex.Store({
	state() {
		const count = parseFloat(localStorage.count) || 0;
		return {
			count: count,
		}
	},
	mutations: mutations,
	actions: actions,
	modules:{
		cart
	}
});

export default store;
