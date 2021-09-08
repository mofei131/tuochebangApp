<template>
	<picker mode="multiSelector" @change="cityChooseChange" @columnchange="bindMultiPickerColumnChange"
		:value="multiIndex" :range="multiArray">
		<view class="flex-row mx-center sx-center" style="min-width: 100rpx;">
			<text style="flex: 0 0 auto;font-size: 28rpx;">{{currentCityName}}</text>
			<fa-icon v-if="angelesick" type="caret-down" :color="anglecolor" style="flex: 0 0 auto;margin-left:14rpx;"></fa-icon>
			<fa-icon v-else type="angle-down" :color="anglecolor" style="flex: 0 0 auto;margin-left:14rpx;"></fa-icon>
		</view>
	</picker>
</template>

<script>

	export default {
		components: {

		},
		// props: ['getcity'],
		props:{
			getcity:{
				type:Array,
				default:[]
			},
			anglecolor:{
				type:String,
				default:'gray'
			},
			angelesick:{
				type:Boolean,
				default:false
			}
		},
		mounted() {
			this.drawinit();

		},
		data() {
			return {
				addressName: '',
				currentProvinceid: null,
				currentCityId: null,
				currentCityName: '北京',
				multiArray: [
					[, ],
					[, ]
				],
				multiIndex: [0, 0],


			}
		},

		methods: {
			drawinit(){
				this.$amapPlugin.getRegeo({
					success: (data) => {
						// console.log(data)
						let {
							citycode,
							adcode,
							city,
							province
						} = data[0].regeocodeData.addressComponent;
				
						this.currentCityName = city;
						let c = this.$store.state.cities.find(item => item.city == city);
						// console.log(c);
						this.currentCityId = c && c.cityid;
						this.currentProvinceid = c && c.provinceid;
				
						let temp = this.$store.state.provinces;
						let provinces = temp.map(item => item.province);
						let pIndex = provinces.findIndex(item => item == province);
				
						if (pIndex != -1) {
							let cities = this.getCity(c.provinceid).map(item => item.city);
							let cIndex = cities.findIndex(item => item == city);
							this.multiIndex = [pIndex, Math.max(0, cIndex)];
							this.multiArray = [provinces, cities];
							this.$emit("getcity", {
								cityid: this.currentCityId,
							})
						}
					},
					fail:()=>{
						this.tt && clearTimeout(this.tt);
						this.tt = setTimeout(()=>{
							this.drawinit();
						},1000)
					}
					
				});
			},
			getCity(provinceId) {
				return this.$store.state.cities.filter(item => item.provinceid == provinceId);
			},
			cityChooseChange(e) {
				console.log(e);
				let v = e.detail.value;
				let pid = v[0] + 1;

				let p = this.$store.state.provinces.find(item => item.id == pid);
				if (p) {
					this.currentProvinceid = p.provinceid;
					let c = this.getCity(p.provinceid);
					if (c && c.length > 0) {
						console.log(v[1]);
						this.currentCityId = c[v[1]].cityid;
						this.currentCityName = c[v[1]].city;
						if (/^市辖区$/.test(this.currentCityName) || /^县$/.test(this.currentCityName) || /^市$/.test(this
								.currentCityName)) {
							this.currentCityName = p.province;
						}
					}
					console.log(c);
					this.$emit("getcity", {
						cityid: this.currentCityId,
					})
				}

			},

			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				// this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列

						let id = e.detail.value + 1;
						let p = this.$store.state.provinces.find(item => item && item.id == id);
						if (p) {
							// this.currentProvinceid = p.provinceid;
							let c = this.getCity(p.provinceid);
							if (c && c.length > 0) {
								// this.currentCityId =c[0].cityid;
								// this.currentCityName = c[0].city;
								this.multiArray[1] = c.map(item => item.city);
							}

						}

						break
					case 1: //拖动第2列

						break
				}
				this.$forceUpdate()
			},



		}
	}
</script>

<style>
</style>
