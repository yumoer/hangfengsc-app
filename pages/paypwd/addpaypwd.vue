<template>
	<view class="content">
		<view v-if="o_view">
			<view>
				<text style="font-size: 20px;font-weight: bold;">发送短信验证码</text>
			</view>
			<view style="text-align: center;margin-top: 50px;">
				<text style="font-size: 24px;font-weight: bold;">{{phone}}</text>
			</view>
			<button type="default" style="background-color: #00C777;color: #fff;margin-top: 30px;" @click="firstBtn">发送验证码</button>
		</view>
		<view v-if="s_view">
			<view>
				<text style="font-size: 20px;font-weight: bold;">输入短信验证码</text>
			</view>
			<view class="text-area">
				<text class="title">验证码已发送至<text>{{phone}}</text>,请在下方输入框内输入6位数字验证码</text>
			</view>
			<wakary-input style="margin-top: 50px;" type="bottom" v-model="sms_code" @finish="finish"></wakary-input>
			<view style="text-align: center;margin-top: 10px;">
				<text style="color: #999;" v-if="show">{{time}}s后重新发送</text>
				<text style="color: #2B85E4;" @click="smsCode" v-else>重新发送</text>
			</view>
			<button type="default" v-if="btnShow" style="background-color: #00C777;color: #fff;margin-top: 30px;" @click="secendBtn">下一步</button>
		</view>
		<view v-if="t_view">
			<view>
				<text style="font-size: 20px;font-weight: bold;">设置支付密码</text>
			</view>
			<view class="text-area">
				<text class="title">请在下方输入框内输入6位支付密码，注意不要重复或连续数字</text>
			</view>
			<wakary-inputs :isPwd="true" style="margin-top: 50px;" type="box" v-model="pay_password" @finish="finished"></wakary-inputs>
			<!-- <button type="default" style="background-color: #00C777;color: #fff;margin-top: 30px;" @click="topBtn">上一页</button> -->
			<button type="default" v-if="btnsShow" style="background-color: #00C777;color: #fff;margin-top: 30px;" @click="thirdBtn">下一步</button>
		</view>
		
		<view v-if="f_view">
			<view>
				<text style="font-size: 20px;font-weight: bold;">确认支付密码</text>
			</view>
			<view class="text-area">
				<text class="title">请在下方输入框内输入6位支付密码，注意与上次支付密码一致</text>
			</view>
			<wakary-inputss :isPwd="true" style="margin-top: 50px;" type="box" v-model="pay_password2" @finish="finisheds"></wakary-inputss>
			<button type="default" style="background-color: #00C777;color: #fff;margin-top: 30px;" @click="topsBtn">上一页</button>
			<button type="default" v-if="btnssShow" style="background-color: #00C777;color: #fff;margin-top: 30px;" @click="forthBtn">完成</button>
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
				btnShow:false, // 下一步
				btnsShow:false, // 下一步
				btnssShow:false, // 完成
				o_view:true, // 第一页
				s_view:false, // 第二页
				t_view:false, // 第三页
				f_view:false, // 第四页
				
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
				this.intervalBtn = setInterval(() => {
					if(this.time <= 0) {
						// 重置btn提示信息
						this.show = true
						// 清除定时器
						clearInterval(this.intervalBtn)
						// 重置倒计时状态
						this.time = 1;
					};
					// 倒计时
					this.time -- ;
					if(this.time === 0){
						this.show = false
						this.time = 0
					}
				}, 1000);
			},
			//发送验证码
			firstBtn(){
				this.o_view = false
				this.s_view = true
				this.smsCode()
				this.countDown()
			},
			// 发送验证码
			smsCode(){
				uniRequest({
					url: '/verify/sms_code/pay/password/',
					method: 'GET',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res.data)
					if(res.status === 200){
						this.$api.msg('请接收验证码')
					}else if(res.status === 400){
						this.$api.msg(res.data.message)
					}
				}).catch(error => {
					console.log(error);
				})
			},
			
			//获取短信验证码
			finish(val) {
				console.log(val)
				if(val.length === 6){
					this.sms_code = val
					this.btnShow = true
					
				}
			},
			//下一步
			secendBtn(){
				this.s_view = false
				this.t_view = true
			},
			// 获取第一次的支付密码
			finished(val) {
				console.log(val)
				if(val.length === 6){
					this.pay_password = val
					this.btnsShow = true
				}
			},
			// 下一步
			thirdBtn(){
				this.t_view = false
				this.f_view = true
			},
			// 获取第二次的支付密码
			finisheds(val){
				console.log(val)
				if(val.length === 6){
					this.pay_password2 = val
					this.btnssShow = true
				}
			},
			topBtn(){
				this.t_view = false
				this.s_view = true
				this.pay_password = ''
				this.sms_code = ''
			},
			// 上一页
			topsBtn(){
				this.f_view = false
				this.t_view = true
				this.pay_password2 = ''
			},
			// 完成
			forthBtn(){
				console.log(this.sms_code,this.pay_password,this.pay_password2)
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
							uni.navigateBack();
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
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: left;
		padding: 20px 20px 0 20px;
	}
	
	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}
	
	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 34upx;
		color: #8f8f94;
		margin-top: 10px;
	}
</style>
