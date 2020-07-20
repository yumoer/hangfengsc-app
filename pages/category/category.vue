<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId+1}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside">
			<view v-for="item in slist[currentId]" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.name}}</text>
				<view class="t-list" >
					<view @click="navToList(titem.id)" v-for="titem in item.subs" :key="titem.id" class="t-item" >
						<image :src="titem.image!== ''?titem.image:'http://hbimg.b0.upaiyun.com/dbfaad8aed38c49805b16e7b2afdb441ab2813b68895-ihqaSI_fw658'"></image>
						<text style="text-align:center;">{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- <scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in slist" class="s-list" :id="item.id">
				<text class="s-item">{{item.name}}</text>
				<view class="t-list">
					<view @click="navToList(item.id, titem.id)" v-if="titem.id === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
						<image :src="titem.image"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view> -->
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
				flist: [],
				slist: [],
			}
		},
		onLoad(){
			this.loadData();
		},
		methods: {
			async loadData(){
				let response = await uniRequest.get('/mobile/get/goods/category/');
				console.log(response)
				if(response.status === 200){
					var slist = []
					this.flist = response.data
					this.flist.forEach(ele=>{
						this.slist.push(ele.subs)
					})
					console.log(this.slist)
					
					/* this.flist.forEach(ele=>{
						this.slist.push(ele.subs)
						console.log(this.slist)
						this.slist.forEach(el=>{
							this.tlist.push(el)
							console.log(this.tlist)
						})
					}) */
					
				}else{
					
				}
				/* let list = await this.$api.json('cateList');
				list.forEach(item=>{
					if(!item.pid){
						this.flist.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类
					}else if(!item.picture){
						this.slist.push(item); //没有图的是2级分类
					}else{
						this.tlist.push(item); //3级分类
					}
				}) */
			},
			//一级分类点击
			tabtap(item){
				console.log(item)
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
				console.log(index)
				if(this.slist[index] !== undefined){
					this.tabScrollTop = this.slist[index].top;
				}
			},
			//右侧栏滚动
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
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.slist.forEach(item=>{
					console.log()
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
			navToList(tid){
				uni.navigateTo({
					url: `/pages/product/list?tid=${tid}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
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
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
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
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>
