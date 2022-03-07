<template>
	<view>
		<!-- <view class="map"> -->
		<map
			style="width: 100%;display: flex;"
			:style="{ height: shou ? '360rpx' : '1000rpx' }"
			:latitude="latitude"
			:longitude="longitude"
			scale="16"
			show-location="true"
			:markers="markers"
			:polyline="polylines"
		>
			<!-- <cover-image class="war" src="../../static/images/war.png" ></cover-image>
							 <cover-view class="juli">提示:装车距离距离您150km</cover-view> -->
		</map>
		<!-- </view> -->
		<!-- @touchend="chukai" -->
		<view class="fidbox" @touchstart="touchStart" @touchend="touchEnd" :style="shou ? 'height:1050rpx' : 'height:410rpx'">
			<view class="neifidbox">
				<view class="ceng1"><view class="hui"></view></view>
				<view class="ceng2">
					<view class="dizhi">
						<view class="zhxi">
							<view>起</view>
							<view>{{ orderdet.start_name }}</view>
						</view>
						<view class="gogaode" @click="togaoqi()">
							<view class="hutong">{{ orderdet.start_addr }}</view>
							<view class="gotuwen">
								<image src="../../static/images/daohang.png" mode=""></image>
								<view>导航</view>
							</view>
						</view>
					</view>
					<view class="dizhi">
						<view class="zhxi"> 
							<view style="background: #EB4A32;">终</view>
							<view>{{ orderdet.end_name }}</view>
						</view>
						<view class="gogaode" @click="togaozhong()">
							<view class="hutong">{{ orderdet.end_addr }}</view>
							<view class="gotuwen">
								<image src="../../static/images/daohang.png" mode=""></image>
								<view>导航</view>
							</view>
						</view>
					</view>
				</view>
				<view class="ceng3" v-if="shou" id="ceng3">
					<view class="yugu">
						<view class="ylef">
							<view>预估里程</view>
							<view>:</view>
							<view>{{ orderdet.licheng }}km</view>
						</view>
						<view class="yrig">
							<view>预估时间</view>
							<view>:</view>
							<view>{{ orderdet.hour }}h</view>
						</view>
					</view>
					<view class="zhuangc">
						<view>装车时间</view>
						<view>:</view>
						<view>{{ orderdet.zc_start_time }} ~ {{ orderdet.zc_end_time }}</view>
					</view>
					<view class="leifu">
						<view class="san">
							<view>板车类型</view>
							<view>:</view>
							<view>{{ tname }}</view>
						</view>
						<view class="san">
							<view>托运车型</view>
							<view>:</view>
							<view>{{ orderdet.chexing }}</view>
						</view>
						<view class="san">
							<view>托运车况</view>
							<view>:</view>
							<view v-if="orderdet.car_situation == 1">新车</view>
							<view v-if="orderdet.car_situation == 2">二手车</view>
							<view v-if="orderdet.car_situation == 3">报废车</view>
							<view v-if="orderdet.car_situation == 4">特殊车辆</view>
						</view>
						<view class="san">
							<view>支付类型</view>
							<view>:</view>
							<view v-if="orderdet.pay_type == 1">全款</view>
							<view v-if="orderdet.pay_type == 2">定金</view>
							<view v-if="orderdet.pay_type == 3">到付</view>
						</view>
					</view>
					<view class="lifei">
						<view>里程费</view>
						<view>:</view>
						<view>￥{{ orderdet.money }}</view>
					</view>
					<view class="baoxian">
						<view class="lhan">保险</view>
						<view class="yinmao">:</view>
						<view class="yangzh">
							<view class="bxrt" v-for="(item, index) in orderdet.baoxian" :key="index">
								<view>{{ item.name }}</view>
								<view>￥{{ item.price }}</view>
							</view>
						</view>
					</view>
					<view class="beizhu">
						<view>备注</view>
						<view>:</view>
						<view>{{ orderdet.mark }}</view>
					</view>
					<view class="tixing">
						<view>特别提醒:</view>
						<view>拖运小咖仅为信息居间服务平台，实际运输过程中的相关风险由发货方与承运方自行评估与承担，出发前请务必确认。</view>
					</view>
				</view>
				<view class="ceng4">
					<view class="btn" v-if="orderdet.status == 1" @click="tiaobox()">接取订单</view>
					<view class="btn" v-if="orderdet.status == 2" @click="lianxi(orderdet.id)">联系客户</view>
					<view class="btn" v-if="orderdet.status == 3">订单完成</view>
				</view>
			</view>
			<view class="huibax" v-if="tanbox">
				<view class="tanbox">
					<image src="../../static/images/close.png" @click="tiaobox2()"></image>
					<view class="tishi">提示</view>
					<view class="jiele">您确定要接取这个订单吗?</view>
					<view class="quque">
						<view @click="tiaobox2()">取消</view>
						<view @click="jie(orderdet.id)">确定</view>
					</view>
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
			touchStartX: 0, // 触屏起始点x
			touchStartY: 0, // 触屏起始点y
			shou: true,
			animationData: {},
			amapPlugin: null,
			key: 'f9ecff0235b1c6a0415bb2cd7123a86f',
			markers: [],
			poisdatas: [{}, {}, {}],
			title: 'map',
			latitude: '',
			longitude: '',
			polylines: [],
			homestyle: {
				backgroundImage: 'url(http://hlstore.yimetal.cn/2021/war.png)'
			},
			animation: '',
			animationData: {},
			orderdet: [],
			tname: '',
			tanbox: false,
			upDataMsg:'',
			id: ''
		};
	},
	onLoad(p) {
		this.id = p
		let that = this;
		let amapFile = require('../../common/amap-wx.js');
		let amapPlugin = new amapFile.AMapWX({
			key: this.key
		});
		amapPlugin.getRegeo({
			success: function(data) {
				//成功回调
				console.log(data);
				that.latitude = data[0].latitude;
				that.longitude = data[0].longitude;
				that.http.ajax({
					url: 'driverOrder/detail',
					method: 'GET',
					data: {
						id: p.id
					},
					success(res) {
						that.orderdet = res.data;
						that.tname = res.data.trailer_type.name;
						that.result = res.data.result;
						that.polylines = [
							{
								points: res.data.result,
								arrowLine: true,
								dottedLine: true,
								arrowIconPath: '../../static/images/close.png',
								width: 10,
								color: 'FEAA34'
							}
						];
						that.markers = [
							{
								id: 0,
								latitude: that.latitude,
								longitude: that.longitude,
								iconPath: '../../static/images/weizhi.png',
								width: 20,
								height: 20
							},
							{
								id: 1,
								latitude: res.data.result[0].latitude,
								longitude: res.data.result[0].longitude,
								iconPath: '../../static/images/qi.png',
								width: 20,
								height: 20
							},
							{
								id: 2,
								latitude: res.data.result[res.data.result.length - 1].latitude,
								longitude: res.data.result[res.data.result.length - 1].longitude,
								iconPath: '../../static/images/dao.png',
								width: 20,
								height: 20
							}
						];
					}
				});
			},
			fail: function(info) {
				//失败回调
				// console.log(info)
			}
		});
		console.log(this.orderdet)
	},
	onShow() {
		// let that = this
		// let amapFile2 = require('../../common/amap-wx.js');
		// let amapPlugin2 = new amapFile2.AMapWX({
		// 	key: this.key
		// });
		// that.upDataMsg = setInterval(function(){
		// 		amapPlugin2.getRegeo({
		// 			success: function(data) {
		// 				that.latitude = data[0].latitude;
		// 				that.longitude = data[0].longitude;
		// 				that.http.ajax({
		// 					url: 'index/refreshLocation',
		// 					method: 'GET',
		// 					data: {
		// 						user_id:uni.getStorageSync('userInfo').id,
		// 						lat:that.latitude,
		// 						lon:that.longitude
		// 					},
		// 					success(res) {
		// 						console.log('上传结果')
		// 						console.log(res)
		// 					}
		// 				});
		// 			},
		// 			fail: function(info) {
		// 			}
		// 		});
		// 	},10000)
	},
	onHide() {
		clearInterval(this.upDataMsg)
	},
	onUnload() {
		clearInterval(this.upDataMsg)
	},
	methods: {
		tiaobox() {
			this.tanbox = true;
		},
		tiaobox2() {
			this.tanbox = false;
		},
		jie(id) {
			let that = this;
			this.http.ajax({
				url: 'driverOrder/receivingOrder',
				method: 'GET',
				data: {
					order_id: id,
					user_id: uni.getStorageSync('userInfo').id
				},
				success(res) {
					if (res.code == 200) {
						uni.showToast({
							title: '订单接取成功',
							duration: 1000
						});
						that.http.ajax({
							url: 'driverOrder/detail',
							method: 'GET',
							data: {
								id: this.id
							},
							success(res) {
								that.orderdet = res.data;
								that.result = res.data.result;
								that.polylines = [
									{
										points: res.data.result,
										arrowLine: true,
										dottedLine: true,
										arrowIconPath: '../../static/images/close.png',
										width: 10,
										color: 'FEAA34'
									}
								];
							}
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
							title: '接取失败，请联系客服',
							icon: 'none'
						});
					}
				}
			});
		},
		lianxi(id) {
			uni.navigateTo({
				url: '../order/lianxi?id=' + id
			});
		},
		touchStart(e) {
			this.touchStartX = e.touches[0].clientX;
			this.touchStartY = e.touches[0].clientY;
		},

		/**
		 * 触摸结束
		 **/

		touchEnd(e) {
			let deltaX = e.changedTouches[0].clientX - this.touchStartX;
			let deltaY = e.changedTouches[0].clientY - this.touchStartY;
			if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
				if (deltaX >= 0) {
					console.log('左滑');
				} else {
					console.log('右滑');
				}
			} else if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {
				if (deltaY < 0) {
					console.log('上滑');
					this.shou = true;
					// this.animation.translateY(0).step()
					// this.animationData = this.animation.export()
				} else {
					console.log('下滑');
					this.shou = false;
					// this.animation.translateY(500).step()
					// // 导出动画数据传递给data层
					// this.animationData = this.animation.export(); //每次执行导出动画时 会覆盖之前的动画
				}
			} else {
				console.log('可能是误触！');
			}
		},
		// chukai(){
		// 	if(this.shou){
		// 		this.shou = false
		// 	}else{
		// 		this.shou = true
		// 	}
		// },
		togaoqi() {
			uni.openLocation({
				latitude: JSON.parse(this.orderdet.start_lat),
				longitude: JSON.parse(this.orderdet.start_lon),
				name: this.orderdet.start_name,
				address: this.orderdet.start_addr
			});
		},
		togaozhong() {
			uni.openLocation({
				latitude: JSON.parse(this.orderdet.end_lat),
				longitude: JSON.parse(this.orderdet.end_lon),
				name: this.orderdet.end_name,
				address: this.orderdet.end_addr
			});
		}
	}
};
</script>

