<!-- 这个模块我正在开发 我是qq是1966908862   -->
<template>
	<view class="login">
		<!-- <view class="text-center">
			<image class="titleImg" src="/static/login_log.png" mode="widthFix"></image>
		</view> -->
		<view class="login-top bg-active">
			<view class="desc">
				<view class="title">Hi~</view>
				<text v-if="formdata.name">{{formdata.name}},欢迎您</text>
				<text v-else>请登记</text>
			</view>
			<image class="login-pic" src="/static/login-pic.png"></image>
		</view>
		<form class="form" v-if="showView">
			<input
				class="formItem" 
				:value="name" 
				type="text" 
				placeholder="输入姓名" 
				data-key="name"
				@input="inputChange"
			/>
			<input
				class="formItem" 
				:value="mobile" 
				type="number" 
				maxlength="11" 
				data-key="mobile" 
				@input="inputChange"
				placeholder="输入联系方式" 
			/>
			<view style="position: relative;">
				<input
					class="formItem"
					:value="sms_code" 
					placeholder="输入手机验证码"
					maxlength="6"
					type="number"
					data-key="sms_code"
					@input="inputChange"
				/>
				<view style="position: absolute;right: 20px;top:5px" v-if="send">
					<button type="text" @click="mobileCode(mobile)" style="background-color: #fa436a;color: #fff;font-size: 12px;height: 40px;line-height: 40px;border-radius: 20px;">获取验证码</button>
				</view>
				<view style="position: absolute;right: 20px;top:5px" v-if="!send">
					<button type="text" disabled="" @click="mobileCode" style="background-color: #fff;color: #fa436a;font-size: 12px;height: 40px;line-height: 40px;border-radius: 20px;border: 1px solid #fa436a;">{{time}}s后重新获取</button>
				</view>
			</view>
			<input 
				class="formItem" 
				:value="company" 
				type="text"
				placeholder="输入所属公司" 
				data-key="company"
				@input="inputChange"
			/>
			<input 
				class="formItem" 
				:value="msg" 
				type="text"
				placeholder="输入访问目的" 
				data-key="msg"
				@input="inputChange"
			/>
			<input 
				class="formItem" 
				:value="company_user" 
				type="text"
				placeholder="输入访问人员" 
				data-key="company_user"
				@input="inputChange"
			/>
			<!-- 提交按钮 -->
			<button class="formItem submit" form-type="submit" @click="formSubmit">登 记</button>
		</form>
		<form class="form" v-else>
			<input
				v-if="formdata.name"
				class="formItem"
				disabled
				:value="'姓 名 ：'+formdata.name"
				type="text" 
			/>
			<input
				v-if="formdata.mobile"
				class="formItem" 
				disabled
				:value="'联 系 方 式 ：'+formdata.mobile" 
			/>
			<input 
				v-if="formdata.company"
				class="formItem"
				 disabled
				:value="'所 属 公 司 ：'+formdata.company" 
				type="text"
			/>
			<input 
				v-if="formdata.msg"
				class="formItem" 
				disabled
				:value="'访 问 目 的 ：'+formdata.msg" 
				type="text"
			/>
			<input
				v-if="formdata.company_user"
				class="formItem" 
				disabled
				:value="'访 问 人 员 ：'+formdata.company_user" 
				type="text"
			/>
			<!-- 再次登记按钮 --> 
			<button class="formItem submit" form-type="submit" @click="formClose">再 次 登 记</button>
		</form>
	</view>
</template>

