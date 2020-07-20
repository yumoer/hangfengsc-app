<template>
  <div class="total-wrap">
    <block v-for="(item, index) in tracesData" :key="index">
      <trackNode :is-first="index===tracesData.length-1" :is-newest="index===0" :is-main-node="item.isMainNode" :node-data="item"></trackNode>
    </block>
  </div>
</template>

<script>
import trackNode from '@/components/trackNode.vue'
import uniRequest from 'uni-request';
export default {
  components: {
    trackNode
  },
  data () {
    return {
      tracesData: []
    }
  },
  async onLoad(options){
	  console.log(options.order_id)
	  uni.showLoading({
	  	title: '请稍后'
	  })
	  const response = await uniRequest({
	  	url:'/yangcai/order/track/',
	  	method:'post',
	  	data:{
	  		order_id:options.order_id,
	  		accessToken:'JWT ' + uni.getStorageSync('userInfo').token
	  	},
	  	headers:{
	  		Authorization:'JWT '+uni.getStorageSync('userInfo').token
	  	},
	  }).then(res=>{
	  	console.log(res)
	  	if(res.status === 200){
	  		uni.hideLoading();
			console.log(this.tracesData)
			console.log(res.data.orderLogisticStatus)
			this.tracesData = res.data.orderLogisticStatus.reverse()
			/* res.data.orderLogisticStatus.forEach(ele=>{
				ele.operateState
			}) */
			
	  	}
	  	
	  }).catch(error=>{
	  	
	  })
  },
  
}
</script>

<style lang="scss" scoped>
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
