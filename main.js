import App from './App'
import http from './common/http.js';
import store from 'store/index.js'
import takinfo from 'pages/components/takinfo/takinfo.vue'
Vue.prototype.http = http;
Vue.prototype.$store = store
Vue.component('takinfo',takinfo)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
let main = plus.android.runtimeMainActivity();
//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
plus.runtime.quit = function() {
    main.moveTaskToBack(false);
};
//重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast 
plus.nativeUI.toast = (function(str) {
    plus.runtime.quit();
});