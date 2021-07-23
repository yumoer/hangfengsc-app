<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">用户名</text>
			<input class="input" type="text" v-model="userInfo.username" placeholder="请输入用户名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="userInfo.mobile" placeholder="请输入手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">电子邮件</text>
			<input class="input" type="text" v-model="userInfo.email" placeholder="请输入电子邮件" placeholder-class="placeholder" />
			<button class="del-btn" v-if="!userInfo.email_active" @click="toTest">{{emailText}}</button>
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
				emailText:'去验证',
				userInfo:{
					username:'',
					mobile:'',
					email:'',
					email_active:false
				},
			}
		},
		onLoad() {
			this.getDate()
		},
		methods: {
			...mapMutations(['logout']),
			async getDate() {
				await uniRequest({
					url: '/user/detail/',
					method: 'get',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					this.userInfo = res.data
				}).catch(error => {
					console.log(error);
				})
			},
			
			// 验证
			async toTest(){
				if(this.emailText === '去验证'){
					await uniRequest({
						url: '/user/email/',
						method: 'put',
						data:{
							email: this.userInfo.email
						},
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res)
						if(res.status === 200){
							this.emailText = '已发送'
						}
					}).catch(error => {
						console.log(error);
					})
				}
			},

			//提交
			confirm() {
				if (!this.userInfo.username) {
					this.$api.msg('请填写用户名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.userInfo.mobile)) {
					this.$api.msg('请填写手机号码');
					return;
				}
				
				if (!this.userInfo.email) {
					this.$api.msg('请填写电子邮箱');
					return;
				}
				
				
				uniRequest({
					url: '/user/detail/',
					method: 'put',
					data:this.userInfo,
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					if(res.status === 200){
						this.$api.msg('资料修改成功')
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
					this.$api.msg('资料修改失败')
				})
				
				
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

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
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.6);
	}
	.del-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 160upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
