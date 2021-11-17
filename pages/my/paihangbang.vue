<template>
	<view>
		<view class="topbck">
			<view class="sanfen">
				<view class="cepai" v-if="pailist[1]">
					<image class="cetou" v-if="pailist[1].avater" :src="pailist[1].avater"></image>
					<image class="cetou" v-else src="http://hlstore.yimetal.cn/2021/tuochebang/my_touxiang.png"></image>
					<image class="ceimg" src="http://hlstore.yimetal.cn/2021/tuochebang/55f5907f-bff5-4ffd-8042-731e6bd9f5c3.png"></image>
					<view class="zonname">{{ pailist[1].nickname }}</view>
					<view class="zonming">{{ pailist[1].child_num }}</view>
				</view>
				<view class="zonpai" v-if="pailist[0]">
					<image class="zontou" v-if="pailist[0].avater" :src="pailist[0].avater"></image>
					<image class="zontou" v-else src="http://hlstore.yimetal.cn/2021/tuochebang/my_touxiang.png"></image>
					<image class="zonimg" src="http://hlstore.yimetal.cn/2021/tuochebang/919ab7e1-4897-4690-89c5-2a773c9989e0.png"></image>
					<view class="zonname">{{ pailist[0].nickname }}</view>
					<view class="zonming">{{ pailist[0].child_num }}</view>
				</view>
				<view class="cepai" v-if="pailist[2]">
					<image class="cetou" style="left:36rpx" v-if="pailist[2].avater" :src="pailist[2].avater"></image>
					<image class="cetou" v-else src="http://hlstore.yimetal.cn/2021/tuochebang/my_touxiang.png"></image>
					<image class="ceimg" src="http://hlstore.yimetal.cn/2021/tuochebang/49c3ad62-4a25-4666-9492-0f5b2298651e.png"></image>
					<view class="zonname">{{ pailist[2].nickname }}</view>
					<view class="zonming">{{ pailist[2].child_num }}</view>
				</view>
			</view>
		</view>
		<view class="kaisi">
			<view class="kaiitem" v-for="(item, index) in pailist" :key="index" v-if="index > 2">
				<view class="kaileft">
					<view class="shu">{{ index + 1 }}</view>
					<image class="kaiimg" v-if="item.avater" :src="item.avater"></image>
					<image class="kaiimg" v-else src="http://hlstore.yimetal.cn/2021/tuochebang/my_touxiang.png"></image>
					<view class="kainame">{{ item.nickname }}</view>
				</view>
				<view class="kairight">
					<view class="kaifen">{{ item.child_num }}</view>
				</view>
			</view>
		</view>
		<view class="ziji">
			<view class="zileft">
				<view class="zipai">{{ me.rank }}</view>
				<image class="kaiimg" v-if=" me.avater" :src="me.avater"></image>
				<image class="kaiimg" v-else src="http://hlstore.yimetal.cn/2021/tuochebang/my_touxiang.png"></image>
				<view class="ziname">{{ me.nickname }}</view>
			</view>
			<view class="ziright">
				<view class="zifen">{{ me.child_num }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			limit: 20,
			pailist: [],
			me: ''
		};
	},
	onShow() {
		let that = this;
		this.http.ajax({
			url: 'wechat/rank',
			method: 'GET',
			data: {
				user_id: uni.getStorageSync('userInfo').id,
				page: this.page,
				limit: this.limit
			},
			success(res) {
				console.log(res);
				that.pailist = res.data.list;
				that.me = res.data.user;
			}
		});
	},
	onReachBottom() {
		this.page += 1;
		this.paihang();
	},
	methods: {
		paihang() {
			let that = this;
			this.http.ajax({
				url: 'wechat/rank',
				method: 'GET',
				data: {
					user_id: uni.getStorageSync('userInfo').id,
					page: this.page,
					limit: this.limit
				},
				success(res) {
					if (res.data.list.length != 0) {
						for (let i in res.data.list) {
							that.pailist.push(res.data.list[i]);
						}
					} else {
						uni.showToast({
							title: '没有了',
							icon: 'none'
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.zifen {
	font-size: 30rpx;
	font-family: Helvetica;
	color: #eb4a32;
}
.ziname {
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1e2432;
	margin-left: 22rpx;
}
.zipai {
	font-size: 44rpx;
	font-family: Helvetica;
	color: #eb4a32;
	margin-right: 6rpx;
}
.zileft {
	display: flex;
	align-items: center;
	height: 60rpx;
}
.ziji {
	width: 750rpx;
	height: 151rpx;
	background: #ffffff;
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 22rpx 60rpx 0 42rpx;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
}
.kaifen {
	font-size: 30rpx;
	font-family: Helvetica;
	color: #30aeff;
	margin-right: 45rpx;
}
.kainame {
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1e2432;
	margin-left: 22rpx;
}
.shu {
	font-size: 44rpx;
	font-family: Helvetica;
	color: #8cd2ff;
	width: 80rpx;
	text-align: center;
}
.kaiitem {
	display: flex;
	justify-content: space-between;
	height: 98rpx;
	border-bottom: 1rpx solid #f5f5f5;
	align-items: center;
}
.kaileft {
	display: flex;
	align-items: center;
}
.kaisi {
	width: 720rpx;
	background: #ffffff;
	border-radius: 6rpx;
	margin: 16rpx auto;
	margin-bottom: 90px;
}
.kaiimg {
	width: 60rpx;
	height: 60rpx;
	border-radius: 60rpx;
}
.cetou {
	width: 130rpx;
	height: 130rpx;
	border-radius: 150rpx;
	position: absolute;
	top: 42rpx;
	z-index: 0;
	left: 28rpx;
}
page {
	background: #f7f4f4;
}
.zontou {
	width: 160rpx;
	height: 160rpx;
	border-radius: 150rpx;
	position: absolute;
	top: 55rpx;
	z-index: 0;
	left: 10rpx;
}
.zonming {
	font-size: 38rpx;
	font-family: Helvetica;
	color: #ffffff;
	margin-top: 36rpx;
	text-align: center;
}
.zonname {
	font-size: 25rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #ffffff;
	text-align: center;
	max-width: 198rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-all;
}
.cepai {
	margin-top: 66rpx;
	position: relative;
}
.zonpai {
	position: relative;
}
.topbck {
	width: 750rpx;
	height: 430rpx;
	background: #30aeff;
}
.sanfen {
	display: flex;
	width: 595rpx;
	justify-content: space-between;
	margin: auto;
}
.zonimg {
	width: 176rpx;
	height: 264rpx;
	position: relative;
	z-index: 2;
}
.ceimg {
	width: 138rpx;
	height: 208rpx;
	position: relative;
	z-index: 2;
	margin: auto;
	display: block;
}
</style>
