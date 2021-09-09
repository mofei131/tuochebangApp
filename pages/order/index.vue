<template>
	<view>
		<view class="top">
			<view class="feld">
				<image src="../../static/images/xiaoxi.png"></image>
				<view class="toptitle">订单</view>
				<image src="../../static/images/kefu.png"></image>
			</view>
		</view>
		<view class="card">
			<view class="hui" :class="item.show?'liang':''" v-for="(item,index) in card" :key="index" @click="cad(index)">
				<view>{{item.title}}</view>
			</view>
		</view>
		<view class="listbox">
			<view class="neibox">
				<view class="ceng1">
					<view class="code">订单号:12408652396</view>
					<view class="fu">进行中</view>
				</view>
				<view class="ceng2">
					<view>3吨板车</view>
				</view>
				<view class="ceng3">
					<view>装</view>
					<view>大连海港码头</view>
				</view>
				<view class="ceng4">
					<view class="left">
						<view>卸</view>
						<view>潍坊房奎文区丹桂里</view>
					</view>
					<view class="jia">￥1398.00</view>
				</view>
				<view class="ceng5" v-if="true">
					<view class="yan" v-if="true" @click="yan()">发起验车</view>
					<view class="bo" v-if="false">验车被驳回</view>
					<view class="tong" v-if="false">已通过验车</view>
					<view class="yan" v-if="true">联系客户</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				card:[
					{title:'全部',show:true},
					{title:'进心中',show:false},
					{title:'已完成',show:false}
				]
			}
		},
		methods:{
			yan(){
				uni.navigateTo({
					url:'yanche'
				})
			},
			cad(index){
				if(index == 0){
					this.card[index].show = true
					this.card[1].show = false
					this.card[2].show = false
				}else if(index == 1){
					this.card[1].show = true
					this.card[0].show = false
					this.card[2].show = false
				}else{
					this.card[2].show = true
					this.card[0].show = false
					this.card[1].show = false
				}
			}
		}
	}
</script>

<style>
	.tong{
		width: 188rpx;
		height: 62rpx;
		background: #52C41A;
		border-radius: 35rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 16rpx;
	}
	.bo{
		width: 188rpx;
		height: 62rpx;
		background: #EB4A32;
		border-radius: 35rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 16rpx;
	}
	.yan{
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
		margin-left: 16rpx;
	}
	.ceng5{
		display: flex;
		justify-content: flex-end;
		padding-top: 11rpx;
		border-top: 1px solid #DBDBDB;
		margin-top: 15rpx;
	}
	.jia{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
	}
	.ceng4{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.left view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #676767;
		margin-left: 9rpx;
	}
	.left view:nth-child(1){
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		width: 24rpx;
		height: 24rpx;
		background: #30AEFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 24rpx;
	}
	.left{
		display: flex;
		justify-content: start;
		margin-top: 8rpx;
		align-items: center;
	}
	.ceng3 view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #676767;
		margin-left: 9rpx;
	}
	.ceng3 view:nth-child(1){
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		width: 24rpx;
		height: 24rpx;
		background: #6B6B6B;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 24rpx;
	}
	.ceng3{
		display: flex;
		justify-content: start;
		margin-top: 8rpx;
		align-items: center;
	}
	.ceng2 view{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 20rpx;
	}
	.neibox{
		width: 644rpx;
		margin: auto;
		padding: 20rpx 0 15rpx 0;
		box-sizing: border-box;
	}
	.listbox{
		width: 710rpx;
		/* height: 291rpx; */
		background: #FFFFFF;
		box-shadow: 0px 0px 19rpx 0px rgba(0, 0, 0, 0.11);
		border-radius: 14rpx;
		margin: auto;
		margin-top: 20rpx;
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
	.liang view{
		padding-bottom: 5rpx;
		border-bottom: 4rpx solid #30AEFF;
		color: #30AEFF;
	}
	.card{
		display: flex;
		width: 592rpx;
		justify-content: space-between;
		margin: auto;
		padding-top: 21rpx;
	}
	.hui{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #8A8A8A;
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
