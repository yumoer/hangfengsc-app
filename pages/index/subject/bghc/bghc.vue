<template>
	<view class="page_edu">
		<view class="page_edu_header">
			<!-- <view class="header">
				<image @click="toggleCateMask('show')" src="/static/jiaoyu/icon_main.png" class="btn"></image>
				<view class="input">
					<image src="/static/jiaoyu/search.png" class="search"></image>
					<input type="text" value="" placeholder="搜索" />
				</view>
				<image class="btn" src="/static/jiaoyu/search.png"></image>
			</view> -->
			
			<view class="header_content">
				<view class="left">
					<image style="width: 100%;height: 120px;" :src="banner.icon" mode=""></image>
				</view>
			</view>
		</view>
		<view class="page_content">
			<view class="menu" style="z-index: 1;">
				<template v-for="(it,i) in menus">
					<view class="item" :key="'menu_'+i">
						<view class="img_view" :style="{background: it.bg}">
							<image :src="it.icon" class="image"></image>
						</view>
						<text class="txt">{{it.txt.slice(0,4)}}</text>
					</view>
				</template>
			</view>
		</view>
		
		<view v-for="(record,index) in records" :key="index">
			<view class="f-header m-t" @click="toCategory" style="margin-top: 20px;border-radius: 15px 15px 0 0;">
				<image :src="record.image"></image>
				<view class="tit-box">
					<text class="tit">{{record.txt}}</text>
					<text class="tit2">{{record.text}}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="hot-floor">
				<view class="floor-img-box">
					<image class="floor-img" src="/static/img/3.jpg" mode="scaleToFill"></image>
				</view>
				<scroll-view class="floor-list" scroll-x>
					<view class="scoll-wrapper">
						<view 
							v-for="(item, index) in record.details" :key="index"
							v-if="index < 10"
							class="floor-item"
							@click="navToDetailPage(item)"
						>
							<image :src="item.icon" mode="aspectFill"></image>
							<text style="text-align: center;" class="title clamp">{{item.title}}</text>
							<text class="price">￥{{item.subTitle}}</text>
						</view>
						<!-- <view class="more" @click="toCategory">
							<text>查看全部</text>
							<text>More+</text>
						</view> -->
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				banner:{},
				
				menus: [{
						bg: 'linear-gradient(0deg,rgba(9,216,162,1),rgba(90,242,217,1))',
						icon: '../../../../static/jiaoyu/graduation.png',
						txt: '优质资源',
					},
					{
						bg: 'linear-gradient(0deg,rgba(251,184,35,1),rgba(255,228,40,1))',
						icon: '../../../../static/jiaoyu/live.png',
						txt: '产学合作',
					},
					{
						bg: 'linear-gradient(0deg,rgba(255,126,34,1),rgba(240,184,27,1))',
						icon: '../../../../static/jiaoyu/emblem.png',
						txt: '内训职培',
					},
					{
						bg: 'linear-gradient(0deg,rgba(9,177,252,1),rgba(24,200,255,1))',
						icon: '../../../../static/jiaoyu/question_bank.png',
						txt: '继续教育',
					},
					{
						bg: 'linear-gradient(0deg,rgba(209, 77, 60,1),rgba(244, 91, 71,1))',
						icon: '../../../../static/jiaoyu/class.png',
						txt: '劳务咨询',
					}
				],
				
				images:[
					{
						image:'../../../../static/jiaoyu/class.png',
						text:'Good value class'
					},
					{
						image:'../../../../static/jiaoyu/graduation.png',
						text:'Quality resources'
					},
					{
						image:'../../../../static/jiaoyu/live.png',
						text:'Industry-university collaboration'
					},
					{
						image:'../../../../static/jiaoyu/emblem.png',
						text:'Internal training'
					},
					{
						image:'../../../../static/jiaoyu/question_bank.png',
						text:'Continuing learning'
					},
					
				],
				
				records: [],
				
			}
		},
		onLoad() {
			this.getClass()
			this.getDates()
			this.getBanner()
		},
		methods: {
			async getClass(){
				try {
					const response = await uniRequest.get('/education/get/goods/category/');
					console.log(response);
					// this.dates = response
					response.data.forEach((ele,index)=>{
						this.menus[index].txt = ele.name
					})
					
				} catch (error) {
					console.error(error);
				}
			},
			
			async getDates(){
				try {
					const response = await uniRequest.get('/education/get/advertising/content/');
					console.log(response);
					this.records = response.data
					this.records.forEach((ele,index)=>{
						ele.image = this.images[index].image
						ele.text = this.images[index].text
					})
				} catch (error) {
					console.error(error);
				}
			},
			
			async getBanner(){
				try {
					const response = await uniRequest.get('/education/get/advertising/content/banner/');
					console.log(response);
					this.banner = response.data
				} catch (error) {
					console.error(error);
				}
			},
			
			navToDetailPage(item){
				// console.log(item)
				uni.navigateTo({
					url:item.url
				})
			},
			
			toCategory(){
				console.log('111')
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background-color: #ebebeb;
	}
</style>
<style lang="scss" scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}

	.page_edu {
		width: 100%;
	}
	
	
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
		.active{
			color: $base-color;
		}
	}
	
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
				text-align: center;
				display: inherit;
			}
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}

	.page_edu_header {
		padding-top: var(--status-bar-height);
		background-color: #5C0AE8;
		width: 100%;
		height: realSize(350px);

		.header {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: realSize(20px);

			.btn {
				width: realSize(34px);
				height: realSize(34px);
			}

			.input {
				height: realSize(59px);
				width: 100%;
				margin-left: realSize(20px);
				margin-right: realSize(20px);
				background: rgba(255, 255, 255, 1);
				border-radius: realSize(30px);
				display: flex;
				flex-direction: row;
				align-items: center;

				.search {
					width: realSize(30px);
					height: realSize(30px);
					margin-left: realSize(20px);
					margin-right: realSize(20px);
				}
			}
		}

		.header_content {
			display: flex;
			flex-direction: row;
			padding-top: 20px;
			.left {
				display: flex;
				flex-direction: column;
				width: 100%;
				/* #ifdef APP-PLUS */
				margin-top: -27px;
				/* #endif */
				margin-left: 10px;
				margin-right: 10px;

				.title {
					width: realSize(419px);
					height: realSize(59px);
					font-size: realSize(47px);
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
				}

				.sub_title {
					margin-top: 3px;
					font-size: realSize(18px);
					font-weight: 400;
					color: rgba(255, 255, 255, 1);

					background: linear-gradient(0deg, rgba(120, 255, 224, 1) 0%, rgba(255, 255, 255, 1) 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				.btn {
					margin-top: 3px;
					width: realSize(198px);
					height: realSize(60px);
					background: linear-gradient(-30deg, rgba(252, 135, 29, 1), rgba(246, 185, 9, 1));
					box-shadow: 0px 4px 10px 0px rgba(255, 121, 0, 0.5);
					border-radius: realSize(30px);
					color: rgba(255, 255, 255, 1);
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.page_content {
		width: 100%;
		margin-top: -74px;

		.menu {
			margin-left: 10px;
			margin-right: 10px;
			padding-left: 10px;
			padding-right: 10px;
			height: realSize(176px);
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
			border-radius: 10px;
			display: flex;
			flex-direction: row;
			align-items: stretch;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.img_view {
					width: 50px;
					height: 50px;
					border-radius: 30px;
					display: flex;
					align-items: center;
					justify-content: center;

					.image {
						width: 50px;
						height: 50px;
					}
				}

				.txt {
					margin-top: 5px;
					font-size: 14px;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.s_menu {
			display: flex;
			flex-direction: row;
			align-items: stretch;
			justify-content: space-between;
			margin-top: 15px;
			margin-left: 10px;
			margin-right: 10px;
			padding-left: 10px;
			padding-right: 10px;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.image {
					width: 35px;
					height: 35px;
				}

				.txt {
					margin-top: 5px;
					font-size: 14px;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.ad {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.bg {
				position: absolute;
				width: 120px;
				height: 105px;
				left: 0;
			}

			.ad_btn {
				width: 100%;
				height: 63px;
				margin: 30px;
				background: linear-gradient(0deg, rgba(253, 155, 28, 1), rgba(251, 197, 33, 1));
				border-radius: 67px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.title {
					font-size: realSize(38px);
					font-family: PingFang-SC-Heavy;
					font-weight: 800;
					color: rgba(255, 255, 255, 1);
				}

				.sub_title {
					background: linear-gradient(0deg, rgba(255, 128, 37, 1), rgba(255, 153, 32, 1));
					box-shadow: 0px 4px 5px 0px rgba(92, 53, 48, 0.3), 0px 1px 0px 0px rgba(228, 228, 228, 1);
					border-radius: realSize(24px);
					font-size: realSize(24px);
					font-family: PingFang-SC-Heavy;
					font-weight: 800;
					font-style: italic;
					color: rgba(255, 236, 177, 1);
					line-height: realSize(26px);
				}
			}
		}
	}

	.slider {
		white-space: nowrap;
		width: 100%;
		background-color: white;
		margin-top: 20px;
		.item {
			display: inline-block;
			margin-left: 15px;
			margin-top: 13px;
			margin-bottom: 13px;
			width: 60%;
			height: 125px;
			border-radius: 10px;

			.item_content {
				display: flex;
				flex-direction: row;
				
				.image {
					margin-left: 10px;
					margin-top: 20px;
					width: 80px;
					height: 80px;
				}

				.title {
					width: 36%;
					margin: 20px;
					display: flex;
					flex-direction: column;
					
					.first {
						font-size: 14px;
						height: 40px;
						color:rgba(46,65,69,1);
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						word-break: break-all;
						
						// display:-webkit-box;
						// -webkit-box-orient:vertical;
						// -webkit-line-clamp:2;
					}
					.main {
						font-size: 13px;
						color:rgba(79,103,101,1);
						margin-top: 5px;
					}
					.sub {
						width: 60px;
						font-size: 10px;
						margin-top: 20px;
						background:rgba(255,255,255,0.4);
						border-radius:5px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				

				.free {
					background: rgba(11, 147, 252, 1);
					border-radius: 0px 0px 22px 22px;
					width: 25px;
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					font-size: 14px;
				}
			}
		}
	}
</style>
