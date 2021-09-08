<template>
	<view class="box" v-if="dialogShow">
		<view class="flex-column mx-center sx-stretch boxchild">
			<view class="flex-column mx-center sx-center" style="flex:1 1 auto;margin-top: 60rpx;">
				<view>授权提示</view>
				<view>小程序想获取用户头像等信息</view>
			</view>
			<view class="flex-row mx-center sx-center" style="flex:0 0 80rpx;padding: 20rpx;">
				<button @tap="close" style="flex:1 1 auto;margin-right: 40rpx;" class="mini-btn" type="default"
					size="mini">取消</button>
				<button @tap="dialogConfirm" style="flex:1 1 auto" class="mini-btn" type="primary"
					size="mini">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {


		},
		props: ['confirm','backindex'],
		mounted() {


		},
		data() {
			return {
				dialogShow: false

			}
		},
		computed: {

		},
		methods: {
			dialogConfirm(e) {
				this.$emit('confirm')
			},
			close(e) {
				this.dialogShow = false;
				console.log('返回首页');
				this.$emit('backindex')
			},
			open() {
				this.dialogShow = true;
			},
			setDialogFalse(){
				this.dialogShow = false;
			}


		}
	}
</script>

<style>
	.box {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgb(0, 0, 0, 0.5);
		top: 0;
		z-index: 5;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.boxchild {
		padding: 20rpx 0;
		animation: mymove 0.5s;
		position: fixed;
		/* top: 400rpx; */
		margin: 0 auto;
		background-color: #FFFFFF;
		height: 300rpx;
		width: 90%;
		border-radius: 10rpx;
		z-index: 10;
		justify-content: center;
		margin: auto;
		/* left: 0; */
	}
	
</style>
