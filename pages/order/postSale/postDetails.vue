<template>
	<view class="contents">
		<view class="order-title">
			<view class="title-info">
				<u-image width="80upx" height="80upx" style="display: inline-block;float: left;" src="../../../static/images/order/tksuccess.png"></u-image>
				<text class="info-money">{{title}}</text>
			</view>
		</view>
		<view class="post-item">
			<view class="goods-box-single">
				<u-cell-group>
					<u-cell-item title="退款总额"  :arrow="false" :value="'￥'+goodItem.price.toFixed(2)"></u-cell-item>
					<u-cell-item title="协商记录"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
		
		<view class="order-item">
			<view class="i-top b-b">
				<text class="time">退款详情</text>
				<text class="state" :style="{color: goodItem.stateTipColor}">{{goodItem.stateTip}}</text>
			</view>
			
			<view class="goods-box-single">
				<image class="goods-img" :src="goodItem.sku_image" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp2">{{goodItem.sku_name}}</text>
					<text class="price" style="float: left;">{{goodItem.price}} 
						<text class="attr-box" style="float: right;">  x {{goodItem.count}}</text>
					</text>
				</view>
			</view>
			<view class="list-cell">
				<list-cell title="订单编号" :tips="goodItem.order_id"></list-cell>
				<list-cell title="数量" :tips="goodItem.count+''"></list-cell>
				<list-cell title="售后原因" :tips="goodItem.cause"></list-cell>
				<list-cell title="售后类型" :tips="goodItem.service_type === 1 ? '退货' : '换货'" ></list-cell>
				<list-cell title="服务步骤" v-if="goodItem.service_step === 1" tips="用户提交"></list-cell>
				<list-cell title="服务步骤" v-if="goodItem.service_step === 2" tips="后台审核中"></list-cell>
				<list-cell title="服务步骤" v-if="goodItem.service_step === 3" tips="审核通过"></list-cell>
				<list-cell title="服务步骤" v-if="goodItem.service_step === 4" tips="退款中"></list-cell>
				<list-cell title="服务步骤" v-if="goodItem.service_step === 5" tips="退款完成"></list-cell>
				<list-cell title="提交时间" :tips="(goodItem.create_time || '').split('T')[0] + ' ' + goodItem.create_time.split('T')[1].split('.')[0]"></list-cell>
				<list-cell title="更新时间" :tips="goodItem.update_time.split('T')[0] + ' ' + goodItem.update_time.split('T')[1].split('.')[0]"></list-cell>
				<list-cell title="拒绝理由" :tips="goodItem.close_cause"></list-cell>
			</view>
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
				subId: '',
				goodItem:{},
				title:'',
			};
		},
		
		onLoad(options){
			this.subId = options.sub_id
		},
	    onShow(){
			 this.getDate()
		},
		methods: {
			async getDate(){
				await uniRequest({
					url:'/mobile/order/list/return/goods/user/',
					method:'get',
					params:{sub_id:this.subId},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res)
					res.data.forEach(ele=>{
						this.goodItem = res.data[0]
						console.log(this.goodItem)
					})
					if(this.goodItem.service_step === 1){
						this.title = '用户提交'
					}else if(this.goodItem.service_step === 2){
						this.title = '后台审核中'
					}else if(this.goodItem.service_step === 3){
						this.title = '审核通过'
					}else if(this.goodItem.service_step === 4){
						this.title = '退款中'
					}else if(this.goodItem.service_step === 5){
						this.title = '退款完成'
					}else{
						this.title = '审核不通过'
					}
				}).catch(error=>{
					console.log(error)
				})
			},
		},
		
	}
</script>

<style lang="scss">
	/deep/ .u-cell__value{
		color: #EE1D23;
		font-size: 32upx;
	}
	/deep/ .u-border-top:after{
		border-top-width:0!important;
	}
	/deep/ .u-border-bottom:after{
		border-bottom-width:0!important;
	}
	/deep/ .b-b:after, .b-t:after{
		border-bottom: 0;
	}
	/deep/ .mix-list-cell .cell-more{
		display: none;
	}
	.contents{
		background: $page-color-base;
		height: 100%;
		padding: 30upx;
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
		height: 200upx;
		background: #fff;
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.title-info{
			font-size: 32upx;
			color: #000;
			.info-time{
				margin-top: 20upx;
			}
			.info-money{
				height: 80upx;
				line-height: 80upx;
				margin-left: 20upx;
				color: #333333;
				font-size: 38upx;
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
	
	.post-item{
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-top: 30upx;
		border-radius: 20upx;
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			border-radius: 20upx;
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
	}
	
	.order-item{
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-top: 30upx;
		
		border-radius: 20upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding:0 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
				color: #333333;
				font-size: 32upx;
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
				width: 170upx;
				height: 170upx;
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
			border-radius: 20upx;
			padding: 30upx;
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
					line-height: 50upx;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: red;
					margin-top: 20upx;
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



