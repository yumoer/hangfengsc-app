<template>
	<view class="_showModal" v-show="show">
			<view class="_shade"></view>
			<view class="_modalBox">
				<view class="_modal">
					<slot name="title">
						<view class="title" v-show="title">{{title}}</view>
					</slot>
					<slot name="content">
						<view class="content">{{content}}</view>
					</slot>
					<slot name="btn">
						<view class="btnbox">
							<view class="btn cancel" @click.stop="clickBtn('cancel')">{{cancelText}}</view>
							<view class="btn confirm" @click.stop="clickBtn('confirm')">{{confirmText}}</view>
						</view>
					</slot>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		name:"show-modal",
		computed: {
				show(){
					return this.$modalStore.state.show;
				},
				title(){
					return this.$modalStore.state.title;
				},
				content(){
					return this.$modalStore.state.content;
				},
				showCancel(){
					return this.$modalStore.state.showCancel;
				},
				cancelText(){
					return this.$modalStore.state.cancelText;
				},
				cancelColor(){
					return "color:"+this.$modalStore.state.cancelColor;
				},
				confirmText(){
					return this.$modalStore.state.confirmText;
				},
				confirmColor(){
					return "color:"+this.$modalStore.state.confirmColor;
				}
		},
		methods:{
			closeModal(){
				this.$modalStore.commit('hideModal')
			},
			clickBtn(res){
				this.$modalStore.commit('hideModal')
				this.$modalStore.commit('success',res)
			}
		},
		beforeDestroy(){
			this.$modalStore.commit('hideModal')
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
._showModal{
		position: fixed;
		top: 0;
		left:0;
		width: 100%;
		height: 100%;
		z-index:10000;
		._shade{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: #000;
			opacity: .6;
			z-index:11000;
		}
		._modalBox{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index:12000;
			display: flex;
			justify-content: center;
			align-items: center;
			._modal{
				flex: none;
				width:80%;
				min-height:170px;
				background: #fff;
				border-radius: 10px;
				.title{
					text-align: center;
					font-size: 18px;
					width: 100%;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #333333;
					margin-top: 20px;
					display: block;
				}
				.content{
					min-height: 40px;
					width: 80%;
					margin:20px auto;
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #666;
					background: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
				}
				.btnbox{
					display: flex;
					width: 88%;
					margin: auto;
					margin-bottom: 20px;
					flex-direction: row;
					justify-content: space-between;
					.btn{
						width: 100px;
						height: 35px;
						border-radius: 16px;
						
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.cancel{
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #999;
						border:1px solid #999;
						border-radius: 20px;
					}
					.confirm{
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFEFA;
						background:linear-gradient(to right,#EE1D23,#F04023);
					}
				}
			}
		}
		
}
</style>