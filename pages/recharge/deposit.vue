<template>
	<view class="content">
		<view class="d-card">
			<view class="d-wrap">
				<text class="d-title">可用余额</text>
				<text class="d-money">￥{{balance}}</text>
				<text class="d-ka">充值卡</text>
				<text class="d-num">HFYT-20080001</text>
			</view>
		</view>
		<view class="d-content">
			<view class="d-name">
				<text style="font-size: 20px;">充值卡号</text>
			</view>
			<view class="d-input">
				<input class="input" type="text" focus v-model="recharge" placeholder="请输入充值卡号" placeholder-class="placeholder" maxlength="20"/>
			</view>
			<view class="d-red">
				<text class="d-text">温馨提示：最多可输入20位数字</text>
			</view>
			<button type="default" class="d-btn" @click="shareInfo">立即充值</button>
		</view>
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
				balance:'',
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
			this.balance = options.balance
		},
		methods:{
			async shareInfo(){
				console.log(this.recharge)
				await uniRequest({
					url:'/user/balance/top_up/?pk='+this.recharge,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res)
					if(res.status === 200){
						console.log(res.data)
						this.$api.msg(res.data.message)
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}else if(res.status === 400){
						this.$api.msg(res.data.message)
						this.recharge = ''
					}else if(res.status === 500){
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
	page{
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	
	.content{
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: left;
	}
	
	.d-card{
		width: 100%;
		height:460upx;
		padding:50upx 30upx;
		background-color: $page-color-base;
		.d-wrap{
			width:100%;
			height: 360upx;
			background: url('../../static/index/czka.png');
			background-size: 100% 360upx;
			color: #fff;
			position: relative;
			.d-title{
				position: absolute;
				top: 96upx;
				right: 40upx;
				font-size: 12px;
			}
			.d-money{
				position: absolute;
				top: 140upx;
				right: 40upx;
				font-size: 30px;
			}
			.d-ka{
				position: absolute;
				bottom: 40upx;
				left: 40upx;
			}
			.d-num{
				position: absolute;
				bottom: 40upx;
				right: 40upx;
			}
		}
	}
	
	.d-content{
		width: 100%;
		height: 300px;
		background-color: #fff;
		.d-name{
			margin-top: 100upx;
			text-align: center;
		}
		.d-input{
			text-align: center;
			margin-top: 53px;
			.input{
				height: 60upx;
				width: 80%;
				margin: 0 10%;
				border-bottom: 2upx solid #ddd;
				font-size: 14px;
			}
		}
		.d-red{
			text-align: center;
			margin-top: 20upx;
			.d-text{
				color: #F1654E;
				font-size: 12px;
				margin-top: 20px;
			}
		}
		.d-btn{
			background: linear-gradient(to right,#EE1D23,#F04023);
			color: #fff;
			margin-top: 30px;
			width: 590upx;
			height: 80upx;
			border-radius: 40upx;
			margin-top: 250px;
		}
	}
</style>
