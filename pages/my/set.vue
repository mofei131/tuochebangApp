<template>
	<view>
		<view class="tanchuang" style="float: left;">
				<view class="juli">提示：有新的订单</view>
				<div class="qd" style="float: left;line-height: 80rpx;">
					<button class="qiangdan">去抢单(<span>10</span>s)</button>
				</div>
		</view>
		<!-- <view class="guidelist" v-for="(item,index) in article" :key="index" @tap="pandaun(index)"> -->
		<view class="guidelist" @tap="personaldata()">
			<view class="guideitem">
				<view>个人资料</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="updatemobile()">
			<view class="guideitem">
				<view>修改手机号</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="updatepwd()">
			<view class="guideitem">
				<view>修改登录密码</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="updatepaypwd()">
			<view class="guideitem">
				<view>修改支付密码</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="pandaun(index)">
			<view class="guideitem">
				<view>订单消息提示</view>
				<switch checked @change="switch1Change"  style="transform: scale(0.7,0.7);"/>
			</view>
		</view>
		<view class="guidelist" @tap="out()">
		<!-- <view class="guidelist" @tap="signout(index)"> -->
			<view class="guideitem">
				<view>退出登录</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				decide:false,
				ji:'',
				article:[]
			}
		},
		onLoad() {
			let that = this
			uni.request({
				url:'https://trailer.boyaokj.cn/api/commission/notice',
				method:'POST',
				success(res) {
					that.article = res.data.data
				}
			})
		},
		methods:{
			out(){
				uni.removeStorageSync('userInfo')
				uni.switchTab({
					url:'../index/index'
				})
			},
			//修改手机号
			updatemobile(){
				uni.navigateTo({
					url:'./updatemobile'
				})
			},
			//个人资料
			personaldata(){
				uni.navigateTo({
					url:'./personaldata'
				})
			},
			//修改密码
			updatepwd(){
				uni.navigateTo({
					url:'./updatepwd'
				})
			},
			//修改支付密码
			updatepaypwd(){
				uni.navigateTo({
					url:'./updatepwd'
				})
			},
			//退出
			signout(){
				uni.removeStorageSync('userInfo');
				uni.redirectTo({
					url:'../login/login'
				})
			}
		}
	}
</script>


<style>
	page{
		background: #F8F8F8;
	}
	.tanchuang{
		width: 100%;
		height:80rpx;
		line-height: 85rpx;
		background-color: rgba(0,0,0,0.5);
		color: #FFFFFF;
	}
	.juli{
		margin-left: 30rpx;
		font-size: 24rpx;
		width: 500rpx;
		float: left;
	}
	.qd{
		width: 200rpx;
		font-size: 24rpx;
	}
	.qd{
		
	}
	.qiangdan{
		background-color: rgba(48,174,255,1);
		font-size: 24rpx;
		height: 60rpx;
		margin: 10rpx;
		border-radius: 23rpx;
		color: #FFFFFF;
	}
	.guideitem{
		display: flex;
		justify-content: space-between;
		width: 710rpx;
		height: 96rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.11);
		border-radius: 14rpx;
		margin: auto;
		margin-top: 20rpx;
	}
	.guidecot{
		padding-bottom: 20rpx;
	}
	.guideitem image{
		width: 36rpx;
		height: 36rpx;
		margin: 26rpx 36rpx 0 0;
	}
	.guideitem view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		/* color: #40A9FF; */
		margin: 30rpx 0 0 38rpx;
	}
	.guidecot{
		width: 640rpx;
		margin: auto;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.box{
		width: 710rpx;
		margin: auto;
		border-radius: 14rpx;
		padding-top: 100rpx;
		margin-top: -80rpx;
		background: #fff;
	}
</style>
