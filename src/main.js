import Vue from 'vue';
import App from './App.vue';
import store from './vuex/index.js'
import router from './config/router.js';
import './config/index.js';
new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
})
