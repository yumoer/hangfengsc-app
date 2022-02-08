<template>
	<view class="container">
		<view class="header">
			<view class="back-btn-left yticon icon-zuojt-login" @click="navBack"></view>
		</view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="aside">
				<view class="content">
					<view class="msg">
						<text class="text">新用户注册</text><br>
					</view>
				</view>
				<!-- 第一步 -->
				<view class="content" v-if="first">
					<view class="input-content">
						<view class="first">
							<view class="input-item">
								<input 
									:value="mobile" 
									placeholder="请输入手机号"
									maxlength="11"
									type='number'
									data-key="mobile"
									@input="inputChange"
								/>
							</view>
							
							<view class="errorMsg">
								<text class="message" v-if="mobile">{{mobileMsg}}</text>
							</view>
							
							<view class="input-item" style="position: relative;">
								<input 
									:value="imageCode" 
									placeholder="请输入图形验证码"
									maxlength="4"
									data-key="imageCode"
									@input="inputChange"
								/>
								<view style="position: absolute;right: 10px;top: 14upx;" @click="generate_image_code">
									<image style="width: 100px;height: 35px;" :src="image_code_url" mode=""></image>
								</view>
							</view>
							
							<view class="errorMsg">
								<text class="message" v-if="imageCode">{{imageCodeMsg}}</text>
							</view>
							
							<view class="input-item" style="position: relative;">
								<input 
									:value="sms_code" 
									placeholder="请输入手机验证码"
									maxlength="6"
									type='number'
									data-key="sms_code"
									@input="inputChange"
								/>
								<view style="position: absolute;right: 0;" v-if="send">
									<text type="text" @click="mobileCode" style="color: #999;font-size: 12px;padding: 0 20px;border-left: 1px solid #999;">获取验证码</text>
								</view>
								<view style="position: absolute;right: 0;" v-if="!send">
									<text type="text" style="color: #999;font-size: 12px;height: 30px;line-height: 30px;">{{time}}s后重新获取</text>
								</view>
							</view>
							
							<view class="errorMsg">
								<text class="message" v-if="sms_code">{{smsCodeMsg}}</text>
							</view>
						</view>
						
						<view class="loginBtn">
							<button class="confirm-btn" @click="toNext">下一步</button>
						</view>
					</view>
				</view>
				<!-- 第二步 -->
				<view class="content" v-else>
					<view class="input-content">
						<view class="second">
							<view class="input-item">
								<input 
									:value="username" 
									placeholder="请输入用户名"
									maxlength="20"
									data-key="username"
									@input="inputChange"
								/>
							</view>
							
							<view class="errorMsg">
								<text class="message" v-if="username">{{usernameMsg}}</text>
							</view>
							
							<view class="input-item">
								<input 
									type="password" 
									:value="password" 
									placeholder="请输入密码"
									maxlength="20"
									password 
									data-key="password"
									@input="inputChange"
								/>
							</view>
							
							<view class="errorMsg">
								<text class="message" v-if="password">{{passwordMsg}}</text>
							</view>
							
							<view class="input-item">
								<input 
									type="password" 
									:value="password2" 
									placeholder="请再次输入密码"
									maxlength="20"
									password 
									data-key="password2"
									@input="inputChange"
								/>
							</view>
							
							<view class="errorMsg">
								<text class="message" v-if="password2">{{passwordMsg2}}</text>
							</view>
						</view>
						<view class="info">
							<u-checkbox-group>
								<u-checkbox v-model="checked" @change="checkboxChange" activeColor="red" shape="circle">
								</u-checkbox>
							</u-checkbox-group>
							阅读并勾选
							<text @click="toService">《行丰用户服务协议》</text>
							<text @click="toPrivacy">《行丰隐私保护政策》</text>
						</view>
						
						<view class="loginBtn">
							<button class="confirm-btn" @click="toRegist">注册</button>
							<button class="confirm" @click="toPrev">上一步</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	
	import uniRequest from 'uni-request';
	export default{
		data(){
			return {
				username:'', // 用户名
				usernameMsg:'', 
				mobile: '', // 手机号
				mobileMsg:'',
				password: '', // 密码
				passwordMsg:'',
				password2: '', // 重复密码
				passwordMsg2:'',
				imageCode:'', // 图形验证码
				imageCodeMsg:'',
				sms_code:'', // 手机验证码
				smsCodeMsg:'',
				// checked:true,
				checked:false, // 同意协议
				image_code_id: '', // uuid
				image_code_url:'', // 访问后端视图的地址，得到image
				getText:'', // 图形验证码
				send:true, // 获取验证码开关
				time:60, // 倒计时
				first:true, // 注册第一步
				value:''
			}
		},
		onLoad(options){
			if(this.first === true){
				this.generate_image_code();
			}
		},
		
		methods: {
			...mapMutations(['login']),
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
			
			
			// 下一步
			toNext(){
				if(this.mobile && this.imageCode && this.sms_code){
					if(!this.mobileMsg && !this.imageCodeMsg && !this.smsCodeMsg){
						this.first = false;
					}else{
						this.mobileMsg ? this.$api.msg(this.mobileMsg) 
						: this.imageCodeMsg ? this.$api.msg(this.imageCodeMsg) 
						: this.smsCodeMsg ? this.$api.msg(this.smsCodeMsg) : ''
					}
				}else{
					this.$api.msg('请填写注册信息')
				}
			},
			
			toPrev(){
				this.first = true;
			},
			
			// 监听获取参数
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				switch(key){
					case 'mobile':
						this.mobile = e.detail.value;
						// 手机号验证
						if(!this.mobile){ 
							this.mobileMsg = '请输入手机号'
							return
						}else{
							if(this.mobile.length !== 11){
								this.mobileMsg = '手机号格式错误'
							}else{
								uniRequest.get('/user/mobiles/'+this.mobile+'/count/').then(res=>{
									if(res.data.count>0){
										this.mobileMsg = '手机号已存在'
									}else{
										this.mobileMsg = ''
									}
								})
							}
						}
						break;
					case 'imageCode':
						this.imageCode = e.detail.value;
						// 验证码验证
						if(!this.imageCode){
							this.imageCodeMsg = '请输入图形验证码'
						}else if(this.imageCode.toLowerCase() !== this.getText){
							this.imageCodeMsg = '验证码错误'
						}else{
							this.imageCodeMsg = ''
						}
						break;
					case 'sms_code':
						this.sms_code = e.detail.value;
						// 手机验证码验证
						if(!this.sms_code){
							this.smsCodeMsg = '请输入手机验证码'
						}else if(this.sms_code.toLowerCase() !== this.sms_code){
							this.smsCodeMsg = '手机验证码错误'
						}else{
							this.smsCodeMsg = ''
						}
						break;
					case 'username':
						this.username = e.detail.value;
						// 用户名验证
						if(!this.username){
							this.usernameMsg = '请输入用户名';
							return
						}else{
							uniRequest.get('/user/usernames/'+this.username+'/count/').then(res=>{
								if(res.data.count>0){
									this.usernameMsg = '用户名已存在';
									return
								}else{
									this.usernameMsg = '';
									return
								}
							})
						}
						break;
					case 'password':
						this.password = e.detail.value;
						// 密码验证
						if(!this.password){
							this.passwordMsg = '请输入密码'
							return
						}else if(this.password.length < 8){
							this.passwordMsg = '密码不能少于8位'
							return
						}else{
							this.passwordMsg = '';
							return
						}
						break;
					case 'password2':
						this.password2 = e.detail.value;
						// 确认密码验证
						if(!this.password2){
							this.passwordMsg2 = '请输入确认密码'
							return
						}else if(this.password2.length < 8){
							this.passwordMsg2 = '确认密码不能少于8位'
							return
						}else if(this.password2 !== this.password){
							this.passwordMsg2 = '两次密码输入不一致'
							return
						}else{
							this.passwordMsg2 = ''
							return
						}
						break;
				}
			},
			navBack(){
				uni.navigateBack();
			},
			
			changeType(env){
				console.log(env)
				this.checked = !this.checked
				console.log(this.checked)
			},
			
			checkboxChange(e) {
				console.log(e)
				this.checked = e.value
			},
			
			// 发送验证码
			mobileCode(){
				if(this.mobile && this.imageCode){
					if(!this.mobileMsg && !this.imageCodeMsg){
						uniRequest.get('/verify/sms_codes/'+this.mobile+'/?text='+this.getText+'&image_code_id='+this.image_code_id).then(res=>{
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
								this.$api.msg(res.data.message)
								if(res.data.message === '图片验证码无效'){
									this.generate_image_code();
									// uni.redirectTo({
									// 	url:'/pages/public/regist'
									// })
								}
							}
						}).catch(error=>{
							console.log(error)
						})
					}else{
						this.mobileMsg ? this.$api.msg(this.mobileMsg)
						: this.imageCodeMsg ? this.$api.msg(this.imageCodeMsg) : ''
					}
				}else{
					this.mobile === '' ? this.$api.msg('请输入手机号')
					: this.imageCode === '' ? this.$api.msg('请输入图形验证码') : ''
				}
				
				
			}, 
			
			// 生成一个验证码的编号，并设置页面中验证码img标签的src属性
			async generate_image_code(){
				uni.setStorage({
					key: 'flag',
					data: '1'
				});
				// 生成一个编号
				// 严格一点的使用uuid保证编号唯一， 不是很严谨的情况下，也可以使用时间戳
				this.image_code_id = this.generate_uuid();
				
				console.log(this.image_code_id)
				
				// 设置页面中验证码img标签的src属性
				this.image_code_url = "http://api.hfyt365.com/verify/image_codes/" + this.image_code_id + "/";
				console.log(this.image_code_url)
				
				setTimeout(()=>{
					uniRequest.get('/verify/image_codes/text/'+this.image_code_id+'/').then(res=>{
						console.log(res.data)
						if(res.status === 200){
							if(res.data.text !== undefined){
								this.getText = res.data.text.toLowerCase()
							}
						}else{
							this.$api.msg(res.data.message)
						}
					}).catch(error=>{
						console.log(error)
					})
				},500)
				
			},
			
			// 生成uuid
			generate_uuid(){
				// #ifdef H5
				var d = new Date().getTime();
				d += performance.now();
				// #endif
				// #ifdef APP-PLUS
				var d = new Date().getTime();
				d += Date.now();
				// #endif
				
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				  var r = (d + Math.random()*16)%16 | 0;
				  d = Math.floor(d/16);
				  return (c =='x' ? r : (r&0x3|0x8)).toString(16);
				});
				return uuid;
			},  
			
			// 注册
			async toRegist(){
				// 用户名验证
				if(this.username && this.password && this.password2){
					if(!this.usernameMsg && !this.passwordMsg && !this.passwordMsg2){
						if(this.checked === false){
							this.$api.msg('请阅读并勾选隐私协议和用户协议')
							return
						}
						const sendData = {
							username:this.username,
							mobile:this.mobile,
							password:this.password,
							password2:this.password2,
							imageCode:this.imageCode,
							sms_code:this.sms_code,
							allow:this.checked+''
						 };
						uniRequest.post('/user/register/',sendData).then(res=>{
							console.log(res)
							if(res.status === 201){
								this.login(res.data);
								uni.switchTab({
									url:'/pages/user/user'
								})
							}
							if(res.status === 400){
								this.$api.msg(res.data.message)
							}
						}).catch(error=>{
							console.log(error)
						})
					}else{
						this.usernameMsg ? this.$api.msg(this.usernameMsg)
						: this.passwordMsg ? this.$api.msg(this.passwordMsg) 
						: this.passwordMsg2 ? this.$api.msg(this.passwordMsg2) : ''
					}
				}else{
					this.$api.msg('请填写注册信息')
				}
			},
		},

	}
