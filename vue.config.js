const path = require('path');
const fs = require("fs");

function resolve(dir) {
	return path.join(__dirname, dir);
}

//判断是否为发布模式
const isProduction = process.env.NODE_ENV === 'production';
//打包压缩代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//生成 gz 包
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css'];

//-----------------***************打包配置********************---------------------///
//是否打包为相对路径=true，绝对路径=false
const outRelativePath = true;
let publicPath = '/admin';
//打包文件的输出目录
const outPath = 'dist' + publicPath;
//根据outRelativePath 设置项目根地址
publicPath = outRelativePath ? './' : publicPath;

//-----------------***************自动获取调试地址(IP:port)********************---------------------///
const interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
let IPAdress = '';
for (let devName in interfaces) {
	if (devName.indexOf("以太网") < 0)
		continue;
	let iface = interfaces[devName];
	for (let i = 0; i < iface.length; i++) {
		let alias = iface[i];
		if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal && !IPAdress) {
			IPAdress = alias.address;
		}
	}
}
const port = 8080;

const vueConfig = {
	runtimeCompiler: true,
	publicPath: publicPath,
	outputDir: outPath,
	// pages: pages,
	//assetsDir:"html",
	lintOnSave: false,
	//去掉生成文件的hash
	filenameHashing: false,
	// webpack配置
	chainWebpack: (config) => {
		//去掉 预加载
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');

		// 路径别名
		// config.resolve.alias
		// .set('vue', resolve('vue/dist/vue.js'));
		// 	.set('@assets', resolve('src/assets'))
	},
	configureWebpack: (config) => {
		if (isProduction) {
			//gz 包
			// config.plugins.push(new CompressionWebpackPlugin({
			// 	algorithm: 'gzip',
			// 	test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
			// 	threshold: 10240,
			// 	minRatio: 0.8,
			// }));

			// js代码压缩，是否生成map资源
			config.plugins.push(
				new UglifyJsPlugin({
					sourceMap: vueConfig.productionSourceMap,
					uglifyOptions: {
						warnings: false,
						compress: {
							drop_debugger: true,
							//drop_console: true,
							pure_funcs: ['console.log', 'console.warn', 'console.info', 'console.dir']
						},
					},
				}));
			//模块切片配置
			config.optimization.splitChunks.cacheGroups.vendors = {
				name: 'chunk-common',
				test: /[\\\/](vue|vant|vue-router|bluebird)[\\\/]/,
				priority: -20,
				chunks: 'initial',
			}
			config.optimization.splitChunks = {
				chunks: "async",
				minSize: 0, // 模块的最小体积
				minChunks: 1, // 模块的最小被引用次数
				maxAsyncRequests: 5, // 按需加载的最大并行请求数
				maxInitialRequests: 3, // 一个入口最大并行请求数
				automaticNameDelimiter: '~', // 文件名的连接符
				name: true,
				cacheGroups: { // 缓存组
					vendorEcharts: {
						test: /[\\/](echarts)[\\/]/,
						priority: -10
					},
					vendorXlsx: {
						test: /[\\/](xlsx|file-saver)[\\/]/,
						priority: -10
					},
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -12
					},
					default: {
						minChunks: 2,
						priority: -30,
						reuseExistingChunk: true
					}
				}
			};
		}
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {},
		// 启用 CSS modules for all css / pre-processor files.
		modules: false
	},
	parallel: require('os').cpus().length > 1,
	pwa: {},
	// webpack-dev-server 相关配置
	devServer: {
		open: true, //配置自动启动浏览器
		host: IPAdress,
		port: port, // 端口号
		https: false,
		hotOnly: true, // https:{type:Boolean}
		proxy: require(resolve(`src/config/proxy.js`)), // 配置跨域处理,只有一个代理
		after: (app, server) => {
			//配置本地 如果开启 https，则创建http服务
			if (vueConfig.devServer.https) {
				//https
				const port = vueConfig.devServer.port + 1;
				const https = require("http");
				https.createServer(app).listen(port, vueConfig.devServer.host);
				const httpUri = 'http://' + vueConfig.devServer.host + ":" + port;
				console.log('\n\n App running at http: \n\n  - http-uri ' + httpUri + '\n\n');
			}
		}
	},

	// 第三方插件配置
	pluginOptions: {
		webpackBundleAnalyzer: {
			openAnalyzer: false,
			analyzerMode: 'static',
		},
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: ['src/assets/css/variable.scss']
		}
	},
	//使用babel转译以下模块
	transpileDependencies: ['iview', 'mini-css-extract-plugin', 'sort-keys', 'prepend-http']
}

module.exports = vueConfig;
