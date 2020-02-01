import _priview from './my-priview-image.vue';
import Vue from 'vue';

const PriviewImageConstructor = Vue.extend(_priview);

let _instance, _PriviewImage;
const initInstance = () => {
	if (!_instance) {
		_instance = new PriviewImageConstructor();
		_instance.vm = _instance.$mount();
	}
}

const PriviewImage = function(options) {
	initInstance();
	options = options || {};
	if (typeof options !== 'object')
		throw new Error("options must object");
	const appendEl = options.appendEl || 'body';
	document.querySelector(appendEl).appendChild(_instance.vm.$el);
	return PriviewImage;
}

PriviewImage.open = (options) => {
	if (!_PriviewImage)
		_PriviewImage = new PriviewImage(options);
	_instance.open(options);
	return _PriviewImage;
}

PriviewImage.close = (options) => {
	_instance.close();
	_instance = null;
	_PriviewImage = null;
}


export default PriviewImage;
export {
	PriviewImage
};
