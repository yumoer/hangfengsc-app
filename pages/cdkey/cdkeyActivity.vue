<template>
	<view style="width: 100%;text-align: center;">
		<view class="">
			<image style="width: 100%;" :src="bgImg" mode=""></image>
		</view>
		<view class="">
			<image style="width: 180px;height: 180px;" @click="longpress" :src="imgSrc" mode=""></image>
		</view>
		<view style="padding-top:40upx;line-height: 60upx;">
			<view style="color: #fff;font-size: 34upx;">
				一、长按识别图中二维码
			</view>
			<view style="color: #fff;font-size: 34upx;">
				二、进入公众号进行兑换
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return {
			bgImg: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20200708/cbac7a710b90ed11fdcffa410f97acb4.jpg',
			imgSrc: 'https://w.url.cn/s/Ab8yc9J' 
		}
	},
	onLoad : function () {
		
	},
	methods:{
		// 长按事件
		longpress : function () {
			console.log('ok');
			uni.saveImageToPhotosAlbum({
				filePath: this.imgSrc,
				success:()=>{
					console.log('save success');
					uni.showToast({
						title:"图片已经保存到您的相册~"
					})
				}
			});
		}
	}
}
</script>
<style>
page{background-color:#7ACBDC;}
</style>