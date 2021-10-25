<template>
	<view class="content" style="width: 100%;">
		<view class="order-title">
			<view class="title-info">
				<view class="info-money">{{title}}</view>
				<view class="info-time">订单号: {{goodsItem.order_id}}</view>
			</view>
		</view>
		<view class="c-list">
			<view class="c-row b-b">
				<text class="tit">订单编号</text>
				<view class="con-list">
					<text>{{goodsItem.order_id}}</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">订单状态</text>
				<view class="con-list">
					<text>订单{{goodsItem.state === 5?'已完成':''}}</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">订单总额</text>
				<view class="bz-list con">
					<text><!-- ￥ -->{{goodsItem.total_amount}}元</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">支付方式</text>
				<view class="bz-list con">
					<text v-if="goodsItem.pay_method === 1">货到付款</text>
					<text v-if="goodsItem.pay_method === 2">支付宝支付</text>
					<text v-if="goodsItem.pay_method === 8">微信支付</text>
					<text v-if="goodsItem.pay_method === 9">余额支付</text>
				</view>
			</view>
		</view>
		<view class="order-item" v-for="(goodItem,goodIndex) in goodsItem.goods" :key="goodIndex">
			<view class="goods-box-single">
				<image class="goods-img" :src="goodItem.image" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{goodItem.title}}</text>
					<text class="price" style="float: left;">{{goodItem.price}} 
						<text class="attr-box" style="float: right;">  x {{goodItem.count}}</text>
					</text>
				</view>
			</view>
			
			<view class="price-box" >
				实付款
				<text class="price">{{goodsItem.total_amount}}</text>
			</view>
			
			<view>
				<view class="action-box b-t" v-if="goodsItem.order_status === 1">
					<button class="action-btn recom" @click="editAddress(goodsItem)">修改地址</button>
				</view>
				<view class="action-box b-t" v-if="goodsItem.order_status === 3">
					<button class="action-btn recom" @click="lookViewOrder(goodsItem)">查看物流</button>
				</view>
				<view class="action-box b-t" v-if="goodsItem.order_status === 4">
					<button class="action-btn" @click="replaceGoods(goodItem)">退换</button>
					<button class="action-btn recom" v-if="!goodItem.comment" @click="accessOrder(goodItem,goodsItem)">立即评价</button>
				</view>
				<view class="action-box b-t" v-if="goodsItem.order_status === 6">
					<button class="action-btn recom" @click="replaceDetails(goodsItem)">退换详情</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import listCell from '@/components/mix-list-cell';
	export default {
		comments:{listCell},
		data() {
			return {
				goodsItem:[],
				orderId:'',
				title:'订单已生成',
				navList:[]
			}
		},
		onLoad(options){
			console.log(options)
			this.orderId = options.order_id
			this.getDate()
		},
		methods: {
			async getDate(){
				/* await uniRequest({
					url:'mobile/order/list/return/goods/user/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res)
					this.navList = res.data
					console.log(this.navList)
				}).catch(error=>{
					console.log(error)
				}) */
				
				await uniRequest({
					url:'/wxapp/order/info/',
					method:'get',
					params:{
						sub_order_id:this.orderId
					},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					this.goodsItem = res.data
					this.goodsItem.state = this.navList.state
				}).catch(error=>{
					console.log(error)
				})
			},
			// 退货/换货
			replaceGoods(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/order/lookDetails/concalShops?item='+encodeURIComponent(JSON.stringify(item))+'&order_id='+this.goodsItem.order_id+'&sub_order_id='+this.goodsItem.sub_order_id
				})
			},
			
			// 修改地址
			editAddress(item){
				this.$api.msg('修改地址')
			},
			
			// 物流信息
			async lookViewOrder(item){
				uni.navigateTo({
					url:'/pages/order/trackInfo/trackInfo?order_id='+item.order_id
				})
			},
			
			replaceDetails(item){
				console.log(item)
				console.log(this.navList)
				if(this.navList !== undefined){
					this.navList.forEach(ele=>{
						if(ele.sku_id === item.sku_id){
							item = ele
						}
					})
				}
				uni.navigateTo({
					url:'/pages/order/postSale/postDetails?item='+encodeURIComponent(JSON.stringify(item))
				})
				
			},
			
			// 评价订单
			accessOrder(item,data){
				uni.navigateTo({
					url:'/pages/order/assess/assess?item='+encodeURIComponent(JSON.stringify(item))+'&order_id='+data.order_id+'&sub_order_id='+data.sub_order_id
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
	
	.order-title{
		width: 100%;
		height: 220upx;
		background: #fa436a;
		.title-info{
			font-size: 32upx;
			color: #fff;
			padding: 60upx 100upx;
			.info-time{
				margin-top: 10upx;
			}
		}
	}
	
	.c-list{
		font-size: $font-sm + 6upx;
		color: $font-color-base;
		background: #fff;
		margin-top: 16upx;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.item-info{
			font-size: 36upx;
			padding: 20upx 0;
		}
		.goods-info{
			font-size: 32upx;
			padding: 10upx;
		}
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
		height: 240upx;
		background-color: #white;
		font-size: 16px;
		color: #898989;
		padding: 24upx;
		box-sizing: border-box;
		line-height: 40upx
	}
	
</style>

