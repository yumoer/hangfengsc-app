(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cart/cart"],{4622:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=c(n("a34a")),r=n("2f62");function c(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,a,r,c,i){try{var o=t[c](i),u=o.value}catch(s){return void n(s)}o.done?e(u):Promise.resolve(u).then(a,r)}function o(t){return function(){var e=this,n=arguments;return new Promise(function(a,r){var c=t.apply(e,n);function o(t){i(c,a,r,o,u,"next",t)}function u(t){i(c,a,r,o,u,"throw",t)}o(void 0)})}}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){s(t,e,n[e])})}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(){return n.e("components/uni-number-box").then(n.bind(null,"262a"))},f={components:{uniNumberBox:l},data:function(){return{total:0,allChecked:!1,empty:!1,cartList:[]}},onLoad:function(){this.loadData()},watch:{cartList:function(t){var e=0===t.length;this.empty!==e&&(this.empty=e)}},computed:u({},(0,r.mapState)(["hasLogin"])),methods:{loadData:function(){var t=o(a.default.mark(function t(){var e,n;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.json("cartList");case 2:e=t.sent,n=e.map(function(t){return t.checked=!0,t}),this.cartList=n,this.calcTotal();case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),onImageLoad:function(t,e){this.$set(this[t][e],"loaded","loaded")},onImageError:function(t,e){this[t][e].image="/static/errorImage.jpg"},navToLogin:function(){t.navigateTo({url:"/pages/public/login"})},check:function(t,e){if("item"===t)this.cartList[e].checked=!this.cartList[e].checked;else{var n=!this.allChecked,a=this.cartList;a.forEach(function(t){t.checked=n}),this.allChecked=n}this.calcTotal(t)},numberChange:function(t){this.cartList[t.index].number=t.number,this.calcTotal()},deleteCartItem:function(e){var n=this.cartList,a=n[e];a.id;this.cartList.splice(e,1),this.calcTotal(),t.hideLoading()},clearCart:function(){var e=this;t.showModal({content:"清空购物车？",success:function(t){t.confirm&&(e.cartList=[])}})},calcTotal:function(){var t=this.cartList;if(0!==t.length){var e=0,n=!0;t.forEach(function(t){!0===t.checked?e+=t.price*t.number:!0===n&&(n=!1)}),this.allChecked=n,this.total=Number(e.toFixed(2))}else this.empty=!0},createOrder:function(){var e=this.cartList,n=[];e.forEach(function(t){t.checked&&n.push({attr_val:t.attr_val,number:t.number})}),t.navigateTo({url:"/pages/order/createOrder?data=".concat(JSON.stringify({goodsData:n}))}),this.$api.msg("跳转下一页 sendData")}}};e.default=f}).call(this,n("543d")["default"])},"721b":function(t,e,n){},"774d":function(t,e,n){"use strict";n.r(e);var a=n("7f6c"),r=n("93ae");for(var c in r)"default"!==c&&function(t){n.d(e,t,function(){return r[t]})}(c);n("8041");var i=n("2877"),o=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports},"7dc9":function(t,e,n){"use strict";(function(t){n("a8bd"),n("921b");a(n("66fd"));var e=a(n("774d"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"7f6c":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},8041:function(t,e,n){"use strict";var a=n("721b"),r=n.n(a);r.a},"93ae":function(t,e,n){"use strict";n.r(e);var a=n("4622"),r=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=r.a}},[["7dc9","common/runtime","common/vendor"]]]);