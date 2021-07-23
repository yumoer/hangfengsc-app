<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index" v-if="item !== null">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="introduce-section">
			<text class="title">{{detailsArr.name}}</text>
			<view class="price-box" style="display: block;">
				<text class="price-tip">¥</text>
				<text class="price">{{detailsArr.price}}</text>
				<text class="m-price">¥{{detailsArr.market_price}}</text>
				<text class="coupon-tip">{{tip}}</text>
				<!-- <text style="display: inline-block;float: right;color: #909399;">库存: {{detailsArr.stock}}</text> -->
			</view>
		</view>
		
		<view class="introduce-section" v-if="specs.length > 0">
			<text>{{specs[0].name}}</text>
			<view v-for="(spec,index) in specs[0].data" :key="index" style="display: inline-block;padding: 5px;margin-left: 15px;" v-bind:class="{'back':spec.sku === Number(sku_id)}" @click="getPages(spec.sku)">
				<text>{{spec.value}}</text>
			</view>
		</view>
		
		<!--  分享 -->
		<!-- #ifdef APP-PLUS -->
		<view class="share-section"> <!-- @click="share"-->
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn" @tap="shareInfo">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 返
			</view>
			<text class="tit">分享给好友</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
		</view>
		<!-- #endif -->
		
		<view class="c-list">
			<view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<!-- <text>新人首单送20元无门槛代金券</text> -->
					<!-- <text>订单满50减10</text> -->
					<!-- <text>订单满100减30</text> -->
					<text>单笔购买满99免邮费</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
			</view>
		</view>
		
		<!-- 评价 -->
		<view class="eva-section" v-if="counts > 0">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>({{counts}})条</text>
				<text class="tip">好评率<text style="color:#fa436a;margin-left: 20upx;">{{score}}</text></text>
				<text class="yticon icon-you"></text>
			</view> 
			<view class="eva-box" v-if="index < comment" v-for="(result,index) in results" :key="index">
				<image class="portrait" :src="result.is_anonymous === false ? headPicValue : '../../static/missing-face.png'"></image>
				<view class="right">
					<text class="name" style="display: inline-block;">{{result.is_anonymous === false ? result.user : '********'}}
						<view class="bot" style="float: right;">
							<text class="time">{{result.create_time.split('T')[0]+' '}}{{result.create_time.split('T')[1].split('.')[0]}}</text>
						</view>
					</text>
					<text class="con">{{result.comment}}</text>
					
				</view>
			</view>
			
			<button type="default" @click="lookAll">{{lookBtn}}</button>
		</view>
		
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
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
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<min-badge :count="num" style="position: absolute;margin: -40upx 20upx;"></min-badge>
				<text>购物车</text>
			</navigator>
			<!-- <view v-if="username" @click="toCart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-pinglun-copy"></text>
				<text>客服</text>
			</view> -->
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
			@click="toggleSpec"
			catchtouchmove="false"
			maskClick="false"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t" style="padding: 20px 0;">
					<image style="margin-top: 0px;" :src="detailsArr.default_image_url"></image>
					<view class="right" style="width: 100%;">
						<text class="stock" style="font-size: 14px;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">{{detailsArr.name}}</text>
						<text style="display: inline-block;margin-top: 20px;">
							<text class="price" style="color: red;float: left;">¥{{detailsArr.price}}</text>
							<!-- <text class="stock" style="float: right;">库存：{{detailsArr.stock}}件</text> -->
						</text>
					</view>
				</view>
				
				<view style="padding: 10px 0;">
					<text style="font-size: 16px;">购买数量</text>
					<view class="right" style="display: inline-block;float: right;margin-right: -10px;">
						<view >
							<view>
								<uni-number-box @change="bindChange" :min="1" :value="count"></uni-number-box>
							</view>
						</view>
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
				lookBtn:'查看全部',
				specClass: 'none',
				specSelected:[],
				detailsArr:{},
				favorite: false,
				shareList: [],
				imgList: [],
				subText:'完成',
				count:1,
				counts:0,
				value: 1,
				min:0,
				max:3,
				specList: [],
				specChildList: [],
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
			if(uni.getStorageSync('avatar') !== undefined){
				this.headPicValue = uni.getStorageSync('avatar')
			}else if(uni.getStorageSync('userInfo').avatar !== ''){
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
				try {
					await uniRequest({
						url: '/mobile/get/goods/'+id,
						method: 'get',
						/* headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						}, */
					}).then(async res => {
						this.detailsArr = res.data
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
							console.log(res.data.active.data)
							console.log(this.detailsArr)
							
							
						}
						this.imgList = res.data.images
					}).catch(error => {
						console.log(error.data)
					})
				} catch (error) {
					console.error(error);
				}
				
				if(uni.getStorageSync('userInfo').token){
					this.getAssess(id)
				}
				this.getShopCount()
			}
			
			
			this.shareList = await this.$api.json('shareList');
			
			if(this.detailsArr.goods !== undefined){
				const response = await uniRequest({
					url:'/mobile/goods/specification/'+this.detailsArr.goods.id+'/',
					method:'get',
				}).then(res=>{
					if(res.status === 200){
						this.specs = res.data
						console.log(this.specs)
					}
				}).catch(error=>{
				   console.log(error)
				})
			}
			
		},
		
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		
		
		
		methods:{
			async getDate(id){
				try {
					await uniRequest({
						url: '/mobile/get/goods/'+id,
						method: 'get',
					}).then(async res => {
						this.detailsArr = res.data
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
							console.log(res.data.active.data)
							console.log(this.detailsArr)
							
							
						}
						this.imgList = res.data.images
					}).catch(error => {
						console.log(error.data)
					})
				} catch (error) {
					console.error(error);
				}
			},
			
			async getAssess(id){
				const response = await uniRequest({
					url:'/goods/comment/?id='+id,
					method:'get',
					headers:{
						Authorization:'JWT '+uni.getStorageSync('userInfo').token
					},
				}).then(res=>{
					if(res.status === 200){
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
			
			bindChange(res) {
				this.count = Number(res)
				console.log('返回数据',res);
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
					url: '/user/collection/',
					method: 'GET',
					headers: {
						Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
					},
				}).then(res => {
					console.log(res,res.data.results)
					if(res.status === 200){
						res.data.results.forEach(ele=>{
							console.log(ele.sku.id)
							if(ele.sku.id === +this.sku_id){
								this.favorite = true
							}
						})
					}
				}).catch(error => {
					console.log(error);
				})
			},
			
			//收藏
			async toFavorite(){
				console.log(this.skuId)
				if(this.skuId !== undefined){
					await uniRequest({
						url: '/user/collection/'+this.skuId+'/',
						method: 'DELETE',
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res,res.data.results)
						if(res.status === 204){
							this.favorite = false
							this.$api.msg('取消收藏')
						}else if(res.status === 404){
							uniRequest({
									url:'/user/collection/',
									method:'POST',
									headers:{
										Authorization:'JWT '+uni.getStorageSync('userInfo').token
									},
									data:{
										sku:this.sku_id
									}
								}).then(res=>{
									console.log(res)
									if(res.status === 201){
										this.$api.msg('收藏成功')
										this.favorite = true
									}else if(res.status === 400){
										this.$api.msg(res.data.non_field_errors[0])
									}else if(res.status === 401){
										this.$api.msg('请先登录')
									}
								}).catch(error=>{
								   console.log(error)
								})
						}else if(res.status === 401){
							this.$api.msg('请先登录')
						}
					}).catch(error => {
						console.log(error);
					})
				}else{
					await uniRequest({
							url:'/user/collection/',
							method:'POST',
							headers:{
								Authorization:'JWT '+uni.getStorageSync('userInfo').token
							},
							data:{
								sku:this.sku_id
							}
						}).then(res=>{
							console.log(res)
							if(res.status === 201){
								this.$api.msg('收藏成功')
								this.favorite = true
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
				await uniRequest({
					url:'/cart/',
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
				// #endif
				// #ifdef H5
				if(!uni.getStorageSync('userInfo').token){
					uni.navigateTo({
						url: `/pages/public/login`
					})
				}else{
					await uniRequest({
						url:'/cart/',
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
				const response = await uniRequest({
					url:'/cart/',
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
			async toggleBuy(){
				this.toggleSpec()
				if(!uni.getStorageSync('userInfo').token){
					uni.navigateTo({
						url: `/pages/public/login`
					})
				}else{
					this.detailsArr.goods = {}
					uni.navigateTo({
						url: `/pages/order/createOrder?data=`+JSON.stringify(this.detailsArr)+`&count=`+this.count + `&goods_id=`+ this.sku_id + `&type=`+ this.value
					})
				}
			},
			
			lookAll(){
				if(this.comment !== 100){
					this.lookBtn = '收起'
					this.comment = 100
				}else{
					this.lookBtn = '查看全部'
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
				/* this.simulatedDATA.sku_spec.forEach(ele=>{
					console.log(ele.values.split(','),arr)
					if(ele.values.split(',')[0] === arr[0] && ele.values.split(',')[1] === arr[1] && ele.values.split(',')[2] === arr[2]){
						console.log(ele.skuId)
						uni.navigateTo({
							url:'/pages/product/product?id='+ele.skuId+'&value=undefined'
						})
					}
				}) */
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
			/* //收藏
			toFavorite(){
				// #ifdef H5
				location.href = "http://wpa.qq.com/msgrd?V=1&amp;uin=3145517362&amp;Site=行丰银拓办公用品商城&amp;Menu=yes'"
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL("http://wpa.qq.com/msgrd?V=1&amp;uin=3145517362&amp;Site=行丰银拓办公用品商城&amp;Menu=yes'")
				// #endif
				
			}, */
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
	image{
		width: 100%;
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
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.back{
			background-color: #fa436a;
			color: #fff;
		}
		
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
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
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
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
			font-size: $font-base;
			margin-left:10upx;
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
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
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
			width: 80upx;
			height: 80upx;
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
				color: $font-color-dark;
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
		background: #fff;
		margin-top: 16upx;
		width: 100%;
		
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
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
					color: $uni-color-primary;
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
				color: $uni-color-primary;
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
				height: 76upx;
				line-height: 76upx;
				border-radius: 100upx;
				background: $uni-color-primary;
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
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
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
				color: $uni-color-primary;
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
