<template>
	<view>
		<view class="top">
			<view class="feld">
				<view class="shu">
				<image src="../../static/images/xiaoxi.png" @click="tonews"></image>
				<view class="shunum">{{shunum}}</view>
				</view>
				<view class="toptitle">订单</view>
				<image src="../../static/images/kefu.png" @click="call()"></image>
			</view>
		</view>
		<view class="card">
			<view class="hui" :class="item.show?'liang':''" v-for="(item,index) in card" :key="index" @click="cad(index)">
				<view>{{item.title}}</view>
			</view>
		</view>
		<view class="listbox" v-for="(item,index) in orderlist" :key="index">
			<view class="neibox">
				<view @click="todet(item)">
				<view class="ceng1">
					<view class="code">订单号:{{item.orderno}}</view>
					<view class="fu" v-if="item.status == 2">进行中</view>
					<view class="fu" v-if="item.status == 4">已完成</view>
				</view>
				<view class="ceng2">
					<view>{{item.trailer_type}}</view>
				</view>
				<view class="ceng3">
					<view>装</view>
					<view>{{item.start_addr}}</view>
				</view>
				<view class="ceng4">
					<view class="left">
						<view>卸</view>
						<view>{{item.end_addr}}</view>
					</view>
					<view class="jia">￥{{item.money}}</view>
				</view>
				</view>
				<view class="ceng5" v-if="item.status != 4">
					<view class="yan" v-if="item.verify_status == 0" @click="yan(item)">发起验车</view>
					<view class="bo" v-if="item.verify_status == -1" @click="yan(item)">验车被驳回</view>
					<view class="yan" v-if="item.verify_status == 1" @click="yan(item)">验车审核中</view>
					<view class="tong" v-if="item.verify_status == 2" @click="yan(item)">已通过验车</view>
					<view class="yan" v-if="true" @click="lianxi(item)">联系客户</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				card:[
					{title:'全部',show:true},
					{title:'进行中',show:false},
					{title:'已完成',show:false},
				],
				cell:'1335678520',
				page:1,
				limit:10,
				status:0,
				orderlist:[],
				shunum:0
			}
		},
		onLoad() {
			
		},
		onShow() {
			let that = this
			this.http.ajax({
				url: 'DriverOrder/myOrder',
				method: 'GET',
				data: {
					user_id:uni.getStorageSync('userInfo').id,
					page:this.page,
					limit:this.limit,
					status:0
				},
				success: function(res) {
					console.log(res)
					that.orderlist = res.data
				}
			});
			this.http.ajax({
				url: 'message/noReadNum',
				method: 'GET',
				data: {
					user_id:uni.getStorageSync('userInfo').id
				},
				success(res) {
					that.shunum = res.data.noread
				}
			});
		},
		methods:{
			tonews(){
				uni.navigateTo({
					url:'../index/news'
				})
			},
			todet(item){
				uni.navigateTo({
					url:'../index/orderDet?id='+item.id
				})
			},
			lianxi(item){
				uni.navigateTo({
					url:'lianxi?id='+item.id
				})
			},
			call(){
				uni.makePhoneCall({
					 phoneNumber: this.cell, 
				})
			},
			yan(item){
				uni.navigateTo({
					url:'yanche?id='+item.id
				})
			},
			cad(index){
				if(index == 0){
					this.card[index].show = true
					this.card[1].show = false
					this.card[2].show = false
					this.status = 0
					let that = this
					this.http.ajax({
						url: 'DriverOrder/myOrder',
						method: 'GET',
						data: {
							user_id:uni.getStorageSync('userInfo').id,
							page:this.page,
							limit:this.limit,
							status:0
						},
						success: function(res) {
							that.orderlist = res.data
						}
					});
				}else if(index == 1){
					this.card[1].show = true
					this.card[0].show = false
					this.card[2].show = false
					this.status = 2
					let that = this
					this.http.ajax({
						url: 'DriverOrder/myOrder',
						method: 'GET',
						data: {
							user_id:uni.getStorageSync('userInfo').id,
							page:this.page,
							limit:this.limit,
							status:2
						},
						success: function(res) {
							that.orderlist = res.data
						}
					});
				}else{
					this.card[2].show = true
					this.card[0].show = false
					this.card[1].show = false
					this.status = 4
					let that = this
					this.http.ajax({
						url: 'DriverOrder/myOrder',
						method: 'GET',
						data: {
							user_id:uni.getStorageSync('userInfo').id,
							page:this.page,
							limit:this.limit,
							status:4
						},
						success: function(res) {
							that.orderlist = res.data
						}
					});
				}
			}
		}
	}
</script>

<style>
	.shunum{
		position: absolute;
		top: 10rpx;
		right: 0rpx;
		width: 30rpx;
		height: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FF7878;
		color: #fff;
		font-size: 18rpx;
		border-radius: 30rpx;
	}
	.shu{
		position: relative;
	}
	.tong{
		width: 188rpx;
		height: 62rpx;
		background: #52C41A;
		border-radius: 35rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 16rpx;
	}
	.bo{
		width: 188rpx;
		height: 62rpx;
		background: #EB4A32;
		border-radius: 35rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 16rpx;
	}
	.yan{
		width: 188rpx;
		height: 62rpx;
		background: #30AEFF;
		border-radius: 35rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 16rpx;
	}
	.ceng5{
		display: flex;
		justify-content: flex-end;
		padding-top: 11rpx;
		border-top: 1px solid #DBDBDB;
		margin-top: 15rpx;
	}
	.jia{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
	}
	.ceng4{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.left view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #676767;
		margin-left: 9rpx;
	}
	.left view:nth-child(1){
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		width: 24rpx;
		height: 24rpx;
		background: #30AEFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 24rpx;
	}
	.left{
		display: flex;
		justify-content: start;
		margin-top: 8rpx;
		align-items: center;
	}
	.ceng3 view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #676767;
		margin-left: 9rpx;
	}
	.ceng3 view:nth-child(1){
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		width: 24rpx;
		height: 24rpx;
		background: #6B6B6B;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 24rpx;
	}
	.ceng3{
		display: flex;
		justify-content: start;
		margin-top: 8rpx;
		align-items: center;
	}
	.ceng2 view{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 20rpx;
	}
	.neibox{
		width: 644rpx;
		margin: auto;
		padding: 20rpx 0 15rpx 0;
		box-sizing: border-box;
	}
	.listbox{
		width: 710rpx;
		/* height: 291rpx; */
		background: #FFFFFF;
		box-shadow: 0px 0px 19rpx 0px rgba(0, 0, 0, 0.11);
		border-radius: 14rpx;
		margin: auto;
		margin-top: 20rpx;
	}
	.fu{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #30AEFF;
	}
	.code{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #6B6B6B;
	}
	.ceng1{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.liang view{
		padding-bottom: 5rpx;
		border-bottom: 4rpx solid #30AEFF;
		color: #30AEFF;
	}
	.card{
		display: flex;
		width: 592rpx;
		justify-content: space-between;
		margin: auto;
		padding-top: 21rpx;
	}
	.hui{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #8A8A8A;
	}
	.feld image{
		width: 66rpx;
		height: 66rpx;
	}
	.top{
		width: 750rpx;
		height: 130rpx;
		background-color: #30AEFF;
		padding-top: 38rpx;
		box-sizing: border-box;
	}
	.feld{
		height: 88rpx;
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx 0 20rpx;
		box-sizing: border-box;
		font-size: 39rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
