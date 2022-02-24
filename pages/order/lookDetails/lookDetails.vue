<template>
	<view class="content">
		<!-- 待付款 -->
		<view class="order-title" v-if="goodsItem.pay_status === 0 && goodsItem.order_status === 0">
			<view class="title-info">
				<view class="info-money">待买家付款</view>
				<view class="info-time" v-if="minute !== 0 && second !== 0 ">剩余时间： 
					<uni-countdown color="#fff" background-color="#EE1D23" border-color="#00B26A" :show-day="false" :showHour="false" :showColon="false" :minute="minute" :second="second" @timeup="timeChange">
					</uni-countdown>
				</view>
			</view>
			<view class="title-info-right">
				<i class="yticon icon-time" style="font-size: 64upx;"></i>
			</view>
		</view>
		<!-- 待发货 -->
		<view class="order-title" v-if="goodsItem.pay_status === 1 && goodsItem.order_status < 2">
			<view class="title-info">
				<view class="info-money">待发货</view>
				<view class="info-time">您的商品正在加急发货中</view>
			</view>
			<view class="title-info-right">
				<image style="width: 40px;height: 40px;" src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttauAb2DsAAAMooM4i-82731514" mode=""></image>
			</view>
		</view>
		<!-- 待收货 -->
		<view class="order-title" v-if="goodsItem.order_status === 3">
			<view class="title-info">
				<view class="info-money">运输中</view>
				<view class="info-time">快件已发出，正发往目的地</view>
			</view>
			<view class="title-info-right">
				<image style="width: 40px;height: 40px;" src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttauAYd6RAAAOJ0fCg9M4704488" mode=""></image>
			</view>
		</view>
		<!-- 交易完成 待评价-->
		<view class="order-title" v-if="goodsItem.order_status === 4 && !goodsItem.goods[0].comment">
			<view class="title-info">
				<view class="info-money">交易成功</view>
				<view class="info-time">快来发表你的评价吧</view>
			</view>
			<view class="title-info-right">
				<image style="width: 40px;height: 40px;" src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttauAF7WQAAALS9Lwcyg0130589" mode=""></image>
			</view>
		</view>
		<!-- 交易完成 已评价 -->
		<view class="order-title" v-if="goodsItem.order_status === 4 && goodsItem.goods[0].comment">
			<view class="title-info">
				<view class="info-money">交易成功</view>
				<view class="info-time">感谢你完成本次交易</view>
			</view>
			<view class="title-info-right">
				<image style="width: 40px;height: 40px;" src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttauAF7WQAAALS9Lwcyg0130589" mode=""></image>
			</view>
		</view>
		<!-- 交易关闭 -->
		<view class="order-title" v-if="goodsItem.order_status === 5">
			<view class="title-info">
				<view class="info-money">交易关闭</view>
				<view class="info-time">该订单已取消，交易关闭</view>
			</view>
			<view class="title-info-right">
				<image style="width: 40px;height: 40px;" src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttauAbj1eAAALqNGmsv09319254" mode=""></image>
			</view>
		</view>
		<!-- 已退货 -->
		<view class="order-title" v-if="goodsItem.order_status === 6">
			<view class="title-info">
				<view class="info-money">商品已退货</view>
				<view class="info-time">该订单已退货，交易关闭</view>
			</view>
			<view class="title-info-right">
				<image style="width: 40px;height: 40px;" src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttauAbj1eAAALqNGmsv09319254" mode=""></image>
			</view>
		</view>
		
		<view class="wrap-info">
			<view class="address_info">
				<view class="address">
					<view class="add-left">
						<i class="yticon icon-shouhuodizhi"></i>
					</view>
					<view class="add-center">
						<view class="add-title">
							<text class="add-name">{{goodsAddress.receiver}}</text>
							<text class="add-tel">{{goodsAddress.mobile}}</text>
						</view>
						<view class="add-address">
							<text>{{goodsAddress.province}}{{goodsAddress.city}}{{goodsAddress.district}}{{goodsAddress.place}}</text>
						</view>
					</view>
					<view class="add-right">
						<i class="yticon icon-you"></i>
					</view>
				</view>
				
			</view>
			
			<view class="order-item">
				<view class="goods-box-single" v-for="(goodItem,goodIndex) in goodsItem.goods" :key="goodIndex">
					<image class="goods-img" :src="goodItem.image" mode="aspectFill"></image>
					<view class="right">
						<text class="title clamp2">{{goodItem.title}}</text>
						<view class="info">
							<!-- <text class="spec">
								黑色款
							</text> -->
							<text class="price">
								{{goodItem.price}}
							</text>
							<text class="num">
								x{{goodItem.count}}
							</text>
						</view>
						<!-- 交易完成待评价 -->
						<view class="setBtn" v-if="goodsItem.order_status === 4 && !goodItem.comment">
							<button class="action-btn" type="default" @click="replaceGoods(goodItem)">申请售后</button>
							<button class="action-btn recom" type="default" @click="accessOrder(goodsItem,goodItem)">立即评价</button>
						</view>
						<!-- 交易完成已评价 -->
						<view class="setBtn" v-if="goodsItem.order_status === 4 && goodItem.comment">
							<button class="action-btn" type="default" @click="replaceDetails(goodsItem)">申请售后</button>
						</view>
						<view class="setBtn" v-if="goodsItem.order_status !== 4">
							<button class="action-btn" v-if="goodsItem.order_status === 6" type="default" @click="lookDetails(goodsItem)">售后详情</button>
						</view>
					</view>
				</view>
				
				<view class="collapse-item">
					<view class="price-info">
						<view class="price-item">
							<text class="allPrice">总价：</text>
							<text class="price">{{price.toFixed(2)}}</text>
						</view>
						<view class="price-item">
							<text class="allPrice">运费：</text>
							<text class="price" v-if="price < 100">13.00</text>
							<text class="price" v-else>0.00</text>
						</view>
						
					</view>
				</view>
				
				<view class="setBtn">
					<button class="action-btn recom" style="display: inline-block;float: right;margin-right: 20px;margin: 0 20px 10px 0;" type="default" @click="joinCart(goodsItem)">加入购物车</button>
					<button class="action-btn" style="display: inline-block;float: right;margin-right: 10px;" type="default" v-if="goodsItem.order_status === 0 && goodsItem.pay_status === 0" @click="cancelOrder(goodsItem)">取消订单</button>
					<button class="action-btn" style="display: inline-block;float: right;margin-right: 10px;" type="default" v-if="goodsItem.pay_status === 1 && goodsItem.order_status === 0" @click="refundOrder(goodsItem)">退款</button>
				</view>
			</view>
			
			<view class="c-list">
				<!-- <view class="c-row" style="font-weight: bold;">
					订单信息
				</view> -->
				<view class="c-row">
					<text class="tit">订单编号</text>
					<view class="con-list">
						<text>{{goodsItem.order_id}}</text>
					</view>
				</view>
				<view class="c-row">
					<text class="tit">支付方式</text>
					<view class="con-list">
						<text v-if="goodsItem.pay_method === 2">支付宝支付</text>
						<text v-if="goodsItem.pay_method === 8">微信支付</text>
						<text v-if="goodsItem.pay_method === 9">余额支付</text>
					</view>
				</view>
				<view class="c-row">
					<text class="tit">支付状态</text>
					<view class="con-list">
						<text v-if="goodsItem.pay_status === 0">未支付</text>
						<text v-if="goodsItem.pay_status === 1">已支付</text>
						<text v-if="goodsItem.pay_status === 2">已退款</text>
					</view>
				</view>
				<view class="c-row">
					<text class="tit">配送方式</text>
					<view class="con-list">
						<text>{{goodsItem.track_com}}</text>
					</view>
				</view>
				<view class="c-row">
					<text class="tit">物流状态</text>
					<view class="con-list">
						<text v-if="goodsItem.track_state === 0">新建</text>
						<text v-if="goodsItem.track_state === 1">妥投完成</text>
						<text v-if="goodsItem.track_state === -1">拒收</text>
						<text v-if="goodsItem.track_state === 4">退换货中</text>
					</view>
				</view>
				<view class="c-row">
					<text class="tit">下单时间</text>
					<view class="con-list">
						<text>{{goodsItem.create_time}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 待付款 -->
		<view class="btn-bottom" v-if="goodsItem.pay_status === 0 && goodsItem.order_status === 0">
			<text class="price-box" >
				实付款
				<text class="price">{{allPrice.toFixed(2)}}</text>
			</text>
			<button class="action-btn recom" type="default" @click="payBtn(goodsItem)">立即支付</button>
		</view>
		
		<!-- 待发货 -->
		<view class="btn-bottom" v-if="goodsItem.pay_status === 1 && goodsItem.order_status < 2">
			<button class="action-btn recom" style="background-color: #FFFFFF;" type="default" @click="editAddress(goodsItem)">修改地址</button>
		</view>
		
		<!-- 待收货 -->
		<view class="btn-bottom" v-if="goodsItem.order_status === 3">
			<button class="action-btn recom" type="default" @click="confirmOrder(goodsItem)">确认收货</button>
			<button class="action-btn" type="default" @click="lookViewOrder(goodsItem)">查看物流</button>
		</view>
		
		<!-- 交易完成 -->
		<view class="btn-bottom" v-if="goodsItem.order_status === 4">
			<button class="action-btn recom" type="default" @click="goBuyAgain(goodsItem,goodsItem.order_id)">再次购买</button>
		</view>
		
		<!-- 交易关闭 -->
		<view class="btn-bottom" v-if="goodsItem.order_status === 5">
			<button class="action-btn recom" type="default" @click="goBuyAgain(goodsItem,goodsItem.order_id)">再次购买</button>
		</view>
		
		<!-- 退货完成 -->
		<view class="btn-bottom" v-if="goodsItem.order_status === 6">
			<button class="action-btn recom" type="default" @click="goBuyAgain(goodsItem,goodsItem.order_id)">再次购买</button>
		</view>
		
		<show-modal></show-modal>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import listCell from '@/components/mix-list-cell';
	export default {
		comments:{listCell},
		data() {
			return {
				goodsItem:[],
				orderId:'',
				price:0,
				allPrice:0,
				goodsAddress:{},
				title:'订单已生成',
				navList:[],
				minute:0,
				second:0,
				timer:'',
				itemList: [{
					head: "赏识在于角度的转换",
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
					open: true,
					disabled: true,
				}],
			}
		},
		created() {
			this.timer = setInterval(()=>{
				this.initTime()
			},1000)
		},
		onLoad(options){
			console.log(options)
			this.orderId = options.order_id
		},
		onShow(){
			this.getDate()
		},
		destroyed() {
			if (this.timer) { // 注意在vue实例销毁前，清除我们的定时器
			   clearInterval(this.timer);
			}
		},
		methods: {
			async getDate(){
				await uniRequest({
					url:'/wxapp/order/info/',
					method:'get',
					params:{
						sub_order_id:this.orderId
					},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					this.goodsItem = res.data
					this.goodsItem.state = this.navList.state
					this.goodsAddress = res.data.address
					this.getTime(res.data.create_time)
					this.goodsItem.goods.forEach(ele=>{
						this.price += Number(ele.price)*ele.count
						if(this.price < 100){
							this.allPrice = this.price + 13
						}else{
							this.allPrice = this.price
						}
					})
				}).catch(error=>{
					console.log(error)
				})
			},
			getTime(time){
				var date = new Date(time)
				var min = date.getMinutes();  //2. 获取当前分钟
				date.setMinutes(min+20);  //3. 设置当前时间+10分钟：把当前分钟数+10后的值重新设置为date对象的分钟数
				var y = date.getFullYear();
				var m = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
				var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
				var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
				var f = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
				var s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
				var star = y+'-'+m+'-'+d + " " + h + ":" + f + ":" + s;
				this.nowTime = star;
			},
			initTime() {
				var date = new Date(); //1. js获取当前时间
				var now = date.getTime(); //获得当前时间与1970年1月1日时间相差的毫秒数
				var star = this.nowTime;
				var endDate = new Date(star);
				var end = endDate.getTime(); //结束时间与1970年1月1日时间相差的毫秒数
				var leftTime = (end - now); //计算两日期之间相差的毫秒数
				if (leftTime >= 0) {
					this.minute = Math.floor(leftTime / 1000 / 60 % 60);
					this.second = Math.floor(leftTime / 1000 % 60);
					this.time = this.minute + '分' + this.second + '秒';
				}
			},
			// 倒计时
			async timeChange(e) {
				await uniRequest({
					url:'/orders/cancel/',
					method:'get',
					params:{
						id:this.orderId
					},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					uni.showToast({
						title: '订单已取消',
						icon:'error'
					})
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}).catch(error=>{
					console.log(error)
				})
			},
			// 退货/换货
			replaceGoods(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/order/lookDetails/concalShops?item='+encodeURIComponent(JSON.stringify(item))+'&order_id='+this.goodsItem.order_id+'&sub_order_id='+this.goodsItem.sub_order_id
				})
			},
			
			// 修改地址
			editAddress(item){
				// this.$api.msg('修改地址')
				uni.navigateTo({
					url:'/pages/order/editAdress/editAdress?orderId='+item.order_id
				})
			},
			
			refundOrder(item){
				uni.navigateTo({
					url:'/pages/order/lookDetails/afterSalesDetails?type='+1+'&item=' + encodeURIComponent(JSON.stringify(item.goods[0]))+'&orderId='+item.order_id + '&subOrderId='+item.sub_order_id
				})
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
								//取消订单后删除待付款中该项
								this.$api.msg('收货成功')
								uni.hideLoading();
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
				await uniRequest({
					url:'/orders/cancel/?id='+item.sub_order_id,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					this.$api.msg(res.data.massage)
					uni.hideLoading();
					this.getDate()
				}).catch(error=>{
					this.$api.msg(error.response.data.massage)
				})
			},
			
			lookDetails(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/order/postSale/postDetails?sub_id='+item.sub_order_id
				})
			},
			
			// 加入购物车
			joinCart(item){
				this.$showModal({
					title:'提示',
				    content: '确认加入到购物车?',
					cancelText:"取消",
					confirmText:"确认",
				    success: async(e) =>{
				    	if(e.confirm){
							item.goods.forEach(async ele=>{
								await uniRequest({
									url: '/carts/cart_sku/',
									method: 'POST',
									data:{sku_id:ele.id,count:1},
									headers: {
										Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
									},
								}).then(res => {
									this.$api.msg('已加入购物车')
								}).catch(error => {
									console.log(error.data)
								})
							})
				    	}
				    }
				});
				
			},
			
			// 物流信息
			async lookViewOrder(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/order/trackInfo/trackInfo?order_id='+item.sub_order_id
				})
			},
			
			replaceDetails(item){
				console.log(item)
				console.log(this.navList)
				if(this.navList !== undefined){
					this.navList.forEach(ele=>{
						if(ele.sku_id === item.sku_id){
							item = ele
							
						}
					})
				}
				uni.navigateTo({
					url:'/pages/order/postSale/postDetails?item='+encodeURIComponent(JSON.stringify(item))
				})
				
			},
			
			// 评价订单
			accessOrder(item,data){
				uni.navigateTo({
					url:'/pages/order/assess/assess?item='+encodeURIComponent(JSON.stringify(data))+'&order_id='+item.order_id+'&sub_order_id='+item.sub_order_id
				})
			},
			
			payBtn(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/money/pay?orderId='+item.order_id
				})
			},
		}
		
	}
