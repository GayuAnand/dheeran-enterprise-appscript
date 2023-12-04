"use strict";(self.webpackChunkcap_webview=self.webpackChunkcap_webview||[]).push([[353],{6353:(L,u,i)=>{i.r(u),i.d(u,{BSNLConnectComponent:()=>h,BSNLConnectModule:()=>O,BSNLConnectRoutingModule:()=>C});var f=i(2104),n=i(5879),N=i(7538),T=i(2436),a=i(6814),r=i(6223),p=i(2296),c=i(9157),b=i(617),Z=i(2032);function B(t,m){if(1&t&&(n.TgZ(0,"tr")(1,"td",12),n._uU(2),n.qZA(),n.TgZ(3,"td"),n._uU(4),n.qZA()()),2&t){const o=m.$implicit,s=n.oxw(2);n.xp6(2),n.hij("",o,": "),n.xp6(2),n.Oqu(s.information[o])}}function y(t,m){if(1&t&&(n.ynx(0),n.TgZ(1,"p",9),n._uU(2),n.qZA(),n.TgZ(3,"table",10),n.YNc(4,B,5,2,"tr",11),n.qZA(),n.BQk()),2&t){const o=n.oxw();n.xp6(2),n.AsE("",o.informationType," - ",o.informationFor,""),n.xp6(2),n.Q6J("ngForOf",o.utilService.getObjectKeys(o.information))}}function S(t,m){if(1&t&&(n.TgZ(0,"div",13),n._UZ(1,"de-spinner"),n.TgZ(2,"span"),n._uU(3),n.qZA()()),2&t){const o=n.oxw();n.xp6(3),n.hij("Fetching ",o.informationType,"")}}let h=(()=>{class t extends f.H6{get fullPhoneNumber(){return`${this.stdCode}${this.phoneNumber}`}constructor(o){super(),this.bsnlConnectService=o,this.stdCode="04286",this.phoneNumber="",this.informationFor="",this.informationType="",this.information=null}ngOnInit(){this.settingsService.pageTitle=this.TKey.COMMON.BSNL_CONNECT}getBillView(){this.fullPhoneNumber&&(this.information=null,this.processResponse(this.bsnlConnectService.getBillView(this.fullPhoneNumber),"Bill View",this.fullPhoneNumber))}getVLANInfo(){this.fullPhoneNumber&&(this.information=null,this.processResponse(this.bsnlConnectService.getVLANInfo(this.fullPhoneNumber),"VLAN Info",this.fullPhoneNumber))}processResponse(o,s,e){this.informationType=s,o.subscribe({next:l=>{this.informationType=s,this.informationFor=e,this.information=l},error:l=>{this.informationType="",this.informationFor="",this.information=null,this.utilService.openSnackBar(`${e}: ${l}`,"Close")}})}static#n=this.\u0275fac=function(s){return new(s||t)(n.Y36(N.V))};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["de-bsnl-connect"]],features:[n.qOj],decls:26,vars:12,consts:[[1,"bsnl-connect-input-container","de-sm-small"],["matInput","","type","text","pattern","[0-9]*",3,"ngModel","ngModelChange"],["matSuffix","","mat-icon-button","",3,"ngClass","click"],[1,"de-f-grow","de-f-wrap","de-sm-hxsmall"],["mat-raised-button","","color","primary",1,"de-f-grow",3,"disabled","click"],["matPrefix",""],["mat-raised-button","","color","accent",1,"de-f-grow",3,"disabled","click"],[4,"ngIf"],["class","de-m-vlarge de-m-hsmall de-f-aligncenter de-sm-rbase-nolast de-f-justifycenter",4,"ngIf"],[1,"bold-text","de-m-hsmall--force","de-m-vbase--force","mat-headline-6"],[1,"de-m-hsmall"],[4,"ngFor","ngForOf"],[1,"italic-text"],[1,"de-m-vlarge","de-m-hsmall","de-f-aligncenter","de-sm-rbase-nolast","de-f-justifycenter"]],template:function(s,e){1&s&&(n.TgZ(0,"section",0)(1,"mat-form-field")(2,"mat-label"),n._uU(3),n.qZA(),n.TgZ(4,"input",1),n.NdJ("ngModelChange",function(d){return e.stdCode=d}),n.qZA(),n.TgZ(5,"button",2),n.NdJ("click",function(){return e.stdCode=""}),n.TgZ(6,"mat-icon"),n._uU(7,"close"),n.qZA()()(),n.TgZ(8,"mat-form-field")(9,"mat-label"),n._uU(10),n.qZA(),n.TgZ(11,"input",1),n.NdJ("ngModelChange",function(d){return e.phoneNumber=d}),n.qZA(),n.TgZ(12,"button",2),n.NdJ("click",function(){return e.phoneNumber=""}),n.TgZ(13,"mat-icon"),n._uU(14,"close"),n.qZA()()(),n.TgZ(15,"div",3)(16,"button",4),n.NdJ("click",function(){return e.getBillView()}),n.TgZ(17,"mat-icon",5),n._uU(18,"payments"),n.qZA(),n._uU(19),n.qZA(),n.TgZ(20,"button",6),n.NdJ("click",function(){return e.getVLANInfo()}),n.TgZ(21,"mat-icon"),n._uU(22,"lan"),n.qZA(),n._uU(23),n.qZA()()(),n.YNc(24,y,5,3,"ng-container",7),n.YNc(25,S,4,1,"div",8)),2&s&&(n.xp6(3),n.Oqu(e.TKey.COMMON.STD_CODE),n.xp6(1),n.Q6J("ngModel",e.stdCode),n.xp6(1),n.Q6J("ngClass",e.stdCode?"":"de-hidden"),n.xp6(5),n.Oqu(e.TKey.COMMON.PHONE_NUMBER),n.xp6(1),n.Q6J("ngModel",e.phoneNumber),n.xp6(1),n.Q6J("ngClass",e.phoneNumber?"":"de-hidden"),n.xp6(4),n.Q6J("disabled",!e.phoneNumber),n.xp6(3),n.hij(" ",e.TKey.BSNL_CONNECT.BILL_VIEW," "),n.xp6(1),n.Q6J("disabled",!e.phoneNumber),n.xp6(3),n.hij(" ",e.TKey.BSNL_CONNECT.VLAN_INFO," "),n.xp6(1),n.Q6J("ngIf",e.information),n.xp6(1),n.Q6J("ngIf",e.informationType&&!e.information))},dependencies:[T.O,a.mk,a.sg,a.O5,r.Fj,r.JJ,r.c5,r.On,p.lW,p.RK,c.KE,c.hX,c.qo,c.R9,b.Hw,Z.Nt],styles:["[_nghost-%COMP%]{display:block;padding:12px;height:100%;width:100%}",".bsnl-connect-input-container[_ngcontent-%COMP%]{align-items:center;display:flex;flex-grow:1;flex-wrap:wrap}.bsnl-connect-input-container[_ngcontent-%COMP%] > mat-form-field[_ngcontent-%COMP%]{display:flex;flex-grow:1;min-width:200px}.bsnl-connect-input-container[_ngcontent-%COMP%] > mat-form-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper{display:none}"]})}return t})();var g=i(1896);const v=[{path:"",component:h},{path:"**",redirectTo:""}];let C=(()=>{class t{static#n=this.\u0275fac=function(s){return new(s||t)};static#t=this.\u0275mod=n.oAB({type:t});static#e=this.\u0275inj=n.cJS({imports:[g.Bz.forChild(v),g.Bz]})}return t})();i(7994);let O=(()=>{class t{static#n=this.\u0275fac=function(s){return new(s||t)};static#t=this.\u0275mod=n.oAB({type:t});static#e=this.\u0275inj=n.cJS({imports:[f.nC.forChild(),C]})}return t})()}}]);