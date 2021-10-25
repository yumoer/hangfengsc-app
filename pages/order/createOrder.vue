<template>
	<view class="container">
		<!-- 地址 -->
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{addressData.title}}</text>
						<text class="mobile">{{addressData.mobile}}</text>
					</view>
					<text class="address" v-if="addressData.addressName !== undefined">{{addressData.addressName}} {{addressData.place}}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
		</navigator>
		
		<view class="goods-content">
			<!-- 商品 -->
			<view class="goods-section">
				<!-- 商品列表 -->
				<view class="g-item" v-for="(data,index) in datas" :key="index">
					<image :src="data.default_image_url"></image>
					<view class="right">
						<text class="title">{{data.title}}</text>
						<text class="attr">无规格</text>
						<view class="price-box">
							<text class="price" style="color: red;">￥{{(data.price)}}</text>
							<uni-number-box
								style="position: absolute;right: 0;"
								class="step"
								:min="1" 
								disabled
								:value="data.count"
								:isMin="data.count===1"
								@change="numberChange($event,data,index)"
							></uni-number-box>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 优惠明细 -->
			<view class="yt-list">
				<navigator url="/pages/invoice/invoice?source=1" class="yt-list-cell">
					<text class="cell-tit clamp">发票</text>
					<text class="cell-tip active" style="">{{invoice}}</text>
					<text class="yticon icon-you" style="font-size: 14px;line-height: 20px"></text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</navigator>
				
				<view class="yt-list-cell desc-cell" v-if="invoice !== '不开发票'">
					<text class="cell-tit clamp">发票邮寄地址</text>
					<input class="desc" type="text" v-model="info.send_invoice_address" placeholder="请填写发票具体邮寄地址" placeholder-class="placeholder" />
				</view>
				
				<view class="yt-list-cell">
					<text class="cell-tit clamp">运费</text>
					<text class="cell-tip" v-if="allPrice != price">￥{{postPrice.toFixed(2)}}</text>
					<text class="cell-tip" v-else>免邮</text>
				</view>
				
				<navigator @click="goToPage('/pages/coupon/exchange?source=1')" class="yt-list-cell">
					<text class="cell-tit clamp">优惠券</text>
					<text class="cell-tip active" style="margin-right: 5px;">{{coupon}}</text>
					<text class="yticon icon-you" style="font-size: 14px;line-height: 20px"></text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</navigator>
				
				<view class="yt-list-cell desc-cell">
					<text class="cell-tit clamp">订单备注</text>
					<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
				</view>
				
				<view class="yt-list-cell">
					<text class="cell-tit clamp">支付方式</text>
					<text class="cell-tip active" style="margin-right: 5px;">在线支付</text>
				</view>
				
				<view class="" style="height: 40px;line-height: 40px;">
					<text style="position: absolute;right: 25px;">
						<text style="color: #999;">小计 :</text>
						<text style="color: #333;margin: 0 20upx;">共 {{datas.length}} 件</text>
						<text style="color: #EE1D23;font-weight: bold;">￥{{ price.toFixed(2) }}</text>
					</text>
				</view>
			</view>
			
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>合计 :</text>
				<text class="price-tip">￥</text>
				<text class="price" v-if="(Number(price) * count) < 100">{{ (allPrice - reduction).toFixed(2)}}</text>
				<text class="price" v-else>{{(allPrice - reduction).toFixed(2)}}</text>
				<text class="coupon">
					{{ price !== Number(allPrice) ? '含13.00元运费' : '免邮'}}
				</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	export default {
		data() {
			return {
				datas: [],
				tikets:[],
				sku_ids:[],
				count: 1,
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				payType: 8, //1微信 2支付宝
				price: 0, // 价格
				allPrice:0, // 总价
				postPrice: 13, // 运费
				disPrice:0, // 优惠价
				invoice: '不开发票',
				coupon:'选择优惠券',
				goods_id:'',
				couponList: {},  // 发票
				addressData: {
					title: '选择收货地址',
				},
				tiket: {},  // 优惠券
				reduction:0,
				type:'',
				current:null,
				info: {
					address: this.addressData === undefined ? null : this.addressData.id,
					pay_method: null, // 1
					remark: '', // 备注
					invoice: 0, //发票id
					invoice_type: '0', //发票类型  //"0"
					send_invoice_address:'' // 发票邮寄地址
				}
			}
		},
		components:{
			uniNumberBox
		},
		onShow(){
			console.log(this.couponList.id)
			if(this.couponList.id === undefined){
				this.invoice = '不开发票'
			}else if(this.couponList.invoice_bank !== '' && this.couponList.invoice_bank_code !== '' && this.couponList.invoice_phone !== '' && this.couponList.register_address !== ''){
				this.invoice = '增值税发票'
			}else{
				this.invoice = '普通发票'
			}
			
			if(this.tiket.id){
				uniRequest({
					url: '/user/coupons/detection/'+this.tiket.id+'/',
					method: 'GET',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					if(res.data.reduction !== 0 && res.data.reduction !== undefined){
						console.log(res.data.reduction)
						this.reduction = res.data.reduction
						this.coupon = '可减免' + this.reduction + '元'
					}else if(res.data.message){
						this.reduction = 0
						this.$api.msg(res.data.message)
					}
					
				}).catch(error => {
					console.log(error);
				})
			}
		},
		onLoad(option) {
			//商品数据
			let data = JSON.parse(decodeURIComponent(option.data))
			console.log(data)
			this.type = Number(option.type)
			if (this.type === 1) {  // 直接购买
				this.count = Number(option.count)
				data.title = data.name
				data.count = this.count
				this.datas.push(data)
				let price = 0
				const priceArr = []
				let sku_ids = []
				this.datas.forEach(ele => {
					console.log(ele)
					sku_ids.push(ele.sku_spec.skuId)
					price = Number(ele.price) * this.count
					priceArr.push(price)
				})
				this.sku_ids = sku_ids
				priceArr.forEach(ele => {
					this.price += ele
				})
				this.price * this.count >= 100
				? this.allPrice = (this.price).toFixed(2)
				: this.allPrice = (this.price+13).toFixed(2)
				console.log(this.allPrice)
			} else if(this.type === 2) { // 购物车购买
				this.datas = data
				console.log(this.datas)
				let price = 0
				const priceArr = []
				let sku_ids = []
				this.datas.forEach(ele => {
					sku_ids.push(ele.id)
					price = Number(ele.price) * ele.count
					priceArr.push(price)
				})
				priceArr.forEach(ele => {
					this.price += ele
				})
				this.sku_ids = sku_ids
				this.price  >= 100
				? this.allPrice = this.price
				: this.allPrice = (this.price+13).toFixed(2)
				this.price = this.price * this.count.toFixed(2)
			}else if(this.type === 3){ // 再次购买
				data.forEach(ele=>{
					ele.default_image_url = ele.image
					this.price += Number(ele.price)
				})
				let price = this.price
				price >= 100
				? this.allPrice = price
				: this.allPrice = (price+13).toFixed(2)
				this.price = this.price.toFixed(2)
				this.datas = data
			}
			this.getAddress()
			this.useTiket()
			this.getCoupon()
		},
		methods: {
			// 获取地址
			async getAddress(){
				await uniRequest({
					url:'/user/addresses/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(response=>{
					console.log(response.data.addresses,response.data.default_address_id)
					response.data.addresses.forEach(ele=>{
						if(response.data.default_address_id === ele.id){
							this.addressData = ele
						}
					})
				}).catch(error=>{
					console.log(error)
				})
			},
			
			// 获取优惠券
			async useTiket(){
				await uniRequest({
					url: '/user/coupons/user/'+1+'/',
					method: 'GET',
					params:{
						page:1,page_size:10,ordering:'-create_time',
					},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					if(res.status === 200){
						this.tikets = res.data.results
					}else if(res.status === 401){
						this.$api.msg('用户过期或未登录')
					}else if(res.status === 500){
						this.$api.msg('服务器错误')
					}
				}).catch(error => {
					console.log(error);
				})
			},
			
			// 获取优惠券
			async getCoupon(){
				await uniRequest({
					url: '/orders/coupons/',
					method: 'POST',
					data:{
						sku_ids:this.sku_ids
					},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					if(res.status === 200){
						uni.setStorage({//缓存用户登陆状态
						    key: 'couponList',  
						    data: JSON.stringify(res.data),
						})
						if(res.data.length === 0){
							this.coupon = '无可用'
						}
					}else if(res.status === 401){
						this.$api.msg('用户过期或未登录')
					}else if(res.status === 500){
						this.$api.msg('服务器错误')
					}
				}).catch(error => {
					console.log(error);
				})
			},
			
			goToPage(url){
				if(this.coupon === '无可用'){
					this.$api.msg('无可用优惠券')
				}else{
					uni.navigateTo({
						url:url
					})
				}
			},
			
			numberChange(value,e,index) {
				this.datas[index].count = value
				this.count = value
				this.allprice = this.price * value
				this.calcTotal();
			},
			//计算总价
			calcTotal(){
				let list = this.datas;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				list.forEach(item=>{
					total += Number(item.price) * item.count;
				})
				this.allPrice = Number(total).toFixed(2) > 100 ? Number(total).toFixed(2) :  Number(total+13).toFixed(2);
			},
			changePayType(index,data) {
				console.log(index,data)
			},
			submit() {
				console.log(this.info)
				if(this.addressData.id !== undefined){
					this.info.address = this.addressData.id
				}
				if(this.info.address === null){
					this.$api.msg('请选择收货地址')
					return
				}
				
				if(this.info.invoice === undefined){
					this.$api.msg('请选择发票')
					return
				}else{
					this.info.invoice = this.couponList.id
				}
				
				if(this.couponList.id === undefined){
					this.info.invoice_type = 0
				}else if(this.couponList.invoice_bank !== '' && this.couponList.invoice_bank_code !== '' && this.couponList.invoice_phone !== '' && this.couponList.register_address !== ''){
					this.info.invoice_type = 2
				}else{
					this.info.invoice_type = 1
				}
				
				this.info.remark = this.desc
				this.info.pay_method = this.payType
				
				this.createOrder()
			},
			
			async createOrder(){
				// this.orderInfo.pay_method = this.payType
				console.log(this.info)
				if (this.type !== 1) { // 购物车购买
					const res = await uniRequest({   
						url: '/orders/commit/',
						method: 'post',
						data: this.info,
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res)
						if (res.status === 201) {
							this.orderId = res.data.order_id
							uni.redirectTo({
								url: '/pages/money/pay?orderId=' + res.data.order_id
							})
						} else {
							this.$api.msg(res.data.message || res.data[0])
						}
					}).catch(error => {
						console.log(error.data)
					})
				} else {
					console.log(this.info)
					this.info.count = this.count;
					this.info.sku_id = this.sku_ids[0];
					const res = await uniRequest({ // 直接购买
						url: '/orders/directly/create/',
						method: 'post',
						data: this.info,
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res)
						if (res.status === 201 || res.status === 200) {
							uni.redirectTo({
								url: '/pages/money/pay?orderId=' + res.data.order_id
							})
						} else {
							if (res.status === 400) {
								this.$api.msg(res.data.non_field_errors[0])
							} else {
								this.$api.msg(res.data.message)
							}
						}
				
					}).catch(error => {
						console.log(error.data)
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}
	.container{
		padding: 20rpx;
	}
	.address-section {
		padding: 30upx 0;
		background: #fff;
		overflow: hidden;
		position: relative;
		border-radius:20upx;
		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 36upx;
		}
		
		.icon-jia1{
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}
		
		

		.name {
			font-size: 32upx;
			color: $font-color-text6;
			margin-right: 24upx;
		}
		
		.mobile{
			font-size: 28upx;
			color: $font-color-text9;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			font-size: 26upx;
			color: $font-color-text3;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}
	
	.goods-content{
		background: #fff;
		border-radius: 20upx;
		height: 100%;
		margin-bottom: 90upx;
		.goods-section {
			padding-bottom: 1px;
			.g-header {
				display: flex;
				align-items: center;
				height: 84upx;
				padding: 0 30upx;
				position: relative;
			}
		
			.logo {
				display: block;
				width: 50upx;
				height: 50upx;
				border-radius: 100px;
			}
		
			.name {
				font-size: 30upx;
				color: $font-color-base;
				// margin-left: 24upx;
			}
		
			.g-item {
				display: flex;
				margin-top: 20upx;
				padding: 30upx;
				image {
					flex-shrink: 0;
					display: block;
					width: 190upx;
					height: 190upx;
					border-radius: 10upx;
				}
		
				.right {
					flex: 1;
					padding-left: 24upx;
					overflow: hidden;
				}
		
				.title {
					font-size: 28upx;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					color: #333;
				}
				
				.attr{
					font-size: $font-sm - 2upx;
					color: #999999;
					height: 50upx;
					line-height: 80upx;
					background-color: #F7F7F7;
					padding: 10upx;
					border-radius: 10upx;
				}
		
				.spec {
					font-size: 26upx;
					color: $font-color-light;
				}
		
				.price-box {
					display: flex;
					align-items: center;
					font-size: 32upx;
					color: $font-color-dark;
					.price {
						margin-bottom: 4upx;
						color: #EE1D23;
						font-size: 14px;
					}
					.number {
						font-size: 26upx;
						color: $font-color-base;
						margin-left: 20upx;
					}
				}
		
				.step-box {
					position: relative;
				}
			}
		}
	}

	.yt-list {
		background: #fff;
		border-radius: 0 0 20upx 20upx;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: #666666;
			margin-right: 10upx;
		}
		
		

		.cell-tip {
			font-size: 28upx;
			color: $font-color-dark;
			margin-right: 5px;
			font-weight: bold;
			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: #333;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 160upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: #333;
			text-align: right;
		}
	}
	
	.uni-list1{
		padding: 30upx;
		height: 300upx;
		.back_wrap0{
			width: 100%;
			height: 250upx;
			margin-bottom: 30upx;
			background: url('../../static/index/djj.png');
			background-size: 100% 100%;
			position: relative;
			.wrap_left{
				width: 32%;
				height: 100%;
				float: left;
				color: #fff;
				text-align: center;
				padding-top: 50upx;
				.wrap_price{
					font-size: 64upx;
					font-weight: bold;
				}
				.wrap_type{
					display: block;
					padding: 20upx;
				}
			}
			.wrap_center{
				width: 40%;
				height: 100%;
				float: left;
				padding: 40upx;
				.wrap_name{
					font-size: 32upx;
					color: #000000;
					font-weight: bold;
				}
				.wrap_full{
					font-size: 24upx;
					color: #666666;
					font-weight: bold;
					margin: 14px 0;
				}
				.wrap_time{
					font-size: 24upx;
					color: #333333;
					font-weight: bold;
					margin: 14px 0;
					width:150px;
				}
				.wrap_image{
					position: absolute;
					right: 15px;
					top: 20px;
					width: 160upx;
					height:160upx;
				}
			}
			.wrap_right{
				width: 28%;
				height: 100%;
				float: right;
				padding: 40upx;
				.wrap_btn{
					position: relative;
					right: 15px;
					top: 30px;
					width: 160upx;
					height:60upx;
					line-height:60upx;
					border: 1px solid #EE1D23;
					border-radius: 18px;
					color: #EE1D23;
					font-size: 32upx;
				}
			}
		}
		.back_wrap1{
			width: 100%;
			height: 250upx;
			margin-bottom: 30upx;
			background: url('../../static/index/zkj.png');
			background-size: 100% 100%;
			position: relative;
			.wrap_left{
				width: 32%;
				height: 100%;
				float: left;
				color: #fff;
				text-align: center;
				padding-top: 50upx;
				.wrap_price{
					font-size: 64upx;
					font-weight: bold;
				}
				.wrap_type{
					display: block;
					padding-top: 20upx;
				}
			}
			.wrap_center{
				width: 40%;
				height: 100%;
				float: left;
				padding: 40upx;
				.wrap_name{
					font-size: 32upx;
					color: #000000;
					font-weight: bold;
				}
				.wrap_full{
					font-size: 24upx;
					color: #666666;
					font-weight: bold;
					margin: 14px 0;
				}
				.wrap_time{
					font-size: 24upx;
					color: #333333;
					font-weight: bold;
					margin: 14px 0;
					width:150px;
				}
				.wrap_image{
					position: absolute;
					right: 15px;
					top: 20px;
					width: 160upx;
					height:160upx;
				}
			}
			.wrap_right{
				width: 28%;
				height: 100%;
				float: right;
				padding: 40upx;
				.wrap_btn{
					position: relative;
					right: 15px;
					top: 30px;
					width: 160upx;
					height:60upx;
					line-height:60upx;
					border: 1px solid #EE1D23;
					border-radius: 18px;
					color: #EE1D23;
					font-size: 32upx;
				}
			}
		}
		.back_wrap2{
			width: 100%;
			height: 250upx;
			margin-bottom: 30upx;
			background: url('../../static/index/mjj.png');
			background-size: 100% 100%;
			.wrap_left{
				width: 32%;
				height: 100%;
				float: left;
				color: #fff;
				text-align: center;
				padding-top: 50upx;
				.wrap_price{
					font-size: 64upx;
					font-weight: bold;
				}
				.wrap_type{
					display: block;
					padding-top: 20upx;
				}
			}
			.wrap_center{
				width: 40%;
				height: 100%;
				float: left;
				padding: 40upx;
				.wrap_name{
					font-size: 32upx;
					color: #000000;
					font-weight: bold;
				}
				.wrap_full{
					font-size: 24upx;
					color: #666666;
					font-weight: bold;
					margin: 14px 0;
				}
				.wrap_time{
					font-size: 24upx;
					color: #333333;
					font-weight: bold;
					margin: 14px 0;
					width:150px;
				}
				.wrap_image{
					position: absolute;
					right: 15px;
					top: 20px;
					width: 160upx;
					height:160upx;
				}
			}
			.wrap_right{
				width: 28%;
				height: 100%;
				float: right;
				padding: 40upx;
				.wrap_btn{
					position: relative;
					right: 15px;
					top: 30px;
					width: 160upx;
					height:60upx;
					line-height:60upx;
					border: 1px solid #EE1D23;
					border-radius: 18px;
					color: #EE1D23;
					font-size: 32upx;
				}
			}
		}
	}
	
	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}
		
		.coupon{
			font-size: $font-sm;
			color: $font-color-light;
			margin-left: 10px;
			text{
				color: $font-color-dark;
			}
		}

		.price-tip {
			color: $base-color;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: $base-color;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 240upx;
			height: 35px;
			margin-right: 20px;
			border-radius: 30px;
			color: #fff;
			font-size: 28upx;
			background: linear-gradient(to right, #EE1D23,#F04023,#EE1D23);
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			margin-left: 15px;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 34upx;
			color: $base-color;

			&:before {
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}
	.pay-type-list {
		background-color: #fff;
		padding-left: 20upx;
		.type-item{
			height: 120upx;
			padding: 0px 30upx 0 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		
		
		.icon-alipay {
			color: #01aaef;
		}
		.icon-weixinzhifu {
			color: #36cb59;
			
		}
		.icon-huodaofukuan {
			color: #fe8e2e;
		}
		.icon-zhipiao {
			color: red;
		}
		
		.icon-zhuangzhang{
			color: #25bb87;
		}
		
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	
	.checkbox{
		position:absolute;
		left:0upx;
		z-index: 8;
		font-size: 44upx;
		line-height: 1;
		padding: 4upx;
		color: $font-color-disabled;
		background:#fff;
		border-radius: 50px;
	}
	/* 复选框选中状态 */
	.checkbox.checked{
		color: #fa436a;
	}
	
</style>
