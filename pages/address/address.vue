<template>
	<view class="content b-t">
		<text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 2;color: #333;font-size: 28rpx;background: rgba(219, 63, 96, 0.4)">
			您已创建了<text style="color: #fa436a;font-weight: bold;margin: 0 5rpx;">{{addressList.length}}</text>个收货地址，最多可创建 <text style="color: #fa436a;font-weight: bold;margin: 0 5rpx;">5</text>个
		</text>
		
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<text v-if="item.default_address_id" class="tag">默</text>
					<text class="address">{{item.addressName}} {{item.place}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.receiver}}</text>
					<text class="mobile">{{item.mobile}}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
		</view>
		<view v-if="addressList.length === 0" style = "position: relative;">
			<image style="width: 200px;height: 200px;position: absolute;left: 0;right: 0;top: 120px;margin: auto;" src="../../static/img/icon.png" mode=""></image>
			<text style="position: absolute;left: 0;right: 0;top: 330px;margin: 0px auto;text-align: center;font-size: 16px;">暂无地址,点击右上方新增</text>
		</view>
		<button class="add-btn" @click="addAddress('add')">新增地址</button>
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
			console.log(option.source);
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
			async getAddress(data,type){
				console.log(data)
				const response = await uniRequest({
					url:'/user/addresses/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(response=>{
					console.log(response.data)
					this.addressList = response.data.addresses
					if(type === "add"){
						this.addressList.push(data);
					}
					this.addressList.forEach((ele,index)=>{
						if(ele.id === response.data.default_address_id){
							ele.default_address_id = true
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
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
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
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
</style>
