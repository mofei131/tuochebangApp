<template>
	<view>首页</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			
		},
		onShow() {
			uni.reLaunch({
				url:'../login/login'
			})
		},
		methods: {

		}
	}
</script>

<style>
</style>
