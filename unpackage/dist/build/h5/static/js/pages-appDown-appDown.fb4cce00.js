(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-appDown-appDown"],{"37fd":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/* uni.scss */\n/* 主题色 */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 页面左右间距 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 背景颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-df4ec0a0]{background-color:#e82222;width:100%;height:100%}body.?%PAGE?%[data-v-df4ec0a0]{background-color:#e82222}',""]),t.exports=n},"5bfe":function(t,n,e){var i=e("37fd");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("0c2cabae",i,!0,{sourceMap:!1,shadowMode:!1})},"83cf":function(t,n,e){"use strict";e.r(n);var i=e("ce0e"),o=e("e7df");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("ef26");var c,r=e("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"df4ec0a0",null,!1,i["a"],c);n["default"]=u.exports},ce0e:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("v-uni-view",{staticStyle:{height:"300upx","line-height":"300upx","text-align":"center"}},[e("v-uni-text",{staticStyle:{color:"#fff","font-size":"32upx","font-weight":"100"}},[t._v("行丰商城App,购物高效又轻松！")])],1),e("v-uni-view",{staticStyle:{width:"100%",height:"300px","text-align":"center","padding-left":"80upx"}},[e("v-uni-image",{staticStyle:{width:"200px",height:"100%"},attrs:{src:"/static/app.png",mode:""}})],1),e("v-uni-view",{staticStyle:{width:"100%",height:"60px","text-align":"center","margin-top":"20upx"}},[e("v-uni-button",{staticStyle:{width:"200px",color:"#fff","border-color":"#fff","border-radius":"30px"},attrs:{type:"default",plain:"true"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.downAndroid.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"yticon icon-android"}),e("v-uni-text",{staticStyle:{"margin-left":"10Px"}},[t._v("Android版下载")])],1)],1),e("v-uni-view",{staticStyle:{width:"100%",height:"60px","text-align":"center"}},[e("v-uni-button",{staticStyle:{width:"200px",color:"#fff","border-color":"#fff","border-radius":"30px"},attrs:{type:"default",plain:"true"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.downIphone.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"yticon icon-iphone"}),e("v-uni-text",{staticStyle:{"margin-left":"10Px"}},[t._v("IPhone版下载")])],1)],1)],1)},a=[]},e7df:function(t,n,e){"use strict";e.r(n);var i=e("f9cb"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},ef26:function(t,n,e){"use strict";var i=e("5bfe"),o=e.n(i);o.a},f9cb:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{src:"http://www.hfyt365.com:8000/mobile/download/apk"}},onLoad:function(){},methods:{downAndroid:function(){location.href="http://www.hfyt365.com:8000/mobile/download/apk"},downIphone:function(){location.href="https://apps.apple.com/cn/app/%E8%A1%8C%E4%B8%B0%E5%95%86%E5%9F%8E/id1507747103"},isWeixin:function(t){var n=navigator.userAgent,e=!!/MicroMessenger/i.test(n);e&&this.$api.msg("点击右上角在浏览器中打开")}}};n.default=i}}]);