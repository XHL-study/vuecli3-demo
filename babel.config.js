module.exports = {
	presets: [
		['@vue/app', {
			polyfills: [
				'es6.array.iterator',
				'es6.promise',
				'es6.object.assign',
				'es7.promise.finally',
				'es6.symbol'
			]
		}],
		["@babel/preset-env", {
			"modules": 'commonjs' //设置为false iview会报错
		}]
	],
	"plugins": [
		['import', {
			libraryName: 'vant',
			libraryDirectory: 'es',
			style: true
		}, 'vant'],
		['component',
			{
				'libraryName': 'element-ui',
				'styleLibraryName': 'theme-chalk'
			}
		],
		["import", {
			"libraryName": "iview",
			"libraryDirectory": "src/components"
		}],
		["@babel/plugin-transform-async-to-generator", {
			"module": "bluebird",
			"method": "coroutine"
		}],
		["@babel/plugin-proposal-optional-chaining"]
	]
}
