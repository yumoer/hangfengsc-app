<template>
	<view class="page">
		<view class="head">
			<u-tabs :list="list" active-color='#ee1d23' bar-height="6" bar-width="100" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="" v-if="current === 0">
			<view class="content">
				<u-form :model="values" ref="uForm">
					<u-form-item label="用户名" :label-width="240" prop="user">
						<u-input v-model="values.username" input-align="right" placeholder="请输入用户名"/>
					</u-form-item>
					<u-form-item label="手机号" :label-width="240" prop="user">
						<u-input maxlength='11' v-model="values.mobile" input-align="right" placeholder="请输入手机号"/>
					</u-form-item>
					<u-form-item label="维修地址" :label-width="240" prop="user">
						<u-input v-model="values.address" input-align="right" placeholder="请输入维修地址"/>
					</u-form-item>
					<u-form-item label="设备名称" :label-width="240" prop="user">
						<u-input v-model="values.devicename" input-align="right" placeholder="请输入设备名称"/>
					</u-form-item>
					<u-form-item label="规格型号" :label-width="240" prop="user">
						<u-input v-model="values.model" input-align="right" placeholder="请输入规格型号"/>
					</u-form-item>
					<u-form-item label="技术服务类型" :label-width="240" prop="service_type" borderBottom  ref="item1">
						<u-input
							v-model="values.service_type"
							@click="showOpen1"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择"
							input-align="right"
						></u-input>
						<u-icon
							slot="right"
							name="arrow-right"
						></u-icon>
					</u-form-item>
					<u-form-item label="仪器品牌" :label-width="240" prop="brand">
						<u-input
							v-model="values.brand"
							@click="showOpen2"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择"
							input-align="right"
						></u-input>
						<u-icon
							slot="right"
							name="arrow-right"
						></u-icon>
					</u-form-item>
					<u-form-item label="问题描述" :label-width="240" prop="fault_describe">
						<u-input
							v-model="values.fault_describe"
							@click="showOpen3"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择"
							input-align="right"
						></u-input>
						<u-icon
							slot="right"
							name="arrow-right"
						></u-icon>
					</u-form-item>
					<u-form-item label="备注" :label-width="240" prop="user">
						<u-input v-model="values.remarks" input-align="right" placeholder="请输入备注"/>
					</u-form-item>
				</u-form>
			</view>
			<u-button v-if="current === 0" @click="toOrder" class="confirmBtn">提交订单</u-button>
			<u-picker v-model="show1" mode="selector" title='技术服务类型' :range='actions1' confirm-color="#000" @confirm='confirm1'></u-picker>
			<u-picker v-model="show2" mode="selector" title='仪器品牌' :range='actions2' confirm-color="#000" @confirm='confirm2'></u-picker>
			<u-picker v-model="show3" mode="selector" title='问题描述' :range='actions3' confirm-color="#000" @confirm='confirm3'></u-picker>
		</view>
		
		<view v-if="current === 1">
			<view class="content">
				<view class="">
					<u-form :model="values" ref="uForm">
						<u-form-item label="用户名" :label-width="240" prop="username">
							<u-input v-model="values.username" input-align="right" placeholder="请输入用户名"/>
						</u-form-item>
						<u-form-item label="手机号" maxlength='11' :label-width="240" prop="mobile">
							<u-input v-model="values.mobile" input-align="right" placeholder="请输入手机号"/>
						</u-form-item>
					</u-form>
					<u-button @click="todeviceOrder"  class="confirmBtn" style="margin: 30upx;">查询维修单</u-button>
				</view>
			</view>
			<view class="content" v-for='(item,index) in orderList' :key='index'>
				<view class="">
					<u-form :model="values" ref="uForm" :border='true'>
						<u-form-item label="用户 :" maxlength='11' :label-width="180" prop="phone">
							<view class="">{{item.username}}</view>
						</u-form-item>
						<u-form-item label="维修号 :" maxlength='11' :label-width="180" prop="phone">
							<view class="">{{item.id}}</view>
						</u-form-item>
						<u-form-item label="维修地址 :" maxlength='11' :label-width="180" prop="phone">
							<view class="">{{item.server_address}}</view>
						</u-form-item>
						<u-form-item label="品牌 :" maxlength='11' :label-width="180" prop="phone">
							<view class="">{{item.brand}}</view>
						</u-form-item>
						<u-form-item label="设备 :" maxlength='11' :label-width="180" prop="phone">
							<view class="">{{item.equipment}}</view>
						</u-form-item>
						<u-form-item label="型号 :" maxlength='11' :label-width="180" prop="phone">
							<view class="">{{item.equipment_model}}</view>
						</u-form-item>
						<u-form-item label="状态 :" maxlength='11' :label-width="180" prop="phone">
							<view class="">/</view>
						</u-form-item>
						<u-form-item label="问题描述 :" maxlength='11' :label-width="180" prop="phone">
							<view class="">{{item.fault_describe}}</view>
						</u-form-item>
						<u-form-item label="备注 :" maxlength='11' :label-width="180" prop="phone">
							<view class="">{{item.remarks}}</view>
						</u-form-item>
					</u-form>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				formName:'维修服务',
				list: [{
					name: '申请维修'
				}, {
					name: '查询维修记录'
				}],
				model1: {
					userInfo: {
						name: 'uView UI',
						sex: '',
						birthday: ''
					},
					radiovalue1: '苹果',
					checkboxValue1: [],
					intro: '',
					code: ''
				},
				
				show1:false,
				show2:false,
				show3:false,
				current: 0,
				ifphone:true,
				lookOrder:[],
				orderList:[],
				values:{
					username:'', // 用户名
					mobile:'', // 手机号
					phone:'', // 查询手机号
					devicename:'', // 设备名称
					model:'', // 规格型号
					address:'', // 维修地址
					fault_describe:'', // 问题描述
					brand:'', // 品牌
					service_type:'' // 技术服务类型
				},
				actions1: ['打印机维修','一体机维修','绘图仪维修', '晒鼓加粉','日常保养'],
				actions2: ['得力','惠普','爱普生','兄弟','佳能','理光','联想','东芝','夏普','三星','松下','奔图','得实','富士通','小米','华为','震旦','斯图','六品堂','天文','正彩'],
				actions3: ['打印机卡纸或不能走纸','打印机输出空白纸','打印纸输出变黑','打印字符不全或字符不清晰','打印时字迹一边清晰而另一边不清晰','打印头移动受阻，停下长鸣或在原处震动','更换新墨盒后“墨尽灯”仍亮','无法打印','其他问题'],
				
			};
		},
		onReady() {
		},
		methods:{
			change(index) {
				this.current = index;
				this.values = {}
			},
			showOpen1(){
				this.show1 = true;
			},
			
			showOpen2(){
				this.show2 = true;
			},
			
			showOpen3(){
				this.show3 = true;
			},
			
			confirm1(e){
				this.values.service_type = this.actions1[e[0]]
			},
			
			confirm2(e){
				this.values.brand = this.actions2[e[0]]
			},
			
			confirm3(e){
				this.values.fault_describe = this.actions3[e[0]]
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
				
				const sendData = {
					'username': this.values.username,
					'mobile':this.values.mobile,
					'server_address': this.values.address,
					'fault_describe': this.values.fault_describe,
					'brand':this.values.brand,
					'equipment':this.values.devicename,
					'service_type': this.values.service_type,
					'equipment_model':this.values.model,
					'remarks':this.values.remarks,
				}
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
				console.log(this.values.mobile)
				const Reg = RegExp(/^1[34578]\d{9}$/)
				if(this.values.mobile === ''){
					this.$api.msg('手机号不能为空')
				}else if(!Reg.test(this.values.mobile)){
					this.$api.msg('手机号格式错误')
				}else{
					let query = {username:this.values.username,mobile:this.values.mobile}
					await uniRequest.get('service/get_order/',{params:query}).then(res=>{
						console.log(res)
						if(res.status === 200){
							this.ifphone = false
							this.orderList = res.data
							res.data.forEach(async ele=>{
								console.log(ele)
								// await uniRequest.get('service/pull_order/'+ele.id,).then(ress=>{
								// 	console.log(ress)
								// 	this.lookOrder.push(ress.data)
								// })
							})
							
						}
					})
				}
				
			}	
		}
	}
</script>

<style lang="scss">
	.page{
		width: 100%;
		height: 100%;
		.head{
			
		}
		.content{
			height: 100%;
			background-color: #FFFFFF;
			margin: 30upx;
			padding: 0 20upx;
			border-radius: 20upx;
		}
		.confirmBtn{
			width: 590upx;
			height: 80upx;
			background: linear-gradient(to right,#EE1D23 0%,#F04023 100%);
			color: #FFFFFF;
			border-radius: 40upx;
		}
	}
</style>
