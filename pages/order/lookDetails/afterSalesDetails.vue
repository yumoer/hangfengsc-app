<template>
	<view class="content">
		<view class="order-item">
			<view class="goods-box-single">
				<image class="goods-img" :src="goodItem.image" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp2">{{goodItem.title}}</text>
					<text class="price" style="float: left;">{{goodItem.price}} 
						<text class="attr-box" style="float: right;">  x {{goodItem.count}}</text>
					</text>
				</view>
			</view>
		</view>
		<view class="rate_type" v-if="type === '1'">
			<view class="rate_title">退货信息</view>
			<u-cell-group>
				<u-cell-item title="退货金额" :arrow="false" :value="'￥'+this.goodItem.price"></u-cell-item>
			</u-cell-group>
			<view class="goods-box-assess">
				<view class="assess_title">退货原因</view>
				<u-input v-model="desc" style="border: none;" type="textarea" :border="true" :height="200" :auto-height="true" placeholder="请添加您的说明，有助于售后问题的处理"/>
				<view class="imageVideo">
					<u-upload action="#" ref="uUpload" uploadText="" :file-list="fileList" :max-size="4 * 1024 * 1024" :max-count="4" :auto-upload="false" @on-choose-complete="onChooseComplete"></u-upload>
					<text class="addImage">添加图片</text>
				</view>
			</view>
		</view>
		<view class="rate_type" v-if="type === '2'">
			<view class="rate_title">换货信息</view>
			<view class="goods-box-assess">
				<view class="assess_title">换货原因</view>
				<u-input v-model="desc" type="textarea" :border="true" :height="200" :auto-height="true" placeholder="请添加您的说明，有助于售后问题的处理"/>
				<view class="imageVideo">
					<u-upload action="#" style="background: #FFFFFF;" ref="uUpload" uploadText="" :file-list="fileList" :max-size="4 * 1024 * 1024" :max-count="4" :auto-upload="false" @on-choose-complete="onChooseComplete"></u-upload>
					<text class="addImage">添加图片</text>
				</view>
			</view>
		</view>
		<view class="confirm">
			<u-button type="error" @click="confirmBtn">提交申请</u-button>
		</view>
	</view>
</template>

<script>
	import uniRequest  from 'uni-request'
	export default {
		data() {
			return {
				type:'',
				orderId:'',
				subOrderId:'',
				desc:'',
				fileList:[],
				goodItem:'',
				textareaValue:'',
			};
		},
		onShow(){
			
		},
		onLoad(options) {
			this.type = options.type;
			this.orderId = options.orderId ;
			this.subOrderId = options.subOrderId;
			this.goodItem = JSON.parse(decodeURIComponent(options.item))
			console.log(this.goodItem)
		},
		methods:{
			onChooseComplete(lists, name){
				console.log(lists, name)
				this.fileList = lists
			},
			async confirmBtn(){
				if(this.desc === ''){
					this.$api.msg('请输入原因')
					return false
				}
				// if(this.image1 === ''){
				// 	this.$api.msg('请输入图片')
				// 	return false
				// }
				if(this.fileList.length > 0){
					this.fileList.forEach((ele,index)=>{
						console.log(ele)
					})
				}
				await uniRequest({
					url:'/orders/create/return/goods/user/',
					method:'post',
					data: {
						order_id:this.orderId,
						sub_order_id:this.subOrderId,
						sku_id:this.goodItem.id,
						count:this.goodItem.count,
						cause:this.desc,
						service_type:this.type,
						// image1:this.fileList[0].file,
						// image2:this.fileList[1].file,
						// image3:this.fileList[2].file,
						// image4:this.fileList[3].file
					},
					dataType: 'json',
					headers:{
						'Authorization':'JWT '+ uni.getStorageSync('userInfo').token,
						'Content-Type':'application/x-www-form-urlencoded',
					},
				}).then(res=>{
					if(res.status === 200){
						uni.showToast({
							title:'提交成功'
						})
						console.log(res.data)
						setTimeout(()=>{
							location.reload()
						}, 1500)
					}else{
						this.$api.msg(res.data.message)
					}
				}).catch(error=>{
					console.log(error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.content{
		height: 100%;
		padding: 30upx;
	}
	
	/deep/ .u-border-bottom:after{
		border: none;
	}
	
	/deep/ .u-border-top:after{
		border: none;
	}
	
	/deep/ .u-input--border{
		padding: 0 0!important;
		border:none;
	}
	
	/deep/ .uni-page-body{
		background-color: #000000!important;
	}
	
	/deep/ .u-list-item{
		width: 156upx!important;
		height: 156upx!important;
		background-color: #fff;
		border: 1px dashed #999999;
		color: #999999;
		margin: 0;
	}
	
	/deep/ .uicon-plus{
		font-size: 60upx!important;
		top: 14upx!important;
	}
	
	/depp/ .uicon-star{
		font-size: 24px;
	}
	
	/deep/ .u-btn--error{
		width: 590upx;
		height: 80upx;
		border-radius: 40upx;
		background: linear-gradient(to right,#EE1D23 0%,#F04023 100%);
	}
	
	/deep/ .u-cell__value{
		color: #EE1D23;
	}
	
	
	.order-item{
		display: flex;
		flex-direction: column;
		padding: 30upx;
		background: #fff;
		height: 250upx;
		border-radius: 20upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			.goods-img{
				display: block;
				width: 170upx;
				height: 170upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 30upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 24px;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: red;
					margin-top: 20upx;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: red;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}
	
	.rate_type{
		width: 100%;
		background-color: #fff;
		margin-top: 30upx;
		border-radius: 20upx;
		padding-bottom: 40upx;
		.rate_title{
			color: #333333;
			font-size: 32upx;
			font-weight: bold;
			height: 100upx;
			line-height: 100upx;
			padding-left:32upx;
		}
	}
	
	.goods-box-assess{
		padding: 0 30upx;
		.assess_title{
			color: #333333;
			height: 100upx;
			line-height: 100upx;
		}
		.imageVideo{
			width: 180upx;
			text-align: center;
			.addImage{
				font-size: 24upx;
				color: #999999;
				letter-spacing: 6upx;
			}
		}
		.rate{
			margin: 40upx 0;
			.rate_title{
				color: #333333;
				font-size: 32upx;
				font-weight: bold;
				margin-right: 40upx;
				
			}
		}
		.assess{
			padding-bottom: 20upx;
		}
	}
	.confirm{
		position: fixed;
		bottom: 40upx;
		left: 0;
		width: 100%;
	}
</style>
