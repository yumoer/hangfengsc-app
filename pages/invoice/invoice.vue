<template>
	<view class="content b-t">
		<view class="" v-if="couponList.length > 0" v-for="(item, index) in couponList" :key="index" @click="checkInvoice(item)">
			<view class="coupon-item">
				<view class="con">
					<view class="left">
						<text class="title">{{item.invoice_title}}</text>
						<text class="time">{{item.invoice_org_code}}</text>
					</view>
					<view class="right">
						<text class="price" v-if="item.invoice_bank === '' || item.invoice_bank_code === '' || item.invoice_phone === '' || item.register_address === '' ">普票/电子票</text>
						<text class="price" v-else>增值税发票</text>
					</view>
					<text class="yticon icon-bianji" @click.stop="addInvoIce('edit', item)"></text>
				</view>
			</view>
		</view>
		<view v-if="couponList.length === 0" style = "position: relative;">
			<image style="width: 200px;height: 200px;position: absolute;left: 0;right: 0;top: 120px;margin: auto;" src="../../static/img/icon.png" mode=""></image>
			<text style="position: absolute;left: 0;right: 0;top: 330px;margin: 0px auto;text-align: center;font-size: 16px;">暂无发票,点击右上方添加发票</text>
		</view>
		
		<!-- <uni-popup ref="popup">
			<button class="add-btn" @click="addInvoIce('add',2)">新增增值税发票</button>
			<button class="add-btns" @click="addInvoIce('add',1)">新增普票/电子票</button>
		</uni-popup> -->
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				source: 0,
				couponList: [],
			}
		},
		onShow(){
			if(this.$refs.popup !== undefined){
				this.$refs.popup.close()
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
			this.getInvoice()
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			console.log(index)
			if(index === 0){
				this.addInvoIce('add',2)
			}
		},
		methods: {
			//选择发票
			checkInvoice(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().couponList = item;
					uni.navigateBack()
				}
			},  
		    
			async getInvoice(data,type) {
				const res = await uniRequest({
					url: '/orders/invoice/',
					method: 'get',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					this.couponList = res.data
					if(type === "add"){
						this.couponList.push(data);
					}else if(type === "edit"){
						this.couponList.forEach((ele,index)=>{
							if(data !== undefined){
								if(ele.id === data.id){
									ele.invoice_title = data.invoice_title
									ele.invoice_org_code = data.invoice_org_code
									ele.register_address = data.register_address
									ele.invoice_phone = data.invoice_phone
									ele.invoice_bank = data.invoice_bank
									ele.invoice_bank_code = data.invoice_bank_code
								}
							}
						})
					}
					this.$refs.popup.close()
					/* this.couponList.forEach(ele=>{
						if(ele.invoice_bank !== null){
							ele.checked = false
							// this.checked.push(ele.checked)
							this.increaseTicket.push(ele)
						}else{
							ele.checked = false
							this.checked.push(ele.checked)
							this.generalVote.push(ele)
						}
						console.log(this.checked)
					}) */
					if (this.couponList.length === 0) {
						// this.invoice = '新增发票'
						/* uni.redirectTo({
							url: '/pages/invoice/invoice'
						}) */
					} else {
						// this.invoice = '选择发票'
					}
				}).catch(error => {
			
				})
			},
			
			
			
			addInvoIce(type, item){
				console.log(item,type)
				if(type === 'add'){
					uni.navigateTo({
						url: `/pages/invoice/invoiceManages?type=${type}&data=${JSON.stringify(item)}`
					})
				}else if(type === 'edit'){
					uni.navigateTo({
						url: `/pages/invoice/invoiceManages?type=${type}&data=${JSON.stringify(item)}`
					})
				}
				
				
			},
			
			
			//添加或修改成功之后回调
			refreshList(data, type){
				console.log(data, type);
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				if(type === 'add'){
					// this.couponList.push(data)
					this.getInvoice(data,type)
					
				}else if(type === 'edit'){
					this.getInvoice(data,type)
				}else{
					this.couponList.splice(data,1)
					this.getInvoice(data,type)
				}
			}
		}
	}
</script>

<style lang='scss'>
	page{
		/* padding-bottom: 120upx; */
		height: 0%;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #6b6b6b;
		position: relative;
	}
	.coupon-item {
		display: flex;
		flex-direction: column;
		/* margin: 20upx 24upx; */
		background: #fff;
	
		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
	
			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
	
		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
	
		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
	
		.time {
			font-size: 24upx;
			color: $font-color-light;
		}
	
		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
	
		.price {
			font-size: 34upx;
			color: $base-color;
	
			&:before {
				font-size: 34upx;
			}
		}
	
		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
	
		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
	
			&.r {
				left: auto;
				right: -6upx;
			}
		}
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
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 12upx;
			line-height: 1;
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
		padding-left: 20upx;
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
	
	.add-btns{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 120upx;
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
