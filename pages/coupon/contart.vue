<template>
	<form>
		<view class="page_box">
			<view class="banner">
				<img style="width: 100%;height: 100%;z-index: -1;" src="http://47.94.106.106:8888/group1/M00/61/B3/rBHxiGJeHZaAB4DSAJAZjP9QcA48836547" alt="">
			</view>
			<view class="content_box pad" style="position: absolute;bottom: 110px;left: 0;width: 100%;padding: 0 40px;">
				<u-form :model="query" ref="uForm">
					<u-form-item label="姓名" style="font-size: 30upx;border-bottom: none;">
						<u-input v-model="query.name" clearable type="text" :border="true" placeholder="请输入您的姓名" />
					</u-form-item>
					<u-form-item label="电话" style="font-size: 30upx;">
						<u-input v-model="query.tel" clearable type="text" :border="true" placeholder="请留下您的联系方式" />
					</u-form-item>
					<u-form-item label="留言" style="font-size: 30upx;">
						<u-input v-model="query.comment" clearable type="textarea" :border="true" :height="150" :maxlength="200" placeholder="简要留下您想要说的话~" />
					</u-form-item>
					
				</u-form>
			</view>
			<view class="foot_box x-bc pad">
				<button class="cu-btn post-btn" @tap="addFeedback">提交</button>
			</view>
		</view>
	</form>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data(){
			return {
				query:{
					comment: '', //描述
					name: '', //姓名
					tel:'', //电话
				},
			}
		},
		methods:{
			addFeedback() {
				let that = this;
				console.log(that.name,that.tel,that.comment)
				if(that.query.name === ''){
					this.$api.msg('姓名不能为空')
				}else if(that.query.tel === ''){
					this.$api.msg('联系方式不能为空')
				}else if(that.query.comment === ''){
					this.$api.msg('留言不能为空')
				}else{
					uniRequest({
						url : 'http://www.hfyt365.com/wx/contact/',
						method: 'POST',
						data:this.query,
					}).then(res => {
						console.log(res)
						if(res.data.success === true){
						   this.$api.msg(res.data.msg)
						   this.query = {}
						}
					}).catch(error => {
						console.log(error);
					})
				}
			},
			change(e) {
			  console.log('change', e);
			}
		}
	}
</script>

<style lang="less">
page{
	padding: 0px;
}
.page_box {
	padding: 0;
	position: relative;
}
.content_box{
	
}
.icon-jia2{
	font-size: 60upx;
	display: flex;
	justify-content: center;
	line-height: 140upx;
	color: #999;
}
.form-item {
	background-color: #fff;
	border-radius: 20upx;
	padding: 40upx;
	margin-bottom: 20upx;
	.inp-title {
		font-size: 32rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: #333;
	}
	.mb{
		margin-bottom: 40rpx
	}
	.mb1{
		margin-bottom: 20rpx
	}
	.inp { 
		height: 60rpx;
		background: #fff;
		border-bottom: 1px solid #ddd;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		margin-top: 20upx;
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
		font-size: 28rpx;
		font-family: PingFang SC;
		color: rgba(177, 179, 199, 1);
	}
}

.area-box {
	min-height: 206rpx;
	border-radius: 20rpx;
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
		padding: 10upx 30upx;
		border-radius: 20upx;
		border: 1px solid #ddd;
	}
	.img-box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.choose-img,
		.preview-box {
			width: 140rpx;
			height: 140rpx;
			background: #fff;
			border: 1rpx solid rgba(223, 223, 223, 1);
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
	display: flex;
	height: 80rpx;
	width: 100%;
	position: absolute;
	bottom: 100upx;
	.contact-btn {
		flex: 1;
		height: 70rpx;
		background:#1839ff;
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
	.post-btn {
		height: 80rpx;
		width: 590upx;
		background:#1839ff;
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
/deep/ .u-border-bottom:after{
	border-bottom: none;
}
/deep/ .u-form-item--left{
	align-items: left;
}
</style>