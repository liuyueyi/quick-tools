(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{1013:function(t,e,n){"use strict";n(521)},1014:function(t,e,n){var r=n(3)((function(i){return i[1]}));r.push([t.i,".relatives_name .set{margin-bottom:.3125rem}.relatives_name .set .nya-checkbox{margin-right:.625rem}.relatives_name .btn-list{font-size:0}@media(max-width:400px){.relatives_name .btn-list{margin-bottom:.625rem}}.relatives_name .nya-btn{margin-bottom:.9375rem;margin-right:.9375rem}@media(max-width:400px){.relatives_name .nya-btn{margin-bottom:.625rem;margin-right:.625rem}}@media(max-width:350px){.relatives_name .nya-btn{margin-bottom:.3125rem;margin-right:.3125rem}}",""]),r.locals={},t.exports=r},1247:function(t,e,n){"use strict";n.r(e);n(134);var r=n(1012),o=n.n(r),l={name:"RelativesName",head:function(){return this.$store.state.currentTool.head},data:function(){return{data:[],sex:0,type:"default",reverse:!1,chain:""}},computed:{content:{set:function(t){if(!t)return this.data=[],!1;this.data=t.split("的")},get:function(){return this.data.join("的")}},result:function(){var t=o()({text:"default"===this.type?this.content:this.chain,sex:this.sex,type:this.type,reverse:this.reverse});return t.length?t.join("\n"):"你们之间真的有关系吗？男的就叫姐姐，女的就叫阿姨吧~"}}},c=(n(1013),n(2)),component=Object(c.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"relatives_name"},[e("nya-container",{attrs:{title:"亲戚称谓&关系计算器"}},[e("nya-select",{staticClass:"mb-15",attrs:{fullwidth:"",items:{default:"算称谓",chain:"找关系"},label:"选择处理方式"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}}),t._v(" "),e("nya-input",{directives:[{name:"show",rawName:"v-show",value:"default"===t.type,expression:"type === 'default'"}],staticClass:"mb-15",attrs:{fullwidth:"",autofocus:"",autocomplete:"off",label:"要找的称谓",placeholder:"如：爸爸的儿子的女儿"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),t._v(" "),e("nya-input",{directives:[{name:"show",rawName:"v-show",value:!("default"===t.type),expression:"!(type === 'default')"}],staticClass:"mb-15",attrs:{fullwidth:"",autofocus:"",autocomplete:"off",label:"要找的关系",placeholder:"如：奶奶"},model:{value:t.chain,callback:function(e){t.chain=e},expression:"chain"}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:"default"===t.type,expression:"type === 'default'"}],staticClass:"btn-list"},[e("div",{staticClass:"nya-subtitle"},[t._v("\n                点击添加关系\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("爸爸")}}},[t._v("\n                父\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("妈妈")}}},[t._v("\n                母\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("老公")}}},[t._v("\n                夫\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("老婆")}}},[t._v("\n                妻\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("儿子")}}},[t._v("\n                子\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("女儿")}}},[t._v("\n                女\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("哥哥")}}},[t._v("\n                兄\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("弟弟")}}},[t._v("\n                弟\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("姐姐")}}},[t._v("\n                姐\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.push("妹妹")}}},[t._v("\n                妹\n            ")]),t._v(" "),e("button",{staticClass:"nya-btn",attrs:{type:"button"},on:{click:function(e){return t.data.pop()}}},[e("i",{staticClass:"eva eva-arrow-back-outline"})])]),t._v(" "),e("nya-checkbox",{directives:[{name:"show",rawName:"v-show",value:"default"===t.type,expression:"type === 'default'"}],staticClass:"mb-15",attrs:{label:"对方称呼我"},model:{value:t.reverse,callback:function(e){t.reverse=e},expression:"reverse"}}),t._v(" "),e("br"),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:"default"===t.type,expression:"type === 'default'"}]},[e("nya-radio-group",{model:{value:t.sex,callback:function(e){t.sex=e},expression:"sex"}},[e("nya-radio",{attrs:{value:0,label:"我是女的"}}),t._v(" "),e("nya-radio",{attrs:{value:1,label:"我是男的"}})],1)],1)],1),t._v(" "),("default"===t.type?t.data.length:t.chain)?e("nya-container",{attrs:{title:"获取成功"}},[e("pre",[t._v(t._s(t.result))])]):t._e(),t._v(" "),e("nya-foot-info",{attrs:{title:"Tips"}},[e("li",[t._v("如果有多个结果说明有多个称谓")]),t._v(" "),e("li",[t._v("\n            称谓歧义可到 "),e("a",{attrs:{href:"https://github.com/mumuy/relationship",target:"_blank",rel:"noopener noreferrer"}},[t._v("\n            relationship\n        ")]),t._v(" 进行反馈\n        ")]),t._v(" "),e("li",[t._v("\n            算法来自 "),e("a",{attrs:{href:"https://github.com/mumuy/relationship",target:"_blank",rel:"noopener noreferrer"}},[t._v("\n            relationship\n        ")])])])],1)}),[],!1,null,null,null);e.default=component.exports},521:function(t,e,n){var content=n(1014);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(4).default)("6d14233a",content,!0,{sourceMap:!1})}}]);