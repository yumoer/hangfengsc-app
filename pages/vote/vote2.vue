<template>
	<view>
		<view class="banner">
			<image style="width: 100%;height:200px ;" src="../../static/vote/vote2.jpg" mode=""></image>
		</view>
		<view class="voteitem">
			<view class="voteleft">
				<view class="questiontit">{{vote.title}}</view>
				<view class="questionbtm">
					<text class="role"><a>{{vote.nickname}}</a>发起</text>
					<text class="state">投票进行中</text>
				</view>
			</view>
			<view class="voteright">
				<text class="joinnums">{{vote.nums}}</text>
				<text class="jointxt">参与人数</text>
			</view>
		</view>
		<view class="ctitle" style="">投票选项(18选5)</view>
		
		<view style="margin: 20rpx 20rpx 0 20rpx;">
			<checkbox-group @change="checkboxChange">
				<label :class="item.selected?'skillbar active':'skillbar'" v-for="(item,index) in vote.vtList" :key="index">
					<view class="skillbar-title"><text>{{item.title}}</text></view>
					<view>
						<checkbox style="margin-left: -5px;" :class="item.selected?'skillbar-bar active':'skillbar-bar'" :value="item.title" :animation="animationData[index]"></checkbox>
					</view>
					<view class="skill-bar-percent">{{item.num}}票</view>
				</label>
			</checkbox-group>
		</view>
		
		<!-- <view style="margin: 20rpx 20rpx 0 20rpx;">
			<view :class="item.selected?'skillbar active':'skillbar'" v-for="(item,index) in vote.vtList" :key="index" @click="selectVote(item)">
				<view class="skillbar-title"><text>{{item.title}}</text></view>
				<view :class="item.selected?'skillbar-bar active':'skillbar-bar'" :animation="animationData[index]"></view>
				<view class="skill-bar-percent">{{item.num}}票</view>
			</view> 
		</view> -->
		
		<button class="btn" @click="voteBtn">确认投票</button>
	</view>
</template>
<script>
	export default {
	    data() {
	        return {
				animationData: [],
				selectArr:[],
				vote:{
					title:'老员工评选',
					nickname:'行丰银拓',
					nums:0,
					count:0,
					vtList:[
						{id:0,title:'神秘海域',num:0,percent:'0%',selected:false},
						{id:1,title:'地平线',num:0,percent:'0%',selected:false},
						{id:2,title:'蜘蛛侠',num:0,percent:'0%',selected:false},
						{id:3,title:'生还者',num:0,percent:'0%',selected:false},
						{id:4,title:'生还者d',num:0,percent:'0%',selected:false},
						{id:5,title:'生还者a',num:0,percent:'0%',selected:false},
						{id:6,title:'生还者w',num:0,percent:'0%',selected:false},
						{id:7,title:'生还者s',num:0,percent:'0%',selected:false},
						{id:8,title:'生还者2',num:0,percent:'0%',selected:false},
						{id:9,title:'生还者c',num:0,percent:'0%',selected:false},
						{id:10,title:'生还者x',num:0,percent:'0%',selected:false},
						{id:11,title:'生还者v',num:0,percent:'0%',selected:false},
						{id:12,title:'生还者b',num:0,percent:'0%',selected:false},
						{id:13,title:'生还者n',num:0,percent:'0%',selected:false},
						{id:14,title:'生还者m',num:0,percent:'0%',selected:false},
						{id:15,title:'生还者u',num:0,percent:'0%',selected:false}
					]
				}
	        }
	    },
		onLoad() {
			this.loadData();
		},
		methods: {
			loadData(){
				var animation = uni.createAnimation({
					duration: 1000
				});
				this.animation = animation;
				let vtList = this.vote.vtList;
				for(let i=0;i<vtList.length;i++){
					animation.width(vtList[i].percent).step();
					this.animationData[i] = animation.export();
				}
			},
			selectVote(item,index){
				this.selectArr.push(item)
				var selectArr = this.selectArr;
				this.count=0;
				for (var i = 0, lenI = selectArr.length; i < lenI; ++i) {
					const items = selectArr[i]
					if(items.id !== item.id){
						item.selected = true;
						this.count++
					}else{
						item.selected = false;
					}
				}
				item.selected = true;
				console.log(this.selectArr)
			},
			voteBtn(){
				if(this.count>5){
					uni.showToast({
					  title: '选择过多，最多选取五项',
					  icon: 'none'
					})
				}else if(this.count==0){
					uni.showToast({
					  title: '请选择至少一项！',
					  icon: 'none'
					})
				}else if(this.count==5){
					uni.showToast({
					  title: '投票成功！',
					  icon: 'none'
					})
				}else{
					uni.showToast({
					  title: '请选取五项！',
					  icon: 'none'
					})
				}
				
			},
			// 多选复选框改变事件
			checkboxChange(e){
				console.log(e)
				var items = this.vote.vtList;
				var	values = e.detail.value;
				console.log(values)
				this.count=0;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.title)){
						item.select = true
						this.count++
					}else{
						item.select = false
					}
				}
			},
			changeCheckbox(e){
				console.log(e)
				var items = this.vote.vtList;
				var	values = e.detail.value;
				console.log(values)
				this.count=0;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.title)){
						item.select = true
						this.count++
					}else{
						item.select = false
					}
				}
			}
		}
	}
