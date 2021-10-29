<template>
	<view class="content">
		<view class="guess-section">
			<view 
				v-for="(item, index) in couponList" :key="index"
				class="guess-item"
			>
				<view class="image-wrapper" @click="navToDetailPage(item)">
					<image style="border: 1px solid #ddd;" :src="item.default_image_url" mode="aspectFill"></image>
				</view>
				<text class="title clamp" @click="navToDetailPage(item)">{{item.title}}</text>
				<text style="display: inline-block;padding: 0 20upx;">
					<text class="price">￥{{item.price}}</text>
					<u-icon @click="joinCart(item)" name="shopping-cart" class="icon" size="28"></u-icon>
				</text>
			</view>
			<show-modal></show-modal>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				couponList:[]
			}
		},
		onLoad(options){
			
		},
		onShow() {
			this.getHistories()
		},
		methods: {
			async getHistories(){
				await uniRequest({
					url:'/user/browse_histories/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token,
					}
				}).then(res=>{
					console.log(res)
					this.$api.msg(res.status)
					this.couponList = res.data
				}).catch(error=>{
					this.histories = []
				})
			},
			navToDetailPage(item,value){
				console.log(item)
				//测试数据没有写id，用title代替
				if(item._source === undefined){
				    let id = item.id;
					uni.navigateTo({
						url: `/pages/product/product?id=`+id+'&value='+value
					})
				}else{
					let id = item._source.id;
					uni.navigateTo({
						url: `/pages/product/product?id=`+id+'&value='+value
					})
				}
			},
			async joinCart(item){
				this.$showModal({
					title:'提示',
				    content: '确认加入到购物车?',
					cancelText:"取消",
					confirmText:"确认",
				    success: async(e) =>{
				    	if(e.confirm){
							await uniRequest({
								url:'/carts/cart_sku/',
								method:'post',
								data:{sku_id: item.id, count: 1},
								headers:{
									Authorization:'JWT '+uni.getStorageSync('userInfo').token,
								},
								crossDomain: true,
								xhrFields: {
									withCredentials: true
								},
							}).then(res=>{
								console.log(res.data)
								if(res.data.selected === true){
									this.$api.msg(`加入购物车成功`);
								}
							}).catch(error=>{
								console.log(error)
							})
				    	}
				    }
				});
				
			},
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		padding: 30upx;
		.guess-section{
			display:flex;
			flex-wrap:wrap;
			width: 100%;
			.guess-item{
				display:flex;
				flex-direction: column;
				width: 48%;
				margin-bottom: 30upx;
				background: #fff;
				border-radius: 20upx;
				&:nth-child(2n+1){
					margin-right: 4%;
				}
			}
			.image-wrapper{
				width: 100%;
				height: 340upx;
				border-radius: 3px;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
					opacity: 1;
				}
			}
			.title{
				font-size: 28upx;
				padding: 0 20upx;
				color: $font-color-dark;
				line-height: 80upx;
			}
			.price{
				font-size: $font-lg;
				color: $uni-color-primary;
				line-height: 60upx;
			}
			.icon{
				float: right;
				padding: 10upx;
				border-radius: 50%;
				margin-top: 3px;
				color: #FFFFFF;
				background-color: #EE1D23;
			}
		}
	}
</style>
