<template>
	<view>
		<view class="top">
			<view class="feld">
				<image src="../../static/images/backl.png" @click="hui"></image>
				<view class="toptitle">司机端</view>
				<view @click="jia()">解绑</view>
			</view>
		</view>
		<view class="billlist">
			<view class="billitem" v-for="(item,index) in bill" :key="index" :class="[caseClass(index+1)]">
				<view class="itemleft">
					<view>{{item.bank}}</view>
					<view>储值卡</view>
					<view>****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;{{item.cardno}}</view>
				</view>
				<view class="itemright" v-if="jie">
					<image @tap="agreementSuccess(index)" class="radio"
						:src="index == xiab ?'../../static/images/xding.png':'../../static/images/xqu2.png'"></image>
				</view>
			</view>
			<view class="btn" @tap="bindbankcard()" v-if="!jie">绑定银行卡</view>
			<view class="btn" @tap="zai" v-if="jie">解除绑定</view>
		</view>
		<view class="anbox" v-if="dai">
			<view class="neibox">
				<view class="ntitle">提示</view>
				<view class="ncon1">您去定要解除卡号</view>
				<view class="ncon2">后四位为{{bill[xiab].cardno}}的招商银行储值卡吗</view>
				<view class="nbot">
					<view @click="zai">取消</view>
					<view @click="unbindbankcard()">确定</view>
				</view>
			</view>
		</view>
		<takinfo></takinfo>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bill:[],
				page:1,
				limit:10,
				xiab:-1,
				jie:false,
				dai:false
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
		onLoad(p) {
			this.lei = p.page
		},
		onShow() {
			let that = this
			this.http.ajax({
				url: 'bank/list',
				method: 'GET',
				data: {
					user_id:uni.getStorageSync('userInfo').id
				},
				success: function(res) {
					console.log(res.data)
					that.bill = res.data
				}
			});
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
				this.searchChange()
		},
		methods:{
			zai(){
				this.dai = !this.dai
			},
			agreementSuccess(index) {
				this.xiab = index
			},
			jia(){
				if(this.jie){
					this.jie = !this.jie
				}else{
					this.jie = !this.jie
				}
			},
			hui(){
				uni.navigateTo({
					url:'./withdrawal'
				})
			},
			searchChange() {
				let that = this
				that.page++
				uni.request({
					url:'https://trailer.boyaokj.cn/api/wechat/moneyLog',
					method:'GET',
					data:{
						page:that.page,
						limit:that.limit,
						user_id:uni.getStorageSync('userInfo').user_id
					},
					success(res) {
						for(let i in res.data.data){
							that.boll.push(res.data.data[i])
						}
					}
				})
			},
			bindbankcard(){
				uni.navigateTo({
					url:'./bindbankcard'
				})
			},
			unbindbankcard(){
				let that = this
				this.http.ajax({
					url: 'bank/unbind',
					method: 'GET',
					data: {
						bank_id:this.bill[this.xiab].id,
						user_id:uni.getStorageSync('userInfo').id
					},
					success(res) {
						if(res.code == 200){
							uni.showToast({
								title:'解绑成功',
								duration:1000
							})
							that.dai = !that.dai
							that.http.ajax({
								url: 'bank/list',
								method: 'GET',
								data: {
									user_id:uni.getStorageSync('userInfo').id
								},
								success: function(res) {
									that.bill = res.data
								}
							});
						}else if(res.code == -1){
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}else{
							uni.showToast({
								title:'解除失败,请联系客服',
								icon:'none'
							})
						}
						
					}
				});
			}
		}
	}
</script>

<style>
	.nbot view:nth-child(2){
		width: 334rpx;
		height: 76rpx;
		background: #30AEFF;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nbot view:nth-child(1){
		width: 334rpx;
		height: 76rpx;
		border-radius: 39rpx;
		border: 1px solid #409FFD;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #409FFD;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nbot{
		width: 680rpx;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.ncon2{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin: 5rpx 0 48rpx 0;
		text-align: center;
	}
	.ncon1{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		text-align: center;
	}
	.ntitle{
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #51565D;
		margin-bottom: 34rpx;
		text-align: center;
	}
	.neibox{
		width: 720rpx;
		height: 368rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		margin-top: 50%;
		padding: 68rpx 0 20rpx 0;
		box-sizing: border-box;
	}
	.anbox{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0,0,0,.3);
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
	.radio{
		width: 48rpx;
		height: 48rpx;
		margin-right: 20rpx;
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
	page{
		height: 100%;
	}
	.billlist{
		width: 100%;
		background: #fff;
	}
	.billitem{
		display: flex;
		width: 665rpx;
		height: 287rpx;
		margin: auto;
		border-radius: 14rpx;
		justify-content: space-between;
		padding: 28rpx 0 30rpx 0;
		box-sizing: border-box;
		margin-top: 20rpx;
		color: #FFFFFF;
		/* background-color: rgba(248,110,110,1); */
	}
	.billitem:last-child{
		border-bottom: 0;
	}
	.itemleft view:nth-child(1){
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 30rpx;
		margin-left: 60rpx;
		margin-bottom: 8rpx;
	}
	.itemleft view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 28rpx;
		margin-left: 60rpx;
	}
	.itemleft view:nth-child(3){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 56rpx;
		margin-left: 60rpx;
		margin-top: 30rpx;
	}
	.itemright view{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 18rpx;
	}
	.btn{
		width: 686rpx;
		height: 76rpx;
		background: #049EFF;
		border-radius: 35rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		/* line-height: 50rpx; */
		padding-top: 15rpx;
		box-sizing: border-box;
		margin-top: 145rpx;
	}
</style>
