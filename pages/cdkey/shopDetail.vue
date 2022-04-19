<template>
	<view class="">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperCurrent: 0,
				swiperLength: 5,
				exchanges:[],
				carouselList:[
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAWcGSAAYqz4oAxas5080497'},
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAHUBCAAOGS0Uzxvo4616422'},
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAdJhcAASmoXq7e5E0433727'},
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAcedPAAbVHhfVK106634684'},
					{image:'http://47.94.106.106:8888/group1/M00/5D/26/rBHxiGGtqjmAFuc4AATa87U6IDw1212955'},
				]
			}
		},
		onLoad(option) {
			// console.log(option.data)
			this.exchanges = JSON.parse(option.data)
		},
		methods: {
			//轮播图切换修改背景色
			swiperChange(e) {
				// console.log(e)
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
		}
	}
</script>

<style lang="scss">
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
		top: 350px;
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
