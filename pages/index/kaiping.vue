<template>
	<view>
		<!-- <image class="zhanp" :style="heightNum" src="http://hlstore.yimetal.cn/2021/tuochebang/advertise.png"></image> -->
		<view class="neibox2" :style="heightNum">
			<swiper class="swiper flex-column mx-start sx-stretch" :style="heightNum" circular :autoplay="true" interval="3000" duration="500" indicator-dots indicator-active-color="#30AEFF" indicator-color="#fff">
				<swiper-item class="flex-column mx-start sx-stretch" v-for="(item,index) in tanlist" :key="index">
					<image class="swiper-item backImgFull" :style="heightNum" :src="item"></image>
				</swiper-item>
			</swiper> 
		</view>
		<view class="box" style="position: absolute;">
		   <view class="left_box">
		     <view class="left_item" :style="loading_left"></view>
		   </view>
		   <view class="right_box">
		     <view class="right_item" :style="loading_right"></view>
		   </view>
		   <view class="mask" @click="topage()">跳过</view>
		 </view>
	</view>
</template>

<script> 
	export default{
		data(){
			return{
				heightNum:'',
				tanlist:'',
				loading_left:'',
				loading_right:'',
			}
		},
		onLoad() {
		},
		onShow() {
			let that = this
			uni.getSystemInfo({
				success: function (res) {
					that.heightNum = 'height:'+res.windowHeight+'px'
				}
			})
			this.http.ajax({
				url: 'pop/popup',
				method: 'GET',
				data:{
					type:1
				},
				success(res) {
					that.tanlist = res.data.kaiping
					that.loading_left = '-webkit-animation: loading_left '+res.data.kaiping_time+'s linear'
					that.loading_right = '-webkit-animation: loading_right '+res.data.kaiping_time+'s linear'
					setTimeout(function(){
						uni.switchTab({
						    url: './index'
						});
					},res.data.kaiping_time+'000')
				}
			});
		},
		methods:{
			topage(){
					uni.switchTab({
					    url: './index'
					});
			}
		}
	}
</script>

<style>
	.swiper-item{
		width: 100%;
		margin: auto;
	}
	.neibox2 swiper{
		width: 100%;
	}
	.neibox2{
		width: 100%;
		margin: auto;
		position: relative;
	}
	.zhanp{
		width: 100%;
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
	}
	.box{
	  /* 最外层的盒子 */
	  width:100rpx;
	  height:100rpx;
	  margin: 0 auto;
	  position: absolute;
	  overflow: hidden;
	  border-radius: 50%;
	  background-color: #fff;
		z-index: 99;
		top: 40rpx;
		right: 40rpx;
	}
	.left_box,.right_box{
	  /* 
	    左右两边用于 隐藏 旋转的div的盒子 
	    通过overflow来隐藏内部div旋转出去的部分
	  */
	  position: absolute;
	  top: 0;
	  width:50rpx;
	  height:100rpx;
	  overflow: hidden;
	  z-index: 1;
	}
	.left_box{
	  left: 0;
	}
	.right_box{
	  right: 0;
	}
	.left_item,.right_item{
	  /* 
	   这是需要旋转的div(没有被mask遮盖展示出来的部分作为倒计时的线条)
	   为了方便理解，下面用deeppink和cyan分别设置了左右两边div的颜色
	  */
	  width: 50rpx;
	  height: 100rpx;
	}
	.left_item{
	  /*
	   1.设置圆角，圆角大小为高度的一半
	   2.这只旋转的中心店，这是左边圆，中心点设置到右边中心点，右边圆则设置到左边中心点
	   */
	  border-top-left-radius: 50rpx;
	  border-bottom-left-radius: 50rpx;
	  -webkit-transform-origin: right center;
	  transform-origin: right center;
	  background-color: #30AEFF;
	}
	.right_item{
	  border-top-right-radius: 50rpx;
	  border-bottom-right-radius: 50rpx;
	  -webkit-transform-origin: left center;
	  transform-origin: left center;
	  background-color: #30AEFF;
	}
	.mask{
	  /* 遮住div多余的部分，呈现出线条的效果 */
	  position: absolute;
	  top: 5rpx;
	  left: 5rpx;
	  right: 5rpx;
	  bottom: 5rpx;
	  z-index: 2;
	  border-radius: 50%;
	  background-color: #fff;
	}
	@-webkit-keyframes loading_left{
	    0%{
	        -webkit-transform: rotate(0deg);
	    }
	    50%{
	        -webkit-transform: rotate(0deg);
	    }
	    100%{
	        -webkit-transform: rotate(180deg);
	    }
	}
	@-webkit-keyframes loading_right{
	    0%{
	      -webkit-transform: rotate(0deg);
	    }
	    50%{
	      -webkit-transform: rotate(180deg);
	    }
	    100%{
	      -webkit-transform: rotate(180deg);
	    }
	}
	.mask{
	  text-align: center;
	  font-size: 24rpx;
	  font-weight: bold;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
</style>
