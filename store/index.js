import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		ppid:'',
	},
	mutations: {
		login(state, provider) {
			console.log(state, provider)
			state.hasLogin = true;
			// state.uerInfo.userName = provider.user_name 
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider,
			})
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
			uni.removeStorage({
			    key: 'avatar'  
			})
		},
		// 二维码ppid
		saveppid(state,ppid) {
		  state.ppid = ppid
		  uni.setStorage({
			key: 'ppid',
			data: ppid
		  })
		  console.log(state.ppid)
		},
	},
	actions: {
	
	}
})

export default store
