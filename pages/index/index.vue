<template>
	<view>
		<view class="top">
			<view class="feld">
				<image src="../../static/images/xiaoxi.png"></image>
				<view class="toptitle">司机端</view>
				<image src="../../static/images/shaixuan.png"></image>
			</view>
		</view>
		<view class="dingbox">
			<view class="neibox">
				<view class="ceng1">
					<view class="code">订单号:12408652396</view>
					<view class="fu">到付</view>
				</view>
				<view class="ceng2">
					<view class="qidao">潍坊市</view>
					<view >
						<view class="yju">15.7km</view>
						<view class="jian">
							<text class="xian"></text>
							<text class="tou"></text>
						</view>
						<view class="jju">距您120km</view>
					</view>
					<view class="qidao">潍坊市</view>
				</view>
				<view class="ceng3">
					<view>3吨板车</view>
					<view>￥1398.00</view>
				</view>
				<view class="ceng4">
					<text>装车时间:</text>
					<text>今天12:00~15:00</text>
				</view>
				<view class="ceng4">
					<text>车辆型号:</text>
					<text>比亚迪f3</text>
				</view>
				<view class="ceng4">
					<text>备注:</text>
					<text>轻拿轻放，尽快送达，会给好评</text>
				</view>
				<view class="neidi">
					<view>立即接单</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dingdan:[
					{
						
					}
				]
			}
		},
		onLoad() {
			
		},
		onShow() {
			// uni.reLaunch({
			// 	url:'../login/login'
			// })
		},
		methods: {

		}
	}
</script>

<style>
	.jju{
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #30AEFF;
	}
	.yju{
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
	}
	.ceng2{
		display: flex;
		justify-content: start;
		align-items: center;
	}
	.tou{
		display: inline-block;
		width: 0;
		height: 0;
		border-top: 9rpx solid transparent;
		border-bottom: 9rpx solid transparent;
		border-left: 10rpx solid #30AEFF;
	}
	.xian{
		width: 78rpx;
		height: 3rpx;
		background: #30AEFF;
	}
	.jian{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.qidao{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.fu{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #30AEFF;
	}
	.code{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #6B6B6B;
	}
	.ceng1{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.neibox{
		width: 644rpx;
		margin: auto;
		padding: 20rpx 0 15rpx 0;
		box-sizing: border-box;
	}
	.dingbox{
		width: 710rpx;
		height: 408rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 19rpx 0px rgba(0, 0, 0, 0.11);
		border-radius: 14rpx;
		margin: auto;
		margin-top: 20rpx;
	}
	.feld image{
		width: 66rpx;
		height: 66rpx;
	}
	.top{
		width: 750rpx;
		height: 130rpx;
		background-color: #30AEFF;
		padding-top: 38rpx;
		box-sizing: border-box;
	}
	.feld{
		height: 88rpx;
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx 0 20rpx;
		box-sizing: border-box;
		font-size: 39rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
