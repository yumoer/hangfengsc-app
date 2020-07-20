<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price" v-if="price >= 99">{{price}}</text>
			<text class="price" v-else>{{Number(price) + 13.00}}</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(8)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 8' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-huodaofukuan"></text>
				<view class="con">
					<text class="tit">货到付款</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
		</view>
		
		<text class="mix-btn" @click="confirm">确认支付方式</text>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				payType: 8,
				price:null,
				disPrice:null,
				coupons_id:0,
				orderInfo: {
					address: null,
					pay_method: null, // 1
					// 央采字段开始
					name: '',
					invoice: null, //发票id
					invoice_type: '0', //发票类型  //"0"
					invoice_title: "", //发票抬头
					invoice_org_code: '', //纳税人识别号
					invoice_phone: '', // 注册电话
					invoice_back_code: '', //开户银行账号
					invoice_bank: '', // 注册银行
				}
			};
		},
		
		onLoad(options) {
			this.orderInfo = JSON.parse(options.info)
			console.log(this.orderInfo,options)
			this.price = options.price
			this.orderInfo.count = options.count
			this.orderInfo.goods_id = options.goods_id
			this.coupons_id = options.couponId
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				console.log(type)
				this.payType = type;
			},
			//确认支付
			confirm: async function() {
				this.orderInfo.pay_method = this.payType
				console.log(this.orderInfo.goods_id)
				if(this.orderInfo.goods_id === undefined || this.orderInfo.goods_id === ''){   // 购物车购买
					const res = await uniRequest({
						url: '/orders/',
						method: 'post',
						data:this.orderInfo,
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res)
						if(res.status === 201){
							this.$api.msg('订单提交成功')
							uni.redirectTo({
								url: '/pages/money/paySuccess?payType='+JSON.stringify(this.orderInfo.pay_method)+'&orderId='+ JSON.stringify(res.data.order_id)
							})
							console.log(this.coupons_id)
							if(this.coupons_id !== undefined){
								uniRequest({
									url: '/coupons/employ/',
									method: 'GET',
									data:{
										order_id:res.data.order_id,
										coupons_id:this.coupons_id,
									},
									headers: {
										Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
									},
								}).then(ress => {
									console.log(ress.data.total_amount)
								}).catch(error => {
									console.log(error);
								})
							}
						}else{
							this.$api.msg(res.data.message)
						}
					}).catch(error => {
						console.log(error.data)
					})
				}else{
					console.log(this.orderInfo)
					const res = await uniRequest({  // 直接购买
						url: '/orders/directly/create/',
						method: 'post',
						data:this.orderInfo,
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res)
						if(res.status === 201 || res.status === 200){
							this.$api.msg('订单提交成功')
							uni.redirectTo({
								url: '/pages/money/paySuccess?payType='+JSON.stringify(this.orderInfo.pay_method)+'&orderId='+ JSON.stringify(res.data.order_id)
							})
							console.log(this.coupons_id)
							if(this.coupons_id !== 'undefined'){
								uniRequest({
									url: '/coupons/employ/',
									method: 'GET',
									data:{
										order_id:res.data.order_id,
										coupons_id:this.coupons_id,
									},
									headers: {
										Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
									},
								}).then(ress => {
									console.log(ress.data.total_amount)
								}).catch(error => {
									console.log(error);
								})
							}
						}else{
							if(res.status === 400){
								this.$api.msg(res.data.non_field_errors[0])
							}else{
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

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		
		.icon-gongwuka {
			color: #ea5504;
		}
		
		.icon-zhangqi {
			color: #fe8e2e;
		}
		
		.icon-xianjin {
			color: #fe5e9c;
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
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
