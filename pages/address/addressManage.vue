<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.receiver" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<view class="input" @tap="chooseCity">  <!-- @click="chooseLocation" -->
				{{addressData.addressName}}
			</view>
			
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b">
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressData.place" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>

		<view class="row default-row" v-if="default_address_id">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.default" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm(addressData)">提交</button>
		<button class="del-btn" @click="condelete(addressData)">删除</button>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				areaList:[],
				themeColor: '#007AFF',
				cityPickerValue: [0, 0, 0],
				addressData: {
					name: '',
					mobile: '',
					addressName: '选择省市区',
					address: '',
					area: '',
					default: false
				},
				manageType: {},
				form_address:{},
				default_address_id:false
			}
		},
		computed:{
			regionName(){
				// 转为字符串
				console.log(this.region)
				return this.region.map(item=>item.name).join(' ')
			}
		},
		onLoad(option) {
			console.log(option)
			/* let that = this;
			let myAmapFun = new amapFile.AMapWX({key:'高德Key'});
			myAmapFun.getRegeo({
			  success: function(data){
				  console.log(data)
				//成功回调
			  },
			  fail: function(info){
				//失败回调
				console.log(info)
			  },
		    }) */
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
			async switchChange(e) {
				console.log(e)
				if(e.detail.value === true){
					const response = await uniRequest({
						url: '/user/addresses/' + this.addressData.id + '/status/',
						method: 'put',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(response => {
						console.log(response)
						/* this.$api.prePage().refreshList(data); */
						if(response.status === 200){
						  this.$api.msg('默认地址设置成功')
						  setTimeout((e) => {
						  	uni.navigateBack()
						  }, 800)
						}else{
							this.$api.msg('error')
						}
					}).catch(error => {
						console.log(error.response);
						if(error.response === undefined){
							this.$api.msg('服务器错误');
						}
					})
				}else{
					this.$api.msg('请至少有一个地址为默认');
					setTimeout(() => {
						uni.navigateBack()
					}, 800)
				}
				this.addressData.default = e.detail;
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
			
			
			async setAddress(content) {
				console.log(content)
				
				const response = await uniRequest({
					url: '/user/addresses/' + this.addressData.id + '/',
					data: content,
					method: 'put',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(response => {
					console.log(response)
				}).catch(error => {
				}).catch(error => {
					console.log(error)
				})
			},
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
					if(res.status === 200){
						this.$api.msg('地址新增成功')
					}else{
						this.$api.msg(res.data.message)
						return
					}
				}).catch(error => {
					console.log(error)
				})
			},

			//提交
			async confirm(data) {
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
				this.addressData.title = data.title
				console.log(this.manageType,this.addressData.title)
				if(this.manageType === 'edit'){
					this.addressData.address = data.address
					this.setAddress(data)
					
				}else if(this.manageType === 'add'){
					this.getAddress(data)
				}
				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				this.$api.prePage().refreshList(this.addressData, this.manageType);
				this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				setTimeout(() => {
					uni.navigateBack()
				}, 800)
			},
			
			// 删除
			async condelete(data){
				const response = await uniRequest({
					url: '/user/addresses/' + this.addressData.id + '/',
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
					this.addresses.splice(index, 1);
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
			width: 120upx;
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
