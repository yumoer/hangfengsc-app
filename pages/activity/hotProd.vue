<template>
	<view class="content">
		<view class="body">
			<view class="item-list" v-for="(item,index) in newProdList" :key="index" v-if="index > 2" @click="navToPage(item)">
				<view class="item-image">
					<image style="width: 260upx;height: 260upx;" :src="item.image" mode=""></image>
				</view>
				<view class="item-right">
					<view class="logo">
						<image style="width: 148upx;height: 48upx;" src="http://47.94.106.106:8888/group1/M00/59/0D/rBHxiGE5rBeAFBaoAAAn4s8TgZM4842666" mode=""></image>
					</view>
					<view class="title clamp2">
						{{item.title}}
					</view>
					<view class="info">
						<view class="price">
							爆款价
							<text>{{item.text}}</text>
						</view>
						<view class="stock">
							<text>{{item.sales}}人付款</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				newProdList:[]
			};
		},
		onLoad(options){
			console.log(options)
		},
		onShow() {
			uni.showLoading({
				title:'加载中...'
			})
			this.getNewProd()
		},
		methods:{
			async getNewProd(){
				await uniRequest({
					url:'/content/index/floor/',
					method:'POST',
					data:{
						key:'index_hwtj'
					}
				})
				.then(res=>{
					console.log(res.data)
					this.newProdList = res.data;
					uni.hideLoading()
				}).catch(error=>{
					console.log(error)
				})
			},
			navToPage(item,value){
				uni.navigateTo({
					url:'/pages/product/product?id='+item.id+'&value='+value
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		width:100%;
		min-height:100%;
		background: #060B83 url("http://47.94.106.106:8888/group1/M00/59/0B/rBHxiGE5qMiARtm9AAVzm3F1Qz49599976") no-repeat top center / 100%;
		position: relative;
		padding: 0 30upx;
		.content{
			width: 100%;
			position: relative;
			padding-top: 410upx;
			padding-bottom: 36rpx;
			box-sizing: border-box;
			.header{
				width: 100%;
				display: flex;
				justify-content: center;
				.goods{
					width: 100%;
					height: 340upx;
					.item{
						width: 30%;
						display: inline-block;
						margin: 20px -10px 15px 15px;
						&:last-child{
							margin-right: 0;
						}
						.price{
							width: 100px;
							text-align: center;
							color: #fff;
							font-size: 28upx;
							margin-top: 10upx;
						}
					}
				}
			}
			.body{
				width: 100%;
				height: 100%;
				padding: 30upx;
				margin-top: 30upx;
				background-color: #fff;
				border-radius: 20upx;
				.item-list{
					height: 280upx;
					.item-image{
						float: left;
						width: 45%;
					}
					.item-right{
						float: left;
						width: 55%;
						.logo{
							
						}
						.title{
							color: #333333;
							font-size: 32upx;
						}
						.info{
							margin-top: 60upx;
							.price{
								color: #EE1D23;
								font-size: 28upx;
								float: left;
								text{
									font-size: 32upx;
								}
							}
							.stock{
								float: right;
								color: #999999;
								font-size: 24upx;
							}
						}
					}
				}
			}
		}
		
	}
	
</style>
