(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/category"],{"2df1":function(t,e,a){"use strict";(function(t){a("a8bd"),a("921b");n(a("66fd"));var e=n(a("3f59"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},"3c3e":function(t,e,a){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(a("a34a")),c=i(a("2fb7"));function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e,a,n,r,c,i){try{var o=t[c](i),u=o.value}catch(s){return void a(s)}o.done?e(u):Promise.resolve(u).then(n,r)}function u(t){return function(){var e=this,a=arguments;return new Promise(function(n,r){var c=t.apply(e,a);function i(t){o(c,n,r,i,u,"next",t)}function u(t){o(c,n,r,i,u,"throw",t)}i(void 0)})}}var s={data:function(){return{sizeCalcState:!1,tabScrollTop:0,currentId:0,flist:[],slist:[]}},onLoad:function(){this.loadData()},methods:{loadData:function(){var e=u(r.default.mark(function e(){var a,n=this;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.default.get("/mobile/get/goods/category/");case 2:a=e.sent,t("log",a," at pages\\category\\category.vue:51"),200===a.status&&([],this.flist=a.data,this.flist.forEach(function(t){n.slist.push(t.subs)}),t("log",this.slist," at pages\\category\\category.vue:58"));case 5:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}(),tabtap:function(e){t("log",e," at pages\\category\\category.vue:85"),this.sizeCalcState||this.calcSize(),this.currentId=e.id-1;var a=this.slist.findIndex(function(t){return t.subs===e.subs});t("log",a," at pages\\category\\category.vue:91")},asideScroll:function(t){this.sizeCalcState||this.calcSize();var e=t.detail.scrollTop,a=this.slist.filter(function(t){return t.top<=e}).reverse();a.length>0&&(this.currentId=a[0].pid)},calcSize:function(){var e=0;this.slist.forEach(function(a){t("log",a[0]," at pages\\category\\category.vue:109");var r=n.createSelectorQuery().select("#main-"+a[0].id);t("log",r," at pages\\category\\category.vue:111"),r.fields({size:!0},function(t){a[0].top=e,e+=a[0].height,a[0].bottom=e}).exec()}),this.sizeCalcState=!0},navToList:function(t){n.navigateTo({url:"/pages/product/list?tid=".concat(t)})}}};e.default=s}).call(this,a("0de9")["default"],a("6e42")["default"])},"3f59":function(t,e,a){"use strict";a.r(e);var n=a("d73c"),r=a("e9b8");for(var c in r)"default"!==c&&function(t){a.d(e,t,function(){return r[t]})}(c);a("baea");var i,o=a("f0c5"),u=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=u.exports},"5f25":function(t,e,a){},baea:function(t,e,a){"use strict";var n=a("5f25"),r=a.n(n);r.a},d73c:function(t,e,a){"use strict";var n,r=function(){var t=this,e=t.$createElement;t._self._c},c=[];a.d(e,"b",function(){return r}),a.d(e,"c",function(){return c}),a.d(e,"a",function(){return n})},e9b8:function(t,e,a){"use strict";a.r(e);var n=a("3c3e"),r=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,function(){return n[t]})}(c);e["default"]=r.a}},[["2df1","common/runtime","common/vendor"]]]);