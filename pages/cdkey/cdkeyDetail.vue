<template>
	<view class="view" style="">
		<view>
			<!-- 商品详情 --><!-- background-color: #E8E4E1; -->
			<view class="shop" style="padding: 40upx 10upx;width: 100%;height: 200px;background:url(http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmATx5GAAHV1JTlDSo8241624) no-repeat 100%;">
				<view class="shop_details" style="width: 100%;height: 200upx;">
					<view class="image" style="float: left;padding-left: 20px;" @click="lookDetails">
						<image style="width: 200upx;height: 200upx;" :src="exchanges.image" mode=""></image>
					</view>
					<view style="float: right;padding-right: 20px;">
						<text style="font-size: 16px;font-weight: bold;">{{exchanges.name}}</text><br>
						<view style="margin-top: 20upx;line-height: 24px;font-size: 24upx;color: #999;">
							<text>{{exchanges.explain}}</text><br>
						</view>
					</view>
				</view>
				<view class="shop_btn" style="width: 200px;margin: 30px auto;display: block;">
					<button type="default" style="color: #fff;border-radius: 10px;text-align: center;margin: 0 auto;height: 40px;background-color: #FF7F50;border-color:#FF7F50;" @click="lookDetails">查看订单</button>
				</view>
			</view>
			<!-- 卡券信息 -->
			<view class="cdkey" style="width: 100%;padding: 0 10px;line-height: 24px;">
				<view style="width:100%;text-align: center;margin: 20px 0;">
					<text style="font-size: 16px;">———卡券信息———</text>
				</view>
				
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">卡券名称</text>
					<text style="float: right;color: #999;">{{exchanges.name}}</text>
				</view>
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">卡券编码</text>
					<text style="float: right;color: #999;">{{card_number}}</text>
				</view>
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">卡券面值</text>
					<text style="float: right;color: #999;">￥{{exchanges.total_amount}}</text>
				</view>
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">起始有效期</text>
					<text style="float: right;color: #999;">{{(exchanges.start_time || '').split('T')[0]}} {{(exchanges.start_time || '').split('T')[1]}}</text>
				</view>
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">结束有效期</text>
					<text style="float: right;color: #999;">{{(exchanges.end_time || '').split('T')[0]}} {{(exchanges.end_time || '').split('T')[1]}}</text>
				</view>
			</view>
			<view class="shop_btn" style="width: 100%;position: absolute;bottom: 0;">
				<button style="color: #fff;background-color: rgb(255, 127, 80);height: 45px;line-height: 45px;" @click="editAddress">填写地址</button>
			</view>
			
			<view>
				<u-popup v-model="ifshow" :mask-close-able="false" mode="bottom" :closeable="true" height="80%" close-icon-color="#000">
					<view style="width: 100%;margin: 0 auto;text-align: center;padding: 10px;">
						<text style="font-size: 16px;">详情展示</text>
					</view>
					<swiper class="carousel" circular autoplay @change="swiperChange">
						<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="into(item)">
							<image style="width: 100%;height: 400px;" :src="item.image"/>
						</swiper-item>
					</swiper>
					<!-- 自定义swiper指示器 -->
					<view class="swiper-dots">
						<text class="num">{{swiperCurrent+1}}</text>
						<text class="sign">/</text>
						<text class="num">{{swiperLength}}</text>
					</view>
					
					<view style="margin:20px 10px">
						<text style="font-size: 16px;">{{exchanges.name}}</text><br>
						
					</view>
					
					<view style="margin:20px 10px">
						<text style="font-size: 14px;color: #999;">{{exchanges.explain}}</text>
					</view>
					
					<image style="width: 100%;height: 8000px;padding: 10px;" v-if="exchanges.detail_image !== undefined" :src="exchanges.detail_image" mode=""></image>
				</u-popup>
			</view>
			
			<neil-modal :show="show" @close="closeModal" title="填写地址" @cancel="bindBtn('cancel')" @confirm="bindBtn('confirm')" :auto-close="false" style="width: 100%;">
			    <view style="min-height: 90upx;padding: 32upx 24upx;">
					<u-field
						v-model="name"
						label="姓名"
						:required="true"
						placeholder="请填写姓名"
						:error-message="errName"
					>
					</u-field>
			        <u-field
						v-model="mobile"
						label="手机"
						:required="true"
						type="number"
						:maxlength="11"
						placeholder="请填写手机号"
						:error-message="errMobile"
					>
					</u-field>
					<u-field
						v-model="Taddress"
						label="省市区"
						type="select"
						:disabled="true"
						:required="true"
						placeholder="请选择省市区"
						@click="openShow"
						:error-message="errTaddress"
						right-icon="arrow-down-fill"
					>
					</u-field>
					<u-field
						v-model="address"
						label="详细地址"
						:required="true"
						placeholder="请填写街道详细地址"
						:error-message="errAddress"
					>
					</u-field>
					<u-field
						v-model="remark"
						label="备注"
						placeholder="请填写备注"
					>
					</u-field>
			    </view>
			</neil-modal>
			<!-- <city-select v-model="showing" mode="mutil-column-auto" @city-change="cityChange"></city-select> -->
			<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import citySelect from '@/components/cityDate/u-city-select.vue';
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue';
	export default{
		data(){
			return {
				show:false,
				showing:false,
				ifshow:false,
				showHide:true,
				name:'',
				mobile:'',
				address:'',
				Taddress:'',
				remark:'',
				exchange:'',
				open_id:'',
				card_number:'',
				exchanges:{},
				swiperCurrent: 0,
				swiperLength: 5,
				errName:'',
				errMobile:'',
				errAddress:'',
				errTaddress:'',
				carouselList:[
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAWcGSAAYqz4oAxas5080497'},
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAHUBCAAOGS0Uzxvo4616422'},
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAdJhcAASmoXq7e5E0433727'},
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAcedPAAbVHhfVK106634684'},
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAFuc4AATa87U6IDw1212955'},
				]
			}
		},
		components: {neilModal,citySelect,selectAddress},
		onLoad(options){
			console.log(options)
			this.exchange_user = options.exchange_user
			this.card_number = uni.getStorageSync('card_number')
			uniRequest.get('/orders/exchange/?exchange_user='+this.exchange_user).then(res=>{
				console.log(res.data)
				if(res.status === 200){  
					this.exchanges = res.data
				}
				if(res.status === 400){
					this.$api.msg(res.data.message[0])
				}
			}).catch(error=>{
				console.log(error)
			})
			
			console.log(this.list)
		},
		
		
		
		methods: {
			/* 查看详情 */
			lookDetails(){
				this.ifshow = true
				// this.$refs.popup.open()
			},
			openShow(){
				// this.showing = true
				this.$refs.selectAddress.show()
			},
			cityChange(e) {
				console.log(e)
				this.Taddress = e.province.label +  e.city.label + e.area.label;
			},
			successSelectAddress(address){ //选择成功回调
				console.log(address)
				this.Taddress = address;
			},
			/* 填写地址 */
			editAddress(){
				this.show = true
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			/* 查看订单 */
			lookOrder(){
				console.log('222')
				uniRequest.get('/orders/exchange/?pk='+this.addresss).then(res=>{
					console.log(res.data)
					if(res.status === 200){  
						// this.exchanges = res.data
					}
					if(res.status === 400){
						this.$api.msg(res.data.message[0])
						
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			bindBtn(type){
				if(type === 'cancel'){
					this.show = false
				}else{
					this.show = true
					if(this.name === ''){
						this.errName = '姓名不能为空'
					}else if(this.mobile === ''){
						this.errName = ''
						this.errMobile = '手机不能为空'
					}else if(this.Taddress === ''){
						this.errName = ''
						this.errMobile = ''
						this.errTaddress = '省市区不能为空'
					}else if(this.address === ''){
						this.errName = ''
						this.errMobile = ''
						this.errTaddress = ''
						this.errAddress = '详细地址不能为空'
						console.log(this)
					}else{
						this.show = false
						this.errName = ''
						this.errMobile = ''
						this.errTaddress = ''
						this.errAddress = ''
						const sendData = {
							exchange:this.exchange_user,
							name:this.name,
							address:this.Taddress + this.address,
							mobile:this.mobile,
							remark:this.remark,
							open_id:uni.getStorageSync('open_id'),
							card_number:uni.getStorageSync('card_number'),
							card_paw:uni.getStorageSync('card_paw')
						};
						uniRequest.post('/orders/exchange/',sendData).then(res=>{
							console.log(res.data)
							if(res.status === 200){  
								this.show = false
								this.$api.msg('地址填写成功')
								this.addresss = res.data
								this.name = ''
								this.mobile = ''
								this.Taddress = ''
								this.address = ''
								this.remark = ''
								uni.navigateTo({
									url:'/pages/cdkey/cdkeyOrder?data='+JSON.stringify(res.data)
								})
							}
							if(res.status === 400){
								this.name = ''
								this.mobile = ''
								this.Taddress = ''
								this.address = ''
								this.remark = ''
								this.show = false
								if(res.data.exchange === undefined){
									this.$api.msg(res.data.non_field_errors[0])
								}else{
									this.$api.msg(res.data.exchange[0])
								}
							}
						}).catch(error=>{
							console.log(error)
						})
					}
				}
			},
			
			closeModal(){
				this.show = false
			},
		},
	
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		// margin: 20upx;
		background-color: #fff;
	}
	.carousel-section {
		position: relative;
		padding-top: 10px;
	
		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}
	
		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 400px;
	
		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}
	
		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		right: 60upx;
		bottom: 150px;
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
</style>
