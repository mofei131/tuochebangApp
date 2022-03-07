<template>
	<view>
		<view class="top" :style="[{height:CustomBar + 'px'}]" style="position: fixed;top: 0;">
			<view class="feld" :style="style">
				<view class="shu">
					<image src="../../static/images/xiaoxi.png" @click="tonews"></image>
					<view class="shunum" v-if="shunum > 0">{{ shunum }}</view>
				</view>
				<view class="toptitle">司机端</view>
				<image src="../../static/images/shaixuan.png" @click="hsai"></image>
			</view>
		</view>
		<view  :style="[{marginTop: (CustomBar + 30) + 'px'}]"></view>
		<view class="dingbox" v-for="(item, index) in orderlist" :key="index">
			<view class="neibox">
				<view @click="todet(item.id)">
					<view class="ceng1">
						<view class="code">订单号:{{ item.orderno }}</view>
						<view class="fu" v-if="item.pay_type == 1">全款</view>
						<view class="fu" v-if="item.pay_type == 2">定金</view>
						<view class="fu" v-if="item.pay_type == 3">到付</view>
					</view>
					<view class="ceng2">
						<view class="qidao">{{ item.start_city }}</view>
						<view>
							<view class="yju">{{ item.licheng }}km</view>
							<view class="jian">
								<text class="xian"></text>
								<text class="tou"></text>
							</view>
							<view class="jju">距您{{ item.distance }}km</view>
						</view>
						<view class="qidao">{{ item.end_city }}</view>
					</view>
					<view class="ceng3">
						<view class="che">{{ item.trailer_name }}</view>
						<view class="jia">￥{{ item.money }}</view>
					</view>
					<view class="ceng4">
						<view>装车时间</view>
						<view>:</view>
						<view>{{ item.zc_start_time }} ~ {{ item.zc_end_time }}</view>
					</view>
					<view class="ceng4">
						<view>车辆型号</view>
						<view>:</view>
						<view>{{ item.chexing }}</view>
					</view>
					<view class="ceng4">
						<view>备注</view>
						<view>:</view>
						<view>{{ item.mark }}</view>
					</view>
				</view>
				<view class="ceng5"><view @click="lie(item.id)">立即接单</view></view>
			</view>
			<view class="huibax" v-show="jie">
				<view class="tanbox">
					<image src="../../static/images/close.png" @click="guan()"></image>
					<view class="tishi">提示</view>
					<view class="jiele">您确定要接取这个订单吗?</view>
					<view class="quque">
						<view @click="guan()">取消</view>
						<view @click="jiequ()">确定</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shaibaox" v-show="shai">
			<view class="shai">
				<image @click="hsai" class="close" src="../../static/images/close.png"></image>
				<view class="neishai">
					<view class="shaitit">全部筛选</view>
					<view class="shaiitem">
						<view class="shaibai">开始时间</view>
						<!-- <view class="xaunze" style="color: #999;" >请选择开始时间</view> -->
						<shaixuan class="xaunze" @change="changeDatetimePicker" placeholder="请选择开始时间" :timepan="timepan" placeholder-style="color: #999999;"></shaixuan>
					</view>
					<view class="shaiitem">
						<view class="shaibai">结束时间</view>
						<!-- <view class="xaunze" style="color: #999;" >请选择结束时间</view> -->
						<shaixuan class="xaunze" @change="changeDatetimePicker2" placeholder="请选择结束时间" :timepan="timepan2" placeholder-style="color: #999999;"></shaixuan>
					</view>
					<view class="shaiitem">
						<view class="shaibai">出发地</view>
						<view class="shaimao">:</view>
						<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
							<view class="xaunze">
								<view v-if="city == ''" style="color: #999">请选择出发地城市</view>
								<view>{{ province }}{{ city }} {{ area }}</view>
							</view>
						</pick-regions>
					</view>
					<view class="shaiitem">
						<view class="shaibai">目的地</view>
						<view class="shaimao">:</view>
						<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion2">
							<view class="xaunze">
								<view v-if="city2 == ''" style="color: #999">请选择目的地城市</view>
								<view>{{ province2 }}{{ city2 }} {{ area2 }}</view>
							</view>
						</pick-regions>
					</view>
					<view class="shaiitem">
						<view class="shaibai">用车类型</view>
						<view class="shaimao">:</view>
						<picker class="xaunze" @change="anjianChange1" :value="index1" :range="array1" range-key="name">
							<view class="flex-row">
								<text>{{ array1[index1].name }}</text>
								<!-- <fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon> -->
							</view>
						</picker>
					</view>
					<view class="shaiitem">
						<view class="shaibai">行车距离</view>
						<view>:</view>
						<input class="xaunze" type="digit" v-model="juli" placeholder="请输入行车距离(km)" placeholder-style="color: #999999;" />
					</view>
					<view class="shaiitem2">
						<view class="qjnam">
							<view class="shaibai">价格区间</view>
							<view class="shaimao">:</view>
						</view>
						<view class="qujian">
							<input type="digit" v-model="min" placeholder="自定义最低价" placeholder-style="color: #999999;" />
							<view class="huiheng"></view>
							<input type="digit" v-model="max" placeholder="自定义最高价" placeholder-style="color: #999999;" />
						</view>
					</view>
					<view class="shaiitem2">
						<view class="qjnam">
							<view class="shaibai">特殊要求</view>
							<view class="shaimao">:</view>
						</view>
						<view class="labellist">
							<view class="labelitem" v-for="(item, index) in teshu" :key="index" :class="{ clever: cardlist.indexOf(item.id) != -1 }" @tap="select(item.id)">
								{{ item.name }}
							</view>
						</view>
					</view>
					<view class="btns">
						<view class="tbtn" @click="chongzhi">重置</view>
						<view class="tbtn2" @click="screen">查看</view>
					</view>
				</view>
			</view>
		</view>
		<view class="boximg" v-if="tanshow" @click="tanclose()">
			<view class="neibox2">
				<swiper class="swiper flex-column mx-start sx-stretch" circular :autoplay="true" interval="5000" duration="500" indicator-dots indicator-active-color="#30AEFF" indicator-color="#fff">
					<swiper-item @click.stop="buzhuan()" class="flex-column mx-start sx-stretch" v-for="(item,index) in tanlist" :key="index">
						<image class="swiper-item backImgFull" :src="item"></image>
					</swiper-item>
				</swiper> 
			</view>
			<image class="tanclose" src="../../static/images/null.png" mode="aspectFit" @click="tanclose"></image>
		</view>
		<takinfo></takinfo>
		<!-- <view class="quanp" v-if="quanp" @click="tologin"></view> -->
	</view>
