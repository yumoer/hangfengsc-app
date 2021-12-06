<template>
	<view class="container">
		<view style="width: 100%;">
			<view style="width: 30%;float: left;">
				<image style="width: 120upx;height: 120upx;border-radius: 30upx;" src="http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAevEJAAAhcJPC-HI2020514" mode=""></image>
			</view>
			
			<text style="width: 70%;float: right;">
				<text style="font-size: 30upx;display: inline-block;">行丰商城</text><br>
				<text style="font-size: 30upx;">当前系统版本 : v{{version}}</text>
			</text>
		</view>
		
		<!-- @click="updateVersion" -->
		<view style="padding-bottom: 50upx;height: 100%;">
			<view style="margin: 30upx 0;"><br>
				<view style="font-size: 36upx;">
					功能调整
				</view>
				<view style="line-height: 60upx;font-size: 34upx;">1.蓝牙<br>
					<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
					<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
					<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
				</view>
				<text style="line-height: 60upx;font-size: 34upx;">2.导航和快捷方式</text><br>
				<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
				<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
				<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
			</view>
			
			<view style="margin: 40upx 0;">
				<view style="font-size: 36upx;">
					问题改进
				</view>
				<view style="line-height: 60upx;font-size: 34upx;">1.蓝牙<br>
					<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
					<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
					<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
				</view>
				<text style="line-height: 60upx;font-size: 34upx;">2.导航和快捷方式</text><br>
				<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
				<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
				<text style="font-size: 30upx;width: 100%;">sdasdsa达瓦达瓦达瓦达瓦达瓦达瓦dsa;</text><br>
			</view>
		</view>
		
		<button type="default" style="position: fixed;bottom: 10px;width: 90%;background: #FA436A;color: #fff;border: none;margin-top: 30px;" @click="updateVersion">检查更新</button>
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
				version:'',
			};
		},
		onLoad(){
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				// this.$api.msg(wgtinfo.version);   //版本号
				this.version = wgtinfo.version
			})
			// #endif
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			
			async updateVersion(){
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
							content: '有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序。',
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
				}else{
					uni.showToast({
						title:'已是最新版本'
					})
				}
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding: 30upx;
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
