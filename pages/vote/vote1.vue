<template>
	<view class="view">
		<view class="wrap">
			<view class="look">
				<view style="width: 300px;height: 60px;background: rgba(244,25,26,.3);font-weight: bold;line-height: 60px;border-radius: 20px;font-size: 18px;">
					<view style="width: 30%;height: 100%;display:inline-block;">
						<text>排名</text>
					</view>
					<view style="width: 40%;height: 100%;display:inline-block;">
						<text>员工</text>
					</view>
					
					<view style="width: 30%;height: 100%;display:inline-block;">
						<text>得票</text>
					</view>
				</view>
				<view class="line" v-for="(vote,index) in voteArr" style="height: 100%;font-size: 16px;padding: 10px 0;">
					<view style="width: 30%;height: 100%;display:inline-block;">
						<text style="">{{index+1}}</text>
					</view>
					<view style="width: 40%;height: 100%;display:inline-block;">
						<text style="">{{vote.by_voters}}</text>
					</view>
					<view style="width: 30%;height: 100%;display:inline-block;">
						<text style="">{{vote.by_voters__count}}票</text>
					</view>
				</view>
			</view>
		</view>
		<button class="btns" @click="loadData">刷新</button>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				activeId:NaN,// 活动ID
				openId:'', // 投票微信openId
				voteArr:[]
			}
		},
		async onLoad(option){
			console.log(option)
			this.openId = option.openId
			this.activeId = option.activeId
			this.loadData()
			let setInterValFunc = setInterval(() => { //定时器
				this.loadData()
				// clearInterval(setInterValFunc);
			}, 2000)
		},
		methods: {
			loadData(){
				uniRequest({
					url: '/wx/voting/record/?id='+this.activeId+'&open_id='+this.openId,
					method: 'GET',
				}).then(res=>{
					console.log(res)
					if(res.status === 200){
						this.voteArr = res.data
					}else if(res.status === 400){
						this.$api.msg(res.data.non_field_errors[0])
					}
				}).catch(error=>{
					console.log(error)
				})
			},
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		position: relative;
		background-color: #591cd0;
		
	}
	.view{
		width: 100%;
		height: 60%;
		background-image: url(../../static/vote/draw.png);
		background-size: 100% 100%;
		padding-top: 320px;
	}
	.wrap {
		width: 300px;
		height: auto;
		background-color: #fff;
		margin: 20px auto;
		border-radius: 20px;
		text-align: center;
	}
	.image{
		width: 60px;
		height: 60px;
		margin-left: 10px;
	}
	.first{
		margin: 10px 20px;
	}
	.look{
		font-size: 14px;
		color: #611B9F;
		margin-top: 10px;
		padding-bottom: 40px;
	}
	.line{
		font-weight: bold;
		height: auto;
	}
	.btns{
		width: 300px;
		color: #fff;
		background-color: #654CE6;
		position: fixed;
		left: 0;
		right: 0;
		bottom:20px;
		margin: auto;
		border-radius: 20px;
	}
</style>
