<template>
	<view class="conbox">
		<view class="container">
			<!-- 背景 -->
			<image src="/static/img/bg.png" class="cont" mode=""></image>
			<image src="/static/img/caidai.png" class="caidai" mode=""></image>
			<image src="/static/img/title_logo.png" class="title-logo" mode=""></image>
			<view class="main">
				<view class="canvas-container">

					<view :animation="animationData" class="canvas-content" id="zhuanpano" style="">
					<!-- <view :animation="animationData" class="canvas-content" id="zhuanpano"  :style="[{transform:'rotate('+runDeg+')'}]"> -->
						<!-- <canvas class="canvas" canvas-id="canvas"></canvas> -->

						<view class="canvas-list">
							<view class="canvas-item" :style="[{zIndex:index2}]" v-for="(iteml,index2) in awardsList" :key="index2">
								<view class="canvas-item-text" :style="[{transform:'rotate('+iteml.turn+')'}]">
									<text>{{iteml.award}}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 抽奖按钮 -->
					<view @tap="playReward" class="canvas-btn" :class="btnDisabled">
						<image class="canvas-btn-pic" src="/static/img/Group%206@2x.png"></image>
					</view>
				</view>
			</view>
			<view class="winning-list">
				<view class="winning-list-title">
					中奖名单
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				awardsConfig: {
					lists: [
						{
							"id": 4,
							"type": 1,        //1积分  2经验   3现金
							"name": "积分1点",        //名称
							"amount": "1.00",        //数额
							"scale": "0.60",        //中奖比例
							"createtime": 1553651469
						},
						{
							"id": 5,
							"type": 1,        //1积分  2经验   3现金
							"name": "积分2点",        //名称
							"amount": "1.00",        //数额
							"scale": "0.60",        //中奖比例
							"createtime": 1553651469
						},
						{
							"id": 6,
							"type": 1,        //1积分  2经验   3现金
							"name": "积分1点",        //名称
							"amount": "1.00",        //数额
							"scale": "0.60",        //中奖比例
							"createtime": 1553651469
						},
					], //奖品列表 
				},
				awardsList: {},		//奖品列表
				animationData: {},	//动画数据
				btnDisabled: '',	//按钮是否禁用
				thanksarr: [], //存储谢谢参与的索引
				chance: 0,		//次数
			}
		},
		onLoad() {
			// 获取奖品列表
			this.initdata(this)
		},
		onReady(e) {

		},
		methods: {
			// 初始化抽奖数据
			initdata(that){
				// this.$api.initLuckyDraw({
				// 	cmd: {},
				// 	data: {}
				// }).then(res=>{
				// 	if(res.code === 200) {
						// 设置data及次数
						// that.awardsConfig = res.data
						// that.chance = res.data.luckdraw;
						that.chance = 9;
						// 获取奖品的个数
						let awarrlength = that.awardsConfig.lists.length
						// push 谢谢参与奖项
						for (let i = 0; i <= 15-(awarrlength*3); i++) {
							if (i % 3 == 0) {
								console.log(i,"iiii");
								that.thanksarr.push(i)
								that.awardsConfig.lists.splice(i, 0, {
									name: '谢谢参与',
									type: 0
								});
							}
						}
						// 为每一项追加index属性
						that.awardsConfig.lists.forEach(function(element, index) {
							element.index = index
						})
										
						// 画转盘
						that.drawAwardRoundel();
					// }
				// })
			},
			//画抽奖圆盘  
			drawAwardRoundel() {
				// 拿到奖品列表
				let awards = this.awardsConfig.lists;
				let awardsList = [];
				// 每份奖品所占角度
				let turnNum = 1 / awards.length * 360; // 文字旋转 turn 值  
				// 奖项列表  
				for (let i = 0; i < awards.length; i++) {
					awardsList.push({
						turn: i * turnNum + 'deg', //每个奖品块旋转的角度
						lineTurn: i * turnNum + turnNum / 2 + 'deg', //奖品分割线的旋转角度
						award: awards[i].name, //奖品的名字,
						type: awards[i].type,
						id:awards[i].type,
					});
				}
				this.btnDisabled = this.chance ? '' : 'disabled';
				this.awardsList = awardsList;
			},
			//发起抽奖  
			playReward() {
				let that = this
				
				// that.runDeg = 60*Math.random()
				if (this.chance == 0) {
					uni.showToast({
						title: '抽奖次数已经用完',
						icon: 'none'
					})
					return
				}
				// 中奖假数据
				let data = {
					"id": 4,
					"user_id": 3,
					"name": "积分2点",   //标题
					"number": 2,        //数额
					"type": 1,            //1积分  2经验   3现金
					"createtime": 1553652319,
				};
				// 抽奖接口
				// this.$api.startLuckyDraw({
				// 	cmd: {},
				// 	data: {}
				// }).then(res=>{
				// 	if(res.code === 200) {
						// let data = res.data;
						let awardIndex = 0;	//中奖index，0为谢谢参与
						that.awardsList.forEach((element, index)=>{
							if (element.award == data.name) {
								awardIndex = index
							}
						})
						
						//设置旋转时长及周数
						let awardsNum = that.awardsConfig.lists;
						let runNum = 4; //旋转8周  
						let duration = 4000; //时长  
					
						// 旋转角度  
						that.runDeg = that.runDeg || 0;
						let preDeg = that.runDeg;
						that.runDeg = that.runDeg + (360 - that.runDeg % 360) + (360 * runNum - awardIndex * (360 / awardsNum.length)) +1;
						
						//创建动画  
						if(process.env.VUE_APP_PLATFORM == 'h5'){
							// document.styleSheets[0]
							document.getElementById('zhuanpano').style='animation:rotate_before 4s 0ms ease forwards;'
							if(document.styleSheets[0].cssRules.length>0){
								Array.from(document.styleSheets[0].cssRules).forEach(function(element,index){
									if(element.name == 'rotate_before'){
										// 删除上次插入的动画
										document.styleSheets[0].deleteRule(index)
									}
								})
							}
							
							// 插入定义的动画
							document.styleSheets[0].insertRule("@keyframes rotate_before{from{ transform: rotate("+preDeg+"deg); }to{ transform: rotate("+that.runDeg+"deg);}}",8);
							
						}else{
							let animationRun = uni.createAnimation({
								duration: duration,
								timingFunction: 'ease'
							})
							animationRun.rotate(that.runDeg).step();
							that.animationData = animationRun.export();
						}
						that.btnDisabled = 'disabled';

						// 中奖提示  
						let awardsConfig = that.awardsConfig;
						let awardType = awardsConfig.lists[awardIndex].type;
						that.chance = that.chance - 1;
						if (awardType != 0) {
							setTimeout(()=>{
								uni.showModal({
									title: '恭喜',
									content: '获得' + (awardsConfig.lists[awardIndex].name),
									showCancel: false,
									success:function(){
										// 置空style  否则动画不生效
										// setTimeout(function(){
										document.getElementById('zhuanpano').style=''
										// },1000)
									}
								});
								that.btnDisabled = '';
							}, duration);
						} else {
							setTimeout(()=>{
								uni.showModal({
									title: '很遗憾',
									content: '没中奖 ' + (awardsConfig.lists[awardIndex].name),
									showCancel: false,
									success:function(){
										// 置空style  否则动画不生效
										document.getElementById('zhuanpano').style=''
									}
								});
								that.btnDisabled = '';
							}, duration);
						}
				// 	}
				// })

			},

		}

	}
