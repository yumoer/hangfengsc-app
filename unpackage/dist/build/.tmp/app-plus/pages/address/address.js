(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{"01a3":function(e,a,t){"use strict";(function(e,s){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=r(t("a34a")),d=r(t("2fb7"));function r(e){return e&&e.__esModule?e:{default:e}}function u(e,a,t,s,n,d,r){try{var u=e[d](r),o=u.value}catch(i){return void t(i)}u.done?a(o):Promise.resolve(o).then(s,n)}function o(e){return function(){var a=this,t=arguments;return new Promise(function(s,n){var d=e.apply(a,t);function r(e){u(d,s,n,r,o,"next",e)}function o(e){u(d,s,n,r,o,"throw",e)}r(void 0)})}}var i={data:function(){return{source:0,addressList:[]}},onLoad:function(a){e("log",a.source," at pages\\address\\address.vue:38"),this.source=a.source},onShow:function(){this.getAddress()},onNavigationBarButtonTap:function(a){var t=a.index;e("log",t," at pages\\address\\address.vue:46"),0===t&&s.navigateTo({url:"/pages/address/addressManage?type=add&data=undefined"})},methods:{getAddress:function(){var a=o(n.default.mark(function a(t,r){var u=this;return n.default.wrap(function(a){while(1)switch(a.prev=a.next){case 0:return e("log",t," at pages\\address\\address.vue:55"),a.next=3,(0,d.default)({url:"/addresses/",method:"get",headers:{Authorization:"JWT "+s.getStorageSync("userInfo").token}}).then(function(a){e("log",a.data," at pages\\address\\address.vue:63"),u.addressList=a.data.addresses,"add"===r&&u.addressList.push(t),u.addressList.forEach(function(e,s){e.id===a.data.default_address_id&&(e.default_address_id=!0),null!==e.addressName?void 0!==t&&e.id===t.id&&(e.addressName=t.addressName):e.addressName=e.province+" "+e.city+" "+e.district+" "})}).catch(function(a){e("log",a," at pages\\address\\address.vue:84")});case 3:a.sent;case 4:case"end":return a.stop()}},a,this)}));function t(e,t){return a.apply(this,arguments)}return t}(),checkAddress:function(e){1==this.source&&(this.$api.prePage().addressData=e,s.navigateBack())},addAddress:function(a,t){e("log",t," at pages\\address\\address.vue:96"),s.navigateTo({url:"/pages/address/addressManage?type=".concat(a,"&data=").concat(JSON.stringify(t))})},refreshList:function(a,t){e("log",a,t," at pages\\address\\address.vue:105"),this.getAddress(a,t)}}};a.default=i}).call(this,t("0de9")["default"],t("6e42")["default"])},"3b1e":function(e,a,t){"use strict";t.r(a);var s=t("a6de"),n=t("fae5");for(var d in n)"default"!==d&&function(e){t.d(a,e,function(){return n[e]})}(d);t("78c6");var r,u=t("f0c5"),o=Object(u["a"])(n["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],r);a["default"]=o.exports},"58ee":function(e,a,t){"use strict";(function(e){t("a8bd"),t("921b");s(t("66fd"));var a=s(t("3b1e"));function s(e){return e&&e.__esModule?e:{default:e}}e(a.default)}).call(this,t("6e42")["createPage"])},"78c6":function(e,a,t){"use strict";var s=t("fa29"),n=t.n(s);n.a},a6de:function(e,a,t){"use strict";var s,n=function(){var e=this,a=e.$createElement;e._self._c},d=[];t.d(a,"b",function(){return n}),t.d(a,"c",function(){return d}),t.d(a,"a",function(){return s})},fa29:function(e,a,t){},fae5:function(e,a,t){"use strict";t.r(a);var s=t("01a3"),n=t.n(s);for(var d in s)"default"!==d&&function(e){t.d(a,e,function(){return s[e]})}(d);a["default"]=n.a}},[["58ee","common/runtime","common/vendor"]]]);