<template>
	<view class="wrap">
		<view class="fixed">
			<view class="search">
				<!-- #ifdef APP-PLUS -->
					<image src="../../static/zy-search/voice.svg" mode="aspectFit" @click="startRecognize()" class="voice-icon"></image>
				<!-- #endif -->
				<template>
					<input maxlength="20" type="text" value="" confirm-type="search" @confirm="getDate()" placeholder="请输入关键词搜索" v-model.trim="searchText"/>
				</template>
				<image src="../../static/zy-search/search.svg" mode="aspectFit" @click="getDate()" class="search-icon"></image>
			</view>
			<view class="cart" @click="goToPage('/pages/cart/cart')">
				<text class="yticon icon-gwc-wei"></text>
			</view>
			
			<view class="navbar">
				<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
					综合
				</view>
				<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
					<text>销量</text>
					<view class="p-box">
						<text :class="{active: priceOrder === 1 && filterIndex === 1}" class="yticon icon-shang"></text>
						<text :class="{active: priceOrder === 2 && filterIndex === 1}" class="yticon icon-shang xia"></text>
					</view>
				</view>
				<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
					<text>价格</text>
					<view class="p-box">
						<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="yticon icon-shang"></text>
						<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="yticon icon-shang xia"></text>
					</view>
				</view>
				<view class="nav-item cate-item" @click="toggleCateMask('show')">
					<text>筛选</text>
					<view class="icons yticon icon-cate-shaixuan"></view>
				</view>
			</view>
		</view>
		
		<view class="goods">
			<view class="guess-section">
				<view 
					v-for="(item, index) in searchData" :key="index"
					class="guess-item"
					@click="navToDetailPage(item)"
				>
					<view class="image-wrapper" >
						<image :src="item._source.detail_image" mode="aspectFill"></image>
					</view>
					<view class="info">
						<text class="title">{{item._source.name}}</text>
						<text style="">
							<text class="price">{{item._source.price}}</text>
							<text class="sales">{{item._source.sales}}人付款</text>
						</text>
					</view>
					
				</view>
			</view>
		</view>
		
	
		
		<view class="cate-mask" :class="cateMaskState ===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					
					<view class="cate-contents" v-for="(item,index) in brandData">
						<text class="cate-name">{{item.name}}</text>
						<view class="cate-brand">
							<view v-for="(ele,index) in item.cates" class="cate-bold">
								<text class="cate-text" style="">{{ele}}</text>
							</view>
						</view>
					</view>
					
					<view class="cate-contents">
						<text class="cate-name">价格区间</text>
						<view class="cate-brand center">
							<view class="cate-view">
								<input type="text" class="cate-bold" placeholder="最低价" style="width: 200upx;" :value="range.gte" @input="gteInput"/>
							</view>
							<view class="cate-view brandWidth">
								<text class="yticon icon--jianhao" style="position: absolute;margin-left:-8px;margin-top: -30px;"></text>
							</view>
							<view class="cate-view">
								<input type="text" class="cate-bold" placeholder="最高价" style="width: 200upx;" :value="range.lte" @input="lteInput"/>
							</view>
						</view>
					</view>
					
					<view class="cate-setBtn">
						<view class="cate-setWrap">
							<button type="default" class="cate-btn" @click="toggleCateMask('click')">取消</button>
							<button type="default" class="cate-btn submit" @click="getDate">确认</button>
						</view>
					</view>
					
					<!-- <view v-for="item in cateList" :key="item.id">
						<view class="cate-item b-b two">{{item.name}}</view>
						<view 
							v-for="tItem in item.child" :key="tItem.id" 
							class="cate-item b-b" 
							:class="{active: tItem.id==cateId}"
							@click="changeCate(tItem)">
							{{tItem.name}}
						</view>
					</view> -->
				</scroll-view>
			</view>
		</view>
		
		<uni-load-more :status="loadingType"></uni-load-more>
		
		<backTop :src="backTop.src"  :scrollTop="backTop.scrollTop"></backTop>
	</view>
	
</template>

