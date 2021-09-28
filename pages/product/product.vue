<template>
	<view class="container">
		<view class="carousel">
			<swiper circular=true duration="400" @change="swiperChange">
				<swiper-item class="swiper-item" v-for="(item,index) in detailsArr.images" :key="index" v-if="item !== null">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		
		<!-- 名称 -->
		<view class="introduce-section">
			<text class="title">{{detailsArr.name}}</text>
			<view class="price-box" style="display: block;">
				<text class="price-tip">¥</text>
				<text class="price">{{detailsArr.price}}</text>
				<text class="m-price">¥{{detailsArr.market_price}}</text>
				<!-- <text class="coupon-tip">{{tip}}</text> -->
				<text style="display: inline-block;float: right;color: #909399;">销量: {{detailsArr.sales}}</text>
			</view>
			<!--  分享 -->
			<!-- #ifdef APP-PLUS -->
			<view class="share-section"> <!-- @click="share"-->
				<view>
					<image style="width: 9px;height: 12.5px;" src="../../static/index/quan.png" mode=""></image>
					<text style="font-size: 13px;color: #EE1D23;margin-left: 10px;">分享抢券</text>
				</view>
				<text class="tit">分享商品得满49减10红包</text>
				<view class="share-btn"  @tap="shareInfo">
					<text class="yticon icon-fenxiang2"></text>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="share-section" @click="share">
				<view>
					<image style="width: 9px;height: 12.5px;" src="../../static/index/quan.png" mode=""></image>
					<text style="font-size: 13px;color: #EE1D23;margin-left: 10px;">分享抢券</text>
				</view>
				<text class="tit">分享商品得满49减10红包</text>
				<view class="share-btn">
					<text class="yticon icon-fenxiang2"></text>
				</view>
			</view>
			<!-- #endif -->
		</view>
		
		<view class="introduce-section" v-if="specs.length > 0">
			<text>{{specs[0].name}}</text>
			<view v-for="(spec,index) in specs[0].data" :key="index" style="display: inline-block;padding: 5px;margin-left: 15px;" v-bind:class="{'back':spec.sku === Number(sku_id)}" @click="getPages(spec.sku)">
				<text>{{spec.value}}</text>
			</view>
			
		</view>
		
		
		
		<view class="c-list">
			<view class="c-row" @click="join">
				<text class="tit">已选</text>
				<view class="con">
					<text class="selected-text">
						裸粉带镜款
					</text>
				</view>
				<text class="yticon icon-shengluehao2"></text>
			</view>
			<!-- <view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满99免邮费</text>
				</view>
			</view> -->
			<view class="c-row">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>假一赔十·退货运费险·上门取退·极速退款</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row" @click="join">
				<text class="tit">参数</text>
				<view class="con">
					<!-- <text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.name}}
					</text> -->
					<text class="selected-text">
						<text style="margin-right: 20px;">品牌</text>
						<text>材质</text>
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="share-section" style="margin: 10upx 30upx;padding: 20upx 0;"> <!-- @click="share"-->
				<view style="margin-right: 50upx;">
					<image style="width: 11px;height: 11px;" src="../../static/index/duigou.png" mode=""></image>
					<text style="font-size: 12px;margin-left: 6upx;">假一赔十</text>
				</view>
				<view style="margin-right: 50upx;">
					<image style="width: 11px;height: 11px;" src="../../static/index/duigou.png" mode=""></image>
					<text style="font-size: 12px;margin-left: 6upx;">七日退货</text>
				</view>
				<view style="margin-right: 50upx;">
					<image style="width: 11px;height: 11px;" src="../../static/index/duigou.png" mode=""></image>
					<text style="font-size: 12px;margin-left: 6upx;">单笔满 100 包邮</text>
				</view>
			</view>
		</view>
		
		<!-- 评价 -->
		<view class="eva-section" v-if="counts > 0">
			<view class="e-header">
				<text class="tit">商品评价 ({{counts}})</text>
				<text class="tip">查看全部</text>
				<text class="yticon icon-you"></text>
			</view> 
			<view class="eva-box" v-for="(result,index) in results" :key="index" v-if="index < comment">
				<image class="portrait" :src="result.is_anonymous ? '../../static/missing-face.png': headPicValue"></image>
				<view class="right">
					<text class="name" style="color:#666;">
						{{result.is_anonymous ? '****' : result.user}}
						<view class="bot" style="float: right;">
							<text class="time">{{result.create_time}}</text>
						</view>
					</text>
					<text >
						<uni-rate :size="16" :value="result.score" style="margin-left: -2px;" color="#ee1d23" active-color="#ee1d23" />
					</text>
					<text class="con">{{result.comment}}</text>
				</view>
			</view>
		    <!-- <el-button type="primary" icon="el-icon-search" style="text-align: center;" circle @click="lookAll">{{lookBtn}}</el-button> -->
			<!-- <button type="text" @click="lookAll">{{lookBtn}}</button> -->
		</view>
		
		<view class="detail-desc">
			<view class="d-header">
				<text>商品详情</text>
			</view>
			<!-- #ifdef APP-PLUS -->
			<rich-text v-if="detailsArr.goods !== undefined" class="b-header" :nodes="detailsArr.goods.desc_detail || formatRichText">
				<image style="width: 100%;" mode=""></image>
			</rich-text>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<rich-text v-if="detailsArr.goods !== undefined" class="b-header" :nodes="detailsArr.goods.desc_detail">
				<image style="width: 100%;" mode=""></image>
			</rich-text>
			<!-- #endif -->
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-home-wei"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gwc-wei"></text>
				<min-badge :count="num" style="position: absolute;margin-left: 40upx;top: 20upx;"></min-badge>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>
			
			
			<view class="action-btn-group" v-if="value !== 'time'">
				
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="join">加入购物车</button>
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
			</view>
			
			<view class="action-btn-groups" v-else>
				<button type="primary" class="action-btn" :disabled="disabled" @click="buy">{{text}}</button>
			</view>
		</view>
		
		<!-- 规格-模态层弹窗 -->
		<view 
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			
			catchtouchmove="false"
			maskClick="false"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent" >
				<view class="yticon icon-fork" @click="toggleSpec" style="position: absolute;right: 5px;top: 5px;color: #666;"></view>
				<view class="a-t" style="padding: 15px 0;">
					<image style="margin-top: 0px;" :src="detailsArr.default_image_url"></image>
					<view class="right" style="width: 100%;">
						<text class="stock" style="font-size: 14px;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;color: #333;">{{detailsArr.name}}</text>
						<text style="display: inline-block;margin-top: 20px;">
							<text class="price" style="color: red;float: left;">¥{{detailsArr.price}}</text>
							<view class="selected" style="float: right;">
								已选：
								<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
									{{sItem.name}}
								</text>
							</view>
							<!-- <text class="stock" style="float: right;">库存：{{detailsArr.stock}}件</text> -->
						</text>
					</view>
				</view>
				
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text 
							v-for="(childItem, childIndex) in specChildList" 
							v-if="childItem.pid === item.id"
							:key="childIndex" class="tit"
							:class="{selected: childItem.selected}"
							@click="selectSpec(childIndex, childItem.pid)"
						>
							{{childItem.name}}
						</text>
					</view>
				</view>
				<view style="padding: 10px 0;">
					<text style="font-size: 14px;color: #333333;">购买数量</text>
					<text style="font-size: 12px;color: #999;margin-left: 20px;">库存：{{detailsArr.stock}}</text>
					<view class="right" style="display: inline-block;float: right;margin-right: -25px;">
						<uni-number-box
							class="step"
							:min="1" 
							:value="count"
							:isMin="count===1"
							@change="bindChange"
						></uni-number-box>
					</view>
				</view>
				<button class="btn" v-if="subText === '加入购物车'" @click="toggleJoin">{{subText}}</button>
				<button class="btn" v-if="subText === '立即购买'" @click="toggleBuy">{{subText}}</button>
			</view>
		</view>
		<!-- 分享 -->
		<shares 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></shares>
	</view>
