<template>
	<view>
		<view style="height: 300upx;line-height: 300upx;text-align: center;">
			<text style="color: #fff;font-size: 32upx;font-weight: 100;">行丰商城App,购物高效又轻松！</text>
		</view>
		<view style="width: 100%;height: 300px;text-align: center;padding-left: 80upx;">
			<image style="width: 200px;height: 100%;" src="http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAXFzEAAHj6am2HcE4375844" mode=""></image>
		</view>
		<view style="width: 100%;height: 60px;text-align: center;margin-top: 20upx;">
			<button type="default" plain="true" style="width: 200px;color: #fff;border-color: #fff;border-radius: 30px;" @click="downAndroid">
				<text class="yticon icon-android"></text>
				<text style="margin-left: 10Px;">Android版下载</text>
			</button>
		</view>
		
		<view style="width: 100%;height: 60px;text-align: center;">
			<button type="default" plain="true" style="width: 200px;color: #fff;border-color: #fff;border-radius: 30px;" @click="downIphone">
				<text class="yticon icon-iphone"></text>
				<text style="margin-left: 10Px;">IPhone版下载</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				src: 'http://www.hfyt365.com:8000/mobile/download/apk' // 二维码生成后的图片地址或base64
			}
		},
		onLoad() {
			
		},
		methods:{
			downAndroid(){
				location.href = 'http://www.hfyt365.com:8000/mobile/download/apk'
				// let url = location.href; //获取url中"?"符后的字串
				// this.isWeixin(url)
			},
			downIphone(){
				// this.$api.msg('敬请期待')
				location.href = 'https://apps.apple.com/cn/app/%E8%A1%8C%E4%B8%B0%E5%95%86%E5%9F%8E/id1507747103'
			},
			isWeixin(url){
				var ua = navigator.userAgent;
				var isWeixin = !!/MicroMessenger/i.test(ua);
				if(isWeixin){
					this.$api.msg('点击右上角在浏览器中打开')
				}
			},
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #E82222;
		width: 100%;
		height: 100%;
	}
</style>
