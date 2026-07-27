import{b as re,d as ae,f as le,g as it,h as V,j as bt}from"./chunk-V4GPLOWT.js";import{b as vt}from"./chunk-SUNZS7V5.js";import{D as _t,E as se,a as Q,e as ie,g as J,q as tt,t as et,x as ne,y as gt}from"./chunk-RR2YCN3U.js";import{Ac as u,Ba as L,Bb as Qt,Ca as dt,Da as Yt,Dc as yt,Ea as j,Ec as I,Fa as Xt,Ia as Ht,Ma as C,Na as S,O as Vt,Oa as pt,Pb as Jt,Sa as Wt,T as v,U as x,Va as zt,W as b,Wa as jt,Xa as Z,Y as h,Ya as $,Yb as te,Zb as w,_ as Bt,a as M,ab as G,b as z,bb as ut,c as O,cb as ft,db as U,dc as ee,ea as R,f as _,fa as A,ia as k,ib as Zt,ja as D,jb as $t,lb as K,mb as q,na as Ft,nb as N,pa as Lt,pb as Gt,qa as ht,qb as Ut,rb as Kt,sa as E,tc as mt,wa as Nt,wc as Y,x as It,xb as T,xc as oe,zb as qt}from"./chunk-O6WD76AR.js";var ce=(()=>{class n{_animationsDisabled=ie();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=C({type:n,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,o){i&2&&T("mat-pseudo-checkbox-indeterminate",o.state==="indeterminate")("mat-pseudo-checkbox-checked",o.state==="checked")("mat-pseudo-checkbox-disabled",o.disabled)("mat-pseudo-checkbox-minimal",o.appearance==="minimal")("mat-pseudo-checkbox-full",o.appearance==="full")("_mat-animation-noopable",o._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,o){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return n})();var Ie=["text"],Ve=[[["mat-icon"]],"*"],Be=["mat-icon","*"];function Fe(n,e){if(n&1&&U(0,"mat-pseudo-checkbox",1),n&2){let t=K();G("disabled",t.disabled)("state",t.selected?"checked":"unchecked")}}function Le(n,e){if(n&1&&U(0,"mat-pseudo-checkbox",3),n&2){let t=K();G("disabled",t.disabled)}}function Ne(n,e){if(n&1&&(ut(0,"span",4),qt(1),ft()),n&2){let t=K();L(),Qt("(",t.group.label,")")}}var Ye=new b("MAT_OPTION_PARENT_COMPONENT"),Xe=new b("MatOptgroup");var wt=class{source;isUserInput;constructor(e,t=!1){this.source=e,this.isUserInput=t}},he=(()=>{class n{_element=h(E);_changeDetectorRef=h(te);_parent=h(Ye,{optional:!0});group=h(Xe,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=h(et).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(t){this._disabled.set(t)}_disabled=Ft(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new k;_text;_stateChanges=new _;constructor(){let t=h(Y);t.load(se),t.load(oe),this._signalDisableRipple=!!this._parent&&Wt(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(t=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),t&&this._emitSelectionChangeEvent())}deselect(t=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),t&&this._emitSelectionChangeEvent())}focus(t,i){let o=this._getHostElement();typeof o.focus=="function"&&o.focus(i)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!tt(t)&&(this._selectViaInteraction(),t.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let t=this.viewValue;t!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=t)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(t=!1){this.onSelectionChange.emit(new wt(this,t))}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=C({type:n,selectors:[["mat-option"]],viewQuery:function(i,o){if(i&1&&Gt(Ie,7),i&2){let s;Ut(s=Kt())&&(o._text=s.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(i,o){i&1&&$t("click",function(){return o._selectViaInteraction()})("keydown",function(r){return o._handleKeydown(r)}),i&2&&(Zt("id",o.id),jt("aria-selected",o.selected)("aria-disabled",o.disabled.toString()),T("mdc-list-item--selected",o.selected)("mat-mdc-option-multiple",o.multiple)("mat-mdc-option-active",o.active)("mdc-list-item--disabled",o.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",w]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:Be,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(i,o){i&1&&(q(Ve),Z(0,Fe,1,2,"mat-pseudo-checkbox",1),N(1),ut(2,"span",2,0),N(4,1),ft(),Z(5,Le,1,1,"mat-pseudo-checkbox",3),Z(6,Ne,2,1,"span",4),U(7,"div",5)),i&2&&($(o.multiple?0:-1),L(5),$(!o.multiple&&o.selected&&!o.hideSingleSelectionIndicator?5:-1),L(),$(o.group&&o.group._inert?6:-1),L(),G("matRippleTrigger",o._getHostElement())("matRippleDisabled",o.disabled||o.disableRipple))},dependencies:[ce,_t],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return n})();function bi(n,e,t){if(t.length){let i=e.toArray(),o=t.toArray(),s=0;for(let r=0;r<n+1;r++)i[r].group&&i[r].group===o[s]&&s++;return s}return 0}function wi(n,e,t,i){return n<t?n:n+e>t+i?Math.max(0,n-i+e):t}var de=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=S({type:n});static \u0275inj=x({imports:[I]})}return n})();var kt=new b("MAT_DATE_LOCALE",{providedIn:"root",factory:()=>h(Jt)}),F="Method not implemented",X=class{locale;_localeChanges=new _;localeChanges=this._localeChanges;setTime(e,t,i,o){throw new Error(F)}getHours(e){throw new Error(F)}getMinutes(e){throw new Error(F)}getSeconds(e){throw new Error(F)}parseTime(e,t){throw new Error(F)}addSeconds(e,t){throw new Error(F)}getValidDateOrNull(e){return this.isDateInstance(e)&&this.isValid(e)?e:null}deserialize(e){return e==null||this.isDateInstance(e)&&this.isValid(e)?e:this.invalid()}setLocale(e){this.locale=e,this._localeChanges.next()}compareDate(e,t){return this.getYear(e)-this.getYear(t)||this.getMonth(e)-this.getMonth(t)||this.getDate(e)-this.getDate(t)}compareTime(e,t){return this.getHours(e)-this.getHours(t)||this.getMinutes(e)-this.getMinutes(t)||this.getSeconds(e)-this.getSeconds(t)}sameDate(e,t){if(e&&t){let i=this.isValid(e),o=this.isValid(t);return i&&o?!this.compareDate(e,t):i==o}return e==t}sameTime(e,t){if(e&&t){let i=this.isValid(e),o=this.isValid(t);return i&&o?!this.compareTime(e,t):i==o}return e==t}clampDate(e,t,i){return t&&this.compareDate(e,t)<0?t:i&&this.compareDate(e,i)>0?i:e}},pe=new b("mat-date-formats");var Ti=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=S({type:n});static \u0275inj=x({imports:[vt,de,he,I]})}return n})();var He=["mat-internal-form-field",""],We=["*"],Vi=(()=>{class n{labelPosition="after";static \u0275fac=function(i){return new(i||n)};static \u0275cmp=C({type:n,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,o){i&2&&T("mdc-form-field--align-end",o.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:He,ngContentSelectors:We,decls:1,vars:0,template:function(i,o){i&1&&(q(),N(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2,changeDetection:0})}return n})();var ze=/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/,je=/^(\d?\d)[:.](\d?\d)(?:[:.](\d?\d))?\s*(AM|PM)?$/i;function xt(n,e){let t=Array(n);for(let i=0;i<n;i++)t[i]=e(i);return t}var Ze=(()=>{class n extends X{_matDateLocale=h(kt,{optional:!0});constructor(){super();let t=h(kt,{optional:!0});t!==void 0&&(this._matDateLocale=t),super.setLocale(this._matDateLocale)}getYear(t){return t.getFullYear()}getMonth(t){return t.getMonth()}getDate(t){return t.getDate()}getDayOfWeek(t){return t.getDay()}getMonthNames(t){let i=new Intl.DateTimeFormat(this.locale,{month:t,timeZone:"utc"});return xt(12,o=>this._format(i,new Date(2017,o,1)))}getDateNames(){let t=new Intl.DateTimeFormat(this.locale,{day:"numeric",timeZone:"utc"});return xt(31,i=>this._format(t,new Date(2017,0,i+1)))}getDayOfWeekNames(t){let i=new Intl.DateTimeFormat(this.locale,{weekday:t,timeZone:"utc"});return xt(7,o=>this._format(i,new Date(2017,0,o+1)))}getYearName(t){let i=new Intl.DateTimeFormat(this.locale,{year:"numeric",timeZone:"utc"});return this._format(i,t)}getFirstDayOfWeek(){if(typeof Intl<"u"&&Intl.Locale){let t=new Intl.Locale(this.locale),i=(t.getWeekInfo?.()||t.weekInfo)?.firstDay??0;return i===7?0:i}return 0}getNumDaysInMonth(t){return this.getDate(this._createDateWithOverflow(this.getYear(t),this.getMonth(t)+1,0))}clone(t){return new Date(t.getTime())}createDate(t,i,o){let s=this._createDateWithOverflow(t,i,o);return s.getMonth()!=i,s}today(){return new Date}parse(t,i){return typeof t=="number"?new Date(t):t?new Date(Date.parse(t)):null}format(t,i){if(!this.isValid(t))throw Error("NativeDateAdapter: Cannot format invalid date.");let o=new Intl.DateTimeFormat(this.locale,z(M({},i),{timeZone:"utc"}));return this._format(o,t)}addCalendarYears(t,i){return this.addCalendarMonths(t,i*12)}addCalendarMonths(t,i){let o=this._createDateWithOverflow(this.getYear(t),this.getMonth(t)+i,this.getDate(t));return this.getMonth(o)!=((this.getMonth(t)+i)%12+12)%12&&(o=this._createDateWithOverflow(this.getYear(o),this.getMonth(o),0)),o}addCalendarDays(t,i){return this._createDateWithOverflow(this.getYear(t),this.getMonth(t),this.getDate(t)+i)}toIso8601(t){return[t.getUTCFullYear(),this._2digit(t.getUTCMonth()+1),this._2digit(t.getUTCDate())].join("-")}deserialize(t){if(typeof t=="string"){if(!t)return null;if(ze.test(t)){let i=new Date(t);if(this.isValid(i))return i}}return super.deserialize(t)}isDateInstance(t){return t instanceof Date}isValid(t){return!isNaN(t.getTime())}invalid(){return new Date(NaN)}setTime(t,i,o,s){let r=this.clone(t);return r.setHours(i,o,s,0),r}getHours(t){return t.getHours()}getMinutes(t){return t.getMinutes()}getSeconds(t){return t.getSeconds()}parseTime(t,i){if(typeof t!="string")return t instanceof Date?new Date(t.getTime()):null;let o=t.trim();if(o.length===0)return null;let s=this._parseTimeString(o);if(s===null){let r=o.replace(/[^0-9:(AM|PM)]/gi,"").trim();r.length>0&&(s=this._parseTimeString(r))}return s||this.invalid()}addSeconds(t,i){return new Date(t.getTime()+i*1e3)}_createDateWithOverflow(t,i,o){let s=new Date;return s.setFullYear(t,i,o),s.setHours(0,0,0,0),s}_2digit(t){return("00"+t).slice(-2)}_format(t,i){let o=new Date;return o.setUTCFullYear(i.getFullYear(),i.getMonth(),i.getDate()),o.setUTCHours(i.getHours(),i.getMinutes(),i.getSeconds(),i.getMilliseconds()),t.format(o)}_parseTimeString(t){let i=t.toUpperCase().match(je);if(i){let o=parseInt(i[1]),s=parseInt(i[2]),r=i[3]==null?void 0:parseInt(i[3]),a=i[4];if(o===12?o=a==="AM"?0:o:a==="PM"&&(o+=12),Ct(o,0,23)&&Ct(s,0,59)&&(r==null||Ct(r,0,59)))return this.setTime(this.today(),o,s,r||0)}return null}static \u0275fac=function(i){return new(i||n)};static \u0275prov=v({token:n,factory:n.\u0275fac})}return n})();function Ct(n,e,t){return!isNaN(n)&&n>=e&&n<=t}var $e={parse:{dateInput:null,timeInput:null},display:{dateInput:{year:"numeric",month:"numeric",day:"numeric"},timeInput:{hour:"numeric",minute:"numeric"},monthYearLabel:{year:"numeric",month:"short"},dateA11yLabel:{year:"numeric",month:"long",day:"numeric"},monthYearA11yLabel:{year:"numeric",month:"long"},timeOptionLabel:{hour:"numeric",minute:"numeric"}}};var $i=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=S({type:n});static \u0275inj=x({providers:[Ge()]})}return n})();function Ge(n=$e){return[{provide:X,useClass:Ze},{provide:pe,useValue:n}]}var ue=ne();function be(n){return new ot(n.get(V),n.get(A))}var ot=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(e,t){this._viewportRuler=e,this._document=t}attach(){}enable(){if(this._canBeEnabled()){let e=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=e.style.left||"",this._previousHTMLStyles.top=e.style.top||"",e.style.left=u(-this._previousScrollPosition.left),e.style.top=u(-this._previousScrollPosition.top),e.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let e=this._document.documentElement,t=this._document.body,i=e.style,o=t.style,s=i.scrollBehavior||"",r=o.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,e.classList.remove("cdk-global-scrollblock"),ue&&(i.scrollBehavior=o.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),ue&&(i.scrollBehavior=s,o.scrollBehavior=r)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let t=this._document.documentElement,i=this._viewportRuler.getViewportSize();return t.scrollHeight>i.height||t.scrollWidth>i.width}};function we(n,e){return new nt(n.get(it),n.get(D),n.get(V),e)}var nt=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(e,t,i,o){this._scrollDispatcher=e,this._ngZone=t,this._viewportRuler=i,this._config=o}attach(e){this._overlayRef,this._overlayRef=e}enable(){if(this._scrollSubscription)return;let e=this._scrollDispatcher.scrolled(0).pipe(It(t=>!t||!this._overlayRef.overlayElement.contains(t.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=e.subscribe(()=>{let t=this._viewportRuler.getViewportScrollPosition().top;Math.abs(t-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=e.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var H=class{enable(){}disable(){}attach(){}};function St(n,e){return e.some(t=>{let i=n.bottom<t.top,o=n.top>t.bottom,s=n.right<t.left,r=n.left>t.right;return i||o||s||r})}function fe(n,e){return e.some(t=>{let i=n.top<t.top,o=n.bottom>t.bottom,s=n.left<t.left,r=n.right>t.right;return i||o||s||r})}function Et(n,e){return new st(n.get(it),n.get(V),n.get(D),e)}var st=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(e,t,i,o){this._scrollDispatcher=e,this._viewportRuler=t,this._ngZone=i,this._config=o}attach(e){this._overlayRef,this._overlayRef=e}enable(){if(!this._scrollSubscription){let e=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(e).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let t=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:o}=this._viewportRuler.getViewportSize();St(t,[{width:i,height:o,bottom:o,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},ke=(()=>{class n{_injector=h(R);constructor(){}noop=()=>new H;close=t=>we(this._injector,t);block=()=>be(this._injector);reposition=t=>Et(this._injector,t);static \u0275fac=function(i){return new(i||n)};static \u0275prov=v({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),W=class{positionStrategy;scrollStrategy=new H;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(e){if(e){let t=Object.keys(e);for(let i of t)e[i]!==void 0&&(this[i]=e[i])}}};var rt=class{connectionPair;scrollableViewProperties;constructor(e,t){this.connectionPair=e,this.scrollableViewProperties=t}};var xe=(()=>{class n{_attachedOverlays=[];_document=h(A);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(t){this.remove(t),this._attachedOverlays.push(t)}remove(t){let i=this._attachedOverlays.indexOf(t);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(t,i,o){return o.observers.length<1?!1:t.eventPredicate?t.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=v({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ce=(()=>{class n extends xe{_ngZone=h(D);_renderer=h(j).createRenderer(null,null);_cleanupKeydown;add(t){super.add(t),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=t=>{let i=this._attachedOverlays;for(let o=i.length-1;o>-1;o--){let s=i[o];if(this.canReceiveEvent(s,t,s._keydownEvents)){this._ngZone.run(()=>s._keydownEvents.next(t));break}}};static \u0275fac=(()=>{let t;return function(o){return(t||(t=ht(n)))(o||n)}})();static \u0275prov=v({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Se=(()=>{class n extends xe{_platform=h(Q);_ngZone=h(D);_renderer=h(j).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(t){if(super.add(t),!this._isAttached){let i=this._document.body,o={capture:!0},s=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[s.listen(i,"pointerdown",this._pointerDownListener,o),s.listen(i,"click",this._clickListener,o),s.listen(i,"auxclick",this._clickListener,o),s.listen(i,"contextmenu",this._clickListener,o)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(t=>t()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=t=>{this._pointerDownEventTarget=J(t)};_clickListener=t=>{let i=J(t),o=t.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let s=this._attachedOverlays.slice();for(let r=s.length-1;r>-1;r--){let a=s[r],c=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,t,c))){if(me(a.overlayElement,i)||me(a.overlayElement,o))break;this._ngZone?this._ngZone.run(()=>c.next(t)):c.next(t)}}};static \u0275fac=(()=>{let t;return function(o){return(t||(t=ht(n)))(o||n)}})();static \u0275prov=v({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function me(n,e){let t=typeof ShadowRoot<"u"&&ShadowRoot,i=e;for(;i;){if(i===n)return!0;i=t&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var Oe=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=C({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,o){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2,changeDetection:0})}return n})(),De=(()=>{class n{_platform=h(Q);_containerElement;_document=h(A);_styleLoader=h(Y);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let t="cdk-overlay-container";if(this._platform.isBrowser||gt()){let o=this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);for(let s=0;s<o.length;s++)o[s].remove()}let i=this._document.createElement("div");i.classList.add(t),gt()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(Oe)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=v({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ot=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(e,t,i,o){this._renderer=t,this._ngZone=i,this.element=e.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=t.listen(this.element,"click",o)}detach(){this._ngZone.runOutsideAngular(()=>{let e=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(e,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),e.style.pointerEvents="none",e.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Pt(n){return n&&n.nodeType===1}var at=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new _;_attachments=new _;_detachments=new _;_positionStrategy;_scrollStrategy;_locationChanges=O.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new _;_outsidePointerEvents=new _;_afterNextRenderRef;constructor(e,t,i,o,s,r,a,c,p,l=!1,d,f){this._portalOutlet=e,this._host=t,this._pane=i,this._config=o,this._ngZone=s,this._keyboardDispatcher=r,this._document=a,this._location=c,this._outsideClickDispatcher=p,this._animationsDisabled=l,this._injector=d,this._renderer=f,o.scrollStrategy&&(this._scrollStrategy=o.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=o.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(e){if(this._disposed)return null;this._attachHost();let t=this._portalOutlet.attach(e);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=dt(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof t?.onDestroy=="function"&&t.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),t}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let e=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),e}dispose(){if(this._disposed)return;let e=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,e&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(e){e!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=e,this.hasAttached()&&(e.attach(this),this.updatePosition()))}updateSize(e){this._config=M(M({},this._config),e),this._updateElementSize()}setDirection(e){this._config=z(M({},this._config),{direction:e}),this._updateElementDirection()}addPanelClass(e){this._pane&&this._toggleClasses(this._pane,e,!0)}removePanelClass(e){this._pane&&this._toggleClasses(this._pane,e,!1)}getDirection(){let e=this._config.direction;return e?typeof e=="string"?e:e.value:"ltr"}updateScrollStrategy(e){e!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=e,this.hasAttached()&&(e.attach(this),e.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let e=this._pane.style;e.width=u(this._config.width),e.height=u(this._config.height),e.minWidth=u(this._config.minWidth),e.minHeight=u(this._config.minHeight),e.maxWidth=u(this._config.maxWidth),e.maxHeight=u(this._config.maxHeight)}_togglePointerEvents(e){this._pane.style.pointerEvents=e?"":"none"}_attachHost(){if(!this._host.parentElement){let e=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Pt(e)?e.after(this._host):e?.type==="parent"?e.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let e="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Ot(this._document,this._renderer,this._ngZone,t=>{this._backdropClick.next(t)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(e))}):this._backdropRef.element.classList.add(e)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(e,t,i){let o=mt(t||[]).filter(s=>!!s);o.length&&(i?e.classList.add(...o):e.classList.remove(...o))}_detachContentWhenEmpty(){let e=!1;try{this._detachContentAfterRenderRef=dt(()=>{e=!0,this._detachContent()},{injector:this._injector})}catch(t){if(e)throw t;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let e=this._scrollStrategy;e?.disable(),e?.detach?.()}},ge="cdk-overlay-connected-position-bounding-box",Ue=/([A-Za-z%]+)$/;function Mt(n,e){return new lt(e,n.get(V),n.get(A),n.get(Q),n.get(De))}var lt=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new _;_resizeSubscription=O.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(e,t,i,o,s){this._viewportRuler=t,this._document=i,this._platform=o,this._overlayContainer=s,this.setOrigin(e)}attach(e){this._overlayRef&&this._overlayRef,this._validatePositions(),e.hostElement.classList.add(ge),this._overlayRef=e,this._boundingBox=e.hostElement,this._pane=e.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let e=this._originRect,t=this._overlayRect,i=this._viewportRect,o=this._containerRect,s=[],r;for(let a of this._preferredPositions){let c=this._getOriginPoint(e,o,a),p=this._getOverlayPoint(c,t,a),l=this._getOverlayFit(p,t,i,a);if(l.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,c);return}if(this._canFitWithFlexibleDimensions(l,p,i)){s.push({position:a,origin:c,overlayRect:t,boundingBoxRect:this._calculateBoundingBoxRect(c,a)});continue}(!r||r.overlayFit.visibleArea<l.visibleArea)&&(r={overlayFit:l,overlayPoint:p,originPoint:c,position:a,overlayRect:t})}if(s.length){let a=null,c=-1;for(let p of s){let l=p.boundingBoxRect.width*p.boundingBoxRect.height*(p.position.weight||1);l>c&&(c=l,a=p)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(r.position,r.originPoint);return}this._applyPosition(r.position,r.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&P(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(ge),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let e=this._lastPosition;e?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(e,this._getOriginPoint(this._originRect,this._containerRect,e))):this.apply()}withScrollableContainers(e){return this._scrollables=e,this}withPositions(e){return this._preferredPositions=e,e.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(e){return this._viewportMargin=e,this}withFlexibleDimensions(e=!0){return this._hasFlexibleDimensions=e,this}withGrowAfterOpen(e=!0){return this._growAfterOpen=e,this}withPush(e=!0){return this._canPush=e,this}withLockedPosition(e=!0){return this._positionLocked=e,this}setOrigin(e){return this._origin=e,this}withDefaultOffsetX(e){return this._offsetX=e,this}withDefaultOffsetY(e){return this._offsetY=e,this}withTransformOriginOn(e){return this._transformOriginSelector=e,this}withPopoverLocation(e){return this._popoverLocation=e,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof E?this._origin.nativeElement:Pt(this._origin)?this._origin:null}_getOriginPoint(e,t,i){let o;if(i.originX=="center")o=e.left+e.width/2;else{let r=this._isRtl()?e.right:e.left,a=this._isRtl()?e.left:e.right;o=i.originX=="start"?r:a}t.left<0&&(o-=t.left);let s;return i.originY=="center"?s=e.top+e.height/2:s=i.originY=="top"?e.top:e.bottom,t.top<0&&(s-=t.top),{x:o,y:s}}_getOverlayPoint(e,t,i){let o;i.overlayX=="center"?o=-t.width/2:i.overlayX==="start"?o=this._isRtl()?-t.width:0:o=this._isRtl()?0:-t.width;let s;return i.overlayY=="center"?s=-t.height/2:s=i.overlayY=="top"?0:-t.height,{x:e.x+o,y:e.y+s}}_getOverlayFit(e,t,i,o){let s=ye(t),{x:r,y:a}=e,c=this._getOffset(o,"x"),p=this._getOffset(o,"y");c&&(r+=c),p&&(a+=p);let l=0-r,d=r+s.width-i.width,f=0-a,g=a+s.height-i.height,m=this._subtractOverflows(s.width,l,d),y=this._subtractOverflows(s.height,f,g),Tt=m*y;return{visibleArea:Tt,isCompletelyWithinViewport:s.width*s.height===Tt,fitsInViewportVertically:y===s.height,fitsInViewportHorizontally:m==s.width}}_canFitWithFlexibleDimensions(e,t,i){if(this._hasFlexibleDimensions){let o=i.bottom-t.y,s=i.right-t.x,r=_e(this._overlayRef.getConfig().minHeight),a=_e(this._overlayRef.getConfig().minWidth),c=e.fitsInViewportVertically||r!=null&&r<=o,p=e.fitsInViewportHorizontally||a!=null&&a<=s;return c&&p}return!1}_pushOverlayOnScreen(e,t,i){if(this._previousPushAmount&&this._positionLocked)return{x:e.x+this._previousPushAmount.x,y:e.y+this._previousPushAmount.y};let o=ye(t),s=this._viewportRect,r=Math.max(e.x+o.width-s.width,0),a=Math.max(e.y+o.height-s.height,0),c=Math.max(s.top-i.top-e.y,0),p=Math.max(s.left-i.left-e.x,0),l=0,d=0;return o.width<=s.width?l=p||-r:l=e.x<this._getViewportMarginStart()?s.left-i.left-e.x:0,o.height<=s.height?d=c||-a:d=e.y<this._getViewportMarginTop()?s.top-i.top-e.y:0,this._previousPushAmount={x:l,y:d},{x:e.x+l,y:e.y+d}}_applyPosition(e,t){if(this._setTransformOrigin(e),this._setOverlayElementStyles(t,e),this._setBoundingBoxStyles(t,e),e.panelClass&&this._addPanelClasses(e.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(e!==this._lastPosition||!this._lastScrollVisibility||!Ke(this._lastScrollVisibility,i)){let o=new rt(e,i);this._positionChanges.next(o)}this._lastScrollVisibility=i}this._lastPosition=e,this._isInitialRender=!1}_setTransformOrigin(e){if(!this._transformOriginSelector)return;let t=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,o=e.overlayY;e.overlayX==="center"?i="center":this._isRtl()?i=e.overlayX==="start"?"right":"left":i=e.overlayX==="start"?"left":"right";for(let s=0;s<t.length;s++)t[s].style.transformOrigin=`${i} ${o}`}_calculateBoundingBoxRect(e,t){let i=this._viewportRect,o=this._isRtl(),s,r,a;if(t.overlayY==="top")r=e.y,s=i.height-r+this._getViewportMarginBottom();else if(t.overlayY==="bottom")a=i.height-e.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),s=i.height-a+this._getViewportMarginTop();else{let g=Math.min(i.bottom-e.y+i.top,e.y),m=this._lastBoundingBoxSize.height;s=g*2,r=e.y-g,s>m&&!this._isInitialRender&&!this._growAfterOpen&&(r=e.y-m/2)}let c=t.overlayX==="start"&&!o||t.overlayX==="end"&&o,p=t.overlayX==="end"&&!o||t.overlayX==="start"&&o,l,d,f;if(p)f=i.width-e.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),l=e.x-this._getViewportMarginStart();else if(c)d=e.x,l=i.right-e.x-this._getViewportMarginEnd();else{let g=Math.min(i.right-e.x+i.left,e.x),m=this._lastBoundingBoxSize.width;l=g*2,d=e.x-g,l>m&&!this._isInitialRender&&!this._growAfterOpen&&(d=e.x-m/2)}return{top:r,left:d,bottom:a,right:f,width:l,height:s}}_setBoundingBoxStyles(e,t){let i=this._calculateBoundingBoxRect(e,t);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let o={};if(this._hasExactPosition())o.top=o.left="0",o.bottom=o.right="auto",o.maxHeight=o.maxWidth="",o.width=o.height="100%";else{let s=this._overlayRef.getConfig().maxHeight,r=this._overlayRef.getConfig().maxWidth;o.width=u(i.width),o.height=u(i.height),o.top=u(i.top)||"auto",o.bottom=u(i.bottom)||"auto",o.left=u(i.left)||"auto",o.right=u(i.right)||"auto",t.overlayX==="center"?o.alignItems="center":o.alignItems=t.overlayX==="end"?"flex-end":"flex-start",t.overlayY==="center"?o.justifyContent="center":o.justifyContent=t.overlayY==="bottom"?"flex-end":"flex-start",s&&(o.maxHeight=u(s)),r&&(o.maxWidth=u(r))}this._lastBoundingBoxSize=i,P(this._boundingBox.style,o)}_resetBoundingBoxStyles(){P(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){P(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(e,t){let i={},o=this._hasExactPosition(),s=this._hasFlexibleDimensions,r=this._overlayRef.getConfig();if(o){let l=this._viewportRuler.getViewportScrollPosition();P(i,this._getExactOverlayY(t,e,l)),P(i,this._getExactOverlayX(t,e,l))}else i.position="static";let a="",c=this._getOffset(t,"x"),p=this._getOffset(t,"y");c&&(a+=`translateX(${c}px) `),p&&(a+=`translateY(${p}px)`),i.transform=a.trim(),r.maxHeight&&(o?i.maxHeight=u(r.maxHeight):s&&(i.maxHeight="")),r.maxWidth&&(o?i.maxWidth=u(r.maxWidth):s&&(i.maxWidth="")),P(this._pane.style,i)}_getExactOverlayY(e,t,i){let o={top:"",bottom:""},s=this._getOverlayPoint(t,this._overlayRect,e);if(this._isPushed&&(s=this._pushOverlayOnScreen(s,this._overlayRect,i)),e.overlayY==="bottom"){let r=this._document.documentElement.clientHeight;o.bottom=`${r-(s.y+this._overlayRect.height)}px`}else o.top=u(s.y);return o}_getExactOverlayX(e,t,i){let o={left:"",right:""},s=this._getOverlayPoint(t,this._overlayRect,e);this._isPushed&&(s=this._pushOverlayOnScreen(s,this._overlayRect,i));let r;if(this._isRtl()?r=e.overlayX==="end"?"left":"right":r=e.overlayX==="end"?"right":"left",r==="right"){let a=this._document.documentElement.clientWidth;o.right=`${a-(s.x+this._overlayRect.width)}px`}else o.left=u(s.x);return o}_getScrollVisibility(){let e=this._getOriginRect(),t=this._pane.getBoundingClientRect(),i=this._scrollables.map(o=>o.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:fe(e,i),isOriginOutsideView:St(e,i),isOverlayClipped:fe(t,i),isOverlayOutsideView:St(t,i)}}_subtractOverflows(e,...t){return t.reduce((i,o)=>i-Math.max(o,0),e)}_getNarrowedViewportRect(){let e=this._document.documentElement.clientWidth,t=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+e-this._getViewportMarginEnd(),bottom:i.top+t-this._getViewportMarginBottom(),width:e-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:t-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(e,t){return t==="x"?e.offsetX==null?this._offsetX:e.offsetX:e.offsetY==null?this._offsetY:e.offsetY}_validatePositions(){}_addPanelClasses(e){this._pane&&mt(e).forEach(t=>{t!==""&&this._appliedPanelClasses.indexOf(t)===-1&&(this._appliedPanelClasses.push(t),this._pane.classList.add(t))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(e=>{this._pane.classList.remove(e)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let e=this._origin;if(e instanceof E)return e.nativeElement.getBoundingClientRect();if(e instanceof Element)return e.getBoundingClientRect();let t=e.width||0,i=e.height||0;return{top:e.y,bottom:e.y+i,left:e.x,right:e.x+t,height:i,width:t}}_getContainerRect(){let e=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",t=this._overlayContainer.getContainerElement();e&&(t.style.display="block");let i=t.getBoundingClientRect();return e&&(t.style.display=""),i}};function P(n,e){for(let t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}function _e(n){if(typeof n!="number"&&n!=null){let[e,t]=n.split(Ue);return!t||t==="px"?parseFloat(e):null}return n||null}function ye(n){return{top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function Ke(n,e){return n===e?!0:n.isOriginClipped===e.isOriginClipped&&n.isOriginOutsideView===e.isOriginOutsideView&&n.isOverlayClipped===e.isOverlayClipped&&n.isOverlayOutsideView===e.isOverlayOutsideView}var ve="cdk-global-overlay-wrapper";function Ee(n){return new ct}var ct=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(e){let t=e.getConfig();this._overlayRef=e,this._width&&!t.width&&e.updateSize({width:this._width}),this._height&&!t.height&&e.updateSize({height:this._height}),e.hostElement.classList.add(ve),this._isDisposed=!1}top(e=""){return this._bottomOffset="",this._topOffset=e,this._alignItems="flex-start",this}left(e=""){return this._xOffset=e,this._xPosition="left",this}bottom(e=""){return this._topOffset="",this._bottomOffset=e,this._alignItems="flex-end",this}right(e=""){return this._xOffset=e,this._xPosition="right",this}start(e=""){return this._xOffset=e,this._xPosition="start",this}end(e=""){return this._xOffset=e,this._xPosition="end",this}width(e=""){return this._overlayRef?this._overlayRef.updateSize({width:e}):this._width=e,this}height(e=""){return this._overlayRef?this._overlayRef.updateSize({height:e}):this._height=e,this}centerHorizontally(e=""){return this.left(e),this._xPosition="center",this}centerVertically(e=""){return this.top(e),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let e=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:o,height:s,maxWidth:r,maxHeight:a}=i,c=(o==="100%"||o==="100vw")&&(!r||r==="100%"||r==="100vw"),p=(s==="100%"||s==="100vh")&&(!a||a==="100%"||a==="100vh"),l=this._xPosition,d=this._xOffset,f=this._overlayRef.getConfig().direction==="rtl",g="",m="",y="";c?y="flex-start":l==="center"?(y="center",f?m=d:g=d):f?l==="left"||l==="end"?(y="flex-end",g=d):(l==="right"||l==="start")&&(y="flex-start",m=d):l==="left"||l==="start"?(y="flex-start",g=d):(l==="right"||l==="end")&&(y="flex-end",m=d),e.position=this._cssPosition,e.marginLeft=c?"0":g,e.marginTop=p?"0":this._topOffset,e.marginBottom=this._bottomOffset,e.marginRight=c?"0":m,t.justifyContent=y,t.alignItems=p?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let e=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement,i=t.style;t.classList.remove(ve),i.justifyContent=i.alignItems=e.marginTop=e.marginBottom=e.marginLeft=e.marginRight=e.position="",this._overlayRef=null,this._isDisposed=!0}},Pe=(()=>{class n{_injector=h(R);constructor(){}global(){return Ee()}flexibleConnectedTo(t){return Mt(this._injector,t)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=v({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Rt=new b("OVERLAY_DEFAULT_CONFIG");function At(n,e){n.get(Y).load(Oe);let t=n.get(De),i=n.get(A),o=n.get(et),s=n.get(zt),r=n.get(yt),a=n.get(Xt,null,{optional:!0})||n.get(j).createRenderer(null,null),c=new W(e),p=n.get(Rt,null,{optional:!0})?.usePopover??!0;c.direction=c.direction||r.value,"showPopover"in i.body?c.usePopover=e?.usePopover??p:c.usePopover=!1;let l=i.createElement("div"),d=i.createElement("div");l.id=o.getId("cdk-overlay-"),l.classList.add("cdk-overlay-pane"),d.appendChild(l),c.usePopover&&(d.setAttribute("popover","manual"),d.classList.add("cdk-overlay-popover"));let f=c.usePopover?c.positionStrategy?.getPopoverInsertionPoint?.():null;return Pt(f)?f.after(d):f?.type==="parent"?f.element.appendChild(d):t.getContainerElement().appendChild(d),new at(new ae(l,s,n),d,l,c,n.get(D),n.get(Ce),i,n.get(ee),n.get(Se),e?.disableAnimations??n.get(Nt,null,{optional:!0})==="NoopAnimations",n.get(Bt),a)}var Me=(()=>{class n{scrollStrategies=h(ke);_positionBuilder=h(Pe);_injector=h(R);constructor(){}create(t){return At(this._injector,t)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||n)};static \u0275prov=v({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),qe=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],Qe=new b("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let n=h(R);return()=>Et(n)}}),Dt=(()=>{class n{elementRef=h(E);constructor(){}static \u0275fac=function(i){return new(i||n)};static \u0275dir=pt({type:n,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return n})(),Re=new b("cdk-connected-overlay-default-config"),Je=(()=>{class n{_dir=h(yt,{optional:!0});_injector=h(R);_overlayRef;_templatePortal;_backdropSubscription=O.EMPTY;_attachSubscription=O.EMPTY;_detachSubscription=O.EMPTY;_positionSubscription=O.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=h(Qe);_ngZone=h(D);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(t){this._offsetX=t,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(t){this._offsetY=t,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(t){typeof t!="string"&&this._assignConfig(t)}backdropClick=new k;positionChange=new k;attach=new k;detach=new k;overlayKeydown=new k;overlayOutsideClick=new k;constructor(){let t=h(Yt),i=h(Ht),o=h(Re,{optional:!0}),s=h(Rt,{optional:!0});this.usePopover=s?.usePopover===!1?null:"global",this._templatePortal=new re(t,i),this.scrollStrategy=this._scrollStrategyFactory(),o&&this._assignConfig(o)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(t){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),t.origin&&this.open&&this._position.apply()),t.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=qe);let t=this._overlayRef=At(this._injector,this._buildConfig());this._attachSubscription=t.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=t.detachments().subscribe(()=>this.detach.emit()),t.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!tt(i)&&(i.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let o=this._getOriginElement(),s=J(i);(!o||o!==s&&!o.contains(s))&&this.overlayOutsideClick.next(i)})}_buildConfig(){let t=this._position=this.positionStrategy||this._createPositionStrategy(),i=new W({direction:this._dir||"ltr",positionStrategy:t,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(t){let i=this.positions.map(o=>({originX:o.originX,originY:o.originY,overlayX:o.overlayX,overlayY:o.overlayY,offsetX:o.offsetX||this.offsetX,offsetY:o.offsetY||this.offsetY,panelClass:o.panelClass||void 0}));return t.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let t=Mt(this._injector,this._getOrigin());return this._updatePositionStrategy(t),t}_getOrigin(){return this.origin instanceof Dt?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof Dt?this.origin.elementRef.nativeElement:this.origin instanceof E?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let t=this._overlayRef;t.getConfig().hasBackdrop=this.hasBackdrop,t.updateSize({width:this._getWidth()}),t.hasAttached()||t.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=t.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(Vt(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(t){this.origin=t.origin??this.origin,this.positions=t.positions??this.positions,this.positionStrategy=t.positionStrategy??this.positionStrategy,this.offsetX=t.offsetX??this.offsetX,this.offsetY=t.offsetY??this.offsetY,this.width=t.width??this.width,this.height=t.height??this.height,this.minWidth=t.minWidth??this.minWidth,this.minHeight=t.minHeight??this.minHeight,this.backdropClass=t.backdropClass??this.backdropClass,this.panelClass=t.panelClass??this.panelClass,this.viewportMargin=t.viewportMargin??this.viewportMargin,this.scrollStrategy=t.scrollStrategy??this.scrollStrategy,this.disableClose=t.disableClose??this.disableClose,this.transformOriginSelector=t.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=t.hasBackdrop??this.hasBackdrop,this.lockPosition=t.lockPosition??this.lockPosition,this.flexibleDimensions=t.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=t.growAfterOpen??this.growAfterOpen,this.push=t.push??this.push,this.disposeOnNavigation=t.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=t.usePopover??this.usePopover,this.matchWidth=t.matchWidth??this.matchWidth}static \u0275fac=function(i){return new(i||n)};static \u0275dir=pt({type:n,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",w],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",w],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",w],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",w],push:[2,"cdkConnectedOverlayPush","push",w],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",w],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",w],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[Lt]})}return n})(),ti=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=S({type:n});static \u0275inj=x({providers:[Me],imports:[I,le,bt,bt]})}return n})();export{X as a,pe as b,Ye as c,Xe as d,he as e,bi as f,wi as g,de as h,Ti as i,Vi as j,$i as k,Ge as l,be as m,Et as n,W as o,De as p,at as q,Mt as r,lt as s,Ee as t,Rt as u,At as v,Dt as w,Je as x,ti as y};
