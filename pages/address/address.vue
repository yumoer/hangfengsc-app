<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="u-box">
					<text class="name">{{item.receiver}}</text>
					<text class="mobile">{{item.mobile}}</text>
				</view>
				<view class="address-box">
					<text class="address">{{item.addressName}} {{item.place}}</text>
				</view>
				<view
					style="display: inline-block;"
					class="yticon icon-xuanzhong checkbox"
					:class="{checked: item.default_address_id}"
				>
					<text style="color: #666;margin-left: 10upx;" @click="check(item)">设为默认</text>
					<text style="color: #999;float: right;" @click="condelete(item)">删除</text>
				</view>
			</view>
			<text class="yticon icon-order-edit" @click.stop="addAddress('edit', item)"></text>
		</view>
		<button class="add-btn" @click="addAddress('add')">添加新地址</button>
		<view v-if="addressList.length === 0" style = "position: relative;">
			<image style="width: 200px;height: 200px;position: absolute;left: 0;right: 0;top: 120px;margin: auto;" src="../../static/img/icon.png" mode=""></image>
			<text style="position: absolute;left: 0;right: 0;top: 330px;margin: 0px auto;text-align: center;font-size: 16px;">暂无地址</text>
			<button class="add-btn" @click="addAddress('add')">添加新地址</button>
		</view>
		<show-modal></show-modal>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				source: 0,
				addressList: [],
			}
		},
		onLoad(option){
			this.source = option.source;
		},
		onShow(){
			this.getAddress()
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			console.log(index)
			if(index === 0){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=add&data=undefined`
				})
			}
		},
		methods: {
			// 获取收货地址
			async getAddress(data,type){
				uni.showLoading({
					title:'数据加载中...'
				})
				await uniRequest({
					url:'/user/addresses/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res.data)
					uni.hideLoading()
					this.addressList = res.data.addresses
					if(type === "add"){
						this.addressList.push(data);
					}
					this.addressList.forEach((ele,index)=>{
						if(ele.id === res.data.default_address_id){
							ele.default_address_id = true
						}else{
							ele.default_address_id = false
						}
						if(ele.addressName !== null){
							if(data !== undefined){
								if(ele.id === data.id){
									ele.addressName = data.addressName
								}
							}
						}else{
							ele.addressName = ele.province + ' ' + ele.city+ ' ' + ele.district+ ' '
						}
					})
					
				}).catch(error=>{
					console.log(error)
				})
			},
			
			// 删除
			async condelete(data){
				console.log(data)
				this.$showModal({
					title:'提示',
				    content: '确认删除地址?',
					cancelText:"取消",
					confirmText:"确认",
				    success: async(e) =>{
				    	if(e.confirm){
							await uniRequest({
								url: '/user/addresses/' + data.id + '/',
								method: 'delete',
								headers: {
									Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
								},
							}).then(res => {
								this.$api.msg('地址删除成功')
								setTimeout(() => {
									this.getAddress()
								}, 1000)
							}).catch(error => {
								console.log(error)
							})
				    	}
				    }
				});
				
			},
			
			async check(data){
				this.$showModal({
					title:'提示',
				    content: '确认设为默认地址?',
					cancelText:"取消",
					confirmText:"确认",
				    success: async(e) =>{
				    	if(e.confirm){
							if(data.default_address_id === false){
								await uniRequest({
									url: '/user/addresses/' + data.id + '/status/',
									method: 'put',
									headers: {
										Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
									},
								}).then(res => {
									if(res.status === 200){
									  this.getAddress()
									}
								}).catch(error => {
									console.log(error.response);
									if(error.response === undefined){
										this.$api.msg('服务器错误');
									}
								})
							}else{
								this.$api.msg('已是默认地址')
							}
				    	}
				    }
				});
			},
			
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				console.log(item)
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			
			
			//添加或修改成功之后回调
			refreshList(data, type){
				console.log(data, type);
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				if(type === 'add'){
					this.getAddress(data,type)
				}else{
					this.getAddress(data,type)
				}
			}
		}
	}
</script>

<style lang='scss'>
	/deep/ uni-radio .uni-radio-input{
		width: 30upx;
		height: 30upx;
	}
	.content{
		position: relative;
		padding-bottom: 120upx;
		width: 100%;
		padding: 30upx 30upx 100upx 30upx;
	}
	.checkbox{
		width: 100%;
		margin-top: 20upx;
		z-index: 8;
		font-size: 28upx;
		line-height: 1;
		padding: 4upx;
		color: $font-color-disabled;
		border-radius: 50px;
	}
	/* 复选框选中状态 */
	.checked{
		color: #EE1D23;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
		margin-bottom: 20upx;
		border-radius: 20upx;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		padding-bottom: 24upx;
		border-bottom: 1upx solid #ddd;
		width: 100%;
		.tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 20upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 12upx;
			line-height: 15px;
			width: 24px;
		}
		.address{
			font-size: 30upx;
			color: $font-color-text6;
			letter-spacing: 2upx;
			width: 85%;
		}
		
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin: 16upx 0;
		.name{
			margin-right: 30upx;
			color: #333;
			font-size: 32upx;
			font-weight: bold;
			letter-spacing: 3upx;
		}
		.mobile{
			color: $font-color-text6;
			font-size: 26upx;
			font-weight: bold;
		}
	}
	.icon-order-edit{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 50upx;
		color: $font-color-light;
		padding-left: 30upx;
		right: 30upx;
		top: 50upx;
		position: absolute;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 60upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 590upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 50upx;
		background: linear-gradient(to right,#EE1D23,#F04023);
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);	
		letter-spacing: 6upx;
	}
</style>
