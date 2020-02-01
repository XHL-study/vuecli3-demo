export default {
	/**
	 * date:日期，不传则返回当前日期
	 * spacer:日期间隔符，默认‘-’	
	 * 
	 */
	DateFormatToString(date = '', hms = false, spacer = '-') {
		let _date;
		if (date) {
			if (typeof date == 'string')
				date = date.replace(/-/g, '/');
			_date = new Date(date);
		} else {
			_date = new Date();
		}
		let _y = _date.getFullYear(),
			_m = this.NumTrans(_date.getMonth() + 1),
			_d = this.NumTrans(_date.getDate());

		if (hms) {
			let _hh = this.NumTrans(_date.getHours()),
				_mm = this.NumTrans(_date.getMinutes()),
				_ss = this.NumTrans(_date.getSeconds());
			return _y + spacer + _m + spacer + _d + ` ${_hh}:${_mm}:${_ss}`;
		}

		return _y + spacer + _m + spacer + _d;
	},
	getDateWeekDay(date) { //得到 日期是星期几
		if (!date) return -1;
		if (typeof date != 'string') return date.getDay();
		let tmp = this.DateFormatToString(date, '/');
		return new Date(tmp).getDay();
	},
	DiffDate(d1, d2) { //计算两个日期的相差天数
		if (!d1 || !d2)
			return 0
		let s = new Date(this.DateFormatToString(d1)).getTime();
		let e = new Date(this.DateFormatToString(d2)).getTime();
		return (e - s) / 1000 / 60 / 60 / 24
	},
	NumTrans(num = 0) {
		if (num < 10)
			return '0' + num;
		return num;
	},
	DiffYear(d1, d2) { //计算两个日期相差的年 d1：减数，d2：被减数
		if (!d1)
			return 0;
		let s = new Date(this.DateFormatToString(d1)).getFullYear();
		let e = new Date(this.DateFormatToString(d2)).getFullYear();
		return (e - s)
	}
}
