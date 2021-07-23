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
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
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
								<view class="right">
									<text class="title clamp">{{goodsItem.title}}</text>
									<text class="price" style="float: left;color: red;margin-top: 20px;">{{goodsItem.price}} 
										<text class="attr-box" style="float: right;">  x {{goodsItem.count}}</text>
									</text>
								</view>
							</view>
							
							<view class="price-box" >
								支付方式 
								<text class="method" v-if="item.pay_method === 1">货到付款</text>
								<text class="method" v-if="item.pay_method === 2">支付宝支付</text>
								<text class="method" v-if="item.pay_method === 8">微信支付</text>
								<text class="method" v-if="item.pay_method === 9">余额支付</text>
								实付款<text class="price">{{item.total_amount}}</text>
							</view>
							
							<view class="action-box b-t" v-if="item.state === 1">
								<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
								<button class="action-btn recom" @click="payOrder(item)" v-if="item.pay_status === 0">立即支付</button>
							</view>
							<view class="action-box b-t" v-if="item.state === 2">
								<button class="action-btn" @click="cancelOrder(item)" >取消订单</button>
								<button class="action-btn recom" @click="editAddress(item,item.order_id)">修改地址</button>
							</view>
							<view class="action-box b-t" v-if="item.state === 3">
								<button class="action-btn" @click="lookViewOrder(item,item.order_id)">查看物流</button>
								<button class="action-btn recom" @click="confirmOrder(item)">确认收货</button>
							</view>
							<view class="action-box b-t" v-if="item.state === 4">
								<button class="action-btn" @click="goBuyAgain(item,item.order_id)">再次购买</button>
								<button class="action-btn recom" @click="accessOrder(item)">前往评价</button>
							</view>
							
							<view class="action-box b-t" v-if="item.state === 5">
								<button class="action-btn recom" @click="goBuyAgain(item,item.order_id)">再次购买</button>
							</view>
							<view class="action-box b-t" v-if="item.state === 6">
								<button class="action-btn recom" @click="goBuyAgain(item,item.order_id)">再次购买</button>
								
							</view>
						</view>
					</view>
					
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<ssPaymentPassword ref="paymentPassword" :mode="mode" :value="pay_password" @submit="submitHandle" />
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<image @click="show = false" style="width: 100%;height: 100%;" src="../../static/brow2.png" mode=""></image>
				</view>
			</view>
		</u-mask>
	</view>
</template> 

