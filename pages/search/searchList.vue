<template>
	<view class="">
		<view class="search">
			<!-- #ifdef APP-PLUS -->
				<image src="../../static/zy-search/voice.svg" mode="aspectFit" @click="startRecognize()" class="voice-icon"></image>
			<!-- #endif -->
			<template v-if="isFocus">
				<input maxlength="20" focus type="text" value="" confirm-type="search" @confirm="getDate()" placeholder="请输入关键词搜索" v-model.trim="searchText"/>
			</template>
			<template v-else>
				<input maxlength="20" type="text" value="" confirm-type="search" @confirm="getDate()" placeholder="请输入关键词搜索" v-model.trim="searchText"/>
			</template>
			<image src="../../static/zy-search/search.svg" mode="aspectFit" @click="getDate()" class="search-icon"></image>
		</view>
		<view class="guess-section">
			<view 
				v-for="(item, index) in searchData" :key="index"
				class="guess-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image style="border: 1px solid #ddd;" :src="item._source.detail_image" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item._source.name}}</text>
				<text class="price">￥{{item._source.price}}</text>
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
	.search{
		width: 640upx;
		margin: 20upx auto 0;
		position: relative;
		input{
			background-color: #F7F7F7;
			padding: 10upx 74upx;
			font-size: 28upx;
			border-radius: 50upx;
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
			z-index: 10;
		}
	}
	
	
</style>
<style lang="scss">
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		margin-top: 30upx;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
</style>
