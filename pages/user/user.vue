<template>  
    <view class="container">  
		<view class="user-section">
			<image class="bg" src="http://47.94.106.106:8888/group1/M00/53/AC/rBHxiGEM6WOAet97AAMVY9-EXjo1115258"></image>
			<view class="user-info-box">  <!--  @tap="chooseAvatar" -->
				<view class="portrait-box">
					<image class="portrait" v-if="userInfo.portrait" :src="userInfo.portrait" mode="aspectFill" @click="navTo('/pages/set/avator')"></image>
					<image class="portrait" v-else :src="'/static/img/missing-face.png'" mode="aspectFill" @click="navTo('/pages/public/login')"></image>
				</view>
				<view class="info-box">
					<view class="username">{{userInfo.username || '游客'}}</view><br>
					<text class="welcome" v-if="userInfo.username">Hi~ ，欢迎来到行丰商城！</text>
					<text class="welcome" v-else  @click="navTo('/pages/public/login')">Hi~ , 点击登录！</text>
				</view>
				<view class="info-vip">
					<view class="info-btn">
						<text class="info-text" @click="openVip">开通VIP</text>
					</view>
				</view>
			</view>
		</view>
		<view class="tj-sction">
			<view class="tj-item" @click="navTo('/pages/recharge/recharge')">
				<text style="margin-bottom: 20upx;">￥<text class="num">{{balance || 0}}</text></text>
				<text>余额</text>
			</view>
			<view class="tj-item" @click="navTo('/pages/coupon/exchange')">
				<text class="num">{{coupon || 0}}</text>
				<text>优惠券</text>
			</view>
			<!-- <view class="tj-item">
				<text class="num">0</text>
				<text>积分</text>
			</view> -->
			<view class="tj-item" @click="navTo('/pages/user/histories/histories')">
				<text class="num">{{histories.length || 0}}</text>
				<text>足迹</text>
			</view>
		</view>
		<!-- :style="[{ transform: coverTransform,transition: coverTransition}]"-->
		<view 
			class="cover-container"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
			
		>
			<!-- 订单 -->
			<view class="history-section icon">
				<list-cell icon="icon-shouye" @eventClick="navTo('/pages/order/order?state=0')" iconColor="#ee1d23" title="我的订单" tips="全部订单"></list-cell>
				<scroll-view scroll-x class="h-list">
					<view class="scoll-wrapper">
						<view class="order-section">
							<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
								<image style="width: 66upx;height: 58upx;" src="http://47.94.106.106:8888/group1/M00/54/38/rBHxiGETbXqAJ41CAAAIaUlH-9g8641577" mode=""></image>
								<min-badge class="badge" :count="count1"></min-badge>
								<text>待付款</text>
							</view>
							<view class="order-item" @click="navTo('/pages/order/order?state=2')"  hover-class="common-hover" :hover-stay-time="50">
								<image style="width: 66upx;height: 58upx;" src="http://47.94.106.106:8888/group1/M00/54/38/rBHxiGETbXWAHrJuAAAIekhIRO09913132" mode=""></image>
								<min-badge class="badge" :count="count2"></min-badge>
								<text>待发货</text>
							</view>
							<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"  :hover-stay-time="50">
								<image style="width: 66upx;height: 58upx;" src="http://47.94.106.106:8888/group1/M00/54/38/rBHxiGETbXqAT8l5AAAItlQQ-yU0339251" mode=""></image>
								<min-badge class="badge" :count="count3"></min-badge>
								<text>待收货</text>
							</view>
							<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover"  :hover-stay-time="50">
								<image style="width: 66upx;height: 58upx;" src="http://47.94.106.106:8888/group1/M00/54/38/rBHxiGETbXqAAJwQAAAISdlMHnE8185357" mode=""></image>
								<min-badge class="badge" :count="count4"></min-badge>
								<text>待评价</text>
							</view>
							<view class="order-item" @click="navTo('/pages/order/postSale/postSale')" hover-class="common-hover"  :hover-stay-time="50">
								<image style="width: 60upx;height: 58upx;" src="http://47.94.106.106:8888/group1/M00/54/38/rBHxiGETbXqAKMoyAAALD2mRsi80992206" mode=""></image>
								<min-badge class="badge" :count="count5"></min-badge> 
								<text>退款售后</text>
							</view>
						</view>
					</view>
				</scroll-view>
				
			</view>
			<view class="history-section icon">
				<list-cell icon="icon-user-dizhi" iconColor="#ee1d23" title="收货地址" @eventClick="navTo('/pages/address/address')" tips="完善收货地址"></list-cell>
				<list-cell icon="icon-user-pingjia" iconColor="#ee1d23" title="我的评价" @eventClick="navTo('/pages/allAssess/allAssess')" tips="查看所有商品评价"></list-cell>
				<list-cell icon="icon-user-shoucang" iconColor="#ee1d23" title="我的收藏" @eventClick="navTo('/pages/coupon/reduction')"></list-cell>
				<list-cell icon="icon-user-geren" iconColor="#ee1d23" title="个人资料" @eventClick="navTo('/pages/set/userInfo')" tips="修改个人资料"></list-cell>
				<list-cell icon="icon-user-editpwd" iconColor="#ee1d23" title="修改密码" @eventClick="navTo('/pages/set/editPass')"></list-cell>
				<list-cell icon="icon-user-fapiao" iconColor="#ee1d23" title="发票信息" @eventClick="navTo('/pages/invoice/invoice')" tips="添加普票/增票/电子票"></list-cell>
				<list-cell icon="icon-user-fankui" iconColor="#ee1d23" title="意见反馈" @eventClick="navTo('/pages/coupon/voucher')" tips="提交意见反馈"></list-cell>
				<!-- #ifdef APP-PLUS -->
				<list-cell icon="icon-user-share" @eventClick="navTo('/pages/share/share')" iconColor="#ee1d23" title="分享" tips="分享app给好友"></list-cell>
				<!-- #endif --> 
				<!-- #ifdef H5 -->
				<list-cell icon="icon-user-xiazai" @eventClick="navTo('/pages/appDown/appDown')" iconColor="#ee1d23" title="下载中心" tips="下载app最新版本"></list-cell>
				<!-- #endif -->
			</view>
		</view>
    </view>  
