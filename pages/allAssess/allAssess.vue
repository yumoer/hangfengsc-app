<template>
	<view class="content" style="width: 100%;">
		
		<view class="eva-section" v-if="results.length > 0">
			<view class="">
				 <view class="e-header" style="border-bottom:1px soild #ddd">
				 	<text class="tit">评价</text>
				 	<text>({{results.length}})条</text>
				 	<text class="tip">好评率：<text style="color:#fa436a;">{{score}}</text></text>
				 	<text class="yticon icon-you"></text>
				 </view>
				<view v-for="(result,index) in results" :key="index"  style="margin-top: 16upx;background: #fff;">
					
					<view class="eva-box" >
						<image class="portrait" :src="headPicValue"></image>
						<view class="right">
							<text class="name" style="display: inline-block;">{{username}}
								<text class="bot" style="float: right;">
									<text class="time">{{result.create_time.split('T')[0]+' '}}{{result.create_time.split('T')[1].split('.')[0]}}</text>
								</text>
							</text>
							<text class="con">{{result.comment}}</text>
						</view>
					</view>
					<view class="order-item" @click="goTo(result.sku.id)">
						<view class="goods-box-single">
							<image class="goods-img" :src="result.sku.default_image_url" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{result.sku.name}}</text>
								<text class="price" style="float: left;">{{result.sku.price}} 
									<!-- <text class="attr-box" style="float: right;">  x {{result.sku.sales}}</text> -->
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			 
		</view>
		<view v-else style = "position: relative;">
			<image style="width: 200px;height: 200px;position: absolute;left: 0;right: 0;top: 120px;margin: auto;" src="../../static/img/icon.png" mode=""></image>
			<text style="position: absolute;left: 0;right: 0;top: 330px;margin: 0px auto;text-align: center;font-size: 16px;">暂无评价,评价后查看评价</text>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				goodsItem:[],
				results:[],
				score:null,
				sku:null,
				headPicValue:'',
				username:uni.getStorageSync('userInfo').username,
			}
		},
		async onShow(){
			await uniRequest({
				url:'user/goods/comment/',
				method:'get',
				headers:{
					Authorization:'JWT '+uni.getStorageSync('userInfo').token
				},
			}).then(res=>{
				console.log(res)
				if(res.status === 200){
					this.results = res.data.results.reverse()
					var score = 0
					var sku = 0
					this.results.forEach(async (ele,index)=>{
						score += ele.score * 1/5
						this.score = Math.round(score/this.results.length*100) + '%'
						
						/* await uniRequest({
							url:'categories/get/goods/'+ele.sku,
							method:'get',
							headers:{
								Authorization:'JWT '+uni.getStorageSync('userInfo').token
							},
						}).then(res=>{
							
							if(res.status === 200){
								// this.goodsItem = res.data
								// this.results[index].goodsItem = this.goodsItem
								
								this.goodsItem.push(res.data)
								console.log(this.goodsItem)
								this.goodsItem = this.goodsItem.reverse()
							}
						}).catch(error=>{
							console.log(error)
						}) */
						// ele.goodsItem = this.goodsItem
					})
				}
			}).catch(error=>{
				console.log(error)
			})
			console.log(this.results)
			if(uni.getStorageSync('avatar') !== undefined){
				this.headPicValue = uni.getStorageSync('avatar')
			}else if(uni.getStorageSync('userInfo').avatar !== ''){
				this.headPicValue = uni.getStorageSync('userInfo').avatar
			}else{
				this.headPicValue = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
			}
		},
		onLoad(options){
			// this.getData()
		},
		methods: {
			async getShops(sku){
				console.log(sku)
				
			},
			goTo(id){
				console.log(id)
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	uni-radio .uni-radio-input{
		width:36upx;
		height: 36upx;
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx;
		// background: #fff;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	
	.eva-box{
		display: flex;
		padding: 20upx;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	
	.order-item{
		display: flex;
		flex-direction: column;
		padding: 20upx;
		
		// padding-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
				padding-left: 10upx;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx;
			background: #f8f8f8;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
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
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: red;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}
	
	textarea{
		width: 100%;
		height: 240upx;
		background-color: #white;
		font-size: 16px;
		color: #898989;
		padding: 24upx;
		box-sizing: border-box;
		line-height: 40upx
	}
	
</style>

