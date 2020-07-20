<template>
  <div class="banner-container">
    <swiper :style="{width: '100vw', height: '410rpx'}" 
      :indicator-dots="swiperConfig.indicatorDots" 
      :indicator-color="swiperConfig.indicatorColor" 
      :indicator-active-color="swiperConfig.indicatorActiveColor"
      :autoplay="swiperConfig.autoplay" 
      :interval="swiperConfig.interval" 
      :duration="swiperConfig.duration" 
      :circular="swiperConfig.circular"
      @change="swiperChange" 
      @animationfinish="animationfinish"
      :previous-margin="previousMargin"
      :next-margin="nextMargin">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
		<!-- 1.当前展示为第1项时，bannerList最后一项和第二项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 2.当前展示为最后一项时，bannerList倒数第2项和第1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 3.当前展示为其他项（非第1和最后1项）时，bannerList当前项的前1项和后1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 4.padding值也需要根据不同项设定不同值，但理同justifyContent -->
        <div :style="{
            boxSizing: 'border-box', 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            justifyContent: curIndex===0?((index===listLen-1)?'flex-end':(index===1?'flex-start':'center')):(curIndex===listLen-1?(index===0?'flex-start':(index===listLen-2?'flex-end':'center')):(index===curIndex-1?'flex-end':(index===curIndex+1?'flex-start':'center'))), 
            padding: curIndex===0?((index===listLen-1)?'56rpx 26rpx 0 0':(index===1?'56rpx 0 0 26rpx':'56rpx 0 0 0')):(curIndex===listLen-1?(index===0?'56rpx 0 0 26rpx':(index===listLen-2?'56rpx 26rpx 0 0':'56rpx 0 0 0')):(index===curIndex-1?'56rpx 26rpx 0 0':(index===curIndex+1?'56rpx 0 0 26rpx':'56rpx 0 0 0')))
          }">
          <image :src="item.picture" 
            class="slide-image" 
            :style="{
              transform: curIndex===index?'scale(' + scaleX + ',' + scaleY + ')':'scale(1,1)',
              transitionDuration: '.3s',
              transitionTimingFunction: 'ease'
            }" 
            @click="getBannerDetail(index)"/>
        </div>
      </swiper-item>
    </swiper>
    <div class="desc-wrap" :class="[isDescAnimating?'hideAndShowDesc':'']">
      <div class="title">{{bannerList[descIndex].title}}</div>
      <div class="desc">{{bannerList[descIndex].description}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
	bannerList: {
		type: Array,
		default () {
			return []
		}
	},
	previousMargin: {
		type: String,
		default: '58rpx'
	},
	nextMargin: {
		type: String,
		default: '58rpx'
	},
	swiperConfig: {
		type: Object,
		default () {
			return {
				indicatorDots: true,
				indicatorColor: 'rgba(255, 255, 255, .4)',
				indicatorActiveColor: 'rgba(255, 255, 255, 1)',
				autoplay: false,
				interval: 3000,
				duration: 300,
				circular: true
			}
		}
	},
	scaleX: {
		type: String,
		default: (634 / 550).toFixed(4)
	},
	scaleY: {
		type: String,
		default: (378 / 328).toFixed(4)
	}
  },
  computed:{
	listLen () {
		return this.bannerList.length
	}
  },
  data () {
    return {
      curIndex: 0,
      descIndex: 0,
      isDescAnimating: false
    }
  },
  methods: {
    swiperChange (e) {
      const that = this
      this.curIndex = e.mp.detail.current
      this.isDescAnimating = true
      let timer = setTimeout(function () {
        that.descIndex = e.mp.detail.current
        clearTimeout(timer)
      }, 150)
    },
    animationfinish (e) {
      this.isDescAnimating = false
    },
    getBannerDetail (index) {
	  uni.showLoading({
		title: '将前往详情页面',
		duration: 2000,
		mask: true
	  })
    }
  }
}
</script>
<style lang="scss" scoped>
.banner-container {
  width: 100vw;
  height: 524rpx;
  .slide-image {
    width: 550rpx;
    height: 328rpx;
    z-index: 200;
  }
  .desc-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 98rpx;
    padding: 24rpx 66rpx 0;
    .title {
      width: 100%;
      height: 42rpx;
      line-height: 42rpx;
      color: #222222;
      font-size: 30rpx;
      font-family: 'PingFangTC-Regular';
      font-weight: 600;
      text-align: left;
    }
    .desc {
      margin-top: 4rpx;
      width: 100%;
      height: 34rpx;
      line-height: 34rpx;
      color: #999999;
      font-size: 24rpx;
      font-family: 'PingFangTC-Regular';
      text-align: left;
    }
  }
  @keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: .5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: .5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }
  .hideAndShowDesc {
    animation: descAnimation .3s ease 1;
    -webkit-animation: descAnimation .3s ease 1;
  }
}
</style>
