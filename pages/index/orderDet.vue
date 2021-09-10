<template>
	<view>
		<view class="fidbox" @touchstart="chukai">
			<view class="neifidbox">
				<view class="ceng1">
					<view class="hui"></view>
				</view>
				<view class="ceng2">
					<view class="dizhi">
					<view class="zhxi">
						<view>起</view>
						<view>丹桂里小区</view>
					</view>
					<view class="hutong">江西省新余市分宜县和平胡同302号</view>
					</view>
					<view class="dizhi">
					<view class="zhxi">
						<view style="background: #EB4A32;">终</view>
						<view>银丰家园</view>
					</view>
					<view class="hutong">内蒙古自治区乌海市乌达区祖冲之胡同11号</view>
					</view>
				</view>
				<view class="ceng3" v-if="shou">
					<view class="yugu">
						<view class="ylef">
							<view>预估里程</view>
							<view>:</view>
							<view>532.25km</view>
						</view>
						<view class="yrig">
							<view>预估时间</view>
							<view>:</view>
							<view>5.5h</view>
						</view>
					</view>
					<view class="zhuangc">
						<view>装车时间</view>
						<view>:</view>
						<view>今天</view>
						<view>01:00-01:20</view>
					</view>
					<view class="leifu">
						<view class="san">
							<view>板车类型</view>
							<view>:</view>
							<view>斜板车</view>
						</view>
						<view class="san">
							<view>托运车型</view>
							<view>:</view>
							<view>比亚迪f3</view>
						</view>
						<view class="san">
							<view>支付类型</view>
							<view>:</view>
							<view>到付</view>
						</view>
					</view>
					<view class="lifei">
						<view>里程费</view>
						<view>:</view>
						<view>￥454.64</view>
					</view>
					<view class="baoxian">
						<view class="lhan">保险</view>
						<view class="yinmao">:</view>
						<view class="yangzh">
						<view class="bxrt">
							<view>保险货损险</view>
							<view>￥45</view>
						</view>
						<view class="bxrt">
							<view>保险货损险</view>
							<view>￥45</view>
						</view>
						</view>
					</view>
					<view class="beizhu">
						<view>备注</view>
						<view>:</view>
						<view>快点送过来，速度快点送过来，速度快点送过来，速度快点送过来，速度快点送过来，速度</view>
					</view>
					<view class="tixing">
						<view>特别提醒:</view>
						<view>拖车邦仅为信息居间服务平台，实际运输过程中的相关风险由发货方与承运方自行评估与承担，出发前请务必确认。</view>
					</view>
				</view>
				<view class="ceng4">
					<view class="btn">联系客户</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				shou:true
			}
		},
		methods:{
			chukai(){
				console.log("发送")
				if(this.shou){
					this.shou = false
				}else{
					this.shou = true
				}
			}
		}
	}
</script>

<style>
	.yrig{
		margin-left: 134rpx;
	}
	.ylef view:nth-child(1),.yrig view:nth-child(1){
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		text-align-last: justify;
		width: 100rpx;
	}
	.ylef view:nth-child(2),.yrig view:nth-child(2){
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.ylef view:nth-child(3),.yrig view:nth-child(3){
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
		margin-left: 11rpx;
	}
	.ylef,.yrig{
		display: flex;
		align-items: center;
	}
	.yugu{
		display: flex;
		align-items: center;
		margin-top: 16rpx;
	}
	.zhuangc view:nth-child(1){
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		text-align-last: justify;
		width: 100rpx;
	}
	.zhuangc view:nth-child(2){
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.zhuangc view:nth-child(3){
		font-size: 25rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-left: 11rpx;
	}
	.zhuangc view:nth-child(4){
		font-size: 25rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-left: 56rpx;
	}
	.zhuangc{
		display: flex;
		align-items: center;
		margin-top: 16rpx;
	}
	.san view:nth-child(1){
		text-align-last: justify;
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		width: 100rpx;
	}
	.san view:nth-child(2){
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.san view:nth-child(3){
		font-size: 25rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-left: 11rpx;
	}
	.san{
		display: flex;
		align-items: center;
		margin-top: 16rpx;
	}
	.lifei view:nth-child(1){
		text-align-last: justify;
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		width: 100rpx;
	}
	.lifei view:nth-child(2){
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.lifei view:nth-child(3){
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
		margin-left: 11rpx;
	}
	.lifei{
		display: flex;
		align-items: center;
		margin-top: 16rpx;
	}
	.bxrt view:nth-child(2){
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #30AEFF;
	}
	.bxrt view:nth-child(1){
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.bxrt{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 398rpx;
		margin-bottom: 20rpx;
		margin-left: 11rpx;
	}
	.yinmao{
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.lhan{
		width: 100rpx;
		text-align-last: justify;
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.baoxian{
		display: flex;
		margin-top: 16rpx;
	}
	.beizhu view:nth-child(3){
		width: 454rpx;
		margin-left: 11rpx;
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.beizhu view:nth-child(2){
		text-align-last: justify;
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.beizhu view:nth-child(1){
		width: 100rpx;
		text-align-last: justify;
		font-size: 25rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.beizhu{
		display: flex;
		margin-top: 2rpx;
	}
	.tixing view:nth-child(2){
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-left: 10rpx;
		width: 466rpx;
	}
	.tixing view:nth-child(1){
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		width: 100rpx;
	}
	.tixing{
		display: flex;
		margin-top: 10rpx;
	}
	.ceng3{
		padding-left: 50rpx;
		box-sizing: border-box;
	}
	.btn{
		width: 550rpx;
		height: 80rpx;
		background: #30AEFF;
		border-radius: 40rpx;
		font-size: 39rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		margin-top: 26rpx;
	}
	.ceng2{
		border-bottom: 1rpx solid #E6E6E6;
	}
	.hutong{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin: 4rpx 0 20rpx 50rpx;
	}
	.zhxi view:nth-child(2){
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-left: 14rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.zhxi view:nth-child(1){
		width: 32rpx;
		height: 32rpx;
		background: #30AEFF;
		border-radius: 32rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.zhxi{
		display: flex;
		align-items: center;
	}
	.hui{
		width: 36rpx;
		height: 7rpx;
		background: #D5D5D5;
		border-radius: 14rpx;
		margin: auto;
		margin-bottom: 25rpx;
	}
	.neifidbox{
		width: 640rpx;
		margin: auto;
		padding: 31rpx 0 50rpx 0;
		box-sizing: border-box;
	}
	.fidbox{
		width: 710rpx;
		background: #FFFFFF;
		box-shadow: 0px 1rpx 44rpx 0px rgba(0, 0, 0, 0.2);
		border-radius: 28rpx;
		position: fixed;
		bottom: 55rpx;
		left: 20rpx;
	}
</style>