</script>

<style lang='scss'>
	/deep/ uni-radio .uni-radio-input{
		width: 16px;
		height: 16px;
	}
	/deep/ uni-checkbox .uni-checkbox-input{
		border-radius: 50%;
	}
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
			height: 100%;
			.content{
				margin: 0 auto;
				width: 80%;
				height:100%;
				.msg{
					width: 200px;
					height: 70px;
					line-height: 34px;
					.text{
						font-size: 18px;
						font-weight: bold;
					}
				}
			}
			.input-content{
				width: 100%;
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
						font-size: $font-base+2;
						color: $font-color-dark;
						width: 100%;
					}	
				}
			}
			.info{
				width: 100%;
				height: 30px;
				color: #000000;
				font-size: 24upx;
				line-height: 40upx;
				text{
					height: 30px;
					color: #999999;
				}
			}
			.loginBtn{
				width: 100%;
				height: 50px;
				margin-top: 30px;
				.confirm{
					width: 100%;
					height: 76upx;
					line-height: 76upx;
					border-radius: 50px;
					/* background: $uni-color-primary; */
					color: #333;
					background:#fff;
					border: 1px solid #ee1d23FF;
					font-size: $font-lg;
					margin-top: 20upx;
					&:after{
						border-radius: 100px;
					}
				}
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
</style>
