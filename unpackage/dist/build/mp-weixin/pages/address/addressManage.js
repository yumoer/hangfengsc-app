(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/addressManage"],{1907:function(a,t,e){"use strict";e.r(t);var n=e("2a6e"),s=e.n(n);for(var i in n)"default"!==i&&function(a){e.d(t,a,function(){return n[a]})}(i);t["default"]=s.a},"1f70":function(a,t,e){"use strict";var n=function(){var a=this,t=a.$createElement;a._self._c},s=[];e.d(t,"a",function(){return n}),e.d(t,"b",function(){return s})},"2a6e":function(a,t,e){"use strict";(function(a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{addressData:{name:"",mobile:"",addressName:"在地图选择",address:"",area:"",default:!1}}},onLoad:function(t){var e="新增收货地址";"edit"===t.type&&(e="编辑收货地址",this.addressData=JSON.parse(t.data)),this.manageType=t.type,a.setNavigationBarTitle({title:e})},methods:{switchChange:function(a){this.addressData.default=a.detail},chooseLocation:function(){var t=this;a.chooseLocation({success:function(a){t.addressData.addressName=a.name,t.addressData.address=a.name}})},confirm:function(){var t=this.addressData;t.name?/(^1[3|4|5|7|8][0-9]{9}$)/.test(t.mobile)?t.address?t.area?(this.$api.prePage().refreshList(t,this.manageType),this.$api.msg("地址".concat("edit"==this.manageType?"修改":"添加","成功")),setTimeout(function(){a.navigateBack()},800)):this.$api.msg("请填写门牌号信息"):this.$api.msg("请在地图选择所在位置"):this.$api.msg("请输入正确的手机号码"):this.$api.msg("请填写收货人姓名")}}};t.default=e}).call(this,e("543d")["default"])},"645c":function(a,t,e){},c3a6:function(a,t,e){"use strict";var n=e("645c"),s=e.n(n);s.a},d998:function(a,t,e){"use strict";e.r(t);var n=e("1f70"),s=e("1907");for(var i in s)"default"!==i&&function(a){e.d(t,a,function(){return s[a]})}(i);e("c3a6");var r=e("2877"),d=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);t["default"]=d.exports},e0a8:function(a,t,e){"use strict";(function(a){e("a8bd"),e("921b");n(e("66fd"));var t=n(e("d998"));function n(a){return a&&a.__esModule?a:{default:a}}a(t.default)}).call(this,e("543d")["createPage"])}},[["e0a8","common/runtime","common/vendor"]]]);