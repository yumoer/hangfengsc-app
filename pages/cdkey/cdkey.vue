<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">CDKEY<view class="welcome">
				卡券查询
			</view></view>
			
			<view class="input-content">
				<view class="input-item">
					<text class="tit">卡号</text>
					<input 
						:value="card_number" 
						placeholder="请输入卡号"
						maxlength="12"
						data-key="card_number"
						@input="inputChange"
					/>
				</view>
				
				<view class="input-item">
					<text class="tit">卡密</text>
					<input 
						type="password" 
						:value="card_paw" 
						placeholder="请输入卡密"
						placeholder-class="input-empty"
						maxlength="8"
						password 
						data-key="card_paw"
						@input="inputChange"
					/>
				</view>
				
				<view class="input-item" style="position: relative;">
					<text class="tit">验证码</text>
					<input 
						:value="image_code" 
						placeholder="请输入验证码"
						placeholder-class="input-empty"
						maxlength="4"
						data-key="image_code"
						@input="inputChange"
					/>
					<view style="position: absolute;right: 0;top: 20upx;" @click="generate_image_code">
						<image style="width: 100px;height: 35px;" :src="image_code_url" mode=""></image>
					</view>
				</view>
				
				
			</view>
		</view>
		<button class="confirm-btn" @click="toExchange">查询</button>
		
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	
	import uniRequest from 'uni-request';
	export default{
		data(){
			return {
				card_number:'',
				card_paw: '',
				image_code:'',
				image_code_id: '', // uuid
				image_code_url:'', // 访问后端视图的地址，得到image
				getText:'',
				open_id:''
			}
		},
		onLoad(options){
			console.log(options.open_id)
			this.open_id = options.open_id
			this.generate_image_code()
		},
		
		activated() {
			this.generate_image_code()
		},
		
		methods: {
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();  
			},
			
			// 生成一个验证码的编号，并设置页面中验证码img标签的src属性
			async generate_image_code(){
				uni.setStorage({
					key: 'flag',
					data: '1'
				});
				// 生成一个编号
				// 严格一点的使用uuid保证编号唯一， 不是很严谨的情况下，也可以使用时间戳
				this.image_code_id = this.generate_uuid();
				
				console.log(this.image_code_id)
				
				
				
				// 设置页面中验证码img标签的src属性
				this.image_code_url = "http://47.94.106.106:8000/image/codes/exchange/?open_id="+this.open_id+'&id='+this.image_code_id
				console.log(this.image_code_url)
			},
			
			// 生成uuid
			generate_uuid(){
				// #ifdef H5
				var d = new Date().getTime();
				d += performance.now();
				// #endif
				// #ifdef APP-PLUS
				var d = new Date().getTime();
				d += Date.now();
				// #endif
				console.log(d)
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				  var r = (d + Math.random()*16)%16 | 0;
				  d = Math.floor(d/16);
				  return (c =='x' ? r : (r&0x3|0x8)).toString(16);
				});
				return uuid;
			},  
			
			async toExchange(){
				
				// 用户名验证
				if(!this.card_number){
					this.$api.msg('请输入卡号');
					return
				}
				
				// 密码验证
				if(!this.card_paw){
					this.$api.msg('请输入卡密');
					return
				}
				
				// 验证码验证
				console.log(this.image_code,this.getText)
				if(!this.image_code){ 
					this.$api.msg('请输入验证码');
					return
				}
				
				const sendData = {
					card_number:this.card_number,
					card_paw:this.card_paw,
					image_code:this.image_code,
					open_id:this.open_id
				};
				uniRequest.post('/goods/exchange/info/',sendData).then(res=>{
					console.log(res)
					if(res.status === 200){  
						console.log(res.data)
						if(res.data.exchange_user === undefined){
							uni.navigateTo({
								url:'/pages/cdkey/cdkeyOrder?data='+JSON.stringify(res.data)
							})
						}else{
							uni.navigateTo({
								url:'/pages/cdkey/cdkeyDetail?exchange_user='+res.data.exchange_user
							})
						}
						
						uni.setStorage({
							key: 'card_number',
							data: this.card_number
						});
						uni.setStorage({
							key: 'card_paw',
							data: this.card_paw
						});
						uni.setStorage({
							key: 'open_id',
							data: this.open_id
						});
					}
					if(res.status === 400){
						this.$api.msg(res.data.message)
					}
				}).catch(error=>{
					console.log(error)
				})
			},
		},
	}
</script>

<style lang='scss'>
	uni-radio .uni-radio-input{
		width: 14px;
		height: 14px;
	}
	
	page{
		background: #fff;
	}
	.container{
		padding-top: 35px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
		/* margin-top: 40px; */
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
		margin-top: -20px;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 100upx;
		border-radius: 4px;
		margin-bottom: 20upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 40upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	
	.otherLogin {
		width: 500upx;
		height: 95upx;
		margin: 80upx auto;
		display: flex;
		justify-content: space-around;
	}
	
	.otherLogin>view {
		width: 95upx;
		height: 95upx;
		background: #fff;
		border-radius: 95upx;
	}
	
	.otherLoginTitle {
		width: 100%;
		margin-top: 40upx;
		text-align: center;
		color: #555555;
		font-size: 28upx;
		line-height: 80upx;
	}
</style>
