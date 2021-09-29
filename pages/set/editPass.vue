<template>
	<view class="content">
		<view class="wrap">
			<view class="row b-b">
				<text class="tit">当前密码</text>
				<input class="input" type="password" maxlength="16" v-model="userInfo.oldPwd" placeholder="请填写当前密码" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">新密码</text>
				<input class="input" type="password" maxlength="16" v-model="userInfo.newPwd" placeholder="请填写新密码" placeholder-class="placeholder" />
			</view>
			<view class="row">
				<text class="tit">确认密码</text>
				<input class="input" type="password" maxlength="16" v-model="userInfo.confirmPwd" placeholder="请填写确认密码" placeholder-class="placeholder" />
			</view>
		</view>
		
		<button class="add-btn" @click="confirm">修改</button>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import {
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				user_id:'',
				userInfo:{
					oldPwd:'',
					newPwd:'',
					confirmPwd:'',
				},
			}
		},
		onLoad() {
			this.user_id = uni.getStorageSync('userInfo').user_id
		},
		methods: {
			...mapMutations(['logout']),

			//提交
			confirm() {
				var regExp1 = /^[a-zA-Z0-9_-]{8,20}$/;
				
				if(regExp1.test(this.userInfo.oldPwd) !== true){
					this.$api.msg('当前密码格式错误');
					return;
				}
				
				if(regExp1.test(this.userInfo.newPwd) !== true){
					this.$api.msg('新密码格式错误');
					return;
				}
				
				if(this.userInfo.newPwd !== this.userInfo.confirmPwd){
					this.$api.msg('两次密码不一致');
					return;
				 
				}
				
				if(this.userInfo.oldPwd === this.userInfo.newPwd){
					this.$api.msg('当前密码与新密码一致');
					return;
				}
				
				uniRequest({
					url: '/user/password/',
					method: 'put',
					data:{
					    old_password: this.userInfo.oldPwd,
					    password: this.userInfo.newPwd,
					    password2: this.userInfo.confirmPwd
					},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token,
						'Content-Type':'application/json'
					},
				}).then(res => {
					console.log(res)
					if(res.status === 200){
						this.$api.msg('密码修改成功')
						this.logout()
						setTimeout(() => {
							uni.switchTab({
								url:'/pages/user/user',
							})
						}, 800)
					}else if(res.status === 400){
						this.$api.msg(res.data.username[0])
						return
					} 
				}).catch(error => {
					console.log(error);
					this.$api.msg('密码修改失败')
				})
			},
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 30upx;
	}
	.wrap{
		width: 100%;
		height: 100%;
		background: #fff;
		border-radius: 20upx;
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

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 590upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background: linear-gradient(to right,#EE1D23,#F04023);
		border-radius: 40upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.6);
	}
</style>
