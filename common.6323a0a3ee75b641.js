"use strict";(self.webpackChunkcap_webview=self.webpackChunkcap_webview||[]).push([[592],{2090:(D,g,u)=>{u.d(g,{gq:()=>l,vj:()=>d,zF:()=>c});var m=u(6676),a=u.n(m);class l{constructor(t){Object.keys(t||{}).forEach(e=>this[e]=t[e])}formatDate(t){return l.formatDate(t)}getMomentDate(t){return a()(t)}getDateObj(t){return this.getMomentDate(t).toDate()}clone(){return new(Object.getPrototypeOf(this).constructor)(JSON.parse(JSON.stringify(this)))}static formatDate(t){const e=a()(t);return e.isValid()?e.format("DD MMM YY"):t}}class d extends l{get(t){return this[t]}isActive(){return"Inactive"!==this.Status}getMobileNumbers(){return(this.Mobile||"").split(/\s+/)}freeTextSearch(t=""){return`${this.Name||""} ${this.Mobile||""} ${this.STB||""} ${this["Own Notes"]||""} ${this.Notes||""}`.toLowerCase().indexOf(t.toLowerCase())>=0}getMonthsInOrder(){if(this._monthsOrder)return this._monthsOrder;let t=Object.keys(this).filter(e=>a()(e).isValid()).map(e=>a()(e).toDate().getTime());return t.sort(),this._monthsOrder=t.map(e=>a()(e).format("MMMYYYY")),this._monthsOrder}getCollectionAgents(){return this.getMonthsInOrder().map(t=>this.getCollectionBy(t)).filter(t=>t).reduce((t,e)=>(t[e]=!0,t),{})}getPendingSettlement(t=!1,e=[]){const r=this.getMonthsInOrder().filter(n=>this[n]&&this.getCollectionDate(n)&&!this.getSettlementDate(n)&&(!e.length||e.some(o=>this.getCollectionBy(n)===o))).reduce((n,o)=>n+(parseInt(this[o]||"0")||0),0);return t?`Rs.${r}/-`:r}getConnectionDate(){return this.formatDate(this["Connection On"]||"")}getCollectionByKey(t){return`${t} Collection By`}getCollectionBy(t){return this[`${t} Collection By`]}getSettlementToKey(t){return`${t} Settlement To`}getSettlementTo(t){return this[`${t} Settlement To`]}getCollectionDateKey(t){return`${t} Collection Date`}getCollectionDate(t){return this[this.getCollectionDateKey(t)]}getCollectionDateStrFormat(t){return this.formatDate(this.getCollectionDate(t))}getSettlementDateKey(t){return`${t} Settlement Date`}getSettlementDate(t){return this[this.getSettlementDateKey(t)]}getSettlementDateStrFormat(t){return this.formatDate(this.getSettlementDate(t))}getNotes(t){return this[`${t} Notes`]}}class c extends l{constructor(t){super(t)}getPatrolDateStr(){return this.formatDate(this.Date)}freeTextSearch(t=""){return`${this.Location||""} ${this.Route||""} ${this.WorkType||""}`.toLowerCase().indexOf(t.toLowerCase())>=0}}},298:(D,g)=>{function a(t,e,r,n){var o={timer:void 0,lastArgs:[]},i=function(){for(var s=this,p=[],h=0;h<arguments.length;h++)p[h]=arguments[h];o.lastArgs=p,o.timer?clearTimeout(o.timer):e&&r.apply(this,o.lastArgs),o.timer=setTimeout(function(){e||r.apply(s,o.lastArgs),o.timer=void 0},t)};return n&&(i=i.bind(n)),i.options=o,i}function c(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(0===r.length)throw new Error("function applied debounce decorator should be a method");if(1===r.length)throw new Error("method applied debounce decorator should have valid name");var o=r[0],i=r[1],s=3===r.length&&r[2]?r[2]:Object.getOwnPropertyDescriptor(o,i);if(s)return function d(t,e,r){return r.value=a(t,e,r.value),r}(t,e,s);!function l(t,e,r,n){var o;Object.defineProperty(r,n,{configurable:!0,enumerable:!1,get:function(){return o},set:function(i){o=a(t,e,i,this)}})}(t,e,o,i)}g.Ds=function f(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=500,n=!1;if(t.length&&("number"==typeof t[0]||"object"==typeof t[0]&&void 0!==t[0].leading)){"number"==typeof t[0]&&(r=t[0]);var o=void 0;return"object"==typeof t[0]&&void 0!==t[0].leading&&(o=t[0]),1<t.length&&"object"==typeof t[1]&&void 0!==t[1].leading&&(o=t[1]),o&&(n=o.leading),function(){for(var i=[],s=0;s<arguments.length;s++)i[s]=arguments[s];return c.apply(void 0,[r,n].concat(i))}}return c.apply(void 0,[r,n].concat(t))}}}]);