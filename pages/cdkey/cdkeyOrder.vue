<template>
	<view class="view" >
		<view class="">
			<view class="cdkey" style="width: 100%;padding: 0 10px;line-height: 24px;background-color: #fff;padding-top: 20px;">
				<!-- #ifdef APP-PLUS -->
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;font-size: 14px;">
					<text style="float: left;">订单号</text>
					<text style="float: right;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: block;width: 280px;font-size: 14px;color: #0066CC;" @click="copy(Addressdata.order_id)">{{Addressdata.order_id}}</text>
				</view>
				<!-- #endif -->
				
				<!-- #ifdef H5 -->
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;font-size: 14px;">
					<text style="float: left;">订单号</text>
					<text style="float: right;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: block;font-size: 14px;max-width: 280px;color: #0066CC;" v-clipboard:copy="Addressdata.order_id" v-clipboard:success="(type) => onCopyResult('success')" v-clipboard:error="(type) => onCopyResult('error')">{{Addressdata.order_id}}</text>
				</view>
				<!-- #endif -->
				
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">订单状态</text>
					<text style="float: right;" v-if="Addressdata.status === 1">已兑换</text>
					<text style="float: right;" v-if="Addressdata.status === 2">待发货</text>
					<text style="float: right;" v-if="Addressdata.status === 3">待收货</text>
					<text style="float: right;" v-if="Addressdata.status === 4">待评价</text>
					<text style="float: right;" v-if="Addressdata.status === 5">已完成</text>
					<text style="float: right;" v-if="Addressdata.status === 6">已取消</text>
				</view>
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">姓名</text>
					<text style="float: right;">{{Addressdata.name}}</text>
				</view>
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">手机号</text>
					<text style="float: right;">{{Addressdata.mobile}}</text>
				</view>
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">地址</text>
					<text style="float: right;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: block;font-size: 14px;max-width: 320px;">{{Addressdata.address}}</text>
				</view>
				
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;" v-if="Addressdata.company !== null">
					<text style="float: left;">快递公司</text>
					<text style="float: right;">{{Addressdata.company}}</text>
				</view>
				
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;" v-if="Addressdata.com_no !== null">
					<text style="float: left;">快递单号</text>
					<text style="float: right;">{{Addressdata.com_no}}</text>
				</view>
				
				<view style="width: 100%;line-height: 24px;border-bottom: #ddd 1px solid;height: 30px;margin-top: 20px;font-size: 14px;" v-if="Addressdata.remark !== null">
					<text style="float: left;">备注</text>
					<text style="float: right;">{{Addressdata.remark}}</text>
				</view>
				
				<view style="width: 100%;line-height: 24px;height: 30px;margin-top: 20px;font-size: 14px;">
					<text style="float: left;">物流信息</text>
					<text style="float: right;color: red;">暂不支持查询</text>
				</view> 
				
				<!-- <block v-for="(item, index) in tracesData" :key="index">
				  <trackNode :is-first="index===tracesData.length-1" :is-newest="index===0" :is-main-node="item.isMainNode" :node-data="item"></trackNode>
				</block> -->
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import trackNode from '@/components/trackNode.vue'
	export default{
		data(){
			return {
				Addressdata:{},
				tracesData: []
			}
		},
		components: {
		  trackNode
		},
		onLoad(options){
			console.log(options)
			this.exchange_user = options.exchange_user
			this.card_number = uni.getStorageSync('card_number')
			if(this.exchange_user === undefined){
				this.showHide = false
				this.Addressdata = JSON.parse(options.data)
			}
			/* uniRequest.get('/orders/exchange/Logistics/'+this.Addressdata.order_id+'/').then(res=>{
				console.log(res.data)
				
				if(res.status === 200 || res.data.success === true){  
					res.data.track.forEach(ele=>{
						ele.acceptStation = ele.AcceptStation
						ele.createTime = ele.AcceptTime
					})
					this.tracesData = res.data.track.reverse()
					console.log(this.tracesData)
				}
				
				if(res.status === 200 || res.data.success === false){
					this.$api.msg(res.data.msg)
				}
			}).catch(error=>{
				console.log(error)
			}) */
		},
		
		methods: {
			/* // 物流信息
			async lookViewOrder(item){
				uniRequest.get('/orders/exchange/Logistics/'+item.order_id+'/').then(res=>{
					console.log(res.data)
					
					if(res.status === 200 || res.data.success === true){  
						res.data.track.forEach(ele=>{
							ele.acceptStation = ele.AcceptStation
							ele.createTime = ele.AcceptTime
						})
						this.tracesData = res.data.track.reverse()
						console.log(this.tracesData)
					}
					
					if(res.status === 200 || res.data.success === false){
						this.$api.msg(res.data.msg)
					}
				}).catch(error=>{
					console.log(error)
				})
			}, */
			onCopyResult(type){
				if (type==='success') {
					uni.showToast({
						title: '复制成功',
						icon: "none",
						duration: 1000
					})
				} else {
					uni.showToast({
						title: '复制失败',
						icon: "none",
						duration: 1000
					})
				}
			},

			copy(value){
			  //提示模板
			  uni.showModal({
			    content:value,//模板中提示的内容
			    confirmText:'复制内容',
			    success:()=>{//点击复制内容的后调函数
			      //uni.setClipboardData方法就是讲内容复制到粘贴板
			      uni.setClipboardData({
			        data:value,//要被复制的内容
			        success:()=>{//复制成功的回调函数
			          uni.showToast({//提示
			            title:'复制成功',
						icon: "none",
						duration: 1000
			          })
			        },
			      });
			    }
			  });
			}
		},
	
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		// margin: 20upx;
		background-color: #ddd;
	}
	.total-wrap {
	  height: auto;
	  box-sizing: border-box;
	  padding: 20rpx;
	  background: #fff;
	  .logistics-title {
	    height: 72rpx;
	    box-sizing: border-box;
	    padding: 36rpx 0 8rpx;
	    line-height: 28rpx;
	    color: #4B4B4B;
	    font-size: 26rpx;
	    font-family: 'PingFangSC-Medium';
	    text-align: left;
	  }
	}
</style>
