<template>
	<view class="content" style="width: 100%;">
		<view class="order-item">
			<view class="goods-box-single">
				<image class="goods-img" :src="goodItem.image" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp2">{{goodItem.title}}</text>
					<text class="price" style="float: left;">{{goodItem.price}} 
						<text class="attr-box" style="float: right;">  x {{goodItem.count}}</text>
					</text>
				</view>
			</view>
		</view>
		<view class="rate_type">
			<view class="address" v-for="(ele,index) in radioItems" :key="index" @click="changeItem(ele)">
				<view class="add-left">
					<u-image width="50upx" height="50upx" :src="ele.image"></u-image>
				</view>
				<view class="add-center">
					<view class="add-title">
						<text class="add-name">{{ele.value}}</text>
					</view>
					<view class="add-address">
						<text>{{ele.info}}</text>
					</view>
				</view>
				<view class="add-right">
					<i class="yticon icon-you"></i>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				goodItem:{},
				type:1,
				orderId:null,
				subOrderId:null,
				radioItems: [
					{
						type:1,
						value: '退货',
						info:'需要退还已收到的货物',
						image:'../../../static/order/tuihuo.png',
					},
					{
						type:2,
						value: '换货',
						info:'对收到的货物不满意，需要换货',
						image:'../../../static/order/huanhuo.png',
					}
				],
			}
		},
		onLoad(options){
			console.log(options)
			this.orderId = options.order_id
			this.subOrderId = options.sub_order_id
			this.goodItem = JSON.parse(decodeURIComponent(options.item))
		},
		methods: {
			changeItem(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/order/lookDetails/afterSalesDetails?type='+item.type+'&item=' + encodeURIComponent(JSON.stringify(this.goodItem))+'&orderId='+this.orderId + '&subOrderId='+this.subOrderId
				})
			},
			
			radioChange(e) {
				console.log(e)
				var checked = e.target.value
				var changed = {}
				this.type = e.target.value
				if(this.type === '退货'){
					this.type = 1
				}else{
					this.type = 2
				}
				for (var i = 0; i < this.radioItems.length; i++) {
					if (checked.indexOf(this.radioItems[i].name) !== -1) {
						changed['radioItems[' + i + '].checked'] = true
					} else {
						changed['radioItems[' + i + '].checked'] = false
					}
				}
				
			},
		}
	}
</script>
<style lang="scss">
	.content{
		height: 100%;
		padding: 30upx;
	}
	
	.order-item{
		display: flex;
		flex-direction: column;
		padding: 30upx;
		background: #fff;
		height: 250upx;
		border-radius: 20upx;
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
			.goods-img{
				display: block;
				width: 170upx;
				height: 170upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 30upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 24px;
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
	
	.rate_type{
		width: 100%;
		height: 280upx;
		background-color: #fff;
		margin-top: 30upx;
		border-radius: 20upx;
		.address{
			height: 140upx;
			padding: 0 10upx;
			.add-left{
				width: 10%;
				float: left;
				height: 100%;
				line-height: 70px;
				padding: 10px;
			}
			
			.add-center{
				width: 80%;
				height: 100%;
				float: left;
				margin-left: 30upx;
				.add-title{
					height: 80upx;
					line-height: 80upx;
					.add-name{
						font-size: 32upx;
						color: #333333;
					}
				}
				.add-address{
					font-size: 28upx;
					color: #333333;
				}
			}
			
			.add-right{
				height: 100%;
				float: left;
				.icon-you{
					float: right;
					font-size: 36upx;
					color: #333;
					line-height: 140upx;
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

