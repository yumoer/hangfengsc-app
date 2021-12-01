<template>
	<view class="content">
		<view class="goods-list" v-if="goodsList.length > 0">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="item.default_image_url" mode="aspectFill"></image>
				</view>
				<text class="title">{{item.title}}</text>
				<view class="price-box">
					<text class="price">{{item.price}}</text>
					<text>销量 {{item.sales}}</text>
				</view>
			</view>
			
		</view>
		<view v-else>
			<xw-empty :isShow="isEmpty" img="/static/images/empty/emptyContent.png" path="/pages/index/index" btnText="去逛逛" text="暂无商品" textColor="#C0C4CC"></xw-empty>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import xwEmpty from '@/components/xw-empty/xw-empty';
	export default {
		data() {
			return {
				goodsList: [],
				couponId:0,
				isEmpty:false,
			};
		},
		components:{xwEmpty},
		onLoad(options){
			this.goodsList = JSON.parse(options.skus)
			console.log(this.goodsList)
		},
		watch:{
			//显示空白页
			goodsList(e){
				let empty = e.length === 0 ? true: false;
				console.log(this.isEmpty,empty)
				if(this.isEmpty !== empty){
					this.isEmpty = empty;
				}
			}
		},
		methods: {
			//详情
			navToDetailPage(item){
				console.log(item)
				let id = item.id
				//测试数据没有写id，用title代替
				uni.navigateTo({
					url: `/pages/product/product?id=${id}&value=undefined`
				})
			},
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 10upx;
	}

	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
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
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $base-color;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
 			font-size: 28upx;
			color: #555;
			position: relative;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
		.active{
			color: $base-color;
		}
	}

	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 30upx;
		margin-top: -8upx;
		.goods-item{
			display:flex;
			background: #fff;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-base;
			color: $font-color-text3;
			line-height: 50upx;
			padding: 0 10px;
			overflow:hidden;
			text-overflow:ellipsis;
			display:-webkit-box;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			padding: 10px;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	

</style>
