<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item" :class="{active: item.id === currentId+1}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside">
			<view v-for="(item,index) in slist[currentId]" :key="item.id" class="s-list" style="position: relative;" :id="'main-'+item.id">
				<view class="" @click="showHide(index)">
					<text class="s-item">{{item.name}}</text>
					<text v-if="index === cateIndex" class="yticon icon-xiajiantou s-item" style="font-size: 20px;right: 20px;"></text>
					<text v-else class="yticon icon-youjiantou s-item" style="font-size: 20px;right: 20px;opacity: 1;"></text>
					<image class="image" style="width: 98%;height: 100px;margin-bottom: 15px;border-radius: 5px;" :src="item.image" mode=""></image>
				</view>
				<view class="t-list" v-if="index === cateIndex">
					<view v-for="(titem,inde) in item.subs" :key="titem.id" class="t-item" @click="navToList(titem)">
						<image style="width: 140upx; height: 140upx;background-color: #f7f7f7;padding: 20upx;border-radius: 10upx;" mode="aspectFit" :src="titem.image!== ''?titem.image:'http://47.94.106.106:8888/group1/M00/5D/27/rBHxiGGtskKAJKE-AAAIN3tX7Zo0727207'"></image>
						<text style="text-align:center;padding: 20upx;">{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 0,
				show:false,
				flist: [],
				slist: [],
				cateIndex:null,
				threeItem:[]
			}
		},
		onShow() {
			this.loadData();
		},
		onLoad(){
			document.getElementsByClassName('uni-page-head')[0].style = 'padding-right:10px;background:#fff;color:#000'
			
		},
		// ���������� buttons ʱ����
		onNavigationBarButtonTap(e) {
			const index = e.index;
			// console.log(index)
			if (index === 0) {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		},
		methods: {
			async loadData(){
				uni.showLoading({
					title:'加载中...'
				})
				let response = await uniRequest.get('/mobile/get/goods/category/');
				if(response.status === 200){
					uni.hideLoading()
					var slist = []
					this.flist = response.data
					this.flist.forEach(ele=>{
						slist.push(ele.subs)
					})
					this.slist = slist
					// console.log(this.slist)
				}
			},
			//һ����������
			tabtap(item){
				// console.log(item)
				if(!this.sizeCalcState){
					this.calcSize();
				}
				this.currentId = item.id-1;
				console.log(this.slist)
				let index = this.slist.findIndex(sitem=>{
					if(sitem !== undefined){
						sitem.subs === item.subs
					}
				});
				if(this.slist[index] !== undefined){
					this.tabScrollTop = this.slist[index].top;
				}
			},
			//�Ҳ�������
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
				}
			},
			//�����Ҳ���ÿ��tab�ĸ߶ȵ���Ϣ
			calcSize(){
				let h = 0;
				this.slist.forEach(item=>{
					if(item !== undefined){
						let view = uni.createSelectorQuery().select("#main-" + [0].id);
						view.fields({
							size: true
						}, data => {
							item[0].top = h;
							h += item[0].height;
							item[0].bottom = h;
						}).exec();
					}
					
				})
				this.sizeCalcState = true;
			},
			
			// ��ת��Ʒ�б�
			navToList(item){
				console.log(item)
				uni.navigateTo({
					url: `/pages/product/list?tid=${item.id}`
				})
				/* uni.navigateTo({
					url: `/pages/search/searchList?value=${item.name}&tid=${item.id}`
				}) */
			},
			
			// ����������ʾ����
			showHide(index){
				// console.log(index)
				if(this.cateIndex === index){
					this.cateIndex = null
					return
				}else{
					this.cateIndex = index
					return
				}
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #fff;
	}
	.image:after{
		position: absolute;
		top: 0;
		left: 0;
		content: '';
		background: rgba($color: #000000, $alpha: 0.2);
		color: #FFFFFF;
		z-index: 1;
		width: 100%;
		height: 100%;
	}
	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #F7F7F7;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: #666666;
		position: relative;
		&.active{
			color: #333333;
			font-weight: bold;
			font-size: 30upx;
			background: #FFFFFF;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: #EE1D23;
				border-radius: 0 4px 4px 0;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		padding-top: 8upx;
		font-size: 28upx;
		color: #FFFFFF;
		position: absolute;
		z-index: 2;
		font-size: 16px;
		margin-left: 20px;
		line-height: 100px;
		height: 100px;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
	}
</style>
