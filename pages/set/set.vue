<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/set/userInfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		<view class="list-cell b-b" @click="navTo('/pages/set/avator')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改头像</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		<view class="list-cell b-b" @click="navTo('/pages/set/editPass')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/address/address')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">收货地址</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		<view class="list-cell b-b" @click="navTo('/pages/paypwd/addpaypwd')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">支付密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!-- <view class="list-cell" @click="navTo('实名认证')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">实名认证</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		
		<view class="list-cell b-b m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view>
		<view class="list-cell b-b" @click="clear" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="logouts" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">注销账户</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		
		<!-- #ifdef APP-PLUS -->
		<view class="list-cell" @click="lookVersion">
			<text class="cell-tit">关于行丰商城</text>
			<text class="cell-tip">当前版本 v{{appver}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!-- #endif -->
		
		
		
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
		
		<view class="cell-tit" style="text-align: center;margin-top: 80upx;font-size: 28upx;color: #606266;line-height: 50upx;">
			<text>Copyright@2008-2020</text></br>
			<text>行丰银拓hfyt365.com 版权所有</text>
		</view>
		
		<!-- <view class="cell-tit" style="position: absolute;bottom: 20px;width: 100%;text-align: center;">
			<text style="font-size: 30upx;margin:0 auto;">
				<text @click="navTo('/pages/set/service')">服务协议</text> | <text @click="navTo('/pages/set/privacy')">隐私协议</text>
			</text>
		</view> -->
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
				appver:'',
				size:'',
			};
		},
		onLoad(){
			// #ifdef APP-PLUS
			this.appver = plus.runtime.version
			// #endif
		},
		methods:{
			...mapMutations(['logout']),
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			
			lookVersion(){
				uni.navigateTo({
					url:'/pages/set/about'
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
			
			clear(){
				// #ifdef APP-PLUS
				var self=this;
				 plus.cache.calculate( function ( size ) { //size是多少个字节单位是b
					 //你可以做下面相应的处理
					 if(size<1024){
						 self.size=size+'B'; 
					 }  
					 else if(size/1024>=1 && size/1024/1024<1){
						  self.size= Math.floor(size/1024*100)/100+'KB';
					 }
					else if(size/1024/1024>=1){
						 self.size=Math.floor(size/1024/1024*100)/100+'M';
					}
					console.log(self.size)
					 //可以询问用户是否删除
					  uni.showModal({
						title:'提示',
						content:'确定清除缓存吗?',
						success(res) {
						   // 用户确定要删除
							if(res.confirm){
							   //使用plus.cache.clear 清除应用中的缓存数据 这里清除后还要二十几KB没有清除，达不到全部清除
								plus.cache.clear( function () {
									uni.showToast({
										title:'成功清除缓存'+self.size,
										icon:'none',
										success(e) {
											//成功后处理
											this.logout();
											uni.navigateBack();
										}
									})
								});	
							}
						}
					  })
				 });
				// #endif
				// #ifdef H5
				uni.removeStorage({key:'userInfo'})
				uni.showModal({
					title:'提示',
				    content: '清除成功后，需要重新登录?',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.logout();
							uni.navigateBack();
				    	}
				    }
				});
				// #endif
				
			},
			//退出登录
			toLogout(){
				uni.showModal({
					title:'提示',
				    content: '退出登录数据会被清除,确定要退出登录?',
				    success: (e)=>{
				    	if(e.confirm){
							uni.removeStorage({key:'userInfo'})
				    		this.logout();
							uni.navigateBack();
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},
			
			logouts(){
				uni.showModal({
					title:'提示',
				    content: '注销成功后，您的账号将无法登录！',
				    success: async(e) =>{
				    	if(e.confirm){
							const response = await uniRequest({
								url:'/users/',
								method:'delete',
								headers:{
									Authorization:'JWT '+uni.getStorageSync('userInfo').token
								},
							}).then(response=>{
								console.log(response)
								uni.removeStorage({key:'userInfo'})
								this.logout();
								uni.navigateBack();
							}).catch(error=>{
								console.log(error)
							})
				    	}
				    }
				});
			}

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
