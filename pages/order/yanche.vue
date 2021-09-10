<template>
	<view>
		<view class="itemt">
			<view class="blue"></view>
			<view class="itt">车辆照片</view>
		</view>
		<view class="zhaopian">
			<view class="neizp">
				<view class="item">
					<view class="title">
						请拍摄车辆引擎盖的位置
					</view>
					<image src="../../static/images/zhaobj.png"></image>
				</view>
				<view class="item">
					<view class="title">
						请拍摄车辆翼子板的位置
					</view>
					<image src="../../static/images/zhaobj.png"></image>
				</view>
			</view>
		</view>
		<view class="itemt">
			<view class="blue"></view>
			<view class="itt">司机签字</view>
		</view>
		<view class="yuedu" v-if="!ty || !zy">
			<view>请点击阅读<text @click="toshuo" :style="{'color':(ty?'#52C41A':'')}">验车说明</text>和<text @click="tozhu" :style="{'color':(zy?'#52C41A':'')}">注意事项</text>,</view>
			<view>阅读完成后方可手动签名</view>
		</view>
		<view class="yuedu2" @tap="createCanvas" v-else>
			<view v-if="!imgurl">请司机点击空白位置签字，确认验车</view>
			<image v-else :src="imgurl" mode="aspectFit"></image>
		</view>
		<view class="btn" @click="updata">确认上传</view>
		<view class="signature" v-show="showCanvas">
			<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
			<view class="footer">
				<view class="left" @click="finish">保存</view>
				<view class="right" @click="clear">清除</view>
				<view class="close" @click="close">关闭</view>
			</view>
		</view>
	</view>
</template>

<script>
		var x = 20;
			var y =20;
		export default {
			data() {
				return {
					showCanvas:false,
					ctx:'',         //绘图图像
					points:[],       //路径点集合 
					signature:'',
					imgurl:'',
					ty:'',
					zy:''
				}
			},
			onLoad() {
				
			},
			onShow() {
				if(uni.getStorageSync('yc')){
					this.ty = uni.getStorageSync('yc')
				}
				if(uni.getStorageSync('zy')){
					this.zy = uni.getStorageSync('zy')
				}
			},
			methods: {
				updata(){
					uni.removeStorageSync('yc')
					uni.removeStorageSync('zy')
				},
				toshuo(){
					uni.reLaunch({
						url:'yancheshuoming'
					}) 
				},
				tozhu(){
					uni.reLaunch({
						url:'zhuyishixiang'
					})
				},
				//关闭并清空画布
				close:function(){
					this.showCanvas = false;
					this.clear();
				},
				//创建并显示画布
				createCanvas:function(){
					this.showCanvas = true;
					
					this.ctx = uni.createCanvasContext("mycanvas",this);   //创建绘图对象
					
					//设置画笔样式
					this.ctx.lineWidth = 4;
					this.ctx.lineCap = "round"
					this.ctx.lineJoin = "round"
				},
				//触摸开始，获取到起点
				touchstart:function(e){
					let startX = e.changedTouches[0].x;
					let startY = e.changedTouches[0].y;
					let startPoint = {X:startX,Y:startY};
					this.points.push(startPoint);
					//每次触摸开始，开启新的路径
					this.ctx.beginPath();
				},
				
				//触摸移动，获取到路径点
				touchmove:function(e){
					let moveX = e.changedTouches[0].x;
					let moveY = e.changedTouches[0].y;
					let movePoint = {X:moveX,Y:moveY};
					this.points.push(movePoint);       //存点
					let len = this.points.length;
					if(len>=2){
						this.draw();                   //绘制路径
					}
					
				},
				
				// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
				touchend:function(){                   
					this.points=[];
				},
				
				/* ***********************************************
				#   绘制笔迹
				#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
				#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
				#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
				************************************************ */
				draw: function() {
					let point1 = this.points[0]
					let point2 = this.points[1]
					this.points.shift()
					this.ctx.moveTo(point1.X, point1.Y)
					this.ctx.lineTo(point2.X, point2.Y)
					this.ctx.stroke()
					this.ctx.draw(true)
				},
				
				//清空画布
				clear:function(){
					let that = this;
					uni.getSystemInfo({
						success: function(res) {
							let canvasw = res.windowWidth;
							let canvash = res.windowHeight;
							that.ctx.clearRect(0, 0, canvasw, canvash);
							that.ctx.draw(true);
						},
					})
				},
				//完成绘画并保存到本地
				finish:function(){
					let that = this;
					uni.canvasToTempFilePath({
					  canvasId: 'mycanvas',
					  success: function(res) {
						  console.log(res)
							that.imgurl = res.tempFilePath;
							that.clear();
							that.showCanvas = false;
						//上传到服务器
						// that.api.uploadFile({
						// 	url: 'user/upload/one',
						// 	filePath: res.tempFilePath,
						// 	name: 'file',
						// 	success: (uploadFileRes) => {
						// 		console.log(uploadFileRes)
						// 		that.signature = uploadFileRes.data.url;
						// 		that.clear();
						// 		that.showCanvas = false;
						// 	}
						// })
						//保存到本地
						/* 
						
						let path = res.tempFilePath;
						uni.saveImageToPhotosAlbum({
							filePath:path,
						}) */
					  } 
					})
				},
			}
		}
</script>

<style>
	.yuedu2 image{
		margin: auto;
	}
	.yuedu2 view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		margin: 0rpx 0 0 20rpx;
		padding: 26rpx 0 120rpx 0;
	}
	.signature {position: fixed;top: 10px;left: 2%;z-index: 999;width:96%;}
		.container {
			padding: 20rpx 0 120rpx 0;
			box-sizing: border-box;
		}
		.title{
			height:50upx;
			line-height: 50upx;
			font-size: 16px;
		}
		.mycanvas{
			width: 100%;
			height: calc(100vh - 200upx);
			background-color: #ECECEC;
		}
		.footer{
			font-size: 14px;
			height: 150upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.left,.right,.close{
			line-height: 100upx;
			height: 100upx;
			width: 220upx;
			text-align: center;
			font-weight: bold;
			color: white;
			border-radius: 5upx;
		}
		.left{
			background: #007AFF;
		}
		.right{
			background:orange;
		}
		.close {
			background:#A3A3A3;
		}
	.yuedu text{
		color: #40A9FF;
	}
	.yuedu view{
		text-align: center;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #666666;
	}
	.btn{
		width: 680rpx;
		height: 76rpx;
		background: #40A9FF;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 23rpx;
		margin-bottom: 72rpx;
	}
	.yuedu{
		width: 720rpx;
		height: 179rpx;
		background: #DBDBDB;
		border-radius: 14rpx;
		margin: auto;
		padding-top: 45rpx;
		box-sizing: border-box;
		margin-top: 16rpx;
	}
	.yuedu2{
		width: 720rpx;
		/* height: 179rpx; */
		background: #fff;
		border-radius: 14rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 16rpx;
	}
	.item{
		padding-bottom: 20rpx;
	}
	.title{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin-bottom: 10rpx;
	}
	.neizp{
		width: 680rpx;
		margin: auto;
	}
	.zhaopian{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		padding-top: 14rpx;
		margin-top: 16rpx;
		box-sizing: border-box;
	}
	.itt{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin-left: 9rpx;
	}
	.blue{
		width: 6rpx;
		height: 28rpx;
		background: #40A9FF;
	}
	.itemt{
		width: 720rpx;
		margin: auto;
		display: flex;
		align-items: center;
		padding-top: 20rpx;
	}
</style>
