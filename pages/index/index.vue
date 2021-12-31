<template>
	<view class="container">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background"></view>
			<swiper class="carousel" circular autoplay @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="goToPage(item.url)">
					<image :src="item.image"/>
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		
		<!-- 主题ICON -->
		<!-- <view class="cate-section">
			<view class="cate-item" v-for="(homePage,index) in homePageList" :key=index @click="goIcon(homePage)">
				<image :src="homePage.src"></image>
				<text>{{homePage.text}}</text>
			</view>
		</view> -->
		
		<view class="cate-section">
			<u-row gutter="16" style="width: 100%;">
				<u-col span="3" v-for="(homePage,index) in homePageList" :key="index">
					<view class="cate-item" @click="goIcon(homePage)">
						<image :src="homePage.src"></image>
						<text>{{homePage.text}}</text>
					</view>
				</u-col>
			</u-row>
		</view>
		
		<!-- 功能页	-->
		<view class="func-wrapper" style="">
			<view class="func-content" style="">
				<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" style="height: 285px;">
					<swiper-item v-for="(item,index) in goodsShopList" :key="index" v-if="index < 5">
						<view class="swiper-item" @click="navToPage('/pages/activity/hotProd')">
							<text class="swiper-text" style="">今日爆款</text>
							<image class="swiper-image" :src="item.image" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="func-right">
				<view class="func-xpsf" @click="navToPage('/pages/activity/newProd')">
					<image class="func-image" src="http://47.94.106.106:8888/group1/M00/52/E4/rBHxiGEDy4yAPoSpAABQXZsaSGs8552342" mode=""></image>
				</view>
				<view class="func-lqzx" @click="navToPage('/pages/coupon/coupon')">
					<image class="func-image" src="http://47.94.106.106:8888/group1/M00/59/0A/rBHxiGE5pzOAWiEBAAFSOTPcJrk3148751" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- 秒杀楼层 -->
		<view class="seckill-section m-t" v-if="false">
			<view class="s-header">
				<image class="s-img" src="http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKACVDgAAAQ4uuUSmc6218269" mode="widthFix"></image>
				<text class="tip">10点场</text>
				<uni-countdown color="#000" :show-day="false" :hour="hour" :minute="minute" :second="second"></uni-countdown>
				<text v-if="!load" style="font-size: 14px;margin-left: 10px;">正在抢购</text>
				<text v-else style="font-size: 14px;margin-left: 10px;">即将抢购</text>
				<text class="yticon icon-you"></text>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view 
						v-for="(item, index) in goodList" :key="index"
						class="floor-item"
						@click="navToDetailPage(item,'time')"
					>
						<image :src="item.image" mode="aspectFill"></image>
						<view class="t-box">
							<text class="title clamp" style="text-align: center;">{{item.name}}</text>
							<view class="price-box">
								<text class="price">￥{{item.price}}</text>
								<text class="m-price">￥{{item.make_price}}</text> 
							</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 猜你喜欢 -->
		<view class="f-header m-t">
			<view class="tit-box">
				<text class="tit">为你推荐</text>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="guess-section">
			<view 
				v-for="(item, index) in skuData" :key="index"
				class="guess-item"
				@click="navToDetailPage(item)"
				v-if="item.object !== null"
			>
				<view class="image-wrapper" >
					<image style="border: 1px solid #ddd;" :src="item._source.detail_image" mode="aspectFill"></image>
				</view>
				<text class="title clamp2">{{item._source.name}}</text>
				<text style="display: inline-block;">
					<text class="price">￥{{item._source.price}}</text>
					<text style="float:right;color: rgb(144, 147, 153); line-height:60upx;font-size: 28upx;margin-right: 15px;" >销量: {{item._source.sales}}</text>
				</text>
				
			</view>
		</view>
		
		<uni-load-more :status="loadingType"></uni-load-more>
		
		
		<!-- #ifdef H5 -->
		<view @click="goToPage('/pages/appDown/appDown')" style="position: fixed;bottom: 160px;right: 10px;width: 100%;height: 60px;z-index: 1;right: -77%;">
			<image style="width: 100px;height: 60px;" src="http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAdULcAADI0Ra5ka84065892" mode=""></image>
		</view>
		<!-- #endif -->
		
		<view @click="goToPage('/pages/contact/contact')" style="position: fixed;bottom: 112px;z-index: 1;right:15px;width: 88upx;height: 88upx;background-color: rgba(102,102,102,.8);border-radius: 50%;">
			<u-icon name="kefu-ermai" color="rgba(255,255,255,.7)" size="60" style="display: flex;justify-content: center;margin-top: 16upx;"></u-icon>
		</view>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
		
		<!-- #ifdef APP-PLUS -->
		<dowloadApk></dowloadApk>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import dowloadApk from '@/components/dowloadApk/dowloadApk.vue'
	import backTop from '@/components/back-top/back-top.vue'
	// import cmdCurtain from "@/components/cmd-curtain/cmd-curtain.vue"
	export default {
		components:{uniCountdown,uniLoadMore,backTop,dowloadApk}, //cmdCurtain
		data() {
			return {
				show: true,
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [], // 轮播图
				goodsShopList:[], // 今日爆款
				goodsList: [],
				goodList: [],
				homePageList:[],
				skuData:[],
				loadingType: 'more', //加载更多状态
				hour:0, //年
				minute:0, //月
				second:0, // 日
				load:false,
				iconRootPath:"_www/static/images/topIcon", //
				page:1,
				page_size:10,
				ordering:'-create_time',
				img:'http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAXFzEAAHj6am2HcE4375844',
				visible:true,
				backTop: { // 返回顶部
					src: 'http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttDGAXvXbAAAHgIVNqm88710706',
					scrollTop: 0
				},
				version:'', //app版本
				wgtver:"", // wgt把那本
				appver:"", // apk版本
			};
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		onShow() {
			uni.showLoading({
				title:'加载中...'
			})
			this.loadData();
			this.getHotGoods()
			this.getDate();
		},
		onLoad(options){
			console.log(options)
			// #ifdef APP-PLUS
			this.getVersion()
			// #endif
		},
		
		//加载更多
		onReachBottom(){
			this.page_size = this.page_size + 10
			this.getDate(); 
		},
		
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked(e) {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		// 点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			console.log(index)
			if (index === 0) {
				
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			} else if (index === 1) {
				// #ifdef APP-PLUS
				uni.scanCode({
					success: function (res) {
						console.log(res)
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if(res.result.split('://')[0] === 'http' || res.result.split('://')[0] === 'https' || res.result.split('://')[0] === 'HTTPS'|| res.result.split('://')[0] === 'wxp' || res.result.split('.')[0] === 'www'){
							// void plus.runtime.openURL(decodeURIComponent(res.result))
							void plus.runtime.openWeb(res.result,function(e){
								// 识别失败代码
								console.log(res.result)
							})
						}else{
							console.log(res.result)
							uni.navigateTo({
								url: '/pages/index/code?value='+res.result
							})
						}
					}
				})
				// #endif
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		
		methods: {
			loadData() {
				this.getBanner()
				this.gethomePage()
				this.getLimitTime()
				this.getCateChange()
			},
			
			async getHotGoods(){
				await uniRequest({
					url:'/content/index/floor/',
					method:'POST',
					data:{
						key:'index_hwtj'
					}
				})
				.then(res=>{
					console.log(res.data)
					this.goodsShopList = res.data
					uni.hideLoading()
				}).catch(error=>{
					console.log(error)
				})
			},
			
			// 猜你喜欢
			async getDate(type='add', loading){
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){return}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				await uniRequest.post('/goods/new/search/',{text:'',page:this.page,page_size:this.page_size,orderBy:'',sort:''})
				.then(res=>{
					this.skuData = res.data.sku_list
					if(this.skuData.length === 0){
						this.loadingType = 'nomore';
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			
			// 轮播图
			async getBanner(){
				await uniRequest({
					url: '/mobile/banner/',
					method: 'GET',
				}).then(res => {
					console.log(res.data)
					if(res.data.length > 0){
						let carouselList = res.data
						this.titleNViewBackground = carouselList[0].color;
						this.swiperLength = carouselList.length;
						this.carouselList = carouselList;
					}
				}).catch(error => {
					console.log(error) 
					this.$api.msg('提交失败')
				}) 
			},
			
			// 主题ICON
			async gethomePage(){
				let homePageList = await this.$api.json('homePageList');
				this.homePageList = homePageList;
			},
			
			// 分类精选
			async getCateChange(){
				const response = await uniRequest.get('/goods/categories/147/skus/?page='+this.page+'&page_size='+this.page_size+'&ordering='+this.ordering);
				this.goodsList = response.data.results
			},
			
			// 限时秒杀
			async getLimitTime(){
				const res = await uniRequest.get('/goods/limit/time/sku/');
				console.log(res.data)
				if(res.status === 200){
					var data = new Date()
					const Y = data.getFullYear()
					const M = data.getMonth()+1
					const D = data.getDate() < 10 ? '0'+data.getDate() : data.getDate()
					const h = data.getHours() < 10 ? '0'+data.getHours() : data.getHours()
					const m = data.getMinutes() < 10 ? '0'+data.getMinutes() : data.getMinutes()
					const s = data.getSeconds() < 10 ? '0'+data.getSeconds() : data.getSeconds()
					const Day = Y+'-'+M+'-'+D+' '+h+':'+m+':'+s
					// console.log(res.data[0].now_time,Day)
					// if(res.data[0].satrt_time === Day){
					// 	console.log('111')
					// 	const res = await uniRequest.get('/goods/limit/time/sku/');
					// 	console.log(res.data[0])
					// 	this.goodList = res.data[0].skus
					// 	console.log(this.goodList)
					// 	this.load = false
					// 	this.hour = +res.data[0].start_time.split(' ')[1] - h
					// 	this.minute = 59 - m
					// 	this.second = 60 - s
					// }else if(res.data[0].satrt_time !== Day){
					// 	const res = await uniRequest.get('/goods/limit/time/sku/');
					// 	console.log(res.data)
					// 	if(res.data[0].skus.length > 0){
					// 		this.goodList = res.data[0].skus
					// 	}else{
					// 		this.goodList = res.data[0].skus
					// 	}
					// 	this.load = true
					// 	this.hour = 23 - h + +res.data.next.start_time.split(' ')[1]
					// 	this.minute = 59 - m
					// 	this.second = 60 - s
					// }
				}
			},
			
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].color;
			},
			
			// 跳转详情页
			goToPage(url){
				uni.navigateTo({
					url:url
				})
			},
			
			// 跳转分类
			toCategory(){
				uni.switchTab({
				      url: '/pages/category/category'
				})
			},
			
			// 跳转主题页
			goIcon(value){
				console.log(value.index)
				if(value.index === 0){
					uni.navigateTo({
						url:'/pages/index/subject/zfcg/zfcg'
					})
				}else if(value.index === 1){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/jdcg/jdcg'
					})
				}else if(value.index === 2){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/hzhb/hzhb'
					})
				}else if(value.index === 3){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/lpdz/lpdz'
					})
				}else if(value.index === 4){
					uni.navigateTo({
						url:'/pages/index/subject/wxfw/wxfw'
					})
				}else if(value.index === 5){
					uni.navigateTo({
						url:'/pages/index/subject/cjcg/cjcg'
					})
				}else if(value.index === 6){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/jypx/jypx'
					})
				}else if(value.index === 7){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/ylqx/ylqx'
					})
					
				}else if(value.index === 8){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/cqtg/cqtg'
					})
					
				}else if(value.index === 9){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/flzx/flzx'
					})
				}
			},
			
			navToPage(url){
				uni.navigateTo({
					url
				})
			},
			
			// 跳转详情页
			navToDetailPage(item,value) {
				console.log(item,value)
				//测试数据没有写id，用title代替
				if(item._source === undefined){
				    let id = item.id;
					uni.navigateTo({
						url: `/pages/product/product?id=`+id+'&value='+value
					})
				}else{
					let id = item._source.id;
					uni.navigateTo({
						url: `/pages/product/product?id=`+id+'&value='+value
					})
				}
			},
			
			getVersion(){
				this.appver = plus.runtime.version;
				plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
					console.log(wgtinfo)
					this.wgtver =  wgtinfo.version
				});
				uni.getSystemInfo({
					success:(res) => {
						console.log(res.platform);  
						//检测当前平台，如果是安卓则启动安卓更新  
						if(res.platform=="android"){  
							// this.AndroidCheckUpdate();  
							this.checkVersionClick()
						}else{ //苹果ios
							console.log('该系统是ios系统')
						}  
					}  
				})
			},
			
			// 获取版本信息
			async checkVersionClick(){ 
				// __UNI__8601E36/uni.UNI18D6
				const appveres = await uniRequest.post('/mobile/check/app/version/',{appid:'__UNI__8601E36',version:this.appver})
				console.log(appveres.data,this.appver,this.wgtver)
				if(this.appver !== '' && appveres.data.max_version>this.appver){
					this.startUpDate()
				}else{
					const wgtveres = await uniRequest.post('/mobile/check/wgt/version/',{appid:'__UNI__8601E36',version:this.wgtver})
					console.log(wgtveres.data,this.wgtver)
					if(this.wgtver !== '' && wgtveres.data.max_version>this.wgtver){
						this.startWgt()
					}
				}
			},
			
			//开始app整包升级
			startUpDate:function(){
				//app版本号获取方式
				//plus.runtime.version; 与服务器的版本进行比较;
				let topIconPath=plus.io.convertLocalFileSystemURL(this.iconRootPath)+"/top_1.png";
				const upDater=uni.requireNativePlugin("CL-UpDater");
				let options={
					title:"有新版本更新，请点击升级",
					con:"1、更新了一些内容",
					downUrl:"http://47.94.106.106:8000/mobile/download/apk",//提示android端需设置apk下载地址,ios只需设置苹果商店app地址;
					hidCancelbtn:false,
					btnBgColor:"#EE1D23",
					// topImgBg:topIconPath//除非需要自定义头部logo，否则不需要传;
				}
				//必需提供下载地址;
				upDater.startUpdate(options);
			},	
			
			//wgt升级方式;
			startWgt:function(){
				//注意：服务器的热更新版本号必需大于本地wgt版本号
				//http://192.168.50.201/update.wgt,
				let topIconPath=plus.io.convertLocalFileSystemURL(this.iconRootPath)+"/top_5.png";
				console.log(topIconPath)
				//第一步要获取本地的wgt版本号；
				const upDater=uni.requireNativePlugin("CL-UpDater");
				let options={
					title:"有小版本更新，请点击升级",
					con:"1、更新了一些内容",
					downUrl:"http://47.94.106.106:8000/mobile/download/wgt",
					hidCancelbtn:false,
					btnBgColor:"#0354a7",
					topImgBg:topIconPath//除非需要自定义头部logo，否则不需要传;
				}
				
				//第一步创建文件下载路径，并创建文件;
				plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS,function(fobject){
					console.log(fobject)
					//设置文件下载根路径;	
					let rootPath=fobject.root.fullPath;
					console.log(options,rootPath)
					upDater.wgtUpdate(options,rootPath,result=>{
						console.log(result)
						if(result)
						{
							var pathNew = plus.io.convertAbsoluteFileSystem(result);
							console.log(pathNew);
							plus.runtime.install(pathNew, {
								force: false
							}, function() {
								//进行重新启动;
								plus.runtime.restart();
							}, (e) => {
								uni.showToast({
									title: '安装升级包失败'+JSON.stringify(e),
									icon: 'none'
								})								
							});
						}
					});
				})
			},
			
			// 更新提示
			async AndroidCheckUpdate(){  
				const sendData = {
					appid:'__UNI__8601E36',
					version:this.version,
				};
				const res = await uniRequest.post('/mobile/check/app/version/',sendData)
				console.log(res,this.version)
				if(this.version !== '' && res.data.max_version>this.version){
					if(plus.networkinfo.getCurrentType()!=3){
						uni.showModal({ 
							title: '新版本更新',
							content: `有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，点击下载完成后将自动弹出安装程序。`,
							confirmText:'立即更新',
							cancelText:'稍后进行',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									dtask.start();
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}else{
						var dtask = plus.downloader.createDownload( "http://47.94.106.106:8000/mobile/download/apk", {}, function ( d, status ) {
							// 下载完成  
							if ( status == 200 ) {   
								plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},{},function(error){  
									uni.showToast({  
										title: '安装失败',  
										mask: false,  
										duration: 1500  
									});  
								})  
							} else {  
								 uni.showToast({  
									title: '更新失败',  
									mask: false,  
									duration: 1500  
								 });  
							}    
						});  
						uni.showModal({
							title: '发现新版本',
							content: `有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序。`,
							confirmText:'立即更新',
							cancelText:'稍后进行',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									dtask.start();  
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						}); 
					}
				}
			}, 
		},
		
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			left: 0;
			transition: .4s;
			position: absolute;
			/* #ifdef APP-PLUS */
			top: -165px;
			height: 700upx;
			/* #endif */
			/* #ifdef H5 */
			top: -180px;
			height: 700upx;
			/* #endif */
			right: 0;
			transform: scale(1);
			background:linear-gradient(to bottom,#EE1D23 70%,#ffffff 100%);
			background-size: cover;
			background-position: 50%;
		}
	}
	.carousel {
		width: 100%;
		height: 300upx;
		margin-top: 10px;
		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		right: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx 0 22upx; 
		
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			margin:10px 0;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 125upx;
			height: 125upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			// box-shadow: 2upx 2upx 2upx rgba(250, 67, 106, 0.3);
		}
	}
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 0 0 10upx 0;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
		}
	}
	/* 功能专区 */
	.func-wrapper{
		width: 100%;
		height: 285px;
		padding: 0 28rpx;
		margin-top: 40rpx;
		
		.func-content{
			width: 48%;
			height: 285px;
			float: left;
			.swiper-item{
				.swiper-text{
					position: fixed;
					color: #fff;
					width: 100%;
					height: 100%;
					background: linear-gradient(-180deg, rgba(3, 0, 0, 0.2), rgba(0, 0, 0, 0));
					text-align: center;
					line-height: 54px;
					z-index: 2;
					font-size: 18px;
					border-radius: 15px;
				}
				.swiper-image{
					width: 100%;
					height: 285px;
				}
			}
		}
		.func-right{
			width: 48%;
			height: 100%;
			float: right;
			.func-xpsf{
				width: 100%;
				height: 48%;
				.func-image{
					width: 100%;
					height: 100%;
				}
			}
			.func-lqzx{
				width: 100%;
				height: 48%;
				margin-top: 26rpx;
				.func-image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	/* 秒杀专区 */
	.seckill-section{
		padding: 4upx 30upx 24upx;
		.s-header{
			display:flex;
			align-items:center;
			height: 92upx;
			line-height: 1;
			.s-img{
				width: 140upx;
				height: 30upx;
			}
			.tip{
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}
			.timer{
				display:inline-block;
				width: 40upx;
				height: 36upx;
				text-align:center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0,0,0,.8);
			}
			.icon-you{
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
			.m-price{
				font-size: $font-sm+2upx;
				text-decoration: line-through;
				color: $font-color-light;
				margin-left: 8upx;
			}
		}
	}
	
	.f-header{
		display:flex;
		align-items:center;
		height: 80upx;
		margin: 20upx 30upx;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: 32upx;
			color: #333333;
			font-weight: bold;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	/* 团购楼层 */
	.group-section{
		.g-swiper{
			height: 650upx;
			padding-bottom: 30upx;
		}
		.g-swiper-item{
			width: 100%;
			padding: 0 30upx;
			display:flex;
		}
		image{
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}
		.g-item{
			display:flex;
			flex-direction: column;
			overflow:hidden;
		}
		.left{
			flex: 1.2;
			margin-right: 24upx;
			.t-box{
				padding-top: 20upx;
			}
		}
		.right{
			flex: 0.8;
			flex-direction: column-reverse;
			.t-box{
				padding-bottom: 20upx;
			}
		}
		.t-box{
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}
		.price{
			color:$uni-color-primary;
		}
		.m-price{
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}
		.pro-box{
			display:flex;
			align-items:center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}
		.progress-box{
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}
	/* 分类推荐楼层 */
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
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
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			
			margin-bottom: 40upx;
			background: #FFFFFF;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: 28upx;
			color: #333333;
			padding: 10px;
			height: 50px;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 60upx;
			padding-left: 10px;
		}
	}
</style>