<template>
	<view class="page">
		<view class="tabs">
			<!-- <scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
				</view>
			</scroll-view> -->
			<u-dropdown active-color='#ee0123' @border-bottom='true' :title-size='28' class="wrap" ref="uDropdown" @open="open" @close="close">
				<u-dropdown-item v-model="value" :title="item.name" v-for="(item,index) in tabs" :key='index' @change="change">
					<view class="clearfix" v-for="(ele,index1) in sonTabs" :key='index1' v-if="item.id === ele.id">
						<span class='clearfix' style="float: left;font-size: 26upx;" @click='goSearch(el)' v-for="el in ele.list">{{el.value}}</span>
					</view>
				</u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="item">
			<u-row
				justify="space-between"
				:gutter="10"
			>
				<u-col span="6" class="slider" v-for="(item,index) in skuList" :key='index'>
					<view class="demo-layout" @click="goto(item._source)">
						<image style="width: 100%;height: 340upx;border-radius: 5px;" :src="item._source.detail_image" mode=""></image>
						<view class="clamp2 name">{{item._source.name}}</view>
						<view class="info">
							<text class="price">￥{{item._source.price}}</text>
							<text class="scale">{{item._source.sales}}人付款</text>
						</view>
					</view>
				</u-col>
			</u-row>
			<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText" @loadmore="loadmore"/>
		</view>
		<u-loading-page :loading="loading" bg-color="#e8e8e8"></u-loading-page>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				tabs: [
				    {
				      id: 0,
				      name: '公共区'
				    },
				    {
				      id: 1,
				      name: '财务区'
				    },
				    {
				      id: 2,
				      name: '前台区'
				    },
				    {
				      id: 3,
				      name: '会议室'
				    },
				    {
				      id: 4,
				      name: '茶水间'
				    },
				    {
				      id: 5,
				      name: '经理室'
				    }
			    ],
				sonTabs: [
				    {
				      id: 0,
				      list: [
				        { key: '盆栽', value: '盆栽' },
				        { key: '饮水机', value: '饮水机' },
				        { key: 'A4纸', value: 'A4纸' },
				        { key: '硒鼓', value: '硒鼓' },
				        { key: '打印机', value: '打印机' },
				        { key: '台灯', value: '台灯' },
				        { key: '水杯', value: '水杯' },
				        { key: '垃圾桶', value: '垃圾桶' },
				        { key: '碎纸机', value: '碎纸机' },
				        { key: '电脑', value: '电脑' },
				        { key: '椅子', value: '椅子' },
				        { key: '显示器', value: '显示器' },
				        { key: '电话', value: '电话' },
				        { key: '笔', value: '笔' },
				        { key: '插排', value: '插排' },
				        { key: '键盘', value: '键盘' },
				        { key: '鼠标', value: '鼠标' },
				        { key: '文件夹', value: '文件夹' },
				        { key: '文件框', value: '文件框' },
				        { key: '计算器', value: '计算器' },
				        { key: '胶带', value: '胶带' },
				        { key: '空气净化器', value: '空气净化器' },
				        { key: '底柜', value: '底柜' }
				      ]
				    },
				    {
				      id: 1,
				      list: [
				        { key: '切纸机', value: '切纸机' },
				        { key: '电脑', value: '电脑' },
				        { key: '键盘', value: '键盘' },
				        { key: '鼠标', value: '鼠标' },
				        { key: '记账本', value: '记账本' },
				        { key: '印泥', value: '印泥' },
				        { key: '点钞机', value: '点钞机' },
				        { key: '碎纸机', value: '碎纸机' },
				        { key: '胶棒', value: '胶棒' },
				        { key: '装订机', value: '装订机' },
				        { key: '液晶显示器', value: '液晶显示器' },
				        { key: '计算器', value: '计算器' },
				        { key: '发票打印机', value: '发票打印机' },
				        { key: '支票打印机', value: '支票打印机' },
				        { key: '三联打印纸', value: '三联打印纸' },
				        { key: '传真机', value: '传真机' },
				        { key: '保险柜', value: '保险柜' },
				        { key: '一体机', value: '一体机' },
				        { key: '空气净化器', value: '空气净化器' },
				        { key: '文件柜', value: '文件柜' },
				        { key: '文件盒', value: '文件盒' },
				        { key: '办公椅', value: '办公椅' }
				      ]
				    },
				    {
				      id: 2,
				      list: [
				        { key: '地垫', value: '地垫' },
				        { key: '台签', value: '台签' },
				        { key: '加湿器', value: '加湿器' },
				        { key: '图钉', value: '图钉' },
				        { key: '大头钉', value: '大头钉' },
				        { key: '工型钉', value: '工型钉' },
				        { key: '回型针', value: '回型针' },
				        { key: 'A4纸', value: 'A4纸' },
				        { key: 'A3纸', value: 'A3纸' },
				        { key: '记事本', value: '记事本' },
				        { key: '铅笔', value: '铅笔' },
				        { key: '文件框', value: '文件框' },
				        { key: '剪刀', value: '剪刀' },
				        { key: '刀片', value: '刀片' },
				        { key: '签字笔', value: '签字笔' },
				        { key: '笔筒', value: '笔筒' },
				        { key: '燕尾夹', value: '燕尾夹' },
				        { key: '便利贴', value: '便利贴' },
				        { key: '无线电话', value: '无线电话' },
				        { key: '鼠标垫', value: '鼠标垫' },
				        { key: '便签纸', value: '便签纸' },
				        { key: '钉书机', value: '钉书机' },
				        { key: '电话', value: '电话' },
				        { key: '名片架', value: '名片架' },
				        { key: '闹钟', value: '闹钟' },
				        { key: '纸杯', value: '纸杯' },
				        { key: '对讲机', value: '对讲机' },
				        { key: '考勤机', value: '考勤机' },
				        { key: '办公桌', value: '办公桌' }
				      ]
				    },
				    {
				      id: 3,
				      list: [
				        { key: '电视机', value: '电视机' },
				        { key: '音响', value: '音响' },
				        { key: '投影仪', value: '投影仪' },
				        { key: '抽纸', value: '抽纸' },
				        { key: '真皮椅', value: '真皮椅' },
				        { key: '矿泉水', value: '矿泉水' },
				        { key: '烟灰缸', value: '烟灰缸' },
				        { key: '激光笔', value: '激光笔' },
				        { key: '白板笔', value: '白板笔' },
				        { key: '白板', value: '白板' }
				      ]
				    },
				    {
				      id: 4,
				      list: [
				        { key: '榨汁机', value: '榨汁机' },
				        { key: '保温杯', value: '保温杯' },
				        { key: '豆浆机', value: '豆浆机' },
				        { key: '电冰箱', value: '电冰箱' },
				        { key: '卫生纸', value: '卫生纸' },
				        { key: '饮料机', value: '饮料机' },
				        { key: '洗手液', value: '洗手液' },
				        { key: '料理机', value: '料理机' },
				        { key: '微波炉', value: '微波炉' },
				        { key: '净水壶', value: '净水壶' },
				        { key: '热水壶', value: '热水壶' },
				        { key: '饮水机', value: '饮水机' },
				        { key: '咖啡机', value: '咖啡机' }
				      ]
				    },
				    {
				      id: 5,
				      list: [
				        { key: '保险箱', value: '保险箱' },
				        { key: '吸尘器', value: '吸尘器' },
				        { key: '扫地机器人', value: '扫地机器人' },
				        { key: '老板椅', value: '老板椅' },
				        { key: '红酒', value: '红酒' },
				        { key: '苹果电脑', value: '苹果电脑' },
				        { key: '空调', value: '空调' },
				        { key: '空气净化器', value: '空气净化器' },
				        { key: '沙发', value: '沙发' }
				      ]
				    }
			    ],
				value:'盆栽',
				loading:true,
				page:1,
				status: 'loadmore',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了',
				skuList:[]
		    }
		},
		onLoad() {
			this.getGoodsList(this.value)
		},
		methods:{
			async getGoodsList(name){
				this.loading = true;
				let query = {page: this.page,page_size: 20,text: name}
				await uniRequest.post('/goods/new/search/',query).then(res=>{
					this.$refs.uDropdown.close();
					// this.loading = false;
					this.skuList = res.data.sku_list
				}).catch(err=>{
					console.log(err)
				});
			},
			goSearch(item){
				this.value = item.value
				this.getGoodsList(item.value)
				
			},
			goto(item){
				uni.navigateTo({
					url:'/pages/product/product?id='+item.id+'&value='
				})
			},
			loadmore(){
				console.log('111')
				this.page++
				this.getGoodsList(this.value)
			},
			async onReachBottom() {
				this.status = 'loading';
				this.page++;
				let query = {page: this.page,page_size: 20,text: this.value}
				await uniRequest.post('/goods/new/search/',query).then(res=>{
					if(this.skuList.length >= res.data.count){
						setTimeout(() => {
							this.status = 'nomore'
						}, 2000)
					}else{
						setTimeout(() => {
							this.status = 'loading'
							this.skuList = this.skuList.concat(res.data.sku_list)
						}, 2000)
					}
					
				}).catch(err=>{
					console.log(err)
				});
			},
			open(index) {
				// console.log(index)
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// console.log(index)
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			change(e) {
				console.log(e)
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				this.$refs.uDropdown.highlight(index);
			}
		}
	}
</script>

<style>
	.page{
		
	}
	.tabs{
		
	}
	.floor-list{
		white-space: nowrap;
	}
	.scoll-wrapper{
		display:flex;
		align-items: flex-start;
	}
	.wrap{
		padding:0 20upx;
	}
	.item{
		padding: 10upx 20upx;
	}
	.slider{
		background-color: #FFFFFF;
		border-radius: 10upx;
		align-items: center;
		justify-content: space-between;
		margin-left: -6px;
		margin-right: -6px;
		margin-bottom: 20upx;
	}
	.demo-layout{
		font-size: 12px;
	}
	.name{
		margin: 20upx 0;
		color: #333333;
		padding: 0 20upx;
	}
	.info{
		padding: 10upx 20upx;
		margin-bottom: 40upx;
	}
	.price{
		font-size: 28upx;
		float: left;
		color: #EE1D23;
		&:before{
			content: '￥';
			font-size: 20upx;
		}
	}
	.scale{
		float: right;
		color: #999999;
	}
	.clearfix{
		float: left;
		padding: 14px;
		font-size: 32upx;
		background-color: #FFFFFF;
	}
	.clearfix:after {
	    content:""; 
	    display: block; 
	    clear:both; 
	}
	
</style>
