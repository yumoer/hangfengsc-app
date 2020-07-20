<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">兑换码</text>
			<input class="input" type="text" v-model="exNum" placeholder="请输入兑换码" placeholder-class="placeholder" />
			<div style="width: 60px;color:#fa436a;" @click="confirm">立即兑换</div>
		</view>
		
		<view style="position: relative;">
			<view v-for="(tiket,index) in tikets" :key=index style="padding:15px;" >
				<image style="background: #ea5504;align-items: center;width:65%;height: 180upx;" :src="tiket.coupons.image" mode="" >
					<text class="yticon icon-bangzhu" style="position: absolute;z-index: 1;margin-left: -36px;" @click="showHide(tiket)"></text>
				</image>
				<image style="width: 35%;height: 180upx;" src="/static/index/lijishiyong.png" mode="" @click="lookPrice(tiket)"></image>
			</view>
		</view>
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
				exNum:'',
				source: 0,
				tikets:[],
				show:true,
			}
		},
		created(){
			this.useTiket()
		},
		
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
		},
		
		methods: {
			//提交
			confirm() {
				if (!this.exNum) {
					this.$api.msg('请填写兑换码');
					return;
				}
				uniRequest({
					url: 'coupons/redeem/',
					method: 'GET',
					data:{
						pk:this.exNum,
					},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					if(res.status === 200){
						this.$api.msg(res.data.message)
						if(res.data.message === '兑换成功'){
							console.log('兑换成功')
							this.useTiket()
						}else{
							console.log('兑换码错误')
							return
						}
					}else if(res.status === 401){
						this.$api.msg('用户过期或未登录')
						return
					}
				}).catch(error => {
					console.log(error);
				})
			},
			useTiket(){
				uniRequest({
					url: 'coupons/user/1/',
					method: 'GET',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					if(res.status === 401){
						this.$api.msg('用户过期或未登录')
						return
					}
					this.tikets = res.data.results
				}).catch(error => {
					console.log(error);
				})
			},
			lookPrice(tiket){
				if(this.source == 1){
					console.log(tiket)
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().tiket = tiket;
					uni.navigateBack()
					return
				}
				uni.navigateTo({
					url:'/pages/coupon/couponShop?couponId='+tiket.coupons.id
				})
			},
				
			showHide(item){
				console.log(item)
				this.$api.msg(item.coupons.explain,4000)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
		
	}
	.content{
		position: relative;
	}

	.row {
		display: flex;
		align-items: center;
		// position: fixed;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;
		// z-index: 1;
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
	.icon-bangzhu{
		color: #ea5504;
		font-size: 40upx;
	}
</style>
