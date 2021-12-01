/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Leo yo',
		portrait: ''
	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = []
/* 首页主题图 */
const homePageList = [
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOAKbw9AAAryY1R8hg2610352",
		text: "政府采购",
		index:0,
	},
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOAGf5lAAAsYqUjk6Y3840222",
		text: "军队采购",
		index:1,
	},
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOAU9V8AAAifXYu7Ro3670317",
		text: "合作伙伴",
		index:2,
	},
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOAHmJpAAAf8wJ-ZfM0298330",
		text: "礼品定制",
		index:3,
	},
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOAPJk8AAAieh6myNk7757680",
		text: "维修服务",
		index:4,
	},
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOADB64AAAjOBHisaw3177363",
		text: "场景采购",
		index:5,
	},
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOAWnx1AAAi9ZLILUA3920460",
		text: "教育培训",
		index:6,
	},
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOAa6FmAAAfmKMy7s47327269",
		text: "医疗器械",
		index:7,
	},
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOAabldAAAs6zmoaFM8074714",
		text: "传奇团购", /* 办公耗材*/
		index:8,
	},
	{
		src: "http://47.94.106.106:8888/group1/M00/52/CC/rBHxiGEDnYOALDnkAAAuHE324gk2575399",
		text: "法律咨询",
		index:9,
	},
	
	// {
	// 	src: "/static/index/ylqx.png",
	// 	text: "关于我们",
	// 	index:9,
	// },
]
/* 商品列表 */
const goodsList = []

