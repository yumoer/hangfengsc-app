<template>
	<view class="content">
		<view class="pay_wrap">
			<view class="pay_success">
				<image class="pay_icon" src="../../static/index/paysuccess.png" mode=""></image><br/>
				<text class="pay_text">支付成功</text>
			</view>
			<view class="pay_slider">
				<view class="pay_btn">
					<navigator @click="navToPage('/pages/index/index')" class="action-btn">返回首页</navigator>
					<navigator url="/pages/order/order?state=0" class="action-btn recom">查看订单</navigator>
				</view>
			</view>
		</view>
		
		<view class="pay_item" style="">
			<view class="pay_body" style="">
				<image class="pay_image" src="../../static/index/cainixihuan.png" mode=""></image>
			</view>
			<view class="guess-section">
				<view 
					v-for="(item, index) in skuData" :key="index"
					class="guess-item"
					@click="navToDetailPage(item)"
					v-if="item.object !== null"
				>
					<view class="image-wrapper" >
						<image :src="item._source.detail_image" mode="aspectFill"></image>
					</view>
					<view class="pay_allow">
						<text class="title">{{item._source.name}}</text>
						<text class="pay_inline">
							<text class="price">{{item._source.price}}</text>
							<text class="pay_price">{{item._source.sales}}人付款</text>
						</text>
					</view>
					
				</view>
			</view>
		</view>
		
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<image @click="show = false" style="width: 100%;height: 100%;" src="@/static/img/brow2.png" mode=""></image>
				</view>
			</view>
		</u-mask>
		
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				orderId:'',
				payType:null,
				pay_password:'',
				show:false,
				skuData:[],
				mode:0,
			}
		},
		async onLoad(option){
			console.log(option)
			await uniRequest.post('/goods/new/search/',{text:'',page:this.page,page_size:this.page_size,orderBy:'',sort:''})
			.then(res=>{
				this.skuData = res.data.sku_list
				if(this.skuData.length === 0){
					this.loadingType = 'nomore';
				}
			}).catch(error=>{
				console.log(error)
			})
		},
		methods: {
			navToDetailPage(item){
				console.log(item)
				uni.navigateTo({
					url:`/pages/product/product?id=${item._id}&value=undefined`
				})
			},
			navToPage(url){
				uni.switchTab({
					url:url
				})
			}
		}
	}
</script>

<style lang='scss'>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.pay_wrap{
		width: 100%;
		background: url(../../static/index/paybg.png);background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.pay_success{
		margin: 0 auto;
		margin-top: 80upx;
		text-align: center;
	}
	.pay_icon{
		width: 92upx;
		height: 92upx;
		margin-bottom: 10px;
		
	}
	.pay_text{
		font-size: 36upx;
		color: #fff;
		font-weight: bold;
	}
	
	.pay_slider{
		width: 92%;
		height: 170upx;
		background-color: #fff;
		margin: 0 30upx;
		border-radius: 10px;
		margin-top: 40upx;
	}
	
	.pay_btn{
		text-align: center;
		padding: 44upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.pay_item{
		width: 100%;
		height: 500px;
		margin-top: 30px;
	}
	
	.pay_body{
		width: 100%;
		text-align: center;
		height: 120upx;
		line-height: 120upx;
	}
	
	.pay_image{
		width: 480upx;
		height: 37upx;
	}
	
	.pay_allow{
		padding: 10px;
		position: relative;
	}
	
	.pay_inline{
		display: inline-block;
	}
	
	.pay_price{
		color: rgb(144, 147, 153);
	    line-height:60upx;
		font-size: 28upx;
		position: absolute;
		right: 16px;
	}
	
	.success-icon{
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}
	.tit{
		font-size: 38upx;
		color: #303133;
	}
	.btn-group{
		padding-top: 100upx;
	}
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
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
	.action-btn{
		width: 220upx;
		height: 80upx;
		margin-left: 48upx;
		padding: 0;
		display: inline-block;
		text-align: center;
		line-height: 80upx;
		font-size: $font-sm + 6upx;
		color: $uni-color-hangfeng;
		border: 1px solid #EE1D23;
		border-radius: 100px;
		background: #fff;
		border-radius: 100px;
		&.recom{
			background:linear-gradient(to right,#EE1D23,#F04023);
			color: #fff;
			&:after{
				border-color: #f7bcc8;
			}
		}
	}
	.mix-btn {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 80upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
</style>
