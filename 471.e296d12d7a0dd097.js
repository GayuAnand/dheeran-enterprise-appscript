"use strict";(self.webpackChunkcap_webview=self.webpackChunkcap_webview||[]).push([[471],{5471:(J,l,o)=>{o.r(l),o.d(l,{AuthModule:()=>P,AuthRoutingModule:()=>p,SignInComponent:()=>c});var g=o(6306),f=o(5592),h=o(2420);const u=new f.y(h.Z);var s=o(6223),v=o(1319),a=o(2104),n=o(5879),I=o(2436),C=o(6814),M=o(2296),m=o(9157),Z=o(617),x=o(2032);function y(t,T){1&t&&n._UZ(0,"de-spinner",10),2&t&&n.Q6J("size",16)}function w(t,T){if(1&t&&(n.TgZ(0,"p",11),n._uU(1),n.qZA()),2&t){const r=n.oxw();n.xp6(1),n.Oqu(r.errorMsg)}}const S=function(){return{minWidth:"300px"}};let c=(()=>{class t extends a.H6{constructor(){super(),this.signInForm=this.fb.group({username:["",[s.kI.required,s.kI.minLength(2)]],password:["",[s.kI.required,s.kI.minLength(5)]]}),this.showPassword=!1,this.errorMsg="",this.loading=!1,this.versionInfo=v,window.s=this}onFormSubmit(){if(this.signInForm.valid){const{username:r,password:i}=this.signInForm.value;this.errorMsg="",this.loading=!0,this.apiServices.auth.signIn(r,i).pipe((0,g.K)(e=>(this.loading=!1,this.errorMsg=e.message,u))).subscribe({next:()=>{console.log("Sign in successful"),this.router.navigate(["/app"])}})}}static#n=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["de-signin"]],features:[n.qOj],decls:19,vars:12,consts:[[1,"de-f-column","de-maxw-quartervp","de-m-auto",3,"formGroup","ngSubmit"],[3,"hideRequiredMarker"],["matPrefix",""],["matInput","","placeholder","Ex. Pradeep","formControlName","username"],["matPrefix","",1,"de-cursorpointer",3,"click"],["matInput","","placeholder","Password","formControlName","password",3,"type"],["mat-raised-button","","color","primary",1,"signin-button"],["color","white",3,"size",4,"ngIf"],["class","danger-text de-m-tbase--force",4,"ngIf"],[1,"de-m-tbase--force","version-text"],["color","white",3,"size"],[1,"danger-text","de-m-tbase--force"]],template:function(i,e){1&i&&(n.TgZ(0,"form",0),n.NdJ("ngSubmit",function(){return e.onFormSubmit()}),n.TgZ(1,"mat-form-field",1)(2,"mat-label"),n._uU(3,"Username"),n.qZA(),n.TgZ(4,"mat-icon",2),n._uU(5,"person"),n.qZA(),n._UZ(6,"input",3),n.qZA(),n.TgZ(7,"mat-form-field",1)(8,"mat-label"),n._uU(9,"Password"),n.qZA(),n.TgZ(10,"mat-icon",4),n.NdJ("click",function(){return e.showPassword=!e.showPassword}),n._uU(11),n.qZA(),n._UZ(12,"input",5),n.qZA(),n.TgZ(13,"button",6),n._uU(14),n.YNc(15,y,1,1,"de-spinner",7),n.qZA(),n.YNc(16,w,2,1,"p",8),n.TgZ(17,"p",9),n._uU(18),n.qZA()()),2&i&&(n.Akn(n.DdM(11,S)),n.Q6J("formGroup",e.signInForm),n.xp6(1),n.Q6J("hideRequiredMarker",!0),n.xp6(6),n.Q6J("hideRequiredMarker",!0),n.xp6(4),n.Oqu(e.showPassword?"visibility_off":"visibility"),n.xp6(1),n.Q6J("type",e.showPassword?"text":"password"),n.xp6(2),n.hij(" ",e.TKey.COMMON.SIGNIN," "),n.xp6(1),n.Q6J("ngIf",e.loading),n.xp6(1),n.Q6J("ngIf",e.errorMsg),n.xp6(2),n.hij("Version: ",e.versionInfo.latest,""))},dependencies:[I.O,C.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,M.lW,m.KE,m.hX,m.qo,Z.Hw,x.Nt],styles:["[_nghost-%COMP%]{display:block;padding:12px;height:100%;width:100%}","[_nghost-%COMP%]{display:flex;justify-content:center}.signin-button[_ngcontent-%COMP%]   de-spinner[_ngcontent-%COMP%]{margin-left:6px}.signin-button[_ngcontent-%COMP%]     .mdc-button__label{align-items:center;display:flex}.version-text[_ngcontent-%COMP%]{color:#a5a5a5;font-style:italic;text-align:center}"]})}return t})();var d=o(1896);const A=[{path:"",component:a.B8,children:[{path:"signin",component:c},{path:"**",redirectTo:"signin"}]}];let p=(()=>{class t{static#n=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275mod=n.oAB({type:t});static#o=this.\u0275inj=n.cJS({imports:[d.Bz.forChild(A),d.Bz]})}return t})();o(7994);let P=(()=>{class t{static#n=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275mod=n.oAB({type:t});static#o=this.\u0275inj=n.cJS({imports:[a.nC.forChild(),p]})}return t})()}}]);