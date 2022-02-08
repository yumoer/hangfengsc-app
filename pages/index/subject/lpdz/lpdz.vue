<template>
	<view class="page">
		<view class="banner">
			<image style="width: 100%;height: 320upx;" :src="bannerURL" mode=""></image>
		</view>
		<view class="cates">
			<u-grid
					:border="false"
					col="4"
					
			>
				<u-grid-item
						v-for="(listItem,listIndex) in cateList"
						:key="listIndex"
						@click="goToSearch(listItem.name)"
				>
					<u-image :showLoading="true" shape="circle" :src="listItem.iconURL" width="60px" height="60px"></u-image>
					<text class="grid-text">{{listItem.name}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="hotmake">
			<view class="title">
				<span class='titleLeft'>热门定制</span>
				<span style='float: right;' @click="showAll">
					<span>{{isShow ? '收起' : '展开全部'}}</span>
					<u-icon :name="isShow ? 'arrow-up' : 'arrow-down'" style="margin-left: 20upx;"></u-icon>
				</span>
			</view>
			<view class="hotMore":style="{height:isShow ? '100%' : '500upx'}">
				<u-row
					justify="space-between"
					:gutter="10"
				>
					<u-col span="6" class="slider" v-for="(item,index) in hotList" :key='index' @click="goToSearch(item.name)">
						<view class="demo-layout">
							<image style="width: 100%;height: 480upx;border-radius: 5px;" :src="item.imageURL" mode=""></image>
							<view class="name">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="hotmake">
			<view class="title">
				<span class='titleLeft'>礼品专题</span>
			</view>
			<view class="">
				<swiper class="swiper">
					<swiper-item>
						<u-grid :col="3" hover-class="hover-class">
							<u-grid-item v-if="index < 3" v-for="(item, index) in topicList" :index="index" @click="goToSearch(item.text)" :key="index">
								<image style="width: 212upx;height: 212upx;" :src="item.imageURL" mode=""></image>
								<text class="grid-text" style="position: absolute;color: #FFFFFF;font-size: 28upx;line-height: 212upx;">{{ item.text }}</text>
							</u-grid-item>
						</u-grid>
					</swiper-item>
					<swiper-item>
						<u-grid :col="3" hover-class="hover-class">
							<u-grid-item v-if="index > 2" v-for="(item, index) in topicList" :index="index" :key="index">
								<image style="width: 212upx;height: 212upx;" :src="item.imageURL" mode=""></image>
								<text class="grid-text" style="position: absolute;color: #FFFFFF;font-size: 28upx;line-height: 212upx;">{{ item.text }}</text>
							</u-grid-item>
						</u-grid>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="hotmake">
			<view class="title">
				<span class='titleLeft'>部分客户</span>
				<span style='float: right;' @click="customerAll">
					<span>{{isCustomer ? '收起' : '展开全部'}}</span>
					<u-icon :name="isCustomer ? 'arrow-up' : 'arrow-down'" style="margin-left: 20upx;"></u-icon>
				</span>
			</view>
			<view class="hotMore" :style="{height:isCustomer ? '100%' : '360upx'}">
				<u-row
					justify="space-between"
					:gutter="10"
				>
					<u-col span="6" class="slider" v-for="(item,index) in customerList" :key='index'>
						<view class="demo-layout">
							<image style="width: 100%;height: 160upx;border-radius: 5px;" :src="item.url" mode=""></image>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="hotmake">
			<view class="title">
				<span class='titleLeft'>合作伙伴</span>
				<span style='float: right;' @click="partnerAll">
					<span>{{isPartner ? '收起' : '展开全部'}}</span>
					<u-icon :name="isPartner ? 'arrow-up' : 'arrow-down'" style="margin-left: 20upx;"></u-icon>
				</span>
			</view>
			<view class="hotMore" :style="{height:isPartner ? '100%' : '360upx'}">
				<u-row
					justify="space-between"
					:gutter="10"
				>
					<u-col span="6" class="slider" v-for="(item,index) in partnerlist" :key='index'>
						<view class="demo-layout">
							<image style="width: 100%;height: 160upx;border-radius: 5px;" :src="item.url" mode=""></image>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="hotmake">
			<view class="title">
				<span class='titleLeft'>商品推荐</span>
			</view>
			<view class="hotMore">
				<u-row
					justify="space-between"
					:gutter="10"
				>
					<u-col span="6" class="slider" v-for="(item,index) in skuList" :key='index' v-if="item !== undefined">
						<view class="demo-layout" style="height: 520upx;background-color: #FFFFFF;" @click="goToDetail(item)">
							<image style="width: 100%;height: 364upx;border-radius: 5px;" :src="item.image" mode=""></image>
							<view class="" style="padding: 10upx 20upx;">
								<view class="clamp2">{{item.title}}</view>
								<view class="" style="margin-top: 15upx;">
									<span style='float: left;color: #EE1D23;'>{{item.text}}</span>
									<span style='float: right;color: #999999;'>{{item.sales}}人付款</span>
								</view>
							</view>
						</view>
					</u-col>
				</u-row>
				<u-loadmore 
				        :status="status" 
				        :loading-text="loadingText" 
				        :loadmore-text="loadmoreText" 
				        :nomore-text="nomoreText" 
				    />
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
			   bannerURL:'http://47.94.106.106:8888/group1/M00/53/9B/rBHxiGELmUuAZUjNAAfB9Ow2vXw6435497',
			   isShow:false,
			   isCustomer:false,
			   isPartner:false,
			   status: 'loadmore',
			   page:11,
			   loadingText: '努力加载中',
			   loadmoreText: '轻轻上拉',
			   nomoreText: '实在没有了',
			   skuList:[],
			   customerList: [{
				      id: 0,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-AaX2LAAAe7uMupQE4339590'
				    },
				    {
				      id: 1,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-AU0T3AABKMkPS9Ys4733954'
				    },
				    {
				      id: 2,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-AErnAAAAne4j0aus3305301'
				    },
				    {
				      id: 3,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-Aa588AAAaSLunLjM6829879'
				    },
				    {
				      id: 4,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-AMmlWAAA4EMF6tAY6640935'
				    },
				    {
				      id: 5,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-AdV4kAAAbdWJmJqM9759299'
				    },
				    {
				      id: 6,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-AHKGLAAAwYETlNK82224202'
				    },
				    {
				      id: 7,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-AcyKsAAA1auKvxBQ8592696'
				    },
				    {
				      id: 8,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-AcyKsAAA1auKvxBQ8592696'
				    },
				    {
				      id: 9,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-AfTyUAAAuOzNy08w4260280'
				    },
				    {
				      id: 10,
				      url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkf-ATo1dAABYWZXsQqw6489919'
				    }],
			   hotList: [
			       {
			         id: 0,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/53/9E/rBHxiGELrnWAByTMAAH71WSxq6U9083680',
			         name: '奖杯奖牌'
			       },
			       {
			         id: 1,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/B1/rBHxiGEkSWiAJeUXAALGA6hiJyM5493431',
			         name: '台历挂历'
			       },
			       {
			         id: 2,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAJdCXAANfR-qkOCg0373281',
			         name: '箱包皮具'
			       },
			       {
			         id: 3,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAE3rdAAKY61dpe5M8499957',
			         name: '水杯'
			       },
			       {
			         id: 4,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAF735AAOj2MzGfo49943501',
			         name: 'U盘'
			       },
			       {
			         id: 5,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAF1KIAAFjuNNR6sM1022420',
			         name: '一次性水杯'
			       },
			       {
			         id: 6,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSADONOAAFobDm4N4A8133484',
			         name: '服装服饰'
			       },
			       {
			         id: 7,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSADPZoAALj0pzokDo8402751',
			         name: '本子册子'
			       },
			       {
			         id: 8,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAD0g8AARJXH73MV02933979',
			         name: '纪念币'
			       },
			       {
			         id: 9,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSABVDcAAK8Y35BHAs4301730',
			         name: '雨伞'
			       },
			       {
			         id: 10,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSABoSzAAI28EyMZ747110452',
			         name: '坚果'
			       },
			       {
			         id: 11,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAYYUyAALr7U2z-Qc1282466',
			         name: '大闸蟹'
			       },
			       {
			         id: 12,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAR2cjAAL2-RxXxIE7062054',
			         name: '月饼'
			       },
			       {
			         id: 13,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAfwK9AAH5s3TxIKM8906854',
			         name: '粽子'
			       },
			       {
			         id: 14,
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/B1/rBHxiGEkSTGAMT0pAAGR1ErVcr89350543',
			         name: '红酒'
			       },
			   ],
			   cateList:[{
						id:0,
						name: '创意礼品',
						iconURL: 'http://47.94.106.106:8888/group1/M00/53/9B/rBHxiGELma-ADUVJAAAuK1R0Y_A0028888'
					},
					{
						id:1,
						name: '数码电子',
						iconURL: 'http://47.94.106.106:8888/group1/M00/53/9B/rBHxiGELmbKAG1rUAAA6Xrc7Ogc0481543'
					},
					{
						id:2,
						name: '商务礼品',
						iconURL: 'http://47.94.106.106:8888/group1/M00/53/9B/rBHxiGELmbeAcYSIAAAdEF7l88w1314854'
					},
					{
						id:3,
						name: '箱包皮具',
						iconURL: 'http://47.94.106.106:8888/group1/M00/53/9B/rBHxiGELmb-AAuTUAAAib_WbJbQ7399288'
					},
					{
						id:4,
						name: '家居日常',
						iconURL: 'http://47.94.106.106:8888/group1/M00/53/9B/rBHxiGELmcWAWCBzAAA4VA3z3Rc3552606'
					},
					{
						id:5,
						name: '汽车周边',
						iconURL: 'http://47.94.106.106:8888/group1/M00/53/9B/rBHxiGELmcqAFiCHAAA-rr9ji-A6658144'
					},
					{
						id:6,
						name: '运动户外',
						iconURL: 'http://47.94.106.106:8888/group1/M00/53/9B/rBHxiGELmc6AEZ81AABRCwaL-IQ5605623'
					},
					{
						id:7,
						name: '服装服饰',
						iconURL: 'http://47.94.106.106:8888/group1/M00/53/9B/rBHxiGELmdOAYUUQAAAnrtUAPKQ6631892'
					},
				],
			   topicList: [
			       {
			         id: 0,
			         text: '年中礼品',
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAPdb7AABZdlCm6RQ1240829'
			       },
			       {
			         id: 1,
			         text: '丽人礼品',
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAETwwAABDVdxB2ng6278488'
			       },
			       {
			         id: 2,
			         text: '端午礼品',
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAY-t-AAC-77rkthk2496783'
			       },
			       {
			         id: 3,
			         text: '中秋礼品',
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAENdAAAEEcVIY6a84804579'
			       },
			       {
			         id: 4,
			         text: '校庆礼品',
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAHUgVAAEV-dx6U7c7406742'
			       },
			       {
			         id: 5,
			         text: '聚会礼品',
			         imageURL: 'http://47.94.106.106:8888/group1/M00/55/AE/rBHxiGEkRWSAEG9nAABlCKXf2Ps1822097'
			       }
			   ],
			   partnerlist:[
				   {
				         id: 0,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkFeAMungAAAgBjVPZHI3994506'
				       },
				       {
				         id: 1,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkF6AeCEwAAAjH2q6j7Q4764168'
				       },
				       {
				         id: 2,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkF6AOge5AAAO309JugE6174759'
				       },
				       {
				         id: 3,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkF6AIusPAAAf0v5MjQ03812263'
				       },
				       {
				         id: 4,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkF6AXJ4DAAAT5KKX8YA4730257'
				       },
				       {
				         id: 5,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkF6AIKKUAAAuRjhvZ2E8935410'
				       },
				       {
				         id: 6,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkF6ALtEfAAAf02ldP9c5536763'
				       },
				       {
				         id: 7,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkF6AHOcpAAAkGgtTNeo6040165'
				       },
				       {
				         id: 8,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkF6AcpdgAAA6uoTK8A40583135'
				       },
				       {
				         id: 9,
				         url: 'http://47.94.106.106:8888/group1/M00/53/A3/rBHxiGEMkF6Af3LhAABJBKFe6io7120896'
				       }
			   ]
			};
	    },
		onLoad() {
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(){
				let query = {page: this.page,page_size: 10,key: 'index_hwtj'}
				await uniRequest.get('/content/guess/goods/',{params:query}).then(res=>{
					this.skuList = res.data.data
					
				}).catch(err=>{
					console.log(err)
				});
			},
			
			async onReachBottom() {
				this.status = 'loading';
				this.page++;
				let query = {page: this.page,page_size: 10,key: 'index_hwtj'}
				await uniRequest.get('/content/guess/goods/',{params:query}).then(res=>{
					this.skuList = this.skuList.concat(res.data.data)
					console.log(this.skuList)
					if(this.skuList.length >= res.data.total){
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
			goToDetail(item){
				uni.navigateTo({
					url:'/pages/product/product?id='+item.id+'&value='
				})
			},
			goToSearch(name){
				uni.navigateTo({
					url:'/pages/search/searchList?value='+name
				})
			},
			tabClick(value){
				console.log(value)
				this.defaultIndex = value
			},
			goto(url){
				console.log(url)
				uni.navigateTo({
					url
				})
			},
			showAll(){
				this.isShow = !this.isShow
			},
			customerAll(){
				this.isCustomer = !this.isCustomer
			},
			partnerAll(){
				this.isPartner = !this.isPartner
			},
		}
	}
</script>

<style lang="scss">
/deep/ .u-grid-item{
	background: none!important;
}
/deep/ .u-grid-item-box{
	padding: 20upx 0!important;
}
.page{
	width: 100%;
	height: 100%;
	padding: 30upx;
}
.grid-text{
	margin-top: 20upx;
}
.slider{
	border-radius: 10upx;
	align-items: center;
	justify-content: space-between;
	margin-left: -6px;
	margin-right: -6px;
	margin-bottom: 20upx;
	position: relative;
}
.name{
	position: absolute;
	color: #FEFEFE;
	bottom: 60upx;
	left: 40upx;
}
.title{
	height: 40px;
	line-height: 40px;
}
.titleLeft{
	color: #333333;
	font-weight: bold;
	font-size: 16px;
	float: left;
}
.hotMore{
	overflow: hidden;
}
</style>
