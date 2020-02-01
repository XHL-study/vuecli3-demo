export default {
	addNum(state, val = 1) {
		state.num += val;
		localStorage.num = state.num;
	}
}
