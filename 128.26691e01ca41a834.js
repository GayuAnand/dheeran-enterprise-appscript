"use strict";(self.webpackChunkcap_webview=self.webpackChunkcap_webview||[]).push([[128],{2128:(It,b,c)=>{c.r(b),c.d(b,{CableListComponent:()=>g,CableListModule:()=>qt,CableListRoutingModule:()=>S,CustomerCardComponent:()=>O});var f=c(2300),p=c(732),t=c(5879),T=c(2099),M=c(9653),_=c(6814);function F(n,i){if(1&n&&(t.TgZ(0,"tr")(1,"td"),t._uU(2,"ID:"),t.qZA(),t.TgZ(3,"td"),t._UZ(4,"de-copyable-text",2),t.qZA()()),2&n){const e=t.oxw();t.xp6(4),t.Q6J("text",e.customer.ID)}}function N(n,i){if(1&n&&(t.TgZ(0,"div",8),t._UZ(1,"de-mobile-number",9),t.TgZ(2,"div",8),t._UZ(3,"de-mobile-number",10)(4,"de-mobile-number",11),t.qZA()()),2&n){const e=i.$implicit;t.xp6(1),t.Q6J("mobile",e),t.xp6(2),t.Q6J("mobile",e),t.xp6(1),t.Q6J("mobile",e)}}function v(n,i){if(1&n&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA()()),2&n){const e=i.$implicit,o=t.oxw();t.xp6(2),t.Oqu(e),t.xp6(2),t.Oqu(o.customer.getCollectionDateStrFormat(e)),t.xp6(2),t.Oqu(o.customer.get(e)),t.xp6(2),t.Oqu(o.customer.getSettlementDateStrFormat(e)),t.xp6(2),t.Oqu(o.customer.getNotes(e))}}let O=(()=>{class n extends f.H6{isCableAdmin(){return this.authService.hasPermission(p.v.CABLE,p._.ADMIN)}static#t=this.\u0275fac=function(){let e;return function(l){return(e||(e=t.n5z(n)))(l||n)}}();static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["de-customer-card"]],inputs:{customer:"customer"},features:[t.qOj],decls:36,vars:6,consts:[[1,"customer-details"],[4,"ngIf"],[3,"text"],[1,"mobile-row"],["class","de-f-aligncenter de-sm-rbase-nolast",4,"ngFor","ngForOf"],[1,"customer-card-wrapper"],[1,"customer-card"],[4,"ngFor","ngForOf"],[1,"de-f-aligncenter","de-sm-rbase-nolast"],["displayType","TEXT",3,"mobile"],["displayType","CALL",3,"mobile"],["displayType","WHATSAPP",3,"mobile"]],template:function(o,l){1&o&&(t.TgZ(0,"table",0),t.YNc(1,F,5,1,"tr",1),t.TgZ(2,"tr")(3,"td"),t._uU(4,"STB:"),t.qZA(),t.TgZ(5,"td"),t._UZ(6,"de-copyable-text",2),t.qZA()(),t.TgZ(7,"tr",3)(8,"td"),t._uU(9,"Mobile:"),t.qZA(),t.TgZ(10,"td"),t.YNc(11,N,5,3,"div",4),t.qZA()(),t.TgZ(12,"tr")(13,"td"),t._uU(14,"Conection On:"),t.qZA(),t.TgZ(15,"td"),t._uU(16),t.qZA()(),t.TgZ(17,"tr")(18,"td"),t._uU(19,"Notes:"),t.qZA(),t.TgZ(20,"td"),t._uU(21),t.qZA()()(),t.TgZ(22,"div",5)(23,"table",6)(24,"tr")(25,"th"),t._uU(26,"Month"),t.qZA(),t.TgZ(27,"th"),t._uU(28,"Collected"),t.qZA(),t.TgZ(29,"th"),t._uU(30,"Amount"),t.qZA(),t.TgZ(31,"th"),t._uU(32,"Settled"),t.qZA(),t.TgZ(33,"th"),t._uU(34,"Notes"),t.qZA()(),t.YNc(35,v,11,5,"tr",7),t.qZA()()),2&o&&(t.xp6(1),t.Q6J("ngIf",l.isCableAdmin()),t.xp6(5),t.Q6J("text",l.customer.STB),t.xp6(5),t.Q6J("ngForOf",l.customer.getMobileNumbers()),t.xp6(5),t.Oqu(l.customer.getConnectionDate()),t.xp6(5),t.Oqu(l.customer["Own Notes"]||l.customer.Notes),t.xp6(14),t.Q6J("ngForOf",l.customer.getMonthsInOrder()))},dependencies:[T.$,M.D,_.sg,_.O5],styles:["[_nghost-%COMP%]{display:flex;flex-grow:1;flex-wrap:wrap;justify-content:space-between;overflow:auto}.detail-section[_ngcontent-%COMP%]{display:flex;flex-grow:1;margin-bottom:6px}.detail-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{display:flex;font-style:italic;padding-right:6px}.detail-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){display:flex}.customer-details[_ngcontent-%COMP%]{width:100%}.customer-details[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{max-width:150px}.customer-card-wrapper[_ngcontent-%COMP%]{display:flex;flex-grow:1;justify-content:center;width:100%}table.customer-card[_ngcontent-%COMP%]{border-collapse:collapse;border-color:#dee2e6;display:table;margin-top:12px;margin-bottom:12px;max-width:400px;text-align:center;width:100%}table.customer-card[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#d2d8ff;font-weight:500}table.customer-card[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table.customer-card[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid rgb(222,226,230);border-collapse:collapse;padding:6px}table.customer-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], table.customer-details[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:0px;outline:none;width:50px}table.customer-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, table.customer-details[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}table.customer-card[_ngcontent-%COMP%]   input.notes[_ngcontent-%COMP%], table.customer-details[_ngcontent-%COMP%]   input.notes[_ngcontent-%COMP%]{width:200px}"]})}return n})();var A=c(1896),y=c(7582),Q=c(6328),J=c(7398),P=c(298),Z=c(3365),r=c(5313),d=c(6825),D=c(2090),L=c(1705),E=c(3969),U=c(2436),u=c(6223),q=c(3680),w=c(2296),I=c(5986),x=c(8034),C=c(9157),B=c(617),k=c(2032),Y=c(2599),K=c(8525);function H(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",21),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return l.searchText="",t.KtG(l.onFilterChange())}),t.TgZ(1,"mat-icon"),t._uU(2,"close"),t.qZA()()}}function $(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"mat-option",22),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.statusFilter.onSelectionChange())}),t._uU(1),t.qZA()}if(2&n){const e=i.$implicit;t.Q6J("value",e),t.xp6(1),t.Oqu(e)}}function R(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"mat-option",22),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.areaFilter.onSelectionChange())}),t._uU(1),t.qZA()}if(2&n){const e=i.$implicit;t.Q6J("value",e),t.xp6(1),t.Oqu(e)}}function G(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"mat-option",22),t.NdJ("click",function(){t.CHM(e);const l=t.oxw(4);return t.KtG(l.agentsFilter.onSelectionChange())}),t._uU(1),t.qZA()}if(2&n){const e=i.$implicit;t.Q6J("value",e),t.xp6(1),t.Oqu(e)}}const h=function(){return{standalone:!0}};function j(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"mat-form-field")(1,"mat-label"),t._uU(2),t.qZA(),t.TgZ(3,"mat-select",3)(4,"div",4)(5,"mat-checkbox",5),t.NdJ("ngModelChange",function(l){t.CHM(e);const s=t.oxw(3);return t.KtG(s.agentsFilter.selectAll=l)})("change",function(){t.CHM(e);const l=t.oxw(3);return t.KtG(l.agentsFilter.toggleSelectAll())}),t._uU(6,"Select All"),t.qZA()(),t.YNc(7,G,2,2,"mat-option",6),t.qZA()()}if(2&n){const e=t.oxw(3);t.xp6(2),t.Oqu(e.TKey.COMMON.AGENTS),t.xp6(1),t.Q6J("formControl",e.agentsFilter.control),t.xp6(2),t.Q6J("ngModel",e.agentsFilter.selectAll)("ngModelOptions",t.DdM(5,h)),t.xp6(2),t.Q6J("ngForOf",e.agentsFilter.controlOptions)}}function z(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"div",25)(1,"label"),t._uU(2,"Pending Settlement Filter"),t.qZA(),t.TgZ(3,"mat-slide-toggle",26),t.NdJ("ngModelChange",function(l){t.CHM(e);const s=t.oxw(2);return t.KtG(s.showPendingSettlement=l)})("ngModelChange",function(){t.CHM(e);const l=t.oxw(2);return t.KtG(l.onPendingSettlementFilterChange())}),t._uU(4),t.qZA(),t.YNc(5,j,8,6,"mat-form-field",9),t.qZA()}if(2&n){const e=t.oxw(2);t.xp6(3),t.Q6J("ngModel",e.showPendingSettlement)("ngClass",e.authService.hasPermission(e.METADATA.APPS.CABLE,e.METADATA.ROLES.ADMIN)?"":"de-nm--force"),t.xp6(1),t.AsE("",e.TKey.CUSTOMERS.SHOW_PENDING_SETTLEMENT," ",e.showPendingSettlement?"(Rs."+e.pendingSettlementAmount+"/-)":"",""),t.xp6(1),t.Q6J("ngIf",e.authService.hasPermission(e.METADATA.APPS.CABLE,e.METADATA.ROLES.ADMIN))}}function W(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"mat-option",22),t.NdJ("click",function(){t.CHM(e);const l=t.oxw(3);return t.KtG(l.monthsFilter.onSelectionChange())}),t._uU(1),t.qZA()}if(2&n){const e=i.$implicit;t.Q6J("value",e),t.xp6(1),t.Oqu(e)}}function V(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"div",27)(1,"label"),t._uU(2,"Collection Filter"),t.qZA(),t.TgZ(3,"mat-slide-toggle",28),t.NdJ("ngModelChange",function(l){t.CHM(e);const s=t.oxw(2);return t.KtG(s.showCollectedCustomers=l)})("ngModelChange",function(){t.CHM(e);const l=t.oxw(2);return t.KtG(l.onShowCollectedCustomersFilterChange())}),t._uU(4),t.qZA(),t.TgZ(5,"mat-form-field")(6,"mat-label"),t._uU(7),t.qZA(),t.TgZ(8,"mat-select",3)(9,"div",4)(10,"mat-checkbox",5),t.NdJ("ngModelChange",function(l){t.CHM(e);const s=t.oxw(2);return t.KtG(s.monthsFilter.selectAll=l)})("change",function(){t.CHM(e);const l=t.oxw(2);return t.KtG(l.monthsFilter.toggleSelectAll())}),t._uU(11,"Select All"),t.qZA()(),t.YNc(12,W,2,2,"mat-option",6),t.qZA()()()}if(2&n){const e=t.oxw(2);t.xp6(3),t.Q6J("ngModel",e.showCollectedCustomers),t.xp6(1),t.Oqu(e.showCollectedCustomers?e.TKey.CUSTOMERS.SHOW_COLLECTED:e.TKey.CUSTOMERS.SHOW_PENDING_COLLECTION),t.xp6(3),t.Oqu(e.TKey.COMMON.MONTHS),t.xp6(1),t.Q6J("formControl",e.monthsFilter.control),t.xp6(2),t.Q6J("ngModel",e.monthsFilter.selectAll)("ngModelOptions",t.DdM(7,h)),t.xp6(2),t.Q6J("ngForOf",e.monthsFilter.controlOptions)}}function X(n,i){if(1&n&&(t.ynx(0),t.YNc(1,z,6,5,"div",23),t.YNc(2,V,13,8,"div",24),t.BQk()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",!e.showCollectedCustomers),t.xp6(1),t.Q6J("ngIf",!e.showPendingSettlement)}}function tt(n,i){if(1&n&&(t.TgZ(0,"mat-header-cell",32),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.Q6J("ngClass","de-f-justifycenter"),t.xp6(1),t.Oqu("ACTIONS"===e?"":e)}}function et(n,i){1&n&&(t.ynx(0),t.TgZ(1,"mat-icon"),t._uU(2,"toggle_on"),t.qZA(),t.BQk())}function nt(n,i){if(1&n&&(t.ynx(0),t._UZ(1,"de-copyable-text",36),t.BQk()),2&n){const e=t.oxw().$implicit,o=t.oxw().$implicit;t.xp6(1),t.Q6J("text",e[o])}}function ot(n,i){if(1&n&&(t.ynx(0),t._uU(1),t.BQk()),2&n){const e=t.oxw().$implicit,o=t.oxw().$implicit,l=t.oxw();t.xp6(1),t.AsE(" ",e[o]," ",l.showPendingSettlement?"("+e.getPendingSettlement(!0)+")":""," ")}}function it(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"mat-icon",37),t.NdJ("click",function(l){t.CHM(e);const s=t.oxw(2).$implicit,a=t.oxw(2);return t.KtG(a.showEditDetailsDialog(s,l))}),t._uU(2,"edit"),t.qZA(),t.BQk()}}function lt(n,i){if(1&n&&(t.ynx(0),t.YNc(1,it,3,0,"ng-container",9),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",null==e?null:e.ID)}}function st(n,i){if(1&n&&(t.TgZ(0,"div",40),t._UZ(1,"de-copyable-text",36),t.TgZ(2,"div",41),t._UZ(3,"de-mobile-number",42)(4,"de-mobile-number",43),t.qZA()()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("text",e),t.xp6(2),t.Q6J("mobile",e),t.xp6(1),t.Q6J("mobile",e)}}function at(n,i){if(1&n&&(t.ynx(0),t.YNc(1,st,5,3,"div",39),t.BQk()),2&n){const e=i.$implicit;t.xp6(1),t.Q6J("ngIf",e)}}function ct(n,i){if(1&n&&(t.ynx(0),t.YNc(1,at,2,1,"ng-container",38),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngForOf",e.getMobileNumbers())}}function rt(n,i){if(1&n&&(t.ynx(0),t._uU(1),t.BQk()),2&n){const e=t.oxw().$implicit,o=t.oxw().$implicit;t.xp6(1),t.Oqu(e[o])}}function _t(n,i){if(1&n&&(t.TgZ(0,"mat-cell",32),t.ynx(1,33),t.YNc(2,et,3,0,"ng-container",34),t.YNc(3,nt,2,1,"ng-container",34),t.YNc(4,ot,2,2,"ng-container",34),t.YNc(5,lt,2,1,"ng-container",34),t.YNc(6,ct,2,1,"ng-container",34),t.YNc(7,rt,2,1,"ng-container",35),t.BQk(),t.qZA()),2&n){const e=i.$implicit,o=t.oxw().$implicit,l=t.oxw();t.Q6J("ngClass",l.getCellClassNames(e,o)),t.xp6(1),t.Q6J("ngSwitch",o),t.xp6(1),t.Q6J("ngSwitchCase",null==l.customerColumns||null==l.customerColumns.STATUS?null:l.customerColumns.STATUS.label),t.xp6(1),t.Q6J("ngSwitchCase",null==l.customerColumns||null==l.customerColumns.STB?null:l.customerColumns.STB.label),t.xp6(1),t.Q6J("ngSwitchCase",null==l.customerColumns||null==l.customerColumns.NAME?null:l.customerColumns.NAME.label),t.xp6(1),t.Q6J("ngSwitchCase","ACTIONS"),t.xp6(1),t.Q6J("ngSwitchCase",null==l.customerColumns||null==l.customerColumns.MOBILE?null:l.customerColumns.MOBILE.label)}}function mt(n,i){1&n&&(t.ynx(0,29),t.YNc(1,tt,2,2,"mat-header-cell",30),t.YNc(2,_t,8,7,"mat-cell",31),t.BQk()),2&n&&t.s9C("matColumnDef",i.$implicit)}function dt(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"de-customer-card",46),t.NdJ("onCustomerUpdate",function(){t.CHM(e);const l=t.oxw(2);return t.KtG(l.refreshData(!0))}),t.qZA()}if(2&n){const e=t.oxw().$implicit,o=t.oxw();t.Q6J("customer",e)("@detailExpand",e==o.expandedElement?"expanded":"collapsed")}}function gt(n,i){if(1&n&&(t.TgZ(0,"mat-cell",44),t.YNc(1,dt,1,2,"de-customer-card",45),t.qZA()),2&n){const e=i.$implicit,o=t.oxw();t.Q6J("ngClass",e!==o.expandedElement?"de-noborder--force":""),t.uIk("colspan",o.displayedColumns.length),t.xp6(1),t.Q6J("ngIf",e===o.expandedElement)}}function ut(n,i){1&n&&t._UZ(0,"mat-header-row")}function pt(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"mat-row",47),t.NdJ("click",function(){const s=t.CHM(e).$implicit,a=t.oxw();return t.KtG(a.expandedElement=a.expandedElement===s?null:s)}),t.qZA()}}function Ct(n,i){1&n&&t._UZ(0,"mat-row",48)}function ht(n,i){if(1&n&&(t.TgZ(0,"tr")(1,"td"),t._uU(2,"ID:"),t.qZA(),t.TgZ(3,"td"),t._UZ(4,"de-copyable-text",36),t.qZA()()),2&n){const e=t.oxw(2);t.xp6(4),t.Q6J("text",e.editCustomer.ID)}}function ft(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"input",63),t.NdJ("ngModelChange",function(l){t.CHM(e);const s=t.oxw(2);return t.KtG(s.editCustomer.STB=l)}),t.qZA(),t.BQk()}if(2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngModel",e.editCustomer.STB)}}function xt(n,i){if(1&n&&(t.ynx(0),t._UZ(1,"de-copyable-text",36),t.BQk()),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("text",e.editCustomer.STB)}}function bt(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"textarea",63),t.NdJ("ngModelChange",function(l){t.CHM(e);const s=t.oxw(2);return t.KtG(s.editCustomer.Mobile=l)}),t.qZA(),t.BQk()}if(2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngModel",e.editCustomer.Mobile)}}function Tt(n,i){if(1&n&&(t.TgZ(0,"div",41),t._UZ(1,"de-mobile-number",65),t.TgZ(2,"div",41),t._UZ(3,"de-mobile-number",42)(4,"de-mobile-number",43),t.qZA()()),2&n){const e=i.$implicit;t.xp6(1),t.Q6J("mobile",e),t.xp6(2),t.Q6J("mobile",e),t.xp6(1),t.Q6J("mobile",e)}}function Mt(n,i){if(1&n&&(t.ynx(0),t.YNc(1,Tt,5,3,"div",64),t.BQk()),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",e.editCustomer.getMobileNumbers())}}function Ot(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"textarea",63),t.NdJ("ngModelChange",function(l){t.CHM(e);const s=t.oxw(2);return t.KtG(s.editCustomer["Own Notes"]=l)}),t.qZA(),t.BQk()}if(2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngModel",e.editCustomer["Own Notes"])}}function At(n,i){if(1&n&&(t.ynx(0),t.TgZ(1,"td"),t._uU(2),t.qZA(),t.BQk()),2&n){const e=t.oxw(2);t.xp6(2),t.Oqu(e.editCustomer["Own Notes"]||e.editCustomer.Notes)}}function Zt(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"input",66),t.NdJ("ngModelChange",function(l){t.CHM(e);const s=t.oxw().$implicit,a=t.oxw(2);return t.KtG(a.editCustomer[s]=l)}),t.qZA(),t.BQk()}if(2&n){const e=t.oxw().$implicit,o=t.oxw(2);t.xp6(1),t.Q6J("ngModel",o.editCustomer[e])}}function wt(n,i){if(1&n&&(t.ynx(0),t._uU(1),t.BQk()),2&n){const e=t.oxw().$implicit,o=t.oxw(2);t.xp6(1),t.Oqu(o.editCustomerOrig.get(e))}}function St(n,i){1&n&&t.GkF(0)}const Ft=function(n,i){return{editCustomer:n,notesKey:i}};function Nt(n,i){if(1&n&&(t.ynx(0),t.YNc(1,St,1,0,"ng-container",67),t.BQk()),2&n){const e=t.oxw().$implicit,o=t.oxw(2),l=t.MAs(37);t.xp6(1),t.Q6J("ngTemplateOutlet",l)("ngTemplateOutletContext",t.WLB(2,Ft,o.editCustomer,o.editCustomer.getNotesKey(e)))}}function vt(n,i){if(1&n&&(t.ynx(0),t._uU(1),t.BQk()),2&n){const e=t.oxw().$implicit,o=t.oxw(2);t.xp6(1),t.Oqu(o.editCustomerOrig.getNotes(e))}}function yt(n,i){if(1&n&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t.ynx(6,33),t.YNc(7,Zt,2,1,"ng-container",34),t.YNc(8,wt,2,1,"ng-container",34),t.BQk(),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t.ynx(12,33),t.YNc(13,Nt,2,5,"ng-container",34),t.YNc(14,vt,2,1,"ng-container",34),t.BQk(),t.qZA()()),2&n){const e=i.$implicit,o=t.oxw(2);t.xp6(2),t.Oqu(e),t.xp6(2),t.Oqu(o.editCustomer.getCollectionDateStrFormat(e)),t.xp6(2),t.Q6J("ngSwitch",o.canEditMonth(e)),t.xp6(1),t.Q6J("ngSwitchCase",!0),t.xp6(1),t.Q6J("ngSwitchCase",!1),t.xp6(2),t.Oqu(o.editCustomerOrig.getSettlementDateStrFormat(e)),t.xp6(2),t.Q6J("ngSwitch",o.canEditMonth(e)),t.xp6(1),t.Q6J("ngSwitchCase",!0),t.xp6(1),t.Q6J("ngSwitchCase",!1)}}function Qt(n,i){1&n&&(t.TgZ(0,"mat-icon"),t._uU(1,"check"),t.qZA())}function Jt(n,i){1&n&&t._UZ(0,"de-spinner",68),2&n&&t.Q6J("size",16)}function Pt(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"de-dialog",49),t.NdJ("closeDialog",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.hideEditDetailsDialog())}),t.ynx(1,50),t._uU(2),t.BQk(),t.ynx(3,51),t.TgZ(4,"table",52),t.YNc(5,ht,5,1,"tr",9),t.TgZ(6,"tr")(7,"td"),t._uU(8,"STB:"),t.qZA(),t.TgZ(9,"td"),t.ynx(10,33),t.YNc(11,ft,2,1,"ng-container",34),t.YNc(12,xt,2,1,"ng-container",34),t.BQk(),t.qZA()(),t.TgZ(13,"tr",53)(14,"td"),t._uU(15,"Mobile:"),t.qZA(),t.TgZ(16,"td"),t.ynx(17,33),t.YNc(18,bt,2,1,"ng-container",34),t.YNc(19,Mt,2,1,"ng-container",34),t.BQk(),t.qZA()(),t.TgZ(20,"tr")(21,"td"),t._uU(22,"Conection On:"),t.qZA(),t.TgZ(23,"td"),t._uU(24),t.TgZ(25,"mat-form-field")(26,"mat-label"),t._uU(27,"Choose a date"),t.qZA(),t._UZ(28,"input",54),t.TgZ(29,"mat-hint"),t._uU(30,"MM/DD/YYYY"),t.qZA(),t._UZ(31,"mat-datepicker-toggle",55)(32,"mat-datepicker",null,56),t.qZA()()(),t.TgZ(34,"tr")(35,"td"),t._uU(36,"Notes:"),t.qZA(),t.TgZ(37,"td"),t.ynx(38,33),t.YNc(39,Ot,2,1,"ng-container",34),t.YNc(40,At,3,1,"ng-container",34),t.BQk(),t.qZA()()(),t.TgZ(41,"table",57)(42,"tr")(43,"th"),t._uU(44,"Month"),t.qZA(),t.TgZ(45,"th"),t._uU(46,"Collected"),t.qZA(),t.TgZ(47,"th"),t._uU(48,"Amount"),t.qZA(),t.TgZ(49,"th"),t._uU(50,"Settled"),t.qZA(),t.TgZ(51,"th"),t._uU(52,"Notes"),t.qZA()(),t.YNc(53,yt,15,9,"tr",38),t.qZA(),t.BQk(),t.ynx(54,58),t.TgZ(55,"button",59),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.hideEditDetailsDialog())}),t.TgZ(56,"div",60)(57,"mat-icon"),t._uU(58,"close"),t.qZA(),t.TgZ(59,"span"),t._uU(60),t.qZA()()(),t.TgZ(61,"button",61),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.checkUpdateCollections())}),t.TgZ(62,"div",60),t.YNc(63,Qt,2,0,"mat-icon",9),t.YNc(64,Jt,1,1,"de-spinner",62),t.TgZ(65,"span"),t._uU(66),t.qZA()()(),t.BQk(),t.qZA()}if(2&n){const e=t.MAs(33),o=t.oxw();t.xp6(2),t.Oqu(o.TKey.COMMON.EDIT),t.xp6(3),t.Q6J("ngIf",o.isCableAdmin()),t.xp6(5),t.Q6J("ngSwitch",o.isCableAdmin()),t.xp6(1),t.Q6J("ngSwitchCase",!0),t.xp6(1),t.Q6J("ngSwitchCase",!1),t.xp6(5),t.Q6J("ngSwitch",o.isCableAdmin()),t.xp6(1),t.Q6J("ngSwitchCase",!0),t.xp6(1),t.Q6J("ngSwitchCase",!1),t.xp6(5),t.hij(" ",o.editCustomer.getConnectionDate()," "),t.xp6(4),t.Q6J("matDatepicker",e),t.xp6(3),t.Q6J("for",e),t.xp6(7),t.Q6J("ngSwitch",o.isCableAdmin()),t.xp6(1),t.Q6J("ngSwitchCase",!0),t.xp6(1),t.Q6J("ngSwitchCase",!1),t.xp6(13),t.Q6J("ngForOf",o.editCustomer.getMonthsInOrder()),t.xp6(7),t.Oqu(o.TKey.COMMON.CANCEL),t.xp6(3),t.Q6J("ngIf",!o.processing),t.xp6(1),t.Q6J("ngIf",o.processing),t.xp6(2),t.Oqu(o.TKey.COMMON.OK)}}function Dt(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"input",69),t.NdJ("ngModelChange",function(l){const s=t.CHM(e);return t.KtG(s.editCustomer[s.notesKey]=l)}),t.qZA()}2&n&&t.Q6J("ngModel",i.editCustomer[i.notesKey])}const Lt=function(){return["expandedDetail"]},Et=function(){return[25,50,100,20]};class g extends f.H6{constructor(){super(...arguments),this.data=new r.by([]),this.fullData=[],this.customerColumns=this.settingsService.metadata.sheetsInfo?.CUSTOMERS?.cols,this.allColumns=[this.customerColumns?.NAME?.label||"",this.customerColumns?.AREA?.label||"",this.customerColumns?.MOBILE?.label||"",this.customerColumns?.STB?.label||""],this.displayedColumns=[],this.searchText="",this.statusFilter=this.getNewFilterControl(["Active"],["Active","Inactive"]),this.areaFilter=this.getNewFilterControl([],[]),this.agentsFilter=this.getNewFilterControl([],[]),this.monthsFilter=this.getNewFilterControl([],[]),this.showAdvancedFilters=!1,this.showCollectedCustomers=!1,this.showPendingSettlement=!1,this.pendingSettlementAmount=0,this.cacheInfo=null,this.processing=!1}ngOnInit(){this.filterArea=this.filterArea.bind(this),this.filterStatus=this.filterStatus.bind(this),this.filterSearch=this.filterSearch.bind(this),this.filterCollection=this.filterCollection.bind(this),this.filterPendingSettlement=this.filterPendingSettlement.bind(this),this._subscriptions.push(this.eventService.isMobile.subscribe(()=>this.refreshDisplayedColumns())),this.settingsService.pageTitle=this.TKey.COMMON.CABLE}ngAfterViewInit(){this.data.paginator=this.paginator,this.refreshDisplayedColumns(),this.refreshData()}ngOnDestroy(){super.ngOnDestroy(),this.cacheInfo?.destroy()}refreshDisplayedColumns(){this.displayedColumns=this.allColumns.slice(0,this.settingsService.isMobile?2:4),this.displayedColumns.push("ACTIONS")}refreshData(i=!1){this.apiGSheetDataService.getSheetData(this.settingsService.metadata.sheetsInfo?.CUSTOMERS.label,D.vj,i).pipe((0,Q.b)(e=>this.getRefreshCacheInfo(`SHEET_${this.settingsService.metadata.sheetsInfo?.CUSTOMERS.label}`,this.cacheInfo).pipe((0,J.U)(o=>(this.cacheInfo=o,e))))).subscribe(e=>{this.fullData=e,this.initializeFilters()})}initializeFilters(){const i={};this.fullData.forEach(o=>i[o.Area]=!0),this.areaFilter.controlOptions=Object.keys(i),this.areaFilter.controlOptions.sort(),this.areaFilter.control.setValue([]),this.areaFilter.selectAll=!1,this.monthsFilter.controlOptions=this.fullData[0].getMonthsInOrder();let e={};this.fullData.forEach(o=>e=Object.assign(e,o.getCollectionAgents())),this.agentsFilter.controlOptions=Object.keys(e),this.agentsFilter.controlOptions.sort(),this.authService.hasPermission(this.METADATA.APPS.CABLE,this.METADATA.ROLES.ADMIN)?this.agentsFilter.control.setValue([]):this.agentsFilter.control.setValue([this.authService.Username]),this.onFilterChange()}toggleAdvancedFilters(){this.showAdvancedFilters=!this.showAdvancedFilters,this.showPendingSettlement=!1,this.showCollectedCustomers=!1,this.monthsFilter.control.setValue([]),this.onFilterChange()}onPendingSettlementFilterChange(){this.showPendingSettlement&&(this.showCollectedCustomers=!1,this.monthsFilter.control.setValue([])),this.onFilterChange()}onShowCollectedCustomersFilterChange(){this.showCollectedCustomers&&(this.showPendingSettlement=!1,this.agentsFilter.control.setValue([])),this.onFilterChange()}onFilterChange(){const i=m=>!0;let e=this.filterArea,o=this.filterStatus,l=this.filterSearch,s=this.filterCollection,a=this.filterPendingSettlement;this.areaFilter._selectedObj={},(this.areaFilter.control.value||[]).forEach(m=>this.areaFilter._selectedObj[m]=!0),this.statusFilter._selectedObj={},(this.statusFilter.control.value||[]).forEach(m=>this.statusFilter._selectedObj[m]=!0),(!this.areaFilter.control.value?.length||(this.areaFilter.control?.value||[]).length===this.areaFilter.controlOptions?.length)&&(e=i),(!this.statusFilter.control.value?.length||(this.statusFilter.control?.value||[]).length===this.statusFilter.controlOptions?.length)&&(o=i),this.searchText||(l=i),(!this.monthsFilter.control.value?.length||(this.monthsFilter.control.value||[]).length===this.monthsFilter.controlOptions?.length)&&(s=i),this.pendingSettlementAmount=0,this.showPendingSettlement?s=i:a=i,this.data.data=this.fullData.filter(e).filter(o).filter(l).filter(s).filter(a),this.showPendingSettlement&&this.data.data.forEach(m=>this.pendingSettlementAmount+=m.getPendingSettlement(!1,this.agentsFilter.control.value))}filterSearch(i){return i.freeTextSearch(this.searchText)}filterArea(i){return this.areaFilter._selectedObj[i.Area]}filterStatus(i){return this.statusFilter._selectedObj.Active&&i.isActive()||this.statusFilter._selectedObj.Inactive&&!i.isActive()}filterCollection(i){const e=this.monthsFilter.control.value||[];return!e.length||e.every(o=>{const l=!!i[o];return l&&this.showCollectedCustomers||!l&&!this.showCollectedCustomers})}filterPendingSettlement(i){return!this.showPendingSettlement||!!i.getPendingSettlement(!1,this.agentsFilter.control.value)}getCellClassNames(i,e){const o=e===this.customerColumns?.NAME?.label||e===this.customerColumns?.AREA?.label?"":"align-center";return`${e===this.customerColumns?.NAME?.label?i.isActive()?"success-text":"danger-text":""} ${o} ${e===this.customerColumns?.MOBILE?.label?"de-f-column":""} ${i===this.expandedElement?"de-noborder--force":""}`}isCableAdmin(){return this.authService.hasPermission(p.v.CABLE,p._.ADMIN)}canEditMonth(i){const e=this.editCustomerOrig;return!e[i]&&!e.getCollectionBy(i)&&!e.getSettlementDate(i)}checkUpdateCollections(){const i=this.editCustomerOrig,e=this.settingsService.getCustomerCols(),o={[e?.ID.label]:i.ID};if([e?.STB.label,e?.MOBILE.label,e?.OWN_NOTES.label,e?.CONNECTION_ON.label].filter(a=>i[a]!==this.editCustomer[a]).forEach(a=>{o[a]=this.editCustomer[a]&&a===e?.CONNECTION_ON.label?this.editCustomer.formatDate(this.editCustomer[a]):this.editCustomer[a]}),this.editCustomer.getMonthsInOrder().forEach(a=>{this.canEditMonth(a)&&this.editCustomer[a]&&(o[a]=this.editCustomer[a],o[this.editCustomer.getCollectionByKey(a)]=this.authService.Username,o[this.editCustomer.getCollectionDateKey(a)]=this.editCustomer.formatDate(Date.now()),o[this.editCustomer.getNotesKey(a)]=this.editCustomer.getNotes(a)||"")}),0===Object.keys(o).length)return this.hideEditDetailsDialog();const s=this.settingsService.metadata.sheetsInfo?.CUSTOMERS.label;this.processing=!0,this.apiGSheetDataService.saveOrUpdateRecord(s,[this.settingsService.getCustomerCols()?.ID.label],o).subscribe({next:()=>{this.processing=!1,this.utilService.openSnackBar(`Successfully updated '${i?.Name}'`,"Close"),this.hideEditDetailsDialog(),this.refreshData(!0)},error:a=>{this.processing=!1,this.utilService.openSnackBar(a,"Close")}})}showEditDetailsDialog(i,e){e?.stopPropagation(),e?.preventDefault(),this.editCustomerOrig=i,this.editCustomer=this.editCustomerOrig.clone()}hideEditDetailsDialog(){this.editCustomerOrig=null}static#t=this.\u0275fac=function(){let i;return function(o){return(i||(i=t.n5z(g)))(o||g)}}();static#e=this.\u0275cmp=t.Xpm({type:g,selectors:[["de-cable-list"]],viewQuery:function(e,o){if(1&e&&t.Gf(Z.NW,5),2&e){let l;t.iGM(l=t.CRH())&&(o.paginator=l.first)}},features:[t.qOj],decls:38,vars:28,consts:[[1,"filter-row","de-p-vbase"],["matInput","","type","text",3,"ngModel","ngModelChange"],["matSuffix","","mat-icon-button","",3,"click",4,"ngIf"],["multiple","",3,"formControl"],[1,"select-all"],[3,"ngModel","ngModelOptions","ngModelChange","change"],[3,"value","click",4,"ngFor","ngForOf"],[1,"advanced-filter-label"],[1,"de-cursorpointer",3,"click"],[4,"ngIf"],[3,"cacheInfo","refresh"],["multiTemplateDataRows","",1,"mat-elevation-z8",3,"dataSource"],[3,"matColumnDef",4,"ngFor","ngForOf"],["matColumnDef","expandedDetail"],["class","expanded-detail-cell",3,"ngClass",4,"matCellDef"],[4,"matHeaderRowDef","matHeaderRowDefSticky"],[3,"click",4,"matRowDef","matRowDefColumns"],["mat-row","","class","expanded-detail-row",4,"matRowDef","matRowDefColumns"],["pageSize","50","showFirstLastButtons","",3,"pageSizeOptions"],[3,"closeDialog",4,"ngIf"],["editMonthNotes",""],["matSuffix","","mat-icon-button","",3,"click"],[3,"value","click"],["class","pending-settlement-filter",4,"ngIf"],["class","collection-filter",4,"ngIf"],[1,"pending-settlement-filter"],[3,"ngModel","ngClass","ngModelChange"],[1,"collection-filter"],[3,"ngModel","ngModelChange"],[3,"matColumnDef"],[3,"ngClass",4,"matHeaderCellDef"],[3,"ngClass",4,"matCellDef"],[3,"ngClass"],[3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],[3,"text"],["color","primary",1,"de-cursorpointer","de-m-rbase",3,"click"],[4,"ngFor","ngForOf"],["class","mobile-cell de-sm-rsmall-nolast",4,"ngIf"],[1,"mobile-cell","de-sm-rsmall-nolast"],[1,"de-f-aligncenter","de-sm-rbase-nolast"],["displayType","CALL",3,"mobile"],["displayType","WHATSAPP",3,"mobile"],[1,"expanded-detail-cell",3,"ngClass"],[3,"customer","onCustomerUpdate",4,"ngIf"],[3,"customer","onCustomerUpdate"],[3,"click"],["mat-row","",1,"expanded-detail-row"],[3,"closeDialog"],["de-dialog-header",""],["de-dialog-body",""],[1,"customer-details"],[1,"mobile-row"],["matInput","",3,"matDatepicker"],["matIconSuffix","",3,"for"],["picker",""],[1,"customer-card"],["de-dialog-footer",""],["mat-raised-button","","color","warn",3,"click"],[1,"de-f-aligncenter","de-sm-rsmall-nolast"],["mat-raised-button","","color","primary",3,"click"],["color","white",3,"size",4,"ngIf"],["matInput","",1,"de-minw-full",3,"ngModel","ngModelChange"],["class","de-f-aligncenter de-sm-rbase-nolast",4,"ngFor","ngForOf"],["displayType","TEXT",3,"mobile"],["matInput","","type","number",3,"ngModel","ngModelChange"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["color","white",3,"size"],["matInput","","type","string",1,"notes",3,"ngModel","ngModelChange"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"mat-form-field")(2,"mat-label"),t._uU(3),t.qZA(),t.TgZ(4,"input",1),t.NdJ("ngModelChange",function(s){return o.searchText=s})("ngModelChange",function(){return o.onFilterChange()}),t.qZA(),t.YNc(5,H,3,0,"button",2),t.qZA(),t.TgZ(6,"mat-form-field")(7,"mat-label"),t._uU(8),t.qZA(),t.TgZ(9,"mat-select",3)(10,"div",4)(11,"mat-checkbox",5),t.NdJ("ngModelChange",function(s){return o.statusFilter.selectAll=s})("change",function(){return o.statusFilter.toggleSelectAll()}),t._uU(12,"Select All"),t.qZA()(),t.YNc(13,$,2,2,"mat-option",6),t.qZA()(),t.TgZ(14,"mat-form-field")(15,"mat-label"),t._uU(16),t.qZA(),t.TgZ(17,"mat-select",3)(18,"div",4)(19,"mat-checkbox",5),t.NdJ("ngModelChange",function(s){return o.areaFilter.selectAll=s})("change",function(){return o.areaFilter.toggleSelectAll()}),t._uU(20,"Select All"),t.qZA()(),t.YNc(21,R,2,2,"mat-option",6),t.qZA()(),t.TgZ(22,"p",7)(23,"span",8),t.NdJ("click",function(){return o.toggleAdvancedFilters()}),t._uU(24),t.qZA()(),t.YNc(25,X,3,2,"ng-container",9),t.qZA(),t.TgZ(26,"de-refresh-data",10),t.NdJ("refresh",function(){return o.refreshData(!0)}),t.qZA(),t.TgZ(27,"mat-table",11),t.YNc(28,mt,3,1,"ng-container",12),t.ynx(29,13),t.YNc(30,gt,2,3,"mat-cell",14),t.BQk(),t.YNc(31,ut,1,0,"mat-header-row",15),t.YNc(32,pt,1,0,"mat-row",16),t.YNc(33,Ct,1,0,"mat-row",17),t.qZA(),t._UZ(34,"mat-paginator",18),t.YNc(35,Pt,67,19,"de-dialog",19),t.YNc(36,Dt,1,1,"ng-template",null,20,t.W1O)),2&e&&(t.xp6(3),t.Oqu(o.TKey.COMMON.SEARCH),t.xp6(1),t.Q6J("ngModel",o.searchText),t.xp6(1),t.Q6J("ngIf",o.searchText),t.xp6(3),t.Oqu(o.TKey.COMMON.STATUS),t.xp6(1),t.Q6J("formControl",o.statusFilter.control),t.xp6(2),t.Q6J("ngModel",o.statusFilter.selectAll)("ngModelOptions",t.DdM(24,h)),t.xp6(2),t.Q6J("ngForOf",o.statusFilter.controlOptions),t.xp6(3),t.Oqu(o.TKey.COMMON.AREA),t.xp6(1),t.Q6J("formControl",o.areaFilter.control),t.xp6(2),t.Q6J("ngModel",o.areaFilter.selectAll)("ngModelOptions",t.DdM(25,h)),t.xp6(2),t.Q6J("ngForOf",o.areaFilter.controlOptions),t.xp6(3),t.Oqu(o.showAdvancedFilters?o.TKey.COMMON.HIDE_ADVANCED_FILTERS:o.TKey.COMMON.SHOW_ADVANCED_FILTERS),t.xp6(1),t.Q6J("ngIf",o.showAdvancedFilters),t.xp6(1),t.Q6J("cacheInfo",o.cacheInfo),t.xp6(1),t.Q6J("dataSource",o.data),t.xp6(1),t.Q6J("ngForOf",o.displayedColumns),t.xp6(3),t.Q6J("matHeaderRowDef",o.displayedColumns)("matHeaderRowDefSticky",!0),t.xp6(1),t.Q6J("matRowDefColumns",o.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",t.DdM(26,Lt)),t.xp6(1),t.Q6J("pageSizeOptions",t.DdM(27,Et)),t.xp6(1),t.Q6J("ngIf",o.editCustomerOrig))},dependencies:[T.$,L.a,M.D,E.s,U.O,_.mk,_.sg,_.O5,_.tP,_.RF,_.n9,_.ED,u.Fj,u.wV,u.JJ,u.On,u.oH,q.ey,w.lW,w.RK,I.oG,x.Mq,x.hl,x.nW,C.KE,C.hX,C.bx,C.R9,B.Hw,k.Nt,Y.Rr,Z.NW,K.gD,r.BZ,r.fO,r.as,r.w1,r.Dz,r.nj,r.ge,r.ev,r.XQ,r.Gk,O],styles:["[_nghost-%COMP%]{display:block;padding:12px;height:100%;width:100%}",".filter-row[_ngcontent-%COMP%]   .advanced-filter-label[_ngcontent-%COMP%]{color:var(--primary);justify-content:end;margin-top:6px;margin-bottom:6px;text-decoration:underline;width:100%}mat-table[_ngcontent-%COMP%]     mat-header-row mat-header-cell:not([colspan]):last-child, mat-table[_ngcontent-%COMP%]     mat-row mat-cell:not([colspan]):last-child{max-width:90px;min-width:90px}.select-all[_ngcontent-%COMP%]{padding:6px}.expanded-detail-row[_ngcontent-%COMP%], .expanded-detail-cell[_ngcontent-%COMP%]{min-height:0px}.collection-filter[_ngcontent-%COMP%], .pending-settlement-filter[_ngcontent-%COMP%]{align-items:flex-start;border:1px solid rgba(0,0,0,.38);border-radius:4px;flex-direction:column;padding:20px;position:relative}.collection-filter[_ngcontent-%COMP%] > label[_ngcontent-%COMP%], .pending-settlement-filter[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]{background:#fafafa;color:#0009;font-size:12px;left:12px;padding:0 6px;position:absolute;top:-11px}.collection-filter[_ngcontent-%COMP%] > mat-slide-toggle[_ngcontent-%COMP%], .pending-settlement-filter[_ngcontent-%COMP%] > mat-slide-toggle[_ngcontent-%COMP%]{margin-bottom:16px}.collection-filter[_ngcontent-%COMP%] > mat-form-field[_ngcontent-%COMP%], .pending-settlement-filter[_ngcontent-%COMP%] > mat-form-field[_ngcontent-%COMP%]{width:100%}.mobile-cell[_ngcontent-%COMP%]{align-items:center;display:flex;flex-wrap:wrap;justify-content:center}.customer-details[_ngcontent-%COMP%]{width:100%}.customer-details[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{max-width:150px}table.customer-card[_ngcontent-%COMP%]{border-collapse:collapse;border-color:#dee2e6;display:table;margin-top:12px;margin-bottom:12px;max-width:400px;text-align:center;width:100%}table.customer-card[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#d2d8ff;font-weight:500}table.customer-card[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table.customer-card[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid rgb(222,226,230);border-collapse:collapse;padding:6px}table.customer-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], table.customer-details[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:0px;outline:none;width:50px}table.customer-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, table.customer-details[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}table.customer-card[_ngcontent-%COMP%]   input.notes[_ngcontent-%COMP%], table.customer-details[_ngcontent-%COMP%]   input.notes[_ngcontent-%COMP%]{width:200px}table.customer-card[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], table.customer-details[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{border-color:#cacaca;border-radius:4px}"],data:{animation:[(0,d.X$)("detailExpand",[(0,d.SB)("collapsed",(0,d.oB)({height:"0px",minHeight:"0"})),(0,d.SB)("expanded",(0,d.oB)({height:"*"})),(0,d.eR)("expanded <=> collapsed",(0,d.jt)("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))])]}})}(0,y.gn)([(0,P.Ds)(500)],g.prototype,"onFilterChange",null);const Ut=[{path:"",component:g},{path:"**",redirectTo:""}];let S=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[A.Bz.forChild(Ut),A.Bz]})}return n})();c(4122);let qt=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[f.nC.forChild(),S]})}return n})()}}]);