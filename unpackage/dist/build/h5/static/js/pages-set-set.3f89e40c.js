(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-set-set"],{"12c5":function(t,e,n){"use strict";n.r(e);var a=n("9e52"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},1339:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* uni.scss */\n/* 主题色 */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 页面左右间距 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 背景颜色 */\n/* 行为相关颜色 */.container[data-v-d4e8e1f2]{padding-top:%?16?%}.loginBtn[data-v-d4e8e1f2]{width:70%;margin:0 auto;position:absolute;left:15%;bottom:30px}.loginBtn .confirm-btn[data-v-d4e8e1f2]{width:100%;height:%?80?%;line-height:%?80?%;border-radius:50px;color:#fff;background:linear-gradient(90deg,#ee1d23,#f04023);font-size:%?32?%}.loginBtn .confirm-btn[data-v-d4e8e1f2]:after{border-radius:100px}.list-cell[data-v-d4e8e1f2]{display:flex;padding-top:%?16?%;align-items:baseline;padding:%?20?% %?30?%;line-height:%?60?%;background:#fff;justify-content:center}.list-cell.log-out-btn[data-v-d4e8e1f2]{margin-top:%?40?%}.list-cell.log-out-btn .cell-tit[data-v-d4e8e1f2]{color:#fa436a;text-align:center;margin-right:0}.list-cell.cell-hover[data-v-d4e8e1f2]{background:#fafafa}.list-cell.b-b[data-v-d4e8e1f2]:after{left:%?30?%}.list-cell.m-t[data-v-d4e8e1f2]{margin-top:%?16?%}.list-cell .cell-more[data-v-d4e8e1f2]{align-self:baseline;font-size:%?32?%;color:#909399;margin-left:%?10?%}.list-cell .cell-tit[data-v-d4e8e1f2]{flex:1;font-size:%?30?%;color:#666;margin-right:%?10?%}.list-cell .cell-tip[data-v-d4e8e1f2]{font-size:%?28?%;color:#909399}.list-cell uni-switch[data-v-d4e8e1f2]{-webkit-transform:translateX(%?16?%) scale(.84);transform:translateX(%?16?%) scale(.84)}',""]),t.exports=e},"18db":function(t,e,n){var a=n("1339");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("13f5370e",a,!0,{sourceMap:!1,shadowMode:!1})},"394c":function(t,e,n){"use strict";n.r(e);var a=n("b3d4"),i=n("12c5");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("64d0");var s,l=n("f0c5"),c=Object(l["a"])(i["default"],a["b"],a["c"],!1,null,"d4e8e1f2",null,!1,a["a"],s);e["default"]=c.exports},"64d0":function(t,e,n){"use strict";var a=n("18db"),i=n.n(a);i.a},"9e52":function(t,e,n){"use strict";(function(t){var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=a(n("1da1")),o=a(n("5530")),s=n("2f62"),l=a(n("919f")),c={data:function(){return{appver:"",size:""}},onLoad:function(){},methods:(0,o.default)((0,o.default)({},(0,s.mapMutations)(["logout"])),{},{navTo:function(t){uni.navigateTo({url:t})},lookVersion:function(){uni.navigateTo({url:"/pages/set/about"})},updateVersion:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function n(){var a,i,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={appid:"__UNI__8601E36",version:e.version},n.next=3,l.default.post("/mobile/check/app/version/",a);case 3:i=n.sent,t("log",i.data,e.version," at pages/set/set.vue:100"),""!==e.version&&i.data.max_version>e.version?3!=plus.networkinfo.getCurrentType()?e.$showModal({title:"更新提示",content:"有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新。",success:function(e){e.confirm?t("log","用户点击确定"," at pages/set/set.vue:109"):e.cancel&&t("log","用户点击取消"," at pages/set/set.vue:111")}}):(o=plus.downloader.createDownload("http://47.94.106.106:8000/mobile/download/apk",{},(function(t,e){200==e?plus.runtime.install(plus.io.convertLocalFileSystemURL(t.filename),{},{},(function(t){uni.showToast({title:"安装失败",mask:!1,duration:1500})})):uni.showToast({title:"更新失败",mask:!1,duration:1500})})),e.$showModal({title:"更新提示",content:"有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序。",confirmText:"确认下载",icon:"none",success:function(e){e.confirm?(t("log","用户点击确定"," at pages/set/set.vue:141"),o.start()):e.cancel&&t("log","用户点击取消"," at pages/set/set.vue:144")}})):uni.showToast({title:"已是最新版本"});case 6:case"end":return n.stop()}}),n)})))()},clear:function(){var t=this;uni.removeStorage({key:"userInfo"}),this.$showModal({title:"提示",content:"确认清除缓存吗?",cancelText:"取消",confirmText:"确认",success:function(e){e.confirm&&(t.logout(),uni.navigateBack())}})},toLogout:function(){var t=this;this.$showModal({title:"确认退出登录?",content:"退出登录后,登录信息会被清除",cancelText:"取消",confirmText:"确认",success:function(e){e.confirm&&(uni.removeStorage({key:"userInfo"}),t.logout(),uni.navigateBack())}})},switchChange:function(t){var e=t.detail.value?"打开":"关闭";this.$api.msg("".concat(e,"消息推送"))},logouts:function(){var e=this;this.$showModal({title:"确认注销账户?",content:"注销账号后,您的账号将无法登录",cancelText:"取消",confirmText:"确认",success:function(){var n=(0,i.default)(regeneratorRuntime.mark((function n(a){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!a.confirm){n.next=4;break}return n.next=3,(0,l.default)({url:"/users/",method:"delete",headers:{Authorization:"JWT "+uni.getStorageSync("userInfo").token}}).then((function(n){t("log",n," at pages/set/set.vue:251"),uni.removeStorage({key:"userInfo"}),e.logout(),uni.navigateBack()})).catch((function(e){t("log",e," at pages/set/set.vue:256")}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})));function a(t){return n.apply(this,arguments)}return a}()})}})};e.default=c}).call(this,n("0de9")["log"])},b3d4:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/set/userInfo")}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("个人资料")]),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),n("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/set/avator")}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("修改头像")]),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),n("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/set/editPass")}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("修改密码")]),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),n("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/address/address")}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("收货地址")]),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),n("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/paypwd/addpaypwd")}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("支付密码")]),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),n("v-uni-view",{staticClass:"list-cell b-b m-t"},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("消息推送")]),n("v-uni-switch",{attrs:{checked:!0,color:"#EE1D23"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.switchChange.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("清除缓存")]),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),n("v-uni-view",{staticClass:"list-cell",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.logouts.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"cell-tit"},[t._v("注销账户")]),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),n("v-uni-view",{staticClass:"loginBtn"},[n("v-uni-button",{staticClass:"confirm-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toLogout.apply(void 0,arguments)}}},[t._v("退出登录")])],1),n("show-modal")],1)},o=[]}}]);