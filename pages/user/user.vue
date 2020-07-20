<template>  
    <view class="container">  
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box" @click="navTo('/pages/set/set')">  <!--  @tap="chooseAvatar" -->
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'" mode="aspectFill"></image>
				</view>
				<view class="info-box">
					<text class="username">{{userInfo.username || '游客'}}</text>
				</view>
				
				<!-- <view style="position: absolute;right: 0;">
					<uni-icons type="arrowright" size="30"></uni-icons>
				</view> -->
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<!-- <view class="b-btn">
					立即开通
				</view> -->
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					{{code}}
				</view>
				<!-- <text class="e-m">会员功能暂未上线</text> -->
				<text class="e-b" style="margin-top: 20px;">会员功能暂未上线</text>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/arc.png"></image>
			<!-- 订单 -->
			<view class="history-section icon">
				<list-cell icon="icon-shouye" @eventClick="navTo('/pages/order/order?state=0')" iconColor="#e07472" title="我的订单" tips="全部订单"></list-cell>
				<scroll-view scroll-x class="h-list">
					<view class="scoll-wrapper">
						<view class="order-section">
							<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
								<text class="yticon icon-daifukuan"></text>
								<min-badge :count="count1" style="position: absolute;margin: -40upx 20upx;"></min-badge>
								<text>待付款</text>
							</view>
							<view class="order-item" @click="navTo('/pages/order/order?state=2')"  hover-class="common-hover" :hover-stay-time="50">
								<text class="yticon icon-daifahuo"  style="font-size: 18px;font-weight: bold;margin-top: 4px;padding: 1px 0;"></text>
								<min-badge :count="count2" style="position: absolute;margin: -40upx 20upx;"></min-badge>
								<text>待发货</text>
							</view>
							<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"  :hover-stay-time="50">
								<text class="yticon icon-yishouhuo"></text>
								<min-badge :count="count3" style="position: absolute;margin: -40upx 20upx;"></min-badge>
								<text>待收货</text>
							</view>
							<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover"  :hover-stay-time="50">
								<text class="yticon icon-daipingjia" style="width: 22px;"></text>
								<min-badge :count="count4" style="position: absolute;margin: -40upx 20upx;"></min-badge>
								<text>待评价</text>
							</view>
							<view class="order-item" @click="navTo('/pages/order/postSale/postSale')" hover-class="common-hover"  :hover-stay-time="50">
								<text class="yticon icon-shouhoutuikuan"></text>
								<min-badge :count="count5" style="position: absolute;margin: -40upx 20upx;"></min-badge>
								<text>退款/售后</text>
							</view>
						</view>
					</view>
				</scroll-view>
				
			</view>
			
			<!-- 浏览历史 -->
			<view class="history-section icon" v-if="histories.length > 0">
				<list-cell icon="yticon icon-lishijilu" style="font-size:22px;" iconColor="#5EBA8F" title="浏览历史"></list-cell>
				<scroll-view scroll-x class="h-list">
					<view class="scoll-wrapper">
						<view 
							v-for="(history, index) in histories" :key="index"
							class="floor-item"
							@click="navTo('/pages/product/product?id='+history.id)"
						>
							<image :src="history.default_image_url" mode="aspectFill"></image>
							<text style="text-align: center;" class="title clamp">{{history.name}}</text>
							<text class="price">￥{{history.price}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="history-section icon">
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="收货地址" @eventClick="navTo('/pages/address/address')" tips="完善收货地址"></list-cell>
				<list-cell icon="icon-shopsIdea" iconColor="#f088a2" title="我的评价" @eventClick="navTo('/pages/allAssess/allAssess')" tips="查看所有商品评价"></list-cell>
				<list-cell icon="icon-youhuiquan" @eventClick="navTo('/pages/coupon/exchange')" iconColor="#e07472" title="我的优惠券" tips="兑换码兑换"></list-cell>
				<!-- <list-cell icon="icon-xiaoxi" iconColor="#54b4ef" title="我的客服" @eventClick="navTo('/pages/chat/chat')" tips="查看客服消息"></list-cell> -->
				<list-cell icon="icon-fapiao" iconColor="#5cba22" title="发票信息" @eventClick="navTo('/pages/invoice/invoice')" tips="添加普票/增票/电子票"></list-cell>
				<list-cell icon="icon-gerenziliao" iconColor="#ee663b" title="个人资料" @eventClick="navTo('/pages/set/userInfo')" tips="修改个人资料"></list-cell>
				<list-cell icon="icon-mima" iconColor="#22ee3b" title="修改密码" @eventClick="navTo('/pages/set/editPass')"></list-cell>
				<list-cell icon="icon-xiaoxi" iconColor="#54b4ef" title="意见反馈" @eventClick="voucher('/pages/coupon/voucher')" tips="提交意见反馈"></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏" @eventClick="voucher('/pages/coupon/reduction')"></list-cell>
				<!-- #ifdef APP-PLUS -->
				<list-cell icon="icon-share" @eventClick="navTo('/pages/share/share')" iconColor="#9789f7" title="分享" tips="分享app给好友"></list-cell>
				<!-- #endif --> 
				<!-- #ifdef H5 -->
				<list-cell icon="icon-Group-" @eventClick="navTo('/pages/appDown/appDown')" iconColor="#9789f7" title="下载中心" tips="下载app最新版本"></list-cell>
				<!-- #endif -->
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
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
		onLoad(options){
			console.log(options.data)
		},
		onShow(){
			console.log(this.hasLogin)
			if(this.hasLogin === true){
				this.code = '普通用户'
				console.log(uni.getStorageSync('avatar'))
				if(uni.getStorageSync('avatar') !== ''){
					this.userInfo.portrait = uni.getStorageSync('avatar')
				}else if(uni.getStorageSync('userInfo').avatar !== ''){
					this.userInfo.portrait = uni.getStorageSync('userInfo').avatar
				}else{
					this.userInfo.portrait = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
				}
				this.getDate('待支付')
				this.getDate('待发货')
				this.getDate('待收获')
				this.getDate('待评价')
				this.getDate1()
				this.browseHistories()
			}else{
				this.code = '未登录用户'
				this.count1 = 0
				this.count2 = 0
				this.count3 = 0
				this.count4 = 0
				this.count5 = 0
				this.browseHistories()
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
			
			/* // 代金券
			coupon(){
				if(this.exNum.coupon === 0){
					this.$api.msg('您还未有代金券')
				}else{
					uni.navigateTo({
						url:'/pages/coupon/exchange'
					})
				}
				
			},
			
			// 折扣券
			voucher(){
				if(this.exNum.voucher === 0){
					this.$api.msg('您还未有折扣券')
				}else{
					uni.navigateTo({
						url:'/pages/coupon/exchange'
					})
				}
			},
			
			// 满减券
			reduction(){
				if(this.exNum.reduction === 0){
					this.$api.msg('您还未有满减券')
				}else{
					uni.navigateTo({
						url:'/pages/coupon/exchange'
					})
				}
			}, */
			
			length(obj) {
			     var count = 0;
			     for(var i in obj){
			         count ++;
			     }
			     return count;
			 },
			
			async getDate(status){
				const response = await uniRequest({
					url:'/orders/info/?status='+status,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(response=>{
					if(response.status === 200){
						console.log(response.data.order_id)
						const count = this.length(response.data.order_id)
						if(status === '待支付'){
							this.count1 = count
						}else if(status === '待发货'){
							this.count2 = count
						}else if(status === '待收货'){
							this.count3 = count
						}else if(status === '待评价'){
							this.count4 = count
						}else if(status === '已完成'){
							this.count5 = count
						}
						
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			async getDate1(){
				const response = await uniRequest({
					url:'mobile/order/list/return/goods/user/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(response=>{
					if(response.status === 200){
						console.log(response.data.order_id)
						const count = this.length(response.data)
						this.count5 = count
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			async browseHistories(){
				const response = await uniRequest({
					url:'/browse_histories/',
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
						this.$api.msg('登录过期,请重新登录')
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
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
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
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
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
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
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
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
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