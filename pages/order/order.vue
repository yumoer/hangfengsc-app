<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					<!-- 订单列表 -->
					
					<view
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
					>
						<view v-if="item.state === 1 || item.state === 2 || item.state === 3  ||  item.state === 5 || item.state === 9" >
							<view class="i-top b-b">
								<text class="time">订单编号 : {{item.order_id}}</text>
								<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
							</view>
							
							<view 
								class="goods-box-single"
								v-for="(goodsItem, goodsIndex) in item.goods" :key="goodsIndex"
							>
								<image class="goods-img" :src="goodsItem.image_url" mode="aspectFill"></image>
								<view class="right">
									<text class="title clamp">{{goodsItem.name}}</text>
									<text class="price" style="float: left;">{{goodsItem.price}} 
										<text class="attr-box" style="float: right;">  x {{goodsItem.count}}</text>
									</text>
								</view>
							</view>
							
							<view class="price-box" >
								实付款
								<text class="price">{{item.total_amount}}</text>
							</view>
							<view class="action-box b-t" v-if="item.state === 1">
								<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
								<button class="action-btn recom" @click="payOrder(item)" v-if="item.pay_method_id !== 3">立即支付</button>
							</view>
							<view class="action-box b-t" v-if="item.state === 2">
								<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
							</view>
							<view class="action-box b-t" v-if="item.state === 3">
								<button class="action-btn" @click="lookViewOrder(item)">查看物流</button>
								<button class="action-btn recom" @click="confirmOrder(item)">确认收货</button>
							</view>
							
							<view class="action-box b-t" v-if="item.state === 5">
								<!-- <button class="action-btn" @click="replaceGoods(item.goods[goodsIndex])">退货/换货</button> -->
								<button class="action-btn recom" @click="lookDetails(item,item.order_id)">订单详情</button>
							</view>
							
						</view>
						
						
						
						<view class="" v-if="item.state === 4 " v-for="(goodsItem, goodsIndex) in item.goods" :key="goodsIndex">
							<view class="i-top b-b">
								<text class="time">{{item.create_time}}</text>
								<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
							</view>
							
							<view 
								class="goods-box-single"
							>
								<image class="goods-img" :src="goodsItem.image_url" mode="aspectFill"></image>
								<view class="right">
									<text class="title clamp">{{goodsItem.name}}</text>
									<text class="price" style="float: left;">{{goodsItem.price}} 
										<text class="attr-box" style="float: right;">  x {{goodsItem.count}}</text>
									</text>
								</view>
							</view>
							
							<view class="price-box" >
								实付款
								<text class="price">{{goodsItem.price * goodsItem.count}}</text>
							</view>
							
							<view class="action-box b-t" v-if="goodsItem.is_commented === true">
								<button class="action-btn">已评价</button>
							</view>
							<view class="action-box b-t" v-if="goodsItem.is_commented === false">
								<button class="action-btn recom" @click="accessOrder(goodsItem,item.order_id)">立即评价</button>
							</view>
							
							
							
						</view>
						
					</view>
					
				<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
				
			</swiper-item>
			
		</swiper>
		<!-- <unik-modal
			ref="unikModals"
			:modalTitle="modalTitle"
			@confirmModal="confirmModal"
			@cancelModal="cancelModal"
			>
			sss
		</unik-modal> -->
	</view>
</template> 

