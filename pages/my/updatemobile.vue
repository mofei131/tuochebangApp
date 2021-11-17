<template>
	<view class="content">
		<view class="list">
			<view class="list-call">
				<input class="sl-input" type="text" maxlength="11" v-model="phone" placeholder="请输入手机号" />
				<view class="eay1"><image @click="mqing" src="../../static/images/null.png"></image></view>
			</view>
			<view class="list-call">
				<input class="sl-input" type="text" v-model="code" maxlength="6" placeholder="请输入验证码" />
				<view class="yzm" :class="{ yzms: second > 0 }" @tap="getcode">{{ yanzhengma }}</view>
			</view>
		</view>
		<view class="button-login" hover-class="button-hover" @tap="save()"><text>保存</text></view>
		<takinfo></takinfo>
	</view>
</template>

<script>
var _this, js;
export default {
	data() {
		return {
			phone: '',
			second: 0,
			code: '',
			showPassword: false,
			dis: false,
			show: true,
			btn: false
		};
	},
	onLoad() {
		_this = this;
	},
	computed: {
		yanzhengma() {
			if (this.second == 0) {
				return '| 获取验证码';
			} else {
				return this.second + 's';
			}
		}
	},
	onUnload() {
		this.clear();
	},
	methods: {
		lst() {
			if (this.show) {
				this.show = false;
			} else {
				this.show = true;
			}
		},
		pqing() {
			this.phone = '';
		},
		mqing() {
			this.password = '';
		},
		display() {
			this.showPassword = !this.showPassword;
		},
		clear() {
			clearInterval(js);
			js = null;
			this.second = 0;
		},
		getcode() {
			if (this.phone.length != 11) {
				uni.showToast({
					icon: 'none',
					title: '手机号不正确'
				});
				return;
			}
			if (this.second > 0) {
				return;
			}
			_this.second = 60;
			this.http.ajax({
				url: 'app/getVerifyCode',
				method: 'GET',
				data: {
					mobile: this.phone
				},
				success: function(res) {
					js = setInterval(function() {
						_this.second--;
						if (_this.second == 0) {
							_this.clear();
						}
					}, 1000);
				}
			});
		},
		save() {
			if (this.phone.length != 11) {
				uni.showToast({
					icon: 'none',
					title: '手机号不正确'
				});
				return;
			}
			if (this.code == '') {
				uni.showToast({
					icon: 'none',
					title: '验证码不能为空'
				});
				return;
			}
			this.http.ajax({
				url: 'app/resetMobile',
				method: 'GET',
				data: {
					newmobile: this.phone,
					user_id: uni.getStorageSync('userInfo').id,
					code: this.code
				},
				success: function(res) {
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					});
					uni.redirectTo({
					    url: 'index'
					});
				}
			});
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.tishi {
	color: #51565d;
	font-size: 32rpx;
	line-height: 50rpx;
	margin: auto;
	margin-bottom: 35rpx;
	margin-top: 69rpx;
}
.eay1 {
	position: absolute;
	top: 5rpx;
	right: 5rpx;
}
.eay1 image {
	width: 66rpx;
	height: 66rpx;
	top: 38rpx;
	margin-right: 30rpx;
}
.list {
	display: flex;
	flex-direction: column;
	padding: 20rpx 35rpx 0;
}

.list-call {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 76rpx;
	width: 680rpx;
	color: #666;
	background: #f4f4f4;
	border-radius: 39rpx;
	font-size: 26rpx;
	margin-top: 20rpx;
	padding: 0 31rpx;
	box-sizing: border-box;
}

.list-call .img {
	width: 40rpx;
	height: 40rpx;
	margin-right: 20rpx;
}

.list-call .sl-input {
	flex: 1;
	text-align: left;
	font-size: 26rpx;
}

.button-login {
	width: 680rpx;
	height: 76rpx;
	background: #1890ff;
	border-radius: 39rpx;
	/* opacity: 0.4; */
	text-align: center;
	color: #fff;
	line-height: 70rpx;
	margin: auto;
	margin-top: 32rpx;
}

.yzm {
	color: #1890ff;
	font-size: 26rpx;
	line-height: 64rpx;
	padding-left: 10rpx;
	padding-right: 10rpx;
	width: auto;
	height: 64rpx;
	/* border: 1rpx solid #FFA800; */
	border-radius: 50rpx;
}

.yzms {
	color: #1890ff !important;
	/* border: 1rpx solid #999999; */
}
.agreement {
	display: flex;
	margin-left: 35rpx;
	color: #666666;
	font-size: 22rpx;
	line-height: 30rpx;
	margin-top: 18rpx;
	box-sizing: border-box;
}
</style>
