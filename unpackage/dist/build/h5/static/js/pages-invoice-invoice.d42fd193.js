(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-invoice-invoice"],{"109c":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"xw-empty",props:{text:{type:String,default:""},img:{type:String,default:""},textColor:{type:String,default:""},isShow:{type:Boolean,default:!1},btnText:{type:String,default:""},path:{type:String,default:""}},methods:{navTo:function(e){t("log",e," at components/xw-empty/xw-empty.vue:40"),uni.switchTab({url:e}),uni.navigateTo({url:e})}}};e.default=i}).call(this,i("0de9")["log"])},"1c42":function(t,e,i){"use strict";(function(t){var n=i("4ea4");i("99af"),i("4160"),i("d81d"),i("a434"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var o=n(i("1da1")),a=n(i("919f")),c=n(i("6ae3")),d={data:function(){return{source:0,couponList:[],isEmpty:!1,checked:!1,isCheck:!1,allChecked:"",selected:[]}},components:{xwEmpty:c.default},onShow:function(){this.getInvoice()},onLoad:function(e){t("log",e.source," at pages/invoice/invoice.vue:65"),this.source=e.source,this.getInvoice()},onNavigationBarButtonTap:function(t){var e=t.index;0===e&&this.couponList.length>0?this.isCheck=!this.isCheck:this.$api.msg("没有数据暂不能删除")},watch:{couponList:function(t){var e=0===t.length;this.isEmpty!==e&&(this.isEmpty=e)}},methods:{checkInvoice:function(e){t("log",e," at pages/invoice/invoice.vue:89"),1==this.source&&(this.$api.prePage().couponList=e,uni.navigateBack())},toBack:function(){this.isCheck=!1},getInvoice:function(e,i){var n=this;return(0,o.default)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,(0,a.default)({url:"/orders/invoice/",method:"get",headers:{Authorization:"JWT "+uni.getStorageSync("userInfo").token}}).then((function(o){t("log",o," at pages/invoice/invoice.vue:109"),o.data.map((function(t){t.checked=!1})),n.couponList=o.data,"1"===n.source&&n.couponList.unshift({invoice_title:"不开发票",invoice_org_code:""}),n.couponList.length<1&&(n.selected=[],n.isCheck=!1),"add"===i?n.couponList.push(e):"edit"===i&&n.couponList.forEach((function(t,i){void 0!==e&&t.id===e.id&&(t.invoice_title=e.invoice_title,t.invoice_org_code=e.invoice_org_code,t.register_address=e.register_address,t.invoice_phone=e.invoice_phone,t.invoice_bank=e.invoice_bank,t.invoice_bank_code=e.invoice_bank_code)}))})).catch((function(e){t("log",e," at pages/invoice/invoice.vue:138")}));case 2:o.sent;case 3:case"end":return o.stop()}}),o)})))()},checkboxGroupChange:function(e){t("log",e," at pages/invoice/invoice.vue:144")},checkboxChange:function(e){!0===e.value?this.selected.push(e):(this.checked=!1,this.selected.shift(e,1)),t("log",this.selected," at pages/invoice/invoice.vue:155"),e.value=!e.value},checkedAll:function(){var t=this,e=[];this.couponList.forEach((function(i){!0===t.checked?i.checked=!0:i.checked=!1,e.push({value:i.checked,name:i.id})})),this.selected=e},condelete:function(e){var i=this;return(0,o.default)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:i.$showModal({title:"提示",content:"是否确认删除?",cancelText:"取消",confirmText:"确认",success:function(n){n.confirm&&(uni.showLoading(),e.forEach((function(e){(0,a.default)({url:"/orders/invoice/"+e.name+"/",method:"delete",headers:{Authorization:"JWT "+uni.getStorageSync("userInfo").token}}).then((function(e){t("log",e.data," at pages/invoice/invoice.vue:192"),uni.hideLoading(),i.$api.msg("发票删除成功"),i.getInvoice()})).catch((function(e){t("log",e," at pages/invoice/invoice.vue:198")}))})))}});case 1:case"end":return n.stop()}}),n)})))()},addInvoIce:function(e,i){t("log",i,e," at pages/invoice/invoice.vue:208"),("add"===e||"edit"===e)&&uni.navigateTo({url:"/pages/invoice/invoiceManages?type=".concat(e,"&data=").concat(JSON.stringify(i))})},refreshList:function(e,i){t("log",e,i," at pages/invoice/invoice.vue:225"),"add"===i||"edit"===i||this.couponList.splice(e,1),this.getInvoice(e,i)}}};e.default=d}).call(this,i("0de9")["log"])},"367e":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.isShow?i("v-uni-view",{staticClass:"empty"},[i("v-uni-image",{staticClass:"empty_image",attrs:{src:t.img,mode:"widthFix"}}),i("v-uni-text",{style:{color:t.textColor}},[t._v(t._s(t.text))]),t.path?i("v-uni-button",{staticClass:"add-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo(t.path)}}},[t._v(t._s(t.btnText))]):t._e()],1):t._e()},a=[]},"380a":function(t,e,i){var n=i("6b56");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("28a03bf0",n,!0,{sourceMap:!1,shadowMode:!1})},"4e5a":function(t,e,i){"use strict";var n=i("380a"),o=i.n(n);o.a},"4e6c":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* uni.scss */\n/* 主题色 */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 页面左右间距 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 背景颜色 */\n/* 行为相关颜色 */.empty[data-v-d662ec24]{position:relative;left:0;top:0;width:100%;height:80vh;padding-bottom:%?100?%;display:flex;justify-content:center;flex-direction:column;align-items:center;background:#f7f7f7}.empty .empty_image[data-v-d662ec24]{width:%?517.7?%;height:%?360.425?%;margin-bottom:%?30?%}.empty .empty-tips[data-v-d662ec24]{display:flex;justify-content:center;font-size:%?26?%;color:#c0c4cc}.empty .empty-tips .navigator[data-v-d662ec24]{color:#fa436a;margin-left:%?16?%}.empty .add-btn[data-v-d662ec24]{margin-top:%?40?%;font-size:%?32?%;width:%?234?%;color:#ee1d23;background-color:#fa436a;border-radius:%?50?%;background:#fff;box-shadow:1px 2px 5px rgba(219,63,96,.4);letter-spacing:%?6?%}',""]),t.exports=e},"533c":function(t,e,i){"use strict";i.r(e);var n=i("1c42"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"5d11":function(t,e,i){var n=i("4e6c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("1379280d",n,!0,{sourceMap:!1,shadowMode:!1})},6177:function(t,e,i){"use strict";var n=i("5d11"),o=i.n(n);o.a},"6ae3":function(t,e,i){"use strict";i.r(e);var n=i("367e"),o=i("d8ae");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("6177");var c,d=i("f0c5"),s=Object(d["a"])(o["default"],n["b"],n["c"],!1,null,"d662ec24",null,!1,n["a"],c);e["default"]=s.exports},"6b56":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* uni.scss */\n/* 主题色 */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 页面左右间距 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 背景颜色 */\n/* 行为相关颜色 */[data-v-bfd24180] .uni-checkbox:not([disabled]) .uni-checkbox-input:hover{border-color:red!important}[data-v-bfd24180] .uni-checkbox .uni-checkbox-input{background:red!important;color:#fff!important}[data-v-bfd24180] .uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{background:red!important;color:#fff!important}.content[data-v-bfd24180]{position:relative;padding:%?30?%;margin-bottom:%?100?%}.list[data-v-bfd24180]{display:flex;align-items:center;padding:%?20?% %?30?%;background:#6b6b6b;position:relative}.coupon-wrap[data-v-bfd24180]{margin-bottom:%?20?%}.coupon-item[data-v-bfd24180]{display:flex;flex-direction:column;background:#fff;border-radius:%?20?%}.coupon-item .con[data-v-bfd24180]{display:flex;align-items:center;position:relative;min-height:%?140?%;padding:0 %?30?%}.coupon-item .con[data-v-bfd24180]:after{position:absolute;left:0;bottom:0;content:"";width:100%;height:0;border-bottom:1px dashed #f3f3f3;-webkit-transform:scaleY(50%);transform:scaleY(50%)}.coupon-item .left[data-v-bfd24180]{display:flex;flex-direction:column;justify-content:center;flex:1;overflow:hidden;height:auto;padding:%?30?% 0}.coupon-item .title[data-v-bfd24180]{font-size:%?32?%;color:#111;font-weight:700;margin-bottom:%?15?%}.coupon-item .time[data-v-bfd24180]{font-size:%?28?%;color:#666}.coupon-item .right[data-v-bfd24180]{display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:%?26?%;color:#606266;height:%?100?%}.coupon-item .price[data-v-bfd24180]{font-size:%?34?%;color:#fa436a}.coupon-item .price[data-v-bfd24180]:before{font-size:%?34?%}.coupon-item .tips[data-v-bfd24180]{font-size:%?24?%;color:#909399;line-height:%?60?%;padding-left:%?30?%}.coupon-item .circle[data-v-bfd24180]{position:absolute;left:%?-6?%;bottom:%?-10?%;z-index:10;width:%?20?%;height:%?20?%;background:#f3f3f3;border-radius:100px}.coupon-item .circle.r[data-v-bfd24180]{left:auto;right:%?-6?%}.wrapper[data-v-bfd24180]{display:flex;flex-direction:column;flex:1}.address-box[data-v-bfd24180]{display:flex;align-items:center}.address-box .tag[data-v-bfd24180]{font-size:%?24?%;color:#fa436a;margin-right:%?10?%;background:#fffafb;border:1px solid #ffb4c7;border-radius:%?4?%;padding:%?4?% %?12?%;line-height:1;width:24px}.address-box .address[data-v-bfd24180]{font-size:%?30?%;color:#303133}.u-box[data-v-bfd24180]{font-size:%?28?%;color:#909399;margin-top:%?16?%}.u-box .name[data-v-bfd24180]{margin-right:%?30?%}.icon-bianji[data-v-bfd24180]{display:flex;align-items:center;height:%?80?%;font-size:%?40?%;color:#909399;padding-left:%?20?%}.add-btn[data-v-bfd24180]{position:fixed;left:%?30?%;right:%?30?%;bottom:%?40?%;z-index:95;display:flex;align-items:center;justify-content:center;width:%?590?%;height:%?80?%;font-size:%?32?%;color:#fff;background-image:linear-gradient(90deg,#ee1d23,#f04023);border-radius:%?40?%;box-shadow:1px 2px 5px rgba(219,63,96,.4)}\n/* 底部栏 */.action-section[data-v-bfd24180]{position:fixed;bottom:%?30?%;margin-left:-15px;z-index:95;display:flex;align-items:center;width:100%;height:%?100?%;padding-left:%?30?%;background:hsla(0,0%,100%,.9);box-shadow:0 0 2px 0 rgba(0,0,0,.5)}.action-section .checkbox[data-v-bfd24180]{height:%?52?%;position:relative}.action-section .checkbox uni-image[data-v-bfd24180]{width:%?45?%;height:100%;position:relative;z-index:5}.action-section .allText[data-v-bfd24180]{position:absolute;left:%?80?%;top:0;z-index:4;width:%?80?%;height:%?52?%;line-height:%?52?%;font-size:16px;color:#666}.action-section .clear-btn[data-v-bfd24180]{position:absolute;left:%?26?%;top:0;z-index:4;width:0;height:%?52?%;line-height:%?52?%;padding-left:%?38?%;font-size:%?28?%;color:#fff;background:#c0c4cc;border-radius:0 50px 50px 0;opacity:0;transition:.2s}.action-section .clear-btn.show[data-v-bfd24180]{opacity:1;width:%?120?%}.action-section .total-box[data-v-bfd24180]{flex:1;display:flex;flex-direction:column;text-align:right;padding-right:%?40?%}.action-section .total-box .price[data-v-bfd24180]{font-size:%?32?%;color:#303133}.action-section .total-box .coupon[data-v-bfd24180]{font-size:%?24?%;color:#909399}.action-section .total-box .coupon uni-text[data-v-bfd24180]{color:#303133}.action-section .confirm-btn[data-v-bfd24180]{padding:0 %?38?%;height:%?100?%;line-height:%?100?%;font-size:%?30?%;background:#ee1d23;border-radius:0;box-shadow:1px 2px 5px rgba(217,60,93,.72)}\n/* 复选框选中状态 */.action-section .checkbox.checked[data-v-bfd24180],\n.cart-item .checkbox.checked[data-v-bfd24180]{color:#ee1d23;font-size:20px}',""]),t.exports=e},"790c":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uCheckboxGroup:i("b7fc").default,uCheckbox:i("264e").default,xwEmpty:i("6ae3").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[t._l(t.couponList,(function(e,n){return t.couponList.length>0?i("v-uni-view",{key:n,staticClass:"coupon-wrap",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.checkInvoice(e)}}},[i("v-uni-view",{staticClass:"coupon-item"},[i("v-uni-view",{staticClass:"con"},[t.isCheck?i("u-checkbox-group",[i("u-checkbox",{staticStyle:{transform:"scale(1.2)"},attrs:{name:e.id,"active-color":"red"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.checkboxChange.apply(void 0,arguments)}},model:{value:e.checked,callback:function(i){t.$set(e,"checked",i)},expression:"item.checked"}})],1):t._e(),i("v-uni-view",{staticClass:"left"},["不开发票"===e.invoice_title?i("v-uni-text",{staticClass:"title"},[t._v(t._s(e.invoice_title))]):i("v-uni-text",{staticClass:"title"},[t._v("发票抬头："+t._s(e.invoice_title))]),e.invoice_org_code?i("v-uni-text",{staticClass:"time"},[t._v("纳税人识别号："+t._s(e.invoice_org_code))]):t._e(),e.register_address?i("v-uni-text",{staticClass:"time"},[t._v("注册地址："+t._s(e.register_address))]):t._e(),e.invoice_phone?i("v-uni-text",{staticClass:"time"},[t._v("注册电话："+t._s(e.invoice_phone))]):t._e(),e.invoice_bank_code?i("v-uni-text",{staticClass:"time"},[t._v("开户银行账号："+t._s(e.invoice_bank_code))]):t._e(),e.invoice_bank?i("v-uni-text",{staticClass:"time"},[t._v("开户银行："+t._s(e.invoice_bank))]):t._e()],1),t.isCheck||0===e.id?t._e():i("v-uni-text",{staticClass:"yticon icon-user-fankui",on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.addInvoIce("edit",e)}}})],1)],1)],1):t._e()})),0===t.couponList.length?i("v-uni-view",[i("xw-empty",{attrs:{isShow:t.isEmpty,img:"/static/empty/emptyTicket.png",path:"",btnText:"",text:"您暂时还没有添加发票",textColor:"#C0C4CC"}})],1):t._e(),t.isCheck?i("v-uni-view",{staticClass:"action-section"},[i("u-checkbox-group",{staticClass:"checkbox"},[i("u-checkbox",{attrs:{"active-color":"red"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.checkedAll.apply(void 0,arguments)}},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v("全选")])],1),i("v-uni-view",{staticClass:"total-box",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toBack.apply(void 0,arguments)}}},[t._v("取消删除")]),i("v-uni-button",{staticClass:"no-border confirm-btn",attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.condelete(t.selected)}}},[t._v("删除 ("+t._s(t.selected.length)+")")])],1):i("v-uni-button",{staticClass:"add-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addInvoIce("add")}}},[t._v("新增发票")]),i("show-modal")],2)},a=[]},b9b7:function(t,e,i){"use strict";i.r(e);var n=i("790c"),o=i("533c");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("4e5a");var c,d=i("f0c5"),s=Object(d["a"])(o["default"],n["b"],n["c"],!1,null,"bfd24180",null,!1,n["a"],c);e["default"]=s.exports},d8ae:function(t,e,i){"use strict";i.r(e);var n=i("109c"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a}}]);