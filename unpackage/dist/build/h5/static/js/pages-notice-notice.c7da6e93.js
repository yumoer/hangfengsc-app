(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-notice-notice"],{"0ab4":function(t,e,i){"use strict";(function(t){var n=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("2fb7")),o={data:function(){return{notices:[]}},onLoad:function(){this.getDate()},methods:{getDate:function(){var e=this;(0,a.default)({url:"/announcement/list/",method:"get"}).then((function(i){t.log(i),e.notices=i.data})).catch((function(e){t.log(e)}))},navTo:function(t){uni.navigateTo({url:"/pages/notice/noticeDetail?id="+t})}}};e.default=o}).call(this,i("5a52")["default"])},"115e":function(t,e,i){"use strict";i.r(e);var n=i("0ab4"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},1658:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",t._l(t.notices,(function(e,n){return i("v-uni-view",{key:n,staticClass:"notice-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navTo(e.id)}}},[i("v-uni-text",{staticClass:"time"},[t._v(t._s(e.create_time))]),i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"title"},[t._v(t._s(e.name))]),e.image?i("v-uni-view",{staticClass:"img-wrapper"},[i("v-uni-image",{staticClass:"pic",attrs:{src:e.image}})],1):t._e(),e.decs?i("v-uni-text",{staticClass:"introduce"},[t._v(t._s(e.decs))]):t._e(),i("v-uni-view",{staticClass:"bot b-t"},[i("v-uni-text",[t._v("查看详情")]),i("v-uni-text",{staticClass:"more-icon yticon icon-you"})],1)],1)],1)})),1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},"41a7":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 页面左右间距 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 背景颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-a098bb4c]{background-color:#f7f7f7;padding-bottom:%?30?%}.notice-item[data-v-a098bb4c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.time[data-v-a098bb4c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:%?80?%;padding-top:%?10?%;font-size:%?26?%;color:#7d7d7d}.content[data-v-a098bb4c]{width:%?710?%;padding:0 %?24?%;background-color:#fff;border-radius:%?4?%}.title[data-v-a098bb4c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?90?%;font-size:%?32?%;color:#303133;margin:%?16?% %?4?%}.img-wrapper[data-v-a098bb4c]{width:100%;height:%?260?%;position:relative}.pic[data-v-a098bb4c]{display:block;width:100%;height:100%;border-radius:%?6?%}.cover[data-v-a098bb4c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);font-size:%?36?%;color:#fff}.introduce[data-v-a098bb4c]{display:inline-block;padding:%?16?% 0;font-size:%?28?%;color:#606266;line-height:%?38?%}.bot[data-v-a098bb4c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;height:%?80?%;font-size:%?24?%;color:#707070;position:relative}.more-icon[data-v-a098bb4c]{font-size:%?32?%}body.?%PAGE?%[data-v-a098bb4c]{background-color:#f7f7f7}',""]),t.exports=e},"79a0":function(t,e,i){"use strict";i.r(e);var n=i("1658"),a=i("115e");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("dd39");var c,s=i("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"a098bb4c",null,!1,n["a"],c);e["default"]=r.exports},aafb:function(t,e,i){var n=i("41a7");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("a31bb00c",n,!0,{sourceMap:!1,shadowMode:!1})},dd39:function(t,e,i){"use strict";var n=i("aafb"),a=i.n(n);a.a}}]);