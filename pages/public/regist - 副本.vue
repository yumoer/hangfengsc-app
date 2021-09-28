<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">REGIST<view class="welcome">
				新用户注册
			</view></view>
			
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名</text>
					<input 
						:value="username" 
						placeholder="请输入用户名"
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
						placeholder="请输入8-20位数字、字母组合密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">确认密码</text>
					<input 
						type="password" 
						:value="password2" 
						placeholder="请重复8-20位数字、字母组合密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password2"
						@input="inputChange"
					/>
				</view>
				
				<view class="input-item" style="position: relative;">
					<text class="tit">验证码</text>
					<input 
						:value="imageCode" 
						placeholder="请输入验证码"
						placeholder-class="input-empty"
						maxlength="4"
						data-key="imageCode"
						@input="inputChange"
					/>
					<view style="position: absolute;right: 0;top: 20upx;" @click="generate_image_code">
						<image style="width: 100px;height: 35px;" :src="image_code_url" mode=""></image>
					</view>
				</view>
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						:value="mobile" 
						placeholder="请输入手机号"
						maxlength="11"
						type='number'
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item" style="position: relative;">
					<text class="tit">手机验证码</text>
					<input 
						:value="sms_code" 
						placeholder="请输入手机验证码"
						placeholder-class="input-empty"
						maxlength="6"
						type='number'
						data-key="sms_code"
						@input="inputChange"
					/>
					<view style="position: absolute;right: 0;" v-if="send">
						<button type="text" @click="mobileCode" style="background-color: #fa436a;color: #fff;font-size: 12px;height: 30px;line-height: 30px;">获取验证码</button>
					</view>
					<view style="position: absolute;right: 0;" v-if="!send">
						<button type="text" disabled="" @click="mobileCode" style="color: #000;font-size: 12px;height: 30px;line-height: 30px;">{{time}}s后重新获取</button>
					</view>
				</view>
				
			</view>
		</view>
		<button class="confirm-btn" @click="toRegist">注册</button>
		
		<view class="register-section">
			<view >
				<view style="margin-top: 20upx;color: #606266;">
					注册即同意
					<text style="color: #fa436a;" @click="toService">《行丰用户服务协议》</text>
					<text style="color: #fa436a;" @click="toPrivacy">《行丰隐私保护政策》</text>
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
				username:'',
				mobile: '',
				password: '',
				password2: '',
				imageCode:'',
				sms_code:'',
				// checked:true,
				allow:'true',
				image_code_id: '', // uuid
				image_code_url:'', // 访问后端视图的地址，得到image
				getText:'',
				send:true,
				time:60,
			}
		},
		onLoad(options){
			console.log(options)
			this.generate_image_code();
		},
		/* created(){
			// 当模板渲染结束时会被调用的
		    this.generate_image_code();
		}, */
		
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
			
			toLogin(){
				uni.navigateTo({
					url:'/pages/public/login'
				})
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();  
			},
			
			changeType(){
				this.checked = !this.checked
				console.log(this.checked)
			},
			
			// 发送验证码
			mobileCode(){
				// 验证码验证
				console.log(this.imageCode,this.getText)
				if(!this.imageCode){ 
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
				})
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
				
				uniRequest.post('/image_codes/text/'+this.image_code_id).then(res=>{
					console.log(res.data)
					if(res.data.text !== undefined){
						this.getText = res.data.text.toLowerCase()
					}
				}).catch(error=>{
					console.log(error)
				})
				
				// 设置页面中验证码img标签的src属性
				this.image_code_url = "http://47.94.106.106:8000/image_codes/" + this.image_code_id + "/";
				console.log(this.image_code_url)
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
				console.log(d)
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				  var r = (d + Math.random()*16)%16 | 0;
				  d = Math.floor(d/16);
				  return (c =='x' ? r : (r&0x3|0x8)).toString(16);
				});
				return uuid;
			},  
			
			async toRegist(){
				/* console.log(this.checked)
				this.allow = '' + this.checked */
				
				// const {username,mobile, password,password2,imageCode,allow} = this;
				// 用户名验证
				if(!this.username){
					this.$api.msg('请输入用户名');
					return
				}else{
					uniRequest.get('/usernames/'+this.username+'/count/').then(res=>{
						if(res.data.count>0){
							this.$api.msg('用户名已存在')
							return
						}
					})
				}
				
				// 密码验证
				if(!this.password){
					this.$api.msg('请输入密码');
					return
				}else if(this.password.length < 8){
					this.$api.msg('密码不能少于8位');
					return
				}
				
				// 确认密码验证
				if(!this.password2){
					this.$api.msg('请输入确认密码');
					return
				}else if(this.password2.length < 8){
					this.$api.msg('确认密码不能少于8位');
					return
				}else if(this.password2 !== this.password){
					this.$api.msg('两次密码输入不一致');
					return
				}
				
				// 验证码验证
				console.log(this.imageCode,this.getText)
				if(!this.imageCode){ 
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
				
				// 手机验证码验证
				if(!this.sms_code){
					this.$api.msg('请输入手机验证码');
					return
				}else if(this.sms_code.toLowerCase() !== this.sms_code){
					this.$api.msg('手机验证码错误');
					return
				}
				
				if(this.allow !== 'true'){
					this.$api.msg('请同意用户协议');
					return
				}
				console.log(this.sms_code)
				const sendData = {
					username:this.username,
					mobile:this.mobile,
					password:this.password,
					password2:this.password2,
					imageCode:this.imageCode,
					sms_code:this.sms_code,
					allow:this.allow,
				 };
				uniRequest.post('/users/',sendData).then(res=>{
					console.log(res)
					if(res.status === 201){
						this.login(res.data);
						uni.switchTab({
							url:'/pages/user/user'
						})
					}
					if(res.status === 400){
						this.$api.msg(res.data.non_field_errors[0])
					}
				}).catch(error=>{
					console.log(error)
				})
			},
		},

	}
</script>

<style lang='scss'>
	uni-radio .uni-radio-input{
		width: 14px;
		height: 14px;
	}
	
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
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
		/* margin-top: 40px; */
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
		height: 100upx;
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

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 40upx;
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
		margin: 80upx auto;
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
