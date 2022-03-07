<template>
	<view style="overflow: hidden;">
	<view class="about">
		<!-- <view v-html="content"></view> -->
		<rich-text  v-html = 'content'></rich-text>
	</view>
	<takinfo></takinfo>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content: ''
			}
		},
		onLoad() {
			let that = this
			this.http.ajax({
				url: 'index/setting',
				method: 'GET',
				data: {
					key:'yinsi'
				},
				success(res) {
					that.content = that.formatRichText(res.data.data)
				}
			});
		},
		methods:{
			back(){
				uni.setStorageSync('yc',1)
				uni.reLaunch({
					url:'yanche'
				})
			},
			formatRichText(html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});
					newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
						return match;
					});
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					newContent = newContent.replace(/\<img/gi,
						'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
					return newContent;
				}
		}
	}
</script>

<style>
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
		margin-top: 40rpx;
	}
	page{
		background: #F4F7F7;
	}
	.about{
		width: 720rpx;
		margin: auto;
		border-radius: 10rpx;
		background: #fff;
		padding: 18rpx;
		height: 100%;
		box-sizing: border-box;
	}
</style>
