<template>
	<view id="zfcg">
		<view class="title">
			{{introduce}}
		</view>
		<view class="body">
			<uni-grid :column="1" :show-border="false"  :square="false" class="wrap">
			    <uni-grid-item v-for="(img_src,index) in img_srcs" :key="index" class="item">
					<image class="img" :src="img_src.img_src"></image> <!-- @click="goto(img_src.a_href)"-->
			        <text class="name" v-bind:style="{color:img_src.color}">{{img_src.title}}</text>
			    </uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				introduce:'行丰银拓科技集团有限公司自成立以来一直秉承“以客为尊，用心服务，诚信永恒，高效卓越”的企业文化和服务宗旨。公司依靠优秀的技术，销售，物流，售后团队致力于打造一流的一站式办公服务平台，公司自成立以来一直不断进步，深受各个政府采购方面的信任和喜爱，现已与各大政府部门有着深远的合作以及平台对接。在一起前进的道路上，我们保证一定继续提供最优质的服务。',
				img_srcs:[
				  {title:'中国政府采购网',img_src:'../../../../static/infoCenter/001.jpg',a_href:'http://www.ccgp.gov.cn/',color:'#2180d8'},
				  {title:'中央政府采购网',img_src:'../../../../static/infoCenter/002.jpg',a_href:'http://www.zycg.gov.cn/',color:'#c90101'},
				  {title:'北京市政府采购网',img_src:'../../../../static/infoCenter/003.jpg',a_href:'http://www.ccgp-beijing.gov.cn/',color:'#a2d9de'},
				  {title:'中共中央直属机关采购中心',img_src:'../../../../static/infoCenter/004.jpg',a_href:'http://zzcg.ccgp.gov.cn/',color:'#ff9329'},
				  {title:'天津市政府采购网',img_src:'../../../../static/infoCenter/005.jpg',a_href:'http://www.tjgp.gov.cn/',color:'#188cfa'},
				  {title:'河北省政府采购网',img_src:'../../../../static/infoCenter/006.jpg',a_href:'http://www.ccgp-hebei.gov.cn/province/',color:'#003c87'},
				  {title:'军队采购网',img_src:'../../../../static/infoCenter/007.jpg',a_href:'https://www.plap.cn/',color:'#268f95'},
				  {title:'江苏政府采购网',img_src:'../../../../static/infoCenter/008.jpg',a_href:'http://www.ccgp-jiangsu.gov.cn/',color:'#1049a0'},
				  {title:'中国海关采购网',img_src:'../../../../static/infoCenter/009.jpg',a_href:'http://hgcg.customs.gov.cn/hgcg/',color:'#0b4d99'},
				  {title:'武警物资采购网',img_src:'../../../../static/infoCenter/010.jpg',a_href:'http://www.capfp.cn/default.jsp',color:'#1d442c'},
				  {title:'湖北政府采购网',img_src:'../../../../static/infoCenter/011.jpg',a_href:'http://www.ccgp-hubei.gov.cn/',color:'#da0000'},
				  {title:'广东省政府采购网',img_src:'../../../../static/infoCenter/012.jpg',a_href:'http://www.gdgpo.gov.cn/',color:'#32afe2'},
				  {title:'山东政府集中采购网',img_src:'../../../../static/infoCenter/013.jpg',a_href:'http://www.sdzfcg.gov.cn/',color:'#0e5f60'},
				  {title:'重庆市政府采购网',img_src:'../../../../static/infoCenter/014.jpg',a_href:'https://www.cqgp.gov.cn/',color:'#1a80cb'},
				  {title:'湖南政府采购网',img_src:'../../../../static/infoCenter/015.jpg',a_href:'http://www.ccgp-hunan.gov.cn/',color:'#0d3ec1'},
				],
			};
		},
		methods: {
		      /* goto(href){
				  console.log(href)
				  // #ifdef APP-PLUS
				  void plus.runtime.openWeb(href,function(e){
				  	// 识别失败代码
				  	console.log(href)
				  })
				  // #endif
				  // #ifdef H5
				  location.href = href
				  // #endif
			  } */
		}
	}
</script>

<style lang="scss">
	#zfcg{
		.title{
			padding: 40upx;
			font-size: 34upx;
			line-height: 48upx;
			color: #333;
			text-indent: 2em;
		}
		.body{
			.wrap{
				margin-top: 20upx;
				.item{
					margin-bottom: 30upx;
					padding:10upx 40upx;
					text-align: center;
					.img{
						width: 100%;
						height: 140upx;
					}
					.name{
						padding-top: 20upx;
						font-size: 27upx;
					}
				}
					
			}
			
		}
	}
</style>
