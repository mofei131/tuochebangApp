<template>
	<view>
		<view class="orderlist">
			<view class="orderitem" v-for="(item,index) in list" :key="index" >
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
					<view class="contleft" v-else>
						<image :src="item.avater"></image>
					</view>
					<view class="contright">
						<view>{{item.nickname}}</view>
						<view v-if="item.state == -1">时限:{{item.service}}年</view>
						<view v-else>{{item.service_name}}</view>
						<view v-if="item.type == 2">{{item.realprice}}</view>
						<view v-else>￥{{item.service_price}}</view>
					</view>
				</view>
				<view class="cont" v-if="item.service_type != 10" @tap="qiao(item)">
					<view class="contleft" v-if="item.type == 2">
						<image src="@/static/icon/icon5.png"></image>
					</view>
					<view class="contleft" v-else>
						<image :src="item.avater"></image>
					</view>
					<view class="contright">
						<view>{{item.nickname}}</view>
						<view v-if="item.state == -1">时限:{{item.service}}年</view>
						<view v-else>{{item.service_name}}</view>
						<view v-if="item.type == 2">{{item.realprice}}</view>
						<view v-else>￥{{item.service_price}}</view>
					</view>
				</view>
				<view v-if="item.status == 1">
				<view class="bottom">
					<view class="btn" @tap="over(item.source_id)">
						<view>结束服务</view>
					</view>
						<view class="btn" @tap="tuwen(item)" v-if="item.service_type == 1">
							<view>联系客户</view>
						</view>
						<view class="btn" @tap="dianhau(item)"  v-if="item.service_type == 2">
							<view>联系客户</view>
						</view>
						<view class="btn" @tap="shangchuan(item)" v-if="item.service_type == 10 && item.text == 0">
							<view>上传案件</view>
							</view>
						<view class="btn" v-if="item.text == 1">
							<view>案件已上传</view>
							</view>
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
				id:0,
			}
		},
		methods:{
			topay(){
				uni.navigateTo({
					url:'../../my/pay'
				})
			},
			score(){
				uni.navigateTo({
					url:'../../my/score'
				})
			},
			over(e){
				// console.log(e)
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/order/endService',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').user_id,
						service_id:e
					},
					success(res) {
							uni.showToast({
								title: '结束成功',
								duration:1000
							})
							that.$emit("getChild1",that.type);
					}
				})
				
			},
			det(item){
				// console.log("yes")
				// this.$emit("det");
				uni.navigateTo({
					url:'./fwdet?id='+item.source_id
				})
			},
			dianhau(item){
				if(item.mobile == ''){
					uni.showToast({
						title: '该用户未设置联系方式',
						duration:1000
					})
				}else{
					uni.makePhoneCall({
						 phoneNumber: item.mobile, 
					})
				}
			},
			tuwen(item){
				uni.navigateTo({
					url:'../chat/chat?layer_id='+item.layer_id+"&source_id="+item.source_id
				})
			},
			shangchuan(item){
				uni.navigateTo({
					url:'../my/shangchuan?dd='+item.orderno+'&id='+item.source_id,
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
