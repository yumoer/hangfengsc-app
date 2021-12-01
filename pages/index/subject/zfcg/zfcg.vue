<template>
	<view class="wrap">
		<view class="wrap-header">
			<view class="header">
				<view class="header-name">
					行丰银拓科技集团有限公司
				</view>
				<view class="header-info">
					以客为尊，用心服务，诚信永恒，高校卓越
				</view>
			</view>
		</view>
		<view class="company">
			<view class="company-like" @click="like">
				<image class="icon" :class="{'animate_heartBeat' : isClickLike}" style="width: 58upx;height: 50upx;" src="http://47.94.106.106:8888/group1/M00/53/88/rBHxiGEKTMWAQIyFAAADprBtruA5129207" mode=""></image>
			</view>
			<view class="company-info">
				公司依靠优秀的技术，销售，物流，售后团队致力于打造一流的一站式办公服务平台，公司自成立以来一直不断进步，深受各个政府采购方面的信任和喜爱，现已与各大政府部门有着深远的合作以及平台对接。在一起前进的道路上，我们保证一定继续提供最优质的服务。
			</view>
		</view>
		<view class="websitesWrapper" @catchtouchmove="moveHandle">
			<view class="websites">
				<view class="title">政府采购</view>
				<view class="cardWrapper" @touchstart="handleCardTouchStart" @touchend="handleCardTouchEnd">
				  <view class="cardContainer">
					<view class="card" @tap="changeCardIndex($event,item)" v-for="(item,index) in websites" :key="index" style="background-image: url('http://47.94.106.106:8888/group1/M00/59/1A/rBHxiGE5zvWAPSqxAACMNXSctJQ4858829');" :style="[{'background-color': decideBgColor(index)},{'top':getTop(index)},{'z-index':getZIndex(index)},{transform:`scale(${getScale(index)},${getScale(index)})`}]">
					  <view class="logo" :style="{backgroundImage: `url(${item.image})`}">
					  </view>
					  <view class="text">{{item.title}}</view>
					  <view class="mask"></view>
					</view>
				  </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				movHeight: '360rpx',//卡片高度
				//传入的数据示例
				website: [
					{
					  id: 0,
					  title: '中央政府采购网',
					  image: 'http://47.94.106.106:8888/group1/M00/53/8B/rBHxiGELM56Ae20IAAAc1gtWPqw5350001',
					},
					{
					  id: 1,
					  title: '中直机关协议供货电子商城',
					},
					{
					  id: 2,
					  title: '北京市政府采购电商办公设备电商平台',
					},
					{
					  id: 3,
					  title: '天津市政府采购中心',
					},
					{
					  id: 4,
					  title: '广东政府采购智慧云平台',
					},
					{
					  id: 5,
					  title: '河北省政府采购网上商城',
					},
					{
					  id: 6,
					  title: '山西政府采购电子卖场',
					},
					{
					  id: 7,
					  title: '湖北省政府采购网上商城',
					},
					{
					  id: 8,
					  title: '江西省本级政府采购网上商城'
					},
					{
					  id: 9,
					  title: '陕西省政府采购网'
					},
					{
					  id: 10,
					  title: '山东省政府采购网上商城'
					},
					{
					  id: 11,
					  title: '内蒙古自治区政府采购平台'
					},
					{
					  id: 12,
					  title: '重庆政府采购云服务平台'
					},
					{
					  id: 13,
					  title: '徽采商城'
					},
					{
					  id: 14,
					  title: '淮采商城'
					},
					{
					  id: 15,
					  title: '赣州市政府采购网上商城'
					},
					{
					  id: 16,
					  title: '昆山市政府采购商城'
					},
					{
					  id: 17,
					  title: '济南市济阳区政府采购网上商城'
					},
					{
					  id: 18,
					  title: '安采商城'
					},
					{
					  id: 19,
					  title: '钦州政采网上商城'
					},
					{
					  id: 20,
					  title: '襄阳市政府采购网上商城'
					},
					{
					  id: 21,
					  title: '合肥市蜀山区政府采购网上商城'
					},
					{
					  id: 22,
					  title: '长沙电子卖场'
					},
					{
					  id: 23,
					  title: '喀斯玛商城'
					},
					{
					  id: 24,
					  title: '政府采购云平台'
					},
					{
					  id: 25,
					  title: '南通市政府采购网上商城'
					},
					{
					  id: 26,
					  title: '驻马店政府采购网'
					},
					{
					  id: 27,
					  title: '启东市政府采购网上商城'
					}
			    ],
				websites:[],
				isClickLike: false,
				_cardTouch:0,
				zTurnIndex:0,
			};
		},
		onLoad() {
			this.websites =  this.__initZTurnData__(this.website, this.zTurnIndex)
			console.log(this.websites)
		},
		methods: {
		    like() {
			  if (!this.isClickLike) {
				const timer = setTimeout(() => {
				  timer && clearTimeout(timer)
				  this.isClickLike = false
				}, 800)
				this.isClickLike = true
			  }
			},
			
			 // websites 动效
			changeCardIndex(e,item) {
			    const index = this.__checkZTurnIndex__(item.id)
				this.websites = this.__initZTurnData__(this.website, index)
				this.zTurnIndex = index
			},
			  
			moveHandle(){
				return true
			},
			
			handleCardTouchStart(e) {
				this._cardTouch = e.changedTouches[0].pageY
			},
			handleCardTouchEnd(e) {
				if (e.changedTouches[0].pageY - this._cardTouch <= -50) {
				  const index = this.__checkZTurnIndex__(this.zTurnIndex + 1)
				  this.websites = this.__initZTurnData__(this.website, index),
				  this.zTurnIndex = index
				}
				if (e.changedTouches[0].pageY - this._cardTouch >= 50) {
				  const index = this.__checkZTurnIndex__(this.zTurnIndex - 1)
				  this.websites = this.__initZTurnData__(this.website, index),
				  this.zTurnIndex = index
				}
			},
			__checkZTurnIndex__(index) {
			  const arr = this.website
			  if (index < 0) {
			    return arr.length - 1
			  }
			  if (index > arr.length - 1) {
			    return 0
			  }
			  return index
			},
			// 上下4个，一共取周围8个，不够就回到最后去拿
			__initZTurnData__(originData, index) {
			  if (!originData instanceof Array) {
			    return new Error('first param must be Array ')
			  }
			  if (originData.length <= 9) {
			    return originData
			  }
			  const tempArr = originData.concat(originData)
			  if (index < 4) {
			    // 上取不够，就回到最后拿
			    let leftArr = []
			    for (let i = 4 - index; i > 0; i--) {
			      leftArr.push(tempArr[originData.length - i])
			    }
			    return leftArr.concat(originData.slice(0, index + 4 + 1))
			  }
			  if (originData.length - index <= 4) {
			    // 下取不够，就回到最前面拿
			    let moreArr = []
			    for (let i = 0; i < 4 - (originData.length - index - 1); i++) {
			      moreArr.push(tempArr[originData.length + i])
			    }
			    return originData.slice(index - 4, originData.length).concat(moreArr)
			  }
			  // 正常拿，上下游只拿4个，带上本身
			  return originData.slice(index - 4, index + 4 + 1)
			},
			getScale(index) {
			    if (index === 4) {
			      return 1
			    }
			    var value = 0.92
			    if (index === 3 || index === 5) {
			      return value
			    }
			    if (index === 2 || index === 6) {
			      return Math.pow(value, 2)
			    }
			    if (index === 1 || index === 7) {
			      return Math.pow(value, 3)
			    }
			    if (index === 0 || index === 8) {
			      return Math.pow(value, 4)
			    }
			  },
			decideBgColor(index) {
			    var colorList = ['#ADDFFFFF', '#95D6FFFF', '#84CFFFFF', '#64C1FCFF', '#24A2F1']
			    if (index === 4) {
			      return colorList[4]
			    }
			    if (index === 0 || index === 8) {
			      return colorList[0]
			    }
			    if (index === 1 || index === 7) {
			      return colorList[1]
			    }
			    if (index === 2 || index === 6) {
			      return colorList[2]
			    }
			    if (index === 3 || index === 5) {
			      return colorList[3]
			    }
			  },
			getTop(index) {
				const _scaleCardHeight = 40;
			    if (index === 4) {
			      return 0 + 'upx'
			    }
			    if (index < 4) {
			      return -(4 - index) * _scaleCardHeight + 'upx'
			    }
			    if (index > 4) {
			      return (index - 4) * _scaleCardHeight + 'upx'
			    }
			  },
			getZIndex(index) {
			    if (index === 4) {
			      return 5
			    }
			    if (index === 0 || index === 8) {
			      return 1
			    }
			    if (index === 1 || index === 7) {
			      return 2
			    }
			    if (index === 2 || index === 6) {
			      return 3
			    }
			    if (index === 3 || index === 5) {
			      return 4
			    }
			}
		}
	}
