(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-category-category"],{"321c":function(t,e,i){"use strict";(function(t){var a=i("4ea4");i("4de4"),i("c740"),i("4160"),i("26e9"),i("ac1f"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var n=a(i("1da1")),s=a(i("919f")),o={data:function(){return{sizeCalcState:!1,tabScrollTop:0,currentId:0,show:!1,flist:[],slist:[],cateIndex:null,threeItem:[]}},onLoad:function(){document.getElementsByClassName("uni-page-head")[0].style="padding-right:10px;background:#fff;color:#000",this.loadData()},onNavigationBarButtonTap:function(e){var i=e.index;t("log",i," at pages/category/category.vue:49"),0===i&&uni.navigateTo({url:"/pages/search/search"})},methods:{loadData:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function i(){var a,n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,s.default.get("/mobile/get/goods/category/");case 2:a=i.sent,t("log",a," at pages/category/category.vue:59"),200===a.status&&(n=[],e.flist=a.data,e.flist.forEach((function(t){n.push(t.subs)})),e.slist=n,t("log",e.slist," at pages/category/category.vue:67"));case 5:case"end":return i.stop()}}),i)})))()},tabtap:function(e){t("log",e," at pages/category/category.vue:72"),this.sizeCalcState||this.calcSize(),this.currentId=e.id-1,t("log",this.slist," at pages/category/category.vue:77");var i=this.slist.findIndex((function(t){void 0!==t&&(t.subs,e.subs)}));void 0!==this.slist[i]&&(this.tabScrollTop=this.slist[i].top)},asideScroll:function(t){this.sizeCalcState||this.calcSize();var e=t.detail.scrollTop,i=this.slist.filter((function(t){return t.top<=e})).reverse();i.length>0&&(this.currentId=i[0].pid)},calcSize:function(){var e=0;this.slist.forEach((function(i){if(t("log"," at pages/category/category.vue:102"),void 0!==i){var a=uni.createSelectorQuery().select("#main-"+[0].id);a.fields({size:!0},(function(t){i[0].top=e,e+=i[0].height,i[0].bottom=e})).exec()}})),this.sizeCalcState=!0},navToList:function(e){t("log",e," at pages/category/category.vue:120"),uni.navigateTo({url:"/pages/product/list?tid=".concat(e.id)})},showHide:function(t){return this.cateIndex===t?void(this.cateIndex=null):void(this.cateIndex=t)}}};e.default=o}).call(this,i("0de9")["log"])},"4e62":function(t,e,i){"use strict";i.r(e);var a=i("f7bc"),n=i("5578");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("9121");var o,c=i("f0c5"),r=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"360d1d37",null,!1,a["a"],o);e["default"]=r.exports},5578:function(t,e,i){"use strict";i.r(e);var a=i("321c"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"7cc1":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* uni.scss */\n/* 主题色 */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 页面左右间距 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 背景颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-360d1d37],\n.content[data-v-360d1d37]{height:100%;background-color:#fff}.content[data-v-360d1d37]{display:flex}.left-aside[data-v-360d1d37]{flex-shrink:0;width:%?200?%;height:100%;background-color:#fff}.f-item[data-v-360d1d37]{display:flex;align-items:center;justify-content:center;width:100%;height:%?100?%;font-size:%?28?%;color:#606266;position:relative}.f-item.active[data-v-360d1d37]{color:#fa436a;background:#f8f8f8}.f-item.active[data-v-360d1d37]:before{content:"";position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:%?36?%;width:%?8?%;background-color:#fa436a;border-radius:0 4px 4px 0;opacity:.8}.right-aside[data-v-360d1d37]{flex:1;overflow:hidden;padding-left:%?20?%}.s-item[data-v-360d1d37]{display:flex;align-items:center;padding-top:%?8?%;font-size:%?28?%;color:#303133;position:absolute;z-index:1;color:#f7f7f7;font-size:16px;margin-left:20px;line-height:100px;height:100px}.t-list[data-v-360d1d37]{display:flex;flex-wrap:wrap;width:100%;background:#fff;padding-top:%?12?%}.t-list[data-v-360d1d37]:after{content:"";flex:99;height:0}.t-item[data-v-360d1d37]{flex-shrink:0;display:flex;justify-content:center;align-items:center;flex-direction:column;width:%?176?%;font-size:%?26?%;color:#666;padding-bottom:%?20?%}body.?%PAGE?%[data-v-360d1d37]{background-color:#fff}',""]),t.exports=e},9121:function(t,e,i){"use strict";var a=i("f72c"),n=i.n(a);n.a},f72c:function(t,e,i){var a=i("7cc1");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("1955f484",a,!0,{sourceMap:!1,shadowMode:!1})},f7bc:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-scroll-view",{staticClass:"left-aside",attrs:{"scroll-y":!0}},t._l(t.flist,(function(e){return i("v-uni-view",{key:e.id,staticClass:"f-item b-b",class:{active:e.id===t.currentId+1},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tabtap(e)}}},[t._v(t._s(e.name))])})),1),i("v-uni-scroll-view",{staticClass:"right-aside",attrs:{"scroll-with-animation":!0,"scroll-y":!0}},t._l(t.slist[t.currentId],(function(e,a){return i("v-uni-view",{key:e.id,staticClass:"s-list",staticStyle:{position:"relative"},attrs:{id:"main-"+e.id}},[i("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showHide(a)}}},[i("v-uni-text",{staticClass:"s-item",staticStyle:{"text-shadow":"0px 0px 4px #000"}},[t._v(t._s(e.name))]),a===t.cateIndex?i("v-uni-text",{staticClass:"yticon icon-xiajiantou s-item",staticStyle:{"font-size":"20px",right:"20px","text-shadow":"0px 0px 4px #000"}}):i("v-uni-text",{staticClass:"yticon icon-youjiantou s-item",staticStyle:{"font-size":"20px",right:"20px","text-shadow":"0px 0px 4px #000"}}),i("v-uni-image",{staticStyle:{width:"98%",height:"100px","margin-bottom":"15px","border-radius":"5px"},attrs:{src:e.image,mode:""}})],1),a===t.cateIndex?i("v-uni-view",{staticClass:"t-list"},t._l(e.subs,(function(e,a){return i("v-uni-view",{key:e.id,staticClass:"t-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navToList(e)}}},[i("v-uni-image",{staticStyle:{width:"140upx",height:"140upx"},attrs:{mode:"aspectFit",src:""!==e.image?e.image:"/static/errorImage.jpg"}}),i("v-uni-text",{staticStyle:{"text-align":"center"}},[t._v(t._s(e.name))])],1)})),1):t._e()],1)})),1)],1)},s=[]}}]);