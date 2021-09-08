<template>
	<view class="fourcard">
		<view class="cardone" v-for="(item,index) in lawyerlist" :key="index" @tap='todetail(item)'>
			<view class="cardoneleft">
				<image :src="item.photo||'@/static/icon/icon1.png'"></image>
			</view>
			<view class="cardoneright">
				<view class="head">
					<view class="name ellipsis">{{item.name}}</view>
					<view class="workyer">执业{{item.zhiyenianxian}}年</view>
				</view>
				<view class="address ellipsis">{{item.city}}</view>
				<view class="begood">擅长：{{item.case_type}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["lawyerlist"],
		methods:{
			todetail(item){
				uni.navigateTo({
					url:'../detail/lawyerDetail?id='+item.id
				})
			}
		}
	}
</script>

<style>
	.fourcard{
		width: 676rpx;
		display: flex;
		margin: auto;
		flex-wrap: wrap;
		border: 0 0 14rpx 14rpx;
	}
	.cardone{
		/* width: 338rpx; */
		display: flex;
		margin-top: 48rpx;
		margin-left: 32rpx;
	}
	.cardoneleft image{
		width: 70rpx;
		height: 70rpx;
		border-radius: 36rpx;
	}
	.head{
		display: flex;
	}
	.name{
		width: 150rpx;
		font-size: 24rpx;
		color: rgba(51,51,51,1);
	}
	.workyer{
			
			background: rgba(212,229,248,1);;
			border-radius: 2rpx;
			color: #40A9FF;
			font-size: 16rpx;
			text-align: center;
			margin-top: 5rpx;
			margin-left: 20rpx;
			padding: 7rpx;
	}
	.address{
		width: 220rpx;
		color: rgba(102,102,102,1);;
		font-size: 20rpx;
		margin-top: 5rpx;
	}
	.begood{
		width: 240rpx;
		color: rgba(153,153,153,1);
		font-size: 20rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
		margin-top: 6rpx;
	}
	.cardoneright{
		margin-left: 10rpx;
	}
</style>
