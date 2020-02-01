import Vue from 'vue';
import Router from 'vue-router'
import {
	getCacheRouter
} from '@/config/utils/functions.js'
Vue.use(Router)

const mode = "hash";
// const mode = "history";
//--------------------------路由-begin

const helloWorld = () => import( /* webpackChunkName: 'main' */ '@/pages/helloWorld');
const test = () => import( /* webpackChunkName: 'main' */ '@/pages/test');

export const routes = [{
	path: '/',
	name: 'helloWorld',
	component: helloWorld,
	meta: {
		title: "helloworld",
		keepAlive: false,
	},
	children: [{
		path: '/test/:id',
		name: 'test',
		component: test,
		meta: {
			title: "test",
			keepAlive: true,
		}
	}, ]
}, 
// {
// 	path: '/test/:id',
// 	name: '/test/:id',
// 	component: test,
// 	meta: {
// 		title: "test",
// 		keepAlive: true,
// 	}
// }, 
];

//--------------------------路由-end

let router = new Router({
	mode,
	routes
});

//路由狗子-前置
router.beforeEach((to, from, next) => {
	next();
})


export const cacheRouter = getCacheRouter(routes);
export default router;
