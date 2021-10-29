<template>
	<view class="content">
		<view class="order-item" v-for="(goodsItem, goodsIndex) in navList" :key="goodsIndex">
			<view class="i-top">
				<text class="time">订单编号：{{goodsItem.order_id}}</text>
				<text class="state" v-if="goodsItem.service_step === 1">用户提交</text>
				<text class="state" v-if="goodsItem.service_step === 2">审核中</text>
				<text class="state" v-if="goodsItem.service_step === 3">等待收货</text>
				<text class="state" v-if="goodsItem.service_step === 4">退款中</text>
				<text class="state" v-if="goodsItem.service_step === 5">退款完成</text>
				<text class="state" v-if="goodsItem.service_step === 6">审核不通过</text>
			</view>
			
			<view 
				class="goods-box-single"
			>
				<image class="goods-img" :src="goodsItem.sku_image" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp2">{{goodsItem.sku_name}}</text>
					<text class="price" style="float: left;">{{goodsItem.price.toFixed(2)}} 
						<text class="attr-box" style="float: right;">  x {{goodsItem.count}}</text>
					</text>
				</view>
			</view>
			
			<view class="price-box">
				实付款:
				<text class="price" style="margin-right: 20upx;color: #333;">{{price}}</text>
				退款金额:
				<text class="price">{{price}}</text>
			</view>
			
			<view class="action-box">
				<!-- <button class="action-btn" @click="replaceGoods(item.goods[goodsIndex])">退货/换货</button> -->
				<button class="action-btn recom" @click="lookDetails(goodsItem)">售后详情</button>
			</view>
			
		</view>
	</view>
</template> 

<script>
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import uniRequest from 'uni-request';
	import Json from '@/Json';
	import unikModal from '@/components/unik-modal/unik-modal.vue'
	export default {
		components: {
			uniLoadMore,
			empty,
			// unikModal,
			uniSection
		},
		data() {
			return {
				modalTitle: '退/换货',
				price:0,
				tabCurrentIndex: 0,
				orderList:[],
				navList: [],
			};
		},
		
		onLoad(options){
			this.getDate()
		},
	    onShow(){
			 
		},
		methods: {
			async getDate(){
				await uniRequest({
					url:'/mobile/order/list/return/goods/user/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res)
					res.data.forEach(ele=>{
						this.price += ele.price * ele.count
					})
					this.price = this.price.toFixed(2)
					this.navList = res.data
				}).catch(error=>{
					console.log(error)
				})
			},
			lookDetails(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/order/postSale/postDetails?sub_id='+item.sub_order_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		height: 100%;
		padding: 30upx;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding: 30upx;
		background: #fff;
		border-radius: 20upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
				color: #666666;
				font-size: 14px;
			}
			.state{
				color: #EE1D23;
				font-size: 28upx;
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
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 170upx;
				height: 170upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 48upx;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: #EE1D23;
					margin-top: 10px;
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
			font-size: 28upx;
			color: #333333;
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
			height: 120upx;
			position: relative;
		}
		.action-btn{
			width: 190upx;
			height: 70upx;
			margin: 0;
			margin-top: 20upx;
			text-align: center;
			line-height: 70upx;
			font-size: 28upx;
			color: $font-color-dark;
			background: #fff;
			&:after{
				border-radius: 100px;
				border-width: 4upx;
			}
			&.recom{
				background: #FFFFFF;
				color: #EE1D23;
				&:after{
					border-color: #EE1D23;
				}
			}
		}
	}
	
	textarea{
		width: 100%;
		height: 420upx;
		background-color: #white;
		font-size: 16px;
		color: #898989;
		padding: 24upx;
		box-sizing: border-box;
		line-height: 40upx
	}
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>



