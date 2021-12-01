<template>
	<view class="page_edu">
		<view class="page_header">
			<image src="../../../../static/images/jiaoyu/jypx.png" mode=""></image>
		</view>
		<view class="page_content">
			<view class="u-demo-block__content" style="color: #333333;font-size: 32upx;">资源建设</view>
			<u-row
					justify="space-between"
					:gutter="10"
			>
				<u-col span="6" style="background-color: #FFFFFF;padding: 20upx;margin-top: 30upx;border-radius: 10upx;align-items: center;justify-content: space-between;margin-left: -5px;margin-right: -5px;">
					<view class="demo-layout" style="font-size: 12px;">
						<image style="width: 310upx;height: 168upx;border-radius: 5px;" src="../../../../static/images/sharemenu/copy.png" mode=""></image>
						<view class="" style="margin: 20upx 0;color: #333333;">实践建设</view>
						<view class="">
							<text style="float: left;color: #EE1D23;">￥10000</text>
							<text style="float: right;color: #999999;">321人已报名</text>
						</view>
					</view>
				</u-col>
				<u-col span="6" style="background-color: #FFFFFF;padding: 20upx;margin-top: 30upx;border-radius: 10upx;align-items: center;justify-content: space-between;margin-left: -5px;margin-right: -5px;">
					<view class="demo-layout" style="font-size: 12px;">
						<image style="width: 310upx;height: 168upx;border-radius: 5px;" src="../../../../static/images/sharemenu/copy.png" mode=""></image>
						<view class="" style="margin: 20upx 0;color: #333333;">实践建设</view>
						<view class="">
							<text style="float: left;color: #EE1D23;">￥10000</text>
							<text style="float: right;color: #999999;">321人已报名</text>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="page_content">
			<view class="" style="color: #333333;font-size: 32upx;">产学合作</view>
			<u-row
					justify="space-between"
					gutter="10"
			>
				<u-col span="6" style="background-color: #FFFFFF;padding: 20upx;margin-top: 30upx;border-radius: 10upx;align-items: center;justify-content: space-between;margin-left: -5px;margin-right: -5px;">
					<view class="demo-layout" style="font-size: 12px;">
						<image style="width: 310upx;height: 168upx;border-radius: 5px;" src="../../../../static/images/sharemenu/copy.png" mode=""></image>
						<view class="" style="margin: 20upx 0;color: #333333;">实践建设</view>
						<view class="">
							<text style="float: left;color: #EE1D23;">￥10000</text>
							<text style="float: right;color: #999999;">321人已报名</text>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="page_content">
			<view class="" style="color: #333333;font-size: 32upx;">内训职培</view>
			<u-row
					justify="space-between"
					gutter="10"
			>
				<u-col span="6" style="background-color: #FFFFFF;padding: 20upx;margin-top: 30upx;border-radius: 10upx;align-items: center;justify-content: space-between;margin-left: -5px;margin-right: -5px;">
					<view class="demo-layout" style="font-size: 12px;">
						<image style="width: 310upx;height: 168upx;border-radius: 5px;" src="../../../../static/images/sharemenu/copy.png" mode=""></image>
						<view class="" style="margin: 20upx 0;color: #333333;">实践建设</view>
						<view class="">
							<text style="float: left;color: #EE1D23;">￥10000</text>
							<text style="float: right;color: #999999;">321人已报名</text>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="page_content">
			<view class="" style="color: #333333;font-size: 32upx;">继续教育</view>
			<u-row
					justify="space-between"
					gutter="10"
			>
				<u-col span="6" style="background-color: #FFFFFF;padding: 20upx;margin-top: 30upx;border-radius: 10upx;align-items: center;justify-content: space-between;margin-left: -5px;margin-right: -5px;">
					<view class="demo-layout" style="font-size: 12px;">
						<image style="width: 310upx;height: 168upx;border-radius: 5px;" src="../../../../static/images/sharemenu/copy.png" mode=""></image>
						<view class="" style="margin: 20upx 0;color: #333333;">实践建设</view>
						<view class="">
							<text style="float: left;color: #EE1D23;">￥10000</text>
							<text style="float: right;color: #999999;">321人已报名</text>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
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
			// this.getBanner()
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
	.page_edu {
		width: 100%;
		height: 100%;
		padding: 30upx;
	}
	
	
	.page_header{
		width: 100%;
		height: 360upx;
		image{
			width: 100%;
			height: 320upx;
			
		}
	}

	.page_content {
		width: 100%;
		margin-bottom: 20px;
	}
</style>
