<template>
	<view class="content" style="width: 100%;">
		<view class="eva-section" v-if="results.length > 0">
			<view class="">
				<view v-for="(result,index) in results" :key="index"  style="margin-top: 20upx;background: #fff;">
					<view class="eva-box" >
						<image class="portrait" :src="headPicValue"></image>
						<view class="right">
							<text class="name" style="">{{username}}
								<text class="bot" style="float: right;">
									<text class="time"><i class="yticon icon-iconfontshanchu1"></i></text>
								</text>
							</text>
							<text class="con">{{result.create_time}}</text>
						</view>
					</view>
					<view class="assess-goods" style="">
						{{result.comment}}
					</view>
					<view class="order-item" @click="goTo(result.sku.id)">
						<view class="goods-box-single">
							<image class="goods-img" :src="result.sku.default_image_url" mode="aspectFill"></image>
							<view class="right">
								<text class="title">{{result.sku.title}}</text>
								<text class="price" style="float: left;">{{result.sku.price}} 
								</text>
							</view>
						</view>
					</view>
					<view class="assess-look">
						<span>浏览 0次 </span>
						<span style="margin-left: 40upx;">评论 0次 </span>
					</view>
				</view>
			</view>
			 
		</view>
		<view v-else>
			<xw-empty :isShow="isEmpty" img="/static/empty/emptyAssess.png" path="" btnText="" text="您还没有评价内容" textColor="#C0C4CC"></xw-empty>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import xwEmpty from '@/components/xw-empty/xw-empty';
	export default {
		data() {
			return {
				goodsItem:[],
				results:[],
				score:null,
				sku:null,
				headPicValue:'',
				username:uni.getStorageSync('userInfo').username,
				isEmpty:false,
			}
		},
		components:{xwEmpty},
		onLoad(options){
			this.getData()
		},
		watch:{
			//显示空白页
			results(e){
				let empty = e.length === 0 ? true: false;
				console.log(this.isEmpty,empty)
				if(this.isEmpty !== empty){
					this.isEmpty = empty;
				}
			}
		},
		methods: {
			async getData(){
				uni.showLoading()
				await uniRequest({
					url:'/goods/user/comment/',
					method:'get',
					params:{page:1,page_size:10},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res)
					if(res.status === 200){
						uni.hideLoading()
						this.results = res.data.results
						var score = 0
						var sku = 0
						this.results.forEach(async (ele,index)=>{
							score += ele.score * 1/5
							this.score = Math.round(score/this.results.length*100) + '%'
						})
					}
				}).catch(error=>{
					console.log(error)
				})
				if(uni.getStorageSync('userInfo')){
					this.headPicValue = uni.getStorageSync('userInfo').avatar
				}else{
					this.headPicValue = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
				}
			},
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
	
	.icon-iconfontshanchu1{
		font-size: 36upx;
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
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
			width: 120upx;
			height: 120upx;
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
				font-size: 24upx;
				color: #999;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
		.name{
			display: inline-block;
			color: #666;
			font-size: 32upx;
			padding: 10px 0;
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
			background: #F7F7F7;
			.goods-img{
				display: block;
				width: 174upx;
				height: 174upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: 24upx;
					font-weight: bold;
					color: #666666;
					line-height: 2;
					height: 96upx;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					margin-top: 20px;
					&:before{
						content: '￥';
						font-size: $font-sm;
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
	
	.assess-goods{
		padding: 0 20upx;
		color: #333;
		font-size: 28upx;
		font-weight: bold;
		font-family: 'PingFang-SC-Medium';
	}
	
	.assess-look{
		padding: 20upx;
		color: #666666;
		font-size: 24upx;
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