<script>
	import uniRequest from 'uni-request'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import backTop from '@/components/back-top/back-top.vue'
	export default {
		data(){
			return{
				searchText:'',
				isFocus:false, 
				speechEngine:'iFly',
				loadingType: 'loading', //加载更多状态
				searchData:[],
				range:{
					gte:null,
					lte:null
				},
				brandData:[
					{name:'品牌',cates:['得力','爱普生','飞利浦','哈曼卡顿','国誉','得力','爱普生','飞利浦','哈曼卡顿','得力','爱普生','飞利浦','哈曼卡顿','国誉','得力','爱普生','爱普生','飞利浦']},
					{name:'全部分类',cates:['得力','爱普生','飞利浦','哈曼卡顿','国誉','得力','爱普生','飞利浦','哈曼卡顿','得力','爱普生','飞利浦','哈曼卡顿','国誉','得力','爱普生','爱普生','飞利浦']}
				],
				cateList:[],
				filterIndex:0,
				page:1,
				page_size:10,
				headerTop:"0px",
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateMaskState: 0, //分类面板展开状态
				backTop: {
					src: 'http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttDGAXvXbAAAHgIVNqm88710706',
					scrollTop: 0
				},
				scrollTop: 0
			}
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		components:{uniLoadMore,backTop},
		onLoad(option){
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			this.searchText = option.value
			this.getDate('add')
		},
		//加载更多
		onReachBottom(){
			this.page_size = this.page_size + 10
			this.getDate();
		},
		methods:{
			async getDate(type){
				console.log(this.range)
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
				}else{
					this.loadingType = 'loading'
				}
				let query = {
					text:this.searchText,
					page:this.page,
					page_size:this.page_size,
					sort:'',
					orderBy:'',
					
				}
				if(this.range.gte && this.range.lte){
					query.range = this.range
				}
				switch (this.filterIndex){
					case 0:
						query.sort = '';
						query.orderBy = 'desc'
						break;
					case 1:
						query.sort = 'sales';
						this.priceOrder === 1 ? query.orderBy = 'asc' : query.orderBy = 'desc';
						break;
					case 2:
						query.sort = 'comments';
						this.priceOrder === 1 ? query.orderBy = 'desc' : query.orderBy = 'asc';
						break;
				}
				
				await uniRequest.post('/goods/new/search/',query).then(res=>{
					if(res.data.count === 0){
						uni.showToast({
							title: '搜索失败，无此关键字',
							icon: 'none',
							duration: 1000
						});
						this.loadingType = 'nomore'
						uni.hideLoading()
						this.toggleCateMask('click')
						this.searchData = res.data.sku_list
						console.log(this.searchData)
					}else{
						this.searchData = res.data.sku_list
						this.toggleCateMask('click')
						uni.hideLoading()
						if(this.searchData.length < 10){
							this.loadingType = 'nomore'
						}
						
					}
				});
			},
			goToPage(path){
				uni.switchTab({
					url:path
				})
			},
			gteInput(event) {
				console.log(event.target.value)
				this.range.gte = event.target.value
			},
			lteInput(event) {
				console.log(event.target.value)
				this.range.lte = event.target.value
			},
			//筛选点击
			tabClick(index){
				console.log(index)
				if(this.filterIndex === index && index !== 1 && index !== 2){
					return;
				}
				this.filterIndex = index;
				console.log(this.filterIndex)
				if(index === 1 || index === 2){
					this.priceOrder = this.priceOrder === 1 ? 2: 1;
				}else{
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.getDate('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//显示分类面板
			toggleCateMask(type){
				console.log(type)
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item){
				console.log(item)
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.getDate('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			searchStart() {	//触发搜索
				let _this = this;
				if (_this.searchText == '') {
					uni.showToast({
						title: '请输入关键字',
						icon: 'none',
						duration: 1000
					});
				}else{
					_this.$emit('getSearchText', _this.searchText);
					uni.getStorage({
						key:'search_cache',
						success(res){
							let list = res.data;
							if(list.length > 5){
								for(let item of list){
									if(item == _this.searchText){
										return;
									}
								}
								list.pop();
								list.unshift(_this.searchText);
							}else{
								for(let item of list){
									if(item == _this.searchText){
										return;
									}
								}
								list.unshift(_this.searchText);
							}
							_this.hList = list;
							uni.setStorage({
								key: 'search_cache',
								data: _this.hList
							});
						},
						fail() {
							_this.hList = [];
							_this.hList.push(_this.searchText);
							uni.setStorage({
								key: 'search_cache',
								data: _this.hList
							});
							_this.$emit('getSearchText', _this.searchText);
						}
					})
				}
			},
			startRecognize() {	//语音输入
				let _this = this;
				let options = {};
				options.engine = _this.speechEngine;
				options.punctuation = false; // 是否需要标点符号 
				options.timeout = 10 * 1000;
				plus.speech.startRecognize(options, function(s) {
					_this.searchText = _this.searchText + s;
				});
			},
			//详情页
			navToDetailPage(item) {
				console.log(item)
				//测试数据没有写id，用title代替
				if(item.object === undefined){
				    let id = item._source.id;
					uni.navigateTo({
						url: `/pages/product/product?id=`+id
					})
				}else{
					let id = item.object.id;
					uni.navigateTo({
						url: `/pages/product/product?id=`+id
					})
				}
			},
			stopPrevent(){}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.wrap{
		
	}
	.fixed{
		width: 100%;
		height: 100upx;
		background-color: #fff;
		position: fixed;
		z-index: 10;
	}
	.search{
		width: 620upx;
		margin: 20upx 34upx 10px;
		height: 60upx;
		position: relative;
		input{
			background-color: #F7F7F7;
			padding: 10upx 40upx;
			/* #ifdef APP-PLUS */
			padding: 10upx 80upx;
			/* #endif */
			font-size: 28upx;
			border-radius: 10upx;
			height: 60upx;
			
		}
		.voice-icon{
			width: 60upx;
			height: 60upx;
			padding: 10upx 14upx 14upx 14upx;
			position: absolute;
			left: 16upx;
			top: 4upx;
			z-index: 10;
		}
		.search-icon{
			width: 60upx;
			height: 60upx;
			padding: 16upx;
			position: absolute;
			right: 0;
			top: -2upx;
		}
	}
	.cart{
		position: absolute;
		right: 30upx;
		top: 26upx;
		text{
			font-size: 24px;
			color: #666;
		}
	}
	.navbar{
		position: fixed;
		left: 0;
		top: 180upx;
		/* #ifdef APP-PLUS */
		top: 90upx;
		/* #endif */
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;
			.icons{
				font-size: 12px;
				margin-left: 10upx;
			}
			&.current{
				color: $uni-color-hangfeng;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $uni-color-hangfeng;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $uni-color-hangfeng;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}
	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-contents{
			width: 100%;
			margin: 0 auto;
			padding-left: 10%;
			border-bottom: 2upx solid #ddd;
			&:nth-child(3){
				border: none;
			}
			.cate-name{
				font-size: 16px;
				color: #333;
				font-weight: bold;
				line-height: 100upx;
			}
			.center{
				text-align: center;
			}
			.cate-brand{
				.cate-view{
					width: 200upx;
					display: inline-block;
				}
				.brandWidth{
					width: 80upx;
				}
				.cate-bold{
					width: 144upx;
					height: 60upx;
					background-color:#F7F7F7;
					border-radius: 10upx;
					display: inline-block;
					margin: 0 15px 10px 0;
					&:nth-child(3n){
						margin-right: 0;
					}
					.cate-text{
						display: flex;
						justify-content: center;
						line-height: 60upx;
						color:#666
					}
				}
			}
			
		}
		
		.cate-setBtn{
			width: 100%;
			height: 80upx;
			margin-top: 20px;
			.cate-setWrap{
				width: 70%;
				height: 100%;
				margin: 0 auto;
				.cate-btn{
					width: 200upx;
					display: inline-block;
					background-color: #F7F7F7;
					color: #666;
				}
				.submit{
					background-color: #EE1D23;
					color: #fff;
					float: right;
				}
			}
		}
		
		
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
	.goods{
		width: 100%;
		padding-top: 170upx;
	}
	.info{
		padding: 10px;
		position: relative;
	}
	.sales{
		color: rgb(144, 147, 153);
	    line-height:60upx;
		font-size: 28upx;
		position: absolute;
		right: 32upx;
	}
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 20upx 30upx;
		background-color: #f7f7f7;
		border-radius: 20px;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			border-radius: 0 0 10px 10px;
			margin-bottom: 40upx;
			background-color: #fff;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			// border-radius: 0;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-base;
			color: $font-color-dark;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient:vertical;
			-webkit-line-clamp: 2;
		}
		.price{
			font-size: 30upx;
			color: $uni-color-hangfeng;
			line-height: 60upx;
			margin-left: -10upx;
			font-weight: bold;
			&:before{
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}
	}
</style>