</template>  
<script>  
	import uniRequest from 'uni-request';
	import listCell from '@/components/mix-list-cell';
    import {  
        mapState,mapMutations
    } from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				histories:[],
				balance:0,
				coupon:0,
				exNum:{
					coupon:0,
					voucher:0,
					reduction:0
				},
				code:'',
				count1:null,
				count2:null,
				count3:null,
				count4:null,
				count5:null,
			}
		},
		
		async onLoad(options){
			console.log(options.data)
		},
		onShow(){
			console.log(this.hasLogin)
			if(this.hasLogin === true){
				this.code = '普通用户'
				console.log(uni.getStorageSync('userInfo').avatar)
				if(uni.getStorageSync('avatar') !== ''){
					this.userInfo.portrait = uni.getStorageSync('avatar')
				}else if(uni.getStorageSync('userInfo').avatar !== ''){
					this.userInfo.portrait = uni.getStorageSync('userInfo').avatar
				}else{
					this.userInfo.portrait = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
				}
				this.getDate(2)
				this.getDate(3)
				this.getDate(4)
				this.getDate(5)
				this.getDate1()
				this.getBanlace()
				this.browseHistories()
				this.getCouponList()
			}else{
				this.code = '未登录用户'
				this.getDate(2)
				this.getDate(3)
				this.getDate(4)
				this.getDate(5)
				this.getDate1()
				this.getBanlace()
				this.browseHistories()
				this.getCouponList()
			}
			
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				this.navTo('/pages/notice/notice');
			}
		},
		
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (this.shareObj.shareMenu.isVisible()) {
				this.shareObj.shareMenu.hide();
				this.shareObj.alphaBg.hide();
				return true
			}
		},
		
		// #endif
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
		
        methods: {
			...mapMutations(['logout']),
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				console.log(url)
				if(url === '/pages/appDown/appDown'){
					uni.navigateTo({
						url
					})
				    return
				}else{
					if(!this.hasLogin){
						url = '/pages/public/login';
					}
					console.log(url)
					uni.navigateTo({
						url
					})  
				}
			}, 
			
			async getBanlace(){
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
					}else{
						this.balance = 0
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			// 开通vip
			openVip(){
				this.$api.msg('vip功能未开放')
			},
			
			getCouponList(){
				uniRequest({
					url: '/user/coupons/user/1/',
					method: 'GET',
					params:{
						page:1,page_size:10,ordering:'-create_time',
					},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					this.coupon = res.data.count
				}).catch(error => {
					console.log(error);
				})
			},
			
			// 兑换码兑换
			exchange(){
				uni.navigateTo({
					url:'/pages/coupon/exchange'
				})
			},
			
			voucher(url){
				uni.navigateTo({
					url:url
				})
			},
			
			
			length(obj) {
			     var count = 0;
			     for(var i in obj){
			         count ++;
			     }
			     return count;
			 },
			
			async getDate(state){
				console.log(state)
				await uniRequest({
					url:'/mobile/order/list/',
					method:'get',
					params:{page:1,page_size:10,status:state},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					switch (state){
						case 2:
							this.count1 = res.data.count
							break;
						case 3:
							this.count2 = res.data.count
							break;
						case 4:
							this.count3 = res.data.count
							break;
						case 5:
							this.count4 = res.data.count
							break;
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			async getDate1(){
				await uniRequest({
					url:'/mobile/order/list/return/goods/user/',
					method:'get',
					params:{page:1,page_size:10},
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.status === 200){
						this.count5 = this.length(res.data)
					}else{
						this.count5 = 0
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			async browseHistories(){
				await uniRequest({
					url:'/user/browse_histories/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token,
					}
				}).then(res=>{
					console.log(res)
					this.$api.msg(res.status)
					if(res.status === 200){
						this.histories = res.data
					}else if(res.status === 401){
						this.logout();
						this.histories = []
						this.$api.msg('请重新登录')
					}
				}).catch(error=>{
					this.histories = []
				})
				
			},
	
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
        }  
    }  
</script>  
<style lang='scss'>
	/deep/ .min-badge-count{
		background-color: $uni-color-hangfeng;
	}
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 416upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		line-height: 26upx;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: 32upx;
			color: #fff;
			margin-left: 20upx;
			width: 240upx;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
			height: 40upx;
		}
		.welcome{
			margin-left: 20upx;
			font-size: 24upx;
			color: rgba(255,255,255,.85);
		}
		
		.info-vip{
			position: absolute;
			right: 0;
		}
		
		.info-btn{
			width: 147upx;
			height: 50upx;
			background-color: rgba(0,0,0,.1);
			text-align: center;
			line-height: 45upx;
			border-radius: 26upx;
		}
		
		.info-text{
			font-size: 26upx;
			color: #fefefe;
		}
		
	}
	
	

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		padding: 0 30upx;
		position:relative;
		padding-bottom: 20upx;
		margin-top: -45px;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		background-color: #fff;
		position: relative;
		top: -50px;
		margin: 0 30px;
		box-shadow: 2px 2px 4px rgba(0,0,0,.3);
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 200upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
			font-weight: bold;
			margin-bottom: 20upx;
		}
	}
	.order-section{
		@extend %section;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
			text-align: center;
		}
		image{
			width: 66upx;
			height: 58upx;
			margin: 0 auto;
		}
		.badge{
			top: -50upx;
			right:-36upx
		}
		text{
			margin-top: 16upx;
			margin-left: 16upx;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-user-editpwd{
			font-size: 28px;
		}
	}
	.history-section{
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.mix-list-cell{
				padding: 0 15px;
			}
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
			.scoll-wrapper{
				display:flex;
				align-items: flex-start;
			}
			.floor-item{
				width: 180upx;
				margin-right: 20upx;
				font-size: $font-sm+2upx;
				color: $font-color-dark;
				line-height: 1.8;
				image{
					width: 180upx;
					height: 180upx;
					border-radius: 6upx;
				}
				.price{
					color: $uni-color-primary;
					text-align: center;
					display: inherit;
				}
			}
		}
	}
	
</style>