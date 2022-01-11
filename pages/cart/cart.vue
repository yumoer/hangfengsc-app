<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<xw-empty v-if="hasLogin" :isShow="isEmpty" img="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttGKAEKLQAAHV7g2M0t08616105" path="/pages/index/index" btnText="去逛逛" text="您暂时还没有添加商品" textColor="#C0C4CC"></xw-empty>
			<xw-empty v-else :isShow="isEmpty" img="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttGKAEKLQAAHV7g2M0t08616105" path="/pages/public/login" btnText="去登录" text="您暂时还没有添加商品" textColor="#C0C4CC"></xw-empty>
		</view>
		<!-- 列表 -->
		<view class="cart-list">
			<block v-for="(item, index) in cartList" :key="item.id" v-if="cartList.length > 0">
				<view class="cart-item">
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
							style="transform: scale(0.8);"
							@click="check('item', index)"
						></view>
					</view>
					<view class="item-right">
						<text class="clamp title">{{item.title}}</text>
						<text class="attr">无规格</text>
						<text class="price">¥ <text style="font-size: 16px;">{{item.price}}</text></text>
						<uni-number-box
							class="step"
							:min="1" 
							v-model="item.count"
							:index="index"
							@change="numberChange($event,item,index)"
						></uni-number-box>
					</view>
					<!-- <text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text> -->
				</view>
			</block>
			<show-modal></show-modal>
		</view>
		<!-- 底部菜单栏 -->
		<view class="action-section" v-if="!isCheck && cartList.length !== 0">
			<view class="checkbox">
				<image 
					:src="allChecked?'http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAFaC5AAAWUKVmO9c7369764':'http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAWg4rAAAWK3u5TB05910823'" 
					mode="aspectFit"
					style="transform: scale(0.8);"
					@click="check('all')"
				></image>
				<text class="allText">全选</text>
			</view>
			<view class="total-box">
				<text class="price">
					<text style="color: #666;">合计：</text>
					<text style="font-size: 10px;color:#EE1D23;">¥</text>
					<text style="font-size:16px;color:#EE1D23;font-weight: bold;">{{total}}</text>
				</text>
				<text class="coupon" v-if="(100 - total) > 0">
					差<text style="color: #EE1D23;">￥{{(100 - total).toFixed(2)}}</text>元可包邮
				</text>
				<text class="coupon" v-else>
					包邮
				</text>
			</view>
			<button type="primary" class="no-border confirm-btn" @click="createOrder">结算 ({{selected.length}})</button>
		</view>
		
		<view class="action-section" v-if="isCheck && cartList.length !== 0">
			<view class="checkbox">
				<image 
					:src="allChecked?'http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAFaC5AAAWUKVmO9c7369764':'http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAWg4rAAAWK3u5TB05910823'" 
					mode="aspectFit"
					style="transform: scale(0.8);"
					@click="check('all')"
				></image>
				<text class="allText">全选</text>
			</view>
			<view class="total-box clear" @click="clearCart">清空购物车</view>
			<button class="no-border delete-btn" @click="joinCollect">移入收藏</button>
			<button class="no-border delete-btn" @click="deleteGoods">删除</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	import uniRequest from 'uni-request';
	import xwEmpty from '@/components/xw-empty/xw-empty';
	export default {
		components: {
			uniNumberBox,xwEmpty
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				isEmpty: false, //空白页现实  true|false
				empty:false,
				cartList: [],
				selected:[], //选中的个数
				isCheck:false,
			};
		},
		onShow(){
			this.loadData();
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if(index === 0 && this.cartList.length > 0){
				if(this.isCheck === true){
					document.getElementsByClassName('uni-btn-icon')[1].innerText = '编辑';
				}else{
					document.getElementsByClassName('uni-btn-icon')[1].innerText = '完成';
				}
				this.isCheck = !this.isCheck
			}else{
				this.$api.msg('没有数据暂不能编辑')
			}
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.isEmpty !== empty){
					this.isEmpty = empty;
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			async loadData(){
				uni.showLoading({
					title:'加载中...'
				})
				const response = await uniRequest({
					url:'/carts/cart_sku/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.status === 200 || res.status === 201){
						uni.hideLoading()
						let cartList = res.data.map((item,index)=>{
							this.$set(item, 'loaded', 'loaded');
							return item;
						});
						this.cartList = cartList;
						this.calcTotal();  //计算总价
						if(this.isCheck = false){
							document.getElementsByClassName('uni-btn-icon')[1].innerText = '完成';
						}else{
							document.getElementsByClassName('uni-btn-icon')[1].innerText = '编辑';
						}
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
				this[key][index].image = 'http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAJKE-AAAIN3tX7Zo0727207';
			},
			gotoPath(id){
				uni.navigateTo({
					url: '/pages/product/product?id='+id
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
			numberChange(value,e,index){
				if(value==e.count){ //防止重复传送  
					return false;  
				}
				uniRequest({
					url:'/carts/cart_sku/',
					method:'put',
					data:{
						sku_id: this.cartList[index].id,
						count: value,
						selected: e.selected
					},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					this.loadData()
				})
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
				this.$showModal({
					title:'提示',
					content: '确认清空购物车?',
					cancelText:"取消",
					confirmText:"确认",
					success: async(e) =>{
						if(e.confirm){
							await uniRequest({
								url:'/carts/clear/',
								method:'POST',
								headers:{
									Authorization:'JWT '+uni.getStorageSync('userInfo').token
								},
							}).then(res=>{
								this.cartList = [];
								this.$api.msg(`购物车已清空`);
								document.getElementsByClassName('uni-btn-icon')[1].innerText = '编辑';
								this.loadData()
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
			//提交订单
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
			},
			// 删除
			deleteGoods(){
				console.log(this.selected,this.cartList)
				let checkList = []
				this.cartList.forEach(ele=>{
					if(ele.selected === true){
						checkList.push(ele.id)
					}
				})
				this.$showModal({
					title:'提示',
				    content: '确认删除选择商品?',
					cancelText:"取消",
					confirmText:"确认",
				    success: (e) =>{
				    	if(e.confirm){
							uni.showLoading()
							uniRequest({
								url:'/carts/list/cart/',
								method:'PUT',
								data:{
									skus:checkList
								},
								headers:{
									Authorization:'JWT '+uni.getStorageSync('userInfo').token,
									'Content-Type': 'application/json' //自定义请求头信息
								},
							}).then(res=>{
								this.calcTotal();
								this.loadData();
								uni.hideLoading();
								setTimeout(()=>{
									this.$api.msg(`删除成功`);
								})
							})
						}
					}
				})
			},
			
			// 移入收藏
			joinCollect(){
				console.log(this.selected,this.cartList)
				let checkList = []
				this.cartList.forEach(ele=>{
					if(ele.selected === true){
						checkList.push(ele.id)
					}
				})
				this.$showModal({
					title:'提示',
				    content: '确认收藏商品?',
					cancelText:"取消",
					confirmText:"确认",
				    success: (e) =>{
				    	if(e.confirm){
							uni.showLoading()
							uniRequest({
								url:'/carts/list/collection/',
								method:'POST',
								data:{
									skus:checkList
								},
								headers:{
									Authorization:'JWT '+uni.getStorageSync('userInfo').token
								},
							}).then(res=>{
								console.log(res.data)
								if(res.data === '添加成功'){
									uni.hideLoading();
									setTimeout(()=>{
										this.$api.msg(`移入收藏成功`);
									})
								}else{
									this.$api.msg(`400 错误`);
								}
							})
						}
					}
				})
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
		left: 200upx;
		position: relative;
	} 
	/deep/ .cart-item .checkbox{
		border-radius: none;
	}
	.container{
		padding-bottom: 100upx;
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
		margin:30upx;
		padding: 20upx 20upx 20upx 50upx;
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
			left:-60upx;
			top: 80upx;
			z-index: 8;
			font-size: 40upx;
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
			padding-left: 20upx;
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
		bottom:0;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		padding-left: 42upx;
		background: rgba(255,255,255,1);
		/* box-shadow: 0 0 1px 0 rgba(0,0,0,.5); */
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 40upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.allText{
			position:absolute;
			left: 60upx;
			top: 0;
			z-index: 4;
			width: 80upx;
			height: 52upx;
			line-height: 52upx;
			font-size: 24upx;
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
		.clear{
			font-size: 28upx;
			color: $uni-color-hangfeng;
			margin-left: 140upx!important;
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:left;
			margin-left: 120upx;
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				/* margin-right: 112upx; */
				width: 222upx;
				font-size: 20upx;
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
		
		.delete-btn{
			padding: 0 40upx;
			height: 70upx;
			line-height: 70upx;
			margin-right: 30upx;
			font-size: $font-base + 2upx;
			border-radius: 60upx;
			font-size: 24upx;
			background-color: #fff;
			border: 1px solid #ddd;
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-hangfeng;
		font-size: 20px;
	}
</style>