<script>
import uniRequest from 'uni-request'
export default {
	data(){
		return{
			name:'',
			mobile:'',
			sms_code:'',
			company:'',
			msg:'',
			company_user:'',
			formdata:{
				company: "",
				company_user: "",
				mobile: "",
				msg: "",
				name: ""
			},
			send:true,
			time:60,
			showView:true,
		}
	},
	methods: {
		// 发送验证码
		mobileCode(){
			// 手机号验证
			console.log(this.mobile)
			var reg = /^1[3-9]\d{9}$/;
			if(this.mobile === ''){ 
				this.$api.msg('请输入手机号');
			}else if(this.mobile.length !== 11){
				this.$api.msg('手机号少于11位')
			}else if(!reg.test(this.mobile)){
				this.$api.msg('手机号格式错误')
			}else{
				uniRequest.get('/sms/common/'+this.mobile).then(res=>{
					if(res.status === 200){
						if(res.data.message !== 'ok'){
							this.$api.msg(res.data.message)
							return
						}
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
					}
				}).catch(error=>{
					console.log(error)
				})
			}
		}, 
		inputChange(e){
			const key = e.currentTarget.dataset.key;
			this[key] = e.detail.value;
		},
		// 提交事件
		formSubmit(e) {
			console.log(e)
			let formdata = {
				name:this.name,
				mobile:this.mobile,
				sms_code:this.sms_code,
				company:this.company,
				msg:this.msg,
				company_user:this.company_user,
			}
			console.log(formdata)
			if (!formdata.name) {
				uni.showToast({
					title: '姓名不能为空',
					icon: 'none'
				});
			} else if (!formdata.mobile) {
				uni.showToast({
					title: '联系方式不能为空',
					icon: 'none'
				});
			} else if (!formdata.sms_code) {
				uni.showToast({
					title: '验证码不能为空',
					icon: 'none'
				});
			} else if (!formdata.company) {
				uni.showToast({
					title: '所属公司不能为空',
					icon: 'none'
				});
			} else if (!formdata.msg) {
				uni.showToast({
					title: '访问目的不能为空',
					icon: 'none'
				});
			} else if (!formdata.company_user) {
				uni.showToast({
					title: '访问人员不能为空',
					icon: 'none'
				});
			} else {
				uni.showLoading({
					title: '登录中......',
					mask: true
				});
				uniRequest({
					url: '/wx/visitor/',
					method: 'POST',
					data:formdata,
				}).then(res => {
					console.log(res)
					if(res.status === 201){
						uni.hideLoading()
						this.$api.msg('登记成功')
						this.formdata = res.data
						this.showView = false
						this.name=""
						this.mobile=""
						this.sms_code=""
						this.company=""
						this.msg=""
						this.company_user=""
					}else if(res.status === 400){
						if(res.data.sms_code[0]){
							this.$api.msg(res.data.sms_code[0])
						}else{
							this.$api.msg('登记失败')
						}
					}
				}).catch(error => {
					console.log(error) 
					this.$api.msg('服务器错误')
				}) 
			}
		},
		formClose(){
			this.showView = true
			this.send = true
			this.time = 0
			this.formdata = {}
		}
	}
};
</script>

<style lang="less" scoped>
.login {
	.text-center {
		text-align: center;
	}
	.bg-active {
	  background-color: #fa436a;
	  color: #fff;
	}
	.titleImg {
		height: auto;
		width: 426rpx;
		margin-top: 60rpx;
	}
	.login-top {
		height: 360rpx;
		position: relative;
		.desc {
			color: #fff;
			position: absolute;
			top: 120rpx;
			left: 40rpx;
			font-size: 48rpx;
			.title {
				font-size: 48rpx;
			}
		}
		.login-pic {
			position: absolute;
			width: 220rpx;
			height: 270rpx;
			right: 60rpx;
			top: 40rpx;
		}
	}
	.form {
		padding: 60rpx;
		display: block;
		.formItem {
			box-sizing: border-box;
			width: 100%;
			height: 112rpx;
			background-color: #f9f9f9;
			font-size: 36rpx;
			padding: 32rpx;
			margin: 20rpx 0;
			border-radius: 56rpx;
			&.submit {
				background-color: #fa436a;
				color: #ffffff;
				text-align: center;
				font-size: 40rpx;
				line-height: 40rpx;
			}
			&.submits {
				background-color: #fff;
				color: #fa436a;
				border: 1px solid #fa436a;
				text-align: center;
				font-size: 40rpx;
				line-height: 40rpx;
			}
		}
	}
}
</style>
