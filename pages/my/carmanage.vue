<template>
	<view class="page">
		<view class="mode">
			<view class="personal">
				<view class="fenge"></view>
				<text lines="1" class="txt2">第一步：车辆资料</text>
			</view>
			<view class="info">
				<view class="infomation">
					<view class="name">
						<text lines="1" decode="true" class="nameword">车辆类型：</text>
						<!-- <input lines="1" class="nameinput" type="number" placeholder="请选择车辆类型"
			  	placeholder-style="color:#C1C2C3;" /> -->
						<picker class="xaunze" @change="anjianChange1" :value="index1" :range="array1" range-key="name">
							<view class="flex-row">
								<text>{{ array1[index1].name }}</text>
								<!-- <fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon> -->
							</view>
						</picker>
					</view>
					<view class="xiantiao"><view class="outer1"></view></view>
					<view class="group4">
						<text lines="1" class="phone">车牌号：</text>
						<input lines="1" class="phoneinput" type="text" maxlength="11" placeholder="请输入车牌号" placeholder-style="color:#C1C2C3;" v-model="carcode" />
					</view>
					<view class="xiantiao"><view class="outer1"></view></view>
					<!--<view class="group7">
	          <text lines="1" class="txt3">身份证号：</text>
	          <input lines="1" class="txt4" type="number" maxlength="11" placeholder="请输入身份证号码"
	          	placeholder-style="color:#C1C2C3;" />
	        </view>
	        <view class="xiantiao">
	          <view class="outer1"></view>
	        </view>
	        <view class="group10">
	          <text lines="1" class="word8">归属公司：</text>
	          <input lines="1" class="info1" type="number" maxlength="11" placeholder="请输入归属公司"
	          	placeholder-style="color:#C1C2C3;" />
	        </view>
	        <view class="xiantiao">
	          <view class="outer1"></view>
	        </view> -->
				</view>
			</view>
			<view class="picture">
				<view class="image">
					<view class="word8">请上传车辆45度角照片</view>
					<image :src="photo6 == '' ? '../../static/images/renzhengpic.png' : photo6" mode="widthFix" @click="chooseImage(6)"></image>
				</view>
				<view class="image">
					<view class="word8">请上传行驶证正页</view>
					<image :src="photo7 == '' ? '../../static/images/renzhengpic.png' : photo7" mode="widthFix" @click="chooseImage(7)"></image>
				</view>
				<view class="image">
					<view class="word8">请上传行驶证副页</view>
					<image :src="photo8 == '' ? '../../static/images/renzhengpic.png' : photo8" mode="widthFix" @click="chooseImage(8)"></image>
				</view>
				<view class="image">
					<view class="word8">请上传商业险照片</view>
					<image :src="photo9 == '' ? '../../static/images/renzhengpic.png' : photo9" mode="widthFix" @click="chooseImage(9)"></image>
				</view>
				<view class="image">
					<view class="word8">请上传货物险照片</view>
					<image :src="photo10 == '' ? '../../static/images/renzhengpic.png' : photo10" mode="widthFix" @click="chooseImage(10)"></image>
				</view>
				<view class="bohui" v-if="status == -1">
					<view class="nameword">驳回理由:</view>
					<view class="bo">{{ reason }}</view>
				</view>
			</view>
			<view class="box12">
				<view class="layer8">
					<text lines="1" class="word15" v-if="status == 1 && is_pay == 1" @click="topay2()">审核中</text>
					<text lines="1" class="word15" v-if="status == -1" @click="topay2()">被驳回,重新提交</text>
					<text lines="1" class="word15" v-if="status == 0" @click="topay()">提交注册信息</text>
					<text lines="1" class="word15" v-if="status == 1 && is_pay == 0" @click="ctopay()">交加盟费({{money}})</text>
					<text lines="1" class="word15" v-if="status == 2" @click="updata()">更新车辆信息</text>
				</view>
			</view>
		</view>
		<takinfo></takinfo>
	</view>
</template>

