<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		<!-- #endif -->
		
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="carousel" circular autoplay @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="into(item)">
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
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" v-for="(homePage,index) in homePageList" :key=index @click="goIcon(homePage)">
				<image :src="homePage.src"></image>
				<text>{{homePage.text}}</text>
			</view>
		</view>
		
		
		
		<!-- 秒杀楼层 -->
		<view class="seckill-section m-t" v-if="goodList.length > 0">
			
			<view class="s-header">
				<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
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
								<text class="m-price">￥{{item.old_price}}</text> 
							</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 团购楼层 -->
		<!-- <view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">精品团购</text>
				<text class="tit2">Boutique Group Buying</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="group-section">
			<swiper class="g-swiper" :duration="500">
				<swiper-item
					class="g-swiper-item"
					v-for="(item, index) in goodsList" :key="index"
					v-if="index%2 === 0"
					@click="navToDetailPage(item)"
				>
					<view class="g-item left">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="t-box">
							<text class="title clamp">{{item.title}}</text>
							<view class="price-box">
								<text class="price">￥{{item.price}}</text> 
								<text class="m-price">￥188</text> 
							</view>
							
							<view class="pro-box">
							  	<view class="progress-box">
							  		<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
							  	</view>
								<text>6人成团</text>
							</view>
						</view>
						            
					</view>
					<view class="g-item right">
						<image :src="goodsList[index+1].image" mode="aspectFill"></image>
						<view class="t-box">
							<text class="title clamp">{{goodsList[index+1].title}}</text>
							<view class="price-box">
								<text class="price">￥{{goodsList[index+1].price}}</text> 
								<text class="m-price">￥188</text> 
							</view>
							<view class="pro-box">
							  	<view class="progress-box">
							  		<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
							  	</view>
								<text>10人成团</text>
							</view>
						</view>
					</view>
				</swiper-item>

			</swiper>
		</view> -->
		
		
		
		
		<!-- 分类推荐楼层 -->
		<view class="f-header m-t" @click="toCategory">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">分类精选</text>
				<text class="tit2">Classified selection</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="hot-floor">
			<view class="floor-img-box">
				<image class="floor-img" src="/static/img/3.jpg" mode="scaleToFill"></image>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view 
						v-for="(item, index) in goodsList" :key="index"
						v-if="index < 10"
						class="floor-item"
						@click="navToDetailPage(item)"
					>
						<image :src="item.default_image_url" mode="aspectFill"></image>
						<!-- #ifdef H5 -->
						<text style="text-align: center;" class="title clamp">{{item.name}}</text>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<text style="text-align: center;font-size: 30upx;color: #000;" class="title clamp">{{item.name}}</text>
						<!-- #endif -->
						<text class="price">￥{{item.price}}</text>
					</view>
					<view class="more" @click="toCategory">
						<text>查看全部</text>
						<text>More+</text>
					</view>
				</view>
			</scroll-view>
		</view>
		 

		<!-- 猜你喜欢 -->
		<view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">猜你喜欢</text>
				<text class="tit2">Guess You Like It</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		
		<view class="guess-section">
			<view 
				v-for="(item, index) in skus" :key="index"
				class="guess-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper" >
					<image style="border: 1px solid #ddd;" :src="item.object.default_image_url" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.object.name}}</text>
				<text style="display: inline-block;">
					<text class="price">￥{{item.object.price}}</text>
					<!-- <text style="float:right;color: rgb(144, 147, 153); line-height:60upx;font-size: 28upx;" >库存: {{item.object.stock}}</text> -->
				</text>
				
			</view>
		</view>
		
		<uni-load-more :status="loadingType"></uni-load-more>
		
		
		<!-- #ifdef H5 -->
		<view @click="navTo('/pages/appDown/appDown')" style="position: fixed;bottom: 160px;right: 10px;width: 100%;height: 60px;z-index: 1;right: -77%;">
			<image style="width: 100px;height: 60px;" src="/static/tag.png" mode=""></image>
		</view>
		<!-- #endif -->
		
		<!-- <view v-if="" @click="navTo('/pages/coupon/coupon')" style="position: fixed;bottom: 95px;right: 5px;width: 100%;height: 60px;z-index: 1;right: -85%;">
			<image style="width: 40px;height: 40px;" src="/static/index/coupon.png" mode=""></image>
		</view> -->
		
		<view class="">
			<cmdCurtain :visible="visible" mode="top-right">
			  <image mode="aspectFit" :src="img"></image>
			</cmdCurtain>
			<cmdCurtain :visible="visible" mode="top-let">
			  <image mode="aspectFit" :src="img"></image>
			</cmdCurtain>
			<cmdCurtain :visible="visible" mode="top">
			  <image mode="aspectFit" :src="img"></image>
			</cmdCurtain>
		</view>
		
		<backTop :src="backTop.src"  :scrollTop="backTop.scrollTop"></backTop>
	</view>
	
