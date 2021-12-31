<template>
	<view class="app">
		<view class="price-box">
			<view class="" style="display: flex;">
				<text class="time">剩余支付时间 : </text>
				<uni-countdown color="#999" background-color="#f7f7f7" border-color="#00B26A" :show-day="false"
					:showHour="false" :showColon="false" :minute="minute" :second="second" @timeup="timeChange">
				</uni-countdown>
			</view>

			<text class="price">{{price}}</text>
			<text class="time" @click="navoToPage('/pages/order/lookDetails/lookDetails?order_id='+orderInfo.order_sub[0].order_id)">
				查看订单详情
				<!-- <text class="yticon icon-you" style="font-size: 12px;margin-left: 10upx;"></text> -->
			</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b" v-for="(item,index) in payList" @click="changePayType(item.payType)">
				<text :class="item.icon"></text>
				<view class="con">
					<text class="tit">{{item.payName}}</text>
					<text>{{item.payDesc}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#EE1D23" :checked='payType == item.payType' />
					</radio>
				</label>
			</view>
		</view>

		<view class="submit-pay">
			<text class="mix-btn" @click="goPay(payType)">立即支付</text>
		</view>
		
		<!-- #ifdef H5 -->
		<ssPaymentPassword ref="paymentPassword" :mode="mode" :value="pay_password" @submit="submitHandle"/>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<pay-keyboard :show_key="show_key" @hideFun="hideFun" @getPassword="getPassword"></pay-keyboard>
		<!-- #endif -->
		<show-modal></show-modal>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import ssPaymentPassword from '@/components/sanshui-payment-password/index.vue';
	import jsencrypt from '@/components/jsencrypt/jsencrypt.vue';
	import jsrsasign from '@/node_modules/jsrsasign/lib/jsrsasign.js';
	import payKeyboard from '@/components/keyboard.vue'
	export default {
		data() {
			return {
				payType: 8,
				payList:[
					{icon:'yticon icon-weixinzhifu',payName:'微信',payDesc:'推荐使用微信支付',payType:8},
					{icon:'yticon icon-alipay',payName:'支付宝',payDesc:'',payType:2},
					{icon:'yticon icon-yuezhifu',payName:'余额',payDesc:'',payType:9}
				],
				price: null,
				disPrice: null,
				coupons_id: 0,
				pay_password: '',
				nowTime:'',
				orderId:null,
				minute: 0,
				second: 0,
				timer:'',
				time:'',
				mode: 0,
				private: '', //签名
				public: '', //加密
				orderInfo: {},
				title: 'Hello',
				show_key:false
			};
		},
		components: {
			ssPaymentPassword,payKeyboard
		},
		onBackPress(e) {
			this.$showModal({
				title: '确认放弃支付?',
				content: `您的订单将在${this.time}后自动关闭，请尽快完成支付`,
				cancelText: "取消",
				confirmText: "确认",
				success: async (e) => {
					console.log(e)
					if (e.confirm) {
						uni.redirectTo({
							url: '/pages/order/order?state=0'
						})
					}
				}
			});
			return true
		},
		created() {
			this.timer = setInterval(()=>{
				this.initTime()
			},1000)
		},
		onLoad(options) {
			this.orderId = options.orderId
			this.getOrderList()
		},
		destroyed() {
			if (this.timer) { // 注意在vue实例销毁前，清除我们的定时器
			   clearInterval(this.timer);
			}
		},
		methods: {
			async getOrderList(){
				await uniRequest({
					url: '/orders/info/',
					method: 'post',
					data: {id:this.orderId},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res.data)
					if (res.status === 201 || res.status === 200) {
						this.orderInfo = res.data
						this.payType = res.data.pay_method
						this.price = Number(res.data.total_amount).toFixed(2)
						this.getTime(res.data.create_time)
					} else {
						this.$api.msg(res.data.message || res.data[0])
					}
				}).catch(error => {
					console.log(error.data)
				})
			},
			
			showFun(){
				this.show_key = true
			},
			hideFun(){
				this.show_key = false
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
			
			//选择支付方式
			async changePayType(type) {
				this.payType = type;
				console.log(this.payType)
				await uniRequest({
					url: '/orders/change/paymethod/',
					method: 'POST',
					data: {
						order_id:this.orderId,
						pay_method:type
					},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					this.getOrderList()
				}).catch(error => {
					console.log(error.data)
				})
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
			//确认支付
			confirm: async function() {
				this.orderInfo.pay_method = this.payType
				console.log(this.orderInfo)
				if (this.orderInfo.goods_id === undefined) { // 购物车购买
					const res = await uniRequest({
						url: '/orders/commit/',
						method: 'post',
						data: this.orderInfo,
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res)
						if (res.status === 201) {
							this.orderId = res.data.order_id
							this.goPay(this.orderInfo.pay_method)
						} else {
							this.$api.msg(res.data.message || res.data[0])
						}
					}).catch(error => {
						console.log(error.data)
					})
				} else {
					console.log(this.orderInfo)
					this.orderInfo.sku_id = this.orderInfo.goods_id
					const res = await uniRequest({ // 直接购买
						url: '/orders/directly/create/',
						method: 'post',
						data: this.orderInfo,
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res)
						if (res.status === 201 || res.status === 200) {
							this.orderId = res.data.order_id
							this.goPay(this.orderInfo.pay_method)
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

			async goPay(payType) {
				if (payType === 2) {
					// #ifdef APP-PLUS
					await uniRequest({
						url: '/payment/ali/app/orders/' + this.orderId + '/',
						method: 'get',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res.data)
						const orderInfo = res.data.message
						console.log(orderInfo)
						uni.requestPayment({
							provider: 'alipay', // wxpay
							orderInfo: orderInfo,
							success: function(ress) {
								console.log(ress)
								uni.showToast({
									title: '支付成功'
								})
								uni.switchTab({
									url: '/pages/money/paySuccess'
								})
							},
							fail: function(err) {
								console.log(err, err.errMsg)
								uni.showModal({
									// content: "抱歉，您的支付不成功",
									content: "支付失败,原因为: " + err.errMsg,
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
						url: '/payment/ali/orders/' + this.orderId + '/?mobile=1',
						method: 'get',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res.data)
						location.href = 'https://openapi.alipay.com/gateway.do?' + res.data.alipay_url
					}).catch(error => {
						console.log(error.data)
					})
					// #endif

				} else if (payType === 8) {
					// #ifdef APP-PLUS
					await uniRequest({
						url: '/payment/wechat/app/orders/' + this.orderId + '/',
						method: 'get',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
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
						
						uni.getProvider({
							service: 'payment',
							success: function(re) {
								if (~re.provider.indexOf('wxpay')) {
									uni.requestPayment({
										provider: 'wxpay', // wxpay
										orderInfo: JSON.stringify(orderInfo),
										success: function(ress) {
											console.log('success:' + JSON.stringify(ress));
											uni.showToast({
												title: '支付成功',
												showCancel: false
											})
											uni.switchTab({
												url: '/pages/money/paySuccess'
											})
										},
										fail: function(err) {
											console.log('fail:' + JSON.stringify(err));
											uni.showModal({
												content: "支付失败,原因为: " + err.errMsg,
												// content: '抱歉，您的支付不成功',
												showCancel: false
											})
										},
										complete:function(ress){
											console.log(ress)
										}
									});
								}else{
									console.log('111')
								}
							}
						});
					}).catch(error => {
						console.log(error.data)
					});
					// #endif
					// #ifdef H5
					uniRequest({
						url: '/payment/wechat/h5/orders/' + this.orderId + '/',
						method: 'get',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res.data)
						if(res.data.mweb_url){
							location.href = res.data.mweb_url
						}else{
							this.$api.msg(res.data.message)
						}
						// plus.runtime.openURL(res.data.mweb_url);
					}).catch(error => {
						console.log(error.data)
					})
					// #endif
				} else if (payType === 9) {
					// #ifdef H5
					this.getKey()
					this.mode = 1
					this.$refs.paymentPassword.modalFun('show');
					// #endif
					// #ifdef APP-PLUS
					this.getKey()
					this.show_key = true
					// #endif
				}
			},
			
			getKey(){
				uniRequest({
					url: '/payment/secret/key/',
					method: 'GET',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(response => {
					if (response.status === 200) {
						console.log(response.data)
						this.private = response.data.private
						this.public = response.data.public
					} else if (response.status === 400) {
						this.$api.msg(response.data.message)
					} else if (response.status === 500) {
						this.$api.msg('服务器错误')
					}
				}).catch(error => {
					console.log(error)
				})
			},
			
			//公共方法挂载
			getCode(publiukey, data) {
				//此处操作与后端约定参数
				// 创建RSAKey对象
				var rsa = new jsrsasign.RSAKey();
				//因为后端提供的是pck#8的密钥对，所以这里使用 KEYUTIL.getKey来解析密钥
				var k = publiukey
				// 将密钥转码
				rsa = jsrsasign.KEYUTIL.getKey(k);
				// 创建Signature对象，设置签名编码算法
				var sig = new jsrsasign.KJUR.crypto.Signature({
					"alg": "SHA256withRSA",
					prvkeypem: publiukey
				});
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

			jsencrypt(data) {
				//公钥.
				var publiukey = this.public;
				//限制117字符加密 (超过117字节会加载失败 中文或其他字符超过41个字符会加密失败)
				var pubblicData = jsencrypt.setEncrypt(publiukey, data);
				return pubblicData
			},
			
			jsencryptRsa(data) {
				//公钥.
				var privatekey = this.private;
				//限制117字符加密 (超过117字节会加载失败 中文或其他字符超过41个字符会加密失败)
				var ArrayData = this.getCode(privatekey, data);
				console.log(ArrayData)
				return ArrayData
			},

			async submitHandle(e) {
				this.pay_password = e.value
				this.pay_password = this.jsencrypt(this.pay_password)
				const orderData = {
					order_id: this.orderId,
					pwd: this.pay_password,
					time: Date.parse(new Date())
				}
				console.log(orderData)
				const sign = this.jsencryptRsa(JSON.stringify(orderData))
				const response = await uniRequest({
					url: '/payment/balance/',
					method: 'POST',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
					data: {
						order_id: this.orderId,
						pwd: this.pay_password,
						time: Date.parse(new Date()),
						sign: sign,
					}
				}).then(response => {
					if (response.status === 200) {
						console.log(response.data)
						uni.showToast({
							title: "支付成功"
						})
						uni.navigateTo({
							url: '/pages/money/paySuccess'
						})
					} else if (response.status === 400) {
						this.$api.msg(response.data.message || response.data[0])
					} else if (response.status === 500) {
						this.$api.msg('服务器错误')
					}
				}).catch(error => {
					console.log(error)
				})
			},
			
			async getPassword(n){
				console.log("用户输入的密码",n)
				uni.showLoading({
					title: '校验安全密码中'
				});
				this.pay_password = n.password
				this.pay_password = this.jsencrypt(this.pay_password)
				const orderData = {
					order_id: this.orderId,
					pwd: this.pay_password,
					time: Date.parse(new Date())
				}
				const sign = this.jsencryptRsa(JSON.stringify(orderData))
				const response = await uniRequest({
					url: '/payment/balance/',
					method: 'POST',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
					data: {
						order_id: this.orderId,
						pwd: this.pay_password,
						time: Date.parse(new Date()),
						sign: sign,
					}
				}).then(response => {
					console.log(response)
					uni.hideLoading()
					if (response.status === 200) {
						console.log(response.data)
						uni.showToast({
							title: "支付成功"
						})
						this.show_key = false;
						uni.navigateTo({
							url: '/pages/money/paySuccess'
						})
					} else if (response.status === 400) {
						this.$api.msg(response.data.message || response.data[0])
					} else if (response.status === 500) {
						this.$api.msg('服务器错误')
					}
				}).catch(error => {
					console.log(error)
				})
			},
			
			navoToPage(url){
				uni.navigateTo({
					url:url
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

	page {
		position: relative;
		height: 100%;
	}

	/deep/ uni-radio .uni-radio-input {
		width: 18px;
		height: 18px;
	}
	
	.pay_btn{ width:100vw;height: 100vh;display: flex;flex-direction: column;align-items: center;justify-content: center;
		text{ padding:20rpx 30rpx;background: #007AFF;border-radius: 10rpx;font-size:28rpx;color: #ffffff;}
	}

	.price-box {
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 46upx;
			color: $uni-color-hangfeng;
			margin-top: 12upx;
			font-weight: bold;
			line-height: 70upx;

			&:before {
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}

		.time {
			color: #999;
			font-size: 24upx;
			line-height: 62upx;
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		margin: 30upx;
		border-radius: 20upx;
		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.yticon {
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

		.icon-yuezhifu {
			color: #D6003C;
		}

		.icon-zhipiao {
			color: red;
		}


		.icon-zhuangzhang {
			color: #25bb87;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.submit-pay {
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
		background: linear-gradient(to right, #EE1D23, #F04023);
		border-radius: 40upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
