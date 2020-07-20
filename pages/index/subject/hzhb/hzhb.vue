<template>
	<view>
		<liuyuno-tabs :tabData="tabs" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		<view class="" v-if="defaultIndex === 0">
			<image style="width: 100%;height: 400upx;" src="/static/fuwushang/banner.jpg" mode=""></image>
			<view style="padding: 10px">
				<view style="margin: 20px 0;font-size: 32upx;color: #333;line-height: 50upx;">
					<image style="width: 100%;height: 200upx;" src="/static/fuwushang/company.jpg" mode=""></image>
					<p style="text-indent: 2em;">北京行丰银拓科技有限公司位于北京市大兴区星光影视园，自2008年成立以来一 直专注于办公物资采购，商务服务以及软件服务三大领域。致力于中央国家机关、政府部门，军队，金融系统、企事业单位、医疗机构、教育机构、卫生系统、公共事业部门等部门的综合服务。服务包括提供系统集成、软件开发、办公物资采购、办公采购方案，个性化定制、劳保用品采购、技术咨询服务等方面的业务。</p>
					<p style="text-indent: 2em;">目前，采购趋势平台化，系统化，公司把工作做在前边，提前部署，自主研发的电商平台www. hfyt365. com在2012年正式上线，现平台央采、政采、军队、央视等各部门各单位通过专属通道已实现直接下单，实现一键下达，提高效率，方便快捷。</p>
					<p style="text-indent: 2em;">我们坚信，在未来的发展中我们以科学的管理，创新的理念，完善的服务，充分发挥公司的各方面资源优势，提升行业影响力，必将拥有不可撼动的行业地位。</p>
				</view>
				<view style="margin: 20px 0;font-size:32upx;color: #333;line-height: 50upx;" >
					<image style="width: 100%;height: 500upx;" src="/static/fuwushang/fenbu.jpg" mode=""></image>
					<p style="text-indent: 2em;">2012年公司组织建设了一支专业的电商团队，行丰银拓商城于2012年9月上线运营，是业内较早成立的电商企业，多年来一直注重商城的建设及发展，现凭借专业的电商开发运营团队，已成为办公用品电商运营服务行业标杆之-。未来，行丰银拓商城继续专注于办公用品行业电商运营，努力打造成中国电商服务标杆企业，为客户提供优质的一一站式网上采购服务。</p>
					<p style="text-indent: 2em;">
					  行丰银拓办公商城旨在用心打造中国最超值办公用品、耗材、设备、电子、网络、数码产品的交易平台，根据行业終端客户的需求，我们更注重日常网上商城的运营及维护，全面贴近实际需求。电子商务网站的完善，需要长时间的用心运营维护、更迭，才能更好的满足行业的发展所需。我公司自2016年3月起自主研发了一套商城系统，同时拥有PC、手机、微信端的购物网站，客户在使用PC、手机，微信、pad设备购物中，均可实现良好的购物体验。而且会员、商品、订单等信息同步更新，不同设备间完美切换。
					</p>
					<p style="text-indent: 2em;">行丰银拓于2012年开始大力发展和推进电子商务，以公司独立开发电子商城为核心拓展全国市场。经过几年的发展，线上电子商城已经初具规模，为了打通线上线下，实现020闭环，行丰银拓采用了客户线上商城预订，线下落地服务的模式。目前，已经在全国建立了多个分支机构及线下落地服务商，覆盖全国大部分城市。</p>
				</view>
				<view style="margin: 20px 0">
					<image style="width: 100%;height: 200upx;" src="/static/fuwushang/join.jpg" mode=""></image>
				</view>
				<view style="margin: 20px 0">
					<image style="width: 100%;height: 200upx;" src="/static/fuwushang/value.jpg" mode=""></image>
				</view>
			</view>
		</view> 
		<view class="" v-if="defaultIndex === 1">
			<QSInput :name="formName" variableName="username" title="用户名" :titleFlex="0.5" required v-model="values.username"></QSInput>
			<QSInput :name="formName" variableName="password" title="密码" :titleFlex="0.5" required v-model="values.password"></QSInput>
			<QSInput :name="formName" variableName="password2" title="确认密码" required v-model="values.password2"></QSInput>
			<QSInput :name="formName" variableName="companyName" title="企业全称" required v-model="values.companyName"></QSInput>
			<QSInput :name="formName" variableName="companyCode" title="企业执照注册号" required v-model="values.companyCode"></QSInput>
			<!-- infinitePics -->
			<QSInfinitePics :name="formName" variableName="companyCodeTextImg" title="营业执照复印件" required v-model="values.companyCodeTextImg"></QSInfinitePics>
			<QSPickerDate :name="formName" variableName="companyTime" title="注册时间" required v-model="values.companyTime"></QSPickerDate>
			<QSInput :name="formName" variableName="companyYear" title="注册期限(年)" required v-model="values.companyYear"></QSInput>
			<QSInput :name="formName" variableName="companyMoney" title="注册资金(万元)" required v-model="values.companyMoney"></QSInput>
			<QSInput :name="formName" variableName="companyAddress" title="注册地址" required v-model="values.companyAddress"></QSInput>
			<QSInput :name="formName" variableName="companyUser" title="法人姓名" required v-model="values.companyUser"></QSInput>
			<QSInfinitePics :name="formName" variableName="companyUserTextImg" title="法人身份证复印件" required v-model="values.companyUserTextImg"></QSInfinitePics>
			<QSInput :name="formName" variableName="companyOfficeArea" title="办公地址" required v-model="values.companyOfficeArea" ></QSInput>
			<QSInfinitePics :name="formName" variableName="companyOfficeCopyImg" title="地址证明复印件" required v-model="values.companyOfficeCopyImg"></QSInfinitePics>
			<QSInput :name="formName" variableName="companyAppliedArea" title="申请区域" required v-model="values.companyAppliedArea"></QSInput>
			<QSInput :name="formName" variableName="companyAppliedName" title="申请姓名" required v-model="values.companyAppliedName"></QSInput>
			<QSInfinitePics :name="formName" variableName="companyAppliedCopyImg" title="申请人身份复印件" required v-model="values.companyAppliedCopyImg"></QSInfinitePics>
			<QSInput :name="formName" variableName="companyAppliedPhone" title="申请人联系方式" required v-model="values.companyAppliedPhone"></QSInput>
			<QSInput :name="formName" variableName="companyAppliedEmail" title="申请人电子邮箱" required v-model="values.companyAppliedEmail"></QSInput>
			<QSInput :name="formName" variableName="companyWarehouseArea" title="仓储地址" required v-model="values.companyWarehouseArea"></QSInput>
			<QSInfinitePics :name="formName" variableName="companyWarehouseAreaCopyImg" title="仓储房产复印件" required v-model="values.companyWarehouseAreaCopyImg"></QSInfinitePics>
			
			<view class="forget-section" style="padding: 10px 15px;">
				<view class="b-b" >
					<label class="radio">
						<radio value="" color="#fa436a" :checked='checked' />
						</radio>
					</label>
					<text style="text-align: left;display: inline-block;color: #fa436a;font-size: 30upx;">同意"行丰银拓商城用户使用协议"</text>
				</view>
			</view>
			<button class="confirm-btn" @click="toRevice">注册服务商</button>
		</view>
	</view>
