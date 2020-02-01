//http请求地址
// let baseUrl = "https://api.365tskj.com";
//nginx 跨域
let baseUrl = "";
//
//是否为开发环境
let isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) { //测试环境,代理
	baseUrl = '/dev-api';
}
module.exports = {
	baseUrl,
}
