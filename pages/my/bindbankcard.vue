<template>
	<view class="page">
		<view class="mode">
			<view class="personal">
				<view class="fenge"></view>
				<text lines="1" class="txt2">添加银行卡</text>
			</view>
			<view class="info">
				<view class="infomation">
					<view class="name">
						<text lines="1" decode="true" class="nameword">持卡人：</text>
						<input lines="1" class="nameinput" type="text" v-model="name" placeholder="请输入姓名" placeholder-style="color:#C1C2C3;" />
					</view>
					<view class="xiantiao"><view class="outer1"></view></view>
					<view class="group4">
						<text lines="1" class="phone">卡号：</text>
						<input
							lines="1"
							class="phoneinput"
							type="number"
							@input="kasu"
							maxlength="19"
							v-model="cardno"
							placeholder="请输入卡号"
							placeholder-style="color:#C1C2C3;"
						/>
					</view>
					<view class="xiantiao"><view class="outer1"></view></view>
					<view v-show="yinhang">
						<view class="group4">
							<text lines="1" class="phone">银行：</text>
							<picker class="phoneinput" @change="anjianChange1" :value="index1" :range="array1" range-key="name">
								<view class="flex-row">
									<view class="phoneinput" v-if="index1 == -1">请选择银行</view>
									<text v-if="index1 != -1">{{ array1[index1].name }}</text>
								</view>
							</picker>
						</view>
						<view class="xiantiao"><view class="outer1"></view></view>
					</view>
					<view class="group4">
						<text lines="1" class="phone">预留电话：</text>
						<input lines="1" class="phoneinput" type="number" v-model="mobile" maxlength="11" placeholder="请输入预留电话" placeholder-style="color:#C1C2C3;" />
						<!-- <input class="sl-input" v-model="code" type="number" maxlength="4" placeholder-style="color:#C1C2C3;"
					placeholder="短信验证码" /> -->
						<view class="yzm" @tap="getcode">{{ yanzhengma }}</view>
					</view>
					<!-- <button bindtap="getcode" class="main2">
			    <text lines="1" class="info5">获取验证码</text>
			</button> -->
					<view class="xiantiao"><view class="outer1"></view></view>
					<view class="group4">
						<text lines="1" class="phone">验证码：</text>
						<input lines="1" class="phoneinput" type="number" v-model="code" maxlength="4" placeholder="请输入验证码" placeholder-style="color:#C1C2C3;" />
					</view>
					<view class="xiantiao"><view class="outer1"></view></view>
				</view>
			</view>
			<view class="box12">
				<view class="layer8" @click="bangd"><text lines="1" class="word15">确定绑卡</text></view>
			</view>
		</view>
		<takinfo></takinfo>
	</view>
</template>

