<template>
	<view class="flex-column mx-start sx-stretch">
		<view v-if="lawyerlist.length>0" class="flex-column mx-start sx-stretch  list-item" v-for="(item,index) in lawyerlist" :key="index"
			:style="{flex:'0 0 auto',order:item}">
			<view class="flex-row mx-start sx-stretch" @tap="todetail(item)">

		
				<image  mode="aspectFill" :src="item.photo||'/static/icon/girl.png'" style="border-radius: 50%;margin-right: 10rpx;flex: 0 0 125rpx;height:125rpx;"></image>
				<view class="flex-column mx-evenly sx-stretch" style="flex: 1 1 auto;line-height: 40rpx;width: 500rpx;">
					<view class="flex-row mx-start sx-center">
						<text style="font-size: 32rpx;">{{item.name}}</text>
						<view v-if="item.type_text" class="flex-txt-center"
							style="margin-left: 10rpx;width: 52rpx;background-color: #FF4D4F;">
							<text lines="1"
								style="color: #FFFFFF;height: 26rpx;line-height: 26rpx;text-align: center;font-size: 17rpx;">{{item.type_text && item.type_text.name}}</text>
						</view>
						
						<view v-if="item.busy" class="flex-row mx-end sx-center" style="flex:1 1 auto">
							<view class="statuSDot"
								:style="{backgroundColor: item.busy==1?'#26CD93':item.busy==2?'#E1B12F':'#FF4D4F'}">
							</view>
							<text v-if="item.busy==1"
								style="margin-left:8rpx;color: #26CD93;font-size: 20rpx;">在线</text>
							<text v-else-if="item.busy==2"
								style="margin-left:8rpx;color: #E1B12F;font-size: 20rpx;">繁忙</text>
								<text v-else-if="item.busy==3"
									style="margin-left:8rpx;color: #FF4D4F;font-size: 20rpx;">开庭</text>
						</view>
					</view>
					<view class="flex-row mx-between sx-center" style="margin-bottom: 5rpx;">
						<!-- <view class="ellipsis" style="width: 512rpx;font-size: 24rpx;color: rgba(102,102,102,1);">
							{{item.jianjie}}
						</view> -->
						<view v-if="follow" @tap.stop="guanzhu(item)" style="padding: 0 16rpx;font-size: 22rpx;flex: 0 0 auto ;border-radius: 40rpx;background-color: #6bc1f3;color: #FFFFFF;box-sizing: border-box;">{{item.follow==1?'取消关注':'关注'}}</view>
					</view>

					<view class="field">
						<view class="label" v-for="(ct,index1) in item.case_type" :key="ct.id" :class="[caseClass(index1+1)]">
							{{ct.name && ct.name.substr(0,2)}}
						</view>
					</view>
					<view class="flex-row mx-between sx-center"
						style="flex: 0 0 auto;font-size: 22rpx;color: rgba(153,153,153,1);">
						<view class="flex-row">职业年限：{{item.zhiyenianxian && item.zhiyenianxian.name}}</view>
						<view class="flex-row">已咨询：<text style="color: red;">{{item.case_num}}</text>件</view>
						<view class="flex-row">好评：<text style="color: red;">{{item.praise||0}}</text>次</view>
					</view>

					<view v-if="isbuy" class="flex-row mx-between sx-center" style="flex: 0 0 auto;">
						<text style="color: #FF4D4F;">￥{{item.service_price}}</text>
						<view
							style="background-color: #40A9FF;color: #FFFFFF; font-size: 26rpx;padding: 5rpx; border-radius: 6rpx;"
							@tap.stop="toPay(item)">
							立即购买</view>
					</view>
				</view>

			</view>
			<view v-if="showline" style="flex:0 0 1rpx;background-color: #e6e6e6;margin-top: 5rpx;"></view>
			<view v-if="item && zixun" class="flex-row mx-between sx-center wrap" style="flex: 0 0 auto;margin-top: 20rpx;">
				<view class="serviceBtn flex-txt-center" @tap="tuwen(item)">
					<text>图文咨询</text>
					<text style="color: red;">￥{{item.price && item.price.tuwen}}</text>
				</view>
				<view class="serviceBtn flex-txt-center" @tap="dianhua(item)">
					<text>电话咨询</text>
					<text style="color: red;">￥{{item.price && item.price.dianhua}}</text>
				</view>
				<view class="serviceBtn flex-txt-center" @tap="jianmian(item)">
					<text>见面咨询</text>
					<text style="color: red;">￥{{item.price && item.price.jianmian}}</text>
				</view>
				<view class="serviceBtn flex-txt-center" @tap="pinglvshi(item)">
					<text>聘请律师</text>
					<text style="color: red;">￥{{item.price && item.price.pinqing}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		components: {},
		props: ['lawyerlist', 'zixun', 'isbuy','updatefollow','follow','showline'],
		data() {
			return {


			}
		},
		computed:{
			caseClass(e){
				console.log("属性")
				console.log(e)
				return (e)=>{
					let clazz = 'green';
					switch(e){
						case 1:
						clazz ='blue';
						break;
						case 2:
						clazz ='green';
						break;
						case 3:
						clazz ='pink';
						break;
						case 4:
						clazz ='purple';
						break;
						case 5:
						clazz ='yellow';
						break;
						case 6:
						clazz ='blue';
						break;
						case 7:
						clazz ='green';
						break;
						case 8:
						clazz ='pink';
						break;
						case 9:
						clazz ='purple';
						break;
						case 10:
						clazz ='yellow';
						break;
						case 11:
						clazz ='blue';
						break;
						case 12:
						clazz ='green';
						break;
						case 13:
						clazz ='pink';
						break;
						case 14:
						clazz ='purple';
						break;
						case 15:
						clazz ='yellow';
						case 16:
						clazz ='blue';
						break;
						default: clazz ="red"
					}
					return clazz;
				}
			}
		},
		methods: {
			toPay(item) {
				this.$emit('buy', item)
			},

			tuwen(item) {
				console.log('--------------------------');
				console.log(item);
				uni.navigateTo({
					url: '../service_zhixun/tuwen?layer_id='+item.id+'&price='+item.price.tuwen+'&typeId=1'
				})
			},
			async dianhua(item) {
				console.log(item);
				let layer_id = item.id;
				let user_id = this.$store.state.userInfo.user_id;
				if (!layer_id || !user_id) {
					uni.showToast({
						title: '用户数据异常，请重新登录',
						icon: 'none'
					})
					return;
				}
				let data = {
					layer_id,
					user_id,
				}
				console.log(data);
				uni.showLoading({
					title: '请稍等'
				})
				let res = await this.$myRequest({
					url: 'service/dianhua',
					method:'GET',
					data
				});
				console.log("电话")
				console.log(res);
				uni.hideLoading();
				if(res && res.code==-1){
					uni.showToast({
						title: res.message,
						icon:'none'
					})
				}else{
					
						let service_id = res.data.service_id;
						//跳转收银台
						uni.navigateTo({
							url: '../my/pay?id='+res.data.service_id+'&price='+item.price.dianhua+'&typeId=2'+'&phone='+item.mobile
						})
						uni.$on('callphone',()=>{
							uni.makePhoneCall({
								 phoneNumber: item.mobile
							})
							
						})		
					
				}
				
				
				
				
			},
			jianmian(item) {
				console.log(item);
				uni.navigateTo({
					url: '../service_zhixun/jianmian?layer_id='+item.id+'&price='+item.price.jianmian+'&typeId=3'+'&phone='+item.mobile
				})
			},
			pinglvshi(item) {
				console.log(item);
				uni.navigateTo({
					url: '../service_zhixun/pinlvshi?layer_id='+item.id+'&price='+item.price.pinqing+'&typeId=10'
				})
			},
			todetail(item) {
				console.log(item);
				uni.navigateTo({
					url: '../detail/lawyerDetail?id='+item.id
				})
			},
			async guanzhu(item){
				let res = await this.$myRequest({
				url: 'layer/follow',
				methods: 'GET',
				data: {
					user_id:this.$store.state.userInfo.user_id,
					layer_id: item.id
				}
				});
				if (res && res.code=='200') {
					this.$emit('updatefollow',item.follow)				
				}
			}
		}
	}
