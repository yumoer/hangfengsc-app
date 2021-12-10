<template>
	<view class="container">
		<view class="header">
			<view class="back-btn-left yticon icon-zuojt-login" @click="navBack"></view>
			<view class="back-btn-right" @click="toRegist">注册</view>
		</view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="aside">
				<view class="content">
					<view class="msg">
						<text class="text">您好,</text><br>
						<text class="text">欢迎来到行丰商城!</text>
					</view>
					<view class="input-content" v-if="showCode">
						<view class="wrap">
							<view class="input-item">
								<input 
									:value="username" 
									placeholder="请输入手机号"
									maxlength="20"
									data-key="username"
									@input="inputChange"
								/>
							</view>
							<view class="errorMsg">
								<text class="message" v-if="phone">请输入正确的手机号码</text>
							</view>
						</view>
						<view class="wrap">
							<view class="input-item">
								<input 
									:value="username" 
									placeholder="请输入手机验证码"
									maxlength="20"
									data-key="username"
									@input="inputChange"
								/>
								<view style="position: absolute;right: 40px;" v-if="send">
									<text type="text" @click="mobileCode" style="color: #999;font-size: 12px;padding: 0 20px;border-left: 1px solid #999;">获取验证码</text>
								</view>
								<view style="position: absolute;right: 50px;" v-else>
									<text type="text" disabled="" @click="mobileCode" style="color: #999;font-size: 12px;height: 30px;line-height: 30px;">{{time}}s后重新获取</text>
								</view>
							</view>
							<view class="errorMsg">
								<text class="message" v-if="code">请输入正确的验证码</text>
							</view>
						</view>
					</view>
					<view class="input-content" v-else>
						<view class="wrap">
							<view class="input-item">
								<input 
									:value="username" 
									placeholder="请输入用户名/手机号"
									maxlength="20"
									data-key="username"
									@input="inputChange"
								/>
							</view>
							<view class="errorMsg">
								<text class="message" v-if="phone">请输入正确的手机号码</text>
							</view>
						</view>
						<view class="wrap">
							<view class="input-item">
								<input 
									type="password" 
									:value="password" 
									placeholder="请输入密码"
									maxlength="20"
									password 
									data-key="password"
									@input="inputChange"
									@confirm="toLogin"
								/>
							</view>
							<view class="errorMsg">
								<text class="message" v-if="pwd">请输入正确的密码</text>
							</view>
						</view>
					</view>
					<view class="info">
						<text class="left" v-if="showCode" @click="showHide">密码登录</text>
						<text class="left" v-else @click="showHide">验证码登录</text>
						<text class="right" @click="forgetPwd">忘记密码?</text>
					</view>
					<view class="loginBtn">
						<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 其他登录方式 -->
		<view class="register-section">
			<!-- #ifdef APP-PLUS -->
			<view class="login" style="margin-bottom: 50px;">
				<view class="otherLoginTitle">其他方式登录</view>
				<view class="otherLogin">
					<view class="weiixnLogin" @click="wx_login">
						<image style="width: 60upx;height: 50upx;" src="http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGts5-ARb9cAAAFyaS9Bh84992368" mode=""></image>
					</view>
					<view class="qqLogin" @click="QQ_login">
						<image style="width: 45upx;height: 50upx;" src="http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAUipZAAADkkRJA542224955" mode=""></image>
					</view>
					<view class="qqLogin" v-if="system >= 13 && platform=='ios'"  @click="appleLogin">
						<image style="width: 45upx;height: 50upx;" src="http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAPrjjAAB8Ujjhkfo8180173" mode=""></image>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<view class="otherAllow">
				登录即同意
				<text @click="toService">《行丰用户服务协议》</text>
				<text @click="toPrivacy">《行丰隐私保护政策》</text>
			</view>
		</view>
		
		<!-- #ifdef APP-PLUS -->
		<popup ref="mapState" v-if="show" protocolPath='/pages/set/service'  policyPath='/pages/set/privacy'  @popupState="popupState"></popup>
		<!-- #endif -->
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	import popup from '@/components/DuDu-popup/DuDu-popup.vue'
	import uniRequest from 'uni-request';
	export default{
		components: {popup},
		data(){
			return {
				username: '',
				password: '',
				logining: false,
				phone:false, //手机号
				code:false, // 验证码
				pwd:false, // 密码
				showCode:false, // true:验证码登录  false:密码登录
				show:false,
				next:'',
				system: '', // 系统版本
				platform: '',   // 平台
				send:true,
				time:60, 
			}
		},
		onLoad(){
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					this.system = res.system
					this.platform = res.platform
				},fail: (err) => {
				},complete: () => {
					
				}
			})
			this.message()
		},
		methods: {
			...mapMutations(['login']),
			message(){
				// this.$api.msg('请先登录')
			},
			
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			// 去注册
			toRegist(){
				uni.navigateTo({
					url:'/pages/public/regist'
				})
			},
			
			// 协议
			toService(){
				uni.navigateTo({
					url:'/pages/set/service'
				})
			},
			
			// 政策
			toPrivacy(){
				uni.navigateTo({
					url:'/pages/set/privacy'
				})
			},
			
			// 发送验证码
			mobileCode(){
				// 验证码验证
				console.log(this.phone,this.getText)
				/* if(!this.imageCode){ 
					this.$api.msg('请输入验证码');
					return
				}else if(this.imageCode.toLowerCase() !== this.getText){
					this.$api.msg('验证码错误');
					return
				}
				
				// 手机号验证
				if(!this.mobile){ 
					this.$api.msg('请输入手机号');
					return
				}else{
					if(this.mobile.length !== 11){
						this.$api.msg('手机号格式错误')
					}
					uniRequest.get('/mobiles/'+this.mobile+'/count/').then(res=>{
						if(res.data.count>0){
							this.$api.msg('手机号已存在')
							return
						}
					})
				}
				
				uniRequest.get('/sms_codes/'+this.mobile+'/?text='+this.getText+'&image_code_id='+this.image_code_id).then(res=>{
					if(res.status === 200){
						var num = setInterval(()=>{
							this.send = false
							this.time -= 1
							if(this.time < 1){
								clearInterval(num)
								this.send = true
							}
						},1000)
					}else if(res.status === 400){
						this.$api.msg(res.data.non_field_errors[0])
						if(res.data.non_field_errors[0] === '无效验证码'){
							// this.generate_image_code();
							uni.redirectTo({
								url:'/pages/public/regist'
							})
						}
					}
				}).catch(error=>{
					console.log(error)
				}) */
			}, 
			
			// 忘记密码
			forgetPwd(){
				uni.navigateTo({
					url:'/pages/public/forgetPwd'
				})
			},
			
			// 登录方式切换
			showHide(){
				this.showCode = !this.showCode
			},
			
			// 去登陆
			async toLogin(){
				
				this.logining = true;
				const {username, password} = this;
				
				var patrn = /^[0-9]*$/;
				// 用户名验证
				if(!username){ 
					this.$api.msg('请输入用户名');
					this.logining = false;
					return
				}else if(username.length < 3){
					this.$api.msg('用户名不能少于3位');
					this.logining = false;
					return
				}
				// 密码验证
				if(!password){
					this.$api.msg('请输入密码');
					this.logining = false;
					return
				}else if(password.length < 8){
					this.$api.msg('密码不能少于8位');
					this.logining = false;
					return
				}
				console.log(username, password)
				const sendData = {
					username:username,
					password:password,
				};
				const response = await uniRequest.post('/user/login/',sendData);
				console.log(response)
				if(response.status === 200){
					this.show = true;
					this.$api.msg('登录成功');
					this.login(response.data);
					uni.navigateBack()
				}else if(response.status === 500){
					this.$api.msg('服务器出现异常，请稍后重试');
					this.logining = false;
				}else{
					this.$api.msg('用户名/手机号或密码输入错误');
					this.logining = false;
				}
			},
			
			// qq登录
			async qq_login(){
				await uniRequest({
					url:'/oauth/qq/authorization/?next=http://m.hfyt365.com/pages/public/oauthCallback',
					method:'get',
				}).then(res=>{
					console.log(res)
					if(res.status === 200){
						location.href = res.data.login_url;
						console.log(res.data.login_url)
					}
				}).catch(error=>{
				   console.log(error)
				   this.$toast({
				     message:'服务器错误'
				   })
				})
			},
			
			// 苹果登录
			appleLogin() {
				var appleOauth = null;
				plus.oauth.getServices(function(services) {
				console.log(services)
				plus.nativeUI.toast(JSON.stringify(services))
				  for (var i in services) {
					var service = services[i];
					// 获取苹果授权登录对象，苹果授权登录id 为 'apple' iOS13以下系统，不会返回苹果登录对应的 service
					if (service.id == 'apple') {
					  appleOauth = service;
					  break;
					}
				  }
				  if (!appleOauth) {
					plus.nativeUI.toast('暂不支持apple账户登陆')
					return
				  }
				  appleOauth.login(function(oauth) {
					// 授权成功，苹果授权返回的信息在 oauth.target.appleInfo 中
					plus.nativeUI.showWaiting('登陆中...')
					//向后台发送登陆需要的参数
				  }, function(err) {
					// 授权失败 error
					console.log(err);
					plus.nativeUI.toast('授权登陆失败')
				  }, {
					// 默认只会请求用户名字信息，如需请求用户邮箱信息，需要设置 scope: 'email'
					scope: 'email'
				  })
				}, function(err) {
				  console.log(err);
				  // 获取 services 失败
				})
			},
			
			// qq登录
			  async QQ_login(){
				var vm = this;
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						console.log(res.provider) //qq,xiaomi,sinaweibo,weixin
						vm.log = res.provider
						if (~res.provider.indexOf('qq')) {
							uni.login({
								provider: 'qq', 
								success:async function (loginRes) {
									var access_token=loginRes.authResult.access_token;
									uni.getUserInfo({
										provider: 'qq',
										success: function (infoRes) {
											console.log(infoRes)
											uniRequest.get('/oauth/qq/user/openid?openid='+infoRes.userInfo.openId).then(res=>{
												console.log(res)
												if(res.data.message === false){
													uni.navigateTo({
														url: "/pages/public/oauthCallback?type=qq&openid="+infoRes.userInfo.openId
													})
												}else if(res.data.message === true){
													vm.login(res.data)
													uni.navigateBack();
												}
											}).catch(error=>{
											   console.log(error)
											})
										}
									})
								}
							});
						}
					}
				});  
			  },
			  
			  
			  
			  wx_login(){
				  var vm = this;
				  uni.getProvider({
					service: 'oauth',
					success: function (res) {
						console.log(res.provider) //qq,xiaomi,sinaweibo,weixin
						vm.log = res.provider
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin', 
								success:async function (loginRes) {
									var access_token=loginRes.authResult.access_token;
									uni.getUserInfo({
										provider: 'weixin',
										success: function (infoRes) {
											console.log(infoRes)
											uniRequest.get('/oauth/wechat/user/openid/?openid='+infoRes.userInfo.openId).then(res=>{
												console.log(res.data)
												if(res.data.message === false){
													uni.navigateTo({
														url: "/pages/public/oauthCallback?type=weixin&openid="+infoRes.userInfo.openId+"&nuionid="+infoRes.userInfo.nuionid
													})
												}else if(res.data.message === true){
													vm.login(res.data);
													uni.navigateBack();
												}
											}).catch(error=>{
											   console.log(error)
											})
										}
									})
								}
							});
						}
					}
				});  
			  }
		},

	}
