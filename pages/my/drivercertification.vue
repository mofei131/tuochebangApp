<template>
	<view class="page">
	  <view class="mode">
	    <view class="personal">
	      <view class="fenge"></view>
	      <text lines="1" class="txt2">第一步：个人资料</text>
	    </view>
	    <view class="info">
	      <view class="infomation">
	        <view class="name">
	          <text lines="1" decode="true" class="nameword">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</text>
			  <input lines="1" class="nameinput" v-model="name" type="text" placeholder="请输入姓名"
			  	placeholder-style="color:#C1C2C3;" />
	        </view>
	        <view class="xiantiao">
	          <view class="outer1"></view>
	        </view>
	        <view class="group4">
	          <text lines="1" class="phone">联系电话：</text>
	          <input lines="1" class="phoneinput" v-model="phone" type="number" maxlength="11" placeholder="请输入电话"
	          	placeholder-style="color:#C1C2C3;" />
	        </view>
	        <view class="xiantiao">
	          <view class="outer1"></view>
	        </view>
	        <view class="group7">
	          <text lines="1" class="txt3">身份证号：</text>
	          <input lines="1" class="txt4" v-model="card" type="text" maxlength="18" placeholder="请输入身份证号码"
	          	placeholder-style="color:#C1C2C3;" />
	        </view>
	        <view class="xiantiao">
	          <view class="outer1"></view>
	        </view>
						<view class="intitem">
							<view class="word8">认证分类：</view>
							<view class="danxuan">
								<view class="danxuanleft" @tap="dian1()">
									<view>公司司机认证</view>
									<image :src="dian == 1?'../../static/images/zhong.png':'../../static/images/buzhong.png'" ></image>
								</view>
								<view class="danxuanleft" @tap="dian2()">
									<view>个人车主认证</view>
									<image :src="dian == 2?'../../static/images/zhong.png':'../../static/images/buzhong.png'" ></image>
								</view>
							</view>
						</view>
						<view v-if="dian == 1">
						<view class="xiantiao">
						  <view class="outer1"></view>
						</view>
	        <view class="group10">
	          <text lines="1" class="word8">归属公司：</text>
	          <input lines="1" class="info1" v-model="unit" type="text" maxlength="11" placeholder="请输入归属公司"
	          	placeholder-style="color:#C1C2C3;" />
	        </view>
					</view>
					<view class="xiantiao">
					  <view class="outer1"></view>
					</view>
	      </view>
	    </view>
		<view class="picture">
			<view class="image" v-if="dian == 1">
				<view class="word8">请上传公司营业执照</view>
				<image :src="photo1 == ''?'../../static/images/renzhengpic.png':photo1" @click="chooseImage(1)"></image>
			</view>
			<view class="image">
				<view class="word8">请上传身份证人像面</view>
				<image :src="photo2 == ''?'../../static/images/idCardfront.png':photo2" @click="chooseImage(2)"></image>
			</view>
			<view class="image">
				<view class="word8">请上传身份证国徽面</view>
				<image :src="photo3 == ''?'../../static/images/idCard.png':photo3" @click="chooseImage(3)"></image>
			</view>
			<view class="image">
				<view class="word8">请上传驾驶证照片主页</view>
				<image :src="photo4 == ''?'../../static/images/renzhengpic.png':photo4" @click="chooseImage(4)"></image>
			</view>
			<view class="image">
				<view class="word8">请上传驾驶证照片副页</view>
				<image :src="photo5 == ''?'../../static/images/renzhengpic.png':photo5" @click="chooseImage(5)"></image>
			</view>
			<view class="bohui">
				<view class="phone">驳回理由:</view>
				<view class="bo">{{reason}}</view>
			</view>
		</view>
	    <view class="box12">
	      <view class="layer8" v-if="status == 0">
					<text lines="1" class="word15"  @click="next()">下一步</text>
	      </view>
				<view class="layer8" v-if="status == 2">
				  <text lines="1" class="word15" @click="updata()">更新司机信息</text>
				</view>
				<view class="layer8" v-if="status == 1">
				  <text lines="1" class="word15">审核中</text>
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
				name:'',
				phone:'',
				card:'',
				unit:'',
				photo1:'',
				photo2:'',
				photo3:'',
				photo4:'',
				photo5:'',
				dian:1,
				reason:'',
				status:0,
			}
		},
		onLoad() {
			let that = this
			this.http.ajax({
				url: 'driverAuth/driverInfo',
				method: 'GET',
				data: {
					user_id:uni.getStorageSync('userInfo').id
				},
				success(res) {
					console.log(res.data)
					that.name = res.data.name
					that.phone = res.data.mobile
					that.card = res.data.idcard
					that.dian = res.data.auth_type
					that.unit = res.data.company
					that.photo1 = res.data.business_lince
					that.photo2 = res.data.front_id_card
					that.photo3 = res.data.back_id_card
					that.photo4 = res.data.driver_card_frontpage
					that.photo5 = res.data.driver_card_homepage
					that.reason = res.data.reason
					that.status = res.data.status
				}
			});
		},
		onShow() {
			
		},
		methods:{
			updata(){
				if (!this.name) {
					uni.showToast({
						title: '请输入您的姓名',
						icon: 'none',
					})
					return
				}
				if (!this.phone) {
					uni.showToast({
						title: '请输入您的电话',
						icon: 'none',
					})
					return
				}
				if (!this.card) {
					uni.showToast({
						title: '请输入您的身份证号码',
						icon: 'none',
					})
					return
				}
				if (!this.unit && this.dian == 1) {
					uni.showToast({
						title: '请输入您的归属公司',
						icon: 'none',
					})
					return
				}
				if (!this.photo1 && this.dian == 1) {
					uni.showToast({
						title: '请上传公司营业执照',
						icon: 'none',
					})
					return
				}
				if (!this.photo2) {
					uni.showToast({
						title: '请上传身份证人相面',
						icon: 'none',
					})
					return
				}
				if (!this.photo3) {
					uni.showToast({
						title: '请上传身份证国徽面',
						icon: 'none',
					})
					return
				}
				if (!this.photo4) {
					uni.showToast({
						title: '请上传驾驶证照片主页',
						icon: 'none',
					})
					return
				}
				if (!this.photo5) {
					uni.showToast({
						title: '请上传驾驶证照片副页',
						icon: 'none',
					})
					return
				}
				this.http.ajax({
					url: 'driverAuth/updateDriverInfo',
					method: 'POST',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						name:this.name,
						mobile:this.phone,
						idcard:this.card,
						company:this.unit,
						business_lince:this.photo1,
						front_id_card:this.photo2,
						back_id_card:this.photo3,
						driver_card_homepage:this.photo4,
						driver_card_frontpage:this.photo5,
						auth_type:this.dian
					},
					success(res) {
						if(res.code == 200){
							uni.showToast({
								title:'提交成功',
								icon:'none',
								duration:1000
							})
							setTimeout(function() {
							uni.switchTab({
								url:'./index'
							})
							},1000)
						}else if(res.code == -1){
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}else{
							uni.showToast({
								title:'提交失败',
								icon:'none'
							})
						}
					}
				});
			},
			dian1(){
				this.dian = 1
			},
			dian2(){
				this.dian = 2
			},
			chooseImage(e) {
				let that = this
							uni.chooseImage({
								count: 1, //默认9
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['camera','album'], //从相册选择、摄像头
								success: function(res) {
									uni.compressImage({
										src: res.tempFilePaths[0],  
										quality: 50,  
										success: res => {
											console.log("压缩图片")
											console.log(res.tempFilePath)  
											if(e == 1){
												uni.uploadFile({
													url:'https://trailer.boyaokj.cn/api/file/upload',
													filePath: res.tempFilePath,
													name: 'file',
													success(res) {
														that.photo1 = JSON.parse(res.data).data.url
													}
												})
											}else if(e == 2){
												uni.uploadFile({
													url:'https://trailer.boyaokj.cn/api/file/upload',
													filePath: res.tempFilePath,
													name: 'file',
													success(res) {
														that.photo2 = JSON.parse(res.data).data.url
													}
												})
											}else if(e == 3){
												uni.uploadFile({
													url:'https://trailer.boyaokj.cn/api/file/upload',
													filePath: res.tempFilePath,
													name: 'file',
													success(res) {
														that.photo3 = JSON.parse(res.data).data.url
													}
												})
											}else if(e == 4){
												uni.uploadFile({
													url:'https://trailer.boyaokj.cn/api/file/upload',
													filePath: res.tempFilePath,
													name: 'file',
													success(res) {
														that.photo4 = JSON.parse(res.data).data.url
													}
												})
											}else if(e == 5){
												uni.uploadFile({
													url:'https://trailer.boyaokj.cn/api/file/upload',
													filePath: res.tempFilePath,
													name: 'file',
													success(res) {
														that.photo5 = JSON.parse(res.data).data.url
													}
												})
											}
										}  
									})
								},
							});
				},
				next(){
					if (!this.name) {
						uni.showToast({
							title: '请输入您的姓名',
							icon: 'none',
						})
						return
					}
					if (!this.phone) {
						uni.showToast({
							title: '请输入您的电话',
							icon: 'none',
						})
						return
					}
					if (!this.card) {
						uni.showToast({
							title: '请输入您的身份证号码',
							icon: 'none',
						})
						return
					}
					if (!this.unit && this.dian == 1) {
						uni.showToast({
							title: '请输入您的归属公司',
							icon: 'none',
						})
						return
					}
					if (!this.photo1 && this.dian == 1) {
						uni.showToast({
							title: '请上传公司营业执照',
							icon: 'none',
						})
						return
					}
					if (!this.photo2) {
						uni.showToast({
							title: '请上传身份证人相面',
							icon: 'none',
						})
						return
					}
					if (!this.photo3) {
						uni.showToast({
							title: '请上传身份证国徽面',
							icon: 'none',
						})
						return
					}
					if (!this.photo4) {
						uni.showToast({
							title: '请上传驾驶证照片主页',
							icon: 'none',
						})
						return
					}
					if (!this.photo5) {
						uni.showToast({
							title: '请上传驾驶证照片副页',
							icon: 'none',
						})
						return
					}
					uni.setStorage({
						key:'zancun',
						data:{
							name:this.name,
							phone:this.phone,
							card:this.card,
							unit:this.unit,
							photo1:this.photo1,
							photo2:this.photo2,
							photo3:this.photo3,
							photo4:this.photo4,
							photo5:this.photo5,
							auth_type:this.dian
						}
					})
					uni.navigateTo({
						url:'carmanage'
					})
				},
			}
	}
