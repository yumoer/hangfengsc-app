<template>
	<view id="page">
		<view class="main">
			<view class="banner">
				<image src="/static/cqtg/banner.png" mode=""></image>
			</view>
			<view class="server">
				<view class="head">
					<text class="title">服务类</text>
					<!-- <text class="more">查看更多<text class="yticon icon-you"></text></text> -->
				</view>
				<view class="content">
					<view class="wrap">
						<view class="left" @click="goTo('/pages/index/subject/wxfw/wxfw')">
							<image src="/static/cqtg/wxfw.png" mode=""></image>
						</view>
						<view class="right">
							<view class="top" @click="goTo('/pages/product/list?tid=807')">
								<image src="/static/cqtg/pxsj.png" mode=""></image>
							</view>
							<view class="bottom">
								<view class="b_left" @click="goTo('/pages/index/subject/bgsb/bgsb')">
									<image src="/static/cqtg/flzx.png" mode=""></image>
								</view>
								<view class="b_right" @click="goTo('/pages/index/subject/bghc/bghc')">
									<image src="/static/cqtg/jypx.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="commodity" v-if="commodityList.length > 0">
				<view class="head">
					<text class="title">商品类</text>
					<!-- <text class="more">查看更多<text class="yticon icon-you"></text></text> -->
				</view>
				<view class="content">
					<view class="wrap" v-for="(item,index) in commodityList" :key="index" @click="goToPage(item)">
						<view class="img">
							<u-lazy-load :image="item.image1"></u-lazy-load>
						</view>
						<view class="name">
							<text>{{item.name}}</text>
						</view>
						<view class="info">
							<text class="price"><b>￥</b>{{item.price}}</text>
							<text class="scale">{{item.sales}}人付款</text>
						</view>
					</view>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		data() {
			return {
				commodityList:[],
				imageList:[
					{image:'/static/cqtg/wxfw.jpg',path:'/pages/index/subject/wxfw/wxfw'},
					{image:'/static/cqtg/jypx.jpg',path:'/pages/index/subject/bghc/bghc'},
					{image:'/static/cqtg/flzx.jpg',path:'/pages/index/subject/bgsb/bgsb'},
					{image:'/static/cqtg/pxsj.jpg',path:'/pages/product/list?tid=807'}
				],
				loadingType: 'more', //加载更多状态
				page:1,
				page_size:10
			}
		},
		components:{uniLoadMore},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			// console.lgggog(e)
			const index = e.index;
			console.log(index)
			if(index === 0){
				uni.navigateTo({
					url:'/pages/search/search_cq'
				})
			}
		},
		//加载更多
		onReachBottom(){
			this.page_size = this.page_size + 10
			this.getData(); 
		},
		mounted() {
			this.getData()
		},
		methods: {
			async getData(type='add', loading){
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				let sendData = {sku_type:0,page:this.page,page_size:this.page_size}
				const res = await uniRequest({
					url:'/groups/category/goods/',
					method:'get',
					params:sendData,
				}).then(res=>{
					// console.log(res.data)
					this.commodityList = res.data.results
					if(this.commodityList.length === 0){
						this.loadingType = 'nomore';
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			goTo(path){
				uni.navigateTo({
					url:path
				})
			},
			goToPage(data){
				uni.navigateTo({
					url:'/pages/product/product?id='+data.id+'&value=undefined'
				})
			}
		},
	}
</script>

<style lang="stylus" scoped>
/deep/ .uni-swiper-dot-active{
	background-color #e01222
	width 24px
	height 8px
	border-radius 5px
	margin-right 5px
}

#page{
	width 100%
	height 100%
	background-color #f5f5f5
	.main{
		width 100%
		height 100%
		padding 15px
		.banner{
			width 100%
			height 200px
			image{
				width 100%
				height 100%
				border-radius 5px
			}
		}
		.server{
			width 100%
			height 100%
			.head{
				width 100%
				height 60px
				line-height 60px
				.title{
					font-size 18px
					font-weight bold
					float left
				}
				.more{
					font-size 14px
					float right
					color #999999
				}
			}
			.content{
				width 100%
				height 180px
				.wrap{
					width 100%
					height 100%
					.left{
						width 166px
						height 166px
						display inline-block
						float left
						image{
							width 100%
							height 100%
						}
					}
					.right{
						width 166px
						height 166px
						display inline-block
						float right
						.top{
							width 100%
							height 80px
							image{
								width 100%
								height 100%
							}
						}
						.bottom{
							width 100%
							height 80px
							margin-top 6px
							.b_left{
								width 80px
								height 100%
								float left
								image{
									width 100%
									height 100%
								}
							}
							.b_right{
								width 80px
								height 100%
								float right
								image{
									width 100%
									height 100%
								}
							}
						}
					}
				}
			}
		}
		.commodity{
			width 100%
			height 100%
			.head{
				width 100%
				height 60px
				line-height 60px
				.title{
					font-size 18px
					font-weight bold
					float left
				}
				.more{
					font-size 14px
					float right
					color #999999
				}
			}
			.content{
				width 100%
				height 100%
				.wrap{
					width 48%
					height 250px
					background-color #fff
					display inline-block
					margin-bottom 16px
					border-radius 5px
					&:nth-child(2n+1){
						margin-right: 4%;
					}
					.img{
						width 100%
						height 165px
						image{
							width 100%
							height 100%
						}
					}
					.name{
						margin 5px
						font-weight 500
						overflow hidden
						text-overflow ellipsis
						display -webkit-box
						color #333
						-webkit-box-orient vertical
						-webkit-line-clamp 2
					}
					.info{
						width 100%
						height 20px
						line-height 20px
						padding 5px
						.price{
							color #ee0122
							font-weight bold
							float left
							b{
								font-size 12px
								font-weight 400
							}
						}
						.scale{
							color #AEAEAE
							float right
							font-size 12px
						}
					}
				}
			}
		}
	}
}
</style>
