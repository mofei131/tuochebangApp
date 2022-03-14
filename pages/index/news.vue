<template>
	<view>
		<view class="item" @click="audio(item)" v-for="(item,index) in infolist" :key="index">
			<view class="left">
				<image v-if="item.type == 1" class="tbiao" src="../../static/images/dtong.png"></image>
				<image v-if="item.type == 2" class="tbiao2" src="../../static/images/xtong.png"></image>
				<view class="tzi">{{item.title}}</view>
				<view class="red" v-if="item.is_read == 0"></view>
			</view>
			<view class="right">
				<image src="../../static/images/righticon2.png"></image>
			</view>
		</view>
		<!-- <view class="item" @click="audio2()">
			<view class="left">
				<image class="tbiao2" src="../../static/images/xtong.png"></image>
				<view class="tzi">系统通知</view>
				<view class="red"></view>
			</view>
			<view class="right">
				<image src="../../static/images/righticon2.png"></image>
			</view>
		</view> -->
		<takinfo></takinfo>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page:1,
				limit:20,
				infolist:[]
			}
		},
		onShow() {
			this.page = 1
			let that = this
			this.http.ajax({
				url:'message/list',
				method:'GET',
				data: {
					user_id:uni.getStorageSync('userInfo').id,
					page:this.page,
					limit:this.limit
				},
				success(res) {
					console.log(res)
					that.infolist = res.data
				}
			});
		},
		onPullDownRefresh() {
			this.page = 1
			this.updata()
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.page += 1
			this.updata()
		},
		methods:{
			audio(item){
				let that = this
				this.http.ajax({
					url:'message/read',
					method:'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						id:item.id
					},
					success(res) {
						if(item.type == 1 && item.order_id.length != 0){
							uni.navigateTo({
								url:'../index/orderDet?id='+item.order_id
							})
						}else if(item.type == 2){
							uni.navigateTo({
								url:'newslist?id='+item.id
							})
						}
					}
				});
			},
			updata(){
				let that = this
				this.http.ajax({
					url:'message/list',
					method:'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						page:this.page,
						limit:this.limit
					},
					success(res) {
						if(res.data.length != 0){
							for(let i in res.data){
								that.infolist.push(res.data[i])
							}
						}else{
							uni.showToast({
								title:'没有了',
								icon:'none'
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	.red{
		width: 16rpx;
		height: 16rpx;
		background: #FF7878;
		border-radius: 16rpx;
		margin: -3rpx 0 0 -5rpx;
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
