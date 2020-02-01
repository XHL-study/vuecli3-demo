import axios from 'axios'

import qs from 'qs'

//添加一个请求发出前的拦截器
axios.interceptors.request.use(function(config) {
	if (config.method.toLocaleLowerCase() == 'get') {
		config.params = config.data;
		delete config.data;
	}
	return config;
}, function(error) {
	return Promise.reject(error)
});

//添加一个响应请求的拦截器
axios.interceptors.response.use(function(res) {
	return (res.msg ? res : res.data) || (typeof res.request.responseText == 'string' ? JSON.parse(res.request.responseText) :
		res.request.responseText);
}, function(error) {
	return Promise.reject(error)
})

// 默认请求
const http = (data) => {
	return axios({
		method: data.methodType || 'get',
		url: data.url || '',
		data: data.data || {},
		paramsSerializer: function(params) {
			return qs.stringify(params);
		},
		headers: data.header || {},
		responseType: data.dataType || 'json'
	});
}


const get = (data) => {
	data.methodType = 'get';
	return http(data);
}

const post = (data) => {
	data.methodType = 'post';
	return http(data);
}
const put = (data) => {
	data.methodType = 'put';
	return http(data);
}
const del = (data) => {
	data.methodType = 'delete';
	return http(data);
}

//错误处理函数 - 有意图的错误
function MyIntentError(message = '', intent = '') {
	this.name = 'MyIntentError';
	this.message = message;
	this.intent = intent;
	this.stack = (new Error()).stack;
}

//错误处理函数 - 标准的错误
function MyNormalError(message = '请求出错了,请重试') {
	this.name = 'MyNormalError';
	this.message = message;
	this.stack = (new Error()).stack;
}

MyIntentError.prototype = Object.create(Error.prototype);
MyIntentError.prototype.constructor = MyIntentError;

MyNormalError.prototype = Object.create(Error.prototype);
MyNormalError.prototype.constructor = MyNormalError;

export default {
	http,
	get,
	post,
	del,
	put,
	MyNormalError,
	MyIntentError
};
