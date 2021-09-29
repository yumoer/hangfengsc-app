<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.png" mode="aspectFit"></image>
			<view class="" v-if="hasLogin">
				<view class="empty-tips">
					您的购物车还是空的
				</view>
				<button class="add-btn" @click="navTo('/pages/index/index')">去逛逛</button>
			</view>
			<view class="" v-else>
				<view class="empty-tips">
					您的购物车还是空的
				</view>
				<button class="add-btn" @click="navToLogin">去登陆</button>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view
						class="cart-item" 
						:class="{'b-b': index!==cartList.length-1}"
					>
						<view class="image-wrapper">
							<image :src="item.default_image_url" 
								:class="[item.loaded]"
								mode="aspectFill" 
								lazy-load 
								@click="gotoPath(item.id)" 
								@load="onImageLoad('cartList', index)" 
								@error="onImageError('cartList', index)"
							></image>
							<view 
								class="yticon icon-xuanzhong checkbox"
								:class="{checked: item.selected}"
								@click="check('item', index)"
							></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.title}}</text>
							<text class="attr">黑色 升级款</text>
							<text class="price">¥ <text style="font-size: 16px;">{{item.price}}</text></text>
							<uni-number-box
								class="step"
								:min="1" 
								:value="item.count"
								:isMin="item.count==1"
								:index="index"
								@change="numberChange(item.count,index)"
							></uni-number-box>
						</view>
						<!-- <text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text> -->
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image 
						:src="allChecked?'/static/selected2.png':'/static/select2.png'" 
						mode="aspectFit"
						@click="check('all')"
					></image>
					<text class="allText">全部</text>
					<!-- <view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view> -->
				</view>
				<view class="total-box">
					<text class="price">
						<text style="color: #666;">合计：</text>
						<text style="font-size: 10px;color:#EE1D23;">¥</text>
						<text style="font-size:16px;color:#EE1D23;font-weight: bold;">{{total}}</text>
					</text>
					<!-- <text class="coupon">
						已优惠<text>0.00</text>元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">结算 ({{selected.length}})</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import uniRequest from 'uni-request'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				selected:[], //选中的个数
			};
		},
		onShow(){
			document.getElementsByClassName('uni-page-head')[0].style = 'padding-right:10px;background:#fff;color:#000'
			this.loadData();
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			async loadData(){
				const response = await uniRequest({
					url:'/carts/cart_sku/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res.status)
					if(res.status === 200 || res.status === 201){
						let cartList = res.data.map((item,index)=>{
							this.$set(item, 'loaded', 'loaded');
							return item;
						});
						this.cartList = cartList;
						this.calcTotal();  //计算总价
					}else{
						if(res.status === 500){
							this.$api.msg('服务器错误，请稍后重试')
						}
					}
				}).catch(error=>{
					console.log('222',error)
				})
			},
			
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			gotoPath(id){
				uni.navigateTo({
					url: '/pages/product/product?id='+id
				})
			},
			navTo(url){
				uni.switchTab({
					url: url
				})
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			 //选中状态处理
			async check(type, index){
				// 单选
				if(type === 'item'){
					await uniRequest({
						url:'/carts/cart_sku/',
						method:'put',
						data:{
							sku_id: this.cartList[index].id,
							count: this.cartList[index].count,
							selected: !this.cartList[index].selected
						},
						headers:{
							Authorization:'JWT '+uni.getStorageSync('userInfo').token
						},
					}).then(res=>{
						this.cartList[index].selected = !this.cartList[index].selected;
					})
				}else{ // 全选
					const selected = !this.allChecked
					await uniRequest({
						url:'/carts/cart_skus/',
						method:'put',
						data:{selected:selected},
						headers:{
							Authorization:'JWT '+uni.getStorageSync('userInfo').token
						},
					}).then(res=>{
						console.log(res)
						if(res.status === 200){
							this.loadData()
						}else{
							this.$api.msg(res.data.message)
							
						}
					}).catch(err=>{
						console.log(err)
					})
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data,index){
				// this.cartList[index].count += Number(data+1);
				console.log(data,index)
				this.calcTotal();
			},
			//删除
			deleteCartItem(index){
				let list = this.cartList;
				let row = list[index];
				let id = row.id;
				uni.showModal({
					content: '删除当前商品？',
					success: async (e)=>{
						if(e.confirm){
							await uniRequest({
								url:'/carts/cart_sku/',
								method:'delete',
								data:{sku_id:id},
								headers:{
									Authorization:'JWT '+uni.getStorageSync('userInfo').token
								},
							}).then(res=>{
								this.cartList.splice(index, 1);
								this.$api.msg(`删除成功`);
								this.calcTotal();
								uni.hideLoading();
							})
						}
					}
				})
			},
			//清空
			clearCart(){
				uni.showModal({
					content: '清空购物车？',
					success:async (e)=>{
						if(e.confirm){
							await uniRequest({
								url:'/cart/select/',
								method:'delete',
								headers:{
									Authorization:'JWT '+uni.getStorageSync('userInfo').token
								},
							}).then(res=>{
								this.cartList = [];
								this.$api.msg(`全部商品删除成功`);
							})
						}
					}
				})
			},
			//计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let selected = true;
				let selectArr = [];
				list.forEach(item=>{
					if(item.selected === true){
						selectArr.push(item.selected)
						total += item.price * item.count;
					}else if(selected === true){
						selected = false;
					}
				})
				this.selected = selectArr;
				this.allChecked = selected;
				this.total = Number(total+'').toFixed(2);
			},
			//创建订单
			createOrder(){
				let list = this.cartList;
				let goodsData = [];
				list.forEach(item=>{
					if(item.selected){
						goodsData.push(item)
					}
				})
				if(goodsData.length !== 0){
					uni.navigateTo({
						url: `/pages/order/createOrder?type=2&data=`+encodeURIComponent(JSON.stringify(goodsData))
					})
				}else{
					this.$api.msg('购买商品不能为空')
				}
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background-color: #F8F8F8;
	}
	
	/deep/ .uni-numbox{
		background-color: #fff;
		left: 115px;
		position: relative;
	} 
	/deep/ .cart-item .checkbox{
		border-radius: none;
	}
	.container{
		padding-bottom: 134upx;
		/* 空白页 */
		.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 517.7upx;
				height: 360.425upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
			.add-btn{
				margin-top: 40upx;
				font-size: 32upx;
				color: #EE1D23;
				background-color: $base-color;
				border-radius: 50upx;
				background: #fff;
				/* border: 1px solid #EE1D23; */
				box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);	
				letter-spacing: 6upx;
			}
		}
	}
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		margin:20upx 20upx;
		padding: 20upx 20upx 20upx 40upx;
		background-color: #fff;
		border-radius: 10px;
		.image-wrapper{
			width: 200upx;
			height: 200upx;
			flex-shrink: 0;
			position:relative;
			margin-left: 10px;
			image{
				border-radius:8upx;
			}
		}
		.checkbox{
			position:absolute;
			left:-54upx;
			top: 80upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
		}
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title{
				font-size:$font-base + 2upx;
				color: $font-color-dark;
				height: 80upx;
				line-height: 80upx;
			}
			.price{
				font-size:$font-base + 2upx;
				color: $font-color-dark;
				height: 50upx;
				line-height: 50upx;
				position: absolute;
				bottom: 5px;
				color:#EE1D23;
				font-weight: 600;
			}
			.attr{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
			color: $font-color-light;
		}
	}
	/* 底部栏 */
	.action-section{
		/* #ifdef H5 */
		margin-bottom:80upx;
		/* #endif */
		position:fixed;
		bottom:30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 2px 0 rgba(0,0,0,.5);
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
			padding: 0 38upx;
			height: 100upx;
			line-height: 100upx;
			font-size: $font-base + 2upx;
			background: $uni-color-hangfeng;
			border-radius: 0;
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
