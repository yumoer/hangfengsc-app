<template>
	<view id="">
		<view class="">
			<uni-collapse style="font-weight: bold;font-size: 36upx;">
			    <uni-collapse-item :open="true" :disabled="true" :title="bg_pic.title" v-for="(bg_pic,index) in bg_pics" :key="index">
			        <view style="padding: 40upx;">
			            <image style="width: 100%;height: 400upx;" :src="bg_pic.src"></image>
						<text v-for="(text,ind) in bg_pic.msg" :key="ind"  style="font-size: 14px;line-height:24px;margin-right: 20px;color: #969799;" @click="goto(text.name,index)">{{text.name}}</text>
			        </view>
			    </uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {uniCollapse,uniCollapseItem},
		data() {
			return {
				bg_pics:[
				  {src:'../../../../static/scene_purchase/bg01.jpg',title:'公共办公区',id:'1',msg:[
					  {name:'饮水机'},
					  {name:'打印纸'},
					  {name:'硒鼓'},
					  {name:'打印机'},
					  {name:'台灯'},
					  {name:'水杯'},
					  {name:'垃圾桶'},
					  {name:'碎纸机'},
					  {name:'电脑'},
					  {name:'椅子'},
					  {name:'显示器'},
					  {name:'电话'},
					  {name:'笔',},
					  {name:'插排'},
					  {name:'键盘'},
					  {name:'鼠标'},
					  {name:'文件夹'},
					  {name:'文件框'},
					  {name:'计算器'},
					  {name:'胶带'},
					  {name:'空气净化器'},
					  {name:'底柜'},
					]},
				  {src:'../../../../static/scene_purchase/bg02.jpg',title:'财务办公区',id:'2',msg:[
					  {name:'切纸机'},
					  {name:'电脑'},
					  {name:'键盘'},
					  {name:'鼠标'},
					  {name:'记账本'},
					  {name:'印泥'},
					  {name:'点钞机'},
					  {name:'碎纸机'},
					  {name:'胶棒'},
					  {name:'装订机'},
					  {name:'液晶显示器'},
					  {name:'计算器'},
					  {name:'发票打印机'},
					  {name:'支票打印机'},
					  {name:'三联打印纸'},
					  {name:'传真机'},
					  {name:'保险柜'},
					  {name:'一体机'},
					  {name:'净化器'},
					  {name:'文件柜'},
					  {name:'文件盒'},
					  {name:'办公椅'},
					]},
				  {src:'../../../../static/scene_purchase/bg03.jpg',title:'前台接待区',id:'3',msg:[
					  {name:'胶垫'},
					  {name:'台签'},
					  {name:'加湿器'},
					  {name:'图钉'},
					  {name:'大头钉'},
					  {name:'工型钉'},
					  {name:'回型针'},
					  {name:'A4打印纸'},
					  {name:'A5打印纸'},
					  {name:'记事本'},
					  {name:'铅笔'},
					  {name:'文件框'},
					  {name:'剪刀'},
					  {name:'刀片'},
					  {name:'签字笔'},
					  {name:'笔筒'},
					  {name:'燕尾夹'},
					  {name:'便利贴'},
					  {name:'无线电话'},
					  {name:'鼠标垫'},
					  {name:'便签纸'},
					  {name:'钉书机'},
					  {name:'电话'},
					  {name:'名片架'},
					  {name:'闹钟'},
					  {name:'纸杯'},
					  {name:'对讲机'},
					  {name:'考勤机'},
					  {name:'办公桌'},
					]},
				  {src:'../../../../static/scene_purchase/bg04.jpg',title:'会议室',id:'4',msg:[
					  {name:'电视机'},
					  {name:'音响'},
					  {name:'投影仪'},
					  {name:'抽纸'},
					  {name:'真皮椅'},
					  {name:'矿泉水'},
					  {name:'烟灰缸'},
					  {name:'激光笔'},
					  {name:'白板笔'},
					  {name:'白板'},
					]},
				  {src:'../../../../static/scene_purchase/bg05.jpg',title:'茶水间',id:'5',msg:[
					  {name:'榨汁机'},
					  {name:'保温杯'},
					  {name:'豆浆机'},
					  {name:'电冰箱'},
					  {name:'卫生纸'},
					  {name:'饮料机'},
					  {name:'洗手液'},
					  {name:'料理机'},
					  {name:'微波炉'},
					  {name:'净水壶'},
					  {name:'热水壶'},
					  {name:'饮水机'},
					  {name:'咖啡机'},
					]},
				  {src:'../../../../static/scene_purchase/bg06.jpg',title:'总经理室',id:'6',msg:[
					  {name:'保险箱'},
					  {name:'吸尘器'},
					  {name:'扫地机器人'},
					  {name:'老板椅'},
					  {name:'红酒'},
					  {name:'苹果电脑'},
					  {name:'空调'},
					  {name:'空气净化器'},
					  {name:'沙发'},
					]}
				],
			};
		},
		methods:{
			goto(name,index){
				console.log(name,index)
				uni.navigateTo({
					url:'/pages/search/searchList?value='+name
				})
			}
		}
	}
</script>

<style>
	.uni-icons .uni-collapse-cell__title-arrow .uni-collapse-cell__title-arrow-active{
		display: none;
	}
</style>
