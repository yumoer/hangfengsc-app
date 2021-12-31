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
	  uni.showLoading({
	  	title: '请稍后'
	  })
	  await uniRequest({
	  	url:'/orders/track/recording/',
	  	method:'post',
	  	data:{
	  		sub_order_id:Number(options.order_id),
	  	},
	  	headers:{
	  		Authorization:'JWT '+uni.getStorageSync('userInfo').token
	  	},
	  }).then(res=>{
	  	console.log(res)
	  	if(res.status === 200){
	  		uni.hideLoading();
			this.tracesData = res.data.orderLogisticStatus
			console.log(this.tracesData)
			this.tracesData.forEach(ele=>{
				ele.acceptStation = ele.operateState
				ele.createTime = ele.operateTime
				ele.statusName = ele.username
			})
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
