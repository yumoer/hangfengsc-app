<template>
	<view>
		<view class="notice-item">
			<view class="content">
				<text class="title">{{notice.name}}</text>
				<view class="tit">
					<text class="t1" v-if="notice.author_name">作者：{{notice.author_name}}</text>
					<text class="t2" v-if="notice.create_time">时间：{{createTime}}</text>
				</view>
				
				<rich-text style="width: 100%;" :nodes="notice.content | formatRichText"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				notice:{}
			}
		},
		computed:{
			createTime(){
				return this.notice.create_time.split('T')[0] + ' ' + this.notice.create_time.split('T')[1].split('.')[0]
			}
		},
		onLoad(option){
			console.log(option)
			uniRequest({
				url:'/announcement/get/'+option.id,
				method:'get'
			}).then(res=>{
				console.log(res)
				this.notice = res.data
			}).catch(error=>{
				console.log(error)
			})
		},
		filters: {
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText (html) { //控制小程序中图片大小
				if(html !== undefined){
					let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});
					newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
						return match;
					});
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
					return newContent;
				}
			}	
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	page {
		/* background-color: #f7f7f7; */
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content {
		width: 710upx;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
		font-weight: bold;
		justify-content: center;
		text-align: center;
	}
	
	.tit{
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 28upx;
		color: #303133;
		justify-content: center;
		.t2{
			margin-left: 20upx;
		}
	}

</style>
