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
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="getAddData">
					<!-- 空白页 -->
					<xw-empty :isShow="tabItem.loaded === true && tabItem.orderList.length === 0" img="/static/images/empty/emptyContent.png" text="您暂时还没有添加地址" textColor="#C0C4CC"></xw-empty>
					<!-- 订单列表 -->
					<view
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
					>
						<view>
							<view class="i-top b-b">
								<text class="time">订单编号 : {{item.order_id}}</text>
								<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
							</view>
							<view 
								class="goods-box-single"
								v-for="(goodsItem, goodsIndex) in item.goods" :key="goodsIndex"
								@click="lookDetails(item)"
							>
								<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
								<view class="right"> <!-- clamp-->
									<text class="title">{{goodsItem.title}}</text>
									<view class="" style="margin-top: 10px;">
										<text class="price" style="float: left;">{{goodsItem.price}}</text>
										<text class="attr-box" style="float: right;margin-top: -2px;">  x {{goodsItem.count}}</text>
									</view>
								</view>
							</view>
							
							<view class="price-box">
								<text style="margin-right: 80px;">
									运费:<text class="price">13.00</text>
								</text>
								<text>
									优惠:<text class="price">0.00</text>
								</text>
							</view>
							
							<view class="price-box">
								<text style="font-size: 16px;">
									<text>需付款:</text>
									<text class="price" style="color: #EE1D23;">{{item.total_amount}}</text>
								</text>
							</view>
							
							<!-- 待付款 -->
							<view class="action-box b-t" v-if="item.pay_status === 0 && item.order_status === 0">
								<!-- <u-dropdown ref="uDropdown" active-color='#EE1023' @open="open(index)" @close="close(index)">
									<u-dropdown-item v-model="value" title="更多" :options="options"></u-dropdown-item>
								</u-dropdown> -->
								<button class="action-btn" @click="editAddress(item)">修改地址</button>
								<button class="action-btn recom" @click="payOrder(item)">去支付</button>
							</view>
							<!-- 待发货 -->
							<view class="action-box b-t" v-if="item.pay_status === 1 && item.order_status < 2">
								<!-- <u-dropdown ref="uDropdown" @open="open(index,item)" @close="close">
									<u-dropdown-item title="更多" :options="options" @change="changeOptions($event,item)"></u-dropdown-item>
								</u-dropdown> -->
								<button class="action-btn" @click="editAddress(item)">修改地址</button>
								<button class="action-btn recom" @click="lookViewOrder(item,item.order_id)">查看物流</button>
							</view>
							<!-- 待收货 -->
							<view class="action-box b-t" v-if="item.order_status === 3">
								<!-- <u-dropdown>
									<u-dropdown-item title="更多" :options="options1" @change="changeOption1($event,item)"></u-dropdown-item>
								</u-dropdown> -->
								<button class="action-btn" @click="lookViewOrder(item,item.order_id)">查看物流</button>
								<button class="action-btn recom" @click="confirmOrder(item)">确认收货</button>
							</view>
							<!-- 待评价 -->
							<view class="action-box b-t" v-if="item.order_status === 4 && !item.goods[0].comment">
								<!-- <u-dropdown>
									<u-dropdown-item title="更多" :options="options2" @change="changeOptions2($event,item,index)"></u-dropdown-item>
								</u-dropdown> -->
								<button class="action-btn" @click="lookViewOrder(item,item.order_id)">查看物流</button>
								<button class="action-btn recom" @click="accessOrder(item)">去评价</button>
							</view>
							
							<!-- 交易成功 -->
							<view class="action-box b-t" v-if="item.order_status === 4 && item.goods[0].comment">
								<button class="action-btn recom" @click="goBuyAgain(item,item.order_id)">再次购买</button>
							</view>
							<!-- 交易关闭 -->
							<view class="action-box b-t" v-if="item.order_status === 5">
								<button class="action-btn recom" @click="goBuyAgain(item,item.order_id)">再次购买</button>
							</view>
							<!-- 退换 -->
							<view class="action-box b-t" v-if="item.order_status === 6">
								<button class="action-btn recom" @click="goBuyAgain(item,item.order_id)">再次购买</button>
							</view>
						</view>
					</view>
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<image @click="show = false" style="width: 100%;height: 100%;" src="../../static/img/brow2.png" mode=""></image>
				</view>
			</view>
		</u-mask>
	</view>
