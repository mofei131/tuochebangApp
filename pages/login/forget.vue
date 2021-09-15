<template>
  <view class="content">
    <view class="list">
      <view class="tishi">忘记密码</view>
      <view class="list-call">
        <input class="sl-input" type="number" v-model="phone" maxlength="11" placeholder="请输入手机号" />
		 <view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
      </view>
      <view class="list-call">
        <input class="sl-input" type="number" v-model="code" maxlength="4" placeholder="验证码" />
      </view>
			<view class="list-call">
			  <input class="sl-input" type="text" v-model="password" maxlength="32" placeholder="请输入新密码" :password="!showPassword" />
			</view>
			<view class="list-call">
			  <input class="sl-input" type="text" v-model="password2" maxlength="32" placeholder="请重复输入新密码" :password="!showPassword" />
			</view>
    </view>
	<view class="agreement">
		<text>密码为6-20位，可由数字、字母、符号组成。</text>
	</view>
    <view class="button-login" hover-class="button-hover" @tap="bindLogin()">
      <text>修改密码</text>
    </view>

  </view>
</template>

<script>
  var _this, js;
  export default {
    data() {
      return {
        phone: '',
        second: 0,
        code: "",
        showPassword: false,
        password: '',
				password2: ''
      }
    },
    onLoad() {
      _this = this;
    },
    computed: {
      yanzhengma() {
        if (this.second == 0) {
          return '| 获取验证码';
        } else {
					return this.second+'s重新获取';
          // if (this.second < 10) {
          //   return '重新获取0' + this.second;
          // } else {
          //   return '重新获取' + this.second;
          // }
        }
      }
    },
    onUnload() {
      this.clear()
    },
    methods: {
      display() {
        this.showPassword = !this.showPassword
      },
      clear(){
        clearInterval(js)
        js = null
        this.second = 0
      },
      getcode() {
        if (this.phone.length != 11) {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          });
          return;
        }
        if (this.second > 0) {
          return;
        }
        _this.second = 60;
				this.http.ajax({
					url: 'app/getVerifyCode',
					method: 'GET',
					data: {
						mobile: this.phone,
					},
					success(res) {
						if(res.code == 200){
							js = setInterval(function() {
								_this.second--;
								if (_this.second == 0) {
									_this.clear()
								}
							},1000)
						}
					}
				});
      },
      bindLogin() {
        if (this.phone.length != 11) {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          });
          return;
        }
        if (this.password.length < 6) {
          uni.showToast({
            icon: 'none',
            title: '密码不正确'
          });
          return;
        }
        if (this.code.length != 4) {
          uni.showToast({
            icon: 'none',
            title: '验证码不正确'
          });
          return;
        }
				if (this.password != this.password2) {
				  uni.showToast({
				    icon: 'none',
				    title: '请输入相同密码'
				  });
				  return;
				}
        this.http.ajax({
        	url: 'app/forget',
        	method: 'GET',
        	data: {
        		mobile: this.phone,
        		password: this.password,
        		code: this.code
        	},
        	success: function(res) {
        		if (res.code == 200) {
        			uni.showToast({
        				title: '修改成功',
        				icon: 'none',
        				duration:1000
        			})
        			setTimeout(() => {
        				uni.redirectTo({
        					url: 'login'
        				})
        			},1000)
        		}
        	}
        });
      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tishi {
    color: #51565D;
    font-size: 32rpx;
    line-height: 50rpx;
		margin: auto;
    margin-bottom: 35rpx;
		margin-top: 69rpx;
	
  }

  .list {
    display: flex;
    flex-direction: column;
		padding: 20rpx 35rpx 0;
  }

  .list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 76rpx;
		width: 680rpx;
		color: #666;
		background: #F4F4F4;
		border-radius: 39rpx;
		font-size: 26rpx;
		margin-top: 20rpx;
		padding: 0 31rpx;
		box-sizing: border-box;
  }

  .list-call .img {
    width: 40rpx;
    height: 40rpx;
	margin-right: 20rpx;
  }

  .list-call .sl-input {
    flex: 1;
    text-align: left;
    font-size: 26rpx;
  }

  .button-login {
  	width: 680rpx;
  	height: 76rpx;
  	background: #1890FF;
  	border-radius: 39rpx;
  	/* opacity: 0.4; */
  	text-align: center;
  	color: #fff;
  	line-height: 70rpx;
  	margin: auto;
  	margin-top: 32rpx;
  }

  .yzm {
    color: #1890FF;
    font-size: 26rpx;
    line-height: 64rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
    width: auto;
    height: 64rpx;
    /* border: 1rpx solid #FFA800; */
    border-radius: 50rpx;
  }
  
  .yzms {
    color: #1890FF !important;
    /* border: 1rpx solid #999999; */
  }
  .agreement{
  	  display: flex;
  	  margin-left: 35rpx;
  	  color: #666666;
  	  font-size: 22rpx;
  	  line-height: 30rpx;
  	  margin-top: 18rpx;
  	  box-sizing: border-box;
  }
</style>