/* 购物车 */
const cartList = [];
//详情展示页面
const detailData = {}
const shareList = [{
		type: 1,
		icon: '/static/images/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/images/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/images/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/images/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]

const orderList = [{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			}
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		goodsList: [{
			title: '古黛妃 短袖t恤女 春夏装2019新款韩版宽松',
			price: 179.5,
			image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
			number: 1,
			attr: '珊瑚粉 M'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2120460599/O1CN01LBPS4C1GINkwsOTXS_!!2120460599.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i2/1069876356/TB2ocTQG4WYBuNjy1zkXXXGGpXa_!!1069876356.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
			price: 69,
			image: 'https://img.alicdn.com/imgextra/i3/2128794607/TB2gzzoc41YBuNjy1zcXXbNcXXa_!!2128794607.jpg_430x430q90.jpg',
			number: 1,
			attr: '白色-高帮 39'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/3358098495/O1CN01dhYyid2Ccl5MWLDok_!!3358098495.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/3358098495/O1CN01AWsnFA2Ccl5OzvqsL_!!3358098495.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg',
			},
			{
				image: 'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg',
			},
		]
	}

]
/* const cateList = [
	{
		id: 1,
		name: '资源建设',
		child:[
			{id:'1-1',name:'网课资源',},
			{id:'1-2',name:'系统平台',},
			{id:'1-3',name:'软硬件资源'},
			{id:'1-4',name:'实验室建设'},
			{id:'1-5',name:'工作室建设'},
			{id:'1-6',name:'融媒体建设'},
		]
	},
	{
		id: 2,
		name: '产学合作',
		child:[
			{id:'2-1',name:'实践教学'},
			{id:'2-2',name:'师资培训'},
			{id:'2-3',name:'创新创业'},
			{id:'2-4',name:'实习实训'},
		]
	},
	{
		id: 3,
		name: '内训职培',
		child:[
			{id:'3-1',name:'党建团建'},
			{id:'3-2',name:'团队拓展'},
			{id:'3-3',name:'安全教育'},
			{id:'3-4',name:'职前培训'},
			{id:'3-5',name:'岗位培训'},
		]
	},
	{
		id: 4,
		name: '继续教育',
		child:[
			{id:'4-1',name:'专业技术人员继续教育'},
			{id:'4-2',name:'在职学历与技能提升'},
		]
	},
	{
		id: 5,
		name: '劳务咨询服务',
		child:[
			{id:'5-1',name:'教育咨询'},
			{id:'5-2',name:'劳务服务'},
			{id:'5-3',name:'技术服务'},
		]
	},
] */

const cateList = [{
		id: 1,
		name: '手机数码'
	},
	{
		id: 2,
		name: '礼品鲜花'
	},
	{
		id: 3,
		name: '男装女装'
	},
	{
		id: 4,
		name: '母婴用品'
	},
	{
		id: 5,
		pid: 1,
		name: '手机通讯'
	},
	{
		id: 6,
		pid: 1,
		name: '运营商'
	},
	{
		id: 8,
		pid: 5,
		name: '全面屏手机',
		picture: '/static/temp/cate2.jpg'
	},
	{
		id: 9,
		pid: 5,
		name: '游戏手机',
		picture: '/static/temp/cate3.jpg'
	},
	{
		id: 10,
		pid: 5,
		name: '老人机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 11,
		pid: 5,
		name: '拍照手机',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 12,
		pid: 5,
		name: '女性手机',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 14,
		pid: 6,
		name: '合约机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 15,
		pid: 6,
		name: '选好卡',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 16,
		pid: 6,
		name: '办套餐',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 17,
		pid: 2,
		name: '礼品',
	},
	{
		id: 18,
		pid: 2,
		name: '鲜花',
	},
	{
		id: 19,
		pid: 17,
		name: '公益摆件',
		picture: '/static/temp/cate7.jpg'
	},
	{
		id: 20,
		pid: 17,
		name: '创意礼品',
		picture: '/static/temp/cate8.jpg'
	},
	{
		id: 21,
		pid: 18,
		name: '鲜花',
		picture: '/static/temp/cate9.jpg'
	},
	{
		id: 22,
		pid: 18,
		name: '每周一花',
		picture: '/static/temp/cate10.jpg'
	},
	{
		id: 23,
		pid: 18,
		name: '卡通花束',
		picture: '/static/temp/cate11.jpg'
	},
	{
		id: 24,
		pid: 18,
		name: '永生花',
		picture: '/static/temp/cate12.jpg'
	},
	{
		id: 25,
		pid: 3,
		name: '男装'
	},
	{
		id: 26,
		pid: 3,
		name: '女装'
	},
	{
		id: 27,
		pid: 25,
		name: '男士T恤',
		picture: '/static/temp/cate13.jpg'
	},
	{
		id: 28,
		pid: 25,
		name: '男士外套',
		picture: '/static/temp/cate14.jpg'
	},
	{
		id: 29,
		pid: 26,
		name: '裙装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 30,
		pid: 26,
		name: 'T恤',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 31,
		pid: 26,
		name: '上装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 32,
		pid: 26,
		name: '下装',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 33,
		pid: 4,
		name: '奶粉',
	},
	{
		id: 34,
		pid: 4,
		name: '营养辅食',
	},
	{
		id: 35,
		pid: 4,
		name: '童装',
	},
	{
		id: 39,
		pid: 4,
		name: '喂养用品',
	},
	{
		id: 36,
		pid: 33,
		name: '有机奶粉',
		picture: '/static/temp/cate17.jpg'
	},
	{
		id: 37,
		pid: 34,
		name: '果泥/果汁',
		picture: '/static/temp/cate18.jpg'
	},
	{
		id: 39,
		pid: 34,
		name: '面条/粥',
		picture: '/static/temp/cate20.jpg'
	},
	{
		id: 42,
		pid: 35,
		name: '婴童衣橱',
		picture: '/static/temp/cate19.jpg'
	},
	{
		id: 43,
		pid: 39,
		name: '吸奶器',
		picture: '/static/temp/cate21.jpg'
	},
	{
		id: 44,
		pid: 39,
		name: '儿童餐具',
		picture: '/static/temp/cate22.jpg'
	},
	{
		id: 45,
		pid: 39,
		name: '牙胶安抚',
		picture: '/static/temp/cate23.jpg'
	},
	{
		id: 46,
		pid: 39,
		name: '围兜',
		picture: '/static/temp/cate24.jpg'
	},
]
export default {
	carouselList,
	homePageList,
	cartList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	orderList,
	cateList,
}
