(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/product"],{"2bb0":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(n("a34a")),a=s(n("2fb7"));function s(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,i,a,s,r){try{var c=t[s](r),o=c.value}catch(d){return void n(d)}c.done?e(o):Promise.resolve(o).then(i,a)}function c(t){return function(){var e=this,n=arguments;return new Promise(function(i,a){var s=t.apply(e,n);function c(t){r(s,i,a,c,o,"next",t)}function o(t){r(s,i,a,c,o,"throw",t)}c(void 0)})}}var o=function(){return n.e("components/share").then(n.bind(null,"5c8f"))},d={components:{share:o},data:function(){return{specClass:"none",specSelected:[],favorite:!0,shareList:[],imgList:["https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"],desc:'\n\t\t\t\t<div style="width:100%">\n\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t</div>\n\t\t\t',specList:[{id:1,name:"尺寸"},{id:2,name:"颜色"}],specChildList:[{id:1,pid:1,name:"XS"},{id:2,pid:1,name:"S"},{id:3,pid:1,name:"M"},{id:4,pid:1,name:"L"},{id:5,pid:1,name:"XL"},{id:6,pid:1,name:"XXL"},{id:7,pid:2,name:"白色"},{id:8,pid:2,name:"珊瑚粉"},{id:9,pid:2,name:"草木绿"}]}},onLoad:function(){var t=c(i.default.mark(function t(e){var n,a=this;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.id,n&&this.getDate(n),this.specList.forEach(function(t){var e=!0,n=!1,i=void 0;try{for(var s,r=a.specChildList[Symbol.iterator]();!(e=(s=r.next()).done);e=!0){var c=s.value;if(c.pid===t.id){a.$set(c,"selected",!0),a.specSelected.push(c);break}}}catch(o){n=!0,i=o}finally{try{e||null==r.return||r.return()}finally{if(n)throw i}}}),t.next=5,this.$api.json("shareList");case 5:this.shareList=t.sent;case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),methods:{getDate:function(){var t=c(i.default.mark(function t(e){var n;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.default.get("/mobile/get/goods/"+e);case 3:n=t.sent,console.log(n),console.log(n.data.images),this.imgList=n.data.images,t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.error(t.t0);case 12:case"end":return t.stop()}},t,this,[[0,9]])}));function e(e){return t.apply(this,arguments)}return e}(),toggleSpec:function(){var t=this;"show"===this.specClass?(this.specClass="hide",setTimeout(function(){t.specClass="none"},250)):"none"===this.specClass&&(this.specClass="show")},selectSpec:function(t,e){var n=this,i=this.specChildList;i.forEach(function(t){t.pid===e&&n.$set(t,"selected",!1)}),this.$set(i[t],"selected",!0),this.specSelected=[],i.forEach(function(t){!0===t.selected&&n.specSelected.push(t)})},share:function(){this.$refs.share.toggleMask()},toFavorite:function(){this.favorite=!this.favorite},buy:function(){t.navigateTo({url:"/pages/order/createOrder"})},stopPrevent:function(){}}};e.default=d}).call(this,n("543d")["default"])},"39b7":function(t,e,n){},"63cb":function(t,e,n){"use strict";n.r(e);var i=n("ed5b"),a=n("fdea");for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);n("67d1");var r=n("2877"),c=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},"67d1":function(t,e,n){"use strict";var i=n("39b7"),a=n.n(i);a.a},eae0:function(t,e,n){"use strict";(function(t){n("a8bd"),n("921b");i(n("66fd"));var e=i(n("63cb"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},ed5b:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},fdea:function(t,e,n){"use strict";n.r(e);var i=n("2bb0"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=a.a}},[["eae0","common/runtime","common/vendor"]]]);