export default {
	addCount(state, val = 1) {
		console.log(val);
		state.count += val;
		localStorage.count = state.count;
	}
}
