<template>
</template>

<script>
	export default {
		data() {
			return {
				version:'', //app版本
				wgtver:"", // wgt把那本
				appver:"", // apk版本
			}
		},
		onLoad(options){
			// console.log(options)
			// #ifdef APP-PLUS
			this.getVersion()
			// #endif
		},
		methods:{
			getVersion(){
				this.appver = plus.runtime.version;
				plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
					// console.log(wgtinfo)
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
				
				// console.log(appveres.data,this.appver,this.wgtver)
				if(this.appver !== '' && appveres.data.max_version > this.appver){
					this.startUpDate()
				}else{
					const wgtver = {
						appid:'__UNI__8601E36',
						version:this.wgtver,
					};
					const wgtveres = await uniRequest.post('/mobile/check/wgt/version/',wgtver)
					// console.log(wgtveres.data,this.wgtver)
					if(wgtveres.data.status){
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
					topImgBg:topIconPath//除非需要自定义头部logo，否则不需要传;
				}
				//必需提供下载地址;
				upDater.startUpdate(options);
			},	
			
			//wgt升级方式;
			startWgt:function(){
				//注意：服务器的热更新版本号必需大于本地wgt版本号
				//http://192.168.50.201/update.wgt,
				let topIconPath=plus.io.convertLocalFileSystemURL(this.iconRootPath)+"/top_5.png";
				// console.log(topIconPath)
				let that=this;
				//第一步要获取本地的wgt版本号；
				const upDater=uni.requireNativePlugin("CL-UpDater");
				let options={
					title:"有小版本更新，请点击升级",
					con:"1、更新了一些内容",
					downUrl:"http://47.94.106.106:8000/mobile/download/wgt",
					hidCancelbtn:false,
					btnBgColor:"#EE1D23",
					topImgBg:topIconPath//除非需要自定义头部logo，否则不需要传;
				}
				
				//第一步创建文件下载路径，并创建文件;
				plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS,function(fobject){
					// console.log(fobject)
					//设置文件下载根路径;	
					let rootPath=fobject.root.fullPath;
					console.log(options,rootPath)
					upDater.wgtUpdate(options,rootPath,result=>{
						// console.log(result)
						if(result)
						{
							var pathNew = plus.io.convertAbsoluteFileSystem(result);
							// console.log(pathNew);
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
				// console.log(res,this.version)
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
		}
	}
</script>

<style>
</style>
