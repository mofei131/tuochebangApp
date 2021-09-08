 <template>
	 <view>
		 <view class="dropDown">
		 	<view class="uni-form-item uni-column">
		 		<pickcity anglecolor='#ffffff' @getcity="getCity"></pickcity>
		 	</view>
			<view class="search">
				<image src="@/static/images/search.png"></image>
				<input type="text" v-model="input"  @input="searchName" placeholder="请输入搜索内容" placeholder-style="color:#fff;font-size:28rpx;"/>
			</view>
		 </view>
	 </view>
</template>

<script>
	import pickcity from '@/pages/components/pickcity/pickcity.vue'
	
	export default{
		components:{
			pickcity
		},
		data(){
			return{
				ttt:null,
				input:''
			}
		},
		methods:{
			getCity(e){
				console.log(e);
			},
			searchName() {
				// this.isMore = true;
				if (this.ttt) {
					clearTimeout(this.ttt);
				}
				this.ttt = setTimeout(item => {
					this.searchChange()
					// console.log("点击")
				}, 1000)
			},
			inputChange(){
				this.searchChange();
				// console.log("搜索")
			},
			searchChange(){
				// console.log(this.input)
				uni.navigateTo({
					url:'../list/moreAnli?name='+this.input
				})
			}
		},
		data(){
			return{
				diqu:["奎文区","高新区","潍城区"],
				index:0,
				input:''
			}
		}
	}
</script>

<style>
	.dropDown{
		width: 520rpx;
		color: #fff;
		font-size: 24rpx;
		display: flex;
		position: absolute;
		top: 76rpx;
		z-index: 10;
		font-size: 24rpx;
	}
	.uni-column{
		margin-top: 16rpx;
		margin-left: 40rpx;
	}
	.downicon{
		padding-top: 12rpx;
	}
	.downicon image{
		width: 21.12rpx;
		height: 10.56rpx;
		margin-left: 8rpx;
	}
	.search{
		display: flex;
		width: 360rpx;
		height: 60rpx;
		background: rgb(255,255,255,.34);
		border-radius: 32rpx;
		margin: auto;
		margin-left: 10rpx;
		box-sizing: border-box;
	}
	.search image{
		width: 30rpx;
		height: 30rpx;
		margin: 16rpx 0 0 14rpx;
	}
	.search input{
		width: 300rpx;
		margin: auto;
		height: 60rpx;
		box-sizing: border-box;
	}
</style>