<script>
export default {
	data() {
		return {
			array1: [
				{
					record: '三吨板车',
					id: 0
				},
				{
					record: '五吨板车',
					id: 1
				},
				{
					record: '重型板车',
					id: 2
				}
			],
			index1: 0,
			carcode: '',
			photo6: '',
			photo7: '',
			photo8: '',
			photo9: '',
			photo10: '',
			status: 0,
			reason: '',
			money: 0,
			is_pay: ''
		};
	},
	onLoad() {
		let that = this;
		this.chakan()
	},
	onShow() {
		let that = this;
		this.http.ajax({
			url: 'index/setting',
			method: 'GET',
			data: {
				key: 'yajin'
			},
			success(res) {
				that.money = res.data.data;
			}
		});
		
	},
	methods: {
		chakan(){
			let that = this
			this.http.ajax({
				url: 'index/getTrailerType',
				method: 'GET',
				success(res) {
					that.array1 = res.data;
					that.http.ajax({
						url: 'driverAuth/carInfo',
						method: 'GET',
						data: {
							user_id: uni.getStorageSync('userInfo').id
						},
						success(res) {
							console.log(res);
							that.index1 = that.array1.findIndex(item => item.id === JSON.parse(res.data.car_type));
							that.carcode = res.data.car_number;
							that.photo6 = res.data.car_photo_45;
							that.photo7 = res.data.driving_license_front_page;
							that.photo8 = res.data.driving_license_second_page;
							that.photo9 = res.data.cargo_insurance_photo;
							that.photo10 = res.data.commercial_insurance_photo;
							that.status = res.data.status;
							that.reason = res.data.reason;
							that.is_pay = res.data.is_pay;
						}
					});
				}
			});
		},
		updata() {
			let that = this;
			if (!this.carcode) {
				uni.showToast({
					title: '请输入车牌号',
					icon: 'none'
				});
				return;
			}
			if (!this.photo6) {
				uni.showToast({
					title: '请上传车辆45度角照片',
					icon: 'none'
				});
				return;
			}
			if (!this.photo7) {
				uni.showToast({
					title: '请上传行驶证正页',
					icon: 'none'
				});
				return;
			}
			if (!this.photo8) {
				uni.showToast({
					title: '请上传行驶证副页',
					icon: 'none'
				});
				return;
			}
			if (!this.photo9) {
				uni.showToast({
					title: '请上传商业险照片',
					icon: 'none'
				});
				return;
			}
			if (!this.photo10) {
				uni.showToast({
					title: '请上传货物险照片',
					icon: 'none'
				});
				return;
			}
			this.http.ajax({
				url: 'driverAuth/updateCarInfo',
				method: 'POST',
				data: {
					user_id: uni.getStorageSync('userInfo').id,
					car_type: this.array1[this.index1].id,
					car_number: this.carcode,
					car_photo_45: this.photo6,
					driving_license_front_page: this.photo7,
					driving_license_second_page: this.photo8,
					commercial_insurance_photo: this.photo9,
					cargo_insurance_photo: this.photo10
				},
				success(res) {
					if (res.code == 200) {
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 1000
						});
						setTimeout(function() {
							uni.switchTab({
								url: './index'
							});
						}, 1000);
					} else if (res.code == -1) {
						console.log(res);
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					} else {
						console.log(res);
						uni.showToast({
							title: '提交失败',
							icon: 'none'
						});
					}
				},
				fial(res) {
					console.log(res);
				}
			});
		},
		chooseImage(e) {
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], //从相册选择、摄像头
				success: function(res) {
					uni.compressImage({
						src: res.tempFilePaths[0],
						quality: 50,
						success: res => {
							uni.showLoading({ title: '上传中' });
							console.log('压缩图片');
							console.log(res.tempFilePath);
							if (e == 6) {
								uni.uploadFile({
									url: 'https://trailer.boyaokj.cn/api/file/upload',
									filePath: res.tempFilePath,
									name: 'file',
									success(res) {
										that.photo6 = JSON.parse(res.data).data.url;
										uni.hideLoading();
									}
								});
							} else if (e == 7) {
								uni.uploadFile({
									url: 'https://trailer.boyaokj.cn/api/file/upload',
									filePath: res.tempFilePath,
									name: 'file',
									success(res) {
										that.photo7 = JSON.parse(res.data).data.url;
										uni.hideLoading();
									}
								});
							} else if (e == 8) {
								uni.uploadFile({
									url: 'https://trailer.boyaokj.cn/api/file/upload',
									filePath: res.tempFilePath,
									name: 'file',
									success(res) {
										that.photo8 = JSON.parse(res.data).data.url;
										uni.hideLoading();
									}
								});
							} else if (e == 9) {
								uni.uploadFile({
									url: 'https://trailer.boyaokj.cn/api/file/upload',
									filePath: res.tempFilePath,
									name: 'file',
									success(res) {
										that.photo9 = JSON.parse(res.data).data.url;
										uni.hideLoading();
									}
								});
							} else if (e == 10) {
								uni.uploadFile({
									url: 'https://trailer.boyaokj.cn/api/file/upload',
									filePath: res.tempFilePath,
									name: 'file',
									success(res) {
										that.photo10 = JSON.parse(res.data).data.url;
										uni.hideLoading();
									}
								});
							}
						}
					});
				}
			});
		},
		anjianChange1(e) {
			this.index1 = e.detail.value;
		},
		topay() {
			let that = this;
			if (!this.carcode) {
				uni.showToast({
					title: '请输入车牌号',
					icon: 'none'
				});
				return;
			}
			if (!this.photo6) {
				uni.showToast({
					title: '请上传车辆45度角照片',
					icon: 'none'
				});
				return;
			}
			if (!this.photo7) {
				uni.showToast({
					title: '请上传行驶证正页',
					icon: 'none'
				});
				return;
			}
			if (!this.photo8) {
				uni.showToast({
					title: '请上传行驶证副页',
					icon: 'none'
				});
				return;
			}
			if (!this.photo9) {
				uni.showToast({
					title: '请上传商业险照片',
					icon: 'none'
				});
				return;
			}
			if (!this.photo10) {
				uni.showToast({
					title: '请上传货物险照片',
					icon: 'none'
				});
				return;
			}
			uni.setStorage({
				key: 'zancun2',
				data: {
					type: this.array1[this.index1].id,
					carcode: this.carcode,
					photo6: this.photo6,
					photo7: this.photo7,
					photo8: this.photo8,
					photo9: this.photo9,
					photo10: this.photo10
				}
			});
			let data = uni.getStorageSync('zancun');
			let data2 = uni.getStorageSync('zancun2');
			that.http.ajax({
				url: 'driverAuth/auth',
				method: 'POST',
				data: {
					user_id: uni.getStorageSync('userInfo').id,
					name: data.name,
					idcard: data.card,
					mobile: data.phone,
					auth_type: data.auth_type,
					company: data.unit,
					business_lince: data.photo1,
					front_id_card: data.photo2,
					back_id_card: data.photo3,
					driver_card_homepage: data.photo4,
					driver_card_frontpage: data.photo5,
					car_type: data2.type,
					car_number: data2.carcode,
					car_photo_45: data2.photo6,
					driving_license_front_page: data2.photo7,
					driving_license_second_page: data2.photo8,
					commercial_insurance_photo: data2.photo9,
					cargo_insurance_photo: data2.photo10,
					money: that.money
				},
				success(res) {
					console.log(res, 1);
					var orderInfo = {
						appid: res.data.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
						noncestr: res.data.noncestr, // 随机字符串
						package: res.data.package, // 固定值
						partnerid: res.data.partnerid, // 微信支付商户号
						prepayid: res.data.prepayid, // 统一下单订单号
						timestamp: res.data.timestamp, // 时间戳（单位：秒）
						sign: res.data.sign // 签名，这里用的 MD5 签名
					};
					if (res.code == 200) {
						// uni.requestPayment({
						// 	provider: 'wxpay',
						// 	orderInfo: orderInfo,
						// 	success: function(res) {
						// 		console.log(res, 1);
						// 		uni.showToast({
						// 			title: '提交成功',
						// 			icon: 'none',
						// 			duration: 1000
						// 		});
						// 		setTimeout(function() {
						// 			uni.switchTab({
						// 				url: './index'
						// 			});
						// 		}, 1000);
						// 	},
						// 	fail: function(res) {
						// 		// fail
						// 		console.log(res, 1);
						// 		wx.showToast({
						// 			title: res.message,
						// 			icon: 'none'
						// 		});
						// 	}
						// });
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 1000
						});
						setTimeout(function(){
							this.chakan()
						},1000)
					} else if (res.code == -1) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: '认证失败',
							icon: 'none'
						});
					}
				}
			});
		},

		topay2() {
			let that = this;
			if (!this.carcode) {
				uni.showToast({
					title: '请输入车牌号',
					icon: 'none'
				});
				return;
			}
			if (!this.photo6) {
				uni.showToast({
					title: '请上传车辆45度角照片',
					icon: 'none'
				});
				return;
			}
			if (!this.photo7) {
				uni.showToast({
					title: '请上传行驶证正页',
					icon: 'none'
				});
				return;
			}
			if (!this.photo8) {
				uni.showToast({
					title: '请上传行驶证副页',
					icon: 'none'
				});
				return;
			}
			if (!this.photo9) {
				uni.showToast({
					title: '请上传商业险照片',
					icon: 'none'
				});
				return;
			}
			if (!this.photo10) {
				uni.showToast({
					title: '请上传货物险照片',
					icon: 'none'
				});
				return;
			}
			uni.setStorage({
				key: 'zancun2',
				data: {
					type: this.array1[this.index1].id,
					carcode: this.carcode,
					photo6: this.photo6,
					photo7: this.photo7,
					photo8: this.photo8,
					photo9: this.photo9,
					photo10: this.photo10
				}
			});
			let data = uni.getStorageSync('zancun');
			let data2 = uni.getStorageSync('zancun2');
			that.http.ajax({
				url: 'driverAuth/updateCarInfo',
				method: 'POST',
				data: {
					user_id: uni.getStorageSync('userInfo').id,
					name: data.name,
					idcard: data.card,
					mobile: data.phone,
					auth_type: data.auth_type,
					company: data.unit,
					business_lince: data.photo1,
					front_id_card: data.photo2,
					back_id_card: data.photo3,
					driver_card_homepage: data.photo4,
					driver_card_frontpage: data.photo5,
					car_type: data2.type,
					car_number: data2.carcode,
					car_photo_45: data2.photo6,
					driving_license_front_page: data2.photo7,
					driving_license_second_page: data2.photo8,
					commercial_insurance_photo: data2.photo9,
					cargo_insurance_photo: data2.photo10,
					money: that.money
				},
				success(res) {
					if (res.code == 200) {
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 1000
						});
						setTimeout(function() {
							uni.switchTab({
								url: './index'
							});
						}, 1000);
					} else if (res.code == -1) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: '认证失败',
							icon: 'none'
						});
					}
				}
			});
			// uni.navigateTo({
			// 	url:'./pay?id=yj'
			// })
		},

		ctopay() {
			var that = this;
			console.log(uni.getStorageSync('userInfo').id, that.money);
			that.http.ajax({
				url: 'DriverAuth/authPay',
				method: 'POST',
				data: {
					user_id: uni.getStorageSync('userInfo').id,
					money: that.money
				},
				success(res) {
					console.log(res, 2);
					var orderInfo = {
						appid: res.data.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
						noncestr: res.data.noncestr, // 随机字符串
						package: res.data.package, // 固定值
						partnerid: res.data.partnerid, // 微信支付商户号
						prepayid: res.data.prepayid, // 统一下单订单号
						timestamp: res.data.timestamp, // 时间戳（单位：秒）
						sign: res.data.sign // 签名，这里用的 MD5 签名
					};
					console.log(orderInfo);
					if (res.code == 200) {
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: orderInfo,
							success: function(res) {
								console.log(res, 2);
								// uni.removeStorageSync('zancun');
								// uni.removeStorageSync('zancun2');
								uni.showToast({
									title: '提交成功',
									icon: 'none',
									duration: 1000
								});
								setTimeout(function() {
									uni.switchTab({
										url: './index'
									});
								}, 1000);
							},
							fail: function(res) {
								// fail
								console.log(res, 2);
								wx.showToast({
									title: res.message,
									icon: 'none'
								});
							}
						});
					} else if (res.code == -1) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: '认证失败',
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
.bo {
	width: 680rpx;
	height: 200rpx;
	padding: 20rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #5d6168;
	background-color: rgba(244, 247, 247, 1);
	margin-bottom: 20rpx;
}
.xaunze {
	width: 530rpx;
	margin-left: 40rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51565d;
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
	width: 610rpx;
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
	color: rgba(193, 194, 195, 1);
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
	width: 338rpx;
	height: 40rpx;
	margin-top: 32rpx;
	flex-direction: row;
	display: flex;
	justify-content: space-between;
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
	width: 168rpx;
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
	width: 680rpx;
	overflow-wrap: break-word;
	color: rgba(255, 255, 255, 1);
	font-size: 28rpx;
	font-family: Helvetica;
	display: flex;
	align-items: center;
	justify-content: center;
}
.image {
	margin: auto;
	margin-top: 10rpx;
	background-color: rgba(255, 255, 255, 1);
	height: 240px;
	width: 320px;
	overflow: hidden;
}
</style>
