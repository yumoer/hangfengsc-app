<template>
	<view>
        <view class="chat-list">
			<view class="chat" v-for="(chat,index) in chatList" :key="index">
				<view class="row" @tap="toChat(chat)">
					<view class="left">
						<image :src="chat.face"></image>
					</view>
					<view class="right">
						<view class="top">
							<view class="username">{{chat.username}}</view>
							<view class="time">{{chat.time}}</view>
						</view>
						<view class="bottom">
							<view class="msg">{{chat.msg}}</view>
							<view class="tis" v-if="chat.tisNum>0">{{chat.tisNum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatList:[
					{
						username:"测试用户",
						face:"/static/img/face.jpg",
						time:"13:08",
						userId:226,
						msg:"亲，20点前下单都是当天送达的",
						tisNum:1
					},
					{
						username:"yumoer22",
						face:"/static/img/face.jpg",
						time:"13:08",
						userId:227,
						msg:"亲，20点前下单都是当天送达的",
						tisNum:1
					}
				]
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {
			this.connectSocketInit()
			this.clickRequest()
			let list = []
			const rootPath = "/api";
			uni.request({
				url:rootPath+'/chat/log?user='+uni.getStorageSync('userInfo').user_id,
				method:'get',
				headers:{
					'Authorization':'JWT '+uni.getStorageSync('userInfo').token,
					'content-type':'application/x-www-form-urlencoded'
				},
			}).then(res=>{
				list  = res[1].data[0]
				console.log(list)
				// this.msgList = list
				if(list.sender !== null){
					this.chatList[0].tisNum = 1
					this.chatList[0].msg = list.message
					this.chatList[0].time = list.create_time
				}else{
					this.chatList[0].tisNum = 0
					this.chatList[0].msg = list.message
					this.chatList[0].time = list.create_time
				}
			}).catch(error=>{
			   console.log(error)
			})
		},
		methods: {
			connectSocketInit() {
				uni.connectSocket({
					url: 'ws://socket.hfyt365.com/admin/socket',  //测试接口，需填上自己服务器IP
					success() {
						uni.onSocketOpen(function(res) {
							console.log(res)
							if(res.message !== undefined){
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: 'ok'
								});
								var obj = {
									type:'str',
									message:'ping',
									receiver:this.userList.userId,
								}
								uni.sendSocketMessage({
									data: JSON.stringify(obj),
									success: function() {
										uni.onSocketMessage(function(res) {
											var s = JSON.parse(res.data);
											console.log(s)
											this.msgList.push({id:s.id,username:"售后客服",face:"/static/img/im/face/face_2.jpg",time:s.time,type:"str",msg:{content:s.message}});
										});
									},
									fail: function() {
										uni.showToast({
											icon: 'none',
											position: 'bottom',
											title: '数据发送失败2'
										});
									}
								});
							}
						});
					}
				});
			},
			clickRequest() {
				var that = this
				
				var obj = {
					type:'str',
					message:'ping',
					receiver:this.chatList[0].userId,
				}
				uni.sendSocketMessage({
					data:JSON.stringify(obj),         //需要发送的数据
					success: function() {
						uni.onSocketMessage(function(res) {
							var ret = JSON.parse(res.data);
							console.log(ret)
							if(ret.type === 'message' && ret.message === '该用户不存在或已下线'){
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: ret.message
								});
							}else if(ret.type === 'str'){
								that.msgList.push({id:lastid,username:"yumoer22",face:"/static/img/face.jpg",time:ret.time,type:"str",msg:{content:ret.message}})
							}
						});
					},
					fail: function() {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '数据发送失败'
						});
					}
				});
			},
			toChat(chat){
				console.log(chat)
				uni.navigateTo({
					url:"/pages/chat/chatAdmin?data="+JSON.stringify(chat)
				})
			}
		}
	}
</script>

<style  lang="scss">
	page{
		background-color: rgba(0,0,0,0);
	}
	.chat-list{
		width: 94%;
		padding: 0 3%;
		.chat{
			width: 100%;
			height: 140upx;
			padding: 20upx 0;
			border-bottom: solid 1upx #eaeaea;
			.row{
				display: flex;
				justify-content: flex-start;
				.left{
					flex-shrink:0;
					width: 100upx;
					height: 100upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 20upx;
					}
				}
				.right{
					flex-shrink:1;
					width: 98%;
					padding-left: 2%;
					.top{
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						.usernam{
							font-size: 26upx;
						}
						.time{
							font-size: 22upx;
							color: #bebebe;
						}
					}
					.bottom{
						width: 100%;
						height: 90upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.msg{
							font-size: 28upx;
							color: #777;
						}
						.tis{
							width: 35upx;
							height: 35upx;
							font-size: 22upx;
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: #eb4d3d;
							color: #fff;
							border-radius: 100%;
						}
					}
				}
			}
		}
	}
</style>
