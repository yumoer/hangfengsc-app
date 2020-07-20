<template>
	<view class="">
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		onLoad() {
			const value = uni.getStorageSync('launchFlag');
			// #ifdef APP-PLUS
			// 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
			
			if (value) {
			  // 如何已经有，直接去home首页
			  uni.switchTab({
			    url: '/pages/index/index'
			  });
			} else {
			  // 没有值，跳到引导页，并存储，下次打开就不会进去引导页
			  uni.setStorage({
			    key: 'launchFlag',
			    data: true
			  });
			  uni.redirectTo({
			    url: '/pages/index/guide'
			  });
			}
			// #endif
			// #ifdef H5
			uni.switchTab({
			  url: '/pages/index/index'
			});
			// #endif
		  
		}
	}
</script>

<style>
</style>
