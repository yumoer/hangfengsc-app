<template>
	<view class="view" style="width: 100%;">
		<view class="wrap">
			<view class="oleft">
				当前票数：<text class="num">{{count}}</text>票
			</view>
			<view class="oright">
				<text class="explain" @click="explain">活动说明</text>
			</view>
			<view class="vote" v-for="(vote,index) in voteArr" :key="index">
				<view class="left">
					<text class="storey">{{index+1}}层</text>
				</view>
				<view class="right">
					<text class="top">{{vote.name}}</text>
					<button v-if="vote.status === false" class="btn" @click="voteBtn(vote)">投票</button>
					<button v-else class="btn">已投票</button>
				</view>
			</view>
		</view>
		
		<button class="btns" @click="lookVote">投票排名</button>
	</view>
</template>

<script>
	import uniRequest from 'uni-request'
	export default {
		data() {
			return {
				activeId:1, // 活动ID
				openId:'', // 投票微信openId
				by_voters:'', //投票名称
				count:0,
				voteArr: []
			}
		},
		async onLoad(option){
			console.log(option)
			this.openId = option.openId
			this.activeId = option.active_id
			this.loadData()
		},
		methods: {
			loadData(){
				uniRequest({
					url: '/wx/voting/active/'+this.activeId+'/'+this.openId+'/',
					method: 'get',
				}).then(res=>{
					console.log(res.data)
					if(res.status === 200){
						this.voteArr = res.data.data
						this.count = res.data.poll
					}else if(res.status === 400){
						this.$api.msg(res.data.voters[0])
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			voteBtn(vote){
				console.log(vote.name)
				uniRequest({
					url: '/wx/voting/record/',
					method: 'POST',
					data:{
						voters:this.openId,
						active:this.activeId,
						by_voters:vote.name
					}
				}).then(res=>{
					console.log(res)
					if(res.status === 201){
						this.$api.msg('投票成功')
						// this.count = res.data.num
						this.loadData()
					}else if(res.status === 400){
						this.$api.msg(res.data.non_field_errors[0])
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			lookVote(){
				console.log('111')
				if(this.count > 0){
					this.$api.msg('请投完票数在进行查看')
				}else{
					uni.navigateTo({
						url:'/pages/vote/votes?openId='+this.openId+'&activeId='+this.activeId
					})
				}
			},
			explain(){
				this.$api.msg(`请投给最有贡献的老员工 单人限五票不能重复`)
			}
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
		background-image: url(../../static/vote/vote10_bg.png);
		background-size: 100% 100%;
		padding-top: 320px;
	}
	
	.wrap {
		width: 300px;
		height: auto;
		padding-left: 20px;
		background-color: #fff;
		margin: 20px auto;
		border-radius: 20px;
		padding-bottom: 40px;
	}
	.oleft{
		padding: 10px;
		float: left;
		margin-right: 10px;
		display: inline-block;
	}
	.num{
		color: #591cd0;
		font-weight: bold;
		padding: 0 5px;
	}
	.oright{
		padding: 10px;
		margin-right: 15px;
		float: right;
		display: inline-block;
	}
	.explain{
		color: #591cd0;
		font-weight: bold;
	}
	.vote{
		width: 100%;
		text-align: center;
		display: inline-block;
	}
	.left{
		width: 80px;
		height: 70px;
		display: inline-block;
		float: left;
	}
	.storey{
		font-size: 16px;
		font-weight: bold;
		color:#591cd0;
		line-height: 70px;
	}
	.right{
		width: 180px;
		float: left;
	}
	.top{
		font-size: 18px;
		font-weight: bold;
		color: #673AB7;
		line-height: 70px;
		margin-left: -20px;
	}
	.btn{
		width: 80px;
		float: right;
		background-color: #CE93D8;
		color: #fff;
		display: inline-block;
		margin-top: 15px;
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
