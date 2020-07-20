<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import uniRequest from 'uni-request'
	import {
		mapMutations
	} from 'vuex';
	export default {
		data(){
			return{
				version:'',
			}
		},
		methods: {
			...mapMutations(['login']),
			async AndroidCheckUpdate(){
				const sendData = {
					appid:'__UNI__8601E36',
					version:this.version,
				}; 
				const res = await uniRequest.post('/mobile/check/app/version/',sendData)
				console.log(res.data,this.version)
				if(this.version !== '' && res.data.max_version>this.version){
					if(plus.networkinfo.getCurrentType()!=3){
						uni.showModal({  //提醒用户更新
							title: '更新提示',
							content: '有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新。',
							
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
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
							title: '更新提示',
							content: '有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序',
							confirmText:'确认下载',
							icon:'none',
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
				}/* else{
					uni.showToast({
						title:'已是最新版本'
					})
				} */
			}
		},
		onLaunch: async function() {
			let userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo.user_id){
				//更新登陆状态
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data);
					}
				});
			}
			//#ifdef APP-PLUS  
			//升级检测数据 
			/* plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				console.log(wgtinfo.version)
				this.version =  wgtinfo.version
			});
			uni.getSystemInfo({
				success:(res) => {  
					console.log(res.platform);
					//检测当前平台，如果是安卓则启动安卓更新  
					if(res.platform=="android"){  
						this.AndroidCheckUpdate();  
					}  
				}  
			}) */
			//#endif  
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang='scss'>
	/*
		全局公共样式和字体图标
	*/
   /*每个页面公共css */
   
   @import "colorui/main.css";
   @import "colorui/icon.css";
   @import "uview-ui/index.scss";
   @import "static/css/index-app.css";
   @import "static/iconfont/font.scss";
   /*每个页面公共css */
   page{
   	background: #FCFCFC;
   }
   .defaultFontSize{
   	font-size: 3vw;
   }
   .itemStyle{
   	margin: 2vw 3vw;
   	padding: 2vw 3vw;
   	display: flex;
   	flex-direction: row;
   	justify-content: space-between;
   	align-items: center;
   	background-color: #FFF;
   	border-radius: 4px;
   	color: #666;
   	font-size: 4vw;
   }
   .active:active {
   	background-color: #F2F2F2;
   }
   
   
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1211716_vq8z14fq8ld.ttf') format('truetype');
	}

	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.icon-gerenziliao:before {
		content: "\e644";
	}
	
	.icon-daipingjia:before {
		content: "\e998";
	}
	
	.icon-iphone:before {
		content: "\e68a";
	}
	
	.icon-android:before {
		content: "\f161";
	}
	
	.icon-mima:before {
		content: "\e651";
	}

	.icon-yiguoqi1:before {
		content: "\e700";
	}

	.icon-iconfontshanchu1:before {
		content: "\e619";
	}

	.icon-iconfontweixin:before {
		content: "\e611";
	}

	.icon-alipay:before {
		content: "\e636";
	}

	.icon-shang:before {
		content: "\e624";
	}

	.icon-shouye:before {
		content: "\e626";
	}

	.icon-shanchu4:before {
		content: "\e622";
	}

	.icon-xiaoxi:before {
		content: "\e618";
	}

	.icon-jiantour-copy:before {
		content: "\e600";
	}

	.icon-fenxiang2:before {
		content: "\e61e";
	}
	
	.icon-login:before {
		content: "\e64e";
	}

	.icon-pingjia:before {
		content: "\e67b";
	}

	.icon-daifukuan:before {
		content: "\e68f";
	}

	.icon-pinglun-copy:before {
		content: "\e612";
	}

	.icon-dianhua-copy:before {
		content: "\e621";
	}

	.icon-shoucang:before {
		content: "\e645";
	}

	.icon-xuanzhong2:before {
		content: "\e62f";
	}

	.icon-gouwuche_:before {
		content: "\e630";
	}

	.icon-icon-test:before {
		content: "\e60c";
	}

	.icon-icon-test1:before {
		content: "\e632";
	}

	.icon-bianji:before {
		content: "\e646";
	}

	.icon-jiazailoading-A:before {
		content: "\e8fc";
	}

	.icon-zuoshang:before {
		content: "\e613";
	}

	.icon-jia2:before {
		content: "\e60a";
	}

	.icon-huifu:before {
		content: "\e68b";
	}

	.icon-sousuo:before {
		content: "\e7ce";
	}

	.icon-arrow-fine-up:before {
		content: "\e601";
	}

	.icon-hot:before {
		content: "\e60e";
	}

	.icon-lishijilu:before {
		content: "\e6b9";
	}

	.icon-zhengxinchaxun-zhifubaoceping-:before {
		content: "\e616";
	}

	.icon-naozhong:before {
		content: "\e64a";
	}

	.icon-xiatubiao--copy:before {
		content: "\e608";
	}

	.icon-shoucang_xuanzhongzhuangtai:before {
		content: "\e6a9";
	}

	.icon-jia1:before {
		content: "\e61c";
	}

	.icon-bangzhu1:before {
		content: "\e63d";
	}

	.icon-arrow-left-bottom:before {
		content: "\e602";
	}

	.icon-arrow-right-bottom:before {
		content: "\e603";
	}

	.icon-arrow-left-top:before {
		content: "\e604";
	}

	.icon-icon--:before {
		content: "\e744";
	}

	.icon-zuojiantou-up:before {
		content: "\e605";
	}

	.icon-xia:before {
		content: "\e62d";
	}

	.icon--jianhao:before {
		content: "\e60b";
	}

	.icon-weixinzhifu:before {
		content: "\e61a";
	}

	.icon-comment:before {
		content: "\e64f";
	}

	.icon-weixin:before {
		content: "\e61f";
	}

	.icon-fenlei1:before {
		content: "\e620";
	}

	.icon-erjiye-yucunkuan:before {
		content: "\e623";
	}

	.icon-Group-:before {
		content: "\e688";
	}

	.icon-you:before {
		content: "\e606";
	}

	.icon-forward:before {
		content: "\e607";
	}

	.icon-tuijian:before {
		content: "\e610";
	}

	.icon-bangzhu:before {
		content: "\e679";
	}

	.icon-share:before {
		content: "\e656";
	}

	.icon-yiguoqi:before {
		content: "\e997";
	}

	.icon-shezhi1:before {
		content: "\e61d";
	}

	.icon-fork:before {
		content: "\e61b";
	}

	.icon-kafei:before {
		content: "\e66a";
	}

	.icon-iLinkapp-:before {
		content: "\e654";
	}

	.icon-saomiao:before {
		content: "\e60d";
	}

	.icon-shezhi:before {
		content: "\e60f";
	}

	.icon-shouhoutuikuan:before {
		content: "\e631";
	}

	.icon-gouwuche:before {
		content: "\e609";
	}

	.icon-dizhi:before {
		content: "\e614";
	}

	.icon-fenlei:before {
		content: "\e706";
	}

	.icon-xingxing:before {
		content: "\e70b";
	}

	.icon-tuandui:before {
		content: "\e633";
	}

	.icon-zuanshi:before {
		content: "\e615";
	}

	.icon-zuo:before {
		content: "\e63c";
	}

	.icon-shoucang2:before {
		content: "\e62e";
	}

	.icon-shouhuodizhi:before {
		content: "\e712";
	}

	.icon-yishouhuo:before {
		content: "\e71a";
	}

	.icon-dianzan-ash:before {
		content: "\e617";
	}
	
	.icon-huangguan:before {
		content: "\e681";
	}
	
	.icon-daifahuo:before {
		content: "\e6c2";
	}
	
	.icon-zhuangzhang:before {
		content: "\e62a";
	}
	
	.icon-zhipiao:before {
		content: "\e689";
	}
	
	.icon-huodaofukuan:before {
		content: "\e6bf";
	}
	
	.icon-fapiao:before{
		content: '\e62b';
	}
	
	.icon-look:before{
		content: '\e639';
	}
	
	.icon-nolook:before{
		content: '\e634';
	}
	
	.icon-shopsIdea:before{
		content: '\e63a';
	}

	.icon-zhangqi:before{
		content: '\e63f';
	}
	
	.icon-xianjin:before{
		content: '\e63e';
	}
	
	.icon-gongwuka:before{
		content: '\e6da';
	}
	
	.icon-zhaunzhang:before{
		content: '\e63b';
	}
	
	.icon-zhaunzhang:before{
		content: '\e63b';
	}
	
	.icon-zhipiao:before{
		content: '\e689';
	}
	
	.icon-youhuiquan:before{
		content: '\e65a';
	}


	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}
	
	/* #ifdef H5 */
	uni-rich-text img{max-width: 100%!important;}
	/* #endif */

	uni-button[type=default],
	button[type=default] {
		color: $font-color-dark;
	}

	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}
</style>
