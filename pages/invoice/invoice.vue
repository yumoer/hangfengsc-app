<template>
	<view class="content">
		<view class="coupon-wrap" v-if="couponList.length > 0" v-for="(item, index) in couponList" :key="index" @click="checkInvoice(item)">
			<view class="coupon-item">
				<view class="con">
					<!-- <checkbox style="margin-right: 20px;transform:scale(0.7)" value="cb" checked="true" /> -->
					<u-checkbox-group v-if="isCheck">
						<u-checkbox @change="checkboxChange" style="transform:scale(1.2)" :name="item.id" v-model="item.checked" active-color="red"></u-checkbox>
					</u-checkbox-group>
					<view class="left">
						<text class="title" v-if="item.invoice_title === '不开发票'">{{item.invoice_title}}</text>
						<text class="title" v-else>发票抬头：{{item.invoice_title}}</text>
						<text class="time" v-if="item.invoice_org_code">纳税人识别号：{{item.invoice_org_code}}</text>
						<text class="time" v-if="item.register_address">注册地址：{{item.register_address}}</text>
						<text class="time" v-if="item.invoice_phone">注册电话：{{item.invoice_phone}}</text>
						<text class="time" v-if="item.invoice_bank_code">开户银行账号：{{item.invoice_bank_code}}</text>
						<text class="time" v-if="item.invoice_bank">开户银行：{{item.invoice_bank}}</text>
					</view>
					<text v-if="!isCheck && item.id !== 0" class="yticon icon-user-fankui" @click.stop="addInvoIce('edit', item)"></text>
				</view>
			</view>
		</view>
		
		
		
		<view v-if="couponList.length === 0">
			<xw-empty :isShow="isEmpty" img="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttGKAQ85UAAHS1uzZYE40632776" path="" btnText="" text="您暂时还没有添加发票" textColor="#C0C4CC"></xw-empty>
		</view>
		
		<button class="add-btn" v-if="!isCheck" @click="addInvoIce('add')">新增发票</button>
		
		<!-- 底部菜单栏 -->
		<view class="action-section" v-else>
			<u-checkbox-group class="checkbox">
				<u-checkbox @change="checkedAll" v-model="checked" active-color="red">全选</u-checkbox>
			</u-checkbox-group>
			<view class="total-box" @click="toBack">取消删除</view>
			<button type="primary" class="no-border confirm-btn" @click="condelete(selected)">删除 ({{selected.length}})</button>
		</view>
		
		<show-modal></show-modal>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import xwEmpty from '@/components/xw-empty/xw-empty';
	export default {
		data() {
			return {
				source: 0,
				couponList: [],
				isEmpty:false,
				checked:false,
				isCheck:false,
				allChecked:'',
				selected:[]
			}
		},
		components:{xwEmpty},
		onShow(){
			this.getInvoice()
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
			this.getInvoice()
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if(index === 0 && this.couponList.length > 0){
				this.isCheck = !this.isCheck
			}else{
				this.$api.msg('没有数据暂不能删除')
			}
		},
		watch:{
			//显示空白页
			couponList(e){
				let empty = e.length === 0 ? true: false;
				if(this.isEmpty !== empty){
					this.isEmpty = empty;
				}
			}
		},
		methods: {
			//选择发票
			checkInvoice(item){
				console.log(item)
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().couponList = item;
					uni.navigateBack()
				}
			},  
			
			toBack(){
				this.isCheck = false
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
					res.data.map(val => {
						val.checked = false;
					})
					this.couponList = res.data;
					if(this.source === '1'){
						this.couponList.unshift({invoice_title:'不开发票',invoice_org_code:''})
					}
					if(this.couponList.length < 1){
						this.selected = []
						this.isCheck = false;
					}
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
				}).catch(error => {
					console.log(error)
				})
			},
			
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				console.log(e);
			},
			
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				if(e.value === true){
					this.selected.push(e)
				}else{
					this.checked = false
					this.selected.shift(e,1)
				}
				console.log(this.selected)
				e.value = !e.value
			},
			
			// 全选
			checkedAll() {
				// this.checked = !this.checked
				let selected = []
				this.couponList.forEach(ele=>{
					if(this.checked === true){
						ele.checked = true
					}else{
						ele.checked = false
					}
					selected.push({value:ele.checked,name:ele.id})
				})
				this.selected = selected
			},
			
			// 删除
			async condelete(data){
				this.$showModal({
					title:'提示',
				    content: '是否确认删除?',
					cancelText:"取消",
					confirmText:"确认",
				    success: (e) =>{
				    	if(e.confirm){
							uni.showLoading()
							data.forEach(ele=>{
								const response = uniRequest({
									url: '/orders/invoice/' + ele.name + '/',
									method: 'delete',
									headers: {
										Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
									},
								}).then(response => {
									console.log(response.data)
									uni.hideLoading()
									this.$api.msg('发票删除成功')
									
									this.getInvoice()
								}).catch(error => {
									console.log(error)
								})
							})
				    	}
				    }
				});
				
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
	/deep/ .uni-checkbox:not([disabled]) .uni-checkbox-input:hover{
		border-color:red!important;
	}
	/deep/ .uni-checkbox .uni-checkbox-input{
		 background: red!important;
		 color: #fff!important;
	}
	/deep/ .uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
		 background: red!important;
		 color: #fff!important;
	}
	.content{
		position: relative;
		padding: 30upx;
		margin-bottom: 100upx;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #6b6b6b;
		position: relative;
	}
	.coupon-wrap{
		margin-bottom: 20upx;
	}
	.coupon-item {
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 20upx;
		.con {
			display: flex;
			align-items: center;
			position: relative;
			min-height: 140upx;
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
			height: auto;
			padding: 30upx 0;
		}
	
		.title {
			font-size: 32upx;
			color: #111111;
			font-weight: bold;
			margin-bottom: 15upx;
		}
	
		.time {
			font-size: 28upx;
			color: #666666;
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
		bottom: 40upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 590upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-image: linear-gradient(to right,#EE1D23, #F04023);
		border-radius: 40upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
	
	/* 底部栏 */
	.action-section{
		position:fixed;
		bottom:30upx;
		margin-left: -15px;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 2px 0 rgba(0,0,0,.5);
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 45upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.allText{
			position:absolute;
			left: 80upx;
			top: 0;
			z-index: 4;
			width: 80upx;
			height: 52upx;
			line-height: 52upx;
			font-size: 16px;
			color: #666;
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				text{
					color: $font-color-dark;
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			height: 100upx;
			line-height: 100upx;
			font-size: $font-base + 2upx;
			background: $uni-color-hangfeng;
			border-radius: 0;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-hangfeng;
		font-size: 20px;
	}
</style>
