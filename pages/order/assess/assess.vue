<template>
	<view class="content">
		<view class="order-item">
			<view class="goods-box-single">
				<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp2">{{goodsItem.title}}</text>
					<view class="other">
						<text class="price" style="float: left;">{{goodsItem.price}} </text>
						<text class="attr-box" style="float: right;"> x {{goodsItem.count}}</text>
					</view>
				</view>
			</view>
			<view class="goods-box-assess">
				<u-input v-model="infoReceive.textareaValue" :type="type" :border="border" :height="height" :auto-height="autoHeight" placeholder="请为这个商品添加您的评价"/>
				
				<!-- <view class="imageVideo">
					<u-upload :action="action" ref="uUpload" uploadText="" :file-list="fileList" :max-size="1 * 1024 * 1024" :max-count="1" :auto-upload="false"></u-upload>
					<text class="addImage">添加图片/视频</text>
				</view> -->
				<view class="rate">
					<text class="rate_title">商品评分</text>
					<u-rate :count="count" v-model="infoReceive.score"></u-rate>
				</view>
				<view class="assess">
					<u-checkbox-group>
						<u-checkbox 
							@change="checkboxChange" 
							v-model="infoReceive.is_anonymous" 
							v-for="(item, index) in list" :key="index" 
							:name="item.name"
							active-color="#ee1d23"
						>{{item.name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
		</view>
		<view class="confirm">
			<u-button type="error" @click="confirmBtn(infoReceive)">发表评价</u-button>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				// 这里循环出未点亮的星分和点亮的星分
				tabCurrentIndex: 0,
				goodsItem: {},
				desc: '',
				orderId: null,
				subOrderId: null,
				value: '',
				type: 'textarea',
				border: true,
				height: 200,
				checked:false,
				list:[{name: '匿名评价',checked: false,}],
				action:'',
				fileList:[],
				count:5,
				autoHeight: true,
				infoReceive: {
					score: 0,
					is_anonymous: false,
					textareaValue: '',
					headPicValue: ''
				},
			}
		},
		components: {
			uniSection,
		},
		onLoad(options) {
			this.goodsItem = JSON.parse(decodeURIComponent(options.item))
			console.log(this.goodsItem)
			this.subOrderId = Number(options.sub_order_id)
			this.orderId = options.order_id
		},
		onShow() {
			if (uni.getStorageSync('avatar') !== undefined) {
				this.infoReceive.headPicValue = uni.getStorageSync('avatar')
			} else if (uni.getStorageSync('userInfo').avatar !== '') {
				this.infoReceive.headPicValue = uni.getStorageSync('userInfo').avatar
			} else {
				this.infoReceive.headPicValue = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
			}
		},
		methods: {
			
			getAssess(e) {
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				prevPage.setData({
					isDoRefresh: true
				})
				setTimeout(function() {
					uni.navigateBack();
				}, 600);
			},

			// 单选框
			checkboxChange(check) {
				console.log(check)
				// this.infoReceive.is_anonymous = !check
				// console.log(this.infoReceive.is_anonymous)
				// if (uni.getStorageSync('avatar') !== undefined) {
				// 	this.infoReceive.headPicValue = uni.getStorageSync('avatar')
				// } else if (uni.getStorageSync('userInfo').avatar !== '') {
				// 	this.infoReceive.headPicValue = uni.getStorageSync('userInfo').avatar
				// } else {
				// 	this.infoReceive.headPicValue = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
				// }
			},
			
			afterRead(index, list){
				console.log(index, list)
			},
			
			imageChange(res, index, lists, name){
				console.log(res, index, lists, name)
			},
			// 发表评价
			async confirmBtn(e) {
				console.log(e,this.goodsItem.id,this.subOrderId,this.orderId)
				if(e.textareaValue){
					await uniRequest({
						url: '/goods/user/comment/',
						method: 'post',
						data: {
							sku: this.goodsItem.id,
							sub_order_id: this.subOrderId,
							order_id: this.orderId,
							comment: e.textareaValue,
							is_anonymous: e.is_anonymous,
							score: e.score
						},
						headers: {
							Authorization: 'JWT ' + uni.getStorageSync('userInfo').token
						},
					}).then(res => {
						console.log(res)
						if (res.status === 201) {
							this.$api.msg('评论成功')
							setTimeout(function() {
								uni.navigateBack();
							}, 600);
							// this.getAssess(e)
						} else {
							this.$api.msg(res.data.message)
						}
					}).catch(error => {
						console.log(error)
					})
				}else{
					this.$api.msg('请填写评价内容')
				}
			},
		},
	}
</script>
<style lang="scss">
	/deep/ .u-input--border{
		padding: 0 0!important;
		border:none;
	}
	
	/deep/ .uni-page-body{
		background-color: #000000!important;
	}
	
	/deep/ .u-list-item{
		width: 160upx!important;
		height: 160upx!important;
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
	.content {
		// background: $page-color-base;
		height: 100%;
		padding: 30upx;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	.order-item {
		display: block;
		flex-direction: column;
		background: #fff;
		border-radius: 20upx;

		.goods-box-single {
			display: flex;
			padding: 30upx;

			.goods-img {
				display: block;
				width: 190upx;
				height: 190upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 0 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 50upx;
				}

				.other {
					margin-top: 36upx;

					.price {
						font-size: 36upx;
						color: red;

						&:before {
							content: '￥';
							font-size: $font-sm;
							margin: 0 2upx 0 8upx;
						}
					}

					.attr-box {
						font-size: $font-sm + 2upx;
						color: $font-color-light;
						padding: 10upx 12upx;
					}
				}

			}

			.example-body {
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
				padding: 0;
				font-size: 14rpx;
				background-color: #ffffff;
			}


		}
		
		.goods-box-assess{
			padding: 0 30upx;
			.imageVideo{
				width: 200upx;
				.addImage{
					width: 180upx;
					font-size: 24upx;
					color: #999999;
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
	}
	.confirm{
		position: fixed;
		bottom: 40upx;
		left: 0;
		width: 100%;
	}
</style>
