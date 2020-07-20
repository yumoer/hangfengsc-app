<template>
	<view>
		<view class="">
			条码内容:{{value}} <br>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:''
			}
		},
		onLoad(option){
			console.log(option.value)
			this.value = decodeURIComponent(option.value)
			console.log(option.value)
			// this.value = option.value
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

<style lang="scss">
	page {
		background-color: #f7f7f7;
		padding: 20upx;
		height: 100%;
		width: 100%;
		font-size: 30upx;
	}
</style>