<style>
.juli {
	display: inline-flex;
	width: 750rpx;
	/* padding-left: 70rpx; */
	position: relative;
	height: 40rpx;
	background: rgba(0, 0, 0, 0.5);
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
	text-align: center;
	letter-spacing: 10rpx;
	/* padding-left: 50rpx; */
}
.war {
	width: 28rpx;
	height: 28rpx;
	display: inline-flex;
	position: absolute;
	top: 8rpx;
	left: 200rpx;
	z-index: 5;
	/* background-image: url('http://hlstore.yimetal.cn/2021/war.png'); */
	/* background-image: url('~@/static/images/war.png'); */
	/* background-image: url(../../static/images/war.png);
		background-size: 100% 100%;
		background-position: 50% 50%;
		background-repeat: no-repeat; */
}
.gotuwen view {
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #717171;
	margin-left: 5rpx;
}
.gotuwen {
	display: flex;
	align-items: center;
}
.gogaode {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.gotuwen image {
	width: 28rpx;
	height: 28rpx;
}
.map {
	width: 100%;
	height: 100vh;
	position: relative;
	z-index: 1;
}
.quque view:nth-child(1) {
	width: 334rpx;
	height: 76rpx;
	border-radius: 39rpx;
	border: 1px solid #30aeff;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #30aeff;
	display: flex;
	justify-content: center;
	align-items: center;
}
.quque view:nth-child(2) {
	width: 334rpx;
	height: 76rpx;
	background: #30aeff;
	border-radius: 39rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
}
.quque {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 680rpx;
	padding-top: 78rpx;
	margin: auto;
}
.jiele {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	text-align: center;
	margin-top: 44rpx;
}
.tishi {
	font-size: 30rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #51565d;
	padding-top: 68rpx;
	text-align: center;
}
.tanbox image {
	width: 66rpx;
	height: 66rpx;
	position: absolute;
	top: 0;
	right: 0;
}
.huibax {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 5;
	background: rgba(0, 0, 0, 0.4);
}
.tanbox {
	width: 720rpx;
	height: 368rpx;
	background: #ffffff;
	border-radius: 14rpx;
	position: relative;
	margin: auto;
	margin-top: 60%;
}
.yrig {
	margin-left: 134rpx;
}
.ylef view:nth-child(1),
.yrig view:nth-child(1) {
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	text-align-last: justify;
	width: 100rpx;
}
.ylef view:nth-child(2),
.yrig view:nth-child(2) {
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.ylef view:nth-child(3),
.yrig view:nth-child(3) {
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #30aeff;
	margin-left: 11rpx;
}
.ylef,
.yrig {
	display: flex;
	align-items: center;
}
.yugu {
	display: flex;
	align-items: center;
	margin-top: 16rpx;
}
.zhuangc view:nth-child(1) {
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	text-align-last: justify;
	width: 100rpx;
}
.zhuangc view:nth-child(2) {
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.zhuangc view:nth-child(3) {
	font-size: 25rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: bold;
	color: #333333;
	margin-left: 11rpx;
}
.zhuangc view:nth-child(4) {
	font-size: 25rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: bold;
	color: #333333;
	margin-left: 56rpx;
}
.zhuangc {
	display: flex;
	align-items: center;
	margin-top: 16rpx;
}
.san view:nth-child(1) {
	text-align-last: justify;
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	width: 100rpx;
}
.san view:nth-child(2) {
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.san view:nth-child(3) {
	font-size: 25rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: bold;
	color: #333333;
	margin-left: 11rpx;
}
.san {
	display: flex;
	align-items: center;
	margin-top: 16rpx;
}
.lifei view:nth-child(1) {
	text-align-last: justify;
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	width: 100rpx;
}
.lifei view:nth-child(2) {
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.lifei view:nth-child(3) {
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #30aeff;
	margin-left: 11rpx;
}
.lifei {
	display: flex;
	align-items: center;
	margin-top: 16rpx;
}
.bxrt view:nth-child(2) {
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #30aeff;
}
.bxrt view:nth-child(1) {
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.bxrt {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 398rpx;
	margin-bottom: 20rpx;
	margin-left: 11rpx;
}
.yinmao {
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.lhan {
	width: 100rpx;
	text-align-last: justify;
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.baoxian {
	display: flex;
	margin-top: 16rpx;
}
.beizhu view:nth-child(3) {
	width: 454rpx;
	margin-left: 11rpx;
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.beizhu view:nth-child(2) {
	text-align-last: justify;
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.beizhu view:nth-child(1) {
	width: 100rpx;
	text-align-last: justify;
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.beizhu {
	display: flex;
	margin-top: 2rpx;
	/* height: 138rpx; */
}
.tixing view:nth-child(2) {
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-left: 10rpx;
	width: 466rpx;
}
.tixing view:nth-child(1) {
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	width: 100rpx;
	white-space: nowrap;
}
.tixing {
	display: flex;
	margin-top: 10rpx;
}
.ceng3 {
	padding-left: 50rpx;
	height: 620rpx;
	box-sizing: border-box;
	background-color: #fff;
	overflow: scroll;
}
.btn {
	width: 550rpx;
	height: 80rpx;
	background: #30aeff;
	border-radius: 40rpx;
	font-size: 39rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	margin-top: 10rpx;
}
.ceng2 {
	border-bottom: 1rpx solid #e6e6e6;
}
.hutong {
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	margin: 4rpx 0 20rpx 50rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-all;
	width: 500rpx;
}
.zhxi view:nth-child(2) {
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-left: 14rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.zhxi view:nth-child(1) {
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
.zhxi {
	display: flex;
	align-items: center;
}
.hui {
	width: 36rpx;
	height: 7rpx;
	background: #d5d5d5;
	border-radius: 14rpx;
	margin: auto;
	margin-bottom: 25rpx;
}
.neifidbox {
	width: 640rpx;
	margin: auto;
	padding: 31rpx 0 50rpx 0;
	box-sizing: border-box;
}
.fidbox {
	width: 710rpx;
	background: #ffffff;
	box-shadow: 0px 1rpx 44rpx 0px rgba(0, 0, 0, 0.2);
	border-radius: 28rpx;
	position: fixed;
	bottom: 55rpx;
	left: 20rpx;
	z-index: 1200;
}
</style>
