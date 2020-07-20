<template>
	<view class="coupon_box">
		<view v-for="(item, index) in coupon" :key="index" style="padding: 0 15px;margin-top: 10px;" >
			<image style="align-items: center;width:65%;height: 180upx;line-height: 180upx;" :src="item.image" mode="" @click="userGet(item)"></image>
			<image style="width: 35%;height: 180upx;" src="/static/index/lijilingqu.png" mode="" @click="userGet(item)"></image>
		</view>
		<button class="add-btn" @click="navigateTo()">立即使用</button>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data(){
			return {
				coupon:[]
			}
		},
		onLoad() {
			uniRequest({
				url: 'coupons/list/',
				method: 'GET',
				headers: {
					Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
				},
			}).then(res => {
				console.log(res)
				if(res.status === 401){
					console.log('111')
					this.$api.msg('用户过期或未登录')
					return
				}
				this.coupon = res.data.results
			}).catch(error => {
				console.log(error);
			})
		},
		methods:{
			userGet(item){
				uniRequest({
					url: 'coupons/user/get/'+item.id+'/',
					method: 'GET',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res.data,res.data.message)
					if(res.data.type){
						if(res.status === 401){
							this.$api.msg('用户过期或未登录')
							return
						}
						this.$api.msg('领取成功')
						
					}else{
						this.$api.msg(res.data.message)
					}
				}).catch(error => {
					console.log(error);
				})
			},
			navigateTo(){
				uni.navigateTo({
					url:'/pages/coupon/exchange'
				})
			}
		}
	}
</script>

<style lang="less">
page { background:#ffffff; }
.coupon_box {
	width:100%;
	height:auto;
    display:table; 
	padding:6upx 26upx 26upx 26upx;
	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: 28upx;
		color: #fff;
		background-color: #ea5504;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.6);
	}
}

.other_type {
	width:100%; 
	height:90upx; 
	padding-top:50upx;
	.text { 
		width:100%;
	    border-top:1px solid #eeeeee; 
		display:block; 
		text-align:center; 
		position:relative; 
	}
	.text span { 
		width:180upx; 
		height:40upx; 
		line-height:40upx; 
		color:#999999; 
		display:block; 
		background:#ffffff; 
		position:absolute; 
		left:50%; 
		top:50%; 
		margin-left:-90upx; 
		margin-top:-20upx; 
		font-size:28upx;
	}
}
</style>