<template>
	<view class="tanchuang" v-if="show">
			<view class="juli">提示：有新的订单</view>
			<div class="qd">
				<button class="qiangdan" @click="qiang">去抢单(<span>{{time}}</span>s)</button>
			</div>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false,
				time:10,
				timer:null,
			}
		},
		beforeMount(){
			console.log('订单')
			console.log(uni.getStorageSync('userInfo').order_notice)
			let that = this
				console.log('通过')
			uni.connectSocket({
			    url: 'ws://39.107.141.58:4348',
			});
			uni.onSocketOpen(function (res) {
			  console.log('WebSocket连接已打开！');
				uni.sendSocketMessage({
					data: JSON.stringify({
							"action": "bind",
							"data": {
								"source_id": uni.getStorageSync('userInfo').id,
							}
						}),
					success(res) {
						console.log("绑定成功")
					}
				});
			});
			
				uni.onSocketError(function (res) {
				  console.log('WebSocket连接打开失败，请检查！');
				});
				uni.onSocketMessage(function (res) {
				  console.log('收到服务器内容：' + res.data);
					if(uni.getStorageSync('userInfo').order_notice == 1){
					if(JSON.parse(res.data).data.action){
						 that.timer = setInterval(() => {
						    that.time--
								if(that.time == 0){
									that.show = false 
									clearInterval(that.timer);
									that.time = 10
								}
						},1000)
						that.show = true
						if(that.show){
							const innerAudioContext = uni.createInnerAudioContext();
							innerAudioContext.src = 'http://hlstore.yimetal.cn/2021/tuochebang/aud4.mp3';
							innerAudioContext.play();
						}
					}
					}
				});
			uni.onSocketClose(function (res) {
			  console.log('WebSocket 已关闭！');
			});
		},
		methods:{
			qiang(){
				uni.switchTab({
					url:'../index/index'
				})
				this.show = false
				clearInterval(that.timer);
			}
		}
	}
	
</script>

<style>
	.tanchuang{
		float: left;
		width: 100%;
		height:80rpx;
		line-height: 85rpx;
		background-color: rgba(0,0,0,0.5);
		color: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
	}
	.juli{
		margin-left: 30rpx;
		font-size: 24rpx;
		width: 500rpx;
		float: left;
	}
	.qd{
		float: left;
		line-height: 80rpx;
		width: 200rpx;
		font-size: 24rpx;
	}
	.qd{
		
	}
	.qiangdan{
		background-color: rgba(48,174,255,1);
		font-size: 24rpx;
		height: 60rpx;
		margin: 10rpx;
		border-radius: 23rpx;
		color: #FFFFFF;
	}
</style>