</script>
<style scoped lang="scss">
	.conbox {
		width: 750upx;
		flex: 1;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.container {
		width: 100%;
		height: 100%;
		padding-top: 194upx;
		padding-bottom: 28upx;
		align-items: center;
		position: relative;
		background: #EA3837;
	}

	image.cont {
		width: 100%;
		height: 554upx;
		position: absolute;
		top: 0;
		z-index: 0;
	}

	image.caidai {
		position: absolute;
		top: 0;
		left: 0;
		width: 750upx;
		height: 1024upx;
	}
	
	image.title-logo {
		position: absolute;
		top: 78upx;
		left: 32upx;
		width: 468upx;
		height: 178upx;
	}

	/* 转盘 */
	.canvas-container {
		margin: 0 auto;
		position: relative;
		width: 544upx;
		height: 544upx;
		// background: url(../../static/img/circle.png) no-repeat;
		border-radius: 50%;
	}

	.canvas {
		width: 100%;
		height: 100%;
		display: block !important;
		border-radius: 50%;
	}

	.canvas-content {
		background: url(../../static/img/circle.png) no-repeat;
		background-size: cover;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		display: block;
		width: 544upx;
		height: 544upx;
		border-radius: inherit;
		/* background-clip: padding-box; */
		/* background-color: #ffcb3f; */
	}

	.canvas-element {
		position: relative;
		z-index: 1;
		width: inherit;
		height: inherit;
		border-radius: 50%;
	}

	.canvas-list {
		position: absolute;
		left: 0;
		top: 0;
		width: inherit;
		height: inherit;
		z-index: 9999;
	}

	.canvas-item {
		position: absolute;
		left: 0;
		top: -28upx;
		width: 100%;
		height: 100%;
		color: #e4370e;
		/* text-shadow: 0 1upx 1upx rgba(255, 255, 255, 0.6); */
	}

	.canvas-item-text {
		position: relative;
		display: block;
		padding-top: 124upx;
		margin: 0 auto;
		text-align: center;
		-webkit-transform-origin: 50% 300upx;
		transform-origin: 50% 300upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #724700;
	}

	.canvas-item-text text {
		font-size: 28upx;
	}

	.canvas-litem {
		position: absolute;
		left: 270upx;
		top: -30upx;
		width: 3upx;
		height: 300upx;
		background-color: rgba(228, 55, 14, 0.4);
		overflow: hidden;
		-webkit-transform-origin: 50% 300upx;
		transform-origin: 50% 300upx;
	}

	/**  
* 抽奖按钮  
*/
	.canvas-btn {
		position: absolute;
		display: block;
		border-radius: 50%;
		overflow: hidden;
		left: 208upx;
		top: 182upx;
		z-index: 400;
		width: 126upx;
		height: 154upx;
		.canvas-btn-pic{
			width: 100%;
			height: 100%;
		}
	}

	.canvas-btn.disabled {
		pointer-events: none;
		color: #ccc;
	}

	.canvas-btn-table {
		color: #A83FDB;
		width: 120upx;
		text-align: center;
		position: absolute;
		left: 240upx;
		top: 360upx;
		font-size: 26upx;
		background-color: #FFFFFF;
		opacity: 0.9;
	}
	
	// 中奖名单
	.winning-list{
		position: relative;
		width: 690upx;
		margin-top: 48upx;
		height: 476upx;
		z-index: 20;
		background:rgba(246,243,221,1);
		border-radius: 10upx;
		&-title{
			position: absolute;
			top: -30upx;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 400upx;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			color: white;
			height: 60upx;
			background:rgba(255,125,0,1);
			border-radius: 42upx;
		}
	}
</style>
