
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/init","pages/index/guide","pages/index/index","pages/product/product","pages/index/code","pages/set/set","pages/set/userInfo","pages/set/avator","uview-ui/components/u-avatar-cropper/u-avatar-cropper","pages/set/editPass","pages/paypwd/addpaypwd","pages/cdkey/cdkey","pages/cdkey/cdkeyDetail","pages/cdkey/cdkeyActivity","pages/cdkey/lookAllOrder","pages/cdkey/cdkeyOrder","pages/cdkey/shopDetail","pages/cart/cart","pages/search/search","pages/share/share","pages/recharge/recharge","pages/recharge/deposit","pages/public/login","pages/public/regist","pages/public/forgetPwd","pages/public/oauthCallback","pages/user/user","pages/coupon/exchange","pages/coupon/coupon","pages/coupon/voucher","pages/coupon/contart","pages/coupon/reduction","pages/coupon/couponShop","pages/order/order","pages/money/money","pages/order/createOrder","pages/appDown/appDown","pages/address/address","pages/address/addressManage","pages/invoice/invoice","pages/invoice/invoiceManage","pages/invoice/invoiceManages","pages/money/pay","pages/money/paySuccess","pages/notice/notice","pages/notice/noticeDetail","pages/search/searchList","pages/category/category","pages/product/list","pages/chat/chat","pages/chat/chatAdmin","pages/order/assess/assess","pages/order/editAdress/editAdress","pages/order/trackInfo/trackInfo","pages/order/lookDetails/lookDetails","pages/order/lookDetails/concalShops","pages/allAssess/allAssess","pages/order/postSale/postSale","pages/order/postSale/postDetails","pages/index/subject/zfcg/zfcg","pages/index/subject/jdcg/jdcg","pages/index/subject/hzhb/hzhb","pages/index/subject/lpdz/lpdz","pages/index/subject/wxfw/wxfw","pages/index/subject/cjcg/cjcg","pages/index/subject/ylqx/ylqx","pages/index/subject/jypx/jypx","pages/index/subject/flzx/flzx","pages/index/subject/cqtg/cqtg","pages/search/search_cq","pages/search/searchList_cq","pages/set/about","pages/set/service","pages/set/verBody","pages/set/privacy","pages/contact/contact","pages/order/lookDetails/afterSalesDetails","pages/user/histories/histories","pages/activity/newProd","pages/activity/hotProd"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"行丰商城","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#f8f8f8"},"tabBar":{"color":"#C0C4CC","selectedColor":"#fa436a","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGtuKyACtzTAAADWIaPJ3A0981283","selectedIconPath":"http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGtuKyAczhiAAAEX2QmgAg0922366","text":"首页"},{"pagePath":"pages/category/category","iconPath":"http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGtuKyAQ-LKAAAC2Lb3QrE9713432","selectedIconPath":"http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGtuKyAH4UrAAADuThGr0s4671955","text":"分类"},{"pagePath":"pages/cart/cart","iconPath":"http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGtuKyAfkoZAAAEYR-uv4Y9263745","selectedIconPath":"http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGtuKyACuNeAAAFpMGYZ208213015","text":"购物车"},{"pagePath":"pages/user/user","iconPath":"http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGtuKyATKbSAAAERdgA4Ew0998093","selectedIconPath":"http://47.94.106.106:8888/group1/M00/5D/28/rBHxiGGtuKyAINMHAAAFjPjf2t84936193","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"行丰商城","compilerVersion":"3.2.16","entryPagePath":"pages/index/init","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/init","meta":{"isQuit":true},"window":{"navigationBarTitleText":"入口页","titleNView":false}},{"path":"/pages/index/guide","meta":{},"window":{"navigationBarTitleText":"引导页","titleNView":false,"bounce":"none"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"scrollIndicator":"none","titleNView":{"type":"transparent","searchInput":{"backgroundColor":"rgba(231, 231, 231,.7)","borderRadius":"14px","placeholder":"请点击搜索商品","disabled":true,"placeholderColor":"#606266","width":"300px"},"buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"","fontSize":"27","color":"#303133","background":"rgba(0,0,0,0)","redDot":true}]}}},{"path":"/pages/product/product","meta":{},"window":{"navigationBarTitleText":"商品详情","titleNView":{"type":"transparent","buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"","fontSize":"22","color":"#303133","width":"32px","background":"rgba(0,0,0,.5)"},{"fontSrc":"/static/css/yticon.ttf","text":"","fontSize":"22","color":"#303133","width":"32px","background":"rgba(0,0,0,.5)"}]}}},{"path":"/pages/index/code","meta":{},"window":{"navigationBarTitleText":"扫描详情"}},{"path":"/pages/set/set","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/set/userInfo","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/pages/set/avator","meta":{},"window":{"navigationBarTitleText":"修改头像"}},{"path":"/uview-ui/components/u-avatar-cropper/u-avatar-cropper","meta":{},"window":{"navigationBarTitleText":"头像裁剪","navigationBarBackgroundColor":"#000000"}},{"path":"/pages/set/editPass","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/paypwd/addpaypwd","meta":{},"window":{"navigationBarTitleText":"设置支付密码"}},{"path":"/pages/cdkey/cdkey","meta":{},"window":{"titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/cdkey/cdkeyDetail","meta":{},"window":{"navigationBarTitleText":"卡券详情"}},{"path":"/pages/cdkey/cdkeyActivity","meta":{},"window":{"navigationBarTitleText":"兑换"}},{"path":"/pages/cdkey/lookAllOrder","meta":{},"window":{"navigationBarTitleText":"我的订单","titleNView":{"titleSize":"18px","autoBackButton":false}}},{"path":"/pages/cdkey/cdkeyOrder","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/cdkey/shopDetail","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车","bounce":"none","titleNView":{"buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"编辑","fontSize":"16","color":"#303133","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/share/share","meta":{},"window":{"navigationBarTitleText":"分享"}},{"path":"/pages/recharge/recharge","meta":{},"window":{"navigationBarTitleText":"","bounce":"none","titleNView":{"type":"default","buttons":[{"text":"账单明细","fontSize":"14px","color":"#666666"}]}}},{"path":"/pages/recharge/deposit","meta":{},"window":{"navigationBarTitleText":"余额充值"}},{"path":"/pages/public/login","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/public/regist","meta":{},"window":{"titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/public/forgetPwd","meta":{},"window":{"titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/public/oauthCallback","meta":{},"window":{"titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","bounce":"none","titleNView":{"type":"transparent","buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"","fontSize":"24","color":"#303133","width":"46px","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/coupon/exchange","meta":{},"window":{"navigationBarTitleText":"优惠券"}},{"path":"/pages/coupon/coupon","meta":{},"window":{"navigationBarTitleText":"","bounce":"none","titleNView":{"type":"transparent"}}},{"path":"/pages/coupon/voucher","meta":{},"window":{"navigationBarTitleText":"意见反馈"}},{"path":"/pages/coupon/contart","meta":{},"window":{"navigationBarTitleText":"联系我们"}},{"path":"/pages/coupon/reduction","meta":{},"window":{"navigationBarTitleText":"我的收藏","bounce":"none","titleNView":{"buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"编辑","fontSize":"16","color":"#303133","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/coupon/couponShop","meta":{},"window":{"navigationBarTitleText":"优惠商品"}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"我的订单","enablePullDownRefresh":true,"globalStyle":{"navigationBarTextStyle":"white","navigationBarTitleText":"","navigationBarBackgroundColor":"#1097FF","backgroundColor":"#1097FF","onReachBottomDistance":200,"navigationStyle":"custom"},"bounce":"none","titleNView":{"buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"","fontSize":"22","fontWeight":"bold","marginRight":"20px","color":"#303133","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/money/money","meta":{},"window":{}},{"path":"/pages/order/createOrder","meta":{},"window":{"navigationBarTitleText":"提交订单"}},{"path":"/pages/appDown/appDown","meta":{},"window":{"navigationBarTitleText":"下载中心"}},{"path":"/pages/address/address","meta":{},"window":{"navigationBarTitleText":"收货地址","bounce":"none"}},{"path":"/pages/address/addressManage","meta":{},"window":{"navigationBarTitleText":"地址管理"}},{"path":"/pages/invoice/invoice","meta":{},"window":{"navigationBarTitleText":"发票信息","bounce":"none","titleNView":{"buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"","fontSize":"20","color":"#666666","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/invoice/invoiceManage","meta":{},"window":{"navigationBarTitleText":"新增普票/电子票"}},{"path":"/pages/invoice/invoiceManages","meta":{},"window":{"navigationBarTitleText":"新增增值税发票"}},{"path":"/pages/money/pay","meta":{},"window":{"navigationBarTitleText":"立即支付"}},{"path":"/pages/money/paySuccess","meta":{},"window":{"navigationBarTitleText":"支付成功","bounce":"none","titleNView":{"type":"transparent"}}},{"path":"/pages/notice/notice","meta":{},"window":{"navigationBarTitleText":"通知"}},{"path":"/pages/notice/noticeDetail","meta":{},"window":{"navigationBarTitleText":"通知详情"}},{"path":"/pages/search/searchList","meta":{},"window":{"navigationBarTitleText":"商品列表"}},{"path":"/pages/category/category","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类","bounce":"none","titleNView":{"buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"","fontSize":"22","fontWeight":"bold","color":"#303133","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/product/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"商品列表"}},{"path":"/pages/chat/chat","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"客服","bounce":"none"}},{"path":"/pages/chat/chatAdmin","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"用户"}},{"path":"/pages/order/assess/assess","meta":{},"window":{"navigationBarTitleText":"立即评价"}},{"path":"/pages/order/editAdress/editAdress","meta":{},"window":{"navigationBarTitleText":"修改地址"}},{"path":"/pages/order/trackInfo/trackInfo","meta":{},"window":{"navigationBarTitleText":"物流信息"}},{"path":"/pages/order/lookDetails/lookDetails","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/order/lookDetails/concalShops","meta":{},"window":{"navigationBarTitleText":"申请售后"}},{"path":"/pages/allAssess/allAssess","meta":{},"window":{"navigationBarTitleText":"我的评价"}},{"path":"/pages/order/postSale/postSale","meta":{},"window":{"navigationBarTitleText":"退款售后"}},{"path":"/pages/order/postSale/postDetails","meta":{},"window":{"navigationBarTitleText":"退款详情"}},{"path":"/pages/index/subject/zfcg/zfcg","meta":{},"window":{"navigationBarTitleText":"政府采购","titleNView":{"type":"transparent"}}},{"path":"/pages/index/subject/jdcg/jdcg","meta":{},"window":{"navigationBarTitleText":"军队采购","titleNView":{"type":"transparent"}}},{"path":"/pages/index/subject/hzhb/hzhb","meta":{},"window":{"navigationBarTitleText":"合作伙伴","titleNView":{"type":"transparent"}}},{"path":"/pages/index/subject/lpdz/lpdz","meta":{},"window":{"navigationBarTitleText":"礼品定制"}},{"path":"/pages/index/subject/wxfw/wxfw","meta":{},"window":{"navigationBarTitleText":"维修服务"}},{"path":"/pages/index/subject/cjcg/cjcg","meta":{},"window":{"navigationBarTitleText":"场景采购"}},{"path":"/pages/index/subject/ylqx/ylqx","meta":{},"window":{"navigationBarTitleText":"医疗器械"}},{"path":"/pages/index/subject/jypx/jypx","meta":{},"window":{"navigationBarTitleText":"教育培训"}},{"path":"/pages/index/subject/flzx/flzx","meta":{},"window":{"navigationBarTitleText":"合作伙伴","titleNView":{"type":"transparent"}}},{"path":"/pages/index/subject/cqtg/cqtg","meta":{},"window":{"navigationBarTitleText":"同城团购","bounce":"none","titleNView":{"buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"","fontSize":"24","color":"#303133","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/search/search_cq","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/search/searchList_cq","meta":{},"window":{"navigationBarTitleText":"搜索列表","bounce":"none","titleNView":{"buttons":[{"fontSrc":"/static/css/yticon.ttf","text":"","fontSize":"20","color":"#303133","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/set/about","meta":{},"window":{"navigationBarTitleText":"关于行丰商城"}},{"path":"/pages/set/service","meta":{},"window":{"navigationBarTitleText":"服务协议"}},{"path":"/pages/set/verBody","meta":{},"window":{"navigationBarTitleText":"当前系统版本"}},{"path":"/pages/set/privacy","meta":{},"window":{"navigationBarTitleText":"隐私保护政策"}},{"path":"/pages/contact/contact","meta":{},"window":{"navigationBarTitleText":"联系客服","enablePullDownRefresh":false}},{"path":"/pages/order/lookDetails/afterSalesDetails","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/user/histories/histories","meta":{},"window":{"navigationBarTitleText":"我的足迹","enablePullDownRefresh":false}},{"path":"/pages/activity/newProd","meta":{},"window":{"navigationBarTitleText":"新品首发","enablePullDownRefresh":false}},{"path":"/pages/activity/hotProd","meta":{},"window":{"navigationBarTitleText":"今日爆款","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
