"use strict";(self.webpackChunkcap_webview=self.webpackChunkcap_webview||[]).push([[194],{7194:(U,_,i)=>{i.r(_),i.d(_,{MaintenanceComponent:()=>C,MaintenanceModule:()=>Q,MaintenanceRoutingModule:()=>x});var g=i(5861),M=i(1894),c=i(8445),l=i(2300),t=i(5879),b=i(9653),m=i(6814),s=i(6223),f=i(2296),d=i(9157),v=i(617),Z=i(2032);function N(e,r){if(1&e){const n=t.EpF();t.TgZ(0,"button",6),t.NdJ("click",function(){t.CHM(n);const a=t.oxw();return a.mobile="",t.KtG(a.onFilterChange())}),t.TgZ(1,"mat-icon"),t._uU(2,"close"),t.qZA()()}}function O(e,r){if(1&e){const n=t.EpF();t.ynx(0),t.TgZ(1,"button",7),t.NdJ("click",function(){t.CHM(n);const a=t.oxw();return t.KtG(a.clearData())}),t._uU(2,"Clear Data"),t.qZA(),t.BQk()}}function y(e,r){1&e&&t.GkF(0)}const h=function(e){return{$implicit:e}};function A(e,r){if(1&e&&(t.TgZ(0,"mat-tree-node",12),t._UZ(1,"button",13),t.YNc(2,y,1,0,"ng-container",14),t.qZA()),2&e){const n=r.$implicit;t.oxw(3);const o=t.MAs(13);t.xp6(2),t.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",t.VKq(2,h,n))}}function S(e,r){1&e&&t.GkF(0)}function w(e,r){if(1&e&&(t.TgZ(0,"mat-tree-node",12)(1,"button",15)(2,"mat-icon",16),t._uU(3),t.qZA()(),t.YNc(4,S,1,0,"ng-container",14),t.qZA()),2&e){const n=r.$implicit,o=t.oxw(3),a=t.MAs(13);t.xp6(3),t.Oqu(o.treeControl.isExpanded(n)?"expand_more":"chevron_right"),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(3,h,n))}}function F(e,r){if(1&e&&(t.TgZ(0,"mat-tree",9),t.YNc(1,A,3,4,"mat-tree-node",10),t.YNc(2,w,5,5,"mat-tree-node",11),t.qZA()),2&e){const n=t.oxw(2);t.Q6J("dataSource",n.dataSource)("treeControl",n.treeControl),t.xp6(2),t.Q6J("matTreeNodeDefWhen",n.hasChild)}}function J(e,r){if(1&e){const n=t.EpF();t.ynx(0),t.TgZ(1,"button",7),t.NdJ("click",function(){t.CHM(n);const a=t.oxw();return t.KtG(a.listDir())}),t._uU(2,"List"),t.qZA(),t.YNc(3,F,3,3,"mat-tree",8),t.BQk()}if(2&e){const n=t.oxw();t.xp6(3),t.Q6J("ngIf",null==n.dataSource||null==n.dataSource.data?null:n.dataSource.data.length)}}function D(e,r){if(1&e){const n=t.EpF();t.TgZ(0,"div",17)(1,"span",18),t._uU(2),t.qZA(),t.TgZ(3,"mat-icon",19),t.NdJ("click",function(){const p=t.CHM(n).$implicit,u=t.oxw();return t.KtG(u.deleteFileOrFolder(p))}),t._uU(4,"delete"),t.qZA()()}if(2&e){const n=r.$implicit;t.xp6(2),t.Oqu(n.name)}}let C=(()=>{class e extends l.H6{constructor(n){super(),this.uiUpdaterService=n,this.mobile="",this.filesInfo=[],this._transformer=(o,a)=>Object.assign({expandable:!!o.children&&o.children.length>0,name:o.name,level:a},o),this.treeControl=new M.C2(o=>o.level,o=>o.expandable),this.treeFlattener=new c.JZ(this._transformer,o=>o.level,o=>o.expandable,o=>o.children),this.dataSource=new c.kc(this.treeControl,this.treeFlattener)}ngOnInit(){this.settingsService.pageTitle=this.TKey.COMMON.UTILITY}hasChild(n,o){return o.expandable}clearData(){this.storageService.clearData()}deleteFileOrFolder(n){var o=this;return(0,g.Z)(function*(){yield o.fs.deleteFileOrFolder(n.path,"directory"===n.type),yield o.listDir()})()}listDir(){var n=this;return(0,g.Z)(function*(){n.dataSource.data=yield n.fs.listDir("",!0),console.log(n.dataSource.data)})()}static#t=this.\u0275fac=function(o){return new(o||e)(t.Y36(l.HD))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["de-maintenance"]],features:[t.qOj],decls:14,vars:9,consts:[[1,"whatsapp-wrapper"],["matInput","","type","text",3,"ngModel","ngModelChange"],["matSuffix","","mat-icon-button","",3,"click",4,"ngIf"],["displayType","WHATSAPP",3,"mobile"],[4,"ngIf"],["treeNodeTemplate",""],["matSuffix","","mat-icon-button","",3,"click"],["mat-raised-button","","color","primary",1,"de-m-bbase",3,"click"],[3,"dataSource","treeControl",4,"ngIf"],[3,"dataSource","treeControl"],["matTreeNodePadding","",4,"matTreeNodeDef"],["matTreeNodePadding","",4,"matTreeNodeDef","matTreeNodeDefWhen"],["matTreeNodePadding",""],["mat-icon-button","","disabled",""],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["mat-icon-button","","matTreeNodeToggle",""],[1,"mat-icon-rtl-mirror"],[1,"de-f-justifyspacebetween","de-p-rbase","de-w-full"],[1,"de-f-grow"],[1,"danger-text",3,"click"]],template:function(o,a){1&o&&(t.TgZ(0,"div",0)(1,"mat-form-field")(2,"mat-label"),t._uU(3),t.qZA(),t.TgZ(4,"input",1),t.NdJ("ngModelChange",function(u){return a.mobile=u})("ngModelChange",function(){return a.onFilterChange()}),t.qZA(),t.YNc(5,N,3,0,"button",2),t.qZA(),t._UZ(6,"de-mobile-number",3),t.qZA(),t.TgZ(7,"div"),t._uU(8),t.ALo(9,"json"),t.qZA(),t.YNc(10,O,3,0,"ng-container",4),t.YNc(11,J,4,1,"ng-container",4),t.YNc(12,D,5,1,"ng-template",null,5,t.W1O)),2&o&&(t.xp6(3),t.Oqu(a.TKey.COMMON.MOBILE),t.xp6(1),t.Q6J("ngModel",a.mobile),t.xp6(1),t.Q6J("ngIf",a.mobile),t.xp6(1),t.Q6J("mobile",a.mobile),t.xp6(2),t.hij(" ",t.lcZ(9,7,a.uiUpdaterService.latestVersionInfo),"\n"),t.xp6(2),t.Q6J("ngIf",!a.storageService.isNative),t.xp6(1),t.Q6J("ngIf",a.storageService.isNative))},dependencies:[b.D,m.O5,m.tP,s.Fj,s.JJ,s.On,f.lW,f.RK,d.KE,d.hX,d.R9,v.Hw,Z.Nt,c.fQ,c.ah,c.eu,c.gi,c.uo,m.Ts],styles:["[_nghost-%COMP%]{display:block;padding:12px;height:100%;width:100%}",".whatsapp-wrapper[_ngcontent-%COMP%]{align-items:center;display:flex;margin-bottom:12px}.whatsapp-wrapper[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper{display:none}.whatsapp-wrapper[_ngcontent-%COMP%]     de-mobile-number mat-icon{height:50px;margin-left:12px;width:50px}"]})}return e})();var T=i(1896);const I=[{path:"",component:C},{path:"**",redirectTo:""}];let x=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[T.Bz.forChild(I),T.Bz]})}return e})();i(4673);let Q=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[l.nC.forChild(),x]})}return e})()}}]);