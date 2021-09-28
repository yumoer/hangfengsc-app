<template>
	<view class="content">
		<view class="m-image">
			<image src="../../static/index/yue.png" mode=""></image>
		</view>
		<view class="m-title">
			<text>我的余额</text>
		</view>
		<view class="m-money">
			<text class="price">{{frontPrice}}</text>
			<text v-if="isDot" style="font-size: 26px;">.</text>
			<text style="font-size: 18px;">{{backPrice}}</text>
		</view>
		<view class="m-wrap">
			<button type="default" class="m-btn" @click="shareInfo">充值</button>
			<button type="default" class="m-btn empty" @click="shareInfo">提现</button>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import headerBar from '@/components/headerBar/headerBar.vue'
	export default {
		data(){
			return {
				balance:'', // 价格
				frontPrice:'', // 小数点前
				backPrice:'', // 小数点后
				isDot: true, // 小数点
			}
		},
		components:{
			headerBar
		},
		onLoad() {
			document.getElementsByClassName('uni-page-head-ft')[0].style.paddingRight = '10px'
		},
		onShow(){
			this.getBalance()
		},
		methods:{
			shareInfo(){
				uni.navigateTo({
					url:'/pages/recharge/deposit?balance='+this.balance
				})
			},
			async getBalance(options){
				await uniRequest({
					url:'/user/balance/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.status === 200){
						this.balance = res.data.balance
						this.totalprice(this.balance)
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			totalprice(num) {
				// 判断是否有小数点
				if(!isNaN(num)){ // 判断 number类型的数字是不是NaN，因为NaN也是number类型
					this.isDot = ( (num + '').indexOf('.') != -1 );  // 加一个空字符串 = 强转string类型；
					// indexOf方法，判断字符串中是否存在某个值，存在则返回存在位置的下标(小数点的下标位置是0)，不存在则返回-1，
					// 这里是判断是否存在小数点，数值377无小数点所以返回-1，377.90存在小数点所以返回 3 
					// console.log((num + '').indexOf('.'));
				}
				if (this.isDot) {
					// 分割价钱 => ["337", "90"]
					let splitPrice = num.split(".");
					this.frontPrice = splitPrice[0]
					this.backPrice = splitPrice[1]
				} else {
					this.frontPrice = num
				}
			}
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
		align-items: center;
		text-align: center;
		justify-content: center;
		padding: 20px 20px 0 20px;
	}
	
	.m-image{
		width: 100%;
		height:340upx;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 120upx;
			height: 120upx;
		}
	}
	
	.m-title{
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text{
			font-size: 19px;
			color: #333;
		}
	}
	
	.m-money{
		font-size: 34px;
		font-weight: bold;
		color: #000000;
		.price{
			&:before{
				content: '￥';
				font-size: 38upx;
				margin: 0 2upx 0 8upx;
			}
		}
	}
	
	.m-wrap{
		bottom: 80upx;
		margin: 0 auto;
		width: 89%;
		position: absolute;
		.m-btn{
			background: linear-gradient(to right,#EE1D23,#F04023);
			color: #fff;
			border-radius: 40upx;
			width: 590upx;
			height: 80upx;
		}
		.empty{
			background: #fff;
			color: #EE1D23;
			margin-top: 30upx;
			border:2upx solid #EE1D23;
			border-radius: 40upx;
		}
	}
	
	
</style>
