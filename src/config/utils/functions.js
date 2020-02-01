/**
 * 获取地址栏参数
 * @param {Object} url
 * @param {Object} key
 */
export function getUrlArgs(url, key) {
	let _url = (decodeURIComponent(url) || '?').split('?');
	_url.splice(0, 1);
	_url = _url.join('&');
	let _argArr = (_url || "").split('&');
	let _args = {};
	for (let v in _argArr) {
		let _item = _argArr[v].split('=');
		if (_item[1])
			_args[_item[0]] = _item[1]
	}
	if (key)
		return _args[key];
	return _args;
}
/**
 * 获取路由内所有需要keep-alive的name集合
 * @param {Object} routes
 */
export function getCacheRouter(routes) {
	const cacheRouter = routes.map(item => {
		if (item.meta?.keepAlive) return item.name;
	});
	return cacheRouter.filter(item => !!item);
}