</script>

<style>
	.bo{
		width: 680rpx;
		height: 200rpx;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5D6168;
		background-color: rgba(244,247,247,1);
		margin-bottom: 20rpx;
	}
	.intitem{
		display: flex;
		align-items: center;
		margin-top: 35rpx;
	}
	.danxuan{
		display: flex;
		align-items: center;
		width: 480rpx;
		justify-content: space-between;
		margin-left: 40rpx;
	}
	.danxuanleft view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5D6168;
	}
	.danxuanleft{
		display: flex;
		align-items: center;
	}
	.danxuanleft image{
		width: 40rpx;
		height: 40rpx;
	}
	.page {
	  position: relative;
	  width: 750rpx;
	  background-color: rgba(244,247,247,1);
	  overflow: hidden;
	  display: flex;
	  flex-direction: column;
	}
	.picture{
		border-radius: 14rpx;
		background-color: rgba(255,255,255,1);
		align-self: center;
		margin-top: 16rpx;
		width: 720rpx;
		justify-content: flex-start;
		padding-top: 1rpx;
		align-items: center;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.mode {
	  width: 750rpx;
	  display: flex;
	  flex-direction: column;
	}
	.box1 {
	  height: 126rpx;
	  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng077c3685ed8b5ef680e7ae7a7813e9902c104fc32cb8f7e10e54d9e76af2f934) 100% no-repeat;
	  width: 750rpx;
	  display: flex;
	  flex-direction: column;
	}
	.main1 {
	  width: 727rpx;
	  height: 30rpx;
	  flex-direction: row;
	  display: flex;
	  margin: 7rpx 0 0 12rpx;
	}
	.personal {
	  width: 239rpx;
	  height: 40rpx;
	  flex-direction: row;
	  display: flex;
	  justify-content: space-between;
	  margin: 20rpx 0 0 35rpx;
	}
	.fenge {
	  width: 6rpx;
	  height: 28rpx;
	  background-color: rgba(64,169,255,1);
	  margin-top: 6rpx;
	  display: flex;
	  flex-direction: column;
	}
	.txt2 {
	  width: 224rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(81,86,93,1);
	  font-size: 28rpx;
	  font-family: Helvetica;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}
	.info {
	  border-radius: 14rpx;
	  background-color: rgba(255,255,255,1);
	  align-self: center;
	  margin-top: 16rpx;
	  width: 720rpx;
	  justify-content: flex-start;
	  padding-top: 1rpx;
	  align-items: center;
	  position: relative;
	  display: flex;
	  flex-direction: column;
	}
	.infomation {
	  width: 681rpx;
	  display: flex;
	  flex-direction: column;
	}
	.name {
	  width: 310rpx;
	  height: 40rpx;
	  margin-top: 32rpx;
	  flex-direction: row;
	  display: flex;
	  justify-content: space-between;
	}
	.nameword {
	  width: 140rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(81,86,93,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}
	.nameinput {
	  width: 140rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(93,97,104,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}
	.xiantiao {
	  height: 2rpx;
	  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6783a4fecbdc9024e87783aec614554cf2bf72fef0eaeb803526167a8d4d61b8) 0rpx 0rpx no-repeat;
	  background-size: 681rpx 2rpx;
	  align-self: flex-end;
	  margin-top: 33rpx;
	  width: 680rpx;
	  display: flex;
	  flex-direction: column;
	}
	.outer1 {
	  width: 680rpx;
	  height: 2rpx;
	  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng4169c3e40f037912e41a73e581829162b7aaf7838f892c0bce99d11919ed7001) 0rpx -1rpx no-repeat;
	  background-size: 681rpx 2rpx;
	  display: flex;
	  flex-direction: column;
	}
	.group4 {
	  width: 338rpx;
	  height: 40rpx;
	  margin-top: 32rpx;
	  flex-direction: row;
	  display: flex;
	  justify-content: space-between;
	}
	.phone {
	  width: 140rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(81,86,93,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}
	.phoneinput {
	  width: 168rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(93,97,104,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}
	.group5 {
	  width: 680rpx;
	  height: 2rpx;
	  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng4efb7f7d753c3d8caa1bed350d0ecb5546bb65b29358bd71baf93e5a972182cc) 0rpx 0rpx no-repeat;
	  background-size: 681rpx 1rpx;
	  align-self: flex-end;
	  margin-top: 33rpx;
	  display: flex;
	  flex-direction: column;
	}
	.group6 {
	  width: 680rpx;
	  height: 2rpx;
	  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng4169c3e40f037912e41a73e581829162b7aaf7838f892c0bce99d11919ed7001) 0rpx -1rpx no-repeat;
	  background-size: 681rpx 2rpx;
	  align-self: flex-end;
	  display: flex;
	  flex-direction: column;
	}
	.group7 {
	  width: 473rpx;
	  height: 40rpx;
	  margin-top: 32rpx;
	  flex-direction: row;
	  display: flex;
	  justify-content: space-between;
	}
	.txt3 {
	  width: 140rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(81,86,93,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}
	.txt4 {
	  width: 303rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(93,97,104,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}
	.group10 {
	  width: 366rpx;
	  height: 40rpx;
	  margin-top: 32rpx;
	  flex-direction: row;
	  display: flex;
	  justify-content: space-between;
	}
	.word8 {
	  width: 140rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(81,86,93,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}
	.info1 {
	  width: 196rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(93,97,104,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}
	.box12 {
	  height: 151rpx;
	  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng58fec3515ff824f7a30229cb3b276ae746ed06c06571d46211a2f5b014305de6) 100% no-repeat;
	  margin-top: 30rpx;
	  width: 750rpx;
	  justify-content: flex-start;
	  padding-top: 3rpx;
	  align-items: center;
	  display: flex;
	  flex-direction: column;
	}
	.layer8 {
	  height: 76rpx;
	  border-radius: 38rpx;
	  background-color: rgba(64,169,255,1);
	  width: 680rpx;
	  justify-content: center;
	  align-items: center;
	  display: flex;
	  flex-direction: column;
	}
	.word15 {
	  width: 680rpx;
	  overflow-wrap: break-word;
	  color: rgba(255,255,255,1);
	  font-size: 28rpx;
	  font-family: Helvetica;
	  display: flex;
		align-items: center;
		justify-content: center;
	}
	.image{
		margin: auto;
		margin-top: 10rpx;
		background-color: rgba(255,255,255,1);
	}
</style>
