<template>
	<view>
		<zy-search :is-focus="false" :theme="themeClass" :show-want="true" :speechEngine="speechEngine"
		:hot-list="hotList" @getSearchText="getSearchText"></zy-search>
	</view>
</template>

<script>
	import zySearch from '../../components/zy-search/zy-search.vue'
	export default {
		components: {
			zySearch
		},
		data() {
			return {
				themeClass: 'block',
				speechEngine: 'baidu', //语音识别引擎
				hotList: ['硒鼓','墨粉','碎纸机','投影仪','华为手机','复印纸'], //初始化推荐列表
			}
		},
		methods: {
			getSearchText(e) {
				uni.navigateTo({
					url:'/pages/search/searchList?value='+e
				})
			}
		},
	}
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
