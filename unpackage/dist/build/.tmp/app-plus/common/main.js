(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0785":function(e,n,t){"use strict";t.r(n);var o=t("1f4f");for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);t("7407");var r,u,a,l,c=t("f0c5"),s=Object(c["a"])(o["default"],r,u,!1,null,null,null,!1,a,l);n["default"]=s.exports},"1f4f":function(e,n,t){"use strict";t.r(n);var o=t("3010"),i=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);n["default"]=i.a},3010:function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(t("a34a")),r=a(t("2fb7")),u=t("2f62");function a(e){return e&&e.__esModule?e:{default:e}}function l(e,n,t,o,i,r,u){try{var a=e[r](u),l=a.value}catch(c){return void t(c)}a.done?n(l):Promise.resolve(l).then(o,i)}function c(e){return function(){var n=this,t=arguments;return new Promise(function(o,i){var r=e.apply(n,t);function u(e){l(r,o,i,u,a,"next",e)}function a(e){l(r,o,i,u,a,"throw",e)}u(void 0)})}}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){f(e,n,t[n])})}return e}function f(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var p={data:function(){return{version:""}},methods:s({},(0,u.mapMutations)(["login"]),{AndroidCheckUpdate:function(){var n=c(i.default.mark(function n(){var t,u,a;return i.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return t={appid:"__UNI__8601E36",version:this.version},n.next=3,r.default.post("/mobile/check/app/version/",t);case 3:u=n.sent,e("log",u.data,this.version," at App.vue:23"),""!==this.version&&u.data.max_version>this.version&&(3!=plus.networkinfo.getCurrentType()?o.showModal({title:"更新提示",content:"有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新。",success:function(n){n.confirm?e("log","用户点击确定"," at App.vue:32"):n.cancel&&e("log","用户点击取消"," at App.vue:34")}}):(a=plus.downloader.createDownload("http://47.94.106.106:8000/mobile/download/apk",{},function(e,n){200==n?plus.runtime.install(plus.io.convertLocalFileSystemURL(e.filename),{},{},function(e){o.showToast({title:"安装失败",mask:!1,duration:1500})}):o.showToast({title:"更新失败",mask:!1,duration:1500})}),o.showModal({title:"更新提示",content:"有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序。",confirmText:"确认下载",icon:"none",success:function(n){n.confirm?(e("log","用户点击确定"," at App.vue:64"),a.start()):n.cancel&&e("log","用户点击取消"," at App.vue:67")}})));case 6:case"end":return n.stop()}},n,this)}));function t(){return n.apply(this,arguments)}return t}()}),onLaunch:function(){var e=c(i.default.mark(function e(){var n,t=this;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=o.getStorageSync("userInfo")||"",n.user_id&&o.getStorage({key:"userInfo",success:function(e){t.login(e.data)}});case 2:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),onShow:function(){e("log","App Show"," at App.vue:108")},onHide:function(){e("log","App Hide"," at App.vue:111")}};n.default=p}).call(this,t("0de9")["default"],t("6e42")["default"])},7407:function(e,n,t){"use strict";var o=t("7d9b"),i=t.n(o);i.a},"7d9b":function(e,n,t){},d29f:function(e,n,t){"use strict";(function(e,n,o){t("a8bd"),t("921b");var i=c(t("66fd")),r=c(t("5b53")),u=c(t("0785")),a=c(t("2fb7")),l=c(t("318c"));function c(e){return e&&e.__esModule?e:{default:e}}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){f(e,n,t[n])})}return e}function f(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}i.default.prototype.$store=r.default,i.default.config.productionTip=!1,i.default.prototype.$uniRequest=a.default;var p=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-input/index")]).then(t.bind(null,"c91d"))},d=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-radio/index")]).then(t.bind(null,"aa2b"))},m=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-checkbox/index")]).then(t.bind(null,"b282"))},v=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-textarea/index")]).then(t.bind(null,"539f"))},h=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-picker-date/index")]).then(t.bind(null,"fade"))},b=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-picker-city/index")]).then(t.bind(null,"803e"))},S=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-picker-custom/index")]).then(t.bind(null,"92db"))},g=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-picker-custom2/index")]).then(t.bind(null,"5947"))},y=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-pics/index")]).then(t.bind(null,"786b"))},w=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-infinitePics/index")]).then(t.bind(null,"82c0"))},P=function(){return Promise.all([t.e("common/vendor"),t.e("components/QS-inputs-split/elements/QS-switch/index")]).then(t.bind(null,"dcdd"))};i.default.component("QSInput",p),i.default.component("QSRadio",d),i.default.component("QSCheckbox",m),i.default.component("QSTextarea",v),i.default.component("QSPickerDate",h),i.default.component("QSPickerCity",b),i.default.component("QSPickerCustom",S),i.default.component("QSPickerCustom2",g),i.default.component("QSPics",y),i.default.component("QSInfinitePics",w),i.default.component("QSwitch",P),a.default.defaults.baseURL="http://47.94.106.106:8000",a.default.defaults.headers.post["Content-Type"]="application/json",a.default.interceptors.response.use(function(n){return 500!==n.status&&502!==n.status||i.default.prototype.$api.msg("服务器错误,请稍后重试"),e("log","返回进入拦截成功"," at main.js:63"),Promise.resolve(n)},function(n){return e("log","返回进入拦截失败"," at main.js:66"),Promise.reject(n)});var Q=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none";!1!==Boolean(e)&&n.showToast({title:e,duration:t,mask:o,icon:i})},k=function(e){return new Promise(function(n){setTimeout(function(){n(l.default[e])},100)})},x=function(){var e=getCurrentPages(),n=e[e.length-2];return n.$vm};i.default.config.productionTip=!1,i.default.prototype.$fire=new i.default,i.default.prototype.$store=r.default,i.default.prototype.$api={msg:Q,json:k,prePage:x},u.default.mpType="app";var O=new i.default(s({},u.default,{store:r.default}));o(O).$mount()}).call(this,t("0de9")["default"],t("6e42")["default"],t("6e42")["createApp"])}},[["d29f","common/runtime","common/vendor"]]]);