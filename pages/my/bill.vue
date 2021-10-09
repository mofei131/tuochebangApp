<template>
	<view>
		<view class="billlist">
			<view class="billitem" v-for="(item,index) in bill" :key="index">
				<view class="itemleft">
					<view>{{item.note}}</view>
					<view>{{item.create_time}}</view>
				</view>
				<view class="itemright">
					<view>{{item.log}}</view>
				</view>
			</view>
		</view>
		<takinfo></takinfo>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bill:[],
				page:1,
				limit:10,
			}
		},
		onLoad(p) {
			this.lei = p.page
		},
		onShow() {
			let that = this
			uni.request({
				url:'https://trailer.boyaokj.cn/api/wechat/moneyLog',
				method:'GET',
				data:{
					page:that.page,
					limit:that.limit,
					user_id:uni.getStorageSync('userInfo').id,
					// type:1
				},
				success(res) {
					console.log(res.data.data)
					that.bill = res.data.data
				}
			})
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
				this.searchChange()
		},
		methods:{
			searchChange() {
						let that = this
						that.page++
						uni.request({
							url:'https://trailer.boyaokj.cn/api/wechat/moneyLog',
							method:'GET',
							data:{
								page:that.page,
								limit:that.limit,
								user_id:uni.getStorageSync('userInfo').user_id,
							},
							success(res) {
								for(let i in res.data.data){
									that.boll.push(res.data.data[i])
								}
							}
						})
					},
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.billlist{
		width: 100%;
		background: #fff;
	}
	.billitem{
		display: flex;
		width: 665rpx;
		margin: auto;
		justify-content: space-between;
		padding: 28rpx 0 30rpx 0;
		box-sizing: border-box;
		border-bottom: 1rpx solid #c4c4c4;
	}
	.billitem:last-child{
		border-bottom: 0;
	}
	.itemleft view:nth-child(1){
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-bottom: 8rpx;
	}
	.itemleft view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.itemright view{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 18rpx;
	}
</style>
