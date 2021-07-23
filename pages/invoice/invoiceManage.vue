<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">发票抬头</text>
			<input class="input" type="text" v-model="invoiceData.invoice_title" placeholder="请输入发票抬头" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">纳税人识别号</text>
			<input class="input" type="text" v-model="invoiceData.invoice_org_code" placeholder="请输入纳税人识别号" placeholder-class="placeholder" />
		</view>
		
		<button class="add-btn" @click="confirm(invoiceData)">提交</button>
		<button class="del-btn" @click="condelete(invoiceData)">删除</button>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				invoiceData: {
					invoice_bank: '',
					invoice_bank_code: '',
					invoice_org_code: '',
					invoice_phone: '',
					invoice_title: '',
					register_address: ''
				},
				type:null,
				manageType: {},
				form_address:{},
				default_address_id:false
			}
		},
		onLoad(option) {
			let title = '新增普票/电子票';
			if (option.type === 'edit') {
				title = '编辑普票/电子票'
				this.invoiceData = JSON.parse(option.data)
			}
			this.type = option.data
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
			
		},
		onShow(){
			
		},
		methods: {
			//提交
			async confirm(data) {
				console.log(data)
				if (!data.invoice_title) {
					this.$api.msg('请填写发票抬头');
					return;
				}
				if (!data.invoice_org_code) {
					this.$api.msg('请填写纳税人识别号');
					return;
				}
				this.invoiceData.invoice_title = data.invoice_title
				this.invoiceData.invoice_org_code = data.invoice_org_code
				this.invoiceData.register_address = null
				this.invoiceData.invoice_phone = null
				this.invoiceData.invoice_bank = null
				this.invoiceData.invoice_bank_code = null
				if(this.manageType === 'edit'){
					this.setInvoice(data)
				}else if(this.manageType === 'add'){
					this.getInvoice(data)
				}
				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				this.$api.prePage().refreshList(data, this.manageType);
				this.$api.msg(`发票${this.manageType=='edit' ? '修改': '添加'}成功`);
				setTimeout(() => {
					uni.navigateBack()
				}, 800)
			},
			
			async setInvoice(content) {
				const response = await uniRequest({
					url: '/orders/invoice/' + content.id + '/',
					data: content,
					method: 'put',
					resposeType:'json',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(response => {
					console.log(response)
				}).catch(error => {
					console.log(error)
				})
			},
			async getInvoice(content){
				const response = await uniRequest({
					url: '/orders/invoice/',
					method: 'post',
					data:content,
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(response => {
					console.log(response)
				}).catch(error => {
					console.log(error)
				})
			},
			
			// 删除
			async condelete(data){
				console.log(data)
				const response = await uniRequest({
					url: '/orders/invoice/' + data.id + '/',
					method: 'delete',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(response => {
					console.log(response)
					// this.$api.prePage().refreshList(data);
					this.$api.msg('删除成功')
					setTimeout(() => {
						uni.navigateBack()
					}, 800)
				}).catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 200upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.6);
	}
	.del-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