</script>

<style lang="scss">
	.wrap{
		width: 100%;
		height: 100%;
		.wrap-header{
			width: 100%;
			height: 570upx;
			background: url('http://47.94.106.106:8888/group1/M00/53/87/rBHxiGEKRgKAUwsqAAu6_A43jKo0155421') no-repeat top center / 100%;
			.header{
				padding-top: 380upx;
				padding-left: 30upx;
				.header-name{
					color: #FFFFFF;
					font-size: 36upx;
					margin-bottom: 10upx;
					font-weight: bold;
				}
				.header-info{
					color: #FFFFFF;
					font-size: 24upx;
				}
			}
			
		}
		.company{
			width: 100%;
			height: 336upx;
			background-color: #fff;
			padding: 30upx;
			
			position: relative;
			.company-like{
				width: 110upx;
				height: 110upx;
				border-radius: 50%;
				background-color: #fff;
				box-shadow: 0 0 7upx 0 rgba(238, 29, 35, 0.1);
				position: absolute;
				right: 15upx;
				top: -60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				// transition: opacity 0.3s ease-in;
				--animate-duration: 1s;
				--animate-delay: 1s;
				--animate-repeat: 1;
				.icon{
					width: 58upx;
					height: 50upx;
				}
				.animate_heartBeat{
					animation-name: heartBeat;
					  animation-duration: calc(1s * 1.3);
					  animation-duration: calc(var(--animate-duration) * 1.3);
					  animation-timing-function: ease-in-out;
					  animation-iteration-count: infinite;
				}
				@keyframes heartBeat {
				  0% {
				    transform: scale(1);
				  }
				  14% {
				    transform: scale(1.3);
				  }
				  28% {
				    transform: scale(1);
				  }
				  42% {
				    transform: scale(1.3);
				  }
				  70% {
				    transform: scale(1);
				  }
				}
			}
			.company-info{
				font-size: 28upx;
				color: #333333;
				width: 620upx;
				line-height: 46upx;
				height: 240upx;
			}
		}
		.websitesWrapper{
			  background: #f7f7f7;
			  padding-top: 20rpx;
			  height: 700rpx;
			.websites{
				  background-color: #fff;
				  height: 100%;
				  padding: 30rpx;
				  box-sizing: border-box;
				.title{
					  color: #333333;
					  font-weight: bold;
					  font-size: 32rpx;
					  height: 42rpx;
					  line-height: 42rpx;
				}
				.cardWrapper{
					   width: 100%;
					   display: flex;
					   height: calc(100% - 20upx);
					.cardContainer{
						 width: 100%;
						  top: calc(20upx + 160upx);
						  height: calc(280upx + 160upx);
						  box-sizing: border-box;
						  display: flex;
						  justify-content: center;
						  align-items: center;
						  position: relative;
						.card{
							width: 100%;
							  height: 280rpx;
							  background-repeat: no-repeat;
							  background-position: center;
							  background-size: 100%;
							  overflow: hidden;
							  position: absolute;
							  transition: all 0.2s;
							  border-radius: 20rpx;
							  top: 0;
							  left: 0;
							.logo{
								width: 400upx;
								height: 80rpx;
								  background-repeat: no-repeat;
								  background-size: contain;
								  margin: 30rpx 0 0 52rpx;
							}
							.text{
								position: absolute;
								  right: 29rpx;
								  bottom: 35rpx;
								  color: #fff;
								  font-size: 32rpx;
							}
							.mask{
								
							}
						}
					}
				}
			}
			
		}
	}
</style>