</script>

<style lang="scss">
	/deep/ .uni-countdown__splitor{
		color: #fff!important;
	}
	/deep/ .uni-countdown{
		margin-top: -5px;
	}
	page, .content{
		background: $page-color-base;
		height: 100%;
		width: 100%;
		margin-bottom: 80px;
	}
	
	uni-radio .uni-radio-input{
		width:36upx;
		height: 36upx;
	}
	
	.order-title{
		width: 100%;
		height: 220upx;
		background: linear-gradient(to right,#EE1D23,#F04023);
		.title-info{
			font-size: 32upx;
			color: #fff;
			float: left;
			width: 70%;
			height: 100%;
			padding: 35upx 80upx;
			.info-money{
				font-size: 36upx;
				font-weight: bold;
				
			}
			.info-time{
				margin-top: 10upx;
				font-size: 28upx;
				display: flex;
				text{
					font-size: 32upx;
				}
			}
		}
		.title-info-right{
			float: right;
			color: #fff;
			width: 30%;
			height: 100%;
			padding: 50upx 80upx;
		}
	}
	
	.wrap-info{
		padding: 0 30upx;
		margin-top: -60upx;
		padding-bottom: 130upx;
		.address_info{
			width: 100%;
			height: 230upx;
			background-color: #fff;
			border-radius: 20upx;
			padding: 30upx;
			.address{
				width: 100%;
				height: 100%;
				float: left;
				.add-left{
					width: 10%;
					height: 100%;
					float: left;
					margin-top: -30upx;
					.icon-shouhuodizhi{
						font-size: 56upx;
						color: #333;
						line-height: 180upx;
					}
				}
				
				.add-center{
					width: 80%;
					height: 100%;
					float: left;
					margin-top: -10upx;
					margin-left: 20upx;
					.add-title{
						height: 80upx;
						line-height: 80upx;
						.add-name{
							font-size: 32upx;
							font-size: #333333;
						}
						.add-tel{
							font-size: 28upx;
							color: #666666;
							margin-left: 40upx;
						}
					}
					.add-address{
						font-size: 28upx;
						color: #999999;
					}
				}
				
				.add-right{
					height: 100%;
					float: left;
					margin-top: -30upx;
					.icon-you{
						float: right;
						font-size: 36upx;
						color: #333;
						line-height: 180upx;
					}
				}
			}
		}
	}
	
	.c-list{
		font-size: $font-sm + 6upx;
		color: $font-color-base;
		background: #fff;
		margin-top: 30upx;
		border-radius: 20upx;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
			color: #666666;
			font-size: 28upx;
			font-weight: bold;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			line-height: 40upx;
			text-align: right;
			color: #333333;
			margin-left: 40upx;
			font-size: 26upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	.order-item{
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-top: 30upx;
		width: 100%;
		border-radius: 20upx;
		.item-info{
			font-size: 36upx;
			padding: 20upx 0;
		}
		.goods-info{
			font-size: 32upx;
			padding: 10upx;
		}
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
				border-radius: 20upx;
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
			padding: 30upx 30upx 0 30upx;
			.goods-img{
				display: block;
				width: 190upx;
				height: 190upx;
				border-radius: 20upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 20upx 0 30upx;
				overflow: hidden;
				
				
				.title{
					font-size: 28upx;
					color: #333333;
					color: $font-color-dark;
					line-height: 50upx;
				}
				
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				
				.info{
					margin-top: 40upx;
					.spec{
						background: #F7F7F7;
						padding: 20upx;
						display: inline-block;
						float: left;
						font-size: 24upx;
						color: #999999;
						border-radius: 10upx;
					}
					.price{
						font-size: 28upx;
						color: #EE1D23;
						&:before{
							content: '￥';
							font-size: $font-sm;
							margin: 0 2upx 0 8upx;
						}
					}
					.num{
						float: right;
						color: #999999;
						font-size: 24upx;
					}
				}
				.setBtn{
					.action-btn{
						width: 160upx;
						height: 60upx;
						margin-top: 16upx;
						float: right;
						text-align: center;
						line-height: 56upx;
						font-size: $font-sm + 2upx;
						color: #303133;
						border: 1upx solid rgba(0,0,0,.2);
						border-radius: 100px;
						background: #FFFFFF;
						&:after{
							border-radius: 100px;
						}
						&.recom{
							background: linear-gradient(to right,#EE1D23 0%,#F04023 100%);
							color: #fff;
							&:after{
								border-color: #ee1d23;
							}
						}
					}
				}
			}
			
		}
		
		.price-info{
			margin: 20upx -1upx;
			.price-item{
				height: 60upx;
				line-height: 60upx;
				width: 52%;
				margin-left: 40%;
			}
			.allPrice{
				color: #333;
				font-size: 28upx;
				font-weight: bold;
			}
			.price{
				font-size: 24upx;
				color: #999999;
				float: right;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 45upx;
			font-size: 28upx;
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
			background: #FFFFFF;
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
	
	.btn-bottom{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
		background-color: #fff;
		line-height: 100upx;
		padding: 0 40upx;
		.btn-more{
			color: #666;
			font-size: 32upx;
			height: 100%;
			display: inline-block;
		}
		.price-box{
			padding-left: 30upx;
			font-size: 28upx;
			height: 100%;
			color: #333333;
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
		.payBtn{
			display: inline-flex;
			background: linear-gradient(to right,#EE1D23 0%,#F04023 100%);
			width: 200upx;
			height: 70upx;
			line-height: 70upx;
			color: #fff;
			float: right;
			margin-top: 16upx;
			border-radius: 40upx;
		}
		.action-btn{
			width: 200upx;
			height: 70upx;
			margin-top: 16upx;
			margin-left: 24upx;
			padding: 0;
			float: right;
			text-align: center;
			line-height: 65upx;
			font-size: $font-sm + 2upx;
			color: #ee1d23;
			border: 1px solid #ee1d23;
			border-radius: 100px;
			background: #FFFFFF;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: linear-gradient(to right,#EE1D23 0%,#F04023 100%);
				color: #fff;
				&:after{
					border-color: #ee1d23;
				}
			}
		}
	}
	
	
	textarea{
		width: 100%;
		height: 240upx;
		background-color: #white;
		font-size: 16px;
		color: #898989;
		padding: 24upx;
		box-sizing: border-box;
		line-height: 40upx
	}
	
</style>

