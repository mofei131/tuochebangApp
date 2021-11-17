<template>
	<view>
		<view class="top" :style="[{height:CustomBar + 'px'}]" style="position: fixed;top: 0;">
			<view class="feld" :style="style">
				<image src="../../static/images/backl.png" @click="hui()"></image>
				<view class="toptitle">联系客户</view>
				<image></image>
			</view>
		</view>
		<view  :style="[{marginTop: (CustomBar + 10) + 'px'}]"></view>
		<!-- <view class="guidelist" v-for="(item,index) in article" :key="index" @tap="pandaun(index)"> -->
		<view class="guidelist" @tap="personaldata()">
			<view class="guideitem">
				<view>个人资料</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="updatemobile()">
			<view class="guideitem">
				<view>修改手机号</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="updatepwd()">
			<view class="guideitem">
				<view>修改登录密码</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist" @tap="updatepaypwd()">
			<view class="guideitem">
				<view>修改支付密码</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
		</view>
		<view class="guidelist">
			<view class="guideitem">
				<view>订单消息提示</view>
				<switch checked v-if="show"  style="transform: scale(0.7,0.7); margin-top: 10rpx;" @change="butishi"/>
				<switch v-else  style="transform: scale(0.7,0.7); margin-top: 10rpx;" @change="butishi"/>
			</view>
		</view>
		<view class="guidelist" @tap="out()">
		<!-- <view class="guidelist" @tap="signout(index)"> -->
			<view class="guideitem">
				<view>退出登录</view>
				<image src="../../static/icon/rightzd.png"></image>
			</view>
			<takinfo class="taixi"></takinfo>
		</view>
		
	</view>
</template>
<script>
	export default{
		data(){
			return{
				decide:false,
				ji:'',
				article:[],
				show:true,
				
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				Custom: this.Custom,
				style: ''
			}
		},
		created() {
				console.log(this.$store.state.num)
		},
		onLoad() {
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			this.style = `height:${CustomBar}px;padding-top:${StatusBar}px;background-color: #30aeff;`;
			
			let that = this
			uni.request({
				url:'https://trailer.boyaokj.cn/api/commission/notice',
				method:'POST',
				success(res) {
					that.article = res.data.data
				}
			})
		},
		onShow(){
			if(uni.getStorageSync('userInfo').order_notice == 1){
				this.show = true
			}else if(uni.getStorageSync('userInfo').order_notice == 0){
				this.show = false
			}
		},
		methods:{
			hui(){
				uni.reLaunch({
					url:'index'
				})
			},
			butishi(e){
				let that = this
				let show = 1
				if(!e.target.value){
					show = 0
				}
				this.http.ajax({
					url: 'app/setOrderNotice',
					method: 'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						type:show
					},
					success(res) {
						that.http.ajax({
							url: 'wechat/getUserinfo',
							method: 'GET',
							data: {
								user_id:uni.getStorageSync('userInfo').id
							},
							success(res) {
								uni.setStorageSync('userInfo',res.data)
								uni.showToast({
									title:'设置成功',
									duration:1000
								})
								// setTimeout(function(){
								// 	uni.reLaunch({
								// 		url:'index'
								// 	})
								// },1000)
							}
						});
					}
				});
			},
			out(){
				uni.removeStorageSync('userInfo')
				uni.switchTab({
					url:'../index/index'
				})
			},
			//修改手机号
			updatemobile(){
				uni.navigateTo({
					url:'./updatemobile'
				})
			},
			//个人资料
			personaldata(){
				uni.navigateTo({
					url:'./personaldata'
				})
			},
			//修改密码
			updatepwd(){
				uni.navigateTo({
					url:'./updatepwd'
				})
			},
			//修改支付密码
			updatepaypwd(){
				uni.navigateTo({
					url:'./updatepaypwd'
				})
			},
			//退出
			signout(){
				uni.removeStorageSync('userInfo');
				uni.redirectTo({
					url:'../login/login'
				})
			}
		}
	}
</script>


<style>
	.taixi{
		margin-top: 130rpx;
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
	page{
		background: #F8F8F8;
	}
	.tanchuang{
		width: 100%;
		height:80rpx;
		line-height: 85rpx;
		background-color: rgba(0,0,0,0.5);
		color: #FFFFFF;
	}
	.juli{
		margin-left: 30rpx;
		font-size: 24rpx;
		width: 500rpx;
		float: left;
	}
	.qd{
		width: 200rpx;
		font-size: 24rpx;
	}
	.qd{
		
	}
	.qiangdan{
		background-color: rgba(48,174,255,1);
		font-size: 24rpx;
		height: 60rpx;
		margin: 10rpx;
		border-radius: 23rpx;
		color: #FFFFFF;
	}
	.guideitem{
		display: flex;
		justify-content: space-between;
		width: 710rpx;
		height: 96rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.11);
		border-radius: 14rpx;
		margin: auto;
		margin-top: 20rpx;
	}
	.guidecot{
		padding-bottom: 20rpx;
	}
	.guideitem image{
		width: 36rpx;
		height: 36rpx;
		margin: 26rpx 36rpx 0 0;
	}
	.guideitem view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		/* color: #40A9FF; */
		margin: 30rpx 0 0 38rpx;
	}
	.guidecot{
		width: 640rpx;
		margin: auto;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.box{
		width: 710rpx;
		margin: auto;
		border-radius: 14rpx;
		padding-top: 100rpx;
		margin-top: -80rpx;
		background: #fff;
	}
</style>
