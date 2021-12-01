import Vue from 'vue'
//引入vuex
import store from './store'
import App from './App'
import uniRequest from 'uni-request';
import initModal from "@/components/show-modal/initModal.js"
import showModal from "@/components/show-modal/showModal.vue"
import Json from './Json' //测试用数据

//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$uniRequest = uniRequest

// main.js
import uView from "uview-ui";

import VueClipboard from 'vue-clipboard2';

import jsrsasign from '@/node_modules/jsrsasign/lib/jsrsasign.js';

Vue.use(VueClipboard);
Vue.use(jsrsasign);
Vue.use(uView);
initModal(Vue);
Vue.component('show-modal',showModal);

uniRequest.defaults.baseURL = 'http://api.hfyt365.com';
// uniRequest.defaults.baseURL = 'http://api.行丰银拓.com'
// uniRequest.defaults.baseURL = 'http://192.168.1.31:8000';
uniRequest.defaults.headers.post['Content-Type'] = 'application/json';

uniRequest.interceptors.response.use(async function(response) {
	if(response.status === 500 || response.status === 502){
		Vue.prototype.$api.msg('服务器错误,请稍后重试')
	}
	console.log(response)
    console.log('返回进入拦截成功')
    return Promise.resolve(response);
}, function(error) {
	console.log(error)
    console.log('返回进入拦截失败')
    return Promise.reject(error);
});

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 100)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	// #ifdef APP-PLUS
	return prePage.$vm;
	// #endif
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, json, prePage};

App.mpType = 'app'

const app = new Vue({
    ...App,
	//挂载
	store
})
app.$mount()