</template> 

<script>
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import minBadge from '@/components/min-badge/min-badge'
	import xwEmpty from '@/components/xw-empty/xw-empty';
	import uniRequest from 'uni-request';
	import Json from '@/Json';
	import {mapState} from 'vuex';  
	export default {
		components: {
			uniLoadMore,
			xwEmpty,
			minBadge,
			uniSection,
		},
		data() {
			return {
				modalTitle: '退/换货',
				tabCurrentIndex: 0,
				orderList:[],
				orderId:null,
				mode:0,
				show:false,
				page_size:10,
				currentPage:1,
				value: 1,
				options: [{
						label: '加入购物车',
						value: 1,
					},
					{
						label: '取消订单',
						value: 2,
					}
				],
				private:'', //签名
				public:'', //加密
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待发货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					},
				],
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		async onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			if(options.state){
				this.tabCurrentIndex = Number(options.state);
			}
			this.loadData('tabChange',this.tabCurrentIndex)
		},
		
		
		methods: {
			//获取订单列表
			async loadData(source,status){
				//这里是将订单挂载到tab列表下
				let navItem = this.navList[status];
				let data = navItem.data;
				
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				console.log(navItem.loadingType)
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					this.getDate(status)
					return
				}else{
					this.getDate(status)
				}
			}, 
			
			async getDate(status){
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let data = navItem.data;
				navItem.loadingType = 'loading'
				await uniRequest({
					url:'/mobile/order/list/',
					method:'get',
					params:{page:this.currentPage,page_size:10,status:status+1},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.status === 200){
						this.orderList = res.data.data
						uni.hideLoading()
						let orderList = this.orderList.filter(item=>{
							switch (item.pay_status){
								// 待付款
								case 0:
									item.state = 1
									break;
								// 已支付
								case 1:
									item.state = 2
									break;
								// 已退款
								case 2:
									item.state = 7
									break;
							}
							switch (item.order_status){
								// 待收货
								case 3:
									item.state = 3
									break;
								// 已完成
								case 4:
									item.state = 4
									break;
								// 已取消
								case 5:
									item.state = 5
									break;
								// 已退货
								case 6:
									item.state = 6
									break;
							}
							//添加不同状态下订单的表现形式
							item = Object.assign(item, this.orderStateExp(item.state));
							/* //演示数据所以自己进行状态筛选
							if(status === 0){
								//0为全部订单
								return item;
							} */
							return item.state
						})
						orderList.forEach(item=>{
							navItem.orderList.push(item);
						})
						//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
						this.$set(navItem, 'loaded', true);
						//判断是否还有数据， 有改为 more， 没有改为noMore 
						navItem.loadingType = navItem.orderList.length > 0 ? 'noMore' : 'more'
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			// 下拉加载
			getAddData(){
				this.currentPage = this.currentPage + 1
				this.loadData('refrsh',this.tabCurrentIndex);
			},
			//swiper 切换
			changeTab(e){
				this.currentPage = 1
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange',this.tabCurrentIndex)
			},
			
			open(index) {
				console.log(index)
				// this.$refs.uDropdown[index].highlight(index)
				// this.$refs.uDropdown.highlight();
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
			},
			close(index) {
				console.log(index)
				// this.$refs.uDropdown.highlight(index);
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
			},
			
			// 更多选择
			changeOptions(e,item){
				console.log(e,item)
				if( e === 1){
					this.$api.msg('加入购物车')
					this.joinCart(item)
				}else if(e === 2){
					this.$api.msg('取消订单')
					this.cancelOrder(item)
				}
			},
			
			changeOption1(e,item){
				console.log(e,item)
				if( e === 1){
					this.$api.msg('加入购物车')
					this.joinCart(item)
				}else if(e === 2){
					this.$api.msg('取消订单')
					this.cancelOrder(item)
				}
			},
			
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			
			// 加入购物车
			joinCart(item){
				item.goods.forEach(async ele=>{
					await uniRequest({
						url: '/carts/cart_sku/',
						method: 'POST',
						data:{
							sku_id:ele.id,
							count:1
						},
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						this.$api.msg('已加入购物车')
					}).catch(error => {
						console.log(error.data)
					})
				})
			},
			
			//立即支付
			payOrder(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/money/pay?orderId='+item.order_id
				})
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
			
			// 再次购买
			async goBuyAgain(item){
				await uniRequest({
					url:'/orders/repeat/',
					method:'post',
					data:{
						id:item.sub_order_id
					},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res.status)
					if(res.status === 200){
						uni.switchTab({
							url:'/pages/cart/cart'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			
			// 修改地址
			editAddress(item){
				console.log(item)
				// this.$api.msg('修改地址')
				uni.navigateTo({
					url:'/pages/order/editAdress/editAdress?orderId='+item.order_id
				})
			},
			
			// 退货/换货
			replaceGoods(item){
				uni.navigateTo({
					url:'/pages/order/lookDetails/concalShops?item='+JSON.stringify(item)+'&order_id='+order_id
				})
			},
			
			// 查看详情
			lookDetails(item){
				uni.navigateTo({
					url:'/pages/order/lookDetails/lookDetails?order_id='+item.sub_order_id
				})
			},
			
			// 物流信息
			lookViewOrder(item){
				uni.navigateTo({
					url:'/pages/order/trackInfo/trackInfo?order_id='+item.sub_order_id
				})
			},
			
			// 确认收货
			async confirmOrder(item){
				console.log(item)
				uni.showLoading({
					title: '请稍后'
				})
				await uniRequest({
					url:'/orders/confirm/receipt/',
					method:'post',
					data:{
						id:item.sub_order_id
					},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.status === 204){
						console.log(res)
						if(res.data.order_id === item.order_id){
							setTimeout(()=>{
								let {stateTip, stateTipColor} = this.orderStateExp(5);
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
					url:'/orders/cancel/?id='+item.sub_order_id,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					this.$api.msg(res.data.massage)
					uni.hideLoading();
					this.getDate(this.tabCurrentIndex)
					let {stateTip, stateTipColor} = this.orderStateExp(6);
					item = Object.assign(item, {
						state: 5,
						stateTip, 
						stateTipColor
					})
				}).catch(error=>{
					this.$api.msg(error.response.data.massage)
				})
				
			},
			
			// 评价订单
			accessOrder(item){
				uni.navigateTo({
					url:'/pages/order/lookDetails/lookDetails?order_id='+item.sub_order_id
				})
			},

			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#EE1D23';
				switch(state){
					case 1:
						stateTip = '待付款'; break;
					case 2:
						stateTip = '待发货'; break;
					case 3:
						stateTip = '待收货'; break;
					case 4:
						stateTip = '交易完成'; break;
					case 5:
						stateTip = '交易关闭'; break;
					case 6:
						stateTip = '已退货';break;
					// case 7:
					// 	stateTip = '已退换'; break;
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
	/deep/ .u-dropdown__content__mask{
		background:none;
	}
	/deep/ .u-dropdown__content{
		transition: opacity 0s linear 0s!important;
	}
	/deep/ .u-dropdown__menu__item{
		justify-content: left;
	}
	/deep/ .u-dropdown__menu__item__text{
		color: red;
	}
	/deep/ .u-icon__icon .uicon-arrow-down .u-iconfont{
		color: red;
	}
	.swiper-box{
		height: calc(100% - 40px);
		margin: 0 20upx;
		border-radius: 10upx;
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
			color: #666;
			position: relative;
			&.current{
				color: $uni-color-hangfeng;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $uni-color-hangfeng;
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
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
				font-size: 26upx;
				color: #666;
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
					line-height: 40upx;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.spec{
					height: 40upx;
					padding: 10upx 20upx;
					line-height: 20upx;
					font-size: 24upx;
					border-radius: 10upx;
					color: #999;
					text-align: center;
					background: rgba(0,0,0,.1);
				}
				.price{
					font-size: $font-base + 2upx;
					color: $uni-color-hangfeng;
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
			.method{
				margin: 0 5px;
				font-size: 12px;
				color: #999;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
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
		.more{
			position: absolute;
			left: 0;
			color: #666;
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
			color: $uni-color-hangfeng;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
				border: 2upx solid #EE1D23;
			}
			&.recom{
				background:linear-gradient(to right,#EE1D23,#F04023);
				color: #fff;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
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



