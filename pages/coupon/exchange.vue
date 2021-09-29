<template>
	<view class="content">
		<view style="padding: 30upx 30upx 0 30upx;">
			<lgd-tab :tabValue="tabValue" @getIndex ="getIndex"/>
		</view>
		<view class="row" v-if="!isEmpty">
			<view v-for="(item,index) in tikets" :key="index" v-if="Index === 0" :class="'back_wrap'+item.coupons.type" :style="{background:item.type === 0 ? '../../static/index/djj.png' : item.type === 1 ? '../../static/index/zkj.png' : '../../static/index/mjj.png'}">
				<view class="wrap_left">
					￥<text class="wrap_price">{{Math.round(item.coupons.reduction)}}</text>
					<text class="wrap_type" v-if="item.coupons.type === 0">代金券</text>
					<text class="wrap_type" v-if="item.coupons.type === 1">折扣券</text>
					<text class="wrap_type" v-if="item.coupons.type === 2">满减券</text>
				</view>
				<view class="wrap_center">
					<view class="wrap_name">{{item.coupons.cat_name}}专用</view>
					<view class="wrap_full">满 {{item.coupons.full}} 使用</view>
					<view class="wrap_time">{{item.coupons.start_time.split('T')[0]}}~{{item.coupons.end_time.split('T')[0]}}</view>
					
				</view>
				<view class="wrap_right">
					<button class="wrap_btn" type="default" @click="naToPage(item)">使用</button>
				</view>
			</view>
			<view v-for="(item,index) in tikets" :key="index" v-if="Index === 1" class="type" :class="'back_wrap'+item.coupons.type" :style="{background:item.type === 0 ? '../../static/index/djj.png' : item.type === 1 ? '../../static/index/zkj.png' : '../../static/index/mjj.png'}">
				<view class="wrap_left">
					￥<text class="wrap_price">{{Math.round(item.coupons.reduction)}}</text>
					<text class="wrap_type" v-if="item.coupons.type === 0">代金券</text>
					<text class="wrap_type" v-if="item.coupons.type === 1">折扣券</text>
					<text class="wrap_type" v-if="item.coupons.type === 2">满减券</text>
				</view>
				<view class="wrap_right">
					<view class="wrap_name">{{item.coupons.cat_name}}专用</view>
					<view class="wrap_full">满 {{item.coupons.full}} 使用</view>
					<view class="wrap_time">{{item.coupons.start_time.split('T')[0]}}~{{item.coupons.end_time.split('T')[0]}}</view>
					<image class="wrap_image" src="../../static/index/yishiyong.png" mode=""></image>
				</view>
			</view>
			<view v-for="(item,index) in tikets" :key="index" v-if="Index === 2" class="type" :class="'back_wrap'+item.coupons.type" :style="{background:item.type === 0 ? '../../static/index/djj.png' : item.type === 1 ? '../../static/index/zkj.png' : '../../static/index/mjj.png'}">
				<view class="wrap_left">
					￥<text class="wrap_price">{{Math.round(item.coupons.reduction)}}</text>
					<text class="wrap_type" v-if="item.coupons.type === 0">代金券</text>
					<text class="wrap_type" v-if="item.coupons.type === 1">折扣券</text>
					<text class="wrap_type" v-if="item.coupons.type === 2">满减券</text>
				</view>
				<view class="wrap_right">
					<view class="wrap_name">{{item.coupons.cat_name}}专用</view>
					<view class="wrap_full">满 {{item.coupons.full}} 使用</view>
					<view class="wrap_time">{{item.coupons.start_time.split('T')[0]}}~{{item.coupons.end_time.split('T')[0]}}</view>
					<image class="wrap_image" src="../../static/index/yiguoqi.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 空白页 -->
		<view v-else>
			<xw-empty :isShow="isEmpty" img="/static/empty/emptyCoupon.png" path="/pages/coupon/coupon" btnText="去领取" text="您还没有领取优惠券" textColor="#C0C4CC"></xw-empty>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import xwEmpty from '@/components/xw-empty/xw-empty';
	import {mapMutations,mapState} from 'vuex';
	import lgdTab from '@/components/lgd-tab/lgd-tab';
	export default {
		data() {
			return {
				exNum:'',
				source: 0,
				tikets:[],
				show:true,
				isEmpty: true, //空白页现实  true|false
				tabValue:['已兑换','已使用','已过期'],
				Index:0,
			}
		},
		components:{xwEmpty,lgdTab},
		computed:{
			...mapState(['hasLogin'])
		},
		watch:{
			//显示空白页
			tikets(e){
				console.log(e)
				this.tikets = e
				let empty = e.length === 0 ? true: false;
				console.log(this.isEmpty,empty)
				if(this.isEmpty !== empty){
					this.isEmpty = empty;
				}
			}
		},
		onLoad(option){
			console.log(option);
			this.source = option.source;
		},
		
		methods: {
			getIndex(index) { 
				console.log("当前下标:" + index) 
				
				this.Index = index
				if(index === 0){
					this.useTiket(1)
				}else if(index === 1){
					this.useTiket(2)
				}else if(index === 2){
					this.useTiket(3)
				}
			},
			useTiket(index){
				uniRequest({
					url: '/user/coupons/user/'+index+'/',
					method: 'GET',
					params:{
						page:1,page_size:10,ordering:'-create_time',
					},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					if(res.status === 200){
						this.tikets = res.data.results
						
					}else if(res.status === 401){
						this.$api.msg('用户过期或未登录')
					}else if(res.status === 500){
						this.$api.msg('服务器错误')
					}
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
				
			},
				
			showHide(item){
				console.log(item)
				this.$api.msg(item.coupons.explain,4000)
			},
			
			// 使用
			naToPage(item){
				uni.navigateTo({
					url:'/pages/coupon/couponShop?skus='+JSON.stringify(item.coupons.skus)
				})
			},
			
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
		}
	}
</script>

<style lang="stylus">
	.row{
		padding: 30upx;
		.back_wrap0{
			width: 100%;
			height: 250upx;
			margin-bottom: 30upx;
			background: url('../../static/index/djj.png');
			background-size: 100% 100%;
			position: relative;
			.wrap_left{
				width: 32%;
				height: 100%;
				float: left;
				color: #fff;
				text-align: center;
				padding-top: 50upx;
				.wrap_price{
					font-size: 64upx;
					font-weight: bold;
				}
				.wrap_type{
					display: block;
					padding: 20upx;
				}
			}
			.wrap_center{
				width: 40%;
				height: 100%;
				float: left;
				padding: 40upx;
				.wrap_name{
					font-size: 32upx;
					color: #000000;
					font-weight: bold;
				}
				.wrap_full{
					font-size: 24upx;
					color: #666666;
					font-weight: bold;
					margin: 14px 0;
				}
				.wrap_time{
					font-size: 24upx;
					color: #333333;
					font-weight: bold;
					margin: 14px 0;
					width:150px;
				}
				.wrap_image{
					position: absolute;
					right: 15px;
					top: 20px;
					width: 160upx;
					height:160upx;
				}
			}
			.wrap_right{
				width: 28%;
				height: 100%;
				float: right;
				padding: 40upx;
				.wrap_btn{
					position: relative;
					right: 15px;
					top: 30px;
					width: 160upx;
					height:60upx;
					line-height:60upx;
					border: 1px solid #EE1D23;
					border-radius: 18px;
					color: #EE1D23;
					font-size: 32upx;
				}
			}
		}
		.back_wrap1{
			width: 100%;
			height: 250upx;
			margin-bottom: 30upx;
			background: url('../../static/index/zkj.png');
			background-size: 100% 100%;
			position: relative;
			.wrap_left{
				width: 32%;
				height: 100%;
				float: left;
				color: #fff;
				text-align: center;
				padding-top: 50upx;
				.wrap_price{
					font-size: 64upx;
					font-weight: bold;
				}
				.wrap_type{
					display: block;
					padding-top: 20upx;
				}
			}
			.wrap_center{
				width: 40%;
				height: 100%;
				float: left;
				padding: 40upx;
				.wrap_name{
					font-size: 32upx;
					color: #000000;
					font-weight: bold;
				}
				.wrap_full{
					font-size: 24upx;
					color: #666666;
					font-weight: bold;
					margin: 14px 0;
				}
				.wrap_time{
					font-size: 24upx;
					color: #333333;
					font-weight: bold;
					margin: 14px 0;
					width:150px;
				}
				.wrap_image{
					position: absolute;
					right: 15px;
					top: 20px;
					width: 160upx;
					height:160upx;
				}
			}
			.wrap_right{
				width: 28%;
				height: 100%;
				float: right;
				padding: 40upx;
				.wrap_btn{
					position: relative;
					right: 15px;
					top: 30px;
					width: 160upx;
					height:60upx;
					line-height:60upx;
					border: 1px solid #EE1D23;
					border-radius: 18px;
					color: #EE1D23;
					font-size: 32upx;
				}
			}
		}
		.back_wrap2{
			width: 100%;
			height: 250upx;
			margin-bottom: 30upx;
			background: url('../../static/index/mjj.png');
			background-size: 100% 100%;
			.wrap_left{
				width: 32%;
				height: 100%;
				float: left;
				color: #fff;
				text-align: center;
				padding-top: 50upx;
				.wrap_price{
					font-size: 64upx;
					font-weight: bold;
				}
				.wrap_type{
					display: block;
					padding-top: 20upx;
				}
			}
			.wrap_center{
				width: 40%;
				height: 100%;
				float: left;
				padding: 40upx;
				.wrap_name{
					font-size: 32upx;
					color: #000000;
					font-weight: bold;
				}
				.wrap_full{
					font-size: 24upx;
					color: #666666;
					font-weight: bold;
					margin: 14px 0;
				}
				.wrap_time{
					font-size: 24upx;
					color: #333333;
					font-weight: bold;
					margin: 14px 0;
					width:150px;
				}
				.wrap_image{
					position: absolute;
					right: 15px;
					top: 20px;
					width: 160upx;
					height:160upx;
				}
			}
			.wrap_right{
				width: 28%;
				height: 100%;
				float: right;
				padding: 40upx;
				.wrap_btn{
					position: relative;
					right: 15px;
					top: 30px;
					width: 160upx;
					height:60upx;
					line-height:60upx;
					border: 1px solid #EE1D23;
					border-radius: 18px;
					color: #EE1D23;
					font-size: 32upx;
				}
			}
		}
		.type{
			opacity .4
		}
	}


</style>
