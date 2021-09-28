<template>
	<view class="content">
		<view class="pay-wran">
			<text class="pay-text">为了您的账户安全，请完成身份验证</text>
		</view>
		<view class="wrap" v-if="o_view">
			<view class="row b-b">
				<text class="tit">手机号</text>
				<input class="input" type="text" maxlength="11" v-model="phone" placeholder="请输入手机号" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">验证码</text>
				<input class="input" type="number" maxlength="6" v-model="sms_code" placeholder="请输入验证码" placeholder-class="placeholder" />
				<text style="font-size: 14px;color: #EE1D23;" v-if="show" @click="smsCode">获取验证码</text>
				<text style="font-size: 14px;color: #999999;" v-else>{{time}}s后重新发送</text>
			</view>
			<button type="default" class="pay-next" @click="nextBtn">下一步</button>
		</view>
		<view class="wrap" v-else>
			<view class="row b-b">
				<text class="tit addWidth">设置支付密码</text>
				<input class="input" type="password" maxlength="6" v-model="pay_password" placeholder="请输入6位支付密码" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit addWidth">确认支付密码</text>
				<input class="input" type="password" maxlength="6" v-model="pay_password2" placeholder="请确认6位支付密码" placeholder-class="placeholder" />
			</view>
			
			<button type="default" class="pay-submit" @click="submitBth">确认</button>
			
			<button type="default" class="pay-prev" @click="prevBtn">上一页</button>
			
		</view>
	</view>
</template>
<script>
	import uniRequest from 'uni-request';
	import wakaryInput from '@/components/wakary-input/wakary-input.vue'
	import wakaryInputs from '@/components/wakary-input/wakary-inputs.vue'
	import wakaryInputss from '@/components/wakary-input/wakary-inputss.vue'
	export default {
		components: {
			wakaryInput,wakaryInputs,wakaryInputss
		},
		data() {
			return {
				sms_code:'', //验证码
				pay_password:'', // 第一次支付密码
				pay_password2:'', // 第二次支付密码
				phone:'', // 手机号
				time:300, // 倒计时
				show:true, // 倒计时文字信息
				o_view:true, // 第一页
			};
		},
		onLoad(e) {
			let phone = JSON.parse(localStorage.getItem('userInfo')).data.mobile
			this.phone = phone.substr(0,3) + "****" + phone.substr(7)
		},
		methods: {
			// 倒计时
			countDown(){
				// 设置倒计时
				this.show = false
				this.intervalBtn = setInterval(() => {
					if(this.time < 0) {
						// 重置btn提示信息
						this.show = true
						// 清除定时器
						clearInterval(this.intervalBtn)
						// 重置倒计时状态
						this.time = 300
					};
					// 倒计时
					this.time -- ;
					// window.name = this.time
					if(this.time === 0){
						this.show = true
					}
				}, 1000);
			},
			//下一步
			nextBtn(){
				if(this.sms_code){
					this.o_view = false
					this.pay_password = ''
					this.pay_password2 = ''
				}else{
					this.$api.msg('请输入验证码')
				}
			},
			// 发送验证码
			smsCode(){
				uni.showLoading({
					title: '验证码发送中...',
					mask:true
				})
				
				uniRequest({
					url: '/verify/sms_code/pay/password/',
					method: 'GET',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res.data)
					if(res.status === 200){
						this.$api.msg('验证码已发送')
						uni.hideLoading()
						this.countDown()
					}else if(res.status === 400){
						this.$api.msg(res.data.message)
					}
				}).catch(error => {
					console.log(error);
				})
			},
			// 上一步
			prevBtn(){
				this.o_view = true
				this.sms_code = ''
			},
			// 完成
			submitBth(){
				console.log(this.sms_code,this.pay_password,this.pay_password2)
				uni.showLoading({
					title: '提交中...'
				})
				uniRequest({
					url: '/user/pay/password/',
					method: 'POST',
					data:{
						sms_code:this.sms_code,
						pay_password:this.pay_password,
						pay_password2:this.pay_password2
					},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res.data)
					if(res.status === 200){
						this.$api.msg('支付密码设置成功')
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/set/set'
							})
						},1000)
					}else if(res.status === 400){
						this.$api.msg(res.data.message)
					}
				}).catch(error => {
					console.log(error);
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	.content {
		// padding: 30upx;
	}
	
	.pay-wran{
		width: 100%;
		height: 80upx;
		background-color: #F7F7F7;
		padding: 0 20upx;
	}
	
	.pay-text{
		font-size: 14px;
		color: #999;
		line-height: 80upx;
	}
	
	.wrap{
		width: 100%;
		height: 100%;
		padding: 30upx;
		background: #fff;
		// border-radius: 20upx;
	}
	
	.pay-next{
		color: #fff;
		margin: 20px auto;
		width: 590upx;
		height: 80upx;
		border-radius: 40upx;
		background: linear-gradient(to right,#EE1D23,#F04023);
	}
	
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		.tit {
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.addWidth{
			width: 200upx;
		}
	
		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
	
		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	
	.pay-submit{
		background: linear-gradient(to right,#EE1D23,#F04023);
		color: #fff;
		margin-top: 30px;
		width: 590upx;
		height: 80upx;
		border-radius: 40upx;
	}
	
	.pay-prev{
		background: #fff;
		color: #666;
		margin-top: 15px;
		width: 590upx;
		height: 80upx;
		border-radius: 40upx;
		border: 2upx solid #999;
	}
</style>
