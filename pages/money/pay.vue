<template>
	<view class="app">
		<view class="price-box">
			<text class="time">剩余支付时间 : 20分59秒</text>
			<text class="price">{{price.toFixed(2)}}</text>
			<text class="time">
				查看订单详情
				<text class="yticon icon-you" style="font-size: 12px;margin-left: 10upx;"></text></text>
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
			<text class="mix-btn" @click="confirm">立即支付</text>
		</view>
		
		<ssPaymentPassword ref="paymentPassword" :mode="mode" :value="pay_password" @submit="submitHandle" />
		
		<show-modal></show-modal>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import ssPaymentPassword from '@/components/sanshui-payment-password/index.vue';
	import jsencrypt from '@/components/jsencrypt/jsencrypt.vue';
	import jsrsasign from '@/node_modules/jsrsasign/lib/jsrsasign.js'
	export default {
		data() {
			return {
				payType: 8,
				price:null,
				disPrice:null,
				coupons_id:0,
				pay_password:'',
				mode:0,
				private:'', //签名
				public:'', //加密
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
		components:{ssPaymentPassword},
		onBackPress(e) {
			this.$showModal({
				title:'确认放弃支付?',
			    content: '您的订单将在23小时58分30秒后自动关闭，请尽快完成支付',
				cancelText:"取消",
				confirmText:"确认",
			    success: async(e) =>{
					console.log(e)
			    	if(e.confirm){
						uni.switchTab({
							url:'/pages/cart/cart'
						})
			    	}
			    }
			});
			return true
		},
		
		onLoad(options) {
			this.orderInfo = JSON.parse(options.info)
			console.log(this.orderInfo,options)
			console.log(options.price) 
			this.price = Number(options.price)
			this.orderInfo.count = options.count
			this.orderInfo.goods_id = options.goods_id
			this.coupons_id = options.couponId
			uniRequest({
				url:'/payment/secret/key/',
				method:'GET',
				headers:{
					Authorization:'JWT '+uni.getStorageSync('userInfo').token
				},
			}).then(response=>{
				if(response.status === 200){
					console.log(response.data)
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

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
				console.log(this.payType)
			},
			//确认支付
			confirm: async function() {
				this.orderInfo.pay_method = this.payType
				console.log(this.orderInfo)
				if(this.orderInfo.goods_id === undefined){   // 购物车购买
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
							this.orderId = res.data.order_id
							this.goPay(this.orderInfo.pay_method)
						}else{
							this.$api.msg(res.data.message || res.data[0])
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
							this.orderId = res.data.order_id
							this.goPay(this.orderInfo.pay_method)
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
			
			async goPay(payType){
				if(payType === 2){
					// #ifdef APP-PLUS
					await uniRequest({
						url: '/payment/ali/app/orders/'+this.orderId+'/',
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
						url: '/payment/ali/orders/'+this.orderId+'/?mobile=1',
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
						// plus.runtime.openURL(res.data.mweb_url);
					}).catch(error => {
						console.log(error.data)
					})
					// #endif
				}else if(payType === 9){
					this.mode = 1
					this.$refs.paymentPassword.modalFun('show');
					
				}
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
			    /* // 对加密后内容进行URI编码
			     sign = encodeURIComponent(sign);
			     //把参数与密文拼接好，返回
			     var params = data+'&sign='+sign; */
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
						uni.navigateTo({
							url: '/pages/money/paySuccess'
						})
					}else if(response.status === 400){
						this.$api.msg(response.data.message || response.data[0])
					}else if(response.status === 500){
						this.$api.msg('服务器错误')
					}
				}).catch(error=>{
					console.log(error)
				})
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
