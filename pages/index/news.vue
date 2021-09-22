<template>
	<view>
		<view class="item" @click="audio()">
			<view class="left">
				<image class="tbiao" src="../../static/images/dtong.png"></image>
				<view class="tzi">订单通知</view>
				<view class="red"></view>
			</view>
			<view class="right">
				<image src="../../static/images/righticon2.png"></image>
			</view>
		</view>
		<view class="item" @click="audio2()">
			<view class="left">
				<image class="tbiao2" src="../../static/images/xtong.png"></image>
				<view class="tzi">系统通知</view>
				<view class="red"></view>
			</view>
			<view class="right">
				<image src="../../static/images/righticon2.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			audio(){
				console.log('打印')
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = 'http://hlstore.yimetal.cn/2021/aud1.mp3';
				innerAudioContext.play();
			},
			audio2(){
				console.log('打印2')
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = 'http://hlstore.yimetal.cn/2021/aud3.mp3';
				innerAudioContext.play();
			}
		}
	}
</script>

<style>
	.red{
		position: absolute;
		width: 16rpx;
		height: 16rpx;
		background: #FF7878;
		top: 26rpx;
		left: 189rpx;
		border-radius: 16rpx;
	}
	.right image{
		width: 48rpx;
		height: 48rpx;
	}
	.tzi{
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin-left: 20rpx;
	}
	.tbiao2{
		width: 31rpx;
		height: 33rpx;
	}
	.tbiao{
		width: 29rpx;
		height: 33rpx;
	}
	.left{
		display: flex;
		align-items: center;
	}
	.item{
		position: relative;
		display: flex;
		align-items: center;
		width: 720rpx;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		padding-left: 28rpx;
		box-sizing: border-box;
		justify-content: space-between;
		margin: 20rpx auto;
	}
</style>
