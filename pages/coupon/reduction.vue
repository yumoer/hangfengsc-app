<template>
	<view class="content">
		<view class="goods-list" :style="{'margin-bottom': isCheck ? '65px' : '0'}" v-if="goodsList.length > 0">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
			>
				<u-checkbox-group v-if="isCheck" style="float: left;height: 105px;">
					<u-checkbox v-model="item.checked" :name="item.id" @change="checkboxChange" active-color="red"></u-checkbox>
				</u-checkbox-group>
				<view class="image-wrapper" @click="navToDetailPage(item)">
					<image :src="item.sku.default_image_url" mode="aspectFill" style="float: left;"></image>
				</view>
				<view class="goodsInfo" :style="{'width':isCheck ? '330upx' : '400upx'}">
					<text class="title clamp2" @click="navToDetailPage(item)">{{item.sku.title}}</text>
					<view class="price-box">
						<text class="price">{{item.sku.price}}</text>
					</view>
					<view class="goodsBox">
						<button class="goodsBtn" type="default">看相似</button>
						<text class="goodsCart" @click="joinCart(item)" v-if="!item.disabled">
							<i class="yticon icon-gwc-wei"></i>
						</text>
					</view>
				</view>
			</view>
			<show-modal></show-modal>
			<!-- 底部菜单栏 -->
			<view class="action-section" v-if="isCheck">
				<u-checkbox-group class="checkbox">
					<u-checkbox @change="checkedAll" v-model="checked" active-color="red">全选</u-checkbox>
				</u-checkbox-group>
				<view class="total-box"></view>
				<button type="primary" class="no-border confirm-btn" @click="toFavorite(selected)">取消收藏 ({{selected.length}})</button>
			</view>
		</view>
		<view v-else>
			<xw-empty :isShow="isEmpty" img="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttGKATO_0AAGQ7uLi61Q1437097" path="" btnText="" text="您还没有添加收藏" textColor="#C0C4CC"></xw-empty>
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
				selected:[],
				cartList:[],
				couponId:0,
				favorite:true,
				isEmpty:false,
				checked:false,
				isCheck:false
			};
		},
		components:{xwEmpty},
		onLoad(options){
			console.log(options,document.getElementsByClassName('uni-btn-icon'))
		},
		onShow() {
			this.ifFavorite();
			this.getCartList();
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			console.log(index)
			if(index === 0 && this.goodsList.length > 0){
				this.isCheck = !this.isCheck
				this.selected = []
				this.goodsList.forEach(ele=>{
					ele.checked = false;
				})
			}else{
				this.$api.msg('没有数据暂不能编辑')
			}
		},
		watch:{
			//显示空白页
			goodsList(e){
				let empty = e.length === 0 ? true: false;
				if(this.isEmpty !== empty){
					this.isEmpty = empty;
				}
			}
		},
		methods: {
			//详情
			navToDetailPage(item){
				console.log(item)
				let id = item.sku.id
				let skuId = item.id
				console.log(id)
				//测试数据没有写id，用title代替
				uni.navigateTo({
					url: `/pages/product/product?id=${id}&value=undefined&skuId=${skuId}`
				})
			},
			
			getCartList(){
				const response = uniRequest({
					url:'/carts/cart_sku/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.status === 200 || res.status === 201){
						this.cartList = res.data;
						console.log(this.cartList)
					}else{
						if(res.status === 500){
							this.$api.msg('服务器错误，请稍后重试')
						}
					}
				}).catch(error=>{
					console.log('222',error)
				})
			},
			
			ifFavorite(){
				uni.showLoading()
				uniRequest({
					url: '/carts/collection/',
					method: 'GET',
					params:{page:1,page_size:10},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					if(res.status === 200){
						uni.hideLoading()
						res.data.results.forEach(ele=>{
							ele.checked = false;
							ele.disabled = false;
						})
						this.goodsList = res.data.results
						this.goodsList.forEach(item=>{
							this.cartList.forEach(ele=>{
								if(item.sku.id === ele.id){
									item.disabled = true;
								}
							})
						})
					}
				}).catch(error => {
					console.log(error);
				})
			},
			
			// 取消收藏
			toFavorite(item){
				console.log(item)
				item.forEach(ele=>{
					uni.showLoading()
					uniRequest({
						url: '/carts/collection/'+ele.name+'/',
						method: 'DELETE',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res,res.data.results)
						if(res.status === 204){
							this.favorite = false
							this.isCheck = false
							this.ifFavorite()
							setTimeout(()=>{
								uni.hideLoading()
								this.$api.msg('取消收藏成功')
								this.getCartList()
							},500)
						}
					}).catch(error => {
						console.log(error);
					})
				})
				
			},
			
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e)
				if(e.value === true){
					this.selected.push(e)
				}else{
					this.selected.splice(e,1)
				}
				if(this.goodsList.length === this.selected.length){
					this.checked = true
				}else{
					this.checked = false
				}
			},
			
			// 全选
			checkedAll() {
				let selected = []
				this.goodsList.forEach(ele=>{
					selected.push({value:ele.checked,name:ele.id})
					if(this.checked === true){
						ele.checked = false
						this.selected = []
					}else{
						ele.checked = true
						this.selected = selected
					}
				})
			},
			
			joinCart(item){
				console.log(item)
				this.$showModal({
					title:'提示',
					content: '是否确认加入购物车?',
					cancelText:"取消",
					confirmText:"确认",
				    success: (e)=>{
				    	if(e.confirm){
							uniRequest({
								url: '/carts/cart_sku/',
								method: 'POST',
								data:{
									"count": 1,
									"sku_id": item.sku.id
								},
								headers: {
									Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
								},
							}).then(res => {
								console.log(res,res.data.results)
								if(res.status === 201){
									this.isCheck = false;
									this.ifFavorite();
									this.getCartList()
									setTimeout(()=>{
										this.$api.msg('加入购物车成功')
									},500)
								}
							}).catch(error => {
								console.log(error);
							})
				    	}
				    }
				});
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
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
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 100%;
			padding: 30upx;
			margin-top: 30upx;
			border-radius: 20upx;
			background-color: #fff;
			display: inline-block;
			&:nth-child(1){
				margin-top: 0;
			}
		}
		.image-wrapper{
			width: 200upx;
			height: 200upx;
			border-radius: 3px;
			overflow: hidden;
			float: left;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		
		.goodsInfo{
			float: left;
			display: inline-block;
			margin-left: 30upx;
			.goodsBtn{
				width: 156rpx;
				font-size: 28upx;
				float: left;
				margin-top: 20upx;
				color: #FF0000;
				background-color: #fff;
				border-radius: 40upx;
				border: 1px solid #FF0000;
				height: 60upx;
				line-height: 60upx;
			}
			.goodsCart{
				color: #FF0000;
				float: right;
				display: block;
				font-size:60upx;
			}
		}
		
		.icon-gwc-wei{
			font-size: 54upx;
		}
		
		.title{
			float: right;
			font-size: 28upx;
			height: 80upx;
			line-height: 40upx;
			color: $font-color-dark;
			overflow: hidden;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
			z-index: 1;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 30upx;
			margin-top: 20upx;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
	}
	
	/* 底部栏 */
	.action-section{
		position:fixed;
		bottom:1px;
		margin-left: -15px;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		background: rgb(255,255,255);
		// box-shadow: 0 0 2px 0 rgba(0,0,0,.5);
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 45upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.allText{
			position:absolute;
			left: 80upx;
			top: 0;
			z-index: 4;
			width: 80upx;
			height: 52upx;
			line-height: 52upx;
			font-size: 16px;
			color: #666;
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				text{
					color: $font-color-dark;
				}
			}
		}
		.confirm-btn{
			padding: 0 40upx;
			height: 80upx;
			line-height: 80upx;
			margin-right: 30upx;
			font-size: $font-base + 2upx;
			background: $uni-color-hangfeng;
			border-radius: 60upx;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-hangfeng;
		font-size: 20px;
	}
</style>
