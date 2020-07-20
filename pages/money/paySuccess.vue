<template>
	<view class="content">
		<text class="success-icon yticon icon-xuanzhong2"></text>
		<text class="tit">订单提交成功</text>
		
		<view class="btn-group">
			<navigator url="/pages/order/order?state=0" open-type="redirect" class="mix-btn">查看订单</navigator>
			<view>
				<navigator url="/pages/index/index" v-if="payType === 1 || payType === 3 || payType === 4" open-type="switchTab" class="mix-btn hollow">继续购物</navigator>
				<navigator @click="goPay(payType)" v-if="payType === 2 || payType === 8" open-type="switchTab" class="mix-btn hollow">去支付</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				orderId:'',
				payType:null,
			}
		},
		onLoad(option){
			console.log(JSON.parse(option.payType))
			this.payType = JSON.parse(option.payType)
			this.orderId = JSON.parse(option.orderId)
		},
		methods: {
			async goPay(payType){
				if(payType === 2){
					// #ifdef APP-PLUS
					await uniRequest({
						url: 'orders/app/'+this.orderId+'/payment/',
						method: 'get',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res.data)
						const orderInfo = res.data.message
						console.log(orderInfo)
						uni.requestPayment({
							provider: 'alipay',  // wxpay
							orderInfo:orderInfo,
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
									content: "抱歉，您的支付不成功",
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
						console.log(res.data)
						location.href =  'https://openapi.alipay.com/gateway.do?'+res.data.alipay_url
					}).catch(error => {
						console.log(error.data)
					})
					// #endif
					
				}else if(payType === 8){
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
						// plus.runtime.openURL(res.data.mweb_url);
					}).catch(error => {
						console.log(error.data)
					})
					// #endif
				}
				
			}
		}
	}
</script>

<style lang='scss'>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.success-icon{
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}
	.tit{
		font-size: 38upx;
		color: #303133;
	}
	.btn-group{
		padding-top: 100upx;
	}
	.mix-btn {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 80upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
</style>
