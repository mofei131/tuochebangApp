<template>
	<view>
		<!-- <view class="guidelist" v-for="(item,index) in article" :key="index" @tap="pandaun(index)"> -->
		<view class="guidelist" @tap="personaldata()">
			<view class="guideitem">
				<view>个人资料</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="pandaun(index)">
			<view class="guideitem">
				<view>修改手机号</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="pandaun(index)">
			<view class="guideitem">
				<view>清理缓存</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="pandaun(index)">
			<view class="guideitem">
				<view>隐私协议</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="pandaun(index)">
			<view class="guideitem">
				<view>用户协议</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="pandaun(index)">
			<view class="guideitem">
				<view>使用说明</view>
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
				url:'https://layer.boyaokj.cn/api/commission/notice',
				method:'POST',
				success(res) {
					that.article = res.data.data
				}
			})
		},
		methods:{
			personaldata(){
				uni.navigateTo({
					url:'./personaldata'
				})
			}
		}
	}
</script>


<style>
	page{
		background: #F8F8F8;
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
