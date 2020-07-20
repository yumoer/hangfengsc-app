<template>
	<view class="content">
		<view style="height: 300upx;line-height: 300upx;text-align: center;">
			<text style="color: #fff;font-size: 32upx;font-weight: 100;">行丰商城App,购物高效又轻松！</text>
		</view>
		<view style="width: 100%;height: 300px;text-align: center;padding-left: 80upx;">
			<image style="width: 200px;height: 100%;" src="/static/app.png" mode=""></image>
		</view>
		
		<view style="width: 100%;height: 60px;text-align: center;margin-top: 100upx;">
			<button type="default" plain="true" style="width: 200px;color: #fff;border-color: #fff;border-radius: 30px;" @click="shareInfo">
				<text class="yticon icon-fenxiang2"></text>
				<text style="margin-left: 10Px;">分享给好友</text>
			</button>
		</view>
		
		
		<!-- 分享 -->
		<shares 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></shares>
	
	</view>
	
	</view>
</template>

<script>
	import shares from '@/components/share';
	import share from "@/common/share.js";
	export default {
		data(){
			return {
				shareObj:{
					shareMenu:''
				},
				shareList:[]
			}
		},
		components: {shares},
		async onLoad() {
			this.shareList = await this.$api.json('shareList');
		},
		methods:{
			// app分享
			shareInfo(){
				let shareInfo={
					href:"http://m.hfyt365.com/#/pages/appdown/appdown",
					title:"行丰商城App",
					desc:'行丰商城App,购物高效又轻松！',
					imgUrl:'../../static/tag.png'
				};
				let shareList=[
					{
						icon:"/static/sharemenu/wx.png",
						text:"微信好友",
					},
					{
						icon:"/static/sharemenu/pyq.png",
						text:"朋友圈"
					},
					/* {
						icon:"/static/sharemenu/weibo.png",
						text:"微博"
					}, */
					{
						icon:"/static/sharemenu/qq.png",
						text:"QQ"
					},
					{
						icon:"/static/sharemenu/copy.png",
						text:"复制"
					},
					{
						icon:"/static/sharemenu/more.png",
						text:"更多"
					},
				];
				this.shareObj=share(shareInfo,shareList,function(index){
					console.log("点击按钮的序号: " + index);
					let shareObj={
						href:shareInfo.href||"",
						title:shareInfo.title||"",
						summary:shareInfo.desc||"",
						success:(res)=>{
							console.log("success:" + JSON.stringify(res));
						},
						fail:(err)=>{
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider="weixin";
							shareObj.scene="WXSceneSession";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider="weixin";
							shareObj.scene="WXSenceTimeline";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						/* case 2:
							shareObj.provider="sinaweibo";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break; */
						case 2:
							shareObj.provider="qq";
							shareObj.type=1;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 3:
							uni.setClipboardData({
								data:shareInfo.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 4:
							plus.share.sendWithSystem({
								type:"web",
								title:shareInfo.title||"",
								thumbs:[shareInfo.imgUrl||""],
								href:shareInfo.href||"",
								content: shareInfo.desc||"",
							})
							break;
					};
				});
				this.$nextTick(()=>{
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
				})
			},
		}
	}
	
	
</script>

<style>
	page{
		background-color: #E82222;
		width: 100%;
		height: 100%;
	}
</style>
