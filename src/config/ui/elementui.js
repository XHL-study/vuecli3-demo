import Vue from 'vue';

//element-ui预览图组件样式
import 'element-ui/packages/theme-chalk/lib/image.css'
import 'element-ui/packages/theme-chalk/lib/icon.css'
import {
	Tabs,
	TabPane
} from 'element-ui';
console.log(require('element-ui'));

let components = [Tabs, TabPane];
components.forEach(item => Vue.use(item));
