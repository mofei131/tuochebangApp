<template>
	<view class="anlilist">
		<view class="anlilistitem" v-for="(item,index) in anli" :key="index" :style="{marginBottom: marginBottom}"
			@tap="tochat(item)">
			<view class="floor1">
				<view>{{item.type}}</view>
				<view>{{item.content}}</view>
			</view>
			<view class="floor2">
				<view class="mine">
					<image :src="item.layer.photo"></image>
					<view>{{item.layer.name}}</view>
					<view>{{item.address}}</view>
				</view>
				<view class="read">{{item.view}}人查看</view>
			</view>
			<view class="anliborder" v-if="index<anli.length-1 && showBottomBorder"></view>
		</view>
		<!-- <view v-if="anli.length<1" class="flex-txt-center" style="height: 120rpx;width: 100%;color: gray;font: 36rpx;">
			没有案例哦~</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			anli: {
				type: Array,
				default: []
			},
			showBottomBorder: {
				type: Boolean,
				default: false
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
			tochat(item) {
				console.log(item);
				uni.navigateTo({
					url: '../anjianDetail/anjianDetail?source_id=' + item.id + "&layer_id=" + item.layer.id +
						"&user_id=" + item.user_id
				})
			}
		}
	}
</script>

<style>
	.anlilist {

		width: 710rpx;
		margin: auto;
	}

	.anlilistitem {
		background-color: #FFFFFF;
		/* border-radius: 20rpx; */
		padding: 20rpx;
		/* border: 1px solid; */
	}

	.anlilistitem:last-child {
		border-radius: 0 0 14rpx 14rpx;
	}

	.mine image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 35rpx;
	}

	.floor1 {
		display: flex;
		overflow: hidden;
		white-space: nowrap;
		color: #323232;
		font-size: 28rpx;
		/* margin-top: 16rpx; */
		/* 	line-height: 44rpx; */
	}

	.floor1 view:nth-child(2) {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.floor2 {
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
		margin-bottom: 18rpx;
	}

	.mine {
		display: flex;
		color: #999999;
		font-size: 24rpx;
	}

	.mine image {
		margin-right: 18rpx;
	}

	.mine view {
		padding-top: 25rpx;
	}

	.read {
		background: #D4E5F8;
		border-radius: 1rpx;
		color: #40A9FF;
		font-size: 16rpx;
		text-align: center;
		margin-top: 28rpx;
		height: 30rpx;
		line-height: 30rpx;
		padding: 0 10rpx;
	}

	.anliborder {
		width: 674rpx;

		height: 1rpx;
		background: #ddd;
		margin: auto;
	}
</style>
