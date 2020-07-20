<template>
	<view>
		<view class="w1200">
			<h4 class="title">律所介绍</h4>
			<view style="font-size: 18px;">
				<text style="color: #880000;">北京市广盛律师事务所</text>
				<image style="width: 100%;margin: 10px 0;" src="/static/guangshengfalv/com.png" mode=""></image>
				<view>
					<p>广盛律师事务所是位于北京的一家中国大型的律师事务所，并在上海、郑州等地设有分所。其前身为司法部直属的中国法律事务中心，经一九九六年改制创立如今的合伙制律师事务所。</p>
					<p style="margin-top: 10px;">
						作为新中国历史最悠久的大型律师事务所之一，广盛律师事务所在国际贸易、私募基金与投资、上市、并购、反垄断、金融、房地产、诉讼仲裁、知识产权等领域提供了全方位的一流服务。经过十几年的发展，
						广盛律师事务所的综合实力与日俱增，事务所的专业水准、服务精神赢得了业内外的肯定。
					</p>
				</view>
				
			</view>
		</view>
		<view class="w1200">
			<h4 class="title">律师介绍</h4>
			<view v-for="info in infos">
				<view style="width: 100%;text-align: center;padding-bottom: 10px;">
					<image v-bind:src="info.url" style="width: 200px;height: 220px;"></image>
					<h3>{{ info.name }}</h3>
					<text style="font-size: 16px;font-weight: bold;color:red ;">{{ info.job }}</text>
				</view>
				<view style="line-height: 25px;padding-bottom: 10px;">
					<p v-for="inf in info.msg">
						{{ inf }}
					</p>
				</view>
			</view>
		</view>
				
		<view class="w1200 clearfix" >
			<h4 class="title">主要业务</h4>
			<view>
				<view style="padding: 10px 0;" v-for="yewu in yewus">
					<a :href="yewu.href" style="color: #333;text-decoration:none;">
						<image style="width: 100%;height: 200px;" :src="yewu.img" mode=""></image>
						<view style="text-align: center;font-size: 16px;margin-top: 10px;">{{ yewu.name }}</view>
					</a>
					
				</view>
			</view>
		</view>
		<view class="w1200">
			<h4 class="title">广盛官网</h4>
			<view class="clearfix last" style="margin-top: 10px;">
				<img style="float: left;" src="/static/guangshengfalv/logo.png" alt="">
				<a href="http://www.gslaw.com.cn/" style="text-decoration:none;">广盛官网</a>
			</view>
			
		</view>
		<view class="w1200">
			<h4 class="title">联系我们</h4>
			<view style="">
				<p>电话：13671149976</p>
				<p>传真：010-64686221</p>
				<p>E-mail：userlixiaohui@163.com </p>
				<p>官网：http://www.gslaw.com.cn</p>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
		        infos:[
		            {
		                name:'徐汝华 主任律师',
		                url:'../../../../static/guangshengfalv/xu.png',
		                job:'专业领域：建筑工程、房地产、公司并购、金融',
		                msg:['▪ 徐汝华律师毕业于北京大学法律系，获法学学士和法学硕士学位，其执业领域是建筑工程、房地产、公司、金融、仲裁、知识产权以及民事诉讼代理及刑事辩护。',
		                    '▪ 徐汝华律师毕业于北京大学法律系，获法学学士和法学硕士学位，其执业领域是建筑工程、房地产、公司、金融、仲裁、知识产权以及民事诉讼代理及刑事辩护。',
		                    '▪ 徐汝华律师曾任交通部公路一局法律事务室主任，现任北京市律师协会建设工程法律专业委员会副主任，北京市朝阳区律师协会理事、朝阳律协财税委员会主任。徐汝华律师在深厚扎实的理论功底基础上建立了完整的法律知识体系，具备解决疑难问题、驾驭复杂局面的能力。以视诚信为敬业的根本，代理了大量的民事、经济诉讼及仲裁案件，并担任多家企业法律顾问，积累了丰富的办案经验，掌握了大量的办案技巧，以负责求实的态度，赢得了客户的信赖与好评。'],
		            },
		            {
		                name:'李晓晖  律师',
		                url:'../../../../static/guangshengfalv/li.png',
		                job:'专业领域：公司法、私人财富管理、信用风险防控，企业家法律风险防范',
		                msg:['▪ 李晓晖律师，毕业于中国人民大学法学院，任北京市律师协会信托与财富管理法律事务专业委员会委员，在公司法、私人财富管理、信用风险防控、企业家法律风险防范、建筑工程、外商投资、金融等方面有着丰富的执业经验。',
		                    '▪ 自2005年7月起开始从事法律工作，具有大型国有企业法律工作经历及多年专职律师工作经验。曾先后为科法斯香港、中国平安财产保险有限公司、西门子楼宇科技（天津）有限公司、施耐德电气（中国）投资有限公司、佳能（中国）有限公司等大型央企、世界500强企业提供诉讼及非诉讼法律服务。',
		                    '▪ 曾参与办理一大批重大、疑难并具有巨大社会影响力的案件，并曾参与千亿资产企业家的家族财富传承项目，擅长有体系的防控私人财富投资项目的法律风险，并综合运用遗嘱、赠与、保险、信托等工具，为客户提供一站式的财富规划和资产配置方案与执行。',
		                    '▪ 曾为多家企业提供信用交易法律风险预防与控制培训、劳动合同法培训、第三方资信调查、信用管理体系架构等法律服务。'
		                ]
		            },
		            {
		                name:'翟浩杰  律师',
		                url:'../../../../static/guangshengfalv/zhai.png',
		                job:'专业领域：公司投融资、收购并购、经济诉讼及仲裁、公司顾问',
		                msg:[
		                    '▪ 翟浩杰律师于2007年10月加入广盛律师事务所，现为广盛律师事务所管理合伙人。翟浩杰律师于2001年7月获东北大学法学院法学学士学位，于2009年获美国密苏里大学堪萨斯分校法学院法律硕士学位。翟浩杰律师的执业领域是公司投融资、公司收购并购、经济诉讼及仲裁、公司法律顾问、房地产等。',
		                    '▪ 翟浩杰律师具有大型国有企业工作经历，熟悉企业的内部运营机制，曾担任中国路桥工程有限公司、五矿钢铁北京有限公司、中交四公局城市建设发展有限公司等国有及民营企业常年法律顾问。自2003年7月起从事律师职业以来，翟浩杰律师曾代理五矿钢铁有限责任公司、中国矿产有限责任公司等五矿发展股份有限公司所属企业以及中交第三公路工程局有限公司等中国交通建设集团所属企业等国有大型企业处理大量经济诉讼、仲裁案件，均取得良好效果。',
		                    '▪ 翟浩杰律师亦曾先后为诸多外商直接投资项目、公司兼并收购项目等非诉讼事务提供专项法律服务，主要包括：国家电网公司所属北京中电飞华通信股份有限公司中止在香港联交所上市申请项目及股权重组项目、北京联银数码娱乐软件有限公司收购北京开世纪信息技术有限公司股权项目等。翟浩杰律师对影视行业的法律、法规较为了解，曾作为主要撰稿人与他人联合出版《影视合同》及《影视行业适用法律指南（电子出版物）》等著作。'
		                ]
		            },
		            {
		                name:'甄铁军  律师',
		                url:'../../../../static/guangshengfalv/zhen.png',
		                job:'专业领域：建筑工程、房地产、金融、公司法务',
		                msg:[
		                    '▪ 甄铁军律师自2000年开始执业，在建筑工程、房地产、金融及公司法律事务方面有着丰富的执业经验，以专业的办案技巧代理过多起重大经济纠纷诉讼和仲裁案件，先后为中国路桥工程有限责任公司、北京六建集团有限责任公司、北京市第五建筑工程集团有限公司、北京东方君悦大酒店、万方城镇投资发展股份有限公司等单位担任过法律顾问或提供专项法律服务。',
		                    '▪ 甄铁军律师先后为中交第四公路工程局有限公司、中国路桥工程有限责任公司、中交第一公路工程局有限公司、中交路桥建设有限公司、中交第三公路工程局有限公司、中交一公局海威工程建设有限公司、北京建工集团有限责任公司、北京建工博海建设有限公司、北京市第五建筑工程集团有限公司、北京六建集团有限责任公司等单位代理过数十起诉讼、仲裁案件',
		                    '▪ 甄铁军律师对工作兢兢业业，勤勉尽责，能够认真负责的完成各项法律服务工作，切实维护当事人的合法权益，曾代理诸多诉讼、仲裁案件，得到委托人的一致好评。',
		                ]
		            },
		            {   name:'张佩瑶  律师',
		                url:'../../../../static/guangshengfalv/zhang.png',
		                job:'专业领域：诉讼、仲裁、金融、公司业务',
		                msg:[
		                    '▪ 张佩瑶律师毕业于北京大学，法学、经济学双学士，北京市律协行政法与行政诉讼法专业委员会委员。2010年9月通过国家司法考试。自加入广盛律师事务所执业以来主要从事北京市财政局、国际体育总局、相关诉讼和非诉法律事务，同时为多家企业提供资产并购、资产转让、股权转让、重大销售采购合同、技术合同等法律服务，熟悉行政执法程序、诉讼与非诉讼业务。自从业以来，凭借严谨的工作态度和高效的工作作风赢得客户好评。',
		                    '▪ 2012年至今，张佩瑶律师一直为北京市财政局丰台分局提供定点服务服务并为交通银行股份有限公司下属支行提供不良贷款催收服务，都取得了较好的工作成果。',
		                ]
		
		            }
		        ],
		        yewus:[
		            {
		                img:'../../../../static/guangshengfalv/1.jpg',
		                name:'国际贸易业务部',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=71&Id=170&FId=t3:71:3'
		            },
		            {
		                img:'../../../../static/guangshengfalv/2.jpg',
		                name:'反垄断与竞争法业务部',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=12&Id=171&FId=t3:12:3',
		            },
		            {
		                img:'../../../../static/guangshengfalv/3.jpg',
		                name:'房地产业务部',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=69&Id=173&FId=t3:69:3',
		            },
		            {
		                img:'../../../../static/guangshengfalv/4.jpg',
		                name:'金融业务部',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=68&Id=180&FId=t3:68:3'
		            },
		            {
		                img:'../../../../static/guangshengfalv/5.jpg',
		                name:'诉讼与仲裁业务部',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=13&Id=179&FId=t3:13:3'
		            },
		
		            {
		                img:'../../../../static/guangshengfalv/6.jpg',
		                name:'私募基金与上市业务部',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=11&Id=178&FId=t3:11:3'
		            },
		            {
		                img:'../../../../static/guangshengfalv/7.jpg',
		                name:'知识产权业务部',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=67&Id=177&FId=t3:67:3'
		            },
		            {
		                img:'../../../../static/guangshengfalv/8.jpg',
		                name:'移民与海外投资',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=66&Id=176&FId=t3:66:3'
		            },
		            {
		                img:'../../../../static/guangshengfalv/9.jpg',
		                name:'劳动与人事业务部',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=65&Id=175&FId=t3:65:3'
		            },
		            {
		                img:'../../../../static/guangshengfalv/10.jpg',
		                name:'公司并购业务部',
		                href:'http://www.gslaw.com.cn/prod_view.aspx?TypeId=70&Id=174&FId=t3:70:3'
		            }
		        ]
		    }
		}
		
	}
</script>

<style lang="scss">
page{
    font-size:14px;
}
.w1200 {
    width:100%;
	padding: 10px;
    margin:0 auto;
}
.title{
    margin:0 auto;
    text-align: center;
    font-size:16px;
    background:url('../../../../static/guangshengfalv/title88.png') no-repeat center center;
    height:80px;
    line-height:80px;
    /*margin-bottom:40px;*/
}
p{
	font-size: 14px;
}



.last a:last-child{
    margin-left:50px;
    line-height:80px;
    height:80px;
    border:1px solid #880000;
    padding:0 40px;
    color:#880000;
    background:url('../../../../static/guangshengfalv/icon.png') no-repeat 25px ;
}

</style>
