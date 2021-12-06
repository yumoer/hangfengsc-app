<template>
	<view class="container">
		<view style="width: 100%;text-align: center;margin: 30upx 0;">
			<image style="width: 120upx;height: 120upx;border-radius: 30upx;" src="http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAevEJAAAhcJPC-HI2020514" mode=""></image>
			<view style="font-size: 30upx;text-align: center;">行丰商城 v{{appver}}</view>
		</view>
		<!-- @click="navTo('/pages/set/verBody')" -->
		<view class="list-cell b-b m-t"  @click="updateVersion"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">检查更新</text>点击查询
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/set/service')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">服务协议</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/set/privacy')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">隐私保护政策</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	import {  
	    mapMutations  
	} from 'vuex';
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				wgtver:"",
				appver:"",
				iconRootPath:"_www/static/images/topIcon",
			};
		},
		onLoad(){
			// #ifdef APP-PLUS
			var that = this
			plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				that.wgtver =  wgtinfo.version
				console.log(that.wgtver)
			});
			that.appver = plus.runtime.version;
			console.log(that.appver)
			// #endif
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			
			async updateVersion(){
				console.log(this.wgtver,this.appver)
				var that = this
				// 获取版本信息
				const appver = {
					appid:'__UNI__8601E36',
					version:that.appver,
				};
				const appveres = await uniRequest.post('/mobile/check/app/version/',appver)
				console.log(appveres.data,that.appver)
				if(that.appver !== '' && appveres.data.max_version>that.appver){
					that.startUpDate()
				}
				
				const wgtver = {
					appid:'__UNI__8601E36',
					version:that.wgtver,
				};
				const wgtveres = await uniRequest.post('/mobile/check/wgt/version/',wgtver)
				console.log(wgtveres.data,that.wgtver)
				if(that.wgtver !== '' && wgtveres.data.max_version>that.wgtver){
					that.startWgt()
				}
				
				if(appveres.data.max_version === that.appver && wgtveres.data.max_version === that.wgtver){
					that.$api.msg('已是最新版本')
				}
			},
			
			//开始app整包升级
			startUpDate:function(){
				//app版本号获取方式
				//plus.runtime.version; 与服务器的版本进行比较;
				const upDater=uni.requireNativePlugin("CL-UpDater");
				let options={
					title:"有新版本更新，请点击升级",
					con:"1、更新了一些内容",
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
					con:"1、更新了一些内容",
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
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
