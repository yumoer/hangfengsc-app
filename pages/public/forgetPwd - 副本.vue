<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">FORGET</view>
			<view class="welcome">
				忘记密码
			</view>
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
					/>
				</view>
				<view class="input-item">
					<text class="tit">确认密码</text>
					<input 
						type="password" 
						:value="password2" 
						placeholder="8-20位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password2"
						@input="inputChange"
						@confirm="toRevice"
					/>
				</view>
			</view>
			
			<button class="confirm-btn" @click="toRevice">提交</button>
			
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
			}
		},
		onLoad(options){
			console.log(options)
		},
		methods: {
			...mapMutations(['login']),
			message(){
				this.$api.msg('请绑定手机号')
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();  
			},
			
			changePayType(){
				this.remember = !this.remember
				console.log(this.remember)
			},
			
			async toRevice(){
				this.logining = true;
				const {username,mobile, password,password2} = this;
				console.log(username)
				// 用户名验证
				if(!username){ 
					this.$api.msg('请输入用户名');
					this.logining = false;
					return
				}
				// 手机号验证
				if(!mobile){ 
					this.$api.msg('请输入手机号');
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
				
				// 确认密码验证
				if(!password2){
					this.$api.msg('请输入确认密码');
					this.logining = false;
					return
				}else if(password2.length < 8){
					this.$api.msg('密码不能少于8位');
					this.logining = false;
					return
				}else if(password2 !== password){
					this.$api.msg('两次密码输入不一致');
					this.logining = false;
					return
				}
				
				const sendData = {
					username,
					mobile,
					password,
					password2
				};
				console.log(sendData)
				uniRequest.post('/forget_password/',sendData).then(res=>{
					console.log(res)
					if(res.data.message === '用户名错误' || res.data.message === 'mobile_is_error'){
						this.$api.msg('用户名与手机号不匹配')
						return
					  }else if(res.data.message === 'update OK'){
						this.$api.msg('密码修改成功')
						setTimeout(function(){
							uni.navigateBack()
						},1500)
					  }
				}).catch(error=>{
					console.log(error)
				})
			},
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
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
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
		padding: 0 20upx;
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

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
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
