<template>
	<view>
		<liuyunoTabs :tabData="tabs" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		<view class="" v-if="defaultIndex === 0">
			<view style="padding: 10px;">
				<image style="width: 100%" src="/static/about_us/zhongfu.png" alt=""></image>
				<p>
				  北京行丰银拓科技有限公司（简称：行丰）是坐落于北京市星光影视园一家拥有<b>综合办公物资采购服务平台</b>并致力于为客户提供<b>整体解决方案</b>的高新技术企业，
				  公司自创立以来，便取得了与中国政府，中央国家机关单位，各省政府，中国企事业单位，军队，银行，高等院校，等500强企业广泛而深远的支持与合作，
				  <b>为政府企事业单位认证和指定</b>的模范单位，公司立志成为行业的佼佼者，并努力通过科学技术贡献和团队合作给客户提供更高效和更满意的优质服务。
				</p>
				<p>
				  公司自2008年成立以来，一直坚持为客户提供软件开发服务，IT设备，商务办公用品，办公设备，办公耗材，数码，劳保，食品，礼品
				  众多产品和服务，坚持‘以客为尊，用心服务，诚信永恒，高效卓越’的服务宗旨，通过多年行业经验的积累和发展，不断完善
				  公司的商品结构，满足不同行业客户的需求，为客户提供高效的<b>一站式服务</b>。
				</p>
				<image style="width: 100%;" src="/static/about_us/hfyt.png" mode=""></image>
				<p>
				行丰银拓是一家综合性办公物资采购服务的高新企业，拥有完善且健全的研发，策划，宣传，销售，客服，仓储，物流，采购，财务，售后维修团队，
				各团队跟随公司的不断发展中壮大，并
				已通过ISO9001质量管理体系认证，ISO9001环境管理体系认证，OHSAS18001职业健康安全管理体系认证等多项认证。公司总部位于北京市，
				并在天津，大同等地成立了分公司。
			  </p>
				<p>
				  公司经营产品种类以万计，为国内国际
				  如齐心，得力，莱盛，惠普，佳能，三星，理光，联想，东芝，飞利浦，索尼，双立人等
				  众多品牌的金牌代理和优质合作伙伴，行丰同时也拥有打印耗材，复印纸，纸杯等多种自有产品，
				  在各行各业积累了大量可信赖的客户，如中央电视台，新华社，社会科学院，国家电网，国家知识产权局，广电总局，
				  银监会，中国人民银行，光大银行，建设银行，浦发银行，火箭局，北京大兴国税，清华大学，北京大学，北京医院，武警总署医院，
				  中石油，中石化，中国移动等等.
				</p>
				<image style="width: 100%;" src="/static/about_us/dajianpingtai.png" mode=""></image>
	
				<p>
				  公司目前以线上+线下的模式大步前进，正积极打造自己的办公服务平台，并已经和中国政府采购网，中央政府采购网，
				  北京市政府采购网，中共中央直属机关采购中心，中国军队采购网，中国海关采购网，武警物资采购网，江苏政府采购网，河北政府采购网，
				  山西政府采购网，陕西政府采购网，重庆军队网，湖南军队网，广州军队网，贵州军队网，云南军队网等众多平台实现API对接。
				  也有多年入驻诸如喀斯玛，军工人，航发网等第三平台的宝贵经验。
				  行丰正在全国各地大力发展落地服务商，部署全国范围内仓库物流配送网点。相信在不久的将来，将快速实现全国范围内快速，快捷，方便，
				  简单，轻松，高效的一站式物资采购服务平台。
				</p>
				<p>
				  行丰一直以来心系客户和合作伙伴，客户的满意是我们不懈的追求，厂商的支持是我们合作的有力臂膀，我们一直努力用心服务，竭诚提供更优质，高效的服务。
				</p>
			  </view>
		</view> 
		<view class="" v-if="defaultIndex === 1">
			<view style="padding: 10px">
				<p>企业文化：忠诚，民主，创新，发展。</p>
				
				<p>企业愿景：创建平台，实现价值，突破和改变自己，实现个人价值。</p>
				<image style="width: 100%;" src="/static/about_us/pingtai.jpg" mode=""></image>
				<p>企业宗旨：充满激情，积极向上，懂得感恩，创建工作生活快乐大家庭。</p>
				<image style="width: 100%;" src="/static/about_us/dajiating.jpg" mode=""></image>
				<p>企业竞争力：完善先进的服务管理体系，平台，系统，将其软件化。</p>
				<image style="width: 100%;" src="/static/about_us/ruanjianhua.jpg" mode=""></image>
				<p>员工三大职责：宣传企业品牌，销售公司产品，引荐优秀人才。</p>
				<p>服务宗旨：以客为尊，用心服务，诚信永恒，高效卓越</p>
			</view>
		</view>
		<view class="" v-if="defaultIndex === 2">
			<view style="padding: 10px">
			<image style="width: 100%;height: 160upx;" src="/static/about_us/good_pingjia.png" mode=""></image>
			<view style="background: red">
				<uni-grid :column="3" :show-border="false" :square="false">
				    <uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
				        <image style="width: 100%;height: 300upx;" src="/static/about_us/a1.png" mode=""></image>	
				    </uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
						<image style="width: 100%;height: 300upx;" src="/static/about_us/a2.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a3.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a4.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a5.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a6.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a7.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a8.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a15.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a18.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a19.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a20.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a21.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a22.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a23.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a24.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a25.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a9.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a10.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a11.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a12.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a13.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a14.png" mode=""></image>
					</uni-grid-item>
					
					<uni-grid-item  style="margin-bottom: 20upx;display: inline-block;padding: 10upx;">
					    <image style="width: 100%;height: 300upx;" src="/static/about_us/a26.png" mode=""></image>
					</uni-grid-item>
				</uni-grid>
			</view>
			</view>
		</view>
		<view class="" v-if="defaultIndex === 3">
			<view class="team" style="padding: 10px">
				<p>我们是一家以'技术'+'销售'为驱动力的公司，大家庭是由一群来自五湖四海充满激情，积极上进，懂得感恩，怀揣着梦想的业内外精英组成，我们希望团队一直加强忠诚品质，守法意识，团队精神，责任意识，开拓精神，奉献意识的这些优良品质和内涵，公司经过十多年的发展和市场磨合， 我们具备优秀的市场营销团队，商务谈判团队，IT开发团队，业务团队，设备售后维修团队，拥有一批10多年本行业专业人才，带领我们走向成功的彼岸，我们也有朝气蓬勃，团结互助热情洋溢的年轻人，他们勤奋，敢作敢为，对生活和工作都充满期待。
				</p>
				<image style="width: 100%;" src="/static/about_us/12zhounian.png" mode=""></image>
				<p>我们的家庭分为不同的团队，有为业绩而奋斗在一线的业务团队，有维护稳定客户的客服团队，有礼品采购定制方案的顾问团队，有各个采购平台维护的运营团队，有负责厂家联系订货的采购团队，有设备售后维修服务团队，有搭建自己办公物资采购平台的技术团队，有账单核对开票的财务团队，有自己仓库物流管理团队，有直接送货上门的物流司机团队...我们来自五湖四海，确只为您提供最为全面，周到，快捷，方便的产品和服务。
				</p>
				<image style="width: 100%;" src="/static/about_us/our_team.png" mode=""></image>
			  </view>
		</view>
		<view class="" v-if="defaultIndex === 4">
			<view class="products" style="padding: 10px">
				<image style="width: 100%;height: 150px;" src="/static/about_us/banner.jpg" mode=""></image>
				<p>
				  我们扎根于办公物资采购行业，但是我们的产品和服务确不限于此，我们提供it软硬件产品，家用电器，电脑手机数码科技产品，
				  办公用品，家居家具，打印耗材，学生用品，
				  服装服饰，清洁用品，母婴用品，珠宝首饰，艺术用品，劳保用品，涵盖日常我们都可以用到的产品。
				</p>
				<image style="width: 100%;height: 150px;" src="/static/about_us/good_goods1.jpg" mode=""></image>
				<p>
				  公司经营产品种类以百万计，为国内国际 如齐心，得力，莱盛，惠普，佳能，三星，理光，联想，东芝，飞利浦，索尼，
				  双立人等 众多品牌的金牌代理和优质合作伙伴，行丰同时也拥有打印耗材，复印纸，纸杯等多种自有产品.
				</p>
				<image style="width: 100%;height: 150px;" src="/static/about_us/good_goods2.jpg" mode=""></image>
		    </view>
		</view>
		<view class="" v-if="defaultIndex === 5">
			<view style="padding: 10px">
				<image style="width: 100%;height: 300upx;" src="/static/gift_customization/bufenkehu.jpg" mode=""></image>
				<p>公司目前以线上+线下的模式大步前进，正积极打造自己的办公服务平台，并已经和中国政府采购网，中央政府采购网，
				  北京市政府采购网，中共中央直属机关采购中心，中国军队采购网，中国海关采购网，
				  武警物资采购网，江苏政府采购网，河北政府采购网， 山西政府采购网，陕西政府采购网，
				  重庆军队网，湖南军队网，广州军队网，贵州军队网，云南军队网等众多平台实现API对接。
				  也有多年入驻诸如喀斯玛，军工人，航发网等第三平台的宝贵经验。 行丰正在全国各地大力发展落地服务商，部署全国范围内仓库物流配送网点。
				  相信在不久的将来，将快速实现全国范围内快速，快捷，方便， 简单，轻松，高效的一站式物资采购服务平台。
				</p>
				<image style="width: 100%;height: 1000upx;" src="/static/about_us/heyue.jpeg" mode=""></image>
			</view>
		</view>
		<view class="" v-if="defaultIndex === 6">
			<view class="" style="padding: 10px">
				<image style="width: 100%;height: 300upx;" src="/static/gift_customization/hezuohuoban.jpg" mode=""></image>
				<p>公司经营产品种类以百万计，为国内国际 如齐心，得力，莱盛，惠普，佳能，三星，理光，联想，东芝，飞利浦，索尼，双立人等 众多品牌的金牌代理和优质合作伙伴，行丰同时也拥有打印耗材，复印纸，纸杯等多种自有产品， 在各行各业积累了大量可信赖的客户，如中央电视台，新华社，社会科学院，国家电网，国家知识产权局，广电总局， 银监会，中国人民银行，光大银行，建设银行，浦发银行，火箭局，北京大兴国税，清华大学，北京大学，北京医院，武警总署医院， 中石油，中石化，中国移动等等.</p>
			</view>
		</view>
		<view class="" v-if="defaultIndex === 7">
			<view class="" style="padding: 10px">
				<image style="width: 100%;height: 300upx;" src="/static/about_us/dashiji.jpg" mode=""></image>
				<p>
				  2008年11月14日，北京行丰银拓科技有限公司以注册资本2300.0000万元正式挂牌成立并运营。
				</p>
				<p>2009年2月，获得北京市国家税务局颁发的纳税信用A级单位。</p>
				<p>2009年3月，被佳能认定为IT办公设备指定维修站，优秀代理商。</p>
				<p>2010年9月，公司荣获国家质量监督检验检疫总局的全国质量工作先进单位。</p>
				<p>2011年2月，公司为北京市政府认定为军队军需优秀供应商。</p>
				<p>2011年5月，正式成为北京文化用品行业协会的理事单位。</p>
				<p>2011年12月，获得国家安全局颁发的2011年度首都国家安全先进集体。</p>
				<p>2012年10月16日，公司通过iso9001质量管理体系认证。</p>
				<p>2013年3月，获得北京文化用品行业协会诚信用户。</p>
				<p>2014年3月，获得北京市文化用品协会优秀供应服务商。</p>
				<p>2015年08月03日，行丰通过了中国招标网招标认证。</p>
				<p>2016年6月2日，连续获得ISO14001质量管理体系认证证书和OHSAS18001职业健康安全管理体系认证证书</p>
				<p>2017年11月29日，公司正式推出电子商城系统第一版。</p>
				<p>2018年3月9日，获得由中华人民共和国国家版权局颁发的计算机软件著作登记证书。</p>
				<p>2018年9月5日，正式取得办公用品储存管理系统V1.0计算机著作登记证书</p>
				<p>2018年9月6日，分别正式取得计算机软件销售管理系统V1.0，
				  办公设备销售分析系统V1.0,技术咨询服务管理系统V1.0，技术推广服务分析系统V1.0,技术服务信息处理系统v1.0,
				  技术转让服务智慧系统v1.0计算机著作登记证书</p>
	
				<p>2018年11月30日，获得北京市科委，财政局，税务局联合颁发的高新技术企业证书</p>
				<p>2018年12月31日，公司受邀进入北京淮阳商会，行丰总经理王银龙任秘书长。</p>
	
				<p>2019年3月27日，获得315颁发的企业信用AAA级信用单位认证证书，重合同守信用证书，质量服务信誉证书，诚信经营示范单位证书，资信登记证书。</p>
			</view>
		</view>
	</view>
</template>

<script>
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	export default {
		components: {
			liuyunoTabs
		},
		data() {
			return {
				tabs: ['关于行丰','企业文化','我们的荣誉','我们的团队','我们的产品','我们的客户','我们的供应商','大事记'],
				defaultIndex:0,
			}
		},
		methods: {
			tabClick(value){
				console.log(value)
				this.defaultIndex = value
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: #fff;
	}
	p{
	    text-indent: 2em;
	    margin:10px 0;
	    line-height:24px;
		font-size: 30upx;
		b{
			color:#000;
		}
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
