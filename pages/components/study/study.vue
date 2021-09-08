<template>
	<view class="study">
		<view class="studyitem flex-row mx-center sx-center" v-for="(item,index) in learn" :key="index"
			:style="{marginBottom: marginBottom}" @click="todetail(item)">
			<view class="studyitemleft">
				<image style="width: 180rpx;height: 120rpx;" :src="item.image"></image>
			</view>
			<view class="studyitemright flex-column mx-start sx-stretch">
				<view class="studytitle ellipsis">{{item.title}}</view>
				<view class="studycontent">{{item.desc}}</view>
				<view class="figure flex-row mx-start sx-center" style="margin-top: 15rpx;">
					<!-- <view>已更新{{item.num || 1}}期</view> -->
					<view>更新时间:{{item.create_time}}</view>
					<view class="ellipsis" style="flex: 1 1 auto;width: 1rpx;">{{item.subtitle}}</view>

					<view
						style="flex: 0 0 auto;height: 32rpx;background: #D4E5F8;border-radius: 1rpx;color: #40A9FF;font-size: 22rpx;text-align: center; ">
						<view v-if="item.buy" class="cost" style="flex: 0 0 auto;padding: 0 20rpx;">已购买</view>
						<view v-else-if="item.price > 0" class="cost" style="flex: 0 0 auto;padding: 0 20rpx;"
							@tap="toPay(item)">￥{{item.price}}</view>
						<view v-else style="flex:0 0 auto;background: #D4E5F8;padding: 0 20rpx;border-radius: 4rpx;">限时免费</view>
					</view>

				</view>


			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			learn: {
				type: Array,
				default: []
			},
			marginBottom: {
				type: String,
				default: ''
			}
		},
		data() {

			return {

			}
		},
		methods: {
			todetail(item) {
				if (!item.buy && item.price > 0) {
					uni.showToast({
						title: '请先购买',
						icon: 'none'
					})
					return;
				}
				uni.navigateTo({
					url: '../detail/studyDetail?id=' + item.id
				})
			},
			async toPay(item) {
				console.log(item);
				//跳转到支付页面；支付成功，请求
				let res = await this.$myRequest({
					url: 'service/article',
					methods: 'GET',
					data: {
						user_id: this.$store.state.userInfo.user_id,
						article_id: item.id
					}
				});
				if (res.code == 200) {
					console.log(res);

					uni.navigateTo({
						url: '../my/pay?id=' + res.data.service_id + '&price=' + item.price + '&typeId=12' +
							"&emitName=goCoodetail"
					})
					uni.$on('goCoodetail', res => {
						uni.navigateTo({
							url: '@/pages/detail/detail?detail=' + item.id
						})
					});


				} else {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
				}

			}
		}
	}
</script>

<style>
	.studyitem {
		background-color: #FFFFFF;
		/* border-radius: 20rpx; */
		padding: 20rpx;

	}

	..studyitem:last-child {
		border-radius: 0 0 14rpx 14rpx;
	}

	.studyitemleft image {
		width: 196rpx;
		height: 142rpx;
		border-radius: 7rpx;
	}

	.study {
		width: 710rpx;
		margin: auto;
		/* padding-top: 16rpx; */
	}

	.studyitem {
		display: flex;
		position: relative;
		margin-bottom: 34rpx;

		/* border: 1px solid; */
	}

	.studytitle {
		color: #323232;
		width: 500rpx;
		font-size: 28rpx;
		margin-bottom: 15rpx;
	}

	.studycontent {
		width: 500rpx;
		color: #424242;
		font-size: 22rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 26rpx;
	}

	.figure {
		color: #999999;
		font-size: 21rpx;
		flex: 0 0 auto;
	}

	.figure view:nth-child(2) {
		margin-left: 18rpx;
	}

	.stage {
		color: #999;
		font-size: 26rpx;
	}



	.studyitemright {
		margin-left: 18rpx;
		flex: 1 1 auto;
	}



	.cost {
		color: #FF4D4F !important;
	}
</style>
