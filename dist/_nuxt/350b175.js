(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{1046:function(n,t,o){"use strict";o(532)},1047:function(n,t,o){var e=o(3)((function(i){return i[1]}));e.push([n.i,".markdown{margin-bottom:.9375rem}.markdown pre{font-family:monospace,monospace}.markdown .v-note-op{box-sizing:border-box}.markdown .v-note-edit{min-height:37.5rem}.markdown .v-show-content{background-color:#fbfbfb;color:#000}.markdown .v-show-content pre{color:#fbfbfb}.markdown .v-note-op,.markdown .v-note-panel,.markdown .v-note-wrapper,.markdown textarea{background-color:var(--t2)!important;color:var(--t1)!important}.markdown .v-note-op,.markdown .v-note-panel{border-color:var(--t1)!important}.markdown .btn-list{font-size:0;margin-top:.9375rem}.markdown .btn-list button{margin:0 .9375rem 0 0}",""]),e.locals={},n.exports=e},1255:function(n,t,o){"use strict";o.r(t);var e=o(1038),r=(o(1039),o(467)),l=o.n(r),c=(o(468),o(473)),d={name:"Markdown",components:{mavonEditor:e.mavonEditor},head:function(){return this.$store.state.currentTool.head},data:function(){return{content:"",html:"",markdownOption:{bold:!0},externalLink:!1,isMobile:!1}},mounted:function(){window.innerWidth<700&&(this.isMobile=!0),this.$nextTick((function(){e.mavonEditor.getMarkdownIt().set({highlight:function(n,t){return t&&l.a.getLanguage(t)?l.a.highlight(t,n).value:""}})}))},methods:{downloadHtml:function(){Object(c.a)(this.html,"markdown.html")},downloadMd:function(){Object(c.a)(this.content,"markdown.md")},handleHtml:function(n,t){this.html=t}}},m=d,w=(o(1046),o(2)),component=Object(w.a)(m,(function(){var n=this,t=n._self._c;return t("div",{staticClass:"markdown"},[t("client-only",[t("mavonEditor",{ref:"md",staticClass:"typo",attrs:{"box-shadow":!1,subfield:!0,"default-open":n.isMobile?"edit":"preview","external-link":n.externalLink},on:{change:n.handleHtml},model:{value:n.content,callback:function(t){n.content=t},expression:"content"}})],1),n._v(" "),t("div",{staticClass:"btn-list"},[t("button",{staticClass:"nya-btn",on:{click:n.downloadHtml}},[n._v("\n            下载 HTML 文件\n        ")]),n._v(" "),t("button",{staticClass:"nya-btn",on:{click:n.downloadMd}},[n._v("\n            下载 MD 文件\n        ")])])],1)}),[],!1,null,null,null);t.default=component.exports},473:function(n,t,o){"use strict";t.a=function(content,n){var t=document.createElement("a");t.download=n,t.style.display="none";var o=new Blob([content]);t.href=URL.createObjectURL(o),t.click()}},532:function(n,t,o){var content=o(1047);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[n.i,content,""]]),content.locals&&(n.exports=content.locals);(0,o(4).default)("2d69ea8f",content,!0,{sourceMap:!1})}}]);