</script>

<style>
	.list-item {
		padding: 20rpx;
		flex: 0 0 auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}
	.statuSDot{
		width: 14rpx;height: 14rpx;border-radius: 50%
	}
	.serviceBtn {
		/* border: 2rpx solid #4CA2FF;
		padding: 0 5rpx;
		font-size: 28rpx;
		color: #4CA2FF; */
		flex:0 0 auto;
		border-radius: 4rpx;
		border: 1px solid rgb(64,169,255,.5);
		font-size: 18rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #40A9FF;
		padding: 8rpx;
	}

	.field {
		display: flex;
		/* margin-bottom: 13rpx; */
	}

	.label {
		    border-radius: 4rpx;
		    font-size: 22rpx;
		    color: #fff;
		    line-height: 26rpx;
		    margin-right: 6rpx;
		    text-align: center;
		    padding: 5rpx 5rpx 5rpx 5rpx;
	}

	.green {
		background: #26CD93;
	}

	.blue {
		background: #5F91F6;
	}

	.pink {
		background: #ED538A;
	}

	.purple {
		background: #6765FF;
	}

	.yellow {
		background: #E1B12F;
	}
	.avator{
		border-radius: 50%;margin-right: 10rpx;flex: 0 0 125rpx;height:125rpx;
	}
</style>