<script>
var js;
export default {
	data() {
		return {
			array1: [],
			index1: 0,
			cardno: '',
			code: '',
			second: 0,
			yinhang: false,
			name: '',
			mobile: ''
		};
	},
	onShow() {
		let that = this;
		this.http.ajax({
			url: 'bank/bankList',
			method: 'GET',
			success(res) {
				that.array1 = JSON.parse(JSON.stringify(res.data));
			}
		});
	},
	computed: {
		yanzhengma() {
			if (this.second == 0) {
				return '获取验证码';
			} else {
				return this.second + 's重新获取';
			}
		}
	},
	methods: {
		bangd() {
			let that = this;
			this.http.ajax({
				url: 'bank/bind',
				method: 'POST',
				data: {
					mobile: this.mobile,
					code: this.code,
					name: this.name,
					cardNum: this.cardno,
					bankcode: this.array1[this.index1].code,
					user_id: uni.getStorageSync('userInfo').id
				},
				success(res) {
					if (res.code == 200) {
						uni.showToast({
							title: '绑定成功',
							duration: 1000
						});
						setTimeout(function() {
							uni.reLaunch({
								url: './bankcardlist'
							});
						}, 1000);
					} else if (res.code == -1) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: '绑定失败,请联系客服',
							icon: 'none'
						});
					}
				}
			});
		},
		anjianChange1(e) {
			this.index1 = e.detail.value;
		},
		kasu(value) {
			let that = this;
			this.http.ajax({
				url: 'bank/findBankByNo',
				method: 'GET',
				data: {
					cardNum: value.detail.value
				},
				success: function(res) {
					if(res.code == 200){
						console.log(that.array1.findIndex(item => JSON.parse(item.code) === JSON.parse(res.data.code)))
						that.index1 = that.array1.findIndex(item => JSON.parse(item.code) === JSON.parse(res.data.code))
						that.yinhang = true;
					}else if(res.code == -1){
						that.index1 = -1
						that.yinhang = true;
					}
				}
			});
			if(value.detail.value.length == 0){
				that.yinhang = false;
			}
			// if (value.detail.value.length == 4) {
			// 	that.index1 = that.array1.findIndex(item => JSON.parse(item.code) === JSON.parse(value.detail.value));
			// 	console.log(that.index1);
			// 	that.yinhang = true;
			// } else if (value.detail.value.length < 4) {
			// 	that.yinhang = false;
			// }
			// console.log(value.detail.value)
		},
		clear() {
			clearInterval(js);
			js = null;
			this.second = 0;
		},
		getcode() {
			if (this.mobile.length != 11) {
				uni.showToast({
					icon: 'none',
					title: '手机号不正确'
				});
				return;
			}
			if (this.second > 0) {
				return;
			}
			this.second = 60;
			var _this = this
			this.http.ajax({
				url: 'app/getVerifyCode',
				method: 'GET',
				data: {
					mobile: this.mobile
				},
				success: function(res) {
					js = setInterval(function() {
						_this.second--;
						if (_this.second == 0) {
							_this.clear();
						}
					}, 1000);
				}
			});
		}
	}
};
</script>

