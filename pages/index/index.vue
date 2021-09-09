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
					<view class="che">3吨板车</view>
					<view class="jia">￥1398.00</view>
				</view>
				<view class="ceng4">
					<view>装车时间</view>
					<view>:</view>
					<view>今天12:00~15:00</view>
				</view>
				<view class="ceng4">
					<view>车辆型号</view>
					<view>:</view>
					<view>比亚迪f3</view>
				</view>
				<view class="ceng4">
					<view>备注</view>
					<view>:</view>
					<view>轻拿轻放，尽快送达，会给好评</view>
				</view>
				<view class="ceng5">
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
	.ceng5 view{
		width: 188rpx;
		height: 62rpx;
		background: #30AEFF;
		border-radius: 35rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 11rpx;
		float: right;
	}
	.ceng5{
		height: 73rpx;
		border-top: 1rpx solid #DBDBDB;
		margin-top: 15rpx;
	}
	.ceng4{
		display: flex;
		justify-content: start;
		align-items: center;
		margin-top: 6rpx;
	}
	.ceng4 view:nth-child(3){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-left: 15rpx;
	}
	.ceng4 view:nth-child(2){
		color: #666666;
		font-size: 24rpx;
	}
	.ceng4 view:nth-child(1){
		width: 120rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		text-align-last: justify;
	}
	.che{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.jia{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
	}
	.ceng3{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
	}
	.jju{
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #30AEFF;
		text-align: center;
	}
	.yju{
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
		text-align: center;
	}
	.ceng2{
		display: flex;
		justify-content: start;
		align-items: center;
		margin-top: 7rpx;
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
		/* height: 408rpx; */
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
