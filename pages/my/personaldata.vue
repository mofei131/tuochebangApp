<template>
	<view>
		<view class="content">
			<view class="item">
				<text>真实姓名:</text>
				<input type="text" v-model="name" placeholder="请输入姓名" />
			</view>
			<view class="item-border"></view>
			<view class="item">
				<text>昵称:</text>
				<input type="text" v-model="nickname" placeholder="请输入昵称" />
			</view>
		</view>

		<view class="item-botm" @tap="baocun">保存</view>
		<takinfo></takinfo>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			nickname: ''
		};
	},
	onShow() {
		this.name = uni.getStorageSync('userInfo').realname
		this.nickname = uni.getStorageSync('userInfo').nickname
	},
	methods: {
		baocun() {
			let that = this;
			this.http.ajax({
				url: 'wechat/setUserinfo',
				method: 'GET',
				data: {
					user_id: uni.getStorageSync('userInfo').id,
					realname: this.name,
					nickname: this.nickname
				},
				success(res) {
					if (res.code == 200) {
						uni.showToast({
							title: '修改成功'
						});
						that.http.ajax({
							url: 'wechat/getUserinfo',
							method: 'GET',
							data: {
								user_id: uni.getStorageSync('userInfo').id
							},
							success(res) {
								uni.setStorageSync('userInfo', res.data);
								uni.switchTab({
									url: 'index'
								});
							}
						});
					} else if (res.data == -1) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				}
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f4f7f7;
}

.content {
	background: #ffffff;
	border-radius: 14rpx;
	margin: 20rpx;
	padding: 20rpx;
}

.item {
	display: flex;
	align-items: center;
	height: 80rpx;
}

.item text {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51565d;
	width: 200rpx;
}

input {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #c1c2c3;
}

.item-border {
	border-bottom: 1rpx solid #e8e8e8;
}

.item-botm {
	width: 680rpx;
	height: 76rpx;
	background: #40a9ff;
	border-radius: 39rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 72rpx;
	margin: 0rpx 35rpx;
}
</style>
