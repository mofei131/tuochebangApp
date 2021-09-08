<template>
	<view>
		<view class="orderlist">
			<view class="orderitem" v-for="(item,index) in list" :key="index">
				<view class="top">
					<view>订单号:{{item.orderno}}</view>
					<!-- 服务订单 -->
					<view class="state" v-if="item.status== 0">未付款</view>
					<view class="state" v-else-if="item.status == 1">进行中</view>
					<view class="state" v-else-if="item.status == 2">服务结束</view>
					<view class="state" v-else>已完成</view>
				</view>
				<view class="cont" @tap="det(item)" v-if="item.service_type == 10">
					<view class="contleft" v-if="item.type == 2">
						<image src="@/static/icon/icon5.png"></image>
					</view>
					<view class="contleft" v-else-if="item.type == 3">
						<image src="@/static/icon/icon5.png"></image>
					</view>
					<view class="contleft" v-else>
						<image :src="item.layer_photo"></image>
					</view>
					<view class="contright">
						<view>{{item.nickname}}</view>
						<view v-if="item.state == -1">时限:{{item.service}}年</view>
						<view v-else>{{item.service_name}}</view>
						<view v-if="item.type == 2">{{item.realprice}}</view>
						<view v-else-if="item.type == 3">{{item.realprice}}</view>
						<view v-else>￥{{item.service_price}}</view>
					</view>
				</view>
				<view class="cont" v-if="item.service_type != 10" @tap="qiao(item)" >
					<view class="contleft" v-if="item.type == 2">
						<image src="@/static/icon/icon5.png"></image>
					</view>
					<view class="contleft" v-else-if="item.type == 3">
						<image src="@/static/icon/icon5.png"></image>
					</view>
					<view class="contleft" v-else>
						<image :src="item.layer_photo"></image>
					</view>
					<view class="contright">
						<view>{{item.nickname}}</view>
						<view v-if="item.state == -1">时限:{{item.service}}年</view>
						<view v-else>{{item.service_name}}</view>
						<view v-if="item.type == 2">{{item.realprice}}</view>
						<view v-else-if="item.type == 3">{{item.realprice}}</view>
						<view v-else>￥{{item.service_price}}</view>
					</view>
				</view>
				<view v-if="item.status == 0 || item.status == 1 || item.status == 2">
				<view class="bottom">
					<view class="btn" @tap="topay(item)" v-if="item.status== 0">
						<view>去付款</view>
					</view>
						<view class="btn"  v-if="item.status == 1 && item.service_type == 1" @tap="tuwen(item)">
							<view>联系律师</view>
						</view>
						<view class="btn"  v-if="item.status == 1 && item.service_type != 1" @tap="dianhua(item)">
							<view>联系律师</view>
						</view>
						<view class="btn" @tap="score(item)" v-if="item.star == 0 && item.status == 2">
							<view>去评价</view>
						</view>
						<view class="btn" v-if=" item.star > 0">
							<view>已评价</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['list'],
		data(){
			return{
				type:2,
				id:0
			}
		},
		methods:{
			det(item){
				uni.navigateTo({
					url:'./fwdet?id='+item.source_id
				})
			},
			topay(item){
				uni.navigateTo({
					url:'./pay?id='+item.service_id+"&price="+item.service_price
				})
			},
			score(item){
				uni.navigateTo({
					url:'./score?id='+item.service_id+"&code="+item.orderno
				})
			},
			tuwen(item){
				uni.navigateTo({
					url:'../chat/chat?layer_id='+item.layer_id+"&source_id="+item.source_id
				})
			},
			dianhua(item){
				uni.makePhoneCall({
					 phoneNumber: item.mobile, 
				})
			},
			qiao(item){
				console.log(item.service_type)
				if(item.service_type == 1){
					uni.navigateTo({
						url:'../service_zhixun/tuwen?source_id='+item.source_id
					})
				}if(item.service_type == 3){
					uni.navigateTo({
						url:'../service_zhixun/jianmian?layer_id='+item.layer_id
					})
				}else if(item.service_type == 4){
					uni.navigateTo({
						url:'../single_service/cooperProcess?id=5'
					})
				}else if(item.service_type == 5){
					uni.navigateTo({
						url:'../single_service/cooperProcess?id=6'
					})
				}else if(item.service_type == 6){
					uni.navigateTo({
						url:'../single_service/cooperProcess?id=7'
					})
				}else if(item.service_type == 7){
					uni.navigateTo({
						url:'../single_service/cooperProcess?id=8'
					})
				}else if(item.service_type == 8){
					uni.navigateTo({
						url:'../single_service/cooperProcess?id=9'
					})
				}else if(item.service_type == 9){
					uni.navigateTo({
						url:'../single_service/cooperProcess?id=10'
					})
				}
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.orderitem{
		width: 720rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.11);
		border-radius: 14rpx;
		margin: 20rpx auto;
	}
	.contleft image{
		width: 153rpx;
		height: 153rpx;
		border-radius: 11rpx;
	}
	.top{
		display: flex;
		justify-content: space-between;
		padding: 21rpx 37rpx 21rpx 40rpx;
		box-sizing: border-box;
	}
	.top view:nth-child(1){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #8C8C8C;
	}
	.top view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #059EFF;
	}
	.cont{
		display: flex;
		width: 644rpx;
		margin: auto;
		padding-bottom: 22rpx;
	}
	.contright{
		margin-left: 23rpx;
	}
	.contright view{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-bottom: 8rpx;
	}
	.contright view:last-child{
		font-size: 33rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #E46367;
		margin-top: 14rpx;
	}
	.bottom{
		width: 644rpx;
		margin: auto;
		height: 90rpx;
		padding-top: 21rpx;
		box-sizing: border-box;
		border-top: 1px solid #DFDFDF;
	}
	.btn{
		width: 150rpx;
		height: 40rpx;
		background: #40A9FF;
		border-radius: 39rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 43rpx;
		float: right;
		margin-left: 20rpx;
	}
</style>
