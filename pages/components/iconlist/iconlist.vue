<template>
	<view class="iconlist">
		<view class="childtitle">
			<view class="blue"></view>
			<view>{{item.title}}</view>
		</view>
		<view class="zixun">
			<view v-for="(item,index) in item.zixun" class="zixunitem" @click="toPage(item)" :key="index">
				<image :src='item.url' class="zixunitemimage"></image>
				<view class="zixunitemview">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["item"],
		methods: {
			toPage(item) {
				if (!item) return;
				let url = "";
				switch (item.id) {
					case 0:
						url = "../zhaolvshi/zhaolvshi?id=0";
						break;
					case 1:
						url = "../zhaolvshi/zhaolvshi?id=1";
						break;
					case 2:
						url = "../zhaolvshi/zhaolvshi?id=2";
						break;
					case 3:
						url = "../zhaolvshi/zhaolvshi?id=3";
						break;
					case 4:
						url = "../single_service/cooperDownload";
						break;
					case 5:
						url = "../single_service/cooperCheck?id=5";
						break;
					case 6:
						url = "../single_service/cooperCheck?id=6";
						break;
					case 7:
						url = "../single_service/cooperCheck?id=7";
						break;
					case 8:
						url = "../single_service/cooperCheck?id=8";
						break;
					case 9:
						url = "../single_service/cooperCheck?id=9";
						break;
					case 10:
						url = "../single_service/cooperCheck?id=10";
						break;
					case 11:
						url = "../single_service/otherService?id=11";
						break;
				}
				if (!url) return;
				if (item.id < 4) {
					uni.switchTab({
						url:url
					})
				} else {
					uni.navigateTo({
						url: url
					})
				}

			}
		}
	}
</script>

<style>
	.childtitle {
		display: flex;
		width: 690rpx;
		margin: auto;
		margin-top: 24rpx;
		margin-bottom: 12rpx;
	}

	.blue {
		width: 6rpx;
		height: 28rpx;
		background: #40A9FF;
		/* margin-top: 16rpx; */
		padding-top: 16rpx;
	}

	.childtitle view {
		color: #51565D;
		font-size: 28rpx;
		font-weight: 500;
		margin-left: 8rpx;
	}

	.zixun {
		width: 710rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(147, 147, 147, 0.5);
		border-radius: 14rpx;
		display: flex;
		justify-content: space-around;
		margin: auto;
		margin-top: 12rpx;
		box-sizing: border-box;
		flex-wrap: wrap;
	}

	.zixunitem {
		width: 177.5rpx;
	}

	.zixunitemimage {
		width: 87rpx;
		height: 87rpx;
		margin: auto;
		display: block;
		margin-top: 20rpx;
	}

	.zixunitemview {
		color: #333;
		font-size: 28rpx;
		font-weight: 500;
		margin-top: 20rpx;
		margin-bottom: 12rpx;
		text-align: center;
	}
</style>
