<template>
	<view>
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

		<view class="goods-section">
			<view class="g-header b-b">
				<!-- <image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image> -->
				<text class="name">商品列表</text>
			</view>
			<!-- 商品列表 -->
			<view class="g-item" v-if="datas.length > 0" v-for="(data,index) in datas" :key="index">
				<image :src="data.default_image_url"></image>
				<view class="right">
					<text class="title clamp">{{data.name}}</text>
					<view class="price-box" style="margin-top: 20px;">
						<text class="price" style="color: red;">￥{{data.price}}</text>
						<text class="number" style="float: right;display: inherit;">x {{data.count}}</text>
					</view>
				</view>
			</view>
			<view class="g-item" v-if="datas.length === undefined">
				<image :src="datas.default_image_url"></image>
				<view class="right">
					<text class="title clamp">{{datas.name}}</text>
					<view class="price-box" style="margin-top: 20px;">
						<text class="price" style="color: red;">￥{{datas.price}}</text>
						<text class="number" style="float: right;display: inherit;">x {{datas.count}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠明细 -->
		<view class="yt-list">
			<navigator url="/pages/invoice/invoice?source=1" class="yt-list-cell b-b">
				<view class="cell-icon">
					票
				</view>
				<text class="cell-tit clamp">发票信息</text>
				<text class="cell-tip active" style="margin-right: 5px;">{{invoice}}</text>
				<text class="yticon icon-you" style="font-size: 14px;line-height: 20px"></text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</navigator>
			
			<view class="uni-list" v-if="couponList.id !== undefined">
				<view class="pay-type-list">
					<view class="type-item b-b">
						<view class="con">
							<text class="tit">{{couponList.invoice_title}}</text>
							<text>{{couponList.invoice_org_code}}</text>
						</view>
						<view class="right">
							<text class="price" style="color: #fa436a;font-size: 14px;" v-if="couponList.invoice_bank === '' || couponList.invoice_bank_code === '' || couponList.invoice_phone === '' || couponList.register_address === ''">普票|电子票</text>
							<text class="price" style="color: #fa436a;font-size: 14px;" v-else>增值税发票</text>
							<text class="del-btn yticon icon-fork" style="margin-left: 20upx;" @click="delInvoice()"></text>
						</view>
					</view>
					
				</view>
			</view>
			
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">发票邮寄地址</text>
				<input class="desc" type="text" v-model="info.send_invoice_address" placeholder="请填写发票具体邮寄地址" placeholder-class="placeholder" />
			</view>
			
		</view>
		
		<!-- 优惠券 -->
		<view class="yt-list" v-if="type === 'coupon'">
			<navigator url="/pages/coupon/exchange?source=1" class="yt-list-cell b-b">
				<view class="cell-icon">
					惠
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active" style="margin-right: 5px;">选择优惠券</text>
				<text class="yticon icon-you" style="font-size: 14px;line-height: 20px"></text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</navigator>
			
			<view class="uni-list" style="padding: 30upx 0upx;height: 200upx;" v-if="tiket.id !== undefined">
				<view class="pay-type-list">
					<view class="type-item b-b">
						<view class="con">
							<image style="background: #ea5504;align-items: center;width:100%;height: 180upx;line-height: 180upx;" :src="tiket.coupons.image" mode=""></image>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		
		
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip" v-if="!price">￥{{Number(datas.price) * count}}2</text>
				<text class="cell-tip" v-else>￥{{Number(price)}}</text>
			</view>
			
			<view class="yt-list-cell b-b">

				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip" v-if="price >= 99">免运费</text>
				<text class="cell-tip" v-else>￥13.00</text>
			</view>
			
			
			
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<!-- 购物车 -->
				<text v-if="price >= 99">
					<text class="price" v-if="!price">{{Number(datas.price) * count}}</text>
					<text class="price" v-else>{{Number(price) - reduction}}</text>
				</text>
				<text v-else>
					<text class="price" v-if="!price">{{Number(datas.price) * count + 13.00}}</text>
					<text class="price" v-else>{{Number(price) + 13.00}}</text>
				</text>
				<text class="coupon">
					已优惠<text>{{reduction}}</text>元
				</text>
				
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				datas: [],
				count: 1,
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				price: 0,
				disPrice:0, // 优惠价
				invoice: '选择发票',
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
					invoice: '', //发票id
					invoice_type: '0', //发票类型  //"0"
					send_invoice_address:'' // 发票邮寄地址
				}
			}
		},
		onShow(){
			console.log(this.couponList)
			console.log(this.tiket)
			if(this.couponList.id !== undefined){
				this.info.invoice = this.couponList.id
			}
			if(this.tiket.id !== undefined){
				uniRequest({
					url: '/coupons/detection/'+this.tiket.id+'/',
					method: 'GET',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					if(res.data.reduction !== 0 && res.data.reduction !== undefined){
						console.log(res.data.reduction)
						this.reduction = res.data.reduction
					}else if(res.data.message){
						// console.log('该商品不支持优惠')
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
			let data = JSON.parse(option.data)
			console.log(data)
			this.type = option.type
			console.log(this.type)
			if (option.count) {  // 直接购买
				this.datas = data
				this.datas.count = option.count
				this.price = this.datas.price*option.count
				this.goods_id = option.goods_id
			} else { // 购物车购买
				this.datas = data
				console.log(this.datas)
				this.type = "coupon"
				let price
				const priceArr = []
				this.datas.forEach(ele => {
					price = Number(ele.price) * ele.count
					priceArr.push(price)
				})
				priceArr.forEach(ele => {
					this.price += ele
				})
				this.price = this.price.toFixed(2)
			}
		},
		methods: {
			//显示发票面板
			toggleMask(type) {
				console.log(type)
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},
			delInvoice(){
				this.couponList = {}
			},
			
			//选择优惠券
			chooseCoupon(){
				uni.navigateTo({
					url:'/pages/coupon/exchange?source=1'
				})
			},
			
			async getAddress(){
				const response = await uniRequest({
					url:'/addresses/',
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
			
			unique(arr) {
				const res = new Map();
				return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
		    },
			
			numberChange(data) {
				this.number = data.number;
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
				
				this.info.remark = this.desc
				
				if(this.couponList.id === undefined){
					this.info.invoice_type = '0'
				}else if(this.couponList.invoice_bank === '' || this.couponList.invoice_bank_code === '' || this.couponList.invoice_phone === '' || this.couponList.register_address === ''){
					this.info.invoice_type = '1'
					
				}else{
					this.info.invoice_type = '2'
				}
				
				if(this.goods_id !== '' || this.datas.count !== undefined){ // 直接购买
					uni.redirectTo({
						url: '/pages/money/pay?info=' + JSON.stringify(this.info) + '&price='+ Number(this.price- this.reduction)  + '&goods_id='+ this.goods_id + '&count='+this.datas.count + '&couponId='+this.tiket.id
					})
				}else{
					uni.redirectTo({  // 购物车购买
						url: '/pages/money/pay?info=' + JSON.stringify(this.info) + '&price='+ (this.price - this.reduction)
					})
				}
				
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

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
			font-size: 44upx;
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
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
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

	.goods-section {
		margin-top: 16upx;
		background: #fff;
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
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
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
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
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

	.yt-list {
		margin-top: 16upx;
		background: #fff;
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
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
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
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
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