</template>

<script>
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	import QSApp from '@/components/QS-inputs-split/js/app.js';
	import uniRequest from 'uni-request'
	export default {
		components: {
			liuyunoTabs
		},
		data() {
			return {
				tabs: ['落地服务商','注册落地服务商'],
				defaultIndex:0,
				formName: '合作伙伴',
				checked:false,
				values: {
					companyCodeTextImg: [], // 上传企业营业执照复印件
					companyUserTextImg: [], // 上传企业法人身份证复印件
					companyOfficeCopyImg:[], // 上传办公地址房租或房产证明复印件
					companyAppliedCopyImg:[], // 上传申请人身份证复印件
					companyWarehouseAreaCopyImg:[], // 上传仓储地址房租或房产证明复印件
			
					username: '', // 用户名
					password: '', // 密码
					password2: '', // 确认密码
					companyName: '', // 企业全称
					companyCode: '', // 企业执照注册号
					companyTime: '', // 注册时间
					companyYear: '', // 注册期限(年)
					companyMoney: '', // 注册资金(万元)
					companyAddress: '', // 注册地址
					companyCodeText: '', // 上传企业营业执照复印件
					companyUser: '', // 法人姓名
					companyUserText: '', // 上传企业法人身份证复印件
					companyOfficeArea: '', // 办公地址
					companyOfficeCopy: '', // 上传办公地址房租或房产证明复印件
					companyAppliedArea: '', // 申请区域
					companyAppliedName: '', // 申请人姓名
					companyAppliedCopy: '', // 上传申请人身份证复印件
					companyAppliedPhone: '', // 申请人联系方式
					companyAppliedEmail: '', // 申请人电子信箱
					companyWarehouseArea: '', // 仓储地址
					companyWarehouseAreaCopy:'', // 上传仓储地址房租或房产证明复印件
				},
			}
		},
		methods: {
			tabClick(value){
				console.log(value)
				this.defaultIndex = value
			},
			
			async toRevice(){
				console.log(this.values.companyCodeTextImg[0].path)
				const sendData = {
					user:this.values.username,
					pwd :this.values.password,
					pwd2:this.values.password2 ,
					company: this.values.companyName,
					zhucehao :this.values.companyCode,
					zhuce_date :this.values.companyTime,
					qixian :this.values.companyYear,
					zijin :this.values.companyMoney,
					address: this.values.companyAddress,
					zhizhao :this.values.companyCodeText,
					boss :this.values.companyUser,
					boss_id: this.values.companyUserText,
					work_place: this.values.companyOfficeArea,
					work_id:this.values.companyOfficeCopy,
					store_address:this.values.companyWarehouseArea,
					store_id:this.values.companyWarehouseAreaCopy,
					area:this.values.companyAppliedArea,
					shengqingren:this.values.companyAppliedName,
					shengqingren_id:this.values.companyAppliedCopy,
					shengqingren_tel :this.values.companyAppliedPhone,
					shengqingren_email:this.values.companyAppliedEmail,
				}
				await uniRequest.post('/landservice/login/',sendData).then(res=>{
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
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.container{
		padding-top: 65px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}
	
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
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	
	.otherLogin {
		width: 500upx;
		height: 95upx;
		margin: 80upx auto;
		display: flex;
		justify-content: space-around;
	}
	
	.otherLogin>view {
		width: 95upx;
		height: 95upx;
		background: #fff;
		border-radius: 95upx;
	}
	
	.otherLoginTitle {
		width: 100%;
		margin-top: 40upx;
		text-align: center;
		color: #555555;
		font-size: 28upx;
		line-height: 80upx;
	}
</style>
