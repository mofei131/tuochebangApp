<template>
	<view>
		<view class="top">
			<view class="feld">
				<image src="../../static/images/xiaoxi.png"></image>
				<view class="toptitle">司机端</view>
				<image src="../../static/images/shaixuan.png" @click="hsai"></image>
			</view>
		</view>
		<view class="dingbox" @click="todet">
			<view class="neibox">
				<view class="ceng1">
					<view class="code">订单号:12408652396</view>
					<view class="fu">到付</view>
				</view>
				<view class="ceng2">
					<view class="qidao">潍坊市</view>
					<view >
						<view class="yju">15.7km</view>
						<view class="jian">
							<text class="xian"></text>
							<text class="tou"></text>
						</view>
						<view class="jju">距您120km</view>
					</view>
					<view class="qidao">潍坊市</view>
				</view>
				<view class="ceng3">
					<view class="che">3吨板车</view>
					<view class="jia">￥1398.00</view>
				</view>
				<view class="ceng4">
					<view>装车时间</view>
					<view>:</view>
					<view>今天12:00~15:00</view>
				</view>
				<view class="ceng4">
					<view>车辆型号</view>
					<view>:</view>
					<view>比亚迪f3</view>
				</view>
				<view class="ceng4">
					<view>备注</view>
					<view>:</view>
					<view>轻拿轻放，尽快送达，会给好评</view>
				</view>
				<view class="ceng5">
					<view>立即接单</view>
				</view>
			</view>
		</view>
		<view class="shaibaox" v-show="shai">
		<view class="shai">
			<image  @click="hsai" class="close" src="../../static/images/close.png"></image>
			<view class="neishai">
				<view class="shaitit">全部筛选</view>
				<view class="shaiitem">
					<view class="shaibai">开始时间</view>
					<view class="shaimao">:</view>
					<shaixuan class="xaunze" @change="changeDatetimePicker" placeholder="请选择开始时间" placeholder-style="color: #999999;"></shaixuan>
				</view>
				<view class="shaiitem">
					<view class="shaibai">结束时间</view>
					<view class="shaimao">:</view>
					<shaixuan class="xaunze" @change="changeDatetimePicker2" placeholder="请选择结束时间" placeholder-style="color: #999999;"></shaixuan>
				</view>
				<view class="shaiitem">
					<view class="shaibai">出发地</view>
					<view class="shaimao">:</view>
					<pick-regions :defaultRegion="defaultRegionCode"  @getRegion="handleGetRegion" >
									 <view class="xaunze">
					           <view v-if="city == ''" style="color: #999" >请选择出发地城市</view>
														<view >{{province}}{{city}} {{area}}</view>
														</view>
					       </pick-regions>
				</view>
				<view class="shaiitem">
					<view class="shaibai">目的地</view>
					<view class="shaimao">:</view>
					<pick-regions :defaultRegion="defaultRegionCode"  @getRegion="handleGetRegion2" >
									 <view class="xaunze">
					           <view v-if="city2 == ''" style="color: #999">请选择目的地城市</view>
														<view >{{province2}}{{city2}} {{area2}}</view>
														</view>
					       </pick-regions>
				</view>
				<view class="shaiitem">
					<view class="shaibai">用车类型</view>
					<view class="shaimao">:</view>
					<picker class="xaunze" @change="anjianChange1" :value="index1" :range="array1" range-key="record">
						<view class="flex-row">
							<text>{{array1[index1].record}}</text>
							<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
						</view>
					</picker>
				</view>
				<view class="shaiitem">
					<view class="shaibai">行车距离</view>
					<view>:</view>
					<input class="xaunze" type="digit" v-model="juli" placeholder="请输入行车距离" placeholder-style="color: #999999;"/>
				</view>
				<view class="shaiitem2">
					<view class="qjnam">
					<view class="shaibai">价格区间</view>
					<view class="shaimao">:</view>
					</view>
					<view class="qujian">
						<input type="digit" v-model="min" placeholder="自定义最低价" placeholder-style="color: #999999;"/>
						<view class="huiheng"></view>
						<input type="digit" v-model="max" placeholder="自定义最高价" placeholder-style="color: #999999;"/>
					</view>
				</view>
				<view class="shaiitem2">
					<view class="qjnam">
					<view class="shaibai">特殊要求</view>
					<view class="shaimao">:</view>
					</view>
					<view class="qujian">
						<input type="digit" v-model="min" placeholder="自定义最低价" placeholder-style="color: #999999;"/>
						<view class="huiheng"></view>
						<input type="digit" v-model="max" placeholder="自定义最高价" placeholder-style="color: #999999;"/>
					</view>
				</view>
				<view class="btns">
					<view class="tbtn">重置</view>
					<view class="tbtn2">查看</view>
				</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	import shaixuan from '../components/biaofun-datetime-picker/biaofun-datetime-picker.vue'
	import pickRegions from '../components/pick-regions/pick-regions.vue'
	import amap from '../../common/amap-wx.js'
	export default {
		components:{
			pickRegions,
			amap,
			shaixuan
		},
		data() {
			return {
				amapPlugin:'',
				address:'',
				lat:'',
				lng:'',
				province:'',
				city:'',
				area:'',
				province2:'',
				city2:'',
				area2:'',
				defaultRegionCode:[],
				array1: [{
					record: '三吨板车',id:0
				}, {
					record: '五吨板车',id:1
				}, {
					record: '重型板车',id:2
				}],
				index1: 0,
				juli:'',
				min:'',
				max:'',
				shai:false
			}
		},
		onLoad() {
			
		},
		onShow() {
			console.log(uni.getStorageSync('userInfo'))
			if(!uni.getStorageSync('userInfo')){
				uni.reLaunch({
					url:'../login/login'
				})
			}
			let that = this
			this.amapPlugin = new amap.AMapWX({  
			            key: 'bd45905078a821a4b50ad67dbc470875',
			        });
			this.amapPlugin.getRegeo({
					success: (data) => {  
							this.defaultRegionCode = [data[0].regeocodeData.addressComponent.province,data[0].regeocodeData.addressComponent.city,data[0].regeocodeData.addressComponent.district]
							// this.address = data[0].name;
							// this.lat = data[0].latitude
							// this.lng = data[0].longitude 
					},
					fail:(err) =>{
						console.log(err)
					}
			}); 
		},
		methods: {
			hsai(){
				console.log("断")
				if(this.shai){
					this.shai = false
				}else{
					this.shai = true
				}
			},
			anjianChange1(e) {
				this.index1 = e.detail.value;
			},
			handleGetRegion(region){
				let that = this
				this.province = region[0].name
				this.city = region[1].name
				// this.code = region[1].code
				this.area = region[2].name
					console.log(region)
			},
			handleGetRegion2(region){
				let that = this
				this.province2 = region[0].name
				this.city2 = region[1].name
				// this.code = region[1].code
				this.area2 = region[2].name
					console.log(region)
			},
			changeDatetimePicker(date){
				console.log(date)
			},
			changeDatetimePicker2(date){
				console.log(date)
			},
			todet(){
				uni.navigateTo({
					url:'orderDet'
				})
			},
		}
	}
