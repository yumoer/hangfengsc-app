<template>
	<view class="empty" v-if="isShow">
		<image :src="img" mode="widthFix" class="empty_image"></image>
		<text :style="{color:textColor}">{{ text }}</text>
		<button v-if="path" class="add-btn" @click="navTo(path)">{{btnText}}</button>
	</view>
</template>

<script>
export default {
	name: 'xw-empty',
	props: {
		text: {
			type: String,
			default: ''
		},
		img: {
			type: String,
			default: ''
		},
		textColor:{
			type: String,
			default: ''
		},
		isShow: {
			type: Boolean,
			default: false
		},
		btnText:{
			type: String,
			default: ''
		},
		path:{
			type: String,
			default: ''
		},
	},
	methods: {
		navTo(url){
			console.log(url)
			// uni.switchTab({
			// 	url: url
			// })
			uni.navigateTo({
				url: url
			})
		},
	}
};
</script>

<style lang="scss">
.empty {
	position:relative;
	left: 0;
	top:0;
	width: 100%;
	height: 80vh;
	padding-bottom:100upx;
	display:flex;
	justify-content: center;
	flex-direction: column;
	align-items:center;
	background: #F7F7F7;
	.empty_image{
		width: 517.7upx;
		height: 360.425upx;
		margin-bottom:30upx;
	}
	.empty-tips{
		display:flex;
		justify-content: center;
		font-size: $font-sm+2upx;
		color: $font-color-disabled;
		.navigator{
			color: $uni-color-primary;
			margin-left: 16upx;
		}
	}
	.add-btn{
		margin-top: 40upx;
		font-size: 32upx;
		width: 234upx;
		color: #EE1D23;
		background-color: $base-color;
		border-radius: 50upx;
		background: #fff;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);	
		letter-spacing: 6upx;
	}
}
</style>
