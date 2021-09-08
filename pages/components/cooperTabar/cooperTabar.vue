<template>


	<view class="uni-list flex-row mx-between sx-center"
		style="margin-bottom: 20rpx;background-color: #FFFFFF;padding: 20rpx;border-radius: 10rpx;font-size: 28rpx;">
		<view class="uni-list-cell">
			<pickcity @getcity="getCity"></pickcity>
		</view>
		<view class="uni-list-cell">
			<picker @change="anjianChange"  :value="index1" :range="byinfo" range-key="name">
				<view class=" flex-row mx-center sx-center">
					<text>{{index1===null?'案件类型': byinfo[index1].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>
		</view>
		<view class="uni-list-cell">
			<picker @change="lvshiChange" :value="index2" :range="lyinfo" range-key="name">
				<view class=" flex-row mx-center sx-center">
					<text>{{index2===null?'律师级别': lyinfo[index2].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>
		</view>
		<view class="uni-list-cell">
			<picker @change="workAgeChange" :value="index3" :range="wkinfo" range-key="name">
				<view class="flex-row mx-center sx-center">
					<text>{{index3===null?'工作年限': wkinfo[index3].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	import pickcity from '@/pages/components/pickcity/pickcity.vue'

	export default {
		components: {
			
			pickcity,

		},
		props: [],
		mounted() {
			
			let {bussinessTypes,lawyerLevels,workAges} = this.$store.state;
			this.byinfo = bussinessTypes || [];
			this.lyinfo = lawyerLevels || [];
			this.wkinfo = workAges || [];
			
		},
		data() {
			return {
				cityId:110100,
				byinfo:[],
				wkinfo:[],
				lyinfo:[],
				index1: null,
				index2: null,
				index3: null,

			}
		},
		computed: {

		},
		methods: {
			getCity(e) {
				console.log(e);
				this.cityId = e.cityid;
				this.getCurrentSearchId();
			},
			anjianChange: function(e) {
				//返回选择的数组下标
				this.index1 = e.detail.value;
				this.getCurrentSearchId();
			},
			lvshiChange: function(e) {
				this.index2 = e.detail.value;
				this.getCurrentSearchId();
			},
			workAgeChange: function(e) {
				this.index3 = e.detail.value;
				this.getCurrentSearchId();
			},
			// bindPickerChange: function(e) {
			// 	this.index = e.detail.value;
			// 	this.getCurrentSearchId();
			// },
			getCurrentSearchId() {
				console.log('===>');
				let currBy = this.index1===null?{}: this.byinfo[this.index1];
				let currLy = this.index2===null?{}:this.lyinfo[this.index2];
				let currWk = this.index3===null?{}:this.wkinfo[this.index3];
				console.log({currBy,currLy,currWk});
				this.$emit("searchChange", {
					cityid: this.cityId,
					case_type: currBy.id||'',
					level: currLy.id||'',
					age: currWk.id||'',
				})

			}


		}
	}
</script>

<style>
	.uni-list-cell {
		flex: 0 0 auto;
	}
</style>