</script>

<style>
	.tbtn2{
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
		background: #30AEFF;
	}
	.tbtn{
		width: 334rpx;
		height: 76rpx;
		border-radius: 39rpx;
		border: 1rpx solid #30AEFF;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #30AEFF;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}
	.btns{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 680rpx;
		margin: auto;
		margin-top: 100rpx;
	}
	.shaiitem2{
		margin-top: 30rpx;
	}
	.huiheng{
		width: 37rpx;
		height: 1rpx;
		border: 2rpx solid #666666;
		background-color: #666;
		margin-left: 12rpx;
		margin-right: 12rpx;
	}
	.qujian input{
		width: 240rpx;
		height: 40rpx;
		background: #E9E9E9;
		border-radius: 20rpx;
		color: #51565D;
		padding: 0 48rpx 0 48rpx;
		font-size: 24rpx;
	}
	.qujian{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 540rpx;
		margin: auto;
		margin-top: 30rpx;
	}
	qjnam view:nth-child(2){
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.qjnam view:nth-child(1){
		width: 120rpx;
		text-align-last: justify;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.qjnam{
		display: flex;
		align-items: center;
	}
	.content{
		text-align: left!important;
	}
	.shaibaox{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0,0,0,.3);
	}
	.xaunze{
		width: 530rpx;
		margin-left: 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.shaimao{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.shaibai{
		width: 120rpx;
		text-align-last: justify;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.shaiitem{
		display: flex;
		align-items: center;
		width: 680rpx;
		margin-top: 50rpx;
	}
	.shaitit{
		font-size: 30rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: bold;
		color: #51565D;
		text-align: center;
		padding-top: 48rpx;
	}
	.neishai{
		width: 680rpx;
		margin: auto;
		position: relative;
		padding-bottom: 50rpx;
	}
	.shai{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		position: fixed;
		bottom: 20rpx;
		left: 15rpx;
		z-index: 10;
	}
	.close{
		width: 66rpx;
		height: 66rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
	.ceng5 view{
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
		margin-top: 11rpx;
		float: right;
	}
	.ceng5{
		height: 73rpx;
		border-top: 1rpx solid #DBDBDB;
		margin-top: 15rpx;
	}
	.ceng4{
		display: flex;
		justify-content: start;
		align-items: center;
		margin-top: 6rpx;
	}
	.ceng4 view:nth-child(3){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-left: 15rpx;
	}
	.ceng4 view:nth-child(2){
		color: #666666;
		font-size: 24rpx;
	}
	.ceng4 view:nth-child(1){
		width: 120rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		text-align-last: justify;
	}
	.che{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.jia{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
	}
	.ceng3{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
	}
	.jju{
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #30AEFF;
		text-align: center;
	}
	.yju{
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
		text-align: center;
	}
	.ceng2{
		display: flex;
		justify-content: start;
		align-items: center;
		margin-top: 7rpx;
	}
	.tou{
		display: inline-block;
		width: 0;
		height: 0;
		border-top: 9rpx solid transparent;
		border-bottom: 9rpx solid transparent;
		border-left: 10rpx solid #30AEFF;
	}
	.xian{
		width: 78rpx;
		height: 3rpx;
		background: #30AEFF;
	}
	.jian{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.qidao{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
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
	.neibox{
		width: 644rpx;
		margin: auto;
		padding: 20rpx 0 15rpx 0;
		box-sizing: border-box;
	}
	.dingbox{
		width: 710rpx;
		/* height: 408rpx; */
		background: #FFFFFF;
		box-shadow: 0px 0px 19rpx 0px rgba(0, 0, 0, 0.11);
		border-radius: 14rpx;
		margin: auto;
		margin-top: 20rpx;
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
