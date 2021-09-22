<template>
	<view>
		<view class="billlist">
			<view class="billitem">
				<view class="itemleft">
					<view>余额提现</view>
					<view>2020-02-21  13:12:22</view>
					<!-- <view v-else>0000-00-00 00:00:00</view> -->
				</view>
				<view class="itemright">
					<view>-100.80</view>
				</view>
			</view>
			<view class="billitem">
				<view class="itemleft">
					<view>消费</view>
					<view>2021-05-09  18:12:19</view>
					<!-- <view v-else>0000-00-00 00:00:00</view> -->
				</view>
				<view class="itemright">
					<view>-55.60</view>
				</view>
			</view>
			<view class="billitem">
				<view class="itemleft">
					<view>余额提现</view>
					<view>2021-08-21  23:32:12</view>
					<!-- <view v-else>0000-00-00 00:00:00</view> -->
				</view>
				<view class="itemright">
					<view>-63.39</view>
				</view>
			</view>
		</view>
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
				url:'http://trailer.boyaokj.cn/api/wechat/moneyLog',
				method:'GET',
				data:{
					page:that.page,
					limit:that.limit,
					user_id:uni.getStorageSync('userInfo').id,
					type:1
				},
				success(res) {
					console.log(JSON.stringify(res))
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
								user_id:uni.getStorageSync('userInfo').user_id
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
