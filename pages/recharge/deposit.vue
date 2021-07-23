<template>
	<view class="content">
		<view>
			<text style="font-size: 20px;font-weight: bold;">余额充值</text>
		</view>
		<view class="text-area">
			<text class="title">请在下方输入框内输入充值卡号,请注意最多二十位</text>
		</view>
		<view style="text-align: center;margin-top: 50px;">
			<input class="input" type="text" v-model="recharge" placeholder="点击输入充值卡号" placeholder-class="placeholder" maxlength="20"/>
		</view>
		<button type="default" style="background-color: #fa436a;color: #fff;margin-top: 30px;width: 100%;" @click="shareInfo">立即充值</button>
	</view>
	
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import xwEmpty from '@/components/xw-empty/xw-empty';
	export default {
		data(){
			return {
				recharge:'',
				query:{
					page:1,
					page_size:100
				},
				noOrder:true,
				goodsList:[]
			}
		},
		comments:{xwEmpty},
		onLoad(options){
			
		},
		methods:{
			async shareInfo(){
				console.log(this.recharge)
				const response = await uniRequest({
					url:'/user/balance/top_up/?pk='+this.recharge,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(response=>{
					if(response.status === 200){
						console.log(response.data)
						this.$api.msg(response.data.message)
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}else if(response.status === 400){
						this.$api.msg(response.data.message)
					}else if(response.status === 500){
						this.$api.msg('服务器错误')
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			navToDetailPage(item){
				console.log(item)
				let id = item.sku.id
				//测试数据没有写id，用title代替
				uni.navigateTo({
					url: `/pages/product/product?id=${id}&value=undefined`
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