</template>

<script>
import shaixuan from '../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
import pickRegions from '../components/pick-regions/pick-regions.vue';
import amap from '../../common/amap-wx.js';
export default {
	components: {
		pickRegions,
		amap,
		shaixuan
	},
	data() {
		return {
			jie: false,
			amapPlugin: '',
			address: '',
			lat: '',
			lng: '',
			province: '',
			city: '',
			area: '',
			province2: '',
			city2: '',
			area2: '',
			defaultRegionCode: [],
			array1: [
				{
					record: '三吨斜板车',
					id: 0
				},
				{
					record: '五吨斜板车',
					id: 1
				}
			],
			index1: 0,
			juli: '',
			min: '',
			max: '',
			shai: false,
			teshu: [{ id: 0, title: '备用车衣' }, { id: 1, title: '备用车衣2' }, { id: 2, title: '备用车衣33' }, { id: 3, title: '备用车衣444' }, { id: 4, title: '备用车衣5555' }],
			cardlist: [],
			page: 1,
			limit: 10,
			orderlist: [],
			dingid: 0,
			starttime: '',
			endtime: '',
			startprovince: '',
			startcity: '',
			startdis: '',
			endprovince: '',
			endcity: '',
			enddis: '',
			shunum: 0,
			
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			Custom: this.Custom,
			style: '',
			timepan:true,
			timepan2:true,
			tanlist:[],
			tanshow:false,
			link:'',
			is_force:'',
			quanp:false,
			adcode:''
		};
	},
	onLoad() {
		var StatusBar = this.StatusBar;
		var CustomBar = this.CustomBar;
		this.style = `height:${CustomBar}px;padding-top:${StatusBar}px;background-color: #30aeff;`;
		
		let that = this;
		this.http.ajax({
			url: 'index/getTrailerType',
			method: 'GET',
			success(res) {
				that.array1 = res.data;
			}
		});
		this.tanshow = true
	},
	onBackPress(e) {
		if (e.from == 'backbutton') {
			return true; //阻止默认返回行为
		}
	},
	onShow() {
		this.page = 1
		this.http.ajax({
			url: 'driverOrder/list',
			method: 'GET',
			data: {
				lng: '',
				lat: '',
				page: this.page,
				limit: this.limit
			},
			success(res) {
				console.log('订单列表1')
				console.log(res)
				that.orderlist = res.data;
			}
		});
		// this.jiazai()
		let that = this
		if (!uni.getStorageSync('userInfo') || !uni.getStorageSync('userInfo').id) {
			// uni.reLaunch({
			// 	url: '../login/login'
			// });
			this.quanp = true
		}
		// let that = this;
		this.amapPlugin = new amap.AMapWX({
			key: 'f9ecff0235b1c6a0415bb2cd7123a86f'
		});
		this.amapPlugin.getRegeo({
			success: data => {
				this.defaultRegionCode = [
					data[0].regeocodeData.addressComponent.province,
					data[0].regeocodeData.addressComponent.city,
					data[0].regeocodeData.addressComponent.district
				];
				// this.address = data[0].name;
				this.lat = data[0].latitude;
				this.lng = data[0].longitude;
				console.log(data[0].longitude)
				let that = this;
				this.http.ajax({
					url: 'driverOrder/list',
					method: 'GET',
					data: {
						lng: data[0].longitude,
						lat: data[0].latitude,
						page: this.page,
						limit: this.limit
					},
					success(res) {
						console.log('订单列表')
						console.log(res)
						that.orderlist = res.data;
					}
				});
				that.http.ajax({
					url: 'index/refreshLocation',
					method: 'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						lat:data[0].latitude,
						lon:data[0].longitude
					},
					success(res) {
						console.log('上传结果')
						console.log(res)
					}
				});
			},
			fail: err => {
				console.log(err);
			}
		});
		this.http.ajax({
			url: 'index/getRequirement',
			method: 'GET',
			data: {},
			success(res) {
				that.teshu = res.data;
			}
		});
		this.http.ajax({
			url: 'message/noReadNum',
			method: 'GET',
			data: {
				user_id: uni.getStorageSync('userInfo').id
			},
			success(res) {
				that.shunum = res.data.noread;
			}
		});
		this.http.ajax({
			url: 'pop/popup',
			method: 'GET',
			data:{
				type:1
			},
			success(res) {
				if(res.data.tanchuang.length == 0){
					that.tanshow = false
				}
				that.tanlist = res.data.tanchuang
			}
		});
	},
	onReachBottom() {
		this.page++
		let that = this;
		this.http.ajax({
			url: 'driverOrder/list',
			method: 'GET',
			data: {
				lng: that.lng,
				lat: that.lat,
				page: this.page,
				limit: this.limit,
			},
			success(res) {
				if (res.code == 200) {
					if (res.data.length != 0) {
						for(let i in res.data){
							that.orderlist.push(res.data[i])
						}
					}else{
						// console.log(res)
						uni.showToast({
							title: '没有了!',
							icon: 'none'
						});
					}
				} else if (res.code == -1) {
					uni.showToast({
						title: res.message,
						icon: 'none'
					});
				}
			}
		});
	},
	onPullDownRefresh() {
		this.page = 1
		let that = this;
		that.http.ajax({
			url: 'driverOrder/list',
			method: 'GET',
			data: {
				lng: that.lng,
				lat: that.lat,
				page: that.page,
				limit: that.limit
			},
			success(res) {
				console.log('订单列表')
				console.log(res)
				that.orderlist = res.data;
				uni.stopPullDownRefresh();
			}
		});
	},
	methods: {
		// tologin(){
			
		// },
		jiazai(){
			let that = this;
			that.http.ajax({
				url: 'index/version',
				method: 'GET',
				data:{},
				success(res) {
					console.log('更新')
					console.log(res)
					that.adcode = res.data.VERSION
					that.link = res.data.update_link
					that.is_force = res.data.IS_FORCE
					uni.getSystemInfo({
						success(res) {
							console.log('机型')
							console.log(res)
							if(res.platform == "android"){
					if(plus.runtime.version != that.adcode){
						uni.showModal({
							title: "发现新版本",
							content: "确认下载更新",
							success: (res) => {
								if (res.confirm) { //当用户确定更新，执行更新
									uni.showLoading({
										title: '更新中……'
									})
									console.log(that.link)
									uni.downloadFile({ //执行下载
										url: that.link, //下载地址
										success: downloadResult => { //下载成功
											uni.hideLoading();
											if (downloadResult.statusCode == 200) {
												uni.showModal({
													title: '',
													content: '更新成功，确定现在重启吗？',
													confirmText: '重启',
													confirmColor: '#EE8F57',
													success: function(res) {
														if (res.confirm) {
															plus.runtime.install( //安装
																downloadResult
																.tempFilePath, {
																	force: true
																},
																function(res) {
																	utils.showToast(
																		'更新成功，重启中');
																	plus.runtime
																		.restart();
																}
															);
														}
													}
												});
											}
										}
									});
								}else if (res.cancel) {
									if(that.is_force ==1 ){
										that.jiazai()
									}
								}
							}
						})
					}
					}
						}
					})
				}
			});
			
		},
		buzhuan(){
			console.log('禁止关闭')
		},
		tanclose(){
			this.tanshow = false
		},
		chongzhi() {
			(this.cardlist = []),
				(this.starttime = ''),
				(this.endtime = ''),
				(this.startprovince = ''),
				(this.startcity = ''),
				(this.startdis = ''),
				(this.endprovince = ''),
				(this.endcity = ''),
				(this.enddis = ''),
				(this.juli = ''),
				(this.min = ''),
				(this.max = ''),
				(this.province = ''),
				(this.province2 = ''),
				(this.city = ''),
				(this.city2 = ''),
				(this.area = ''),
				(this.area2 = ''),
				(this.index1 = 0);
				this.timepan = false
				this.timepan2 = false
		},
		screen() {
			let that = this;
			this.http.ajax({
				url: 'driverOrder/list',
				method: 'GET',
				data: {
					lng: that.lng,
					lat: that.lat,
					page: 1,
					limit: 100,
					requirement_ids: this.cardlist.toString(),
					starttime: this.starttime,
					endtime: this.endtime,
					startprovince: this.startprovince,
					startcity: this.startcity,
					startdis: this.startdis,
					endprovince: this.endprovince,
					endcity: this.endcity,
					enddis: this.enddis,
					trailer_type: this.array1[this.index1].id,
					licheng: this.juli,
					pricemin: this.min,
					pricemax: this.max
				},
				success(res) {
					if (res.code == 200) {
						if (res.data.length != 0) {
							that.orderlist = res.data;
						} else {
							that.orderlist = [];
						}
						uni.showToast({
							title: '筛选成功'
						});
						that.shai = !that.shai;
					} else if (res.code == -1) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				}
			});
		},
		jiequ() {
			let that = this;
			this.http.ajax({
				url: 'driverOrder/receivingOrder',
				method: 'GET',
				data: {
					order_id: this.dingid,
					user_id: uni.getStorageSync('userInfo').id
				},
				success(res) {
					if (res.code == 200) {
						uni.showToast({
							title: '订单接取成功'
						});
						that.http.ajax({
							url: 'driverOrder/list',
							method: 'GET',
							data: {
								lng: that.lng,
								lat: that.lat,
								page: that.page,
								limit: that.limit
							},
							success(res) {
								that.orderlist = res.data;
							}
						});
						that.jie = false;
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
		tonews() {
			uni.navigateTo({
				url: 'news'
			});
		},
		select(index) {
			let that = this;
			if (that.cardlist.indexOf(index) == -1) {
				that.cardlist.push(index); //选中添加到数组里
			} else {
				that.cardlist.splice(that.cardlist.indexOf(index), 1); //取消
			}
		},
		guan() {
			this.jie = false;
		},
		lie(id) {
			if(this.quanp){
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
			}else{
				this.jie = true;
				this.dingid = id;
			}
		},
		hsai() {
			if (this.shai) {
				this.shai = false;
			} else {
				this.shai = true;
			}
		},
		anjianChange1(e) {
			this.index1 = e.detail.value;
		},
		handleGetRegion(region) {
			let that = this;
			this.province = region[0].name;
			this.city = region[1].name;
			this.area = region[2].name;
			(this.startprovince = region[0].code), (this.startcity = region[1].code), (this.startdis = region[2].code);
		},
		handleGetRegion2(region) {
			let that = this;
			this.province2 = region[0].name;
			this.city2 = region[1].name;
			this.area2 = region[2].name;
			(this.endprovince = region[0].code), (this.endcity = region[1].code), (this.enddis = region[2].code);
		},
		changeDatetimePicker(date) {
			this.timepan = true
			this.starttime = new Date(date.f3).getTime() / 1000;
		},
		changeDatetimePicker2(date) {
			this.timepan2 = true
			this.endtime = new Date(date.f3).getTime() / 1000;
		},
		todet(id) {
			uni.navigateTo({
				url: 'orderDet?id=' + id
			});
		}
	}
};
</script>

<style scoped>
	.quanp{
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.tanclose{
		width: 120rpx;
		height: 120rpx;
		margin: auto;
		position: relative;
		top: 25%;
		display: block;
	}
	.neibox2 image{
		width: 600rpx;
		height: 800rpx;
	}
	.swiper{
		width: 600rpx;
		height: 800rpx;
	}
	.neibox2{
		width: 600rpx;
		height: 800rpx;
		margin: auto;
		position: relative;
		top: 20%;
	}
	.boximg{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgb(0,0,0,.3);
		z-index: 10;
	}
.shunum {
	position: absolute;
	top: 10rpx;
	right: 0rpx;
	width: 30rpx;
	height: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ff7878;
	color: #fff;
	font-size: 18rpx;
	border-radius: 30rpx;
}
.shu {
	position: relative;
}
.labelitem {
	background: #e9e9e9;
	border-radius: 50rpx;
	padding: 10rpx 20rpx 10rpx 20rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51565d;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
	margin-top: 20rpx;
}
.labellist {
	width: 560rpx;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: start;
	flex-wrap: wrap;
}
.clever {
	color: #fff;
	background: #30aeff;
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
	z-index: 2000;
	background: rgba(0, 0, 0, 0.06);
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
.tbtn2 {
	width: 334rpx;
	height: 76rpx;
	border-radius: 39rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #30aeff;
}
.tbtn {
	width: 334rpx;
	height: 76rpx;
	border-radius: 39rpx;
	border: 1rpx solid #30aeff;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #30aeff;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #fff;
}
.btns {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 680rpx;
	margin: auto;
	margin-top: 100rpx;
}
.shaiitem2 {
	margin-top: 30rpx;
}
.huiheng {
	width: 37rpx;
	height: 1rpx;
	border: 2rpx solid #666666;
	background-color: #666;
	margin-left: 12rpx;
	margin-right: 12rpx;
}
.qujian input {
	width: 240rpx;
	height: 40rpx;
	background: #e9e9e9;
	border-radius: 20rpx;
	color: #51565d;
	padding: 0 48rpx 0 48rpx;
	font-size: 24rpx;
}
.qujian {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 540rpx;
	margin: auto;
	margin-top: 30rpx;
}
qjnam view:nth-child(2) {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51565d;
}
.qjnam view:nth-child(1) {
	width: 120rpx;
	text-align-last: justify;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51565d;
}
.qjnam {
	display: flex;
	align-items: center;
}
.content {
	text-align: left !important;
}
.shaibaox {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
}
.xaunze {
	width: 530rpx;
	margin-left: 30rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51565d;
}
.shaimao {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51565d;
}
.shaibai {
	width: 120rpx;
	text-align-last: justify;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51565d;
}
.shaiitem {
	display: flex;
	align-items: center;
	width: 680rpx;
	margin-top: 50rpx;
}
.shaitit {
	font-size: 30rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: bold;
	color: #51565d;
	text-align: center;
	padding-top: 48rpx;
}
.neishai {
	width: 680rpx;
	margin: auto;
	position: relative;
	padding-bottom: 50rpx;
}
.shai {
	width: 720rpx;
	background: #ffffff;
	border-radius: 14rpx;
	position: fixed;
	z-index: 10;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 83%;
}
.close {
	width: 66rpx;
	height: 66rpx;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 100;
}
.ceng5 view {
	width: 188rpx;
	height: 62rpx;
	background: #30aeff;
	border-radius: 35rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 11rpx;
	float: right;
}
.ceng5 {
	height: 73rpx;
	border-top: 1rpx solid #dbdbdb;
	margin-top: 15rpx;
}
.ceng4 {
	display: flex;
	justify-content: start;
	align-items: center;
	margin-top: 6rpx;
}
.ceng4 view:nth-child(3) {
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-left: 15rpx;
}
.ceng4 view:nth-child(2) {
	color: #666666;
	font-size: 24rpx;
}
.ceng4 view:nth-child(1) {
	width: 120rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #666666;
	text-align-last: justify;
}
.che {
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.jia {
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #30aeff;
}
.ceng3 {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 12rpx;
}
.jju {
	font-size: 16rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #30aeff;
	text-align: center;
}
.yju {
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #30aeff;
	text-align: center;
}
.ceng2 {
	display: flex;
	justify-content: start;
	align-items: center;
	margin-top: 7rpx;
}
.tou {
	display: inline-block;
	width: 0;
	height: 0;
	border-top: 9rpx solid transparent;
	border-bottom: 9rpx solid transparent;
	border-left: 10rpx solid #30aeff;
}
.xian {
	width: 78rpx;
	height: 3rpx;
	background: #30aeff;
}
.jian {
	display: flex;
	justify-content: center;
	align-items: center;
}
.qidao {
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.fu {
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #30aeff;
}
.code {
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #6b6b6b;
}
.ceng1 {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.neibox {
	width: 644rpx;
	margin: auto;
	padding: 20rpx 0 15rpx 0;
	box-sizing: border-box;
}
.dingbox {
	width: 710rpx;
	/* height: 408rpx; */
	background: #ffffff;
	box-shadow: 0px 0px 19rpx 0px rgba(0, 0, 0, 0.11);
	border-radius: 14rpx;
	margin: auto;
	margin-top: 20rpx;
	margin-bottom: 9px;
}
.feld image {
	width: 66rpx;
	height: 66rpx;
}
.top {
	width: 750rpx;
	height: 130rpx;
	background-color: #30aeff;
	/* padding-top: 38rpx; */
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
}
.feld {
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