</script>
<style>
	page{
		background-color: #53B4D7;
	}
	.banner{
		width: 100%;
		height: auto;
	}
	.voteitem{
		padding: 30rpx;
		background-color: #53B4D7;
		display: flex;
	}
	.ctitle{
		width:100%;
		height:40px;
		background-color: 
		#53B4D7;color:#fff;
		line-height: 40px;
		padding-left: 16px;
		font-size: 14px;
	}
	.skillbar {
	    position: relative;
	    display: block;
	    margin-bottom: 10px;
	    width: 100%;
	    background: #eee;
	    height: 35px;
	    border-radius: 3px;
	}
	
	.skillbar-title {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 150px;
	    font-weight: 700;
	    font-size: 13px;
	    color: #000;
	}
	
	.skillbar-title text {
	    display: block;
	    padding: 0 20px;
	    height: 35px;
	    line-height: 35px;
	}
	
	.skillbar-bar {
	    height: 35px;
	    width: 0px;
	    background: #cbcbcb;
	    border-radius: 3px;
	}
	
	.skill-bar-percent {
	    position: absolute;
	    right: 10px;
	    top: 0;
	    font-size: 11px;
	    height: 35px;
	    line-height: 35px;
	    color: #fff;
	    color: rgba(0,0,0,.4)
	}
	
	.voteleft{
		float: left;
		width: 80%;
		position: relative;
	}
	.voteright{
		float: right;
		width: 20%;
		text-align: center;
		background-color: #eee;
		padding: 20rpx 0;
		border-radius: 10rpx;
		position: relative;
		min-height: 60px;
	}
	.joinnums{
		display: block;
		font-size: 20px;
	}
	.jointxt{
		display: block;
		width: 100%;
		font-size: 10px;
		color: #435257;
		position: absolute;
		bottom: 20rpx;
		text-align: center;
	}
	.questiontit{
		font-size: 18px;
		margin-bottom: 48rpx;
	}
	.questionbtm{
		font-size: 12px;
		color: #b0b0b0;
		width: 100%;
		bottom: 16rpx;
		display: inline-block;
		position: absolute;
	}
	.role{
		margin-right: 10rpx;
	}
	.role a{
		color: #006EFF;
	}
	
	.active{
		background-color: #39D754;
	}
	.btn{
		margin: 40px;
		width: 80%;
		color: #fff;
		background-color: #39D754;
	}
</style>