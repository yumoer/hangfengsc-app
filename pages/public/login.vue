<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN<view class="welcome">
				登录
			</view></view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名/手机号码</text>
					<input 
						:value="username" 
						placeholder="请输入用户名/手机号码"
						maxlength="20"
						data-key="username"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						type="password" 
						:value="password" 
						placeholder="8-20位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
				<view class="forget-section">
					<view class="b-b" >
						<label class="radio" @click="changePayType">
							<radio value="" color="#fa436a" :checked='remember' />
							</radio>
						</label>
						<text style="text-align: left;display: inline-block;" @click="changePayType">记住登陆</text>
						<span style="float: right;display: inline-block;" @click="forgetPwd">忘记密码?</span>
					</view>
				</view>
			</view>
			
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			
		</view>
		
		
		<!-- 其他登录方式 -->
		<!-- #ifdef APP-PLUS -->
		<view class="otherLoginTitle">其他方式登录</view>
		<view class="otherLogin">
			<view class="weiixnLogin" @click="wx_login">
				<image style="width: 100upx;height: 100upx;" src="../../static/weixin.png" mode=""></image>
			</view>
			<view class="qqLogin" @click="QQ_login">
				<image style="width: 100upx;height: 100upx;" src="../../static/QQ2.png" mode=""></image>
			</view>
			<view class="qqLogin" v-if="system >= 13 && platform=='ios'"  @click="appleLogin">
				<image style="width: 100upx;height: 100upx;" src="../../static/timg.png" mode=""></image>
			</view>
		</view>
		<!-- #endif -->
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text><br>
			<view style="margin-top: 20upx;color: #606266;">
				登录即同意
				<text style="color: #fa436a;" @click="toService">《行丰用户服务协议》</text>
				<text style="color: #fa436a;" @click="toPrivacy">《行丰隐私保护政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniRequest from 'uni-request';
	export default{
		data(){
			return {
				username: '',
				password: '',
				logining: false,
				remember:true,
				next:'',
				system: '', // 系统版本
				platform: '',   // 平台
			}
		},
		components: {uniGrid,uniGridItem},
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
			toService(){
				uni.navigateTo({
					url:'/pages/set/service'
				})
			},
			toPrivacy(){
				uni.navigateTo({
					url:'/pages/set/privacy'
				})
			},
			
			// 忘记密码
			forgetPwd(){
				uni.navigateTo({
					url:'/pages/public/forgetPwd'
				})
			},
			changePayType(){
				this.remember = !this.remember
				console.log(this.remember)
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
					if(this.remember === true){
						this.$api.msg('登录成功');
						this.login(response.data);
						uni.navigateBack()
					}
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
	page{
		background: #fff;
	}
	.container{
		padding-top: 35px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
		/* background-image: url(../../static/index/yindao2.jpg);
		background-attachment:fixed;
	    background-repeat:no-repeat;
		background-position: center center; */
	}
	.wrapper{
		position:relative;
		z-index: 90;
		/* background: #fff; */
		padding-bottom: 40upx;
		margin-top: 40px;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		
		&:before, &:after{
			display:block;
			content:"";
			
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
			
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
		margin-top: -20px;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 20upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
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
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 30upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		margin-top: 40upx;
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
	}
	
	.otherLogin {
		width: 500upx;
		height: 95upx;
		margin: 10upx auto;
		display: flex;
		justify-content: space-around;
	}
	
	.otherLogin>view {
		width: 95upx;
		height: 95upx;
		background: #fff;
		border-radius: 95upx;
	}
	
	.otherLoginTitle {
		width: 100%;
		margin-top: 40upx;
		text-align: center;
		color: #555555;
		font-size: 28upx;
		line-height: 80upx;
	}
</style>
