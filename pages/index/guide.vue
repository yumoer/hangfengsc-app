<template>
	<view class="content">
		<swiper class="swiper" 
		:autoplay="autoplay" 
		:duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<image src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttVSAa0IbAAfrguT01pY1316332"></image>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttVSAXGQqAAb8WAXRPEA1444622"></image>
				</view>
				<view class="jump-over"  @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGttVSAbhnVABJqn7EUWZw1130385"></image>
				</view>
				<view class="experience" @tap="launchFlag()">{{experience}}</view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验',
				show: false,
				text:''
			}
		},
		onLoad(){
			const value = uni.getStorageSync('userInfo');
			if (!value) {
				this.show = true
			}else{
				this.show = false
			}
			
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
						key: 'launchFlag',
						data: true,
				});
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			popupState(e){
				console.log(e)
			},
			
			
			cancel(e){
				console.log(e);
				// this.show = false
				switch(uni.getSystemInfoSync().platform){
				    case 'android':
				       console.log('运行Android上')
					   plus.runtime.quit();
				       break;
				
				    case 'ios':
				       console.log('运行iOS上')
						const threadClass = plus.ios.importClass("NSThread");
						const mainThread = plus.ios.invoke(threadClass, "mainThread");
						plus.ios.invoke(mainThread, "exit");
				       break;
				
				    default:
				       console.log('运行在开发者工具上')
				       break;
				}
			},
			confirm(e){
				this.show = false
			},
			event(e){
				console.log(e)
				if(e === false){
					this.show = false
				}else{
					this.show = false
				}
			}
		}
	}
</script>
<style>
	page,
	.content{
		width: 100%;
		height: 100%;
		background-size: 100% auto ;
		padding: 0;
	}
	.swiper{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		display: flex;
		/* justify-content: center; */
		align-items:flex-end;
		flex-direction:column-reverse
	}
	.swiper-item-img{
		width: 100%;
		height: 100%;
		/* margin: 0 auto; */
	}
	.swiper-item image{
		width: 100%;
		height: 100%;
	}
	.uniapp-img{
		/* height: 20%; */
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items:center;
		overflow: hidden;
	}
	.uniapp-img image{
		width: 40%;
	}
	
	.jump-over,.experience{
		position: absolute;
		height: 60upx;
		line-height: 62upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #fff;
		border: 1px solid #fff;
		z-index: 999;
	}
	.jump-over{
		right: 45upx;
		top: 125upx;
	}
	.experience{
		right: 50%;
		margin-right: -105upx;
		bottom: 16%;
	}
</style>