<style>
.sl-input {
	font-size: 28rpx;
}
.yzm {
	width: 178rpx;
	height: 56rpx;
	background: #40a9ff;
	border-radius: 32rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 150rpx;
	position: absolute;
	right: 25rpx;
}
.page {
	position: relative;
	width: 750rpx;
	background-color: rgba(244, 247, 247, 1);
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
.picture {
	border-radius: 14rpx;
	background-color: rgba(255, 255, 255, 1);
	align-self: center;
	margin-top: 16rpx;
	width: 720rpx;
	justify-content: flex-start;
	padding-top: 1rpx;
	align-items: center;
	position: relative;
	display: flex;
	flex-direction: column;
}
.mode {
	width: 750rpx;
	display: flex;
	flex-direction: column;
}
.box1 {
	height: 126rpx;
	background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng077c3685ed8b5ef680e7ae7a7813e9902c104fc32cb8f7e10e54d9e76af2f934) 100% no-repeat;
	width: 750rpx;
	display: flex;
	flex-direction: column;
}
.main1 {
	width: 727rpx;
	height: 30rpx;
	flex-direction: row;
	display: flex;
	margin: 7rpx 0 0 12rpx;
}
.personal {
	width: 239rpx;
	height: 40rpx;
	flex-direction: row;
	display: flex;
	justify-content: space-between;
	margin: 20rpx 0 0 35rpx;
}
.fenge {
	width: 6rpx;
	height: 28rpx;
	background-color: rgba(64, 169, 255, 1);
	margin-top: 6rpx;
	display: flex;
	flex-direction: column;
}
.txt2 {
	width: 224rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(81, 86, 93, 1);
	font-size: 28rpx;
	font-family: Helvetica;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
.info {
	border-radius: 14rpx;
	background-color: rgba(255, 255, 255, 1);
	align-self: center;
	margin-top: 16rpx;
	width: 720rpx;
	justify-content: flex-start;
	padding-top: 1rpx;
	align-items: center;
	position: relative;
	display: flex;
	flex-direction: column;
}
.infomation {
	width: 681rpx;
	display: flex;
	flex-direction: column;
}
.name {
	width: 310rpx;
	height: 40rpx;
	margin-top: 32rpx;
	flex-direction: row;
	display: flex;
	justify-content: space-between;
}
.nameword {
	width: 140rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(81, 86, 93, 1);
	font-size: 28rpx;
	font-family: PingFangSC-Regular;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
.nameinput {
	width: 140rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(81, 86, 93, 1);
	font-size: 28rpx;
	font-family: PingFangSC-Regular;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
.xiantiao {
	height: 2rpx;
	background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6783a4fecbdc9024e87783aec614554cf2bf72fef0eaeb803526167a8d4d61b8) 0rpx 0rpx no-repeat;
	background-size: 681rpx 2rpx;
	align-self: flex-end;
	margin-top: 33rpx;
	width: 680rpx;
	display: flex;
	flex-direction: column;
}
.outer1 {
	width: 680rpx;
	height: 2rpx;
	background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng4169c3e40f037912e41a73e581829162b7aaf7838f892c0bce99d11919ed7001) 0rpx -1rpx no-repeat;
	background-size: 681rpx 2rpx;
	display: flex;
	flex-direction: column;
}
.group4 {
	width: 720rpx;
	height: 40rpx;
	margin-top: 32rpx;
	flex-direction: row;
	display: flex;
	justify-content: start;
	position: relative;
}
.phone {
	width: 140rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(81, 86, 93, 1);
	font-size: 28rpx;
	font-family: PingFangSC-Regular;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
.phoneinput {
	width: 500rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(81, 86, 93, 1);
	font-size: 28rpx;
	font-family: PingFangSC-Regular;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
.group5 {
	width: 680rpx;
	height: 2rpx;
	background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng4efb7f7d753c3d8caa1bed350d0ecb5546bb65b29358bd71baf93e5a972182cc) 0rpx 0rpx no-repeat;
	background-size: 681rpx 1rpx;
	align-self: flex-end;
	margin-top: 33rpx;
	display: flex;
	flex-direction: column;
}
.group6 {
	width: 680rpx;
	height: 2rpx;
	background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng4169c3e40f037912e41a73e581829162b7aaf7838f892c0bce99d11919ed7001) 0rpx -1rpx no-repeat;
	background-size: 681rpx 2rpx;
	align-self: flex-end;
	display: flex;
	flex-direction: column;
}
.group7 {
	width: 473rpx;
	height: 40rpx;
	margin-top: 32rpx;
	flex-direction: row;
	display: flex;
	justify-content: space-between;
}
.txt3 {
	width: 140rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(81, 86, 93, 1);
	font-size: 28rpx;
	font-family: PingFangSC-Regular;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
.txt4 {
	width: 303rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(93, 97, 104, 1);
	font-size: 28rpx;
	font-family: PingFangSC-Regular;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
.group10 {
	width: 366rpx;
	height: 40rpx;
	margin-top: 32rpx;
	flex-direction: row;
	display: flex;
	justify-content: space-between;
}
.word8 {
	width: 140rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(81, 86, 93, 1);
	font-size: 28rpx;
	font-family: PingFangSC-Regular;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
.info1 {
	width: 196rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(93, 97, 104, 1);
	font-size: 28rpx;
	font-family: PingFangSC-Regular;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
.box12 {
	height: 151rpx;
	background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng58fec3515ff824f7a30229cb3b276ae746ed06c06571d46211a2f5b014305de6) 100% no-repeat;
	margin-top: 30rpx;
	width: 750rpx;
	justify-content: flex-start;
	padding-top: 3rpx;
	align-items: center;
	display: flex;
	flex-direction: column;
}
.layer8 {
	height: 76rpx;
	border-radius: 38rpx;
	background-color: rgba(64, 169, 255, 1);
	width: 680rpx;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
}
.word15 {
	width: 84rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(255, 255, 255, 1);
	font-size: 28rpx;
	font-family: Helvetica;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: center;
}
.image {
	margin: auto;
	margin-top: 10rpx;
	background-color: rgba(255, 255, 255, 1);
}
.main2 {
	height: 56rpx;
	border-radius: 28rpx;
	background-color: rgba(64, 169, 255, 1);
	margin-left: 160rpx;
	width: 178rpx;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
}
.info5 {
	z-index: 73;
	width: 140rpx;
	display: block;
	overflow-wrap: break-word;
	color: rgba(255, 255, 255, 1);
	font-size: 28rpx;
	font-family: PingFangSC-Regular;
	white-space: nowrap;
	line-height: 40rpx;
	text-align: left;
}
</style>
