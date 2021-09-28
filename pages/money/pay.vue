<template>
	<view class="app">
		<view class="price-box">
			<text class="time">剩余支付时间 : 20分59秒</text>
			<text class="price">{{price.toFixed(2)}}</text>
			<text class="time">
				查看订单详情
				<text class="yticon icon-you" style="font-size: 12px;"></text></text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(8)">
				<text class="yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#EE1D23" :checked='payType == 8' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝</text>
				</view>
				<label class="radio">
					<radio value="" color="#EE1D23" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(9)">
				<text class="yticon icon-yuezhifu"></text>
				<view class="con">
					<text class="tit">余额</text>
				</view>
				<label class="radio">
					<radio value="" color="#EE1D23" :checked='payType == 9' />
					</radio>
				</label>
			</view>
		</view>
		
		<view class="submit-pay">
			<text class="mix-btn" @click="confirm">确认支付</text>
		</view>
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
			console.log(options.price) 
			this.price = Number(options.price) < 100 ? Number(options.price) + 13 : Number(options.price)
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
						url: '/orders/commit/',
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
					this.orderInfo.sku_id = this.orderInfo.goods_id
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
		height: 100%;
	}
	page{
		position: relative;
		height: 100%;
	}
	/deep/ uni-radio .uni-radio-input{
		width: 18px;
		height: 18px;
	}
	.price-box {
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;
		.price{
			font-size: 46upx;
			color: $uni-color-hangfeng;
			margin-top: 12upx;
			font-weight: bold;
			line-height: 70upx;
			&:before{
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}
		.time{
			color: #999;
			font-size: 24upx;
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		margin: 30upx;
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
		
		.yticon{
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
		.icon-huodaofukuan1 {
			color: #fe8e2e;
		}
		
		.icon-yuezhifu{
			color: #D6003C;
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
	.submit-pay{
		width: 100%;
		height: 80upx;
		position: absolute;
		bottom: 70upx;
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 590upx;
		height: 100%;
		margin: 0 auto;
		font-size: $font-lg;
		color: #fff;
		background: linear-gradient(to right,#EE1D23,#F04023) ;
		border-radius: 40upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
