<template>
	<form>
		<view class="page_box">
			<view class="head_box"></view>
			<view class="content_box pad" style="padding: 0 30upx;">
				<view class="form-item">
					<label>
						<view class="inp-title">意见反馈(必填)</view>
						<view class="area-box">
							<textarea
								class="inp-area"
								v-model="content"
								name="message"
								placeholder="客官~您对我们的应用还满意吗，请给予我们你的意见我们将做的更好~"
								placeholder-class="pl-style"
							/>
							<view class="img-box">
								<view class="preview-box" v-for="(item, index) in imgList" :key="index">
									<image class="preview-img" :src="item.path" @click="into(index)" mode="aspectFill"></image>
									<text class="cuIcon-close" @tap="DelImg(index)"></text>
								</view>
								<view class="choose-img x-c" @tap="onChooseImg" v-if="imgList.length < 1"><text class="cuIcon-cameraadd"></text></view>
							</view>
						</view>
					</label>
				</view>
				<view class="form-item">
					<label>
						<view class="inp-title">联系方式(非必填)</view>
						<input class="inp" v-model="email" name="email" placeholder="请输入您的邮箱/QQ/手机号" placeholder-class="pl-style" />
					</label>
				</view>
			</view>
			<view class="foot_box x-bc pad" style="display: flex;padding: 0 30upx;">
				<button class="cu-btn post-btn" style="margin: 20px 0;" @tap="addFeedback">提交</button>
				<button class="cu-btn contact-btn" v-if="false">联系客服</button>
			</view>
		</view>
	</form>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data(){
			return {
				imgList: [], //图片
				tempFilePaths:'',
				image:'',
				type: '', //类型
				content: '', //描述
				email: '', //电话
			}
		},
		methods:{
			addFeedback() {
				let that = this;
				if(that.content === ''){
					this.$api.msg('反馈意见不能为空')
				}else if(that.tempFilePaths[0] === undefined){
					this.$api.msg('图片不能为空')
				}else if(that.email === ''){
					this.$api.msg('联系方式不能为空')
				}else{
					uni.uploadFile({
						  url : 'http://47.94.106.106:8000/mobile/opinion/',
						  method: 'POST',
						  headers: {
						  	'Authorization': 'JWT ' + uni.getStorageSync('userInfo').token,
						  	'Content-Type':'application/x-www-form-urlencoded'
						  },
						  filePath: that.tempFilePaths[0],
						  name: 'image',
						  formData: {
						   content: that.content,
						   email:that.email,
						  },
						  success: function (uploadFileRes) {
						   console.log(uploadFileRes);
						   if(uploadFileRes.statusCode === 201){
							   that.$api.msg('提交成功')
							   setTimeout(function(){
							   	uni.navigateBack()
							   },500)
						   }
						  }
					 });
				}
			},
			
			into(index){
				uni.previewImage({
					current: index,
					urls: this.imgList.map(r => r.path)
				});
			},
			// 选择图片  
			onChooseImg() {
				let that = this;
				uni.chooseImage({
					sizeType: ['compressed', 'original'],
					sourceType: ['album', 'camera'],
					count: 1,
					success: function(res) {
						console.log(res)
						that.tempFilePaths = res.tempFilePaths;
						that.imgList = that.imgList.concat(res.tempFiles)
					},
					fail: function(err) {
						console.log(err);
					}
				});
			},
			DelImg(index) {
				uni.showModal({
					title: '删除照片',
					content: '确定要删除这张照片么？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(index, 1);
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
page{
	background: #fff;
	padding: 0px;
}
.page_box {
	background: #fff;
}
.form-item {
	.inp-title {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 30rpx;
	}
	.inp {
		width: 690rpx;
		height: 84rpx;
		background: rgba(249, 250, 251, 1);
		border-radius: 20rpx;
		padding: 0 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		margin-bottom: 38rpx;
	}
	.inp-house {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(177, 179, 199, 1);
	}
	.area-inp {
		height: 190upx;
		padding: 30rpx;
	}
	.pl-style {
		font-size: 26rpx;
		font-family: PingFang SC;
		color: rgba(177, 179, 199, 1);
	}
}
.area-box {
	width: 690rpx;
	min-height: 306rpx;
	background: rgba(249, 250, 251, 1);
	border-radius: 20rpx;
	padding: 28rpx;
	.pl-style {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(177, 179, 199, 1);
		line-height: 50rpx;
	}
	.inp-area {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		line-height: 50rpx;
		width: 100%;
	}
	.img-box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 20rpx;
		.choose-img,
		.preview-box {
			width: 108rpx;
			height: 108rpx;
			background: rgba(249, 250, 251, 1);
			border: 1rpx solid rgba(223, 223, 223, 1);
			margin-right: 25rpx;
			margin-bottom: 25rpx;
			position: relative;
			&:nth-child(5n) {
				margin-right: 0;
			}
			.cuIcon-cameraadd {
				font-size: 50rpx;
				color: #dfdfdf;
			}
			.preview-img {
				width: 100%;
				height: 100%;
			}
			.cuIcon-close {
				background: #fa436a;
				border-radius: 50%;
				width: 40rpx;
				line-height: 40rpx;
				color: #fff;
				text-align: center;
				position: absolute;
				top: -10rpx;
				right: -10rpx;
			}
		}
	}
}
.foot_box {
	border-top: 1rpx solid #eeeeee;
	height: 100rpx;
	.contact-btn {
		flex: 1;
		height: 70rpx;
		background: linear-gradient(90deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
		box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
	.post-btn {
		flex: 1;
		height: 74rpx;
		background: #fa436a;
		box-shadow: 0px 7rpx 6rpx 0rpx rgba(229, 138, 0, 0.22);
		border-radius: 37rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
}

.radio-box {
	margin-top: 30rpx;
	.radio-item {
		margin-bottom: 40rpx;
		.radio-inp {
			transform: scale(0.7);
			margin-right: 10rpx;
		}
		.radio-title {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}
	}
}
.uni-radio-input-checked {
	background-color: #f37b1d !important;
	border: #f37b1d !important;
}
</style>