(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-share-share"],{"08ba":function(t,e,n){"use strict";var i=n("ad45"),a=n.n(i);a.a},3734:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,"uni-page-body[data-v-33c7b47e]{background-color:#e82222;width:100%;height:100%}body.?%PAGE?%[data-v-33c7b47e]{background-color:#e82222}",""]),t.exports=e},"3b1c":function(t,e,n){var i=n("3734");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("6398ce05",i,!0,{sourceMap:!1,shadowMode:!1})},"3f61":function(t,e,n){"use strict";(function(t){n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{transform:"translateY(50vh)",timer:0,backgroundColor:"rgba(0,0,0,0)",show:!1,config:{}}},props:{contentHeight:{type:Number,default:0},hasTabbar:{type:Boolean,default:!1},shareList:{type:Array,default:function(){return[]}}},created:function(){var t=uni.upx2px(this.contentHeight)+"px";this.config={height:t,transform:"translateY(".concat(t,")"),backgroundColor:"rgba(0,0,0,.4)"},this.transform=this.config.transform},methods:{toggleMask:function(){var t=this;if(1!=this.timer){if(this.timer=1,setTimeout((function(){t.timer=0}),500),this.show)return this.transform=this.config.transform,this.backgroundColor="rgba(0,0,0,0)",void setTimeout((function(){t.show=!1,t.hasTabbar&&uni.showTabBar()}),200);this.show=!0,this.hasTabbar?uni.hideTabBar({success:function(){setTimeout((function(){t.backgroundColor=t.config.backgroundColor,t.transform="translateY(0px)"}),10)}}):setTimeout((function(){t.backgroundColor=t.config.backgroundColor,t.transform="translateY(0px)"}),10)}},stopPrevent:function(){},shareToFriend:function(e){t("log",e," at components/share.vue:113"),"微信好友"===e?uni.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://uniapp.dcloud.io/",title:"uni-app分享",summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",imageUrl:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",success:function(e){t("log","success:"+JSON.stringify(e)," at components/share.vue:124")},fail:function(e){t("log","fail:"+JSON.stringify(e)," at components/share.vue:127")}}):"朋友圈"===e&&uni.share({provider:"weixin",scene:"WXSenceTimeline",type:0,href:"http://uniapp.dcloud.io/",title:"uni-app分享",summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",imageUrl:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",success:function(e){t("log","success:"+JSON.stringify(e)," at components/share.vue:140")},fail:function(e){t("log","fail:"+JSON.stringify(e)," at components/share.vue:143")}}),this.toggleMask()}}};e.default=i}).call(this,n("0de9")["log"])},"493d":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("v-uni-view",{staticClass:"mask",style:{backgroundColor:t.backgroundColor},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggleMask.apply(void 0,arguments)},touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.stopPrevent.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"mask-content",style:[{height:t.config.height,transform:t.transform}],on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.stopPrevent.apply(void 0,arguments)}}},[n("v-uni-scroll-view",{staticClass:"view-content",attrs:{"scroll-y":!0}},[n("v-uni-view",{staticClass:"share-header"},[t._v("分享到")]),n("v-uni-view",{staticClass:"share-list"},t._l(t.shareList,(function(e,i){return n("v-uni-view",{key:i,staticClass:"share-item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.shareToFriend(e.text)}}},[n("v-uni-image",{attrs:{src:e.icon,mode:""}}),n("v-uni-text",[t._v(t._s(e.text))])],1)})),1)],1),n("v-uni-view",{staticClass:"bottom b-t",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggleMask.apply(void 0,arguments)}}},[t._v("取消")])],1)],1):t._e()},r=[]},6613:function(t,e,n){"use strict";n.r(e);var i=n("493d"),a=n("db54");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("08ba");var o,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"8e2fe502",null,!1,i["a"],o);e["default"]=c.exports},"7fa5":function(t,e,n){"use strict";var i=n("3b1c"),a=n.n(i);a.a},"9e1b":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticStyle:{height:"300upx","line-height":"300upx","text-align":"center"}},[n("v-uni-text",{staticStyle:{color:"#fff","font-size":"32upx","font-weight":"100"}},[t._v("行丰商城App,购物高效又轻松！")])],1),n("v-uni-view",{staticStyle:{width:"100%",height:"300px","text-align":"center","padding-left":"80upx"}},[n("v-uni-image",{staticStyle:{width:"200px",height:"100%"},attrs:{src:"/static/app.png",mode:""}})],1),n("v-uni-view",{staticStyle:{width:"100%",height:"60px","text-align":"center","margin-top":"100upx"}},[n("v-uni-button",{staticStyle:{width:"200px",color:"#fff","border-color":"#fff","border-radius":"30px"},attrs:{type:"default",plain:"true"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.shareInfo.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"yticon icon-fenxiang2"}),n("v-uni-text",{staticStyle:{"margin-left":"10Px"}},[t._v("分享给好友")])],1)],1),n("shares",{ref:"share",attrs:{contentHeight:580,shareList:t.shareList}})],1)},r=[]},a54d:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* uni.scss */\n/* 主题色 */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/* 页面左右间距 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 背景颜色 */\n/* 行为相关颜色 */.mask[data-v-8e2fe502]{position:fixed;left:0;top:0;right:0;bottom:0;display:flex;justify-content:center;align-items:flex-end;z-index:998;transition:.3s}.mask .bottom[data-v-8e2fe502]{position:absolute;left:0;bottom:0;display:flex;justify-content:center;align-items:center;width:100%;height:%?90?%;background:#fff;z-index:9;font-size:%?30?%;color:#303133}.mask-content[data-v-8e2fe502]{width:100%;height:%?580?%;transition:.3s;background:#fff}.mask-content.has-bottom[data-v-8e2fe502]{padding-bottom:%?90?%}.mask-content .view-content[data-v-8e2fe502]{height:100%}.share-header[data-v-8e2fe502]{height:%?110?%;font-size:%?30?%;color:font-color-dark;display:flex;align-items:center;justify-content:center;padding-top:%?10?%}.share-header[data-v-8e2fe502]:before, .share-header[data-v-8e2fe502]:after{content:"";width:%?240?%;heighg:0;border-top:1px solid #e4e7ed;-webkit-transform:scaleY(.5);transform:scaleY(.5);margin-right:%?30?%}.share-header[data-v-8e2fe502]:after{margin-left:%?30?%;margin-right:0}.share-list[data-v-8e2fe502]{display:flex;flex-wrap:wrap}.share-item[data-v-8e2fe502]{min-width:33.33%;display:flex;flex-direction:column;justify-content:center;align-items:center;height:%?180?%}.share-item uni-image[data-v-8e2fe502]{width:%?80?%;height:%?80?%;margin-bottom:%?16?%}.share-item uni-text[data-v-8e2fe502]{font-size:%?28?%;color:#606266}',""]),t.exports=e},ab7e:function(t,e,n){"use strict";(function(t){var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var a=i(n("1da1")),r=i(n("6613")),o=i(n("ccf1")),s={data:function(){return{shareObj:{shareMenu:""},shareList:[]}},components:{shares:r.default},onLoad:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.json("shareList");case 2:t.shareList=e.sent;case 3:case"end":return e.stop()}}),e)})))()},methods:{shareInfo:function(){var e=this,n={href:"http://m.hfyt365.com/#/pages/appdown/appdown",title:"行丰商城App",desc:"行丰商城App,购物高效又轻松！",imgUrl:"../../static/tag.png"},i=[{icon:"/static/sharemenu/wx.png",text:"微信好友"},{icon:"/static/sharemenu/pyq.png",text:"朋友圈"},{icon:"/static/sharemenu/qq.png",text:"QQ"},{icon:"/static/sharemenu/copy.png",text:"复制"},{icon:"/static/sharemenu/more.png",text:"更多"}];this.shareObj=(0,o.default)(n,i,(function(e){t("log","点击按钮的序号: "+e," at pages/share/share.vue:82");var i={href:n.href||"",title:n.title||"",summary:n.desc||"",success:function(e){t("log","success:"+JSON.stringify(e)," at pages/share/share.vue:88")},fail:function(e){t("log","fail:"+JSON.stringify(e)," at pages/share/share.vue:91")}};switch(e){case 0:i.provider="weixin",i.scene="WXSceneSession",i.type=0,i.imageUrl=n.imgUrl||"",uni.share(i);break;case 1:i.provider="weixin",i.scene="WXSenceTimeline",i.type=0,i.imageUrl=n.imgUrl||"",uni.share(i);break;case 2:i.provider="qq",i.type=1,i.imageUrl=n.imgUrl||"",uni.share(i);break;case 3:uni.setClipboardData({data:n.href,complete:function(){uni.showToast({title:"已复制到剪贴板"})}});break;case 4:plus.share.sendWithSystem({type:"web",title:n.title||"",thumbs:[n.imgUrl||""],href:n.href||"",content:n.desc||""});break}})),this.$nextTick((function(){e.shareObj.alphaBg.show(),e.shareObj.shareMenu.show()}))}}};e.default=s}).call(this,n("0de9")["log"])},ad45:function(t,e,n){var i=n("a54d");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("40eca6e8",i,!0,{sourceMap:!1,shadowMode:!1})},be68:function(t,e,n){"use strict";n.r(e);var i=n("ab7e"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},ccf1:function(t,e,n){"use strict";function i(t,e,n){var i=plus.screen.resolutionWidth,a=25,r=25,o=55,s=55,c=10,u=12,l=Math.floor(i/(o+r)),f=(i-(o+r)*l-r)/(l+1),h=r+f,d=o+h,p=s+c+u+a,g=s+c,v=new plus.nativeObj.View("alphaBg",{top:"0px",left:"0px",height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,0.5)"});v.addEventListener("click",(function(){v.hide(),m.hide()}));var m=new plus.nativeObj.View("shareMenu",{bottom:"0px",left:"0px",height:Math.ceil(e.length/l)*p+a+44+1+"px",width:"100%",backgroundColor:"rgb(255,255,255)"});return m.draw([{tag:"rect",color:"#e7e7e7",position:{top:"0px",height:"1px"}},{tag:"font",id:"sharecancel",text:"取消分享",textStyles:{size:"14px"},position:{bottom:"0px",height:"44px"}},{tag:"rect",color:"#e7e7e7",position:{bottom:"45px",height:"1px"}}]),e.map((function(t,e){var n=(new Date).getTime(),i=Math.floor(e/l),r=e%l,s=[{src:t.icon,id:1e3*Math.random()+n,tag:"img",position:{top:i*p+a,left:r*d+h,width:o,height:o}},{text:t.text,id:1e3*Math.random()+n,tag:"font",textStyles:{size:u},position:{top:i*p+g,left:r*d+h,width:o,height:o}}];m.draw(s)})),m.addEventListener("click",(function(t){if(t.screenY>plus.screen.resolutionHeight-44)v.hide(),m.hide();else if(t.clientX<5||t.clientX>i-5||t.clientY<5);else{var e=t.clientX,a=t.clientY,r=Math.floor(e/d),o=Math.floor(a/p),s=r+o*l;n&&n(s)}})),{alphaBg:v,shareMenu:m}}n("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i;e.default=a},db54:function(t,e,n){"use strict";n.r(e);var i=n("3f61"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},e2600:function(t,e,n){"use strict";n.r(e);var i=n("9e1b"),a=n("be68");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("7fa5");var o,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"33c7b47e",null,!1,i["a"],o);e["default"]=c.exports}}]);