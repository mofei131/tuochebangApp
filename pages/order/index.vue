<template>
	<view>
		<view class="top" :style="[{height:CustomBar + 'px'}]" style="position: fixed;top: 0;">
			<view class="feld" :style="style">
				<view class="shu">
				<image src="../../static/images/xiaoxi.png" @click="tonews"></image>
				<view class="shunum" v-if="shunum > 0">{{shunum}}</view>
				</view>
				<view class="toptitle">订单</view>
				<image src="../../static/images/kefu.png" @click="call()"></image>
			</view>
		</view>
		<view class="card" :style="[{marginTop: (CustomBar + 10) + 'px'}]">
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
					<view class="addr">{{item.start_addr}}</view>
				</view>
				<view class="ceng4">
					<view class="left">
						<view>卸</view>
						<view class="addr">{{item.end_addr}}</view>
					</view>
					<view class="jia">￥{{item.money}}</view>
				</view>
				</view>
				<view class="ceng5" v-if="item.status != 4">
					<view class="yan" v-if="item.verify_status == 0 && item.car_situation != 3 && item.status == 6" @click="yan(item)">发起验车</view>
					<view class="bo" v-if="item.verify_status == -1" @click="yan(item)">验车被驳回</view>
					<view class="yan" v-if="item.verify_status == 1" @click="yan(item)">验车审核中</view>
					<view class="tong" v-if="item.verify_status == 2" @click="yan(item)">已通过验车</view>
					<view class="tong" v-if="item.status == 2" @click="ququ(item)">去取车</view>
					<view class="tong" v-if="item.status == 3" @click="daoda(item)">到达取车点</view>
					<view class="yan" v-if="item.car_situation != 3?item.status == 6 && item.verify_status == 2:item.status == 6" @click="tuoyunzhong(item)">拖运中</view>
					<view class="yan" v-if="item.car_situation != 3?item.status == 7 && item.verify_status == 2:item.status == 7" @click="mudidi(item)">到达目的地</view>
					<view class="yan" v-if="true" @click="lianxi(item)">联系客户</view>
				</view>
			</view>
		</view>
		<view class="quanp" v-if="quanp" @click="tologin"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				card:[
					{title:'全部',show:true},
					{title:'取车中',show:false},
					{title:'已到达取车点',show:false},
					{title:'拖运中',show:false},
					{title:'到达目的地',show:false},
					{title:'已完成',show:false},
				],
				cell:'1335678520',
				page:1,
				limit:10,
				status:0,
				orderlist:[],
				shunum:0,
				
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				Custom: this.Custom,
				style: '',
				quanp:false
			}
		},
		onLoad() {
			this.card[0].show = true
			this.chalist()
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			this.style = `height:${CustomBar}px;padding-top:${StatusBar}px;background-color: #30aeff;`;
		},
		onPullDownRefresh() {
			this.page = 1
			this.chalist()
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.page++
			this.chalist()
		},
		onShow() {
			if (!uni.getStorageSync('userInfo') || !uni.getStorageSync('userInfo').id) {
				// uni.reLaunch({
				// 	url: '../login/login'
				// });
				this.quanp = true
			}
			let that = this
			// this.card[0].show = true
			// this.card[1].show = false
			// this.card[2].show = false
			// this.chalist()
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
			tologin(){
				uni.showModal({
					title: '提示',
					content: '请先登录',
					success: function (res) {
						if (res.confirm) {
							uni.reLaunch({
								url: '../login/login'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			mudidi(e){
				let that = this
				this.http.ajax({
					url: 'order/arrive',
					method: 'GET',
					data: {
						id:e.id
					},
					success(res) {
						if(res.code == 200){
							uni.showToast({
								title:'请等待客户确认',
								icon:'none'
							})
							that.chalist()
						}else{
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
					}
				});
			},
			tuoyunzhong(e){
				let that = this
				this.http.ajax({
					url: 'order/tuoyunzhong',
					method: 'GET',
					data: {
						id:e.id
					},
					success(res) {
						if(res.code == 200){
							uni.showToast({
								title:'请及时托运',
								icon:'none'
							})
							that.chalist()
						}else{
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
					}
				});
			},
			daoda(e){
				let that = this
				this.http.ajax({
					url: 'order/alreadyArrive',
					method: 'GET',
					data: {
						id:e.id
					},
					success(res) {
						if(res.code == 200){
							if(e.car_situation == 3){
								uni.showToast({
									title:'请及时托运',
									icon:'none'
								})
							}else{
								uni.showToast({
									title:'请验车',
									icon:'none'
								})
							}
							that.chalist()
						}else{
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
					}
				});
			},
			ququ(e){
				let that = this
				this.http.ajax({
					url: 'order/waitGetcar',
					method: 'GET',
					data: {
						id:e.id
					},
					success(res) {
						if(res.code == 200){
							uni.showToast({
								title:'请及时取车',
								icon:'none'
							})
							that.chalist()
						}else{
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
					}
				});
			},
			chalist(){
				let that = this
				this.http.ajax({
					url: 'DriverOrder/myOrder',
					method: 'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						page:this.page,
						limit:this.limit,
						status:this.status
					},
					success: function(res) {
						console.log(res)
						if(that.page == 1){
							that.orderlist = res.data
						}else{
							if(res.data.length != 0){
								for(let i in res.data){
									that.orderlist.push(res.data[i])
								}
							}else{
								uni.showToast({
									title:'没有了',
									icon:'none'
								})
							}
						}
					}
				});
			},
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
				this.http.ajax({
					url: 'index/setting',
					method: 'GET',
					data: {
						key:'kefu'
					},
					success(res) {
						uni.makePhoneCall({
							 phoneNumber: res.data.data,
						})
					}
				});
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
					this.card[3].show = false
					this.card[4].show = false
					this.card[5].show = false
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
				}
				// else if(index == 1){
				// 	this.card[1].show = true
				// 	this.card[0].show = false
				// 	this.card[2].show = false
				// 	this.card[3].show = false
				// 	this.card[4].show = false
				// 	this.status = 2
				// 	let that = this
				// 	this.http.ajax({
				// 		url: 'DriverOrder/myOrder',
				// 		method: 'GET',
				// 		data: {
				// 			user_id:uni.getStorageSync('userInfo').id,
				// 			page:this.page,
				// 			limit:this.limit,
				// 			status:2
				// 		},
				// 		success: function(res) {
				// 			that.orderlist = res.data
				// 		}
				// 	});
				// }
				else if(index == 1){
					this.card[1].show = true
					this.card[0].show = false
					this.card[2].show = false
					this.card[3].show = false
					this.card[4].show = false
					this.card[5].show = false
					this.status = 3
					let that = this
					this.http.ajax({
						url: 'DriverOrder/myOrder',
						method: 'GET',
						data: {
							user_id:uni.getStorageSync('userInfo').id,
							page:this.page,
							limit:this.limit,
							status:3
						},
						success: function(res) {
							that.orderlist = res.data
						}
					});
				}else if(index == 2){
					this.card[2].show = true
					this.card[0].show = false
					this.card[1].show = false
					this.card[3].show = false
					this.card[4].show = false
					this.card[5].show = false
					this.status = 6
					let that = this
					this.http.ajax({
						url: 'DriverOrder/myOrder',
						method: 'GET',
						data: {
							user_id:uni.getStorageSync('userInfo').id,
							page:this.page,
							limit:this.limit,
							status:6
						},
						success: function(res) {
							that.orderlist = res.data
						}
					});
				}else if(index == 3){
					this.card[3].show = true
					this.card[0].show = false
					this.card[1].show = false
					this.card[2].show = false
					this.card[4].show = false
					this.card[5].show = false
					this.status = 7
					let that = this
					this.http.ajax({
						url: 'DriverOrder/myOrder',
						method: 'GET',
						data: {
							user_id:uni.getStorageSync('userInfo').id,
							page:this.page,
							limit:this.limit,
							status:7
						},
						success: function(res) {
							that.orderlist = res.data
						}
					});
				}else if(index == 4){
					this.card[4].show = true
					this.card[0].show = false
					this.card[1].show = false
					this.card[3].show = false
					this.card[2].show = false
					this.card[5].show = false
					this.status = 8
					let that = this
					this.http.ajax({
						url: 'DriverOrder/myOrder',
						method: 'GET',
						data: {
							user_id:uni.getStorageSync('userInfo').id,
							page:this.page,
							limit:this.limit,
							status:8
						},
						success: function(res) {
							that.orderlist = res.data
						}
					});
				}else{
					this.card[5].show = true
					this.card[0].show = false
					this.card[1].show = false
					this.card[2].show = false
					this.card[3].show = false
					this.card[4].show = false
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
	.quanp{
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.addr{
		width: 500rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}
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
		margin-left: 9rpx
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
		margin-bottom: 9px;
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
		width: 720rpx;
		justify-content: space-between;
		margin: auto;
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
		/* padding-top: 38rpx; */
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
