import actions from './actions.js';
import mutations from './mutations.js';
export default {
	namespaced: true,
	state() {
		const num = parseFloat(localStorage.num) || 0;
		return {
			num: num
		}
	},
	actions,
	mutations
}
