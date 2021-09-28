<template>
	<view class="content">
		<view class="wrapper">
			<view class="row b-b">
				<text class="tit">收货人</text>
				<input class="input" type="text" v-model="addressData.receiver" placeholder="请输入姓名" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">手机号</text>
				<input class="input" type="number" maxlength="11" v-model="addressData.mobile" placeholder="请输入手机号码" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">所在地区</text>
				<view class="input" @tap="chooseCity">  <!-- @click="chooseLocation" -->
					{{addressData.addressName}}
				</view>
				<text class="yticon icon-you"></text>
				
			</view>
			<view class="row" style="height: 300upx;">
				<text class="tit">详细地址</text>
				<textarea class="text" v-model="addressData.place" placeholder="小区楼道/乡村名称" placeholder-class="placeholder" />
				<text class="yticon icon-shouhuodizhi"></text>
			</view>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>
		<view class="wrapper" style="margin-top: 20upx;">
			<view class="textInput">
				<text>智能地址填写</text>
			</view>
			<view class="">
				<textarea class="textarea" placeholder="粘贴整段地址，自动识别姓名，电话和地址，例如：小李，16888886888，广东省广州市天河区某某街道某某大厦某某号" :value="text" @blur="onBlur" placeholder-class="placeholder" />
			</view>
			<view class="shibie">
				<button class="shibieBtn" @click="distinguish" >识别</button>
			</view>
			<view style="padding-bottom: 20upx;" v-if="manageType === 'edit' && addressData.default_address_id === false">
				<text>设置为默认地址</text>
				<view class="moren">
					<switch style="transform: scale(.7);" @change="switchChange" color="#EE1D23" :checked="addressData.default" />
				</view>
			</view>
			
			<view class="submit-btn">
				<button class="add-btn" @click="confirm(addressData)">保存</button>
			</view>
			
			<show-modal></show-modal>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	import AddressParse from '@/components/wonday-address-parse/dist/zh-address-parse.min.js'
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				areaList:[],
				allAddData:[],
				themeColor: '#007AFF',
				cityPickerValue: [0, 0, 0],
				text:'',
				addressData: {
					name: '',
					mobile: '',
					addressName: '请选择省市区',
					address: '',
					area: '',
					default: false
				},
				manageType: {},
				form_address:{},
				default_address_id:false
			}
		},
		
		onLoad(option) {
			console.log(option)
			this.getAllAddress()
			let title = '新增收货地址';
			this.addressData.default = false
			if (option.type === 'edit') {
				title = '编辑收货地址'
				this.addressData = JSON.parse(option.data)
				this.default_address_id = true
				if(this.addressData.default_address_id === true){
					this.addressData.default = true
				}else{
					this.addressData.default = false
				}
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			async switchChange(env) {
				if(env.detail.value === true){
					// 确认
					await uniRequest({
						url: '/user/addresses/' + this.addressData.id + '/status/',
						method: 'put',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res)
						if(res.status === 200){
						  this.$api.msg('默认地址设置成功')
						}else{
							this.$api.msg('error')
						}
					}).catch(error => {
						console.log(error.res);
						if(error.res === undefined){
							this.$api.msg('服务器错误');
						}
					})
				}else{
					this.$api.msg('111');
				}
			},
			
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				console.log(e)
				this.addressData.province_id = e.provinceCode
				this.addressData.city_id = e.cityCode
				this.addressData.district_id = e.areaCode
				this.addressData.addressName = e.label;
				this.cityPickerValue = e.value;
			},
			
			onBlur(e) {
				this.text = e.detail.value
			},
			
			async getAllAddress(data){
				await uniRequest({
					url: '/mobile/get/carts/name/all/',
					method: 'get',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					this.allAddData = res.data
				})
			},
			
			// 识别
			distinguish(){
				console.log(this.text)
				const parseResult = AddressParse(this.text, 0)
				console.log(parseResult)
				this.addressData.receiver = parseResult.name
				this.addressData.mobile = parseResult.phone
				this.addressData.addressName = parseResult.province + ' ' + parseResult.city + ' ' + parseResult.area
				this.addressData.place = parseResult.detail
				this.allAddData.forEach(item=>{
					if(item.name === parseResult.province){
						this.addressData.province_id = item.id
						item.subs.forEach(ite=>{
							if(ite.name === parseResult.city){
								this.addressData.city_id = ite.id
								ite.subs.forEach(it=>{
									if(it.name === parseResult.area){
										this.addressData.district_id = it.id
									}
								})
							}
						})
					}
				})
			},
			
			//地图选择地址
			chooseLocation() {
				// 先判断定位权限是否开启
				uni.chooseLocation({
					success: async (data) => {
						console.log(data)
						// #ifdef H5
						 // 先判断定位权限是否开启
						const datass = {
							"N":data.longitude,
							"S":data.latitude
						}
						const ress = await uniRequest.post('/areas/tx/province/areasViews/',datass)
						console.log(ress.data)
						this.addressData.province_id = ress.data.province.id
						this.addressData.city_id = ress.data.city.id
						this.addressData.district_id = ress.data.district.id
						this.addressData.addressName = data.address + ' ' + data.name;
						this.addressData.address = data.address;
						// #endif
						// #ifdef APP-PLUS
						const datas = {
							"N":data.longitude,
							"S":data.latitude
						}
						const res = await uniRequest.post('/areas/gd/province/areasViews/',datas)
						console.log(res.data)
						this.addressData.province_id = res.data.province.id
						this.addressData.city_id = res.data.city.id
						this.addressData.district_id = res.data.district.id
						this.addressData.addressName = data.address + ' ' + data.name;
						this.addressData.address = data.address;
						// #endif
					},fail(e){
						console.log(e)
						this.openSetting()
					}
				})
				 
			},

			//打开授权设置（必须用户点击小程序才能打开授权设置，所以前面加了showModel）
			openSetting(){
			    if (permission.isIOS) {
			        var UIApplication = plus.ios.import("UIApplication");
			        var application2 = UIApplication.sharedApplication();
			        var NSURL2 = plus.ios.import("NSURL");
			        var setting2 = NSURL2.URLWithString("app-settings:");
			        application2.openURL(setting2);
			        plus.ios.deleteObject(setting2);
			        plus.ios.deleteObject(NSURL2);
			        plus.ios.deleteObject(application2);
			    } else {
			        var Intent = plus.android.importClass("android.content.Intent");
			        var Settings = plus.android.importClass("android.provider.Settings");
			        var Uri = plus.android.importClass("android.net.Uri");
			        var mainActivity = plus.android.runtimeMainActivity();
			        var intent = new Intent();
			        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
			        var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
			        intent.setData(uri);
			        mainActivity.startActivity(intent);
			    }
			},
			
			// 修改地址
			async setAddress(content) {
				console.log(content)
				await uniRequest({
					url: '/user/addresses/' + this.addressData.id + '/',
					data: content,
					method: 'put',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
					this.$api.prePage().refreshList(this.addressData, this.manageType);
					this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
					setTimeout(() => {
						uni.navigateBack()
					}, 800)
				}).catch(error => {
				}).catch(error => {
					console.log(error)
				})
			},
			
			// 新增地址
			async getAddress(content){
				this.form_address = {
				  title:this.addressData.receiver,
				  receiver: this.addressData.receiver,
				  province_id: this.addressData.province_id,
				  city_id: this.addressData.city_id,
				  district_id: this.addressData.district_id,
				  place: this.addressData.place,
				  mobile: this.addressData.mobile,
				  addresses:content.addresses,
				  addressName:content.addressName,
				}
				await uniRequest({
					url: '/user/addresses/',
					method: 'post',
					data:this.form_address,
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res)
					if(res.status === 200 || res.status === 201){
						this.$api.msg('地址新增成功')
						//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
						this.$api.prePage().refreshList(this.addressData, this.manageType);
						this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					}else{
						this.$api.msg(res.data.message)
					}
				}).catch(error => {
					console.log(error)
				})
			},

			//提交
			async confirm(data) {
				console.log(data)
				if (!data.receiver) {
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if (!data.addressName) {
					this.$api.msg('请在地图选择所在位置');
					return;
				}
				if (!data.place) {
					this.$api.msg('请填写详细地址信息');
					return;
				}
				this.addressData.address = data.address
				this.addressData.addressName = data.addressName
				this.addressData.receiver = data.receiver
				this.addressData.place = data.place
				this.addressData.title = data.receiver
				
				
				if(this.manageType === 'edit'){
					this.addressData.address = data.address
					this.setAddress(data)
					
				}else if(this.manageType === 'add'){
					this.getAddress(data)
				}
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .uni-input-wrapper{
		font-size: 14px;
	}
	.content {
		width: 100%;
		height: 100%;
		padding: 30upx;
	}
	.wrapper{
		border-radius: 10px;
		padding: 20upx;
		background-color: #fff;
	}
	.textInput{
		display: block;
		height: 70upx;
		line-height: 70upx;
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
			width: 120upx;
			font-size: 30upx;
			color: $font-color-text6;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
			padding-left: 40upx;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $uni-color-hangfeng;
		}
	}
	
	.shibie{
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		margin-top: 30upx;
	}
	
	.moren{
		float: right;
		margin-top: -10upx;
		margin-right: -20upx;
	}
	
	.shibieBtn{
		width: 190upx;
		height: 70upx;
		background: linear-gradient(to right,#EE1D23,#F04023);
		color: #fff;
		border-radius: 20px;
		font-size: 14px;
		line-height: 70upx;
		position: absolute;
		right: 50upx;
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

	.submit-btn{
		width: 88%;
		height: 80upx;
		position: absolute;
		bottom: 80upx;
		.add-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 590upx;
			letter-spacing: 6upx;
			height: 80upx;
			font-size: $font-lg;
			color: #fff;
			text-align: center;
			background : linear-gradient(to right,#EE1D23,#F04023);
			border-radius: 40upx;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.6);
		}
	}
	
	.text{
		width: 100%;
		border-radius: 10px;
		min-height: 220upx;
		font-size: 14px;
		line-height:20px;
		padding: 20px;
	}
	
	.textarea{
		width: 100%;
		border: 1rpx solid #ddd;
		border-radius: 10px;
		min-height: 220upx;
		font-size: 14px;
		line-height:20px;
		padding: 10px;
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