</script>

<style lang='scss'>
	.container{
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
		.back-btn-left{
			position:absolute;
			left: 40upx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40upx;
			font-size: 36upx;
			color: $font-color-regist;
		}
		.back-btn-right{
			position:absolute;
			right: 60upx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40upx;
			font-size: 34upx;
			color: $font-color-regist;
		}
		.left-top-sign{
			font-size: 120upx;
			color: $page-color-base;
			position:relative;
			left: -16upx;
		}
	}
	.wrapper{
		position:relative;
		z-index: 90;
		padding-bottom: 40upx;
		margin-top: 200upx;
		.aside{
			width: 100%;
			height: 340px;
			.content{
				margin: 0 auto;
				width: 80%;
				height:100%;
				
				.msg{
					width: 200px;
					height: 100px;
					line-height: 34px;
					.text{
						color: #333;
						font-size: 18px;
						font-weight: bold;
					}
				}
			}
			.input-content{
				width: 100%;
				height: 130px;
				.wrap{
					.errorMsg{
						width: 100%;
						height: 60upx;
						.message{
							height: 30px;
							line-height: 30px;
							color: red;
							font-size: 12px;
							margin-left:60upx;
						}
					}
					.input-item{
						display:flex;
						flex-direction: column;
						align-items:flex-start;
						justify-content: center;
						padding: 0 60upx;
						background:#fff;
						height: 100upx;
						border-radius: 30px;
						border: 1px solid $border-color-base;
						.tit{
							height: 50upx;
							line-height: 50upx;
							font-size: $font-sm+2upx;
							color: $border-color-dark;
						}
						input{
							height: 60upx;
							font-size: $font-base;
							color: $font-color-dark;
							width: 100%;
						}	
					}
				}
			}
			.info{
				width: 100%;
				height: 50px;
				margin-top: 80upx;
				color: #666;
				.left{
					float: left;
				}
				.right{
					float: right;
				}
			}
			.loginBtn{
				width: 100%;
				height: 50px;
				.confirm-btn{
					width: 100%;
					height: 76upx;
					line-height: 76upx;
					border-radius: 50px;
					color: #fff;
					background:linear-gradient(to right,#EE1D23,#F04023);
					font-size: $font-lg;
					&:after{
						border-radius: 100px;
					}
				}
			}
		}
	}
	
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
		.login{
			margin-bottom: 50px;
			.otherLoginTitle {
				width: 100%;
				margin-top: 40upx;
				text-align: center;
				color: #555555;
				font-size: 24upx;
				line-height: 160upx;
			}
			.otherLogin {
				width: 500upx;
				height: 60upx;
				margin: 10upx auto;
				display: flex;
				justify-content: space-around;
				view {
					width: 60upx;
					height: 50upx;
					background: #fff;
					border-radius: 50upx;
				}
			}
		}
		.otherAllow{
			margin-top: 40upx;
			color: #606266;
			font-size: 12px;
			text{
				color: #909399;
			}
		}
	}

</style>