</template>

<script>
	import shares from '@/components/share';
	import share from "@/common/share.js";
	import {
	    mapState 
	} from 'vuex';  
	import uniRequest from 'uni-request';
	import minBadge from '@/components/min-badge/min-badge'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default{
		components: {
			shares,
			uniNumberBox,
			minBadge
		},
		
		data() {
			return {
				comment:3,
				lookBtn:'更多',
				specClass: 'none',
				specSelected:[],
				detailsArr:{},
				swiperCurrent:0,
				swiperLength:0,
				favorite: false,
				shareList: [],
				imgList: [],
				subText:'完成',
				count:1,
				counts:0,
				value: 1,
				
				sku_id:'',
				skuId:'',
				num:0,
				results:[],
				username:uni.getStorageSync('userInfo').username,
				headPicValue:'',
				score:0,
				tip:'市场价',
				text:'即将开抢',
				disabled:true,
				specs:[],
				shareObj:{
					shareMenu:''
				},
				/* simulatedDATA:{
					specifications:[],
					sku_spec:[]
				}, */
				specList: [],
				specChildList: [],
				simulatedDATA: { //模拟后台返回的数据 多规格
					"specifications":[
						{"name":"颜色","values":[{"name":"黑色"},{"name":"白色"}]},
						{"name":"内存","values":[{"name":"16G"}]},
						{"name":"套餐","values":[{"name":"套餐一"},{"name":"套餐二"}]},
					],
					"sku_spec":[
						{"skuId":"12328","values":"黑色,16G,套餐一",stock:'0'},
						{"skuId":"12329","values":"白色,16G,套餐一",stock:'2'},
						{"skuId":"12330","values":"白色,16G,套餐二",stock:'10'},
						{"skuId":"12331","values":"黑色,16G,套餐二",stock:'19'},
					]
				},
			};
		},
		
		filters: {
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText (html) { //控制小程序中图片大小
				console.log(html)
				
				let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				return newContent;
			}	
		},
		
		onShow(){
			if(uni.getStorageSync('userInfo').avatar !== ''){
				this.headPicValue = uni.getStorageSync('userInfo').avatar
			}else{
				this.headPicValue = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
			}
		},
		
		
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (this.shareObj.shareMenu) { // this.shareObj.shareMenu.isVisible()
				this.shareObj.shareMenu.hide();
				this.shareObj.alphaBg.hide();
				return true
			}
		},
		
		
		async onLoad(options){
			console.log(options)
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			let id = options.id;
			let skuId = options.skuId
			this.skuId = skuId
			this.sku_id = id
			console.log(this.sku_id)
			this.value = options.value
			this.ifFavorite()
			if(id){
				// this.$api.msg(`点击了${id}`);
				await uniRequest({
					url: '/goods/mobile/get/goods/'+id+'/',
					method: 'get',
				}).then(async res => {
					this.detailsArr = res.data.success
					this.swiperLength = this.detailsArr.images.length
					uniRequest({
						url: '/goods/'+id+'/specs/',
						method: 'POST',
					}).then(res => {
						console.log(res.data.result)
						if(res.status === 200){
							this.simulatedDATA.specifications = res.data.result.specifications
							this.simulatedDATA.sku_spec = res.data.result.sku_spec
							res.data.result.specifications.forEach((ele,index)=>{
								ele.id = index+1
								ele.values.forEach((el,inde)=>{
									el.id = inde+1
									el.pid = index+1
									this.specChildList.push(el)
								})
							})
							this.specList = res.data.result.specifications
							console.log(this.specList,this.specChildList)
							
							//规格 默认选中第一条
							console.log(this.detailsArr)
							this.detailsArr.sku_spec.values.split(',').forEach(ele=>{
								for(let cItem of this.specChildList){
									if(cItem.name === ele){
										console.log(cItem)
										this.$set(cItem, 'selected', true);
										this.specSelected.push(cItem);
										console.log(this.specSelected)
										break; //forEach不能使用break
									}
								}
							})
						}
					}).catch(error => {
						console.log(error);
					})
					if(this.value === 'time'){
						this.tip = '限时抢购(每天10点开抢)'
						const res = await uniRequest.get('/goods/limit/time/sku/');
						console.log(res)
						if(res.status === 200){
							res.data.active.data.forEach(ele=>{
								if(ele.id+'' === id){
									this.detailsArr.price = ele.price
									this.detailsArr.market_price = ele.old_price
								}
							})
							var data = new Date()
							const Y = data.getFullYear()
							const M = data.getMonth()+1 < 10 ? '0'+(data.getMonth()+1) : data.getMonth()+1
							const D = data.getDate() < 10 ? '0'+data.getDate() : data.getDate()
							const h = data.getHours()
							const m = data.getMinutes()
							const s = data.getSeconds()
							const Day = Y+'-'+M+'-'+D+' '+h
							console.log(Day,res.data.active.start_time)
							if(res.data.active.start_time === Day){
								this.disabled = false
								this.text = '立即开抢'
							}else if(res.data.active.start_time !== Day){
							}
						}
					}
					this.imgList = res.data.images
				}).catch(error => {
					console.log(error.data)
				})
				
				if(uni.getStorageSync('userInfo').token){
					this.getAssess(id)
				}
				this.getShopCount()
			}
		},
		
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		
		methods:{
			async getAssess(id){
				const response = await uniRequest({
					url:'/goods/comment/?id='+id,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.status === 200){
						console.log(res.data)
						this.results = res.data.results
						this.counts = res.data.count
						var score = 0
						this.results.forEach(ele=>{
						   score += ele.score * 1/5
						})
						console.log(score)
						if(score !== 0){
							this.score = Math.round(score/this.counts*100) + '%'
						}else{
							this.score = '0%'
						}
					}
				   
				}).catch(error=>{
				   console.log(error)
				})
			},
			
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].color;
			},
			
			bindChange(res) {
				this.count = Number(res)
			},
			
			getPages(skuId){
				if(skuId !== Number(this.sku_id)){
					uni.navigateTo({
						url:'/pages/product/product?id='+skuId+'&value=undefined'
					})
				}
			},
			
			ifFavorite(){
				uniRequest({
					url: '/carts/collection/',
					method: 'GET',
					params:{page:1,page_size:10},
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					if(res.status === 200){
						res.data.results.forEach(ele=>{
							if(ele.sku.id === +this.sku_id){
								this.favorite = true
								this.skuId = ele.id
							}
						})
					}
				}).catch(error => {
					console.log(error);
				})
			},
			
			//收藏
			async toFavorite(){
				console.log(this.favorite)
				if(this.favorite){
					// this.ifFavorite()
					await uniRequest({
						url: '/carts/collection/'+this.skuId+'/',
						method: 'DELETE',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res,res.data.results)
						if(res.status === 204){
							this.favorite = false
							this.$api.msg('取消收藏')
							this.ifFavorite()
						}else if(res.status === 401){
							this.$api.msg('请先登录')
						}
					}).catch(error => {
						console.log(error);
					})
				}else{
					await uniRequest({
						url:'/carts/collection/',
						method:'POST',
						headers:{
							Authorization:'JWT '+uni.getStorageSync('userInfo').token
						},
						data:{
							sku:Number(this.sku_id)
						}
					}).then(res=>{
						console.log(res)
						if(res.status === 201){
							this.$api.msg('收藏成功')
							this.favorite = true
							this.ifFavorite()
						}else if(res.status === 400){
							this.$api.msg(res.data.non_field_errors[0]+',在"我的收藏"查看')
						}else if(res.status === 401){
							this.$api.msg('请先登录')
						}
					}).catch(error=>{
					   console.log(error)
					})
				}
			},
			//规格弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
				
			},
			
			async toggleJoin(){
				this.toggleSpec()
				// #ifdef APP-PLUS
				if(!uni.getStorageSync('userInfo').token){
					uni.navigateTo({
						url: `/pages/public/login`
					})
				}else{
					await uniRequest({
						url:'/carts/cart_sku/',
						method:'post',
						data:{sku_id: this.sku_id, count: this.count},
						headers:{
							Authorization:'JWT '+uni.getStorageSync('userInfo').token,
						},
						crossDomain: true,
						xhrFields: {
							withCredentials: true
						},
					}).then(res=>{
						console.log(res.data)
						if(res.data.selected === true){
							this.$api.msg(`加入购物车成功`);
							this.getShopCount()
						}
					}).catch(error=>{
						console.log(error)
					})
				}
				// #endif
				// #ifdef H5
				if(!uni.getStorageSync('userInfo').token){
					uni.navigateTo({
						url: `/pages/public/login`
					})
				}else{
					await uniRequest({
						url:'/carts/cart_sku/',
						method:'post',
						data:{sku_id: this.sku_id, count: this.count},
						headers:{
							Authorization:'JWT '+uni.getStorageSync('userInfo').token,
						},
						crossDomain: true,
						xhrFields: {
							withCredentials: true
						},
					}).then(res=>{
						console.log(res.data)
						if(res.data.selected === true){
							this.$api.msg(`加入购物车成功`);
							this.getShopCount()
						}else{
							if(res.data.non_field_errors !== undefined){
								this.$api.msg(res.data.non_field_errors[0]);
							}else{
								this.$api.msg(res.data);
							}
						}
					}).catch(error=>{
						console.log(error)
					})
				}
				// #endif
			},
			async getShopCount(){
				await uniRequest({
					url:'/carts/cart_sku/',
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token,
					},
					crossDomain: true,
					xhrFields: {
						withCredentials: true
					},
				}).then(res=>{
					// console.log(res.data)
					this.num = res.data.length
				}).catch(err=>{
					
				})
				
			},
			toggleBuy(){
				this.toggleSpec()
				if(!uni.getStorageSync('userInfo').token){
					uni.navigateTo({
						url: `/pages/public/login`
					})
				}else{
					this.detailsArr.goods = {}
					uni.navigateTo({
						url: `/pages/order/createOrder?type=1&data=`+encodeURIComponent(JSON.stringify(this.detailsArr))+`&count=`+this.count
					})
				}
			},
			
			lookAll(){
				if(this.comment !== 100){
					this.lookBtn = '收起'
					this.comment = 100
				}else{
					this.lookBtn = '更多'
					this.comment = 3
				}
			},
			
			//选择规格
			selectSpec(index, pid){
				let list = this.specChildList;
				list.forEach(item=>{
					if(item.pid === pid){
						this.$set(item, 'selected', false);
					}
				})

				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = []; 
				var arr = []
				list.forEach(item=>{ 
					if(item.selected === true){ 
						console.log(item.name)
						arr.push(item.name)
						this.specSelected.push(item);
					}
				})
				console.log(arr)
				this.specSelected.forEach(ele=>{
					console.log(ele.name)
					if(ele.name[0] === arr[0] && this.detailsArr.sku_spec.values.split(',')[1] === arr[1] && this.detailsArr.sku_spec.values.split(',')[2] === arr[2]){
						console.log(ele.skuId)
						uni.navigateTo({
							url:'/pages/product/product?id='+ele.skuId+'&value=undefined'
						})
					}
				})
				
			},
			
			
			
			//分享
			share(){
				this.$refs.share.toggleMask();	
			},
			
			// app分享
			shareInfo(){
				let shareInfo={
					href:"http://m.hfyt365.com/#/pages/product/product?id="+this.sku_id,
					title:"行丰商城",
					desc:this.detailsArr.name,
					imgUrl:this.detailsArr.default_image_url
				};
				let shareList=[
					{
						icon:"/static/sharemenu/wx.png",
						text:"微信好友",
					},
					{
						icon:"/static/sharemenu/pyq.png",
						text:"朋友圈"
					},
					/* {
						icon:"/static/sharemenu/weibo.png",
						text:"微博"
					}, */
					{
						icon:"/static/sharemenu/qq.png",
						text:"QQ"
					},
					{
						icon:"/static/sharemenu/copy.png",
						text:"复制"
					},
					{
						icon:"/static/sharemenu/more.png",
						text:"更多"
					},
				];
				this.shareObj=share(shareInfo,shareList,function(index){
					console.log("点击按钮的序号: " + index);
					let shareObj={
						href:shareInfo.href||"",
						title:shareInfo.title||"",
						summary:shareInfo.desc||"",
						success:(res)=>{
							console.log("success:" + JSON.stringify(res));
						},
						fail:(err)=>{
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider="weixin";
							shareObj.scene="WXSceneSession";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider="weixin";
							shareObj.scene="WXSenceTimeline";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						/* case 2:
							shareObj.provider="sinaweibo";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break; */
						case 2:
							shareObj.provider="qq";
							shareObj.type=1;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 3:
							uni.setClipboardData({
								data:shareInfo.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 4:
							plus.share.sendWithSystem({
								type:"web",
								title:shareInfo.title||"",
								thumbs:[shareInfo.imgUrl||""],
								href:shareInfo.href||"",
								content: shareInfo.desc||"",
							})
							break;
					};
				});
				this.$nextTick(()=>{
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
				})
			},
			toCart(){
				uni.navigateTo({
					url:'/pages/chat/chat', 
				})
			},
			buy(){
				this.toggleSpec()
				this.subText = '立即购买'
			},
			// 加入购物车
			join(){
				this.toggleSpec()
				this.subText = '加入购物车'
			},
			stopPrevent(){
				return
			}
		},

	}
</script>

<style lang='scss'>
	/deep/ .min-badge-count{
		background-color: #EE1D23;
	}
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	.product-delcom {
	  color: #323232;
	  font-size: 14px;
	  border-bottom: 1px solid #EEEEEE;
	  padding: 30px 0;
	}
	.product-footerlist {
	  margin-top: 10px;
	}
	.product-footerlist li {
	  border: 1px solid #606060;
	  border-radius: 5px;
	  color: #606060;
	  text-align: center;
	  padding: 10px 30px;
	  float: left;
	  margin-right: 20px;
	  cursor: pointer;
	  list-style: none;
	}
	.product-footerlist li.productActive {
	  background-color: #1A1A29;
	  color: #fff;
	  border: 1px solid #1A1A29;
	}
	.product-footerlist li.noneActive {
	  background-color: #ccc;
	  opacity: 0.4;
	  color: #000;
	  pointer-events: none;
	}
	
	.swiper-dots {
		display: flex;
		position: absolute;
		right: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;
	
		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}
	
		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		margin: 20upx;
		
		.back{
			background-color: #fa436a;
			color: #fff;
		}
		
		.title{
			font-size: 28upx;
			color: $font-color-text3;
			height: 50upx;
			font-weight: bold;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-hangfeng;
		}
		.price{
			font-size: $font-lg + 2upx;
			font-weight: bold;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-hangfeng;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		padding: 12upx 0;
		border-top: 1px solid #ddd;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-hangfeng;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-hangfeng;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-hangfeng;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base - 4upx;
			margin-left:40upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			/* color: $uni-color-hangfeng; */
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-hangfeng;
		}
	}
	
	/* 详情 */
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		margin: 20upx;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 128upx;
			color: #111111;
		}
		.con{
			flex: 1;
			color: $font-color-text6;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: font-color-text6;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-text6;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-hangfeng;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin: 20upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base;
				color: #111;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
				color: $font-color-text6;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 100upx;
			height: 100upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: #666;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #F5F5F5;
		margin-top: 16upx;
		width: 100%;
		
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			text{
				padding: 0 20upx;
				background: #F5F5F5;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 400upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
		.b-header{
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
			overflow-x: hidden;
			img{
				width: 100%!important;
			}
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-hangfeng;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected{
				background: #fbebee;
				color: $uni-color-hangfeng;
			}
		}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				width: 80%;
				height: 76upx;
				line-height: 76upx;
				border-radius: 100upx;
				background: linear-gradient(to right, #EE1D23,#EE1D23,#EE841D);
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 0;
		bottom:0;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-hangfeng;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #F04023,#EE1D23,#EE671D,#EE841D);
			margin-right: 10upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 220upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
		.action-btn-groups{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin-left: 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 360upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	
</style>
