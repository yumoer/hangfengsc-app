<template>
	<view class="flex-col container">
	  <view class="flex-col section_1">
	    <view class="flex-col section_2">
	      <text class="text_1">北京市广盛律师事务所</text>
	      <view class="flex-col group_2">
	        <text>广盛律师事务所是位于北京的一家中国大型的律师事务所，并在上海、郑州等地设有分所。其前身为司法部直属的中国法律事务中心，经一九九六年改制创立如今的合伙制律师事务所。</text>
	        <image
	          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270272763425597.png"
	          class="icon_3"
	        />
	      </view>
	    </view>
	  </view>
	  <view class="flex-col group_3">
	    <text class="text_3">主要业务</text>
	    <view class="flex-col list">
	      <view class="grid">
	        <view class="grid-item flex-col items-center" v-for="(item,index) in business" :key='index'>
	          <image :src="item.image" class="image_1"/>
	          <text class="text_4">{{item.name}}</text>
	        </view>
		  </view>
	      <view class="flex-col list-item">
	        <text class="text_16">律师介绍</text>
			<view class="flex-col group_6">
			  <view class="flex-col">
			    <view class="list-item_1 flex-col" v-for="(item,index) in lawyer" :key='index'>
			      <view class="section_13 flex-col view_13">
			        <view class="top-group justify-end">
			          <text class="text_21 text_44">{{item.name}}</text>
			          <text class="text_23 text_45">{{item.job}}</text>
			        </view>
			        <view class="center-group view_15">
			          <text class="text_25">专业领域</text>
			          <text class="text_27">：<br /></text>
			          <text class="text_29">{{item.info}}</text>
			        </view>
			        <view class="bottom-text-wrapper flex-col items-center view_7">
			          <text>了解更多</text>
			        </view>
			      </view>
			      <image :src="item.image" class="image_13"/>
			    </view>
			  </view>
			</view>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
		        business:[
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270280972998885.png',
						name:'国际贸易业务部'},
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270255136004506.png',
						name:'反垄断与竞争法业务部'},
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270257132437829.png',
						name:'房地产业务部'},
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270256231028223.png',
						name:'金融业务部'},
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270258684184561.png',
						name:'诉讼与仲裁业务部'},
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270259630340574.png',
						name:'私募基金与上市业务部'},
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270261180210951.png',
						name:'知识产权业务部'},
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270262171192543.png',
						name:'移民与海外投资'},
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270263653917309.png',
						name:'劳动与人事业务部'},
					{
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270265278555141.png',
						name:'公司并购业务'},
				],
				lawyer:[
					{
						name:'徐汝华',
						job:'主任律师',
						info:'建筑工程、房地产、公司并购、金融、仲裁、知识产权、民事诉讼代理及刑事辩护',
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270266543399205.png'
					},
					{
						name:'张佩瑶',
						job:'主任律师',
						info:'诉讼、仲裁、金融、公司业务、资产并购、资产转让、股权转让、重大销售采购合同等',
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270279436274999.png'
					},
					{
						name:'李晓辉',
						job:'专业律师',
						info:'公司法、私人财富管理、信用风险防控、企业家法律风险防范,建筑工程、外商投资等',
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270275243280416.png'
					},
					{
						name:'翟浩杰',
						job:'专业律师',
						info:'公司投融资、收购并购、经济诉讼及仲裁、公司法律顾问，房地产等',
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270276507113831.png'
					},
					{
						name:'甄铁军',
						job:'专业律师',
						info:'建筑工程、房地产、金融、公司法务',
						image:'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270277923374453.png'
					}
				]
		    }
		}
	}
</script>

