<template>
	<view class="content">
		<view class="header">
			<view>密码账号登录</view>
		</view>

		<view class="list">
			<view class="list-call">
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="输入登录手机号码"
					placeholder-style="color:#C1C2C3;" @input="pho" />
					<view class="eay" v-if="btn">
						<image @click="pqing" src="../../static/images/null.png"></image>
					</view>
			</view>
			<view class="list-call">
				<input class="sl-input" v-model="password" type="text" maxlength="32"
					placeholder="输入登录密码" placeholder-style="color:#C1C2C3;" :password="show" @input="int" />
					<view class="eay2" v-if="dis">
						<image @click="mqing" src="../../static/images/null.png"></image>
						<image @click="lst" :src="show==true?'../../static/images/eaybi.png':'../../static/images/eaykai.png'" mode=""></image>
					</view>
			</view>

		</view>
		<view class="agreement">
			<image class="limg" :src="ling?'../../static/images/xding.png':'../../static/images/buzhong.png'" @click="dlng"></image>
			<text>请同意</text>
			<navigator url="yonghuxieyi" open-type="navigate">用户协议</navigator>
			<text>和</text>
			<navigator url="yinsizhengce" open-type="navigate">隐私政策</navigator>
		</view>
		<view class="button-login"  ref="login" @tap="bindLogin()" v-if="dis">
			<text>确认登录</text>
		</view>
		<view class="button-login2"  ref="login"  v-else>
			<text>确认登录</text>
		</view>

		<view class="agreenment">
			<navigator url="register" open-type="navigate">注册账户</navigator>
			<navigator url="forget" open-type="navigate">忘记密码?</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
				dis:false,
				show:true,
				btn:false,
				scene:'',
				ling:false
			};
		},
		onShow() {
		},
		methods: {
			dlng(){
				this.ling = !this.ling
			},
			lst(){
				if(this.show){
					this.show = false
				}else{
					this.show = true
				}
			},
			pqing(){
				this.phone = ''
			},
			mqing(){
				this.password = ''
			},
			pho(){
				if(this.phone.length != 0){
					this.btn = true
				}else{
					this.btn = false
				}
			},
			int(){
				if(this.password.length != 0){
					this.dis = true
				}else{
					this.dis = false
				}
			},
			bindLogin() {
				if (!this.ling) {
					uni.showToast({
						icon: 'none',
						title: '请同意用户协议'
					});
					return;
				}
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				this.http.ajax({
					url: 'app/login',
					method: 'GET',
					data: {
						mobile: this.phone,
						password: this.password,
					},
					success: function(res) {
						if (res.code == 200) {
							uni.setStorageSync('userInfo', res.data)
							uni.showToast({
								title: '登录成功',
								duration:1000
							})
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							},1000)
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	.limg{
		width: 36rpx;
		height: 36rpx;
	}
	.eay,.eay2{
		position: absolute;
		top: 5rpx;
		right: 5rpx;
	}
	.eay2 image,.eay image{
		width: 66rpx;
		height: 66rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header view{
		font-size: 32rpx;
		font-family: Helvetica;
		color: #51565D;
		text-align: center;
		margin-top: 89rpx;
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
		background: #F4F4F4;
		border-radius: 39rpx;
		font-size: 26rpx;
		margin-top: 20rpx;
		padding: 0 31rpx;
		position: relative;
		box-sizing: border-box;
	}

	.list-call:nth-child(2) {
		margin-top: 20rpx;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 26rpx;
		box-sizing: border-box;
	}

	.button-login {
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		/* opacity: 0.4; */
		text-align: center;
		color: #fff;
		line-height: 70rpx;
		margin: auto;
		margin-top: 32rpx;
	}
	.button-login2 {
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		/* opacity: 0.4; */
		text-align: center;
		color: #fff;
		line-height: 70rpx;
		margin: auto;
		margin-top: 32rpx;
		opacity: .4;
	}

	.active {
		opacity: 1;
	}

	.agreenment {
		width: 680rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 22rpx;
		padding-top: 18rpx;
		color: #666;
		text-align: center;
		margin: auto;
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

	.agreement navigator {
		opacity: .8;
		border-bottom: 1rpx solid #666;
	}
</style>
