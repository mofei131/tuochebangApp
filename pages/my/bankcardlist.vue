<template>
	<view>
		<view class="billlist">
			<view class="billitem">
				<view class="itemleft">
					<view>招商银行卡</view>
					<view>储值卡</view>
					<view>****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;8525</view>
				</view>
				<view class="itemright">
					<label class="radio" style="fl"><radio value="r2" /></label>
				</view>
			</view>
			<view class="billitem">
				<view class="itemleft">
					<view>农业银行卡</view>
					<view>储值卡</view>
					<view>****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7721</view>
				</view>
				<view class="itemright">
					<label class="radio" style="fl"><radio value="r2" /></label>
				</view>
			</view>
			<view class="billitem">
				<view class="itemleft">
					<view>中国银行卡</view>
					<view>储值卡</view>
					<view>****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;8634</view>
				</view>
				<view class="itemright">
					<label class="radio" style="fl"><radio value="r2" /></label>
				</view>
			</view>
			<view class="btn" @tap="bindbankcard()">绑定银行卡</view>
			<view class="btn" @tap="unbindbankcard()">解除绑定</view>
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
			let that = this
			uni.request({
				url:'https://trailer.boyaokj.cn/api/wechat/moneyLog',
				method:'GET',
				data:{
					page:that.page,
					limit:that.limit,
					user_id:uni.getStorageSync('userInfo').user_id
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
						user_id:uni.getStorageSync('userInfo').user_id
					},
					success(res) {
						for(let i in res.data.data){
							that.boll.push(res.data.data[i])
						}
					}
				})
			},
			bindbankcard(){
				uni.navigateTo({
					url:'./bindbankcard'
				})
			},
			unbindbankcard(){
				
			}
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
		height: 287rpx;
		margin: auto;
		border-radius: 14rpx;
		justify-content: space-between;
		padding: 28rpx 0 30rpx 0;
		box-sizing: border-box;
		margin-top: 20rpx;
		color: #FFFFFF;
		background-color: rgba(248,110,110,1);
	}
	.billitem:last-child{
		border-bottom: 0;
	}
	.itemleft view:nth-child(1){
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 30rpx;
		margin-left: 60rpx;
		margin-bottom: 8rpx;
	}
	.itemleft view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 28rpx;
		margin-left: 60rpx;
	}
	.itemleft view:nth-child(3){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 56rpx;
		margin-left: 60rpx;
		margin-top: 30rpx;
	}
	.itemright view{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 18rpx;
	}
	.btn{
		width: 686rpx;
		height: 76rpx;
		background: #049EFF;
		border-radius: 35rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		/* line-height: 50rpx; */
		padding-top: 15rpx;
		box-sizing: border-box;
		margin-top: 145rpx;
	}
</style>
