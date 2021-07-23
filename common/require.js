import uniRequest from 'uni-request';

service = uniRequest.create({
	baseURL: 'http://api.hfyt365.com',
	withCredentials: true,
	timeout: 8000
});

// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
service.interceptors.request.use(
    config => {
		console.log(config)
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        if(localStorage.getItem('ms_userInfo')){
            const token = JSON.parse(localStorage.getItem('ms_userInfo')).token;
            token && (config.headers.token = token);
        }
        return config;
    },
    error => {
        // 处理请求错误
        console.log(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    //请求成功
    config => {
        return config;
    },
    //请求失败
    error => {
        /**
         * 请求失败后的错误统一处理
         * @param {Number} status 请求失败的状态码
         */
        const errorHandle = (status,data) =>{
            switch (status) {
                case 507:
                    tip('服务器内部错误');
                    break;
                case 500:
                    tip('服务器错误');
                    break;
                case 401:
                    localStorage.removeItem('ms_userInfo');
                    box('登录过期，请重新登录');
                    break;
                case 403:
                    tip('您没有执行该操作的权限');
                    break;
                case 400:
                    if(data.sort_order){
                        tip(data.sort_order[0]);
                    }else if(data.user_id){
                        tip(data.user_id[0]);
                    }else if(data.sku){
                        tip(data.sku[0]);
                    }else if(data.order_id){
                        tip(data.order_id[0]);
                    }else if(data.non_field_errors){
                        tip(data.non_field_errors[0]);
                    }else{
                        tip(data.message);
                    }
                    break;
                case 412:
                    tip(data);
                    break;
                /*default:
                    tip('获取数据失败');
                    break;*/
            }
        };

        if(error){
            // 请求已发出，但是不在30分钟的范围
            errorHandle(error.response.status,error.response.data);
            return Promise.reject(error);
        }else{
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            // store.commit('changeNetwork', false);
        }
    }
);

// export default service;

