export default {
	emitAddNum({
		commit
	}, val = 1) {
		commit('addNum', val);
	}
}
