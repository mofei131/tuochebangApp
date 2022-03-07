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
						请拍摄车辆左后45度照片
					</view>
					<image :src="photo1 == ''?'../../static/images/zhaobj.png':photo1" @click="chooseImage(1)"></image>
				</view>
				<view class="item">
					<view class="title">
						请拍摄车辆右后45度照片
					</view>
					<image :src="photo2 == ''?'../../static/images/zhaobj.png':photo2" @click="chooseImage(2)"></image>
				</view>
				<view class="item">
					<view class="title">
						请拍摄车辆左前45度照片
					</view>
					<image :src="photo3 == ''?'../../static/images/zhaobj.png':photo3" @click="chooseImage(3)"></image>
				</view>
				<view class="item">
					<view class="title">
						请拍摄车辆右前45度照片
					</view>
					<image :src="photo4 == ''?'../../static/images/zhaobj.png':photo4" @click="chooseImage(4)"></image>
				</view>
				<view class="item">
					<view class="title">
						请拍摄车辆铭牌照片
					</view>
					<image :src="photo5 == ''?'../../static/images/zhaobj.png':photo5" @click="chooseImage(5)"></image>
				</view>
				<view class="item">
					<view class="title">
						请拍摄车辆内饰照片
					</view>
					<image :src="photo6 == ''?'../../static/images/zhaobj.png':photo6" @click="chooseImage(6)"></image>
				</view>
				<view class="item">
					<view class="title">
						请拍摄车辆仪表盘照片
					</view>
					<image :src="photo7 == ''?'../../static/images/zhaobj.png':photo7" @click="chooseImage(7)"></image>
				</view>
				<view class="item">
					<view class="title">
						请拍摄车辆车架号照片
					</view>
					<image :src="photo8 == ''?'../../static/images/zhaobj.png':photo8" @click="chooseImage(8)"></image>
				</view>
			</view>
		</view>
		<view class="itemt">
			<view class="blue"></view>
			<view class="itt">司机签字</view>
		</view>
		<view v-if="status == 0">
		<view class="yuedu" v-if="!ty || !zy">
			<view>请点击阅读<text @click="toshuo" :style="{'color':(ty?'#52C41A':'')}">验车说明</text>和<text @click="tozhu" :style="{'color':(zy?'#52C41A':'')}">注意事项</text>,</view>
			<view>阅读完成后方可手动签名</view>
		</view>
		<view class="yuedu2" @tap="createCanvas" v-else>
			<view v-if="!imgurl">请司机点击空白位置签字，确认验车</view>
			<image v-else :src="imgurl" mode="aspectFit"></image>
		</view>
		</view>
		<view v-else>
			<view class="yuedu2" @tap="createCanvas">
				<image :src="sign" mode="aspectFit"></image>
			</view>
		</view>
		<view v-if="status == -1">
		<view class="itemt">
			<view class="blue"></view>
			<view class="itt">驳回理由</view>
		</view>
		<view class="yuedu2">
			<view class="liyou">{{reason}}</view>
		</view>
		</view>
		<view class="btn" v-if="status == 1">审核中</view>
		<view class="btn" v-if="status == -1" @click="updata()">被驳回,再次上传</view>
		<view class="btn" v-if="status == 0" @click="updata()">确认上传</view>
		<view class="signature" v-show="showCanvas" :style="heightNum">
			<view style="position: absolute;z-index: 0;width: 100%;background-color: #fff;" :style="heightNum"></view>
			<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" ></canvas>
			<view class="footer"  style="position: relative;z-index: 9999;">
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
					zy:'',
					photo1:'',
					photo2:'',
					photo3:'',
					photo4:'',
					photo5:'',
					photo6:'',
					photo7:'',
					photo8:'',
					sign:'',
					orderid:'',
					status:0,
					reason:'',
					heightNum:''
				}
			},
			onLoad(p) {
				this.orderid = p.id
				let that = this
				// if(uni.getStorageSync('yanche')){
				// 	console.log(uni.getStorageSync('yanche'))
				// 	this.photo1 = uni.getStorageSync('yanche').photo1
				// 	this.photo2 = uni.getStorageSync('yanche').photo2
				// 	this.photo3 = uni.getStorageSync('yanche').photo3
				// 	this.photo4 = uni.getStorageSync('yanche').photo4
				// 	this.photo5 = uni.getStorageSync('yanche').photo5
				// 	this.photo6 = uni.getStorageSync('yanche').photo6
				// 	this.photo7 = uni.getStorageSync('yanche').photo7
				// 	this.photo8 = uni.getStorageSync('yanche').photo8
				// 	this.orderid = uni.getStorageSync('yanche').orderid
				// }
				this.http.ajax({
					url: 'driverOrder/verifyDetail',
					method: 'GET',
					data: {
						order_id:this.orderid
					},
					success: function(res) {
						console.log(res)
						if(res.code == 200 && res.data){
							that.photo1 = res.data.photo1
							that.photo2 = res.data.photo2
							that.photo3 = res.data.photo3
							that.photo4 = res.data.photo4
							that.photo5 = res.data.photo5
							that.photo6 = res.data.photo6
							that.photo7 = res.data.photo7
							that.photo8 = res.data.photo8
							that.sign = res.data.sign
							that.status = res.data.status
							that.reason = res.data.reason
						}else if(res.code == -1 && res.data){
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
					}
				});
			},
			onShow() {
				let that = this
				if(uni.getStorageSync('yc')){
					this.ty = uni.getStorageSync('yc')
				}
				if(uni.getStorageSync('zy')){
					this.zy = uni.getStorageSync('zy')
				}
				uni.getSystemInfo({
					success: function (res) {
						that.heightNum = 'height:'+res.windowHeight+'px'
					}
				})
			},
			methods: {
				chooseImage(e) {
					if(e == 5){
						if(!this.photo1 || !this.photo2 || !this.photo3 || !this.photo4){
							uni.showToast({
								title:'请拍摄前四个位置',
								icon:'none'
							})
							return
						}
					}
					let that = this
								uni.chooseImage({
									count: 1, //默认9
									sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
									sourceType: ['camera'], //从相册选择、摄像头
									success: function(res) {
										uni.compressImage({
											src: res.tempFilePaths[0],  
											quality: 50,  
											success: res => {
												uni.showLoading({title: '上传中'});
												console.log("压缩图片")
												console.log(res.tempFilePath)  
												if(e == 1){
													uni.uploadFile({
														url:'https://trailer.boyaokj.cn/api/file/upload',
														filePath: res.tempFilePath,
														name: 'file',
														success(res) {
															that.photo1 = JSON.parse(res.data).data.url
															uni.hideLoading()
														}
													})
												}else if(e == 2){
													uni.uploadFile({
														url:'https://trailer.boyaokj.cn/api/file/upload',
														filePath: res.tempFilePath,
														name: 'file',
														success(res) {
															that.photo2 = JSON.parse(res.data).data.url
															uni.hideLoading()
														}
													})
												}else if(e == 3){
													uni.uploadFile({
														url:'https://trailer.boyaokj.cn/api/file/upload',
														filePath: res.tempFilePath,
														name: 'file',
														success(res) {
															that.photo3 = JSON.parse(res.data).data.url
															uni.hideLoading()
														}
													})
												}else if(e == 4){
													uni.uploadFile({
														url:'https://trailer.boyaokj.cn/api/file/upload',
														filePath: res.tempFilePath,
														name: 'file',
														success(res) {
															that.photo4 = JSON.parse(res.data).data.url
															uni.hideLoading()
														}
													})
												}else if(e == 5){
													uni.uploadFile({
														url:'https://trailer.boyaokj.cn/api/file/upload',
														filePath: res.tempFilePath,
														name: 'file',
														success(res) {
															that.photo5 = JSON.parse(res.data).data.url
															uni.hideLoading()
														}
													})
												}else if(e == 6){
													uni.uploadFile({
														url:'https://trailer.boyaokj.cn/api/file/upload',
														filePath: res.tempFilePath,
														name: 'file',
														success(res) {
															that.photo6 = JSON.parse(res.data).data.url
															uni.hideLoading()
														}
													})
												}else if(e == 7){
													uni.uploadFile({
														url:'https://trailer.boyaokj.cn/api/file/upload',
														filePath: res.tempFilePath,
														name: 'file',
														success(res) {
															that.photo7 = JSON.parse(res.data).data.url
															uni.hideLoading()
														}
													})
												}else if(e == 8){
													uni.uploadFile({
														url:'https://trailer.boyaokj.cn/api/file/upload',
														filePath: res.tempFilePath,
														name: 'file',
														success(res) {
															that.photo8 = JSON.parse(res.data).data.url
															uni.hideLoading()
															// uni.setStorage({
															// 	key:'yanche',
															// 	data:{
															// 		photo1:that.photo1,
															// 		photo2:that.photo2,
															// 		photo3:that.photo3,
															// 		photo4:that.photo4,
															// 		photo5:that.photo5,
															// 		photo6:that.photo6,
															// 		photo7:that.photo7,
															// 		photo8:that.photo8,
															// 		orderid:that.orderid
															// 	}
															// })
														}
													})
												}
											}  
										})
										// console.log(res.tempFilePaths[0])
										// that.photo1 = res.tempFilePaths[0]
										// if(e == 1){
										// 	uni.uploadFile({
										// 		url:'https://trailer.boyaokj.cn/api/file/upload',
										// 		filePath: res.tempFilePaths[0],
										// 		name: 'file',
										// 		success(res) {
										// 			that.zhiname = JSON.parse(res.data).data.url
										// 		}
										// 	})
										// }else if(e == 2){
										// 	uni.uploadFile({
										// 		url:'https://trailer.boyaokj.cn/api/file/upload',
										// 		filePath: res.tempFilePaths[0],
										// 		name: 'file',
										// 		success(res) {
										// 			that.zhiyear = JSON.parse(res.data).data.url
										// 		}
										// 	})
										// }else if(e == 3){
										// 	uni.uploadFile({
										// 		url:'https://trailer.boyaokj.cn/api/file/upload',
										// 		filePath: res.tempFilePaths[0],
										// 		name: 'file',
										// 		success(res) {
										// 			that.cfcong = JSON.parse(res.data).data.url
										// 		}
										// 	})
										// }
									},
								});
								if(that.photo1&&that.photo2&&that.photo3&&that.photo4&&that.photo5&&that.photo6&&that.photo7&&that.photo8){
									console.log('true')
								}else{
									false
								}
							},
				updata(){
					// if (!this.unit) {
					// 	uni.showToast({
					// 		title: '请输入您的归属公司',
					// 		icon: 'none',
					// 	})
					// 	return
					// }
					// if (!this.photo1) {
					// 	uni.showToast({
					// 		title: '请上传公司营业执照',
					// 		icon: 'none',
					// 	})
					// 	return
					// }
					// if (!this.photo2) {
					// 	uni.showToast({
					// 		title: '请上传身份证人相面',
					// 		icon: 'none',
					// 	})
					// 	return
					// }
					// if (!this.photo3) {
					// 	uni.showToast({
					// 		title: '请上传身份证国徽面',
					// 		icon: 'none',
					// 	})
					// 	return
					// }
					// if (!this.photo4) {
					// 	uni.showToast({
					// 		title: '请上传驾驶证照片主页',
					// 		icon: 'none',
					// 	})
					// 	return
					// }
					// if (!this.photo5) {
					// 	uni.showToast({
					// 		title: '请上传驾驶证照片副页',
					// 		icon: 'none',
					// 	})
					// 	return
					// }
					if (!this.sign) {
						uni.showToast({
							title: '请签名',
							icon: 'none',
						})
						return
					}
					uni.removeStorageSync('yc')
					uni.removeStorageSync('zy')
					this.http.ajax({
						url: 'driverOrder/verifyOrder',
						method: 'POST',
						data: {
							order_id:this.orderid,
							photo1:this.photo1,
							photo2:this.photo2,
							photo3:this.photo3,
							photo4:this.photo4,
							photo5:this.photo5,
							photo6:this.photo6,
							photo7:this.photo7,
							photo8:this.photo8,
							sign:this.sign
						},
						success: function(res) {
							if(res.code == 200){
								// uni.removeStorageSync('yanche')
								uni.showToast({
										title:'上传成功',
										icon:'none',
										duration:1000
									})
									// uni.removeStorageSync('yanche')
									setTimeout(function() {
									uni.reLaunch({
										url:'index'
									})
									},1000)
							}else if(res.code == -1){
								uni.showToast({
									title:res.message,
									icon:'none'
								})
							}else{
								uni.showToast({
									title:'上传失败',
									icon:'none'
								})
							}
						}
					});
				},
				toshuo(){
					uni.navigateTo({
						url:'yancheshuoming'
					}) 
				},
				tozhu(){
					uni.navigateTo({
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
						this.draw();                  //绘制路径
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
						  console.log(res.tempFilePath)
							that.imgurl = res.tempFilePath;
							that.clear();
							that.showCanvas = false;
							uni.uploadFile({
								url:'https://trailer.boyaokj.cn/api/file/upload',
								filePath: res.tempFilePath,
								name: 'file',
								success(res) {
									that.sign = JSON.parse(res.data).data.url
								}
							})
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
	.liyou{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333!important;
		margin: 0rpx 0 0 20rpx;
		padding: 26rpx 0 120rpx 0;
	}
	.yuedu2 view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		margin: 0rpx 0 0 20rpx;
		padding: 26rpx 0 120rpx 0;
	}
	.signature {position: fixed;top: 0px;left: 0;z-index: 999;width:100%;}
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
