<template>
	<view class="content">
		<view class="title">
			<image style="" src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttBiAAULuAAAC5PX9usE9838075" mode=""></image>
			<text>订单地址最多五条，仅支持修改一次地址，请您谅解</text>
		</view>
		<view class="oAddress">
			<view class="oa_info">
				<view class="oa_title">原地址：</view>
				<view class="oa_body">
					<text class="oa_name">{{addressInfo.receiver}}</text>
					<text class="oa_tel">{{addressInfo.mobile}}</text>
				</view>
				<view class="oa_address">{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.district}}{{addressInfo.place}}</view>
			</view>
		</view>
		<view class="cAddress">
			<view class="ca_title">
				<text class="ca_change">选择新的收货地址</text>
				<text class="ca_addBtn" @click="editAddress">修改地址</text>
			</view>
			<view class="ca_list" v-for="(ele,index) in addressList" :key="index">
				<u-checkbox-group max="1">
					<u-checkbox v-model="ele.checked" :name="ele.id" @change="checkboxChange($event,ele)" active-color="red">
						<view class="ca_body">
							<text class="ca_name">{{ele.receiver}}</text>
							<text class="ca_tel">{{ele.mobile}}</text>
							
						</view>
						<view class="ca_address">{{ele.province}}{{ele.city}}{{ele.district}}{{ele.place}}</view>
					</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<view class="confirm">
			<u-button class="btn" @click="confirmBtn">提交修改</u-button>
		</view>
		<show-modal></show-modal>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				addressInfo:{}, //地址信息
				addressList:[], //地址列表
				orderId:'',
				addressId:null,
			};
		},
		onLoad(options) {
			this.orderId = options.orderId;
		},
		onShow() {
			this.getOrderList()
			this.getAddress()
		},
		methods:{
			// 获取订单地址
			async getOrderList(){
				await uniRequest({
					url: '/orders/info/',
					method: 'post',
					data: {id:this.orderId},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res.data)
					if (res.status === 201 || res.status === 200) {
						this.addressInfo = res.data.address
					} else {
						this.$api.msg(res.data.message || res.data[0])
					}
				}).catch(error => {
					console.log(error.data)
				})
			},
			// 获取收货地址
			async getAddress(data,type){
				uni.showLoading()
				await uniRequest({
					url:'/user/addresses/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					console.log(res.data)
					uni.hideLoading()
					res.data.addresses.forEach(ele=>{
						console.log(ele.id,this.addressInfo)
						if(ele.place === this.addressInfo.place){
							ele.checked = true
						}else{
							ele.checked = false
						}
					})
					this.addressList = res.data.addresses
				}).catch(error=>{
					console.log(error)
				})
			},
			// 选择地址监听
			checkboxChange(e,item){
				console.log(e,item)
				if(e.value){
					this.addressId = e.name
				}else{
					this.addressId = null
				}
				this.addressList.forEach(ele=>{
					if(ele.id === e.name){
						ele.checked = true
					}else{
						ele.checked = false
					}
				})
			},
			checkboxGroupChange(e){
				console.log(e)
			},
			// 修改地址
			editAddress(){
				uni.navigateTo({
					url:'/pages/address/address'
				})
			},
			// 删除
			async condelete(data){
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
									this.getOrderList()
								}, 1000)
							}).catch(error => {
								console.log(error)
							})
				    	}
				    }
				});
			},
			// 提交申请
			async confirmBtn(){
				console.log(this.addressId)
				if(this.addressId !== null){
					await uniRequest({
						url: '/orders/change/address/',
						method: 'POST',
						data: {addr_id:this.addressId,order_id:this.orderId},
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res.data)
						uni.navigateBack()
						setTimeout(()=>{
							this.$api.msg('已修改订单地址')
						},500)
					}).catch(error => {
						console.log(error.data)
					})
					
				}else{
					this.$api.msg('未选择新地址')
				}
			},
		}
	}
</script>

<style lang="scss">
	/deep/ .u-checkbox__label{
		margin-left: 30upx;
	}
	.content{
		padding: 0 30upx 130upx 30upx;
		height: auto;
		margin-bottom: 100upx;
		.title{
			height: 80upx;
			line-height: 80upx;
			image{
				width: 26upx;
				height: 26upx;
			}
			text{
				font-size: 24upx;
				color: #000000;
				margin-left: 20upx;
			}
		}
		.oAddress{
			width: 100%;
			height: 190upx;
			background-color: #FFFFFF;
			border-radius: 20upx;
			.oa_info{
				padding: 20upx 30upx;
				line-height: 50upx;
				.oa_title{
					color: #333333;
					font-size: 28upx;
				}
				.oa_body{
					.oa_name{
						color: #111111;
						font-size: 32upx;
						font-weight: bold;
					}
					.oa_tel{
						color: #666666;
						font-size: 28upx;
						margin-left: 20upx;
					}
				}
				.oa_address{
					color: #666666;
					font-size: 28upx;
				}
			}
		}
		.cAddress{
			.ca_title{
				height: 110upx;
				line-height: 110upx;
				.ca_change{
					font-size: 32upx;
					color: #333333;
					font-weight: bold;
					float: left;
				}
				.ca_addBtn{
					float: right;
					font-size: 28upx;
					color: #666666;
				}
			}
			.ca_list{
				width: 100%;
				position: relative;
				height: 160upx;
				background-color: #fff;
				border-radius: 20upx;
				padding: 20upx 30upx;
				margin-bottom: 30upx;
				.ca_body{
					width: 100%;
					.ca_name{
						color: #111111;
						font-size: 32upx;
						font-weight: bold;
					}
					.ca_tel{
						color: #666666;
						font-size: 28upx;
						margin-left: 20upx;
					}
				}
				.ca_address{
					color: #666666;
					font-size: 28upx;
					width: 580upx;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;	
				}
			}
		}
		.confirm{
			position: fixed;
			bottom: 20px;
			left: 0;
			width: 100%;
			text-align: center;
			.btn{
				width: 590upx;
				height: 80upx;
				background:linear-gradient(to right,#EE1D23,#F04023);
				color: #fff;
				border-radius: 40upx;
			}
		}
	}
</style>
