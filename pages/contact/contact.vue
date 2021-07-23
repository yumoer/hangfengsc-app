<template>
	<view id="page">
		<view class="banner">
			<img style="width: 100%;height: 180px;" src="/static/index/banner.jpg" alt="">
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="content">
			<view class="mobile" @click="call">
				<view class="left">
					<text>手机</text>
					<!-- <text class="icon yticon icon-yuezhifu"></text> -->
				</view>
				<view class="right">
					<text>{{mobile}}</text>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="content">
			<view class="mobile" @click="copy(mobile)">
				<view class="left">
					<text>电话</text>
				</view>
				<view class="right">
					<text>{{mobile}}</text>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import h5Copy from '@/components/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		data() {
			return {
				mobile:'010-67251751',
			};
		},
		mounted() {
			
		},
		methods:{
			call(){
				uni.makePhoneCall({
				    phoneNumber: this.mobile //仅为示例
				});
			},
			copy(value) {//复制文本内容
				// #ifdef H5
				const result = h5Copy(value);
				if (result === false) {
					uni.showToast({
						title: '不支持'
					});
				} else {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					});
				}
				// #endif
				// #ifdef MP
				uni.setClipboardData({
					 data: value,
					 success: function() {
						 console.log('success');
					 }
				});
				// #endif
			},
		}
	}
</script>

<style lang="stylus">
#page{
	width 100%
	height 100%
	background-color transparent
	padding 20px
	.banner{
		width 100%
		height 180px
		margin 0 auto
		img{
			border-radius 10px
		}
	}
	.content{
		width 100%
		height 100%
		.mobile{
			width 100%
			height 60px
			margin-top 20px
			.left{
				width 35%
				height 100%
				float left
				background-color #f5f5f5
				border-radius 10px
				position relative
				text{
					display block
					font-size 16px
					text-align center
					line-height 60px
				}
			}
			.right{
				width 63%
				height 100%
				float right
				background-color #f5f5f5
				border-radius 10px
				text{
					display block
					font-size 16px
					text-align center
					line-height 60px
				}
			}
		}
		.qq{
			width 100%
			height 60px
			margin-top 20px
			.left{
				width 35%
				height 100%
				float left
				background-color #f5f5f5
				border-radius 10px
				position relative
				text{
					display block
					font-size 16px
					text-align center
					line-height 60px
				}
			}
			.right{
				width 63%
				height 100%
				float right
				background-color #f5f5f5
				border-radius 10px
				text{
					display block
					font-size 16px
					text-align center
					line-height 60px
				}
			}
		}
	}
}
</style>
