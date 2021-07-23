<template>
	<view class="content">
		<text class="success-icon yticon icon-xuanzhong2"></text>
		<text class="tit">订单提交成功</text>
		
		<view class="btn-group">
			<navigator url="/pages/order/order?state=0" open-type="redirect" class="mix-btn">查看订单</navigator>
			<view>
				<navigator url="/pages/index/index" v-if="payType === 1 || payType === 3 || payType === 4" open-type="switchTab" class="mix-btn hollow">继续购物</navigator>
				<navigator @click="goPay(payType)" v-if="payType === 2 || payType === 8 || payType === 9" open-type="switchTab" class="mix-btn hollow">去支付</navigator>
			</view>
		</view>
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
	import uniRequest from 'uni-request';
	import ssPaymentPassword from '@/components/sanshui-payment-password'
	import jsencrypt from '@/components/jsencrypt/jsencrypt.vue';
	import jsrsasign from '@/node_modules/jsrsasign/lib/jsrsasign.js'
	export default {
		data() {
			return {
				orderId:'',
				payType:null,
				pay_password:'',
				show:false,
				mode:0,
				private:'', //签名
				public:'', //加密
			}
		},
		components:{ssPaymentPassword},
		async onLoad(option){
			console.log(JSON.parse(option.payType))
			this.payType = JSON.parse(option.payType)
			this.orderId = JSON.parse(option.orderId)
			
			const response = await uniRequest({
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
			async goPay(payType){
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				if (isWeixin) {
					this.show = true
					return
				}
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
		}
	}
</script>

<style lang='scss'>
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 100%;
		height: 100%;
		color: #fff;
		background-color: #333333;
	}
	
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
