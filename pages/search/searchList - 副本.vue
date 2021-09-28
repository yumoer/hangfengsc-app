<template>
	<view class="" style="position: relative;">
		<view class="search">
			<!-- #ifdef APP-PLUS -->
				<image src="../../static/zy-search/voice.svg" mode="aspectFit" @click="startRecognize()" class="voice-icon"></image>
			<!-- #endif -->
			<template v-if="isFocus" >
				<input maxlength="20" focus type="text" value="" confirm-type="search" @confirm="getDate()" placeholder="请输入关键词搜索" v-model.trim="searchText"/>
			</template>
			<template v-else>
				<input maxlength="20" type="text" value="" confirm-type="search" @confirm="getDate()" placeholder="请输入关键词搜索" v-model.trim="searchText"/>
			</template>
			<image style="" src="../../static/zy-search/search.svg" mode="aspectFit" @click="getDate()" class="search-icon"></image>
		</view>
		<view style="position: absolute;right: 15px;top: 2px;">
			<text class="yticon icon-gwc-wei" style="font-size: 24px;color: #666;"></text>
		</view>
		
		<view class="" style="width: 100%;">
			<view class="guess-section">
				<view 
					v-for="(item, index) in searchData" :key="index"
					class="guess-item"
					@click="navToDetailPage(item)"
				>
					<view class="image-wrapper" >
						<image :src="item._source.detail_image" mode="aspectFill"></image>
					</view>
					<view class="" style="padding: 10px;position: relative;">
						<text class="title">{{item._source.name}}</text>
						<text style="display: inline-block;">
							<text class="price">{{item._source.price}}</text>
							<text style="color: rgb(144, 147, 153); line-height:60upx;font-size: 28upx;position: absolute;right: 16px;" >{{item._source.sales}}人付款</text>
						</text>
					</view>
					
				</view>
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
				loadingType: 'more', //加载更多状态
				searchData:[],
				filterIndex:0,
				page:1,
				page_size:10,
				backTop: {
					src: '../../static/back-top/top.png',
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
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
				}else{
					this.loadingType = 'loading'
				}
				await uniRequest.post('/goods/new/search/',{text:this.searchText,page:this.page,page_size:this.page_size}).then(res=>{
					if(res.data.count === 0){
						uni.showToast({
							title: '搜索失败，无此关键字',
							icon: 'none',
							duration: 1000
						});
						this.loadingType = 'nomore'
						this.searchData = res.data.sku_list
						console.log(this.searchData)
					}else{
						this.searchData = res.data.sku_list
						console.log(this.searchData)
						if(this.searchData.length < 10){
							this.loadingType = 'nomore'
						}
						
					}
				});
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
				    let id = item._id;
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
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #fff;
	}
	.search{
		width: 620upx;
		margin: 20upx 34upx 10px;
		height: 60upx;
		input{
			background-color: #F7F7F7;
			padding: 10upx 40upx;
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
	
	
</style>
<style lang="scss">
	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
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
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
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
					color: $base-color;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
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
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 20upx 30upx;
		background-color: #f7f7f7;
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
			border-radius: 0;
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
