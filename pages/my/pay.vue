<template>
	<view>
		<view class="paytop">
			<view>立即支付</view>
			<view>￥{{money}}</view>
		</view>
		<view class="paybot">
				<view class="gou">请勾选支付方式</view>
				<view class="weixin">
					<view class="left">
						<image src="../../static/images/wxpay.png"></image>
						<view>微信支付</view>
					</view>
					<view class="right">
						<image @tap="agreementSuccess" class="fix"
							:src="agreement==true?'../../static/images/xding.png':'../../static/images/xqu.png'"></image>
					</view>
				</view>
		</view>
		<view class="btn" @click="pay()">立即支付</view>
		<takinfo></takinfo>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				agreement: true,
				money:''
			}
		},
		onLoad(p) {
			console.log(p.id)
		},
		onShow() {
			let that = this
			this.http.ajax({
				url: 'index/setting',
				method: 'GET',
				data: {
					key:'yajin'
				},
				success(res) {
					that.money = res.data.data
				}
			});
		},
		methods:{
			pay(){
				let data = uni.getStorageSync('zancun')
				let data2 = uni.getStorageSync('zancun2')
				this.http.ajax({
					url: 'driverAuth/auth',
					method: 'POST',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						name:data.name,
						idcard:data.card,
						mobile:data.phone,
						auth_type:data.auth_type,
						company:data.unit,
						business_lince:data.photo1,
						front_id_card:data.photo2,
						back_id_card:data.photo3,
						driver_card_homepage:data.photo4,
						driver_card_frontpage:data.photo5,
						car_type:data2.type,
						car_number:data2.carcode,
						car_photo_45:data2.photo6,
						driving_license_front_page:data2.photo7,
						driving_license_second_page:data2.photo8,
						commercial_insurance_photo:data2.photo9,
						cargo_insurance_photo:data2.photo10
					},
					success(res) {
						if(res.code == 200){
							uni.removeStorageSync('zancun')
							uni.removeStorageSync('zancun2')
							uni.showToast({
								title:'提交成功',
								icon:'none',
								duration:1000
							})
							setTimeout(function() {
							uni.switchTab({
								url:'./index'
							})
							},1000)
						}else if(res.code == -1){
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}else{
							uni.showToast({
								title:'认证失败',
								icon:'none'
							})
						}
					}
				});
			},
			agreementSuccess() {
				this.agreement = !this.agreement;
			},
		}
	}
</script>

<style>
	.btn{
		width: 686rpx;
		height: 71rpx;
		background: #30AEFF;
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 200rpx auto;
	}
	.right image{
		width: 48rpx;
		height: 48rpx;
	}
	.left view{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-left: 40rpx;
	}
	.left image{
		width: 60rpx;
		height: 60rpx;
	}
	.left{
		display: flex;
		align-content: center;
		justify-content: center;
	}
	.weixin{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.gou{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
	}
	.paybot{
		width: 750rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 19rpx 0px rgba(0, 0, 0, 0.11);
		margin-top: 20rpx;
		padding: 16rpx 46rpx 26rpx 49rpx;
		box-sizing: border-box;
	}
	.paytop view:nth-child(2){
		font-size: 50rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #FF3223;
	}
	.paytop view:nth-child(1){
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #666666;
		margin-bottom: 15rpx;
	}
	.paytop{
		width: 750rpx;
		height: 182rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 19rpx 0px rgba(0, 0, 0, 0.11);
		padding: 26rpx 0 27rpx 0;
		text-align: center;
		box-sizing: border-box;
	}
</style>
