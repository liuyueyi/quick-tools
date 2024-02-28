/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{1193:function(e,t,n){var r,o,l;o=[],r=function s(){"use strict";var e="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:{},t=!e.document&&!!e.postMessage,n=e.IS_PAPA_WORKER||!1,a={},u=0,b={parse:function(t,n){var r=(n=n||{}).dynamicTyping||!1;if(w(r)&&(n.dynamicTypingFunction=r,r={}),n.dynamicTyping=r,n.transform=!!w(n.transform)&&n.transform,n.worker&&b.WORKERS_SUPPORTED){var i=function(){if(!b.WORKERS_SUPPORTED)return!1;var t,i,n=(t=e.URL||e.webkitURL||null,i=s.toString(),b.BLOB_URL||(b.BLOB_URL=t.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",i,")();"],{type:"text/javascript"})))),r=new e.Worker(n);return r.onmessage=m,r.id=u++,a[r.id]=r}();return i.userStep=n.step,i.userChunk=n.chunk,i.userComplete=n.complete,i.userError=n.error,n.step=w(n.step),n.chunk=w(n.chunk),n.complete=w(n.complete),n.error=w(n.error),delete n.worker,void i.postMessage({input:t,config:n,workerId:i.id})}var o=null;return b.NODE_STREAM_INPUT,"string"==typeof t?(t=function(e){return 65279===e.charCodeAt(0)?e.slice(1):e}(t),o=n.download?new l(n):new p(n)):!0===t.readable&&w(t.read)&&w(t.on)?o=new g(n):(e.File&&t instanceof File||t instanceof Object)&&(o=new h(n)),o.stream(t)},unparse:function(e,t){var n=!1,r=!0,o=",",l="\r\n",s='"',a=s+s,h=!1,i=null,c=!1;!function(){if("object"==typeof t){if("string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter((function(e){return-1!==t.delimiter.indexOf(e)})).length||(o=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(h=t.skipEmptyLines),"string"==typeof t.newline&&(l=t.newline),"string"==typeof t.quoteChar&&(s=t.quoteChar),"boolean"==typeof t.header&&(r=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");i=t.columns}void 0!==t.escapeChar&&(a=t.escapeChar+s),("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(c=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/)}}();var u=new RegExp(d(s),"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return f(null,e,h);if("object"==typeof e[0])return f(i||Object.keys(e[0]),e,h)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||i),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),f(e.fields||[],e.data||[],h);throw new Error("Unable to serialize unrecognized input");function f(e,t,n){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var h=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(h&&r){for(var a=0;a<e.length;a++)0<a&&(i+=o),i+=m(e[a],a);0<t.length&&(i+=l)}for(var c=0;c<t.length;c++){var u=h?e.length:t[c].length,d=!1,f=h?0===Object.keys(t[c]).length:0===t[c].length;if(n&&!h&&(d="greedy"===n?""===t[c].join("").trim():1===t[c].length&&0===t[c][0].length),"greedy"===n&&h){for(var _=[],v=0;v<u;v++){var y=s?e[v]:v;_.push(t[c][y])}d=""===_.join("").trim()}if(!d){for(var p=0;p<u;p++){0<p&&!f&&(i+=o);var g=h&&s?e[p]:p;i+=m(t[c][g],p)}c<t.length-1&&(!n||0<u&&!f)&&(i+=l)}}return i}function m(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var r=!1;c&&"string"==typeof e&&c.test(e)&&(e="'"+e,r=!0);var i=e.toString().replace(u,a);return(r=r||!0===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var n=0;n<t.length;n++)if(-1<e.indexOf(t[n]))return!0;return!1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(o)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!t&&!!e.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=f,b.ParserHandle=c,b.NetworkStreamer=l,b.FileStreamer=h,b.StringStreamer=p,b.ReadableStreamStreamer=g,e.jQuery){var r=e.jQuery;r.fn.parse=function(t){var n=t.config||{},u=[];return this.each((function(t){if("INPUT"!==r(this).prop("tagName").toUpperCase()||"file"!==r(this).attr("type").toLowerCase()||!e.FileReader||!this.files||0===this.files.length)return!0;for(var o=0;o<this.files.length;o++)u.push({file:this.files[o],inputElem:this,instanceConfig:r.extend({},n)})})),o(),this;function o(){if(0!==u.length){var e,n,o,i,h=u[0];if(w(t.before)){var s=t.before(h.file,h.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",n=h.file,o=h.inputElem,i=s.reason,void(w(t.error)&&t.error({name:e},n,o,i));if("skip"===s.action)return void l();"object"==typeof s.config&&(h.instanceConfig=r.extend(h.instanceConfig,s.config))}else if("skip"===s)return void l()}var a=h.instanceConfig.complete;h.instanceConfig.complete=function(e){w(a)&&a(e,h.file,h.inputElem),l()},b.parse(h.file,h.instanceConfig)}else w(t.complete)&&t.complete()}function l(){u.splice(0,1),o()}}}function o(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=y(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new c(t),(this._handle.streamer=this)._config=t}.call(this,t),this.parseChunk=function(t,r){if(this.isFirstChunk&&w(this._config.beforeFirstChunk)){var o=this._config.beforeFirstChunk(t);void 0!==o&&(t=o)}this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+t;this._partialLine="";var l=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=l.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),l&&l.data&&(this._rowCount+=l.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(n)e.postMessage({results:l,workerId:b.WORKER_ID,finished:a});else if(w(this._config.chunk)&&!r){if(this._config.chunk(l,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);l=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(l.data),this._completeResults.errors=this._completeResults.errors.concat(l.errors),this._completeResults.meta=l.meta),this._completed||!a||!w(this._config.complete)||l&&l.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||l&&l.meta.paused||this._nextChunk(),l}this._halted=!0},this._sendError=function(t){w(this._config.error)?this._config.error(t):n&&this._config.error&&e.postMessage({workerId:b.WORKER_ID,error:t,finished:!1})}}function l(e){var i;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),o.call(this,e),this._nextChunk=t?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),t||(i.onload=k(this._chunkLoaded,this),i.onerror=k(this._chunkError,this)),i.open(this._config.downloadRequestBody?"POST":"GET",this._input,!t),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var n in e)i.setRequestHeader(n,e[n])}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r)}try{i.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}t&&0===i.status&&this._chunkError()}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:i.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substring(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)))},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t))}}function h(e){var i,t;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),o.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,t=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=k(this._chunkLoaded,this),i.onerror=k(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=t.call(e,this._start,n)}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(i.error)}}function p(e){var t;o.call(this,e=e||{}),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,n=this._config.chunkSize;return n?(e=t.substring(0,n),t=t.substring(n)):(e=t,t=""),this._finished=!t,this.parseChunk(e)}}}function g(e){o.call(this,e=e||{});var t=[],n=!0,i=!1;this.pause=function(){o.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){o.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):n=!0},this._streamData=k((function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),n&&(n=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}}),this),this._streamError=k((function(e){this._streamCleanUp(),this._sendError(e)}),this),this._streamEnd=k((function(){this._streamCleanUp(),i=!0,this._streamData("")}),this),this._streamCleanUp=k((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function c(e){var a,t,u,i=Math.pow(2,53),n=-i,s=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,r=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,o=this,l=0,h=0,c=!1,m=!1,_=[],v={data:[],errors:[],meta:{}};if(w(e.step)){var p=e.step;e.step=function(n){if(v=n,E())g();else{if(g(),0===v.data.length)return;l+=n.data.length,e.preview&&l>e.preview?t.abort():(v.data=v.data[0],p(v,o))}}}function k(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function g(){return v&&u&&(S("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),u=!1),e.skipEmptyLines&&(v.data=v.data.filter((function(e){return!k(e)}))),E()&&function(){if(v)if(Array.isArray(v.data[0])){for(var t=0;E()&&t<v.data.length;t++)v.data[t].forEach(n);v.data.splice(0,1)}else v.data.forEach(n);function n(t,n){w(e.transformHeader)&&(t=e.transformHeader(t,n)),_.push(t)}}(),function(){if(!v||!e.header&&!e.dynamicTyping&&!e.transform)return v;function t(t,n){var r,i=e.header?{}:[];for(r=0;r<t.length;r++){var o=r,s=t[r];e.header&&(o=r>=_.length?"__parsed_extra":_[r]),e.transform&&(s=e.transform(s,o)),s=C(o,s),"__parsed_extra"===o?(i[o]=i[o]||[],i[o].push(s)):i[o]=s}return e.header&&(r>_.length?S("FieldMismatch","TooManyFields","Too many fields: expected "+_.length+" fields but parsed "+r,h+n):r<_.length&&S("FieldMismatch","TooFewFields","Too few fields: expected "+_.length+" fields but parsed "+r,h+n)),i}var n=1;return!v.data.length||Array.isArray(v.data[0])?(v.data=v.data.map(t),n=v.data.length):v.data=t(v.data,0),e.header&&v.meta&&(v.meta.fields=_),h+=n,v}()}function E(){return e.header&&0===_.length}function C(t,o){return l=t,e.dynamicTypingFunction&&void 0===e.dynamicTyping[l]&&(e.dynamicTyping[l]=e.dynamicTypingFunction(l)),!0===(e.dynamicTyping[l]||e.dynamicTyping)?"true"===o||"TRUE"===o||"false"!==o&&"FALSE"!==o&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<i)return!0}return!1}(o)?parseFloat(o):r.test(o)?new Date(o):""===o?null:o):o;var l}function S(e,t,n,i){var r={type:e,code:t,message:n};void 0!==i&&(r.row=i),v.errors.push(r)}this.parse=function(n,r,o){var i=e.quoteChar||'"';if(e.newline||(e.newline=function(e,t){e=e.substring(0,1048576);var n=new RegExp(d(t)+"([^]*?)"+d(t),"gm"),i=(e=e.replace(n,"")).split("\r"),r=e.split("\n"),s=1<r.length&&r[0].length<i[0].length;if(1===i.length||s)return"\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(n,i)),u=!1,e.delimiter)w(e.delimiter)&&(e.delimiter=e.delimiter(n),v.meta.delimiter=e.delimiter);else{var l=function(t,n,r,i,o){var s,a,l,u;o=o||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var h=0;h<o.length;h++){var c=o[h],d=0,m=0,_=0;l=void 0;for(var p=new f({comments:i,delimiter:c,newline:n,preview:10}).parse(t),g=0;g<p.data.length;g++)if(r&&k(p.data[g]))_++;else{var v=p.data[g].length;m+=v,void 0!==l?0<v&&(d+=Math.abs(v-l),l=v):l=v}0<p.data.length&&(m/=p.data.length-_),(void 0===a||d<=a)&&(void 0===u||u<m)&&1.99<m&&(a=d,s=c,u=m)}return{successful:!!(e.delimiter=s),bestDelimiter:s}}(n,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess);l.successful?e.delimiter=l.bestDelimiter:(u=!0,e.delimiter=b.DefaultDelimiter),v.meta.delimiter=e.delimiter}var s=y(e);return e.preview&&e.header&&s.preview++,a=n,t=new f(s),v=t.parse(a,r,o),g(),c?{meta:{paused:!0}}:v||{meta:{paused:!1}}},this.paused=function(){return c},this.pause=function(){c=!0,t.abort(),a=w(e.chunk)?"":a.substring(t.getCharIndex())},this.resume=function(){o.streamer._halted?(c=!1,o.streamer.parseChunk(a,!0)):setTimeout(o.resume,3)},this.aborted=function(){return m},this.abort=function(){m=!0,t.abort(),v.meta.aborted=!0,w(e.complete)&&e.complete(v),a=""}}function d(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function f(e){var t,n=(e=e||{}).delimiter,r=e.newline,o=e.comments,q=e.step,l=e.preview,h=e.fastMode,c=t=void 0===e.quoteChar||null===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(c=e.escapeChar),("string"!=typeof n||-1<b.BAD_DELIMITERS.indexOf(n))&&(n=","),o===n)throw new Error("Comment character same as delimiter");!0===o?o="#":("string"!=typeof o||-1<b.BAD_DELIMITERS.indexOf(o))&&(o=!1),"\n"!==r&&"\r"!==r&&"\r\n"!==r&&(r="\n");var f=0,m=!1;this.parse=function(i,_,v){if("string"!=typeof i)throw new Error("Input must be a string");var y=i.length,k=n.length,s=r.length,a=o.length,E=w(q),u=[],C=[],S=[],R=f=0;if(!i)return J();if(e.header&&!_){var x=i.split(r)[0].split(n),O=[],p={},g=!1;for(var T in x){var A=x[T];w(e.transformHeader)&&(A=e.transformHeader(A,T));var I=A,F=p[A]||0;for(0<F&&(g=!0,I=A+"_"+F),p[A]=F+1;O.includes(I);)I=I+"_"+F;O.push(I)}if(g){var D=i.split(r);D[0]=O.join(n),i=D.join(r)}}if(h||!1!==h&&-1===i.indexOf(t)){for(var b=i.split(r),L=0;L<b.length;L++){if(S=b[L],f+=S.length,L!==b.length-1)f+=r.length;else if(v)return J();if(!o||S.substring(0,a)!==o){if(E){if(u=[],N(S.split(n)),Q(),m)return J()}else N(S.split(n));if(l&&l<=L)return u=u.slice(0,l),J(!0)}}return J()}for(var M=i.indexOf(n,f),j=i.indexOf(r,f),z=new RegExp(d(c)+d(t),"g"),P=i.indexOf(t,f);;)if(i[f]!==t)if(o&&0===S.length&&i.substring(f,f+a)===o){if(-1===j)return J();f=j+s,j=i.indexOf(r,f),M=i.indexOf(n,f)}else if(-1!==M&&(M<j||-1===j))S.push(i.substring(f,M)),f=M+k,M=i.indexOf(n,f);else{if(-1===j)break;if(S.push(i.substring(f,j)),H(j+s),E&&(Q(),m))return J();if(l&&u.length>=l)return J(!0)}else for(P=f,f++;;){if(-1===(P=i.indexOf(t,P+1)))return v||C.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:u.length,index:f}),W();if(P===y-1)return W(i.substring(f,P).replace(z,t));if(t!==c||i[P+1]!==c){if(t===c||0===P||i[P-1]!==c){-1!==M&&M<P+1&&(M=i.indexOf(n,P+1)),-1!==j&&j<P+1&&(j=i.indexOf(r,P+1));var U=K(-1===j?M:Math.min(M,j));if(i.substr(P+1+U,k)===n){S.push(i.substring(f,P).replace(z,t)),i[f=P+1+U+k]!==t&&(P=i.indexOf(t,f)),M=i.indexOf(n,f),j=i.indexOf(r,f);break}var B=K(j);if(i.substring(P+1+B,P+1+B+s)===r){if(S.push(i.substring(f,P).replace(z,t)),H(P+1+B+s),M=i.indexOf(n,f),P=i.indexOf(t,f),E&&(Q(),m))return J();if(l&&u.length>=l)return J(!0);break}C.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:u.length,index:f}),P++}}else P++}return W();function N(e){u.push(e),R=f}function K(e){var t=0;if(-1!==e){var n=i.substring(P+1,e);n&&""===n.trim()&&(t=n.length)}return t}function W(e){return v||(void 0===e&&(e=i.substring(f)),S.push(e),f=y,N(S),E&&Q()),J()}function H(e){f=e,N(S),S=[],j=i.indexOf(r,f)}function J(e){return{data:u,errors:C,meta:{delimiter:n,linebreak:r,aborted:m,truncated:!!e,cursor:R+(_||0)}}}function Q(){q(J()),u=[],C=[]}},this.abort=function(){m=!0},this.getCharIndex=function(){return f}}function m(e){var t=e.data,n=a[t.workerId],i=!1;if(t.error)n.userError(t.error,t.file);else if(t.results&&t.results.data){var r={abort:function(){i=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(w(n.userStep)){for(var s=0;s<t.results.data.length&&(n.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},r),!i);s++);delete t.results}else w(n.userChunk)&&(n.userChunk(t.results,r,t.file),delete t.results)}t.finished&&!i&&_(t.workerId,t.results)}function _(e,t){var n=a[e];w(n.userComplete)&&n.userComplete(t),n.terminate(),delete a[e]}function v(){throw new Error("Not implemented.")}function y(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var n in e)t[n]=y(e[n]);return t}function k(e,t){return function(){e.apply(t,arguments)}}function w(e){return"function"==typeof e}return n&&(e.onmessage=function(t){var n=t.data;if(void 0===b.WORKER_ID&&n&&(b.WORKER_ID=n.workerId),"string"==typeof n.input)e.postMessage({workerId:b.WORKER_ID,results:b.parse(n.input,n.config),finished:!0});else if(e.File&&n.input instanceof File||n.input instanceof Object){var r=b.parse(n.input,n.config);r&&e.postMessage({workerId:b.WORKER_ID,results:r,finished:!0})}}),(l.prototype=Object.create(o.prototype)).constructor=l,(h.prototype=Object.create(o.prototype)).constructor=h,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(o.prototype)).constructor=g,b},void 0===(l="function"==typeof r?r.apply(t,o):r)||(e.exports=l)},1194:function(e,t,n){"use strict";n(570)},1195:function(e,t,n){var r=n(3)((function(i){return i[1]}));r.push([e.i,".table_format .no-border{border:0 solid #ced4da}",""]),r.locals={},e.exports=r},1279:function(e,t,n){"use strict";n.r(t);var r,o=n(52),l=n(1193),h=n.n(l),c={name:"TableFormat",components:{Dynamic:o.a},data:function(){return{selectFile:!0,n:"",file:"",tableString:"",results:"",index:0,inProcess:!1,labels:[{label:"数字转字符串",desc:"避免长数字在excel打开时，最后几位显示0或科学计算显示问题"}]}},watch:{index:function(){this.tableFormat()},tableString:function(){this.tableString.trim()!==r&&(r=this.tableString.trim(),this.tableString=r,this.tableFormat())}},methods:{updateChooseFile:function(){this.selectFile=!this.selectFile},handleChange:function(e){var t=this,n=e.target.files;if(!n.length)return!1;var r=n[0];this.file=r;var o=new FileReader;o.readAsText(r,"utf-8"),this.tableString="",o.onload=function(e){t.tableString=e.target.result}},tableFormat:function(){if(this.tableString){var e=h.a.parse(this.tableString);console.log(e);var t="",n=0;e.data.forEach((function(i){t+=0===n?'"'+i.join('","')+'"\n':"'"+i.join("','")+"'\n",n+=1})),this.results=t}},download:function(){function e(e,t,n){var r=document,o=arguments,a=r.createElement("a"),l=o[1];if(a.href="data:"+n+"charset=utf-8,"+escape(e),window.MSBlobBuilder){var h=new MSBlobBuilder;return h.append(e),navigator.msSaveBlob(h,t)}if("download"in a)return a.setAttribute("download",l),a.innerHTML="downloading...",r.body.appendChild(a),setTimeout((function(){var e=r.createEvent("MouseEvents");e.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),a.dispatchEvent(e),r.body.removeChild(a)}),66),!0;var c=r.createElement("iframe");return r.body.appendChild(c),c.src="data:"+(o[2]?o[2]:"application/octet-stream")+(window.btoa?";base64":"")+","+(window.btoa?window.btoa:escape)(e),setTimeout((function(){r.body.removeChild(c)}),333),!0}try{this.inProcess=!0,e(this.results,"res.csv","text/plain"),this.inProcess=!1}catch(e){this.inProcess=!1}}}},d=c,f=(n(1194),n(2)),component=Object(f.a)(d,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"table_format"},[t("nya-container",{attrs:{title:"CSV格式化"}},[t("div",{staticClass:"nya-subtitle mt-15"},[t("nya-checkbox",{attrs:{checked:e.selectFile,label:"上传csv文件"},on:{change:e.updateChooseFile}}),e._v(" "),t("nya-radio-group",{model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},[e._l(e.labels,(function(label,i){return t("nya-radio",{key:i,staticClass:"mr-15",attrs:{value:i,label:label.label}})})),e._v(" "),t("small",[e._v(" "+e._s(e.labels[e.index].desc)+" ")])],2)],1),e._v(" "),e.selectFile?t("nya-input",{staticClass:"upfile op-margin-2em",attrs:{type:"file",accept:"*/*.csv",placeholder:"点击这里上传文件（取消复选框，可直接在输入框中粘贴csv文本）"},on:{change:e.handleChange},model:{value:e.n,callback:function(t){e.n=t},expression:"n"}}):t("nya-input",{staticClass:"top-margin-2em",attrs:{className:"mb-15",fullwidth:"",rows:"10",type:"textarea",autofocus:"",autocomplete:"off",label:"请输入csv格式数据",placeholder:"id ,uname ,age\n1,yihui, 18\n2,一灰灰,19\n3,yihui,20\n"},model:{value:e.tableString,callback:function(t){e.tableString=t},expression:"tableString"}})],1),e._v(" "),e.results.length?t("nya-container",{attrs:{title:"转换结果"}},[t("button",{staticClass:"btn btn-primary",on:{click:e.download}},[e._v("\n                "+e._s(this.inProcess?"正在保存,请等待...":"下载")+"\n            ")]),e._v(" "),t("nya-copy",{attrs:{copy:e.results}},[t("pre",[e._v("  "),t("Dynamic",{attrs:{template:e.results}}),e._v(" ")],1)])],1):e._e(),e._v(" "),t("nya-foot-info",{attrs:{title:"Tips"}},[t("li",[e._v("\n                插件源码："),t("a",{attrs:{href:"https://github.com/liuyueyi/quick-jsdemo",target:"_blank",rel:"noopener noreferrer"}},[e._v("quick-jsdemo")]),e._v(" 表格数据格式化\n            ")])])],1)}),[],!1,null,null,null);t.default=component.exports},570:function(e,t,n){var content=n(1195);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(4).default)("2c290434",content,!0,{sourceMap:!1})}}]);