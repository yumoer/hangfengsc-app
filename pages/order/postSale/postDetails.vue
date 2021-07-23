<template>
	<view class="content" v-if="goodsItem !== undefined">
		<view class="order-title">
			<view class="title-info">
				<view class="info-money">{{title}}</view>
				<view class="info-time">订单号: {{goodsItem.order_id}}</view>
			</view>
		</view>
		<view class="order-item">
			<view class="i-top b-b">
				<text class="time">{{(goodsItem.update_time).split('T')[0]}} {{(goodsItem.update_time).split('T')[1].split('.')[0]}}</text>
				<text class="state" :style="{color: goodsItem.stateTipColor}">{{goodsItem.stateTip}}</text>
			</view>
			
			<view 
				class="goods-box-single"
			>
				<image class="goods-img" :src="goodsItem.sku_image" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{goodsItem.sku_name}}</text>
					<text class="price" style="float: left;">{{goodsItem.price}} 
						<text class="attr-box" style="float: right;">  x {{goodsItem.count}}</text>
					</text>
				</view>
			</view>
			
			<view class="price-box" >
				已退款
				<text class="price">{{(goodsItem.price * goodsItem.count).toFixed(2)}}</text>
			</view>
		</view>
		<view class="history-section icon">
			
			
			<list-cell title="订单编号" :tips="goodsItem.order_id"></list-cell>
			<!-- <list-cell style="background: #fff;" title="商品名称" :tips="goodsItem.goods_name"></list-cell> -->
			<list-cell title="数量" :tips="goodsItem.count+''"></list-cell>
			<list-cell title="售后原因" :tips="goodsItem.cause"></list-cell>
			<view style="background: #fff;" >
				<view class="sec-header" v-if="goodsItem.images.length > 0">
					<text>图片凭证</text>
				</view>
				<scroll-view scroll-x class="h-list" v-if="goodsItem.images.length > 0">
					<image style="border: solid 1px #ddd;"  v-for="(img,index) in goodsItem.images" :key="index" :src="img" mode="aspectFill"></image>
				</scroll-view>
			</view>
			
			<list-cell title="售后类型" :tips="goodsItem.service_type === 1 ? '退货' : '换货'" ></list-cell>
			<list-cell title="服务步骤" v-if="goodsItem.service_step === 1" tips="用户提交"></list-cell>
			<list-cell title="服务步骤" v-if="goodsItem.service_step === 2" tips="后台审核中"></list-cell>
			<list-cell title="服务步骤" v-if="goodsItem.service_step === 3" tips="审核通过"></list-cell>
			<list-cell title="服务步骤" v-if="goodsItem.service_step === 4" tips="退款中"></list-cell>
			<list-cell title="服务步骤" v-if="goodsItem.service_step === 5" tips="退款完成"></list-cell>
			<list-cell title="提交时间" :tips="goodsItem.create_time.split('T')[0] + ' ' + goodsItem.create_time.split('T')[1].split('.')[0]"></list-cell>
			<list-cell title="更新时间" :tips="goodsItem.update_time.split('T')[0] + ' ' + goodsItem.update_time.split('T')[1].split('.')[0]"></list-cell>
			<list-cell title="拒绝理由" :tips="goodsItem.close_cause"></list-cell>
		</view>
	</view>
</template> 

<script>
	import uniRequest from 'uni-request';
	import listCell from '@/components/mix-list-cell';
	export default {
		components:{listCell},
		data() {
			return {
				goodsItem: {},
				title:'退款成功',
			};
		},
		
		onLoad(options){
			this.goodsItem = JSON.parse(options.item)
		},
	    onShow(){
			 this.getDate(this.goodsItem)
		},
		methods: {
			async getDate(item){
				await uniRequest({
					url:'mobile/order/list/return/goods/user/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res)
					res.data.forEach(ele=>{
						if(ele.sku_id === item.sku){
							this.goodsItem = ele
						}
					})
					if(this.goodsItem.service_step === 1){
						this.title = '用户提交'
					}else if(this.goodsItem.service_step === 2){
						this.title = '后台审核中'
					}else if(this.goodsItem.service_step === 3){
						this.title = '审核通过'
					}else if(this.goodsItem.service_step === 4){
						this.title = '退款中'
					}else if(this.goodsItem.service_step === 5){
						this.title = '退款完成'
					}else{
						this.title = '审核不通过'
					}
					
				}).catch(error=>{
					console.log(error)
				})
			},
			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+state){
					case 1:
						stateTip = '待付款'; break;
					case 2:
						stateTip = '待发货'; break;
					case 3:
						stateTip = '待收货'; break;
					case 4:
						stateTip = '待评价'; break;
					case 5:
						stateTip = '已完成'; break;
					case 9:
						stateTip = '订单已关闭'; 
						stateTipColor = '#909399';
						break;
						
					//更多自定义
				}
				return {stateTip, stateTipColor};
			}
		},
		
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	.cell-tip{
		width: 60%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.order-title{
		width: 100%;
		height: 220upx;
		background: #fa436a;
		.title-info{
			font-size: 32upx;
			color: #fff;
			padding: 60upx 100upx;
			.info-time{
				margin-top: 20upx;
			}
		}
	}
	
	.history-section{
		margin-top: 20upx;
		border-radius:10upx;
		.content{
			color: #fff;
			background: #fff;
		}
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.mix-list-cell{
				padding: 0 15px;
			}
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
			.scoll-wrapper{
				display:flex;
				align-items: flex-start;
			}
			.floor-item{
				width: 180upx;
				margin-right: 20upx;
				font-size: $font-sm+2upx;
				color: $font-color-dark;
				line-height: 1.8;
				image{
					width: 180upx;
					height: 180upx;
					border-radius: 6upx;
				}
				.price{
					color: $uni-color-primary;
					text-align: center;
					display: inherit;
				}
			}
		}
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
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
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



