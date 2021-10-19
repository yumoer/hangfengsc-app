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

/* 全局注册QS-inputs-split组件 */
import QSInput from './components/QS-inputs-split/elements/QS-input/index.vue';
import QSRadio from './components/QS-inputs-split/elements/QS-radio/index.vue';
import QSCheckbox from './components/QS-inputs-split/elements/QS-checkbox/index.vue';
import QSTextarea from './components/QS-inputs-split/elements/QS-textarea/index.vue';
import QSPickerDate from './components/QS-inputs-split/elements/QS-picker-date/index.vue';
import QSPickerCity from './components/QS-inputs-split/elements/QS-picker-city/index.vue';
import QSPickerCustom from './components/QS-inputs-split/elements/QS-picker-custom/index.vue';
import QSPickerCustom2 from './components/QS-inputs-split/elements/QS-picker-custom2/index.vue';
import QSPics from './components/QS-inputs-split/elements/QS-pics/index.vue';
import QSInfinitePics from './components/QS-inputs-split/elements/QS-infinitePics/index.vue';
import QSwitch from './components/QS-inputs-split/elements/QS-switch/index.vue';
// main.js
import uView from "uview-ui";

import VueClipboard from 'vue-clipboard2';

import jsrsasign from './node_modules/jsrsasign/lib/jsrsasign.js';

Vue.use(VueClipboard);
Vue.use(jsrsasign);
Vue.use(uView);
initModal(Vue);
Vue.component('show-modal',showModal);
Vue.component('QSInput',QSInput);
Vue.component('QSRadio',QSRadio);
Vue.component('QSCheckbox',QSCheckbox);
Vue.component('QSTextarea',QSTextarea);
Vue.component('QSPickerDate',QSPickerDate);
Vue.component('QSPickerCity',QSPickerCity);
Vue.component('QSPickerCustom',QSPickerCustom);
Vue.component('QSPickerCustom2',QSPickerCustom2);
Vue.component('QSPics',QSPics);
Vue.component('QSInfinitePics',QSInfinitePics);
Vue.component('QSwitch',QSwitch);

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