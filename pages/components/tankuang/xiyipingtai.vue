<template>
	<view style="overflow: hidden;">
	<view class="about">
		<!-- <view v-html="content"></view> -->
		<rich-text  v-html = 'content'></rich-text>
	</view>
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
			uni.request({
				url:'https://layer.boyaokj.cn/api/index/setting',
				method:'GET',
				data:{
					key:'pingtaifuwu'
				},
				success(res) {
					// console.log(res.data.data.data)
					// that.content = res.data.data.data
					that.content = that.formatRichText(res.data.data.data)
				}
			})
		},
		methods:{
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
	page{
		background: #F4F7F7;
	}
	.about{
		width: 720rpx;
		margin: auto;
		border-radius: 10rpx;
		background: #fff;
		padding: 20rpx;
		height: 100%;
	}
</style>