<script>
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import minBadge from '@/components/min-badge/min-badge'
	import empty from "@/components/empty";
	import uniRequest from 'uni-request';
	import Json from '@/Json';
	import ssPaymentPassword from '@/components/sanshui-payment-password'
	import jsencrypt from '@/components/jsencrypt/jsencrypt.vue';
	import jsrsasign from '@/node_modules/jsrsasign/lib/jsrsasign.js' 
	import {
	    mapState 
	} from 'vuex';  
	import unikModal from '@/components/unik-modal/unik-modal.vue'
	export default {
		components: {
			uniLoadMore,
			empty,
			minBadge,
			uniSection,
			ssPaymentPassword
		},
		data() {
			return {
				modalTitle: '退/换货',
				tabCurrentIndex: 0,
				orderList:[],
				orderId:null,
				pay_password:'',
				mode:0,
				show:false,
				page_size:10,
				currentPage:1,
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
		
		/* onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		}, */
		
		//加载更多
		onReachBottom(){
			console.log('222')
			this.getDate(1)
			/* this.currentPage = this.currentPage + 1
			this.loadData('tabChange',this.tabCurrentIndex); */
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
								case 0:
									item.state = 1
									break;
								case 1:
									item.state = 2
									break;
								case 2:
									item.state = 6
									break;
							}
							switch (item.order_status){
								case 3:
									item.state = 3
									break;
								case 4:
									item.state = 4
									break;
								case 5:
									item.state = 5
									break;
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
			
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
				
			},
			
			//立即支付
			async payOrder(item){
				console.log(item.pay_method)
				this.orderId = item.order_id
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				if (isWeixin) {
					this.show = true
					return
				}
				if(item.pay_method === 2){ // 支付宝支付
					 // #ifdef APP-PLUS
					 await uniRequest({
					 	url: '/payment/ali/app/orders/'+this.orderId+'/',
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
					 	url: '/payment/ali/orders/'+this.orderId+'/?mobile=1',
					 	method: 'get',
					 	headers: {
					 		Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					 	},
					 }).then(res => {
					 	console.log(res.data.alipay_url)
						location.href =  'https://openapi.alipay.com/gateway.do?'+res.data.alipay_url
					 })
				     // #endif
				}else if(item.pay_method === 8){  // 微信支付
					// #ifdef APP-PLUS
					console.log(uni.getStorageSync('userInfo').token)
					await uniRequest({
						url: '/payment/wechat/app/orders/'+this.orderId+'/',
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
						url: '/payment/wechat/h5/orders/'+this.orderId+'/',
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
				}else if(item.pay_method === 9){
					this.mode = 1;
					this.getSecretKey();
					this.$refs.paymentPassword.modalFun('show');
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
				this.$api.msg('修改地址')
			},
			
			// 退货/换货
			replaceGoods(item){
				uni.navigateTo({
					url:'/pages/order/lookDetails/concalShops?item='+JSON.stringify(item)+'?order_id='+order_id
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
					url:'/orders/cancel/?id='+item.sub_order_id,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					this.$api.msg(res.data.massage)
					uni.hideLoading();
					this.getDate(this.tabCurrentIndex)
					let {stateTip, stateTipColor} = this.orderStateExp(5);
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
					stateTipColor = '#fa436a';
				switch(state){
					case 1:
						stateTip = '待付款'; break;
					case 2:
						stateTip = '待发货'; break;
					case 3:
						stateTip = '待收货'; break;
					case 4:
						stateTip = '待评价'; break;
					case 5:
						stateTip = '订单已关闭'; 
						stateTipColor = '#909399';
						break;
					case 6:
						stateTip = '已退换'; break;
					//更多自定义
				}
				return {stateTip, stateTipColor};
			},
		
			// 加密
			async getSecretKey(){
				await uniRequest({
					url:'/payment/secret/key/',
					method:'GET',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(response=>{
					if(response.status === 200){
						this.private = response.data.private
						this.public = response.data.public
					}else if(response.status === 400){
						this.$api.msg(response.data.message)
					}else if(response.status === 500){
						this.$api.msg('服务器错误')
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			//公共方法挂载
			getCode(publiukey,data){
			     //此处操作与后端约定参数
			     // 创建RSAKey对象
			     var rsa = new jsrsasign.RSAKey();
			     //因为后端提供的是pck#8的密钥对，所以这里使用 KEYUTIL.getKey来解析密钥
			     var k = publiukey
			     // 将密钥转码
			     rsa = jsrsasign.KEYUTIL.getKey(k); 
			     // 创建Signature对象，设置签名编码算法
			     var sig = new jsrsasign.KJUR.crypto.Signature({"alg": "SHA256withRSA",prvkeypem:publiukey});
			     // 初始化
			     sig.init(rsa)
			     // 传入待加密字符串
			     sig.updateString(data)
			     // 生成密文
			     var sign = jsrsasign.hextob64(sig.sign());
			     return sign
			},
			
			jsencrypt(data){
				//公钥.
				
				var publiukey=this.public;
				
				//限制117字符加密 (超过117字节会加载失败 中文或其他字符超过41个字符会加密失败)
				
				var pubblicData=jsencrypt.setEncrypt(publiukey,data);
				
				console.log(pubblicData);
				
				return pubblicData
			},
			
			jsencryptRsa(data){
				//公钥.
				var privatekey=this.private;
				
				//限制117字符加密 (超过117字节会加载失败 中文或其他字符超过41个字符会加密失败)
				
				var ArrayData=this.getCode(privatekey,data);
				
				console.log(ArrayData)
				
				return ArrayData
			},
			
			async submitHandle(e){
				console.log(e);
				this.pay_password = e.value
				console.log(this.pay_password)
				this.pay_password = this.jsencrypt(this.pay_password)
				const orderData = {
					order_id:this.orderId,
					pwd:this.pay_password,
					time:Date.parse(new Date())
				}
				console.log(JSON.stringify(orderData))
				const sign = this.jsencryptRsa(JSON.stringify(orderData))
				console.log(sign)
				const response = await uniRequest({
					url:'/payment/balance/',
					method:'POST',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
					data:{
						order_id:this.orderId,
						pwd:this.pay_password,
						time:Date.parse(new Date()),
						sign:sign,
					}
				}).then(response=>{
					if(response.status === 200){
						console.log(response.data)
						uni.showToast({
							title: "支付成功"
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/user/user'
							})
						},500)
					}else if(response.status === 400){
						this.$api.msg(response.data.message)
					}else if(response.status === 500){
						this.$api.msg('服务器错误')
					}
				}).catch(error=>{
					console.log(error)
				})
			},
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
					color: $font-color-dark;
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
				margin: 0 10px;
				font-size: 14px;
				color: $font-color-dark;
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



