const baseUrl = 'https://trailer.boyaokj.cn/api/';
const imgUrl = 'http://store.boyaokj.cn/';
/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */

function getHeader() { //header头部
	return {
		"Accept": "application/json",
		'Content-Type': 'application/json; charset=utf-8', // app header头
		// 　　　　'Content-Type': 'application/x-www-form-urlencoded', // h5 header头
		// 　　　　'ACCESS_TOKEN': `${token}`,
	};
}

const ajax = function(opt) {
	opt = opt || {};
	opt.method = (opt.method && opt.method.toUpperCase()) || 'POST';
	opt.url = baseUrl + opt.url || '';
	opt.async = opt.async || true;
	opt.data = opt.data || null;
	opt.success = opt.success || function() {};
	opt.fail = opt.fail || function() {};
	opt.complete = opt.complete || function() {};
	uni.request({
		method: opt.method,
		dataType: 'json',
		url: opt.url,
		data: opt.data,
		header: getHeader(),
		success: (res) => {
			opt.success(res.data);
		},
		fail: (res) => {
			opt.fail(res);
		},
		complete: (res) => {
			opt.complete(res);
		},
	})
}

const checkLogin = function() {
	if (uni.getStorageSync('members')) {
		let userInfo = uni.getStorageSync('members')
		if (!userInfo.token) {
			uni.showToast({
				title: '登录已过期，请重新登录',
				icon: 'none'
			})
			uni.clearStorageSync()
			setTimeout(() => {
				uni.redirectTo({
					url: '/pages/login/register'
				})
			}, 1000);
		} else {
			ajax({
				url: 'app',
				data: {
					op: 'checkLogin',
					user_id: userInfo.id,
					token: userInfo.token
				},
				method: 'GET',
				success: function(res) {
					if (res.data.errno != 0) {
						uni.showToast({
							title: '您的账号已在其他终端登录',
							icon: 'none'
						})
						uni.clearStorageSync()
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/login/register'
							})
						}, 1000);
					}
				},
			});
		}
	}
}

export default {
	baseUrl,
	imgUrl,
	ajax,
	checkLogin
}