<script>
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import minBadge from '@/components/min-badge/min-badge'
	import empty from "@/components/empty";
	import uniRequest from 'uni-request';
	import Json from '@/Json';
	import {
	    mapState 
	} from 'vuex';  
	import unikModal from '@/components/unik-modal/unik-modal.vue'
	export default {
		components: {
			uniLoadMore,
			empty,
			minBadge,
			uniSection
		},
		data() {
			return {
				modalTitle: '退/换货',
				tabCurrentIndex: 0,
				orderList:[],
				orderId:null,
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'loading',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'loading',
						orderList: []
					},
					{
						state: 2,
						text: '待发货',
						loadingType: 'loading',
						orderList: []
					},
					{
						state: 3,
						text: '待收货',
						loadingType: 'loading',
						orderList: []
					},
					{
						state: 4,
						text: '待评价',
						loadingType: 'loading',
						orderList: []
					},
					{
						state: 5,
						text: '已完成',
						loadingType: 'loading',
						orderList: []
					}
				],
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;
			console.log(this.tabCurrentIndex,options.state)
			// #ifndef MP
			if(+options.state == 0){
				this.loadData('tabChange','全部')
			}else if(+options.state === 1){
				this.loadData('tabChange','待支付')
			}else if(+options.state === 2){
				this.loadData('tabChange','待发货')
			}else if(+options.state === 3){
				this.loadData('tabChange','待收货')
			}else if(+options.state === 4){
				this.loadData('tabChange','待评价')
			}else if(+options.state === 5){
				this.loadData('tabChange','已完成')
			}
			// #endif
		},
	    onShow(){
			 
		},
		
		methods: {
			//获取订单列表
			loadData(source,status){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				if(navItem.loadingType === 'loading'){
					this.getDate(status)
					//防止重复加载
					return;
				}
			}, 
			
			
			setData(e){
				console.log(e)
				let pages = getCurrentPages();
				let currPage = pages[pages.length-1];
				// currPage.data.isDoRefresh = e.isDoRefresh
				if (e.isDoRefresh == true){
					e.isDoRefresh = false;
					if(this.tabCurrentIndex === 0){
						this.getDate('全部');
					}else if(this.tabCurrentIndex === 4){
						this.getDate('待评价');
					}
				}else{
				   //不用刷新
				}
			},
			async getDate(status){
				this.orderList = []
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				const response = await uniRequest({
					url:'/orders/info/?status='+status,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(response=>{
					if(response.status === 200){
						console.log(response.data.order_id)
						if(response.data.order_id.goods === undefined){
							navItem.orderList = []
						}
						const order_id = response.data.order_id;//所有订单对象
						for (var key in order_id) {
							this.orderList.push(order_id[key]);
						}
						setTimeout(()=>{
							let orderList = this.orderList.filter(item=>{
								//添加不同状态下订单的表现形式
								if(item.status === '全部'){
									item.state = 0
								}else if(item.status === '待支付'){
									item.state = 1
								}else if(item.status === '待发货'){
									item.state = 2
								}else if(item.status === '待收货'){
									item.state = 3
								}else if(item.status === '待评价'){
									item.state = 4
								}else if(item.status === '已完成'){
									item.state = 5
								}else if(item.status === '已取消'){
									item.state = 9
								}
								
								item = Object.assign(item, this.orderStateExp(item.state));
								//演示数据所以自己进行状态筛选
								if(state === 0){
									//0为全部订单
									return item;
								}
								return item.state
							});
							orderList.forEach(item=>{
								navItem.orderList.push(item);
							})
							//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
							this.$set(navItem, 'loaded', true);
							//判断是否还有数据， 有改为 more， 没有改为noMore 
							navItem.loadingType = 'nomore';
							
						}, 10);
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				if(this.tabCurrentIndex === 0){
					this.getDate('全部')
				}else if(this.tabCurrentIndex === 1){
					this.getDate('待支付')
				}else if(this.tabCurrentIndex === 2){
					this.getDate('待发货')
				}else if(this.tabCurrentIndex === 3){
					this.getDate('待收货')
				}else if(this.tabCurrentIndex === 4){
					this.getDate('待评价')
				}else if(this.tabCurrentIndex === 5){
					this.getDate('已完成')
				}
			},
			//顶部tab点击
			tabClick(index){
				console.log(index)
				this.tabCurrentIndex = index;
			},
			//立即支付
			async payOrder(item){
				console.log(item.pay_method_id)
				this.orderId = item.order_id
				if(item.pay_method_id === 2){ // 支付宝支付
					 // #ifdef APP-PLUS
					 await uniRequest({
					 	url: 'orders/app/'+this.orderId+'/payment/',
					 	method: 'get',
					 	headers: {
					 		Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					 	},
					 }).then(res => {
					 	console.log(res.data)
					 	// plus.runtime.openURL(res.data.alipay_url)
					 	const orderInfo = res.data.message
					 	console.log(orderInfo)
					 	uni.requestPayment({
					 		provider: 'alipay',  // wxpay
					 		orderInfo:orderInfo,
					 		success: function(ress) {
					 			uni.showToast({
					 				title: "支付成功"
					 			})
								uni.switchTab({
									url:'/pages/user/user'
								})
					 		},
					 		fail: function(err) {
					 			console.log(err,err.errMsg)
					 			uni.showModal({
					 				// content: "支付失败,原因为: " + err.errMsg,
					 				content: '抱歉，您的支付不成功',
					 				showCancel: false
					 			})
					 		}
					 	});
					 }).catch(error => {
					 	console.log(error.data)
					 });
					 // #endif
					 // #ifdef H5
					 const res = await uniRequest({
					 	url: '/orders/'+this.orderId+'/payment/?mobile=1',
					 	method: 'get',
					 	headers: {
					 		Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					 	},
					 }).then(res => {
					 	console.log(res.data.alipay_url)
						location.href =  'https://openapi.alipay.com/gateway.do?'+res.data.alipay_url
					 })
				     // #endif
				}else if(item.pay_method_id === 8){  // 微信支付
					// #ifdef APP-PLUS
					console.log(uni.getStorageSync('userInfo').token)
					await uniRequest({
						url: '/orders/wechat/app/'+this.orderId+'/payment/',
						method: 'get',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res.data)
						// 第一种写法，传对象
						const orderInfo = {
							"appid": res.data.appid,
							"noncestr": res.data.noncestr,
							"package": res.data.package,
							"partnerid": res.data.partnerid,
							"prepayid": res.data.prepayid,
							"timestamp": res.data.timestamp,
							"sign": res.data.sign
						}
						// 第二种写法，传对象字符串
						console.log(JSON.stringify(orderInfo))
						uni.getProvider({
							service: 'payment',
							success: function (re) {
								console.log(re.provider)
								if (~re.provider.indexOf('wxpay')) {
									uni.requestPayment({
										provider: 'wxpay',  // wxpay
										orderInfo:JSON.stringify(orderInfo),
										success: function(ress) {
											uni.showToast({
												title: '支付成功'
											})
											uni.switchTab({
												url:'/pages/user/user'
											})
										},
										fail: function(err) {
											console.log(err,err.errMsg)
											uni.showModal({
												// content: "支付失败,原因为: " + err.errMsg,
												content: '抱歉，您的支付不成功',
												showCancel: false
											})
										}
									});
								}
							}
						});
					}).catch(error => {
						console.log(error.data)
					});
					// #endif
					// #ifdef H5
					uniRequest({
						url: '/wechat/h5/orders/'+this.orderId+'/payment/',
						method: 'get',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res.data)
						location.href = res.data.mweb_url
					}).catch(error => {
						console.log(error.data)
					})
					// #endif
				}
			},
			//删除订单
			deleteOrder(index){
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(()=>{
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
				}, 600)
			},
			// 退货/换货
			replaceGoods(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/order/lookDetails/concalShops?item='+JSON.stringify(item)+'?order_id='+order_id
				})
			},
			
			// 查看详情
			async lookDetails(item,order_id){
				console.log(order_id)
				
				console.log(item)
				uni.navigateTo({
					url:'/pages/order/lookDetails/lookDetails?item='+JSON.stringify(item)+'&order_id='+order_id
				})
			},
			// 物流信息
			async lookViewOrder(item){
				uni.navigateTo({
					url:'/pages/order/trackInfo/trackInfo?order_id='+item.order_id
				})
				console.log(item)
				
			},
			// 确认收货
			async confirmOrder(item){
				console.log(item)
				uni.showLoading({
					title: '请稍后'
				})
				const response = await uniRequest({
					url:'orders/update/status/',
					method:'post',
					data:{
						order_id:item.order_id
					},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.status === 200){
						console.log(res)
						if(res.data.order_id === item.order_id){
							setTimeout(()=>{
								let {stateTip, stateTipColor} = this.orderStateExp(4);
								item = Object.assign(item, {
									state: 4,
									stateTip, 
									stateTipColor
								})
								if(this.tabCurrentIndex === 3){
									this.getDate('待收货')
									this.$api.msg('收货成功')
									uni.hideLoading();
								}else if(this.tabCurrentIndex === 0){
									this.getDate('全部')
									//取消订单后删除待付款中该项
									this.$api.msg('收货成功')
									uni.hideLoading();
								}
								
							}, 600)
							
						}
					}
					
				}).catch(error=>{
					
				})
			},
			
			//取消订单
			async cancelOrder(item){
				console.log(item)
				uni.showLoading({
					title: '请稍后'
				})
				const response = await uniRequest({
					url:'/orders/cancel/?order_id='+item.order_id,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.data.massage){
						this.$api.msg(res.data.massage)
						if(res.data.massage === '该订单不支持直接取消'){
							return
						}
						if(this.tabCurrentIndex === 0){
							this.getDate('全部')
						}else{
							setTimeout(()=>{
								let {stateTip, stateTipColor} = this.orderStateExp(9);
								item = Object.assign(item, {
									state: 9,
									stateTip, 
									stateTipColor
								})
								//取消订单后删除待付款中该项
								if(this.tabCurrentIndex === 1){
									this.getDate('待支付')
								}else{
									this.getDate('待发货')
								}
								/* let list = this.navList[this.tabCurrentIndex].orderList;
								let index = list.findIndex(val=>val.id === item.id);
								console.log(index)
								index !== -1 && list.splice(index, 1); */
								uni.hideLoading();
							}, 600)
						}
						
						
					}
					
				}).catch(error=>{
					
				})
				
			},
			// 评价订单
			accessOrder(item,orderId){
				item.orderId = orderId
				uni.navigateTo({
					url:'/pages/order/assess/assess?item='+JSON.stringify(item)
				})
			},

			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+state){
					case 1:
						stateTip = '待付款'; break;
					case 2:
						stateTip = '待发货'; break;
					case 3:
						stateTip = '待收货'; break;
					case 4:
						stateTip = '待评价'; break;
					case 5:
						stateTip = '已完成'; break;
					case 9:
						stateTip = '订单已关闭'; 
						stateTipColor = '#909399';
						break;
						
					//更多自定义
				}
				return {stateTip, stateTipColor};
			}
		},
		
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
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
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
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
		height: 420upx;
		background-color: #white;
		font-size: 16px;
		color: #898989;
		padding: 24upx;
		box-sizing: border-box;
		line-height: 40upx
	}
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>



