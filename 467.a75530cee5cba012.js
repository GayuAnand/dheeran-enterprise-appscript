"use strict";(self.webpackChunkcap_webview=self.webpackChunkcap_webview||[]).push([[467],{5532:(O,r,i)=>{i.r(r),i.d(r,{DashboardComponent:()=>u,DashboardModule:()=>C,DashboardRoutingModule:()=>p});var d=i(2300),t=i(5879),h=i(6814),l=i(617),a=i(1896);function m(n,c){if(1&n&&(t.TgZ(0,"mat-icon"),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Oqu(e.icon)}}function g(n,c){if(1&n&&t._UZ(0,"mat-icon",8),2&n){const e=t.oxw().$implicit;t.Q6J("svgIcon",e.icon)}}function f(n,c){if(1&n&&(t.TgZ(0,"a",4),t.YNc(1,m,2,1,"mat-icon",5),t.YNc(2,g,1,1,"mat-icon",6),t.TgZ(3,"span",7),t._uU(4),t.qZA()()),2&n){const e=c.$implicit;t.Q6J("routerLink",e.routerLink),t.xp6(1),t.Q6J("ngIf",!e.isSvgIcon),t.xp6(1),t.Q6J("ngIf",e.isSvgIcon),t.xp6(2),t.Oqu(e.text)}}let u=(()=>{class n extends d.H6{constructor(){super(...arguments),this.cards=[]}ngOnInit(){this.settingsService.pageTitle=this.TKey.COMMON.DASHBOARD}getCardsInfo(){return this.cards=[],this.authService.hasAnyCablePermission()&&this.cards.push({routerLink:"../cable",icon:"cable",text:this.TKey.COMMON.CABLE}),this.authService.hasAnyBSNLPermission()&&this.cards.push({routerLink:"../bsnl",icon:"bsnl",isSvgIcon:!0,text:this.TKey.COMMON.BSNL}),this.authService.hasAnyUGPermission()&&this.cards.push({routerLink:"../ug-patrol",icon:"groups",text:this.TKey.COMMON.UG_PATROL}),this.authService.isAdmin()&&this.cards.push({routerLink:"../utility",icon:"engineering",text:this.TKey.COMMON.UTILITY}),this.cards}static#t=this.\u0275fac=function(){let e;return function(s){return(e||(e=t.n5z(n)))(s||n)}}();static#n=this.\u0275cmp=t.Xpm({type:n,selectors:[["de-dashboard"]],features:[t.qOj],decls:6,vars:2,consts:[[1,"de-p-bbase",2,"font-size","20px"],[1,"mat-headline-6",2,"color","var(--primary)"],[1,"de-f-aligncenter","de-f-wrap","de-sm-base"],["class","card",3,"routerLink",4,"ngFor","ngForOf"],[1,"card",3,"routerLink"],[4,"ngIf"],[3,"svgIcon",4,"ngIf"],[1,"card-title"],[3,"svgIcon"]],template:function(o,s){1&o&&(t.TgZ(0,"div",0),t._uU(1,"Welcome "),t.TgZ(2,"span",1),t._uU(3),t.qZA()(),t.TgZ(4,"section",2),t.YNc(5,f,5,4,"a",3),t.qZA()),2&o&&(t.xp6(3),t.hij("",s.authService.Username,"!"),t.xp6(2),t.Q6J("ngForOf",s.getCardsInfo()))},dependencies:[h.sg,h.O5,l.Hw,a.rH],styles:["[_nghost-%COMP%]{display:block;padding:12px;height:100%;width:100%}",".card[_ngcontent-%COMP%]{align-items:center;background:#eeeeee;border:1px solid gray;border-radius:4px;display:flex;flex-direction:column;height:100px;justify-content:center;padding:12px;text-decoration:none;width:100px}.card[_ngcontent-%COMP%]:hover{box-shadow:#0000003d 0 3px 8px}.card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:50px;height:50px;margin-bottom:6px;width:50px}.card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]{font-size:16px}"]})}return n})();const x=[{path:"",component:u},{path:"**",redirectTo:""}];let p=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#n=this.\u0275mod=t.oAB({type:n});static#e=this.\u0275inj=t.cJS({imports:[a.Bz.forChild(x),a.Bz]})}return n})();i(3912);let C=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#n=this.\u0275mod=t.oAB({type:n});static#e=this.\u0275inj=t.cJS({imports:[d.nC.forChild(),p]})}return n})()}}]);