</template>

<script>
	import uniRequest from 'uni-request'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import yomolUpgrade from '@/components/yomol-upgrade/yomol-upgrade.vue'
	import backTop from '@/components/back-top/back-top.vue'
	import cmdCurtain from "@/components/cmd-curtain/cmd-curtain.vue"
	export default {
		components:{uniCountdown,uniLoadMore,yomolUpgrade,backTop,cmdCurtain},
		data() {
			return {
				show: true,
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				goodList:[],
				homePageList:[],
				skus:[],
				loadingType: 'more', //加载更多状态
				hour:0,
				minute:0,
				second:0,
				load:false,
				page:1,
				version:'',
				wgtver:"",
				appver:"",
				iconRootPath:"_www/static/static",
				page_size:10,
				ordering:'create_time',
				img:'../../static/app.png',
				visible:true,
				
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				scrollTop: 0
			};
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		onLoad(){
			this.loadData();
			this.getDate();
			// #ifdef APP-PLUS
			let that=this;
			plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				console.log(wgtinfo)
				that.wgtver =  wgtinfo.version
			});
			that.appver = plus.runtime.version;
			console.log(that.appver,that.wgtver)
			uni.getSystemInfo({
				success:(res) => {
					console.log(res.platform);  
					//检测当前平台，如果是安卓则启动安卓更新  
					if(res.platform=="android"){  
						// this.AndroidCheckUpdate();  
						that.checkVersionClick()
					}  
				}  
			})
			// #endif
		},
		
		//加载更多
		onReachBottom(){
			this.page_size = this.page_size + 10
			this.getDate(); 
		},
		
		methods: {
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			// 监听显示状态
			close(val) {
				console.log(val)
				this.visible = val;
			},
			
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
			async checkVersionClick(){  // https://ext.dcloud.net.cn/plugin?id=543
				 // 获取版本信息
				const appver = {
					appid:'__UNI__8601E36',
					version:this.appver,
				};
				const appveres = await uniRequest.post('/mobile/check/app/version/',appver)
				console.log(appveres.data,this.appver)
				if(this.appver !== '' && appveres.data.max_version>this.appver){
					this.startUpDate()
				}
				
				const wgtver = {
					appid:'__UNI__8601E36',
					version:this.wgtver,
				};
				const wgtveres = await uniRequest.post('/mobile/check/wgt/version/',wgtver)
				console.log(wgtveres.data,this.wgtver)
				if(this.wgtver !== '' && wgtveres.data.max_version>this.wgtver){
					this.startWgt()
				}
			},
			
			//开始app整包升级
			startUpDate:function(){
				//app版本号获取方式
				//plus.runtime.version; 与服务器的版本进行比较;
				const upDater=uni.requireNativePlugin("CL-UpDater");
				let options={
					title:"有新版本更新，请点击升级",
					con:"1、新增我的收藏功能;\r\n2、新增banner管理;\r\n3、版本升级提示更新;",
					downUrl:"http://47.94.106.106:8000/mobile/download/apk",//提示android端需设置apk下载地址,ios只需设置苹果商店app地址;
					hidCancelbtn:false,
					btnBgColor:"#ff3300"
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
				let that=this;
				//第一步要获取本地的wgt版本号；
				const upDater=uni.requireNativePlugin("CL-UpDater");
				let options={
					title:"有小版本更新，请点击升级",
					con:"1、新增我的收藏功能;\r\n2、新增banner管理;\r\n3、版本升级提示更新",
					downUrl:"http://47.94.106.106:8000/mobile/download/wgt",
					hidCancelbtn:false,
					btnBgColor:"#ffaa00",
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
			
			async getDate(type='add', loading){
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				try {
					const response = await uniRequest.get('/skus/search/?text=&page='+this.page+'&page_size='+this.page_size);
					// console.log(response);
					this.skus = response.data.results
					if(this.skus.length === 0){
						this.loadingType = 'nomore';
					}
				} catch (error) {
					console.error(error);
				}
			},
			async loadData() {
				let homePageList = await this.$api.json('homePageList');
				this.homePageList = homePageList;
				
				const res = await uniRequest.get('/goods/limit/time/sku/');
				// console.log(res)
				if(res.status === 200){
					var data = new Date()
					const Y = data.getFullYear()
					const M = data.getMonth()+1
					const D = data.getDate() < 10 ? '0'+data.getDate() : data.getDate()
					const h = data.getHours() < 10 ? '0'+data.getHours() : data.getHours()
					const m = data.getMinutes()
					const s = data.getSeconds()
					const Day = Y+'-'+M+'-'+D+' '+h
					// console.log(Day)
					// console.log(res.data.active.start_time)
					if(res.data.active.start_time === Day){
						const res = await uniRequest.get('/goods/limit/time/sku/');
						// console.log(res)
						this.goodList = res.data.active.data
						this.load = false
						this.hour = +res.data.active.start_time.split(' ')[1] - h
						this.minute = 59 - m
						this.second = 60 - s
					}else if(res.data.active.start_time !== Day){
						const res = await uniRequest.get('/goods/limit/time/sku/');
						if(res.data.active.data.length > 0){
							this.goodList = res.data.active.data
						}else{
							this.goodList = res.data.next.data
						}
						this.load = true
						this.hour = 23 - h + +res.data.next.start_time.split(' ')[1]
						this.minute = 59 - m
						this.second = 60 - s
					}
				}
				
				uniRequest({
					url: '/mobile/banner/',
					method: 'GET',
				}).then(res => {
					console.log(res)
					let carouselList = res.data
					this.titleNViewBackground = carouselList[0].color;
					this.swiperLength = carouselList.length;
					this.carouselList = carouselList;
				}).catch(error => {
					console.log(error) 
					this.$api.msg('提交失败')
				}) 
				
				const response = await uniRequest.get('/categories/74/skus/?page='+this.page+'&page_size='+this.page_size+'&ordering='+this.ordering);
				this.goodsList = response.data.results
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].color;
			},
			
			into(item){
				uni.navigateTo({
					url:item.url
				})
			},
			toCategory(){
				uni.switchTab({
				      url: '/pages/category/category'
				})
			},
			
			goIcon(value){
				console.log(value.index)
				if(value.index === 0){
					uni.navigateTo({
						url:'/pages/index/subject/zfcg/zfcg'
					})
				}else if(value.index === 1){
					this.$api.msg('暂未开发')
					/* uni.navigateTo({
						url:'/pages/index/subject/jdcg/jdcg'
					}) */
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
						url:'/pages/index/subject/gyhf/gyhf'
					})
				}else if(value.index === 7){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/zprc/zprc'
					})
				}else if(value.index === 8){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/bghc/bghc'
					})
				}else if(value.index === 9){
					// this.$api.msg('暂未开发')
					uni.navigateTo({
						url:'/pages/index/subject/bgsb/bgsb'
					})
				}
			},
			
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			
			//详情页
			navToDetailPage(item,value) {
				console.log(item,value)
				//测试数据没有写id，用title代替
				if(item.object === undefined){
				    let id = item.id;
					uni.navigateTo({
						url: `/pages/product/product?id=`+id+'&value='+value
					})
				}else{
					let id = item.object.id;
					uni.navigateTo({
						url: `/pages/product/product?id=`+id+'&value='+value
					})
				}
			},
		},
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked(e) {
			uni.switchTab({
				url: '/pages/search/search'
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			// console.lgggog(e)
			
			const index = e.index;
			if (index === 0) {
				/* uni.navigateTo({
					url: '/pages/notice/notice'
				}) */
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
			} else if (index === 1) {
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
		}
	}
</script>

<style lang="scss">
	/* #ifdef MP */
	.mp-search-box{
		position:absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;
		.ser-input{
			flex:1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 20px;
			background: rgba(255,255,255,.6);
		}
	}
	page{
		position:relative;
		.cate-section{
			position:relative;
			z-index:4;
			border-radius:16upx 16upx 0 0;
			margin-top:-20upx;
		}
		.carousel-section{
			padding: 0;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:40upx;
				bottom:40upx;
			}
		}
	}
	/* #endif */
	
	
	page {
		background: #f5f5f5;
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
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
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
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx 0 22upx; 
		background: #fff;
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
			width: 120upx;
			height: 120upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
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
	/* 秒杀专区 */
	.seckill-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
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
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
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
			font-size: $font-lg +2upx;
			color: #font-color-dark;
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
		background: #fff;
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
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
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
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	

</style>



<!-- <template>
	<view class="content">
		<view class="list">
			11111111
		</view>
		<backTop :src="backTop.src"  :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>

<script>
	import backTop from '@/components/back-top/back-top.vue';
	export default {
		data() {
			return {
				backTop: {
					src: '../../static/back-top/top.png',
					scrollTop: 0
				},
				scrollTop: 0
			}
		},
		components: {
			backTop
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.list{
		height: 3000upx;
	}
</style> -->
