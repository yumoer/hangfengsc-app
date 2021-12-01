<template>
	<view class="page">
		<view class="header">
			<view class="name">
				行丰银拓科技集团有限公司
			</view>
		</view>
		<view class="wrapper">
			<u-tabs class="tabs" :list="tabs" inactive-color="rgb(102, 102, 102)" active-color="rgb(238, 29, 35)" :bar-width="100" :is-scroll="false" :current="current" @change="change">
			</u-tabs>
			<view class="content" v-if="current === 0">
				<view class="item">
					<view class="title">
						业务范围
					</view>
					<view class="info">
						行丰银拓科技集团自2408年成立以来一直专注于办公物资采购，商务服务以及软件服务三大领域。致力于国家中央机关、政府部门，军队、金融系统，企事业单位，医疗机构，教育机构，卫生系统，公共事业部门等部门的综合服务。服务包括提供系统集成，软件开发，办公物资采购，办公采购方案，个性化定制，劳动用品采购，技术咨询服务等方面的业务。
					</view>
				</view>
				<view class="item">
					<view class="title">
						电商平台
					</view>
					<view class="info">
						目前，采购趋势平台化，系统化，公司把工作做在前边，提前部署，自主研发的电商平台www.hfyt365.com在2012年正式上线，现平台央采、政采、军队、央视等各部门通过专属通道已实现直接下单，实现一键下达，提高效率，方便快捷。
						<view>我们坚信，在未来的发展中我们以科学的管理，创新的理念，完善的服务，充分发挥公司的各方面资源优势，提升行业影响力，必将拥有不可撼动的行业地位。</view>
					</view>
				</view>
				<view class="item">
					<view class="title">
						商城简介
					</view>
					<view class="info">
						2012年公司组织建设了一支专业电商团队，行丰银拓商城于2012年9月上线运营，是业内较早成立的电商企业，多年来一直注重商城的建设和发展，现凭借专业的电商开发运营团队，已成为办公用品电商运营服务行业标杆之一。未来，行丰银拓商城继续专注于办公用品行业电商运营，努力打造成中国电商服务标杆企业，为客户提供优质的一站式网上采购服务。
						<view>行丰银拓办公商城旨在用心打造中国做超值办公用品，耗材、设备、电子、网络、数码产品的交易平台，根据行业终端客户的需求，我们更注重日常网上商城的运营及维护，全面贴近实际需求。电子商务网站的完善，需要长时间的运营维护、更迭，才能更好的满足行业的发展所需。我公司自2016年3月起自主研发了一套商城系统，同时拥有PC、手机、微信、iPad设备购物中，均可实现良好的购物体验。而且会员、商品、订单等信息同步更新，不同设备间完美切换。</view>
						<view>行丰银拓于2012年开始大力发展和推进电子商务，以公司独立开发电子商城为核心拓展全国市场。经过几年的发展，线上电子商城已经初具规模，为了打通线上线下，实现O2O闭环，行丰银拓采用了客户线上商城预定线下落地服务的模式。目前，已经在全国建立了多个分支机构及线下落地服务商，覆盖全国大部分城市。</view>
					</view>
				</view>
				<view class="item">
					<view class="title">
						加入条件
					</view>
					<view class="infoImage">
						<u-row :gutter="10" justify="space-between">
							<u-col span="6">
								<image style="width: 172px;height: 90px;margin: 0 -5px;" src="http://47.94.106.106:8888/group1/M00/53/37/rBHxiGEHn_GAVU1rAACM00htjEY3967838" mode=""></image>					
							</u-col>					
							<u-col span="6">
								<image style="width: 172px;height: 90px;margin: 0 5px;" src="http://47.94.106.106:8888/group1/M00/53/37/rBHxiGEHn_aAAtWnAAC_kLg-nRU2033607" mode=""></image>					
							</u-col>
							<u-col span="6">
								<image style="width: 172px;height: 90px;margin: 0 -5px;" src="http://47.94.106.106:8888/group1/M00/53/37/rBHxiGEHn_yAfM_lAADJOQpTzug3100884" mode=""></image>					
							</u-col>
							<u-col span="6">
								<image style="width: 172px;height: 90px;margin: 0 5px;" src="http://47.94.106.106:8888/group1/M00/53/37/rBHxiGEHoACAVaGQAADMrtC30LI2255526" mode=""></image>
							</u-col>
						</u-row>
					</view>
				</view>
				<view class="item">
					<view class="title">
						提供价值
					</view>
					<view class="infoImage">
						<u-row gutter="20" justify="space-between">
							<u-col span="6">
								<image style="width: 38upx;height: 38upx;position: absolute;" src="http://47.94.106.106:8888/group1/M00/53/38/rBHxiGEHoGWAVh9lAAACGMtiVXQ5766728" mode=""></image>
								<text class="" style="padding-left: 60upx;">
									统一标识
								</text>
							</u-col>
							<u-col span="6">
								<image style="width: 38upx;height: 38upx;position: absolute;" src="http://47.94.106.106:8888/group1/M00/53/38/rBHxiGEHoIGAKQOGAAAEhZvboUQ9938208" mode=""></image>
								<text class="" style="padding-left: 60upx;">
									品牌授权
								</text>
							</u-col>
							<u-col span="6">
								<image style="width: 38upx;height: 38upx;position: absolute;" src="http://47.94.106.106:8888/group1/M00/53/38/rBHxiGEHoHCAUPZ8AAAB9kgos-A6482793" mode=""></image>
								<text class="" style="padding-left: 60upx;">
									统一负责发票
								</text>
							</u-col>
							<u-col span="6">
								<image style="width: 38upx;height: 38upx;position: absolute;" src="http://47.94.106.106:8888/group1/M00/53/38/rBHxiGEHoH2AfWBfAAADWFJh8RM5742584" mode=""></image>
								<text class="" style="padding-left: 60upx;">
									统一展业资料
								</text>
							</u-col>
							<u-col span="6">
								<image style="width: 38upx;height: 38upx;position: absolute;" src="http://47.94.106.106:8888/group1/M00/53/38/rBHxiGEHoGuAeXz4AAACgrMkG3k9077319" mode=""></image>
								<text class="" style="padding-left: 60upx;">
									统一媒体采购
								</text>
							</u-col>
							<u-col span="6">
								<image style="width: 38upx;height: 38upx;position: absolute;" src="http://47.94.106.106:8888/group1/M00/53/38/rBHxiGEHoHeAENU8AAAC9sjcB_Q4610382" mode=""></image>
								<text class="" style="padding-left: 60upx;">
									培训及会议
								</text>
							</u-col>
						</u-row>
					</view>
				</view>
			</view>
			<view class="content" v-if="current === 1">
				<u-form :model="values" ref="uForm" label-width="240">
						<u-form-item label="用户名" prop="name.user">
							<u-input v-model="values.user" input-align="right" placeholder="请输入用户名"/>
						</u-form-item>
						<u-form-item label="密码" :label-width="240" prop="pwd">
							<u-input v-model="values.pwd" type="password" :passwordIcon="true" input-align="right" placeholder="请输入密码"/>
						</u-form-item>
						<u-form-item label="确认密码" :label-width="240" prop="pwd2">
							<u-input v-model="values.pwd2" input-align="right" type="password" placeholder="请输入确认密码"/>
							</u-form-item>
						<u-form-item label="企业全称" :label-width="240" prop="company">
							<u-input v-model="values.company" input-align="right" placeholder="请输入企业全称"/>
						</u-form-item>
						<u-form-item label="企业执照注册号" :label-width="210" prop="zhucehao">
							<u-input v-model="values.zhucehao" input-align="right" placeholder="请输入企业执照注册号"/>
						</u-form-item>
						<u-form-item label="营业执照复印件" style="height: 200upx;line-height: 200upx;" :label-width="210" prop="zhizhao">
							<u-upload :width="120" :height="120" ref="uUpload" action="#" :auto-upload="false" upload-text="" :maxCount="1" @on-choose-complete="afterRead1" :file-list="zhizhao" style="position: absolute;right: 0;"></u-upload>
						</u-form-item>
						<u-form-item label="注册时间" :label-width="240" prop="zhuce_date">
							<u-input v-model="values.zhuce_date" input-align="right" placeholder="请输入注册时间"/>
						</u-form-item>
						<u-form-item label="注册期限(年)" :label-width="240" prop="qixian">
							<u-input v-model="values.qixian" input-align="right" placeholder="请输入注册期限(年)"/>
						</u-form-item>
						<u-form-item label="注册资金(万元)" :label-width="240" prop="zijin">
							<u-input v-model="values.zijin" input-align="right" placeholder="请输入注册资金(万元)"/>
						</u-form-item>
						<u-form-item label="注册地址" :label-width="240" prop="address">
							<u-input v-model="values.address" input-align="right" placeholder="请输入注册地址"/>
						</u-form-item>
						<u-form-item label="法人姓名" :label-width="240" prop="boss">
							<u-input v-model="values.boss" input-align="right" placeholder="请输入法人姓名"/>
						</u-form-item>
						<u-form-item label="法人身份证复印件" style="height: 200upx;line-height: 200upx;" :label-width="240" prop="boss_id">
							<u-upload :width="120" :height="120" ref="uUpload" action="#" :auto-upload="false" upload-text="" :maxCount="1" @on-choose-complete="afterRead2" :file-list="boss_id" style="position: absolute;right: 0;"></u-upload>
						</u-form-item>
						<u-form-item label="办公地址" :label-width="240" prop="work_place">
							<u-input v-model="values.work_place" input-align="right" placeholder="请输入办公地址"/>
						</u-form-item>
						<u-form-item label="地址证明复印件" style="height: 200upx;line-height: 200upx;" :label-width="240" prop="work_id">
							<u-upload :width="120" :height="120" ref="uUpload" action="#" :auto-upload="false" upload-text="" :maxCount="1" @on-choose-complete="afterRead3" :file-list="work_id" style="position: absolute;right: 0;"></u-upload>
						</u-form-item>
						<u-form-item label="申请区域" :label-width="240" prop="area">
							<u-input v-model="values.area" input-align="right" placeholder="请输入申请区域"/>
						</u-form-item>
						<u-form-item label="申请姓名" :label-width="240" prop="shengqingren">
							<u-input v-model="values.shengqingren" input-align="right" placeholder="请输入申请姓名"/>
						</u-form-item>
						<u-form-item label="申请人身份证复印件" style="height: 200upx;line-height: 200upx;" :label-width="270" prop="shengqingren_id">
							<u-upload :width="120" :height="120" ref="uUpload" action="#" :auto-upload="false" upload-text="" :maxCount="1" @on-choose-complete="afterRead4" :file-list="shengqingren_id" style="position: absolute;right: 0;"></u-upload>
						</u-form-item>
						<u-form-item label="申请人联系方式" :label-width="240" prop="shengqingren_tel">
							<u-input v-model="values.shengqingren_tel" input-align="right" placeholder="请输入申请人联系方式"/>
						</u-form-item>
						<u-form-item label="申请人电子邮箱" :label-width="240" prop="shengqingren_email">
							<u-input v-model="values.shengqingren_email" input-align="right" placeholder="请输入申请人电子邮箱"/>
						</u-form-item>
						<u-form-item label="仓储地址" :label-width="240" prop="store_address">
							<u-input v-model="values.store_address" input-align="right" placeholder="请输入仓储地址"/>
						</u-form-item>
						<u-form-item label="仓储房产复印件" style="height: 200upx;line-height: 200upx;" :label-width="240" prop="store_id">
							<u-upload :width="120" :height="120" ref="uUpload" action="#" :auto-upload="false" upload-text="" :maxCount="1" @on-choose-complete="afterRead5" :file-list="store_id" style="position: absolute;right: 0;"></u-upload>
						</u-form-item>
						<u-checkbox-group
						            style="margin: 20px 0;"
						            placement="column"
						        >
								<u-checkbox
									@change="checkboxChange"
									v-model="checked"
									activeColor="#ee1d23"
								></u-checkbox>
								同意行丰银拓商城用户使用协议
						        </u-checkbox-group>
						<u-button style="border-radius: 40upx;background:linear-gradient(to right,#EE1D23 0%,#F04023 100%);color: #fff;width: 590upx;" @click="registBtn(values)">注册服务商</u-button>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				tabs: [{name:'行丰公司简介'},{name:'注册落地服务商'}],
				current:0,
				formName: '合作伙伴',
				zhizhao:[],
				boss_id:[],
				work_id:[],
				shengqingren_id:[],
				store_id:[],
				checkboxList:[{name:'同意行丰银拓商城用户使用协议'}],
				checked:true,
				values: {
					user: '', // 用户名
					pwd: '', // 密码
					pwd2: '', // 确认密码
					company: '', // 企业全称
					zhucehao: '', // 企业执照注册号
					zhizhao: [], // 上传企业营业执照复印件
					zhuce_date: '', // 注册时间
					qixian: '', // 注册期限(年)
					zijin: '', // 注册资金(万元)
					address: '', // 注册地址
					boss: '', // 法人姓名
					boss_id: '', // 上传企业法人身份证复印件
					work_place: '', // 办公地址
					work_id: '', // 上传办公地址房租或房产证明复印件
					area: '', // 申请区域
					shengqingren: '', // 申请人姓名
					shengqingren_id: '', // 上传申请人身份证复印件
					shengqingren_tel: '', // 申请人联系方式
					shengqingren_email: '', // 申请人电子信箱
					shengqingren_email: '', // 仓储地址
					store_address:'', //仓储地址
					store_id:'' //仓储房产证复印件	
				},
				rules: {
					'name.user': [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur'
					}],
					pwd: [{
						required: true,
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'blur'
					}],
					// 手机号
					shengqingren_tel: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					]
				},
			}
		},
		
		methods: {
			change(value){
				console.log(value)
				this.current = value
			},
			
			// 选中任一radio时，由radio-group触发
			checkboxChange(e) {
				console.log(e);
				this.checked = e.value
			},
			
			afterRead1(event){
				console.log(event)
				this.zhizhao = event
				this.values.zhizhao = event[0].file
			},
			
			afterRead2(event){
				console.log(event)
				this.boss_id = event
				this.values.boss_id = event[0].file
			},
			
			afterRead3(event){
				console.log(event)
				this.work_id = event
				this.values.work_id = event[0].file
			},
			
			afterRead4(event){
				console.log(event)
				this.shengqingren_id = event
				this.values.shengqingren_id = event[0].file
			},
			
			afterRead5(event){
				console.log(event)
				this.store_id = event
				this.values.store_id = event[0].file
			},
			
			registBtn(data){
				if(this.checked){
					this.$refs.uForm.validate(valid => {
						if (valid) {
							console.log('验证通过');
							console.log(data)
							// uni.uploadFile({
							// 	url:'http://api.hfyt365.com/landservice/login/',
							// 	name:'file',
							// 	formData: data,
							// 	success: (res) => {
							// 		this.$api.msg('提交成功')
							// 		this.values = {}
							// 		this.zhizhao = []
							// 		this.work_id = []
							// 		this.store_id = []
							// 		this.shengqingren_id = []
							// 		this.boss_id = []
							// 	},
							// 	fail:(error) => {
							// 		console.log(error)
							// 	}
							// })
						} else {
							console.log('验证失败');
						}
					});
					
				}else{
					this.$api.msg('请同意用户使用协议')
				}
				
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			console.log(this.$refs.uForm)
			// this.$refs.uForm.setRules(this.rules);
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100%;
		height: 100%;
		.header{
			width: 100%;
			height: 276px;
			background: url(http://47.94.106.106:8888/group1/M00/53/31/rBHxiGEHi3uAeyAFAAuOrZw4oM80123697) no-repeat top center / 100%;
			.name{
				color: rgba(17, 17, 17, 1);
				font-size: 32upx;
				font-weight: bold;
				padding-top: 300upx;
				padding-left: 60upx;
			}
		}
		.wrapper{
			width: 100%;
			height: 100%;
			background: #fff;
			border-radius: 70upx 70upx 0 0;
			margin-top: -160upx;
			.tabs{
				border-radius: 70upx 70upx 0 0;
				padding: 30upx 0 0 0;
			}
			.content{
				padding: 30upx;
				.item{
					padding-bottom: 45upx;
					.title{
						color: rgb(51, 51, 51);
						font-size: 32upx;
						font-weight: bold;
						letter-spacing: 6upx;
					}
					.infoImage{
						color: #666666;
						font-size: 28upx;
						view{
							margin-top: 27upx;
							padding: 0!important;
						}
					}
					.info{
						color: #666666;
						font-size: 28upx;
						padding-top: 30upx;
						view{
							margin-top: 27upx;
						}
					}
				}
			}
		}
	}
</style>
