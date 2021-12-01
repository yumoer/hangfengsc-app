<template>
	<view class="coupon_box">
		<view class="coupon_wrap">
			<image class="coupon_image" src="http://47.94.106.106:8888/group1/M00/5C/79/rBHxiGFVI3yAKiI8AAKRLNs701w8120705" mode=""></image>
		</view>
		<view class="coupon_row">
			<view class="coupon_content">
				<view class="coupon_border" v-if="coupon.length > 0" >
					<view class="coupon_body"v-for="(item, index) in coupon" :key="index">
						<view class="coupon_item" v-if="!item.is_have">
							<view class="coupon_left">
								<view><text class="left_money">{{Math.round(item.reduction)}}</text>元</view>
								<view class="left_type" v-if="item.type === 0">代金券</view>
								<view class="left_type" v-if="item.type === 1">折扣券</view>
								<view class="left_type" v-if="item.type === 2">满减券</view>
							</view>
							<view class="coupon_center">
								<view class="center_class">{{item.cat_name}}专用</view>
								<view class="center_full">满 {{item.full}} 使用</view>
								<view class="center_time">{{item.start_time.split(' ')[0]}}~{{item.end_time.split(' ')[0]}}</view>
							</view>
							<view class="coupon_right">
								<button class="right_btn" type="default" @click="userGet(item)">
									<text class="right_text">立即领取</text>
								</button>
							</view>
						</view>
						<view class="coupon_item" v-else style="background: url(../../static/index/ylq.png);color: #B3B3B3;background-size: 100% 100%;">
							<view class="coupon_left">
								<view><text class="left_money">{{Math.round(item.reduction)}}</text>元</view>
								<view class="left_type" v-if="item.type === 0">代金券</view>
								<view class="left_type" v-if="item.type === 1">折扣券</view>
								<view class="left_type" v-if="item.type === 2">满减券</view>
							</view>
							<view class="coupon_center">
								<view class="center_class">{{item.cat_name}}专用</view>
								<view class="center_full">满 {{item.full}} 使用</view>
								<view class="center_time">{{item.start_time.split(' ')[0]}}~{{item.end_time.split(' ')[0]}}</view>
							</view>
							<view class="coupon_right">
								<button class="right_btn" disabled style="background: #ddd;" type="default">
									<text class="right_text" style="color: #B3B3B3;">已<br>领取</text>
								</button>
							</view>
						</view>
					</view>
				</view>
				<view class="coupon_border" v-else style="text-align: center;padding-bottom: 20vh;">
					<image style="width: 289px;" src="../../static/images/empty/emptyCoupon.png" mode=""></image>
					<view style="margin-top: 20upx;color: #999999;font-size: 16px;">您还没有优惠券</view>
				</view>
			</view>
		</view>
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
			this.getData()
		},
		methods:{
			getData(){
				uniRequest({
					url: '/content/coupons/',
					method: 'GET',
					params:{page:1,page_size:10,ordering:'-create_time'},
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
			userGet(item){
				uniRequest({
					url: '/user/coupons/user/get/'+item.id+'/',
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
						this.getData()
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

<style lang="stylus">
page { 
	background:#F7F7F7; 
}
.coupon_box {
	position:relative;
	left: 0;
	top:0;
	width: 100%;
	height: 100vh;
	background:#9B070E;
	.coupon_wrap{
		text-align: center;
		width: 100%;
		.coupon_image{
			text-align: center;
			width: 100%;
			height: 220px;
		}
	}
	.coupon_row{
		width: 100%;
		height: auto;
		padding: 29px 15px;
		.coupon_content{
			background: #FFFFDD;
			width: 100%;
			height: 100%;
			border-radius: 10px;
			padding: 7px;
			.coupon_border{
				border: 1px solid rgba(177, 38, 39, .3);
				width: 100%;
				height: 100%;
				border-radius: 10px;
				padding: 21px 12px;
				.coupon_body{
					width: 100%;
					height: 100%;
					.coupon_item{
						background: url(../../static/index/ljlq.png);
						background-size: 100% 100%;
						width: 100%;
						height: 90px;
						margin-bottom: 15px;
						color: #F5391D;
						.coupon_left{
							width: 30%;
							height: 100%;
							text-align: center;
							padding-top: 13px;
							float: left;
							.left_type{
								font-size: 12px;
							}
							.left_money{
								font-size: 32px;
								padding-right: 2px;
								font-weight: bold;
							}
						}
						.coupon_center{
							width: 40%;
							height: 100%;
							padding-top: 12px;
							float: left;
							font-weight: bold;
							.center_class{
								font-size: 16px;
							}
							.center_full{
								font-size: 12px;
								margin: 4px 0;
							}
							.center_time{
								font-size: 10px;
								width:150px;
							}
						}
						.coupon_right{
							width: 30%;
							height: 100%;
							padding-top: 12px;
							float: right;
							.right_btn{
								width: 60px;
								height: 60px;
								border-radius: 50%;
								margin-left: 5px;
								margin-top: 5px;
								background: #fae3a8;
								line-height: 28px;
								.right_text{
									font-size: 14px;
									line-height: 10px;
									color: #EE483C;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>