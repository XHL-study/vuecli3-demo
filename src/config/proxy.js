/**
 * 调试代理配置
 */

module.exports = {
	"/dev-api": {
		target: "http://dev.health-admin.365tskj.com", 
		changeOrigin: true, 
		ws: true, 
		pathRewrite: {
			'^/dev-api': ''
		}
	},
}
