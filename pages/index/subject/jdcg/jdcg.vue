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
		</view>
		<view class="websiteWrapper">
		  <view class="title">军队采购</view>
		  <view class="content">
			<view class="eachWebsite" v-for="(item,index) in websites" :key="index">
			  <view class="image">
				<image :src="item.image" style="width: 300upx;height:100%"></image>
			  </view>
			  <view class="name">{{item.name}}</view>
			  <view class="count">{{item.id}}</view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isClickLike: false,
				websites: [
				    {
				      id: 1,
				      name: '军队采购网',
				      image: 'http://47.94.106.106:8888/group1/M00/5C/C9/rBHxiGFmMe-APV7FAABIkX_abVA5065522'
				    }, {
				      id: 2,
				      name: '蓝天商城',
				      image: 'http://47.94.106.106:8888/group1/M00/5C/C9/rBHxiGFmMe-AUGIxAAApKwHRYek6229891'
				    }, {
				      id: 3,
				      name: '政府采购信息网',
				      image: 'http://47.94.106.106:8888/group1/M00/5C/C9/rBHxiGFmMe-Aao1ZAAAp__Kegew4147587'
				    }, {
				      id: 4,
				      name: '政府采购军队采购信息服务平台',
				      image: 'http://47.94.106.106:8888/group1/M00/5C/C9/rBHxiGFmMe-AX75hAAAo1St2mdQ2429981'
				    },
				  ]
			};
		},
		methods:{
			like() {
			  if (!this.isClickLike) {
				const timer = setTimeout(() => {
				  timer && clearTimeout(timer)
				  this.isClickLike = false
				}, 800)
				this.isClickLike = true
			  }
			},
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
			background-color: #fff;
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
		}
		.websiteWrapper{
			width: 100%;
		    padding: 81rpx 30rpx 30rpx;
		    box-sizing: border-box;
			.title{
				color: #333;
				font-size: 32rpx;
				font-weight: bold;
			}
			.eachWebsite{
				width: 100%;
			    height: 140rpx;
			    box-sizing: border-box;
			    padding: 25rpx 0 25rpx 30rpx;
			    background-color: #fff;
			    box-shadow: 0 0 10rpx rgba(35, 4, 5, 0.1);
			    border-radius: 10rpx;
			    margin-top: 30rpx;
			    display: flex;
			    justify-content: flex-start;
			    position: relative;
				.name{
					width: calc(100% - 300rpx);
					height: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: #666;
					font-size: 20rpx;
					padding-left: 36rpx;
					box-sizing: border-box;
				}
				.count{
					position: absolute;
					width: 105rpx;
					background: url("http://47.94.106.106:8888/group1/M00/5C/C9/rBHxiGFmfvqAfUkzAAAHjhblS_M8760217") no-repeat top center / 100%;
					height: 100%;
					right: -8rpx;
					top: -8rpx;
					padding-top: 18rpx;
					padding-left: 60rpx;
					box-sizing: border-box;
					color: #fff;
					font-weight: bold;
					font-size: 32rpx;
				}
			}
		}
	}
</style>