<style lang="less">
	.container {
	  background-color: rgb(247, 247, 247);
	  width: 100vw;
	  height: 100vh;
	  overflow-y: auto;
	  .section_1 {
	    background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/613cb91e630da20011c12dc4/619f41699eab8900119cb8dd/16378270251077263864.png');
	    background-size: 100% 100%;
	    background-repeat: no-repeat;
	    .section_2 {
	      padding: 1.19rem 0.78rem 0.94rem 1.03rem;
	      background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 100%);
	      border-radius: 0px 0px 0.63rem 0.63rem;
	      .group {
	        padding-left: 1.28rem;
	        padding-right: 0.16rem;
	        color: rgb(255, 255, 255);
	        font-size: 1.03rem;
	        line-height: 0.78rem;
	        letter-spacing: -0.021rem;
	        white-space: nowrap;
	        .text {
	          margin-top: 0.13rem;
	        }
		  }
	      .icon_2 {
	        margin-left: 0.75rem;
	        margin-top: 1.56rem;
	        width: 0.56rem;
	        height: 1rem;
	      }
	      .text_1 {
	        margin-top: 6.63rem;
	        color: rgb(255, 255, 255);
	        font-size: 1.19rem;
	        line-height: 1.13rem;
	        letter-spacing: 0.12rem;
	        white-space: nowrap;
	      }
	      .group_2 {
	        margin-top: 1.38rem;
	        color: rgb(255, 255, 255);
	        font-size: 0.88rem;
	        line-height: 1.31rem;
	        .icon_3 {
	          margin-top: 0.97rem;
	          align-self: center;
	          width: 1rem;
	          height: 0.56rem;
	        }
	      }
	    }
	  }
	  .group_3 {
	    padding: 1.56rem 0.8rem 2.34rem;
	    .text_3 {
	      color: rgb(17, 17, 17);
	      font-size: 1rem;
	      line-height: 0.97rem;
	      letter-spacing: 0.1rem;
	      white-space: nowrap;
	    }
	    .list {
	      margin-top: 0.94rem;
	      .grid {
	        height: 62.19rem;
	        display: grid;
	        grid-template-columns: repeat(2, 1fr);
	        grid-row-gap: 1.28rem;
	        .grid-item {
	          color: rgb(102, 102, 102);
	          font-size: 0.88rem;
	          line-height: 0.84rem;
	          letter-spacing: 0.087rem;
	          white-space: nowrap;
	          padding: 2.5rem 0 1.28rem;
	          background-color: rgb(255, 255, 255);
	          border-radius: 0.63rem;
			  margin: 0 0.4rem;
	          .text_4 {
	            margin-top: 1.75rem;
	          }
	        }
	        .image_1 {
	          width: 5.03rem;
	          height: 5.03rem;
	        }
	      }
	      .list-item {
	        margin-top: 1.56rem;
	        .text_16 {
	          margin-left: 0.094rem;
	          color: rgb(51, 51, 51);
	          font-size: 1rem;
	          line-height: 0.97rem;
	          letter-spacing: 0.1rem;
	          white-space: nowrap;
	        }
		  }
	    }
	    .group_6 {
	      padding-top: 1.56rem;
	      .list-item_1 {
	        padding: 0.88rem 0;
	        position: relative;
	        .section_13 {
	          padding: 1.25rem 0;
	          background-color: rgb(255, 255, 255);
	          border-radius: 0.63rem;
	          .top-group {
	            .text_21 {
	              margin-right: 0.094rem;
	              color: rgb(51, 51, 51);
	              font-size: 1rem;
	              line-height: 0.97rem;
	              letter-spacing: 0.1rem;
	              white-space: nowrap;
	              .text_38 {
	                margin-right: 0.13rem;
	                color: rgb(51, 51, 51);
	                font-size: 1rem;
	                line-height: 0.97rem;
	                letter-spacing: 0.1rem;
	                white-space: nowrap;
	              }
	              .text_39 {
	                margin-right: 7.28rem;
	                margin-top: 0.34rem;
	                color: rgb(102, 102, 102);
	                font-size: 0.63rem;
	                line-height: 0.63rem;
	                white-space: nowrap;
	              }
	            }
	            .text_23 {
	              margin-right: 7.56rem;
	              margin-top: 0.34rem;
	              color: rgb(102, 102, 102);
	              font-size: 0.63rem;
	              line-height: 0.63rem;
	              white-space: nowrap;
	              .text_40 {
	                color: rgb(153, 153, 153);
	                font-size: 0.75rem;
	                line-height: 1.31rem;
	              }
	              .text_41 {
	                color: rgb(102, 102, 102);
	                font-size: 0.75rem;
	                line-height: 1.31rem;
	              }
	              .text_42 {
	                color: rgb(51, 51, 51);
	                font-size: 0.88rem;
	                line-height: 1.31rem;
	              }
	            }
	            .text_32 {
	              line-height: 0.94rem;
	            }
	            .text_33 {
	              margin-right: 7.34rem;
	            }
	            .view_10 {
	              margin-right: initial;
	              color: initial;
	              font-size: initial;
	              line-height: initial;
	              letter-spacing: initial;
	              white-space: initial;
	            }
	            .view_11 {
	              margin-right: initial;
	              margin-top: 0.63rem;
	              color: initial;
	              font-size: initial;
	              line-height: initial;
	              white-space: initial;
	              align-self: flex-end;
	              width: 12rem;
	            }
	            .text_44 {
	              margin-right: 0.13rem;
	            }
	            .text_45 {
	              margin-right: 6.09rem;
	            }
	          }
	          .center-group {
	            margin-top: 0.63rem;
	            align-self: flex-end;
	            width: 12rem;
	            .text_25 {
	              color: rgb(153, 153, 153);
	              font-size: 0.75rem;
	              line-height: 1.31rem;
	            }
	            .text_27 {
	              color: rgb(102, 102, 102);
	              font-size: 0.75rem;
	              line-height: 1.31rem;
	            }
	            .text_29 {
	              color: rgb(51, 51, 51);
	              font-size: 0.88rem;
	              line-height: 1.31rem;
	            }
	          }
	          .bottom-text-wrapper {
	            margin-right: 1rem;
	            margin-top: 0.69rem;
	            padding: 0.66rem 0 0.72rem;
	            align-self: flex-end;
	            color: rgb(255, 255, 255);
	            font-size: 0.88rem;
	            line-height: 0.84rem;
	            white-space: nowrap;
	            background-image: linear-gradient(-45deg, rgb(240, 64, 35) 0%, rgb(238, 29, 35) 100%);
	            box-shadow: 0px 0.063rem 0.31rem rgba(238, 29, 35, 0.3);
	            border-radius: 1.09rem;
	            width: 5.91rem;
	          }
	        }
	        .image_13 {
	          width: 8rem;
	          height: 11.5rem;
	          position: absolute;
	          left: 0.5rem;
	          top: 0;
	        }
	      }
	    }
	  }
	}
</style>
