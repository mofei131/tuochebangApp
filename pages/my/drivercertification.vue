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
			  <input lines="1" class="nameinput" type="number" placeholder="请输入姓名"
			  	placeholder-style="color:#C1C2C3;" />
	        </view>
	        <view class="xiantiao">
	          <view class="outer1"></view>
	        </view>
	        <view class="group4">
	          <text lines="1" class="phone">联系电话：</text>
	          <input lines="1" class="phoneinput" type="number" maxlength="11" placeholder="请输入电话"
	          	placeholder-style="color:#C1C2C3;" />
	        </view>
	        <view class="xiantiao">
	          <view class="outer1"></view>
	        </view>
	        <view class="group7">
	          <text lines="1" class="txt3">身份证号：</text>
	          <input lines="1" class="txt4" type="number" maxlength="11" placeholder="请输入身份证号码"
	          	placeholder-style="color:#C1C2C3;" />
	        </view>
	        <view class="xiantiao">
	          <view class="outer1"></view>
	        </view>
	        <view class="group10">
	          <text lines="1" class="word8">归属公司：</text>
	          <input lines="1" class="info1" type="number" maxlength="11" placeholder="请输入归属公司"
	          	placeholder-style="color:#C1C2C3;" />
	        </view>
	        <view class="xiantiao">
	          <view class="outer1"></view>
	        </view>
	      </view>
	    </view>
		<view class="picture">
			<view class="image">
				<view class="word8">请上传公司营业执照</view>
				<image src="../../static/images/renzhengpic.png"></image>
			</view>
			<view class="image">
				<view class="word8">请上传身份证人像面</view>
				<image src="../../static/images/idCardfront.png"></image>
			</view>
			<view class="image">
				<view class="word8">请上传身份证国徽面</view>
				<image src="../../static/images/idCard.png"></image>
			</view>
			<view class="image">
				<view class="word8">请上传驾驶证照片主页</view>
				<image src="../../static/images/renzhengpic.png"></image>
			</view>
			<view class="image">
				<view class="word8">请上传驾驶证照片副业</view>
				<image src="../../static/images/renzhengpic.png"></image>
			</view>
		</view>
	    <view class="box12">
	      <view class="layer8">
	        <text lines="1" class="word15">下一步</text>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script>
</script>

<style>
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
	  color: rgba(193,194,195,1);
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
	  color: rgba(193,194,195,1);
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
	  width: 84rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(255,255,255,1);
	  font-size: 28rpx;
	  font-family: Helvetica;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: center;
	}
	.image{
		margin: auto;
		margin-top: 10rpx;
		background-color: rgba(255,255,255,1);
	}
</style>
