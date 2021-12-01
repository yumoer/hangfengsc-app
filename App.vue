<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import pageAnimation from './components/page-animation'
	import uniRequest from 'uni-request'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		mapMutations
	} from 'vuex';
	export default {
		data(){
			return{
				version:'',
			}
		},
		mixins: [pageAnimation],
		components:{uniLoadMore},
		methods: {
			...mapMutations(['login']),
		},
		onLaunch: async function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			//app关闭默认的启动 方法关闭启动图。但是这个时间不能太晚，6s 超时后依旧会主动关闭。
			setTimeout(()=>{
				plus.navigator.closeSplashscreen();
			},100)
			// #endif
			let userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo.user_id){
				//更新登陆状态
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data);
					}
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang='scss'>
	/*
		全局公共样式和字体图标
	*/
   /*每个页面公共css */
   
   /* @import "uview-ui/iconfont.scss"; */
   @import "uview-ui/index.scss";
   @import "static/css/index-app.css";
   @import "static/css/iconfont/font.scss";
   @import "static/css/iconfont/icon.css";
   /*每个页面公共css */
   page{
   	background: $all_bgcolor-fff777;
	font-family: 'PingFang-SC-Heavy';
   }
   .defaultFontSize{
   	font-size: 3vw;
   }
   .itemStyle{
   	margin: 2vw 3vw;
   	padding: 2vw 3vw;
   	display: flex;
   	flex-direction: row;
   	justify-content: space-between;
   	align-items: center;
   	background-color: #FFF;
   	border-radius: 4px;
   	color: #666;
   	font-size: 4vw;
   }
   .active:active {
   	background-color: #F2F2F2;
   }
   

	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}
	
	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
	
	.clamp2{
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}
	
	/* #ifdef H5 */
	uni-rich-text img{max-width: 100%!important;}
	/* #endif */

	uni-button[type=default],
	button[type=default] {
		color: $font-color-dark;
	}

	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}
</style>
