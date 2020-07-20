<template>
	<view class="content">
		<text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 2;color: #333;font-size: 28rpx;background: rgba(219, 63, 96, 0.4)">
			注意：普票电子票填写必填参数，增票要填写全部参数
		</text>
		<view class="row b-b">
			<text class="tit"><text style="color:#fa436a;margin-right:10upx">*</text>发票抬头</text>
			<input class="input" type="text" v-model="invoiceData.invoice_title" placeholder="请输入发票抬头" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit"><text style="color:#fa436a;margin-right:6upx">*</text>纳税人识别号</text>
			<input class="input" type="text" v-model="invoiceData.invoice_org_code" placeholder="请输入纳税人识别号" placeholder-class="placeholder" />
		</view>
		
		<view class="row b-b" v-if="invoiceData.register_address">
			<text class="tit">注册地址</text>
			<input class="input" type="text" v-model="invoiceData.register_address" placeholder="请输入注册地址" placeholder-class="placeholder" />
		</view>
		
		<view class="row b-b" v-if="invoiceData.invoice_phone">
			<text class="tit">注册电话</text>
			<input class="input" type="number" v-model="invoiceData.invoice_phone" placeholder="请输入注册电话" placeholder-class="placeholder" />
		</view>
		<view class="row b-b" v-if="invoiceData.invoice_bank">
			<text class="tit">开户银行</text>
			<input class="input" type="text" v-model="invoiceData.invoice_bank" placeholder="请输入开户银行" placeholder-class="placeholder" />
		</view>
		<view class="row b-b" v-if="invoiceData.invoice_bank_code">
			<text class="tit">开户行账号</text>
			<input class="input" type="text" v-model="invoiceData.invoice_bank_code" placeholder="请输入开户行账号" placeholder-class="placeholder" />
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
					type:this.type,
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
			let title = '新增发票';
			if (option.type === 'edit') {
				title = '编辑发票'
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
				
				/* if (!data.register_address) {
					this.$api.msg('请填写注册地址');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.invoice_phone)) {
					this.$api.msg('请输入注册电话');
					return;
				}
				if (!data.invoice_bank) {
					this.$api.msg('请输入开户银行');
					return;
				}
				if (!data.invoice_bank_code) {
					this.$api.msg('请填写开户行账号');
					return;
				} */
				this.invoiceData.invoice_title = data.invoice_title
				this.invoiceData.invoice_org_code = data.invoice_org_code
				
				if(data.register_address === '' || data.invoice_phone === '' || data.invoice_bank === '' || data.invoice_bank_code === ''){
					this.invoiceData.register_address = ''
					this.invoiceData.invoice_phone = ''
					this.invoiceData.invoice_bank = ''
					this.invoiceData.invoice_bank_code = ''
				}else{
					this.invoiceData.register_address = data.register_address
					this.invoiceData.invoice_phone = data.invoice_phone
					this.invoiceData.invoice_bank = data.invoice_bank
					this.invoiceData.invoice_bank_code = data.invoice_bank_code
				}
				
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
				const response = await uniRequest({
					url: '/orders/invoice/' + data.id + '/',
					method: 'delete',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(response => {
					console.log(response)
					this.$api.prePage().refreshList(data);
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
			width: 210upx;
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
