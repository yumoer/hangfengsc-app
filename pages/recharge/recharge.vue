<template>
	<view class="content">
		<view>
			<text style="font-size: 20px;font-weight: bold;">余额查询</text>
		</view>
		<view style="text-align: center;margin-top: 50px;">
			<text style="font-size: 24px;font-weight: bold;">￥{{balance}}</text>
		</view>
		<button type="default" style="background-color: #fa436a;color: #fff;margin-top: 30px;width: 100%;" @click="shareInfo">余额充值</button>
	</view>
	
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data(){
			return {
				balance:'',
			}
		},
		onShow(){
			this.getBalance()
		},
		methods:{
			shareInfo(){
				uni.navigateTo({
					url:'/pages/recharge/deposit'
				})
			},
			async getBalance(options){
				const response = await uniRequest({
					url:'/user/balance/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(response=>{
					if(response.status === 200){
						console.log(response.data)
						this.balance = response.data.balance
					}else if(response.status === 400){
						
					}
				}).catch(error=>{
					console.log(error)
				})
			},
		}
	}
	
	
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: left;
		padding: 20px 20px 0 20px;
	}
	.text-area {
		display: flex;
		justify-content: left;
	}
	.title {
		font-size: 34upx;
		color: #8f8f94;
		margin-top: 10px;
	}
</style>
