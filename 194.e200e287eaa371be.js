"use strict";(self.webpackChunkcap_webview=self.webpackChunkcap_webview||[]).push([[194],{7194:(J,l,o)=>{o.r(l),o.d(l,{MaintenanceComponent:()=>p,MaintenanceModule:()=>S,MaintenanceRoutingModule:()=>f});var s=o(5861),h=o(1894),c=o(8445),m=o(2104),t=o(5879),d=o(6814),u=o(2296),C=o(617);function T(n,r){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"button",2),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.clearData())}),t._uU(2,"Clear Data"),t.qZA(),t.BQk()}}function x(n,r){1&n&&t.GkF(0)}const _=function(n){return{$implicit:n}};function M(n,r){if(1&n&&(t.TgZ(0,"mat-tree-node",7),t._UZ(1,"button",8),t.YNc(2,x,1,0,"ng-container",9),t.qZA()),2&n){const e=r.$implicit;t.oxw(3);const a=t.MAs(3);t.xp6(2),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(2,_,e))}}function v(n,r){1&n&&t.GkF(0)}function N(n,r){if(1&n&&(t.TgZ(0,"mat-tree-node",7)(1,"button",10)(2,"mat-icon",11),t._uU(3),t.qZA()(),t.YNc(4,v,1,0,"ng-container",9),t.qZA()),2&n){const e=r.$implicit,a=t.oxw(3),i=t.MAs(3);t.xp6(3),t.Oqu(a.treeControl.isExpanded(e)?"expand_more":"chevron_right"),t.xp6(1),t.Q6J("ngTemplateOutlet",i)("ngTemplateOutletContext",t.VKq(3,_,e))}}function y(n,r){if(1&n&&(t.TgZ(0,"mat-tree",4),t.YNc(1,M,3,4,"mat-tree-node",5),t.YNc(2,N,5,5,"mat-tree-node",6),t.qZA()),2&n){const e=t.oxw(2);t.Q6J("dataSource",e.dataSource)("treeControl",e.treeControl),t.xp6(2),t.Q6J("matTreeNodeDefWhen",e.hasChild)}}function O(n,r){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"button",2),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.listDir())}),t._uU(2,"List"),t.qZA(),t.YNc(3,y,3,3,"mat-tree",3),t.BQk()}if(2&n){const e=t.oxw();t.xp6(3),t.Q6J("ngIf",null==e.dataSource||null==e.dataSource.data?null:e.dataSource.data.length)}}function Z(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",12)(1,"span",13),t._uU(2),t.qZA(),t.TgZ(3,"mat-icon",14),t.NdJ("click",function(){const b=t.CHM(e).$implicit,A=t.oxw();return t.KtG(A.deleteFileOrFolder(b))}),t._uU(4,"delete"),t.qZA()()}if(2&n){const e=r.$implicit;t.xp6(2),t.Oqu(e.name)}}let p=(()=>{class n extends m.H6{constructor(){super(...arguments),this.filesInfo=[],this._transformer=(e,a)=>Object.assign({expandable:!!e.children&&e.children.length>0,name:e.name,level:a},e),this.treeControl=new h.C2(e=>e.level,e=>e.expandable),this.treeFlattener=new c.JZ(this._transformer,e=>e.level,e=>e.expandable,e=>e.children),this.dataSource=new c.kc(this.treeControl,this.treeFlattener)}ngOnInit(){this.settingsService.pageTitle=this.TKey.COMMON.MAINTENANCE}hasChild(e,a){return a.expandable}clearData(){this.storageService.clearData()}deleteFileOrFolder(e){var a=this;return(0,s.Z)(function*(){yield a.fs.deleteFileOrFolder(e.path,e.type),yield a.listDir()})()}listDir(){var e=this;return(0,s.Z)(function*(){e.dataSource.data=yield e.fs.listDir("",!0),console.log(e.dataSource.data)})()}static#t=this.\u0275fac=function(){let e;return function(i){return(e||(e=t.n5z(n)))(i||n)}}();static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["de-maintenance"]],features:[t.qOj],decls:4,vars:2,consts:[[4,"ngIf"],["treeNodeTemplate",""],["mat-raised-button","","color","primary",1,"de-m-bbase",3,"click"],[3,"dataSource","treeControl",4,"ngIf"],[3,"dataSource","treeControl"],["matTreeNodePadding","",4,"matTreeNodeDef"],["matTreeNodePadding","",4,"matTreeNodeDef","matTreeNodeDefWhen"],["matTreeNodePadding",""],["mat-icon-button","","disabled",""],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["mat-icon-button","","matTreeNodeToggle",""],[1,"mat-icon-rtl-mirror"],[1,"de-f-justifyspacebetween","de-p-rbase","de-w-full"],[1,"de-f-grow"],[1,"danger-text",3,"click"]],template:function(a,i){1&a&&(t.YNc(0,T,3,0,"ng-container",0),t.YNc(1,O,4,1,"ng-container",0),t.YNc(2,Z,5,1,"ng-template",null,1,t.W1O)),2&a&&(t.Q6J("ngIf",!i.storageService.isNative),t.xp6(1),t.Q6J("ngIf",i.storageService.isNative))},dependencies:[d.O5,d.tP,u.lW,u.RK,C.Hw,c.fQ,c.ah,c.eu,c.gi,c.uo],styles:["[_nghost-%COMP%]{display:block;padding:12px;height:100%;width:100%}"]})}return n})();var g=o(1896);const F=[{path:"",component:p},{path:"**",redirectTo:""}];let f=(()=>{class n{static#t=this.\u0275fac=function(a){return new(a||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[g.Bz.forChild(F),g.Bz]})}return n})();o(7994);let S=(()=>{class n{static#t=this.\u0275fac=function(a){return new(a||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[m.nC.forChild(),f]})}return n})()}}]);