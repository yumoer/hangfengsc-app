<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<view class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></view>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
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
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: item.selected}"
								@click="check('item', index)"
							></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.name}}</text>
							<text class="attr"></text>
							<text class="price">¥{{item.price}}</text>
							<!-- #ifdef APP-PLUS -->
							<uni-number-box
								class="step"
								:min="1" 
								:value="item.count"
								:isMin="item.count===1"
								:index="index"
								@eventChange="numberChange"
							></uni-number-box>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<uni-number-box
								class="step"
								:min="1" 
								:value="item.count"
								:isMin="item.count===1"
								:index="index"
								@change="numberChanges($event,Number(index))"
							></uni-number-box>
							<!-- #endif -->
							
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image 
						:src="allChecked?'/static/selected.png':'/static/select.png'" 
						mode="aspectFit"
						@click="check('all')"
					></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
					<!-- <text class="coupon">
						已优惠<text>0.00</text>元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	import uniRequest from 'uni-request'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0, //总价格
				disTotal:0,
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				token:'',
			};
		},
		onLoad(){
		},
		onShow(){
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
			...mapState(['hasLogin','login'])
		},
		methods: {
			//请求数据
			async loadData(){
				const response = await uniRequest({
					url:'/cart/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
					crossDomain: true,
					xhrFields: {
						withCredentials: true
					},
				}).then(res=>{
					console.log(res.status)
					if(res.status === 200 || res.status === 201){
						let cartList = res.data.map(item=>{
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
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			 //选中状态处理
			async check(type, index){
				if(type === 'item'){
					const response = await uniRequest({
						url:'/cart/',
						method:'put',
						data:{
							sku_id: this.cartList[index].id,
							count: this.cartList[index].count,
							selected: !this.cartList[index].selected
						},
						headers:{
							Authorization:'JWT '+uni.getStorageSync('userInfo').token
						},
					})
					this.cartList[index].selected = !this.cartList[index].selected;
				}else{
					const selected = !this.allChecked
					const list = this.cartList;
					list.forEach(item=>{
						item.selected = selected;
					})
					this.allChecked = selected;
				}
				this.calcTotal(type);
			},
			//数量
			// #ifdef APP-PLUS
			numberChange(data){
				console.log('111')
				console.log(data)
				this.cartList[data.index].count = data.number;
				this.calcTotal();
			},
			// #endif
			// #ifdef H5
			numberChanges(changeNumber,index){
				console.log('222')
				console.log(index,changeNumber)
				this.cartList[index].count = changeNumber;
				this.calcTotal();
			},
			// #endif
			
			//删除
			deleteCartItem(index){
				let list = this.cartList;
				let row = list[index];
				let id = row.id;
				uni.showModal({
					content: '删除当前商品？',
					success: async (e)=>{
						if(e.confirm){
							const response = await uniRequest({
								url:'/cart/',
								method:'delete',
								data:{sku_id:id},
								headers:{
									Authorization:'JWT '+uni.getStorageSync('userInfo').token
								},
							})
							this.cartList.splice(index, 1);
							this.$api.msg(`删除 `+row.name+`成功`);
							this.calcTotal();
							uni.hideLoading();
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
							const response = await uniRequest({
								url:'/cart/select/',
								method:'delete',
								headers:{
									Authorization:'JWT '+uni.getStorageSync('userInfo').token
								},
							})
							this.cartList = [];
							this.$api.msg(`全部商品删除成功`);
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
				list.forEach(item=>{
					if(item.selected === true){
						total += item.price * item.count;
					}else if(selected === true){
						selected = false;
					}
				})
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
						url: `/pages/order/createOrder?data=`+JSON.stringify(goodsData)
					})
				}else{
					this.$api.msg('购买商品不能为空')
				}
			}
		}
	}
</script>

<style lang='scss'>
	
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
				width: 240upx;
				height: 160upx;
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
		}
	}
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 40upx;
		.image-wrapper{
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position:relative;
			image{
				will-change: transform;
				border-radius:8upx;
			}
		}
		.checkbox{
			position:absolute;
			left:-16upx;
			top: -16upx;
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
			.title,.price{
				font-size:$font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}
			.attr{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}
			.price{
				height: 50upx;
				line-height:50upx;
				color: red;
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
		margin-bottom:100upx;
		/* #endif */
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 52upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
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
				color: red;
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
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-primary;
	}
</style>
