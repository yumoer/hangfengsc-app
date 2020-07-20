<template>
    <view class="content">
		<view class="order-item">
			<view class="goods-box-single">
				<image class="goods-img" :src="goodsItem.image_url" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{goodsItem.name}}</text>
					<text class="price" style="float: left;">{{goodsItem.price}} 
						<text class="attr-box" style="float: right;">  x {{goodsItem.count}}</text>
					</text>
				</view>
			</view>
			<view class="content">
				<my-issue key="1" :score="infoReceive.score" :isCheck="infoReceive.is_anonymous" :headPicValue="infoReceive.headPicValue" :infoReceive='infoReceive' @submit="submit" @checkboxChange="checkboxChange"/>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniRequest from 'uni-request'
	import myIssue from '@/components/myIssue.vue'
	export default {
		data(){
		     return {
		         // 这里循环出未点亮的星分和点亮的星分
				 tabCurrentIndex: 0,
				 goodsItem:{},
				 desc:'',
				 infoReceive:{
					 score:5,
					 is_anonymous:false,
					 textareaValue:'',
					 headPicValue:''
				 },
		     }
		 },
		 components:{uniSection,myIssue},
		 onLoad(options){
			 console.log(JSON.parse(options.item))
			 this.goodsItem = JSON.parse(options.item)
			 console.log(this.infoReceive.is_anonymous)
		 },
		 onShow(){
			if(uni.getStorageSync('avatar') !== undefined){
				this.infoReceive.headPicValue = uni.getStorageSync('avatar')
			}else if(uni.getStorageSync('userInfo').avatar !== ''){
				this.infoReceive.headPicValue = uni.getStorageSync('userInfo').avatar
			}else{
				this.infoReceive.headPicValue = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
			}
		 },
		 methods: {
			   async submit(e){
				   console.log(e)
				   const response = await uniRequest({
				   	url:'user/goods/comment/',
				   	method:'post',
					data:{
						sku: this.goodsItem.sku_id,
						order: this.goodsItem.orderId,
						comment:e.textareaValue,
						is_anonymous:e.is_anonymous,
						score:e.score
					},
				   	headers:{
				   		Authorization:'JWT '+uni.getStorageSync('userInfo').token
				   	},
				   }).then(res=>{
					   console.log(res)
					   if(res.status === 201){
						   this.$api.msg('评论成功')
						   this.getAssess()
					   }else{
						   this.$api.msg(res.data.order[0])
						   this.$api.msg(res.data.sku.non_field_errors[0])
					   }
				   }).catch(error=>{
					   console.log(error)
				   })
			   },
				getAssess(e){
					var pages = getCurrentPages();
					var currPage = pages[pages.length - 1]; //当前页面
					var prevPage = pages[pages.length - 2]; //上一个页面
					//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
					prevPage.setData({
					     isDoRefresh:true
					})
					 setTimeout(function() {
						  uni.navigateBack();
					 }, 600);
				},
				
				checkboxChange(check){
					this.infoReceive.is_anonymous = !check
					console.log(this.infoReceive.is_anonymous)
					if(uni.getStorageSync('avatar') !== undefined){
						this.infoReceive.headPicValue = uni.getStorageSync('avatar')
					}else if(uni.getStorageSync('userInfo').avatar !== ''){
						this.infoReceive.headPicValue = uni.getStorageSync('userInfo').avatar
					}else{
						this.infoReceive.headPicValue = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
					}
				}
		 },
	}
</script>
<style>
	/* 头条小程序组件内不能引入字体 */
		/* #ifdef MP-TOUTIAO */
		@font-face {
			font-family: uniicons;
			font-weight: normal;
			font-style: normal;
			src: url('~@/static/yticon.ttf') format('truetype');
		}
	
		/* #endif */
	
		/* #ifndef APP-NVUE */
		page {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			background-color: #efeff4;
			min-height: 100%;
			height: auto;
		}
	
		view {
			font-size: 28rpx;
			line-height: inherit;
		}
	
		.example {
			padding: 0 30rpx 30rpx;
		}
	
		.example-info {
			padding: 30rpx;
			color: #3b4144;
			background: #ffffff;
		}
	
		.example-body {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			padding: 0;
			font-size: 14rpx;
			background-color: #ffffff;
		}
	
		/* #endif */
		.example {
			padding: 0 30rpx;
		}
	
		.example-info {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
			padding: 30rpx;
			color: #3b4144;
			background-color: #ffffff;
			font-size: 30rpx;
		}
	
		.example-info-text {
			font-size: 28rpx;
			line-height: 36rpx;
		}
	
	
		.example-body {
			flex-direction: column;
			padding: 30rpx;
			background-color: #ffffff;
		}
	
		.word-btn-white {
			font-size: 18px;
			color: #FFFFFF;
		}
	
		.word-btn {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-radius: 6px;
			height: 48px;
			margin: 15px;
			background-color: #007AFF;
		}
	
		.word-btn--hover {
			background-color: #4ca2ff;
		}
	
	
		.example-body {
			padding: 20rpx 0;
			padding-bottom: 0;
	
		}
	
		.example-box {
			/* margin-bottom: 30rpx;
	*/
		}
	
		.image-box {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			height: 350rpx;
			overflow: hidden;
		}
	
		.image {
			/* #ifndef APP-NVUE */
			width: 100%;
			height: 100%;
			/* #endif */
			flex: 1;
		}
	
		.content-box {
			padding-top: 20rpx;
		}
	
		.content-box-text {
			font-size: 30rpx;
		}
	
		.footer-box {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: space-between;
			flex-direction: row;
	
		}
	
		.footer-box__item {
			align-items: center;
			padding: 10rpx 0;
			font-size: 30rpx;
			color: #666;
		}
</style>
<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;
	
		&.cell-hover {
			background: #fafafa;
		}
	
		&.b-b:after {
			left: 30upx;
		}
	
		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;
	
			&.hb {
				background: #ffaa0e;
			}
	
			&.lpk {
				background: #3ab54a;
			}
	
		}
	
		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}
	
		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}
	
		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;
	
			&.disabled {
				color: $font-color-light;
			}
	
			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
			}
		}
	
		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}
	
		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
	.order-item{
		display: block;
		flex-direction: column;
		padding-left: 30upx;
		padding-right: 30upx;
		background: #fff;
		margin-top: 16upx;
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 0 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: red;
					margin-top: 20px;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
			.example-body {
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
				padding: 0;
				font-size: 14rpx;
				background-color: #ffffff;
			}
			
			
		}
	}
</style>
