<template>
	<view id="wxfw">
		<view class="img">
			<image style="width: 100%;height: 150px;" src="/static/img/weixiu_banner.jpg" mode=""></image>
		</view>
		<liuyuno-tabs :tabData="tabs" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		<view class="" v-if="defaultIndex === 0">
			<QSInput :name="formName" variableName="username" title="姓名" required v-model="values.username"></QSInput>
			<QSInput :name="formName" variableName="mobile" title="手机号" required v-model="values.mobile"></QSInput>
			<QSInput :name="formName" variableName="address " title="维修地址" required v-model="values.address"></QSInput>
			<QSInput :name="formName" variableName="devicename" title="设备名称" v-model="values.devicename"></QSInput>
			<QSInput :name="formName" variableName="model" title="规格型号" v-model="values.model"></QSInput>
			
			<QSPickerCustom ref="pickerCustom1" :name="formName" variableName="remarks" title="技术服务类型" v-model="values.remarks"/>
			<QSPickerCustom ref="pickerCustom2" :name="formName" variableName="brand" title="仪器品牌" v-model="values.brand"/>
			<QSPickerCustom ref="pickerCustom3" :name="formName" variableName="fault_describe" title="问题描述" v-model="values.fault_describe"/>
			<button class="confirm-btn" @click="toOrder">提交订单</button>
		</view>
		<view class="" v-if="defaultIndex === 1">
			<view class="" v-if="ifphone">
				<QSInput :name="formName" variableName="phone" title="手机号" required v-model="values.phone"></QSInput>
				<button class="confirm-btn" @click="todeviceOrder">查询维修单</button>
			</view>
			<view style="background: #fff;padding:2upx 0;" v-else >
				<view v-for="(order,index) in lookOrder" :key="index" style="margin: 20upx;background: #ddd;border-radius: 40upx;">
					<QSInput :name="formName" variableName="id" title="维修号" disabled v-model="order.id"></QSInput>
					<QSInput :name="formName" variableName="username" title="姓名" disabled v-model="order.username"></QSInput>
					<QSInput :name="formName" variableName="mobile" maxLength="11" title="手机号" disabled v-model="order.mobile"></QSInput>
					<QSInput :name="formName" variableName="service_address" title="维修地址" disabled v-model="order.service_address"></QSInput>
					<QSInput :name="formName" variableName="remarks" title="状态" disabled v-model="order.order_state"></QSInput>
					<QSInput :name="formName" variableName="fault_describe" title="问题描述" disabled v-model="order.fault_describe" if="order.fault_describe === ''"></QSInput>
					
					<QSInput :name="formName" variableName="create_time" title="创建时间" disabled v-model="order.create_time.split('T')[0] + ' ' + order.create_time.split('T')[1].split('.')[0]"></QSInput>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				formName:'维修服务',
				tabs: ['申请维修','查询维修记录'],
				defaultIndex:0,
				ifphone:true,
				lookOrder:[],
				values:{
					username:'', // 用户名
					mobile:'', // 手机号
					phone:'', // 查询手机号
					devicename:'', // 设备名称
					model:'', // 规格型号
					address:'', // 维修地址
					fault_describe:'', // 问题描述
					brand:'', // 品牌
					remarks:'' // 技术服务类型
				},
				actions1: [['打印机维修','一体机维修','绘图仪维修', '晒鼓加粉','日常保养']],
				actions2: [['得力','惠普','爱普生','兄弟','佳能','理光','联想','东芝','夏普','三星','松下','奔图','得实','富士通','小米','华为','震旦','斯图','六品堂','天文','正彩']],
				actions3: [['打印机卡纸或不能走纸','打印机输出空白纸','打印纸输出变黑','打印字符不全或字符不清晰','打印时字迹一边清晰而另一边不清晰','打印头移动受阻，停下长鸣或在原处震动','更换新墨盒后“墨尽灯”仍亮','无法打印','其他问题']],
				
			};
		},
		onReady() {
			this.setPickerData();
		},
		methods:{
			tabClick(value){
				console.log(value)
				this.defaultIndex = value
			},
			getCode(){
				this.nCode = QSApp.sendSMS(this.values.phoneNum);
				console.log('nCode-Type:' + (typeof this.nCode));
				this.$refs.code.startCode();
			},
			setPickerData() {
				const data1 = this.actions1
				const data2 = this.actions2
				const data3 = this.actions3
				this.setPickerDataFc('pickerCustom1', data1);
				this.setPickerDataFc('pickerCustom2', data2);
				this.setPickerDataFc('pickerCustom3', data3);
			},
			setPickerDataFc(name, data) {
				console.log(name, data)
				console.log('准备 调用setData');
				this.$refs[name].setData(data)
			},
			
			async toOrder(){
				if(this.values.username === ''){
					this.$api.msg('请输入姓名')
					return
				}else if(this.values.mobile === ''){
					this.$api.msg('请输入手机号')
					return
				}else if(this.values.address === ''){
					this.$api.msg('请输入维修地址')
					return
				}
				
				console.log(this.values.remarks)
				if(this.values.remarks !== ''){
					this.values.remarks = this.values.remarks.data[0]
				}else if(this.values.fault_describe !== ''){
					this.values.fault_describe = this.values.fault_describe.data[0]
				}else if(this.values.brand !== ''){
					this.values.brand = this.values.brand.data[0]
				}
				const sendData = {
					'username': this.values.username,
					'mobile':this.values.mobile,
					'service_address': this.values.address,
					'fault_describe': this.values.fault_describe,
					'brand':this.values.brand,
					'equipment':this.values.devicename,
					'remarks': this.values.remarks,
					'equipment_model':this.values.model,
				}
				console.log(sendData)
				await uniRequest.post('/service/create_order/',sendData).then(res=>{
					console.log(res)
					if(res.status === 201){
						this.$api.msg('提交成功')
						setTimeout(function(){
							uni.redirectTo({
								url:'/pages/index/subject/wxfw/wxfw'
							});
						},500)
						
					}
				})
				
			},
			
			// 查询维修单
			async todeviceOrder(){
				console.log(this.values.phone)
				const Reg = RegExp(/^1[34578]\d{9}$/)
				if(this.values.phone === ''){
					this.$api.msg('手机号不能为空')
				}else if(!Reg.test(this.values.phone)){
					this.$api.msg('手机号格式错误')
				}else{
					await uniRequest.get('service/get_order/'+this.values.phone,).then(res=>{
						console.log(res)
						if(res.status === 200){
							this.ifphone = false
							res.data.forEach(async ele=>{
								console.log(ele)
								await uniRequest.get('service/pull_order/'+ele.id,).then(ress=>{
									console.log(ress)
									this.lookOrder.push(ress.data)
								})
							})
							
						}
					})
				}
				
			}	
		}
	}
</script>

<style lang="scss">
.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		color: #fff;
		background: rgb(250, 67, 106);
		font-size: $font-lg;
		margin-bottom: 40upx;
		&:after{
			border-radius: 100px;
		}
	}
</style>
