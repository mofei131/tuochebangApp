<template>
	<view>
		<view class="guidelist" v-for="(item,index) in article" :key="index" @tap="pandaun(index)">
		<!-- <view class="guidelist" @tap="pandaun(index)"> -->
		<view class="guideitem">
			<view>怎么才能赚到钱</view>
			<!-- <image :src="ji == index?'../../static/icon/downzd.png':'../../static/icon/rightzd.png'"></image> -->
			<image :src="ji == index?'../../static/icon/downzd.png':'../../static/icon/rightzd.png'"></image>
		</view>
		<view class="box" v-show="ji == index">
		<view class="guidecot">i我去佛旺季电位器服务器哦服务及偶发价位IQ房产网技巧房价完全范玮琪平均分就去附近欧派就欺负</view>
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
			pandaun(e){
				// console.log(e)
				this.ji = e
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
		height: 80rpx;
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
		color: #40A9FF;
		margin: 24rpx 0 0 38rpx;
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
