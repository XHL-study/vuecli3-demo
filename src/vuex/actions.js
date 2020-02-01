export default {
	emitAddCount({
		commit
	}, val = 1) {
		commit('addCount', val);
	}
}
