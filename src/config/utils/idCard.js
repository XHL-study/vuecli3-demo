//身份证工具类
export default {
	//获取身份证的性别
	getSex(idCard = "") {
		if (parseInt(idCard.substr(16, 1)) % 2 == 1) {
			return {
				sex: 1,
				text: "男"
			}
		} else {
			return {
				sex: 2,
				text: "女"
			}
		}
	},
	//获取身份证的出生日期
	getDate(idCard = "") {
		let birthday = "";
		if (idCard) {
			birthday = idCard.substr(6, 8);
			birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
		}
		return birthday;
	}
}
