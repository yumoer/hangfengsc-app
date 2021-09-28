<template>
	<view class="wrap">
		<view class="u-avatar-wrap">
			<image class="u-avatar-demo" :src="avatar" mode="aspectFill"></image>
		</view>
		<u-button class="changeBtn" @tap="chooseAvatar">选择图片</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '',
			}
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			if(uni.getStorageSync('avatar') !== ''){
				this.avatar = uni.getStorageSync('avatar')
			}else if(uni.getStorageSync('userInfo').avatar !== ''){
				this.avatar = uni.getStorageSync('userInfo').avatar
			}else{
				this.avatar = 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
			}
			uni.$on('uAvatarCropper', path => {
				console.log(path)
				this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: 'http://47.94.106.106:8000/user/avatar/',
					filePath: path,
					header: {
						'Authorization': 'JWT ' + uni.getStorageSync('userInfo').token
					},
					name: 'avatar',
					complete: (res) => {
						if(res.statusCode === 200){
							this.avatar = JSON.parse(res.data).avatar
							this.$api.msg('图片更改成功')
							uni.setStorage({
								key: 'avatar',
								data: this.avatar
							});
						}
					}
				});
			})
		},
		methods: {
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}

	.u-avatar-wrap {
		margin-top: 130upx;
		overflow: hidden;
		margin-bottom: 180upx;
		text-align: center;
	}

	.u-avatar-demo {
		width: 300upx;
		height: 300upx;
		border: 6upx solid #fff;
		border-radius: 50%;
	}
	
	.changeBtn{
		width: 590upx;
		height: 80upx;
		color: #fff;
		border-radius: 40upx;
		background: linear-gradient(to right,#EE1D23,#F04023);
	}
</style>
