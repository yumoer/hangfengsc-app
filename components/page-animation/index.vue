<script>
	export default {
		// #ifdef H5
		onLaunch: function() {
			this.show()
			this.$router.beforeEach((to, from, next) => {
				this.hide(next)
			})
			this.$router.afterEach(() => {
				setTimeout(this.show, 50)
			})
		},
		methods: {
			hide(callback) {
				const classList = document.querySelector('uni-page').classList
				classList.add('animation-before', 'animation-leave')
				classList.remove('animation-show')
				setTimeout(() => {
					classList.remove('animation-before', 'animation-leave')
					callback && callback()
				}, 300)
			},
			show() {
				const classList = document.querySelector('uni-page').classList
				classList.add('animation-before')
				setTimeout(() => {
					classList.add('animation-enter', 'animation-after', 'animation-show')
					setTimeout(() => {
						classList.remove('animation-before', 'animation-after', 'animation-enter')
					}, 300)
				}, 20)
			}
		},
		// #endif
	}
</script>
<style>
	/* #ifdef H5 */
	uni-page {
		opacity: 0;
	}
	
	uni-page.animation-before {
		/* 在页面上使用 transform 会导致页面内的 fixed 定位渲染为 absolute，需要在动画完成后移除 */
		transform: translateY(20px);
	}
	
	uni-page.animation-leave {
		transition: all .3s ease;
	}
	
	uni-page.animation-enter {
		transition: all .3s ease;
	}
	
	uni-page.animation-show {
		opacity: 1;
	}
	
	uni-page.animation-after {
		/* 在页面上使用 transform 会导致页面内的 fixed 定位渲染为 absolute，需要在动画完成后移除 */
		transform: translateY(0);
	}
	
	/* #endif */
	
</style>