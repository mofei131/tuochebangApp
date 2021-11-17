<template>
	<view>
		<view class="top">
			<view class="feld">
				<image src="../../static/images/backl.png" @click="back()"></image>
				<view class="toptitle">联系客户</view>
				<image src="../../static/images/kefu.png" @click="call()"></image>
			</view>
		</view>
		<view class="lxbox">
			<view class="fa">
				<view class="falef">
					<view>发</view>
					<view style="white-space: nowrap;">下单人:</view>
				</view>
				<view class="ren">{{ pay_order_user.name }}</view>
				<view class="phone" @click="calluser(pay_order_user.mobile)">
					<view>{{ pay_order_user.mobile }}</view>
					<image src="../../static/images/phone.png"></image>
				</view>
			</view>
			<view class="hui"></view>
			<view class="cheng">
				<view class="ctop">
					<view class="qi">起</view>
					<view>{{ send_user.address }}</view>
				</view>
				<view class="xia">
					<view class="fche">发车人:</view>
					<view class="ren">{{ send_user.name }}</view>
					<view class="phone" @click="calluser(send_user.mobile)">
						<view>{{ send_user.mobile }}</view>
						<image src="../../static/images/phone.png"></image>
					</view>
				</view>
			</view>
			<view class="hui"></view>
			<view class="cheng">
				<view class="ctop">
					<view class="zi">终</view>
					<view>{{ receive_user.address }}</view>
				</view>
				<view class="xia">
					<view class="fche">接车人:</view>
					<view class="ren">{{ receive_user.name }}</view>
					<view class="phone" @click="calluser(receive_user.mobile)">
						<view>{{ receive_user.mobile }}</view>
						<image src="../../static/images/phone.png"></image>
					</view>
				</view>
			</view>
		</view>
		<takinfo class="taixi"></takinfo>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pay_order_user: '',
			send_user: '',
			receive_user: ''
		};
	},
	onLoad(p) {
		let that = this;
		this.http.ajax({
			url: 'driverOrder/contactCustomer',
			method: 'GET',
			data: {
				order_id: p.id
			},
			success(res) {
				if (res.code == -1) {
				} else {
					that.pay_order_user = res.data.pay_order_user;
					that.send_user = res.data.send_user;
					that.receive_user = res.data.receive_user;
				}
			}
		});
	},
	methods: {
		calluser(phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			});
		},
		back() {
			uni.navigateBack();
		},
		call() {
			uni.makePhoneCall({
				phoneNumber: this.cell
			});
		}
	}
};
</script>

<style>
.taixi {
	margin-top: 130rpx;
}
.fche {
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-left: 46rpx;
}
.xia {
	display: flex;
	align-items: center;
}
.ctop view:nth-child(2) {
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-left: 14rpx;
}
.qi {
	width: 32rpx;
	height: 32rpx;
	background: #30aeff;
	border-radius: 32rpx;
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.zi {
	width: 32rpx;
	height: 32rpx;
	background: #eb4a32;
	border-radius: 32rpx;
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.ctop {
	display: flex;
	align-items: center;
}
.hui {
	width: 609rpx;
	border: 1rpx solid #e6e6e6;
	margin: 30rpx auto;
}
.phone view:nth-child(1) {
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-right: 8rpx;
}
.phone image {
	width: 60rpx;
	height: 60rpx;
}
.phone {
	display: flex;
	align-items: center;
	margin-left: 80rpx;
}
.ren {
	font-size: 32rpx;
	width: 100rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: bold;
	color: #333333;
	margin-left: 52rpx;
}
.falef view:nth-child(2) {
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-left: 14rpx;
}
.falef view:nth-child(1) {
	width: 32rpx;
	height: 32rpx;
	background: #30aeff;
	border-radius: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #ffffff;
}
.falef {
	display: flex;
	align-items: center;
}
.fa {
	display: flex;
	align-items: center;
}
.lxbox {
	width: 710rpx;
	background: #ffffff;
	box-shadow: 0px 0px 19rpx 0px rgba(0, 0, 0, 0.11);
	border-radius: 14rpx;
	margin: 20rpx auto;
	padding: 37rpx 40rpx 45rpx 24rpx;
	box-sizing: border-box;
}
.feld image {
	width: 66rpx;
	height: 66rpx;
}
.top {
	width: 750rpx;
	height: 130rpx;
	background-color: #30aeff;
	padding-top: 38rpx;
	box-sizing: border-box;
}
.feld {
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
	color: #ffffff;
}
</style>
