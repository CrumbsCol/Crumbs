import{a as K,b as W,c as ge,d as ee,e as te,f as pe,g as It,h as Et,i as ue,j as Ot,k as ae,l as Tt,m as Gt,n as At,o as Ft,p as zt,q as Nt,r as Vt}from"./chunk-OZXKNZFF.js";import{e as at,j as nt,l as ot}from"./chunk-BH4FBZBR.js";import"./chunk-V4GPLOWT.js";import{a as Ye}from"./chunk-UMJS5DOS.js";import{A as Ct,D as Mt,E as Pt,G as kt,H as Dt,a as rt,b as st,c as lt,d as A,f as dt,g as ct,l as mt,m as gt,o as pt,p as ut,q as ft,r as _t,s as bt,t as ht,u as vt,w as yt,x as wt,z as xt}from"./chunk-E7D76VHX.js";import{d as me,e as I,f as E}from"./chunk-SUNZS7V5.js";import"./chunk-6EZDNMIA.js";import{D as et,E as tt,e as Ze,h as Je,t as We}from"./chunk-RR2YCN3U.js";import{a as Rt,b as Lt,c as Bt,e as qt,g as fe}from"./chunk-6HKXBAF3.js";import{a as St,b as B,c as F}from"./chunk-YOSZZ452.js";import{a as R,b as L}from"./chunk-LMHP7UNO.js";import{$a as k,Ab as _,Ba as l,Bb as w,Cb as X,Ec as it,Gb as je,Hb as $e,Ib as le,Jb as y,Kb as de,Lb as Z,Ma as x,Mb as M,Na as ze,Rb as V,S as Ie,Tb as Xe,U as Ee,Ub as z,Vb as S,W as Oe,Wa as $,Xa as m,Y as u,Ya as g,Yb as He,Zb as H,_a as P,_b as Qe,aa as b,ab as v,ba as h,bb as o,ca as Te,cb as n,db as f,eb as oe,fb as re,fc as ce,gc as J,hb as C,hc as T,ia as Me,ib as ie,ic as G,jb as p,jc as Ue,lb as d,mb as Ne,na as O,nb as Ve,pa as Ge,pb as Re,qb as Le,rb as Be,sa as Ae,va as Fe,vb as se,wc as Ke,xb as D,yb as qe,zb as s}from"./chunk-O6WD76AR.js";var Qt=["switch"],Ut=["*"];function Yt(i,a){i&1&&(o(0,"span",11),Te(),o(1,"svg",13),f(2,"path",14),n(),o(3,"svg",15),f(4,"path",16),n()())}var Zt=new Oe("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),_e=class{source;checked;constructor(a,e){this.source=a,this.checked=e}},Pe=(()=>{class i{_elementRef=u(Ae);_focusMonitor=u(Je);_changeDetectorRef=u(He);defaults=u(Zt);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new _e(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Ze();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Me;toggleChange=new Me;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){u(Ke).load(tt);let e=u(new Xe("tabindex"),{optional:!0}),t=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=t.color||"accent",this.id=this._uniqueId=u(We).getId("mat-mdc-slide-toggle-"),this.hideIcon=t.hideIcon??!1,this.disabledInteractive=t.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new _e(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=x({type:i,selectors:[["mat-slide-toggle"]],viewQuery:function(t,r){if(t&1&&Re(Qt,5),t&2){let c;Le(c=Be())&&(r._switchElement=c.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(t,r){t&2&&(ie("id",r.id),$("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),qe(r.color?"mat-"+r.color:""),D("mat-mdc-slide-toggle-focused",r._focused)("mat-mdc-slide-toggle-checked",r.checked)("_mat-animation-noopable",r._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",H],color:"color",disabled:[2,"disabled","disabled",H],disableRipple:[2,"disableRipple","disableRipple",H],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:Qe(e)],checked:[2,"checked","checked",H],hideIcon:[2,"hideIcon","hideIcon",H],disabledInteractive:[2,"disabledInteractive","disabledInteractive",H]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[le([{provide:rt,useExisting:Ie(()=>i),multi:!0},{provide:lt,useExisting:i,multi:!0}]),Ge],ngContentSelectors:Ut,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(t,r){if(t&1&&(Ne(),o(0,"div",1)(1,"button",2,0),p("click",function(){return r._handleClick()}),f(3,"div",3)(4,"span",4),o(5,"span",5)(6,"span",6)(7,"span",7),f(8,"span",8),n(),o(9,"span",9),f(10,"span",10),n(),m(11,Yt,5,0,"span",11),n()()(),o(12,"label",12),p("click",function(U){return U.stopPropagation()}),Ve(13),n()()),t&2){let c=se(2);v("labelPosition",r.labelPosition),l(),D("mdc-switch--selected",r.checked)("mdc-switch--unselected",!r.checked)("mdc-switch--checked",r.checked)("mdc-switch--disabled",r.disabled)("mat-mdc-slide-toggle-disabled-interactive",r.disabledInteractive),v("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("disabled",r.disabled&&!r.disabledInteractive),$("id",r.buttonId)("name",r.name)("aria-label",r.ariaLabel)("aria-labelledby",r._getAriaLabelledBy())("aria-describedby",r.ariaDescribedby)("aria-required",r.required||null)("aria-checked",r.checked)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),l(9),v("matRippleTrigger",c)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),l(),g(r.hideIcon?-1:11),l(),v("for",r.buttonId),$("id",r._labelId)}},dependencies:[et,nt],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return i})(),jt=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=ze({type:i});static \u0275inj=Ee({imports:[Pe,it]})}return i})();var $t=(i,a)=>a.id;function Kt(i,a){if(i&1){let e=C();o(0,"div",27),p("click",function(){b(e);let r=d();return h(r.onCerrar())})("keydown.escape",function(){b(e);let r=d();return h(r.onCerrar())}),n()}}function Wt(i,a){if(i&1&&(o(0,"mat-option",11),s(1),n()),i&2){let e=a.$implicit;v("value",e.id),l(),_(e.nombre)}}function ea(i,a){i&1&&(o(0,"mat-icon",34),s(1,"check_circle"),n())}function ta(i,a){if(i&1){let e=C();o(0,"mat-form-field",35)(1,"mat-label"),s(2,"Monto"),n(),o(3,"input",37),p("input",function(r){b(e);let c=d().$implicit,U=d();return h(U.setMontoManual(c.id,r.target.valueAsNumber))}),n()()}if(i&2){let e=d().$implicit,t=d();l(3),v("value",t.getMontoManual(e.id))}}function aa(i,a){if(i&1){let e=C();o(0,"div",36)(1,"span",38),s(2,"Invitado"),n(),o(3,"mat-slide-toggle",39),p("change",function(){b(e);let r=d().$implicit,c=d();return h(c.toggleInvitado(r.id))}),n()()}if(i&2){let e=d().$implicit,t=d();l(3),v("checked",t.esInvitado(e.id))}}function ia(i,a){if(i&1){let e=C();o(0,"div",22)(1,"div",28)(2,"button",29),p("click",function(){let r=b(e).$implicit,c=d();return h(c.toggleMiembro(r.id))}),o(3,"div",30)(4,"mat-icon"),s(5,"person"),n()(),o(6,"div",31)(7,"span",32),s(8),n(),o(9,"span",33),s(10),n()(),m(11,ea,2,0,"mat-icon",34),n(),m(12,ta,4,1,"mat-form-field",35),n(),m(13,aa,4,1,"div",36),n()}if(i&2){let e=a.$implicit,t=d();l(2),$("aria-label","Seleccionar a "+e.nombre),l(6),_(e.nombre),l(2),w("@",e.userName||"fantasma"),l(),g(t.estaSeleccionado(e.id)?11:-1),l(),g(t.estaSeleccionado(e.id)&&t.esManual()&&!t.esInvitado(e.id)?12:-1),l(),g(t.estaSeleccionado(e.id)?13:-1)}}function na(i,a){i&1&&(o(0,"span",42),s(1,"Los montos deben sumar exactamente el total del gasto"),n())}function oa(i,a){if(i&1&&(o(0,"div",40)(1,"span",41),s(2),n(),m(3,na,2,0,"span",42),n()),i&2){let e,t=d();D("total-valido",t.manualesValidos())("total-error",!t.manualesValidos()),l(2),X("Total asignado: ",t.totalManual()," / ",((e=t.form.get("monto"))==null?null:e.value)||0),l(),g(t.manualesValidos()?-1:3)}}var be=class i{fb=u(vt);abierto=S(!1);miembros=S([]);cerrar=z();gastoAgregado=z();esManual=O(!1);miembrosSeleccionados=O(new Set);invitados=O(new Set);montosManual=O(new Map);pagadorId=O("");form=this.fb.group({nombre:["",[A.required,A.minLength(2),A.maxLength(12)]],descripcion:[""],monto:[null,[A.required,A.min(1),A.max(9999999),A.pattern(/^\d+$/)]],fecha:[null,A.required],pagador:["",A.required]});participantesNoInvitados=V(()=>{let a=this.miembrosSeleccionados(),e=this.invitados();return this.miembros().filter(r=>a.has(r.id)&&!e.has(r.id))});totalManual=V(()=>{let a=this.montosManual(),e=0;return a.forEach(t=>e+=t||0),e});montoGasto=V(()=>this.form.get("monto")?.value??0);manualesValidos=V(()=>this.esManual()?this.totalManual()===(this.form.get("monto")?.value??0):!0);toggleMetodoDivision(){this.esManual.update(a=>!a),this.esManual()||this.montosManual.set(new Map)}toggleMiembro(a){this.miembrosSeleccionados.update(e=>{let t=new Set(e);return t.has(a)?t.delete(a):t.add(a),t})}estaSeleccionado(a){return this.miembrosSeleccionados().has(a)}toggleInvitado(a){this.invitados.update(e=>{let t=new Set(e);return t.has(a)?t.delete(a):t.add(a),t})}esInvitado(a){return this.invitados().has(a)}setMontoManual(a,e){this.montosManual.update(t=>{let r=new Map(t);return r.set(a,e||0),r})}getMontoManual(a){return this.montosManual().get(a)??0}onSubmit(){if(this.form.invalid){this.form.markAllAsTouched();return}let a=this.miembrosSeleccionados();if(a.size===0||this.esManual()&&!this.manualesValidos())return;let e=this.form.value,t=this.miembros(),r=t.filter(N=>a.has(N.id));if(!t.find(N=>N.id===e.pagador))return;let U=this.esManual()?"manual":"equitativo",j=e.fecha instanceof Date?e.fecha.toISOString():new Date().toISOString(),Y={nombre:e.nombre,descripcion:e.descripcion||void 0,monto:e.monto,fecha:j,metodoDivision:U,pagadoPorMiembroId:e.pagador,participantes:r.map(N=>({salidaMiembroId:N.id,esInvitado:this.esInvitado(N.id),montoManual:this.esManual()&&!this.esInvitado(N.id)?this.getMontoManual(N.id):null}))};this.gastoAgregado.emit(Y),this.resetForm()}onCerrar(){this.cerrar.emit(),this.resetForm()}resetForm(){this.form.reset(),this.esManual.set(!1),this.miembrosSeleccionados.set(new Set),this.invitados.set(new Set),this.montosManual.set(new Map),this.pagadorId.set("")}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=x({type:i,selectors:[["app-drawer-agregar-gasto"]],inputs:{abierto:[1,"abierto"],miembros:[1,"miembros"]},outputs:{cerrar:"cerrar",gastoAgregado:"gastoAgregado"},features:[le([ot()])],decls:53,vars:11,consts:[["picker",""],["tabindex","-1",1,"drawer-overlay"],["role","dialog","aria-labelledby","drawer-gasto-titulo",1,"drawer-panel"],[1,"drawer-body",3,"ngSubmit","formGroup"],[1,"campo"],["appearance","outline",1,"w-full"],["matInput","","formControlName","nombre","maxlength","12"],["align","end"],["matInput","","formControlName","descripcion"],["matInput","","formControlName","monto","type","number","min","1","max","9999999","pattern","[0-9]*"],["formControlName","pagador","placeholder","Seleccionar pagador"],[3,"value"],[1,"fecha-equitativo-row"],[1,"fecha-col"],["appearance","outline",1,"fecha-field"],["matInput","","formControlName","fecha",3,"matDatepicker"],["matIconSuffix","",3,"for"],[1,"equitativo-col"],[1,"equitativo-label"],["aria-label","Toggle equitativo",3,"change","checked"],[1,"campo-label"],[1,"miembros-lista"],[1,"miembro-card-wrapper"],[1,"manual-total",3,"total-valido","total-error"],[1,"drawer-footer"],["mat-button","","type","button",1,"btn-cancelar",3,"click"],["mat-raised-button","","type","submit",1,"btn-agregar",3,"disabled"],["tabindex","-1",1,"drawer-overlay",3,"click","keydown.escape"],[1,"miembro-row"],["type","button",1,"miembro-card",3,"click"],[1,"miembro-avatar"],[1,"miembro-info"],[1,"miembro-title"],[1,"miembro-desc"],[1,"miembro-check"],["appearance","outline",1,"manual-field"],[1,"invitado-toggle"],["matInput","","type","number","min","0","max","9999999","pattern","[0-9]*",3,"input","value"],[1,"invitado-label"],["aria-label","Marcar como invitado",3,"change","checked"],[1,"manual-total"],[1,"total-cifras"],[1,"total-hint"]],template:function(e,t){if(e&1&&(m(0,Kt,1,0,"div",1),o(1,"aside",2)(2,"form",3),p("ngSubmit",function(){return t.onSubmit()}),o(3,"div",4)(4,"mat-form-field",5)(5,"mat-label"),s(6,"Nombre"),n(),f(7,"input",6),o(8,"mat-hint",7),s(9),n()()(),o(10,"div",4)(11,"mat-form-field",5)(12,"mat-label"),s(13,"Descripcion"),n(),f(14,"input",8),n()(),o(15,"div",4)(16,"mat-form-field",5)(17,"mat-label"),s(18,"Monto"),n(),f(19,"input",9),n()(),o(20,"div",4)(21,"mat-form-field",5)(22,"mat-label"),s(23,"Pagador"),n(),o(24,"mat-select",10),P(25,Wt,2,2,"mat-option",11,$t),n()()(),o(27,"div",4)(28,"div",12)(29,"div",13)(30,"mat-form-field",14)(31,"mat-label"),s(32,"Fecha/ Hora"),n(),f(33,"input",15)(34,"mat-datepicker-toggle",16)(35,"mat-datepicker",null,0),n()(),o(37,"div",17)(38,"span",18),s(39,"Equitativo"),n(),o(40,"mat-slide-toggle",19),p("change",function(){return t.toggleMetodoDivision()}),n()()()(),o(41,"div",4)(42,"span",20),s(43,"Miembros"),n(),o(44,"div",21),P(45,ia,14,6,"div",22,$t),n()(),m(47,oa,4,7,"div",23),o(48,"div",24)(49,"button",25),p("click",function(){return t.onCerrar()}),s(50," Cancelar "),n(),o(51,"button",26),s(52," Agregar "),n()()()()),e&2){let r,c=se(36);g(t.abierto()?0:-1),l(),D("abierto",t.abierto()),$("aria-hidden",!t.abierto()),l(),v("formGroup",t.form),l(7),w("",((r=t.form.get("nombre"))==null||r.value==null?null:r.value.length)||0,"/12"),l(16),k(t.miembros()),l(8),v("matDatepicker",c),l(),v("for",c),l(6),v("checked",!t.esManual()),l(5),k(t.miembros()),l(2),g(t.esManual()&&t.miembrosSeleccionados().size>0?47:-1),l(4),v("disabled",t.form.invalid||t.miembrosSeleccionados().size===0||t.esManual()&&!t.manualesValidos())}},dependencies:[yt,mt,st,gt,dt,ct,bt,ht,_t,ft,ut,pt,E,I,L,R,Pt,Mt,wt,xt,Ct,Dt,kt,jt,Pe,Ft,Tt,Gt,At,Nt,zt,at],styles:["[_nghost-%COMP%]{display:contents}.drawer-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background-color:#0000004d;z-index:999;transition:opacity .3s ease}.drawer-panel[_ngcontent-%COMP%]{position:fixed;top:0;right:0;height:100vh;width:420px;background-color:var(--mat-sys-surface);z-index:1000;transform:translate(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-4px 0 12px #00000014;border-radius:16px 0 0 16px}.drawer-panel.abierto[_ngcontent-%COMP%]{transform:translate(0)}.drawer-body[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:2.5rem 2rem;display:flex;flex-direction:column;gap:.25rem}.campo[_ngcontent-%COMP%]{margin-bottom:.5rem}.campo-label[_ngcontent-%COMP%]{display:block;font-size:.875rem;font-weight:500;color:var(--mat-sys-on-surface);margin-bottom:.25rem}.fecha-equitativo-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1.5rem}.fecha-col[_ngcontent-%COMP%]{flex:0 0 auto}.fecha-field[_ngcontent-%COMP%]{width:160px}.equitativo-col[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;margin-top:-.5rem}.equitativo-label[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-on-surface)}.miembros-lista[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;margin-top:.5rem}.miembro-card-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.5rem}.miembro-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.miembro-card[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border:1px solid var(--mat-sys-outline-variant);border-radius:12px;cursor:pointer;transition:border-color .2s ease,background-color .2s ease;flex:1;min-width:0}.miembro-card[_ngcontent-%COMP%]:hover{border-color:var(--mat-sys-outline);background-color:var(--mat-sys-surface-container-lowest)}.miembro-avatar[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;background-color:var(--mat-sys-surface-container);display:flex;align-items:center;justify-content:center;color:var(--mat-sys-on-surface-variant);flex-shrink:0}.miembro-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-width:0}.miembro-title[_ngcontent-%COMP%]{font-size:.875rem;font-weight:500;color:var(--mat-sys-on-surface)}.miembro-desc[_ngcontent-%COMP%]{font-size:.75rem;color:var(--mat-sys-on-surface-variant)}.miembro-check[_ngcontent-%COMP%]{color:var(--mat-sys-primary);font-size:20px;width:20px;height:20px;flex-shrink:0}.manual-field[_ngcontent-%COMP%]{width:120px;flex-shrink:0;margin-top:1rem}.invitado-toggle[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.375rem;padding-left:1rem}.invitado-label[_ngcontent-%COMP%]{font-size:.75rem;color:var(--mat-sys-on-surface-variant);white-space:nowrap}.drawer-footer[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:1.5rem;padding:1.5rem 2rem;margin-top:auto;border-top:1px solid var(--mat-sys-outline-variant)}.btn-cancelar[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-on-surface-variant)}.btn-agregar[_ngcontent-%COMP%]{background-color:var(--mat-sys-surface-container)!important;color:var(--mat-sys-on-surface)!important;border-radius:8px!important;padding:.5rem 2rem!important;font-size:.875rem}.manual-total[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem;padding:.75rem 1rem;border-radius:8px;font-size:.875rem;margin-top:.5rem}.manual-total.total-valido[_ngcontent-%COMP%]   .total-cifras[_ngcontent-%COMP%]{color:#2e7d32;font-weight:500}.manual-total.total-error[_ngcontent-%COMP%]   .total-cifras[_ngcontent-%COMP%]{color:var(--mat-sys-error);font-weight:500}.total-hint[_ngcontent-%COMP%]{font-size:.75rem;color:var(--mat-sys-error);margin-top:.25rem}"]})};var ra=(i,a)=>a.miembro.id,sa=(i,a)=>a.id;function la(i,a){i&1&&(o(0,"div",5)(1,"mat-icon"),s(2,"group_off"),n(),o(3,"p"),s(4,"No hay integrantes fantasma en esta salida"),n()())}function da(i,a){if(i&1&&(s(0),y(1,"currency")),i&2){let e=d().$implicit;w(" Le deben ",M(1,1,e.balance.balanceNeto,"COP","symbol-narrow","1.0-0")," ")}}function ca(i,a){if(i&1&&(s(0),y(1,"currency")),i&2){let e=d().$implicit;w(" Debe ",M(1,1,-e.balance.balanceNeto,"COP","symbol-narrow","1.0-0")," ")}}function ma(i,a){i&1&&(o(0,"span",12),s(1,"\u2713 Sin saldo pendiente"),n())}function ga(i,a){if(i&1){let e=C();f(0,"mat-divider"),o(1,"div",13)(2,"span",14),s(3,"Este integrante debe dinero a la salida:"),n(),o(4,"button",15),p("click",function(){b(e);let r=d().$implicit,c=d(2);return h(c.onSaldarDeuda(r.miembro.id,-r.balance.balanceNeto))}),o(5,"mat-icon"),s(6,"check_circle"),n(),s(7),y(8,"currency"),n()()}if(i&2){let e=d().$implicit;l(7),w(" Confirmar que pag\xF3 ",M(8,1,-e.balance.balanceNeto,"COP","symbol-narrow","1.0-0")," ")}}function pa(i,a){if(i&1){let e=C();o(0,"div",16)(1,"div",17)(2,"span",18),s(3),n(),o(4,"span",19),s(5),y(6,"currency"),n()(),o(7,"button",20),p("click",function(){let r=b(e).$implicit,c=d(4);return h(c.onConfirmarPago(r.id))}),s(8," Confirmar "),n()()}if(i&2){let e=a.$implicit;l(3),_(e.deudorNombre),l(2),_(M(6,2,e.monto,"COP","symbol-narrow","1.0-0"))}}function ua(i,a){if(i&1&&(f(0,"mat-divider"),o(1,"div",13)(2,"span",14),s(3,"Pagos pendientes por confirmar:"),n(),P(4,pa,9,7,"div",16,sa),n()),i&2){let e=d().$implicit;l(4),k(e.pagosPendientes)}}function fa(i,a){if(i&1&&(o(0,"div",6)(1,"div",7)(2,"mat-icon",8),s(3,"person_outline"),n(),o(4,"div",9)(5,"span",10),s(6),n(),o(7,"span",11),m(8,da,2,6)(9,ca,2,6)(10,ma,2,0,"span",12),n()()(),m(11,ga,9,6),m(12,ua,6,0),n()),i&2){let e=a.$implicit;l(6),_(e.miembro.nombre),l(),D("debe",e.balance.balanceNeto<0)("le-deben",e.balance.balanceNeto>0),l(),g(e.balance.balanceNeto>0?8:e.balance.balanceNeto<0?9:10),l(3),g(e.balance.balanceNeto<0?11:-1),l(),g(e.pagosPendientes.length>0?12:-1)}}function _a(i,a){if(i&1&&P(0,fa,13,8,"div",6,ra),i&2){let e=d();k(e.fantasmas())}}var he=class i{abierto=S(!1);fantasmas=S([]);cerrar=z();confirmarPago=z();saldarDeuda=z();onCerrar(){this.cerrar.emit()}onConfirmarPago(a){this.confirmarPago.emit(a)}onSaldarDeuda(a,e){this.saldarDeuda.emit({fantasmaMiembroId:a,monto:e})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=x({type:i,selectors:[["app-drawer-gestion-fantasmas"]],inputs:{abierto:[1,"abierto"],fantasmas:[1,"fantasmas"]},outputs:{cerrar:"cerrar",confirmarPago:"confirmarPago",saldarDeuda:"saldarDeuda"},decls:11,vars:5,consts:[[1,"drawer-overlay",3,"click"],[1,"drawer-panel"],[1,"drawer-header"],["mat-icon-button","","aria-label","Cerrar",3,"click"],[1,"drawer-content"],[1,"empty-state"],[1,"fantasma-card"],[1,"fantasma-header"],[1,"avatar-icon"],[1,"fantasma-info"],[1,"fantasma-nombre"],[1,"fantasma-balance"],[1,"saldado"],[1,"pagos-section"],[1,"pagos-title"],["mat-flat-button","","color","primary",1,"btn-saldar",3,"click"],[1,"pago-item"],[1,"pago-info"],[1,"pago-deudor"],[1,"pago-monto"],["mat-flat-button","","color","primary",1,"btn-confirmar",3,"click"]],template:function(e,t){e&1&&(o(0,"div",0),p("click",function(){return t.onCerrar()}),n(),o(1,"aside",1)(2,"header",2)(3,"h2"),s(4,"Gesti\xF3n de Fantasmas"),n(),o(5,"button",3),p("click",function(){return t.onCerrar()}),o(6,"mat-icon"),s(7,"close"),n()()(),o(8,"div",4),m(9,la,5,0,"div",5)(10,_a,2,0),n()()),e&2&&(D("visible",t.abierto()),l(),D("open",t.abierto()),l(8),g(t.fantasmas().length===0?9:10))},dependencies:[G,E,I,me,L,R,F,B,T],styles:[".drawer-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background:#0006;z-index:999;opacity:0;pointer-events:none;transition:opacity .3s}.drawer-overlay.visible[_ngcontent-%COMP%]{opacity:1;pointer-events:all}.drawer-panel[_ngcontent-%COMP%]{position:fixed;top:0;right:-400px;width:380px;max-width:90vw;height:100vh;background:var(--mat-sys-surface, #fff);z-index:1000;transition:right .3s ease;display:flex;flex-direction:column;box-shadow:-4px 0 20px #00000026}.drawer-panel.open[_ngcontent-%COMP%]{right:0}.drawer-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.drawer-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:1.2rem;font-weight:500}.drawer-content[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:16px 20px}.empty-state[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:8px;padding:40px 0;color:var(--mat-sys-on-surface-variant, #666)}.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px}.fantasma-card[_ngcontent-%COMP%]{border:1px solid var(--mat-sys-outline-variant, #e0e0e0);border-radius:12px;padding:16px;margin-bottom:16px}.fantasma-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.avatar-icon[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant, #666);font-size:32px;width:32px;height:32px}.fantasma-info[_ngcontent-%COMP%]{display:flex;flex-direction:column}.fantasma-nombre[_ngcontent-%COMP%]{font-weight:500;font-size:1rem}.fantasma-balance[_ngcontent-%COMP%]{font-size:.85rem}.fantasma-balance.debe[_ngcontent-%COMP%]{color:#e03131}.fantasma-balance.le-deben[_ngcontent-%COMP%]{color:#2f9e44}.pagos-section[_ngcontent-%COMP%]{padding-top:12px}.pagos-title[_ngcontent-%COMP%]{font-size:.8rem;color:var(--mat-sys-on-surface-variant, #666);display:block;margin-bottom:8px}.pago-item[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:8px 0}.pago-info[_ngcontent-%COMP%]{display:flex;flex-direction:column}.pago-deudor[_ngcontent-%COMP%]{font-size:.9rem}.pago-monto[_ngcontent-%COMP%]{font-size:.85rem;color:var(--mat-sys-on-surface-variant, #666)}.btn-confirmar[_ngcontent-%COMP%]{font-size:.8rem}.btn-saldar[_ngcontent-%COMP%]{width:100%;margin-top:8px;display:flex;align-items:center;gap:4px}.saldado[_ngcontent-%COMP%]{color:#2f9e44;font-weight:500}"]})};var ba=(i,a)=>a.id;function ha(i,a){i&1&&(o(0,"div",3)(1,"p"),s(2,"No hay gastos registrados a\xFAn."),n()())}function va(i,a){i&1&&(o(0,"span",7),s(1,"Yo pagu\xE9"),n())}function ya(i,a){if(i&1){let e=C();o(0,"a",5),p("click",function(){let r=b(e).$implicit,c=d(2);return h(c.gastoClick.emit(r))})("keydown.enter",function(){let r=b(e).$implicit,c=d(2);return h(c.gastoClick.emit(r))}),o(1,"div",6)(2,"span"),s(3),n(),m(4,va,2,0,"span",7),n(),o(5,"span",8),s(6),y(7,"currency"),y(8,"date"),n()()}if(i&2){let e,t=a.$implicit,r=d(2);l(3),_(t.nombre),l(),g(t.pagadoPor.id===((e=r.usuarioActual())==null?null:e.id)?4:-1),l(2),X(" ",M(7,4,t.monto,"MXN","symbol-narrow","1.0-0")," \xB7 ",Z(8,9,t.fecha,"dd/MM/yyyy HH:mm")," ")}}function wa(i,a){if(i&1&&(o(0,"mat-nav-list"),P(1,ya,9,12,"a",4,ba),n()),i&2){let e=d();l(),k(e.gastos())}}var ve=class i{gastos=S.required();usuarioActual=S(null);gastoClick=z();static \u0275fac=function(e){return new(e||i)};static \u0275cmp=x({type:i,selectors:[["app-gastos-card"]],inputs:{gastos:[1,"gastos"],usuarioActual:[1,"usuarioActual"]},outputs:{gastoClick:"gastoClick"},decls:8,vars:1,consts:[["appearance","outlined",1,"panel-card"],[1,"text-base","font-bold"],[1,"p-0"],[1,"empty-state"],["mat-list-item","","tabindex","0",1,"cursor-pointer"],["mat-list-item","","tabindex","0",1,"cursor-pointer",3,"click","keydown.enter"],["matListItemTitle","",1,"flex","items-center"],[1,"ml-2","inline-flex","items-center","rounded-full","bg-indigo-50","px-2","py-0.5","text-xs","font-medium","text-indigo-700","ring-1","ring-inset","ring-indigo-700/10"],["matListItemLine",""]],template:function(e,t){e&1&&(o(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title",1),s(3,"Gastos"),n()(),f(4,"mat-divider"),o(5,"mat-card-content",2),m(6,ha,3,0,"div",3)(7,wa,3,0,"mat-nav-list"),n()()),e&2&&(l(6),g(t.gastos().length===0?6:7))},dependencies:[fe,Rt,Bt,qt,Lt,F,B,ae,Ot,ue,It,pe,J,T],styles:["[_nghost-%COMP%]{display:block}.panel-card[_ngcontent-%COMP%]{border-radius:12px}.empty-state[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:2rem;color:var(--mat-sys-on-surface-variant);font-size:.875rem}"]})};function xa(i,a){if(i&1&&(f(0,"mat-divider",8),o(1,"div",15)(2,"span",16),s(3),y(4,"titlecase"),n(),o(5,"span",17),s(6),n()()),i&2){let e=d();l(3),w("M\xE9todo de pago (",de(4,2,e.data.pagador.tipoMetodoPago),"):"),l(3),_(e.data.pagador.metodoPago)}}var ye=class i{dialogRef=u(K);data=u(W);confirmar(){this.dialogRef.close({deudorId:this.data.deudor.id,pagadorId:this.data.pagador.id,monto:this.data.monto,gastoId:this.data.gastoId})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=x({type:i,selectors:[["app-registrar-pago-modal"]],decls:27,vars:8,consts:[["aria-label","Registrar Pago",1,"modal-view"],[1,"page-title"],[1,"modal-card"],[1,"mb-4"],[1,"bg-gray-50","p-4","rounded-md","border","border-gray-200"],[1,"flex","justify-between","mb-2"],[1,"text-gray-600"],[1,"font-medium"],[1,"my-2"],[1,"flex","justify-between"],[1,"font-bold","text-lg","text-emerald-600"],[1,"text-sm","text-gray-500","mt-4"],[1,"action-bar"],["mat-button","","mat-dialog-close","",1,"btn-cancelar"],["mat-flat-button","",1,"btn-primary",3,"click"],[1,"flex","flex-col","mb-2"],[1,"text-gray-600","text-sm"],[1,"font-medium","font-mono","text-gray-800","break-all"]],template:function(e,t){e&1&&(o(0,"section",0)(1,"h1",1),s(2,"Registrar Pago"),n(),o(3,"div",2)(4,"p",3),s(5,"Vas a registrar un pago para saldar tu deuda."),n(),o(6,"div",4)(7,"div",5)(8,"span",6),s(9,"Para:"),n(),o(10,"span",7),s(11),n()(),m(12,xa,7,4),f(13,"mat-divider",8),o(14,"div",9)(15,"span",6),s(16,"Monto:"),n(),o(17,"span",10),s(18),y(19,"currency"),n()()(),o(20,"p",11),s(21,"Al confirmar, el pago quedar\xE1 registrado en el sistema."),n()(),o(22,"div",12)(23,"button",13),s(24,"Cancelar"),n(),o(25,"button",14),p("click",function(){return t.confirmar()}),s(26,"Confirmar Pago"),n()()()),e&2&&(l(11),_(t.data.pagador.nombre),l(),g(t.data.pagador.tipoMetodoPago&&t.data.pagador.metodoPago?12:-1),l(6),_(M(19,3,t.data.monto,"MXN","symbol-narrow","1.0-0")))},dependencies:[G,te,ee,E,I,F,B,ce,T],styles:[".modal-view[_ngcontent-%COMP%]{padding:1.5rem;box-sizing:border-box;overflow:hidden}.page-title[_ngcontent-%COMP%]{font:var(--mat-sys-display-small);color:var(--mat-sys-on-surface);margin:0 0 1.5rem}.modal-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem}.action-bar[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:1rem;margin-top:1.5rem}.btn-cancelar[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.btn-primary[_ngcontent-%COMP%]{--mdc-filled-button-container-color: var(--mat-sys-primary);--mdc-filled-button-label-text-color: var(--mat-sys-on-primary);border-radius:.75rem;font-weight:600;transition:opacity .2s ease}.btn-primary[_ngcontent-%COMP%]:hover{opacity:.9}"]})};var we=class i{dialogRef=u(K);data=u(W);static \u0275fac=function(e){return new(e||i)};static \u0275cmp=x({type:i,selectors:[["app-pago-info-modal"]],decls:26,vars:21,consts:[["aria-label","Informaci\xF3n del Pago",1,"modal-view"],[1,"page-title"],[1,"modal-card"],[1,"space-y-3","py-2"],[1,"flex","justify-between","border-b","pb-2"],[1,"text-gray-500","text-sm"],[1,"inline-flex","items-center","rounded-full","px-2","py-0.5","text-xs","font-medium"],[1,"font-medium"],[1,"flex","justify-between"],[1,"font-medium","text-sm"],[1,"action-bar"],["mat-button","","mat-dialog-close","",1,"btn-cancelar"]],template:function(e,t){e&1&&(o(0,"section",0)(1,"h1",1),s(2,"Informaci\xF3n del Pago"),n(),o(3,"div",2)(4,"div",3)(5,"div",4)(6,"span",5),s(7,"Estado"),n(),o(8,"span",6),s(9),y(10,"titlecase"),n()(),o(11,"div",4)(12,"span",5),s(13,"Monto"),n(),o(14,"span",7),s(15),y(16,"currency"),n()(),o(17,"div",8)(18,"span",5),s(19,"Fecha"),n(),o(20,"span",9),s(21),y(22,"date"),n()()()(),o(23,"div",10)(24,"button",11),s(25,"Cerrar"),n()()()),e&2&&(l(8),D("bg-green-100",t.data.pago.estado==="pagado")("text-green-700",t.data.pago.estado==="pagado")("bg-yellow-100",t.data.pago.estado==="pendiente")("text-yellow-700",t.data.pago.estado==="pendiente"),l(),w(" ",de(10,11,t.data.pago.estado)," "),l(6),_(M(16,13,t.data.pago.monto,"MXN","symbol-narrow","1.0-0")),l(6),_(Z(22,18,t.data.pago.fecha,"medium")))},dependencies:[G,te,ee,E,I,ce,T,J],styles:[".modal-view[_ngcontent-%COMP%]{padding:1.5rem;box-sizing:border-box;overflow:hidden}.page-title[_ngcontent-%COMP%]{font:var(--mat-sys-display-small);color:var(--mat-sys-on-surface);margin:0 0 1.5rem}.modal-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem}.action-bar[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:1rem;margin-top:1.5rem}.btn-cancelar[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.btn-primary[_ngcontent-%COMP%]{--mdc-filled-button-container-color: var(--mat-sys-primary);--mdc-filled-button-label-text-color: var(--mat-sys-on-primary);border-radius:.75rem;font-weight:600;transition:opacity .2s ease}.btn-primary[_ngcontent-%COMP%]:hover{opacity:.9}"]})};var Ca=(i,a)=>(a.miembro==null?null:a.miembro.id)??i;function Ma(i,a){if(i&1&&(o(0,"p",6),s(1),n()),i&2){let e=d();l(),_(e.data.gasto.descripcion)}}function Pa(i,a){i&1&&(o(0,"span",16),s(1,"(pag\xF3)"),n())}function ka(i,a){i&1&&(o(0,"span",17),s(1,"(t\xFA)"),n())}function Da(i,a){if(i&1){let e=C();o(0,"button",21),p("click",function(){b(e);let r=d(3).$implicit,c=d();return h(c.verInfoPago(r.miembro.id))}),o(1,"mat-icon",22),s(2,"check_circle"),n()()}}function Sa(i,a){i&1&&(o(0,"mat-icon",20),s(1,"schedule"),n())}function Ia(i,a){if(i&1&&m(0,Da,3,0,"button",19)(1,Sa,2,0,"mat-icon",20),i&2){let e=d(2).$implicit,t=d();g(t.haPagado(e.miembro.id)?0:1)}}function Ea(i,a){if(i&1&&(o(0,"mat-list-item")(1,"div",13)(2,"div",14)(3,"mat-icon",15),s(4,"person"),n(),o(5,"span"),s(6),m(7,Pa,2,0,"span",16),m(8,ka,2,0,"span",17),n()(),o(9,"div",14)(10,"span",18),s(11),y(12,"currency"),n(),m(13,Ia,2,1),n()()()),i&2){let e=d().$implicit,t=d();l(6),w(" ",e.miembro.nombre," "),l(),g(e.miembro.id===(t.data.gasto.pagadoPor==null?null:t.data.gasto.pagadoPor.id)?7:-1),l(),g(t.data.usuarioActual&&e.miembro.id===t.data.usuarioActual.id?8:-1),l(3),_(M(12,5,e.monto,"COP","symbol-narrow","1.0-0")),l(2),g(e.miembro.id!==(t.data.gasto.pagadoPor==null?null:t.data.gasto.pagadoPor.id)?13:-1)}}function Oa(i,a){if(i&1&&m(0,Ea,14,10,"mat-list-item"),i&2){let e=a.$implicit;g(e.miembro?0:-1)}}function Ta(i,a){i&1&&(o(0,"div",25)(1,"mat-icon"),s(2,"check_circle"),n(),o(3,"span"),s(4,"Ya registraste tu pago"),n()())}function Ga(i,a){if(i&1){let e=C();o(0,"button",27),p("click",function(){b(e);let r=d(2);return h(r.abrirRegistrarPago())}),s(1,"Registrar Pago"),n()}}function Aa(i,a){if(i&1&&(o(0,"div",10)(1,"p",23),s(2," Te corresponde pagar: "),o(3,"strong",24),s(4),y(5,"currency"),n()(),m(6,Ta,5,0,"div",25)(7,Ga,2,0,"button",26),n()),i&2){let e=d();l(4),_(M(5,2,e.miParticipacion,"COP","symbol-narrow","1.0-0")),l(2),g(e.yaPague?6:e.miParticipacion>0?7:-1)}}var xe=class i{dialogRef=u(K);data=u(W);dialog=u(ge);get esPagador(){return this.data.gasto.pagadoPor?.id===this.data.usuarioActual?.id}get miParticipacion(){return this.data.usuarioActual&&this.data.participaciones.find(a=>a.miembro?.id===this.data.usuarioActual.id)?.monto||0}get yaPague(){return this.data.usuarioActual?this.data.pagos.some(a=>a.deudorId===this.data.usuarioActual.id&&a.pagadorId===this.data.gasto.pagadoPor?.id&&(a.gastoId===this.data.gasto.id||!a.gastoId&&a.estado==="pagado")):!1}getPago(a){let e=this.data.pagos.find(t=>t.deudorId===a&&t.pagadorId===this.data.gasto.pagadoPor?.id&&t.gastoId===this.data.gasto.id);return e||this.data.pagos.find(t=>t.deudorId===a&&t.pagadorId===this.data.gasto.pagadoPor?.id&&!t.gastoId&&t.estado==="pagado")}haPagado(a){return!!this.getPago(a)}abrirRegistrarPago(){this.dialog.open(ye,{width:"400px",data:{deudor:this.data.usuarioActual,pagador:this.data.gasto.pagadoPor,monto:this.miParticipacion,gastoId:this.data.gasto.id}}).afterClosed().subscribe(e=>{e&&this.dialogRef.close({action:"registrar_pago",payload:e})})}verInfoPago(a){let e=this.getPago(a);e&&this.dialog.open(we,{width:"350px",data:{pago:e}})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=x({type:i,selectors:[["app-desglose-gasto-modal"]],decls:27,vars:15,consts:[["aria-label","Detalle del Gasto",1,"modal-view"],[1,"page-title"],[1,"modal-card"],[1,"mb-4"],[1,"text-lg","font-medium"],[1,"text-gray-500"],[1,"text-sm","text-gray-400","mt-1"],[1,"text-xs","text-gray-400","mt-1"],[1,"mt-4"],[1,"font-medium","text-gray-700","mb-3"],[1,"text-center","p-3"],[1,"action-bar"],["mat-button","","mat-dialog-close","",1,"btn-cancelar"],["matListItemTitle","",1,"flex","justify-between","items-center","w-full"],[1,"flex","items-center","gap-2"],[1,"text-gray-400",2,"font-size","20px","width","20px","height","20px"],[1,"text-xs","text-purple-600","ml-1"],[1,"text-xs","text-blue-600","ml-1"],[1,"font-medium"],["mat-icon-button","","color","primary","title","Pago confirmado"],["title","Pendiente de pago",1,"text-orange-400"],["mat-icon-button","","color","primary","title","Pago confirmado",3,"click"],[1,"text-green-500"],[1,"mb-2","text-sm","text-gray-600"],[1,"text-lg"],[1,"text-green-600","flex","items-center","justify-center","gap-1"],["mat-flat-button","",1,"btn-primary"],["mat-flat-button","",1,"btn-primary",3,"click"]],template:function(e,t){e&1&&(o(0,"section",0)(1,"h1",1),s(2,"Detalle del Gasto"),n(),o(3,"div",2)(4,"div",3)(5,"h3",4),s(6),n(),o(7,"p",5),s(8),y(9,"currency"),n(),m(10,Ma,2,1,"p",6),o(11,"p",7),s(12),y(13,"date"),n()(),f(14,"mat-divider"),o(15,"div",8)(16,"h4",9),s(17,"Participantes:"),n(),o(18,"mat-list"),P(19,Oa,1,1,null,null,Ca),n()(),f(21,"mat-divider"),o(22,"div",8),m(23,Aa,8,7,"div",10),n()(),o(24,"div",11)(25,"button",12),s(26,"Cerrar"),n()()()),e&2&&(l(6),_(t.data.gasto.nombre),l(2),X(" ",M(9,7,t.data.gasto.monto,"COP","symbol-narrow","1.0-0")," \xB7 Pagado por ",t.data.gasto.pagadoPor==null?null:t.data.gasto.pagadoPor.nombre," "),l(2),g(t.data.gasto.descripcion?10:-1),l(2),X(" ",Z(13,12,t.data.gasto.fecha,"dd/MM/yyyy")," \xB7 Divisi\xF3n ",t.data.gasto.metodoDivision," "),l(7),k(t.data.participaciones),l(4),g(!t.esPagador&&t.data.usuarioActual?23:-1))},dependencies:[G,te,ee,E,I,me,ae,Et,ue,B,pe,L,R,F,T,J],styles:[".modal-view[_ngcontent-%COMP%]{padding:1.5rem;box-sizing:border-box;overflow:hidden}.page-title[_ngcontent-%COMP%]{font:var(--mat-sys-display-small);color:var(--mat-sys-on-surface);margin:0 0 1.5rem}.modal-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem}.action-bar[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:1rem;margin-top:1.5rem}.btn-cancelar[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.btn-primary[_ngcontent-%COMP%]{--mdc-filled-button-container-color: var(--mat-sys-primary);--mdc-filled-button-label-text-color: var(--mat-sys-on-primary);border-radius:.75rem;font-weight:600;transition:opacity .2s ease}.btn-primary[_ngcontent-%COMP%]:hover{opacity:.9}"]})};var Fa=(i,a)=>a.id;function za(i,a){if(i&1&&(oe(0,"div",1),s(1),re()),i&2){let e=a.$implicit;ie("title",je(e.nombre)),l(),w(" ",e.nombre.substring(0,2).toUpperCase()," ")}}function Na(i,a){if(i&1&&(oe(0,"div",2),s(1),re()),i&2){let e=d();ie("title",$e("",e.miembrosExtra," m\xE1s")),l(),w(" +",e.miembrosExtra," ")}}var Ce=class i{miembros=S.required();limite=S(5);get miembrosVisibles(){return this.miembros().slice(0,this.limite())}get miembrosExtra(){let a=this.miembros().length;return a>this.limite()?a-this.limite():0}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=x({type:i,selectors:[["app-avatar-group"]],inputs:{miembros:[1,"miembros"],limite:[1,"limite"]},decls:4,vars:1,consts:[[1,"flex","-space-x-2","overflow-hidden"],[1,"flex","h-8","w-8","items-center","justify-center","rounded-full","bg-gray-200","border-2","border-white","text-xs","font-medium","text-gray-600",3,"title"],[1,"flex","h-8","w-8","items-center","justify-center","rounded-full","bg-gray-100","border-2","border-white","text-xs","font-medium","text-gray-500",3,"title"]],template:function(e,t){e&1&&(oe(0,"div",0),P(1,za,2,3,"div",1,Fa),m(3,Na,2,3,"div",2),re()),e&2&&(l(),k(t.miembrosVisibles),l(2),g(t.miembrosExtra>0?3:-1))},dependencies:[G],encapsulation:2})};function Va(i,a){if(i&1){let e=C();o(0,"button",18),p("click",function(){b(e);let r=d(2);return h(r.abrirDrawerFantasmas())}),o(1,"mat-icon"),s(2,"manage_accounts"),n(),s(3," Gestionar Fantasmas "),n()}}function Ra(i,a){if(i&1){let e=C();o(0,"header",5)(1,"div")(2,"h1",6),s(3),n(),o(4,"div",7)(5,"span",8),s(6,"Integrantes:"),n(),f(7,"app-avatar-group",9),o(8,"button",10),p("click",function(){b(e);let r=d();return h(r.abrirDrawerIntegrantes())}),s(9,"+ A\xF1adir"),n()()(),o(10,"span",11),s(11," C\xF3digo de invitaci\xF3n: "),o(12,"strong",12),s(13),n()()(),o(14,"div",13)(15,"app-gastos-card",14),p("gastoClick",function(r){b(e);let c=d();return h(c.abrirDesgloseGasto(r))}),n()(),o(16,"div",15)(17,"button",16),p("click",function(){b(e);let r=d();return h(r.abrirDrawerGasto())}),s(18," + Registrar Gastos "),n(),m(19,Va,4,0,"button",17),n()}if(i&2){let e=a,t=d();l(3),w("Salida: ",e.titulo),l(4),v("miembros",t.miembros())("limite",4),l(6),w("#",e.codigoInvitacion),l(2),v("gastos",t.gastos())("usuarioActual",t.usuarioActual()),l(4),g(t.esCreador()&&t.tieneFantasmas()?19:-1)}}function La(i,a){i&1&&(o(0,"div",1)(1,"p",19),s(2,"Salida no encontrada."),n()())}var Ht=class i{route=u(Ye);salidaService=u(St);dialog=u(ge);platformId=u(Fe);salida=this.salidaService.salidaActual;usuarioActual=this.salidaService.usuarioActual;gastos=this.salidaService.gastosOrdenados;miembros=this.salidaService.miembros;balances=this.salidaService.balances;desgloseGastos=this.salidaService.desgloseGastos;pagos=this.salidaService.pagos;drawerGastoAbierto=O(!1);drawerIntegrantesAbierto=O(!1);drawerFantasmasAbierto=O(!1);fantasmas=this.salidaService.fantasmas;esCreador=V(()=>this.usuarioActual()?.rol==="creador");tieneFantasmas=V(()=>this.miembros().some(a=>a.esFantasma));ngOnInit(){if(!Ue(this.platformId))return;let a=this.route.snapshot.paramMap.get("id");a&&this.salidaService.cargarSalida(a)}abrirDrawerGasto(){this.drawerGastoAbierto.set(!0)}cerrarDrawerGasto(){this.drawerGastoAbierto.set(!1)}abrirDrawerIntegrantes(){this.drawerIntegrantesAbierto.set(!0)}cerrarDrawerIntegrantes(){this.drawerIntegrantesAbierto.set(!1)}abrirDrawerFantasmas(){let a=this.salida();a&&this.salidaService.cargarFantasmas(a.id),this.drawerFantasmasAbierto.set(!0)}cerrarDrawerFantasmas(){this.drawerFantasmasAbierto.set(!1)}onConfirmarPagoFantasma(a){this.salidaService.confirmarPago(a);let e=this.salida();e&&setTimeout(()=>this.salidaService.cargarFantasmas(e.id),500)}onSaldarDeudaFantasma(a){this.salidaService.saldarDeudaFantasma(a.fantasmaMiembroId,a.monto);let e=this.salida();e&&setTimeout(()=>{this.salidaService.cargarFantasmas(e.id),this.salidaService.cargarSalida(e.id)},500)}onGastoAgregado(a){this.salidaService.agregarGasto(a),this.cerrarDrawerGasto()}onIntegrantesAgregados(a){this.salidaService.agregarMiembros(a),this.cerrarDrawerIntegrantes()}registrarPago(a,e,t,r){this.salidaService.registrarPago(a,e,t,r)}confirmarPago(a){this.salidaService.confirmarPago(a)}getNombreMiembro(a){return this.miembros().find(t=>t.id===a)?.nombre??"Desconocido"}abrirDesgloseGasto(a){let e=this.usuarioActual();if(!e)return;let r=this.desgloseGastos().find(j=>j.gasto.id===a.id),c=r?r.participaciones:[];this.dialog.open(xe,{width:"450px",data:{gasto:a,usuarioActual:e,pagos:this.pagos(),participaciones:c}}).afterClosed().subscribe(j=>{if(j&&j.action==="registrar_pago"){let Y=j.payload;this.registrarPago(Y.deudorId,Y.pagadorId,Y.monto,Y.gastoId)}})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=x({type:i,selectors:[["app-salida-detalle-page"]],decls:6,vars:6,consts:[[1,"salida-detalle-container","max-w-6xl","mx-auto","mt-8","px-4","pb-8"],[1,"flex","items-center","justify-center","py-20"],[3,"cerrar","gastoAgregado","abierto","miembros"],[3,"cerrar","integrantesAgregados","abierto"],[3,"cerrar","confirmarPago","saldarDeuda","abierto","fantasmas"],[1,"header-row","flex","flex-col","md:flex-row","md:items-center","justify-between","gap-4"],[1,"text-3xl","font-light"],[1,"flex","items-center","gap-2","mt-3"],[1,"text-sm","text-gray-500","mr-2"],[3,"miembros","limite"],[1,"ml-2","text-indigo-600","text-sm","hover:underline",3,"click"],[1,"codigo-invitacion","bg-gray-100","px-3","py-1","rounded-md","text-sm"],[1,"font-mono","text-gray-900"],[1,"mt-8"],[3,"gastoClick","gastos","usuarioActual"],[1,"acciones-bottom"],["aria-label","Registrar un nuevo gasto",1,"btn-accion",3,"click"],["mat-flat-button","",1,"btn-fantasmas"],["mat-flat-button","",1,"btn-fantasmas",3,"click"],[1,"text-gray-400","text-lg"]],template:function(e,t){if(e&1&&(o(0,"section",0),m(1,Ra,20,7)(2,La,3,0,"div",1),n(),o(3,"app-drawer-agregar-gasto",2),p("cerrar",function(){return t.cerrarDrawerGasto()})("gastoAgregado",function(c){return t.onGastoAgregado(c)}),n(),o(4,"app-drawer-agregar-integrantes",3),p("cerrar",function(){return t.cerrarDrawerIntegrantes()})("integrantesAgregados",function(c){return t.onIntegrantesAgregados(c)}),n(),o(5,"app-drawer-gestion-fantasmas",4),p("cerrar",function(){return t.cerrarDrawerFantasmas()})("confirmarPago",function(c){return t.onConfirmarPagoFantasma(c)})("saldarDeuda",function(c){return t.onSaldarDeudaFantasma(c)}),n()),e&2){let r;l(),g((r=t.salida())?1:2,r),l(2),v("abierto",t.drawerGastoAbierto())("miembros",t.miembros()),l(),v("abierto",t.drawerIntegrantesAbierto()),l(),v("abierto",t.drawerFantasmasAbierto())("fantasmas",t.fantasmas())}},dependencies:[E,I,L,R,fe,F,ae,be,Vt,he,ve,Ce],styles:["[_nghost-%COMP%]{display:block;width:100%;min-height:calc(100vh - 64px)}.header-row[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:2rem}.header-row[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface)}.codigo-invitacion[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-on-surface-variant)}.content-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start}.col-izquierda[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1.5rem}.col-derecha[_ngcontent-%COMP%]{display:flex;flex-direction:column}.panel-card[_ngcontent-%COMP%]{border-radius:12px}.empty-state[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:2rem;color:var(--mat-sys-on-surface-variant);font-size:.875rem}.balance-meta[_ngcontent-%COMP%]{font-size:.75rem;font-weight:500}.balance-meta.positivo[_ngcontent-%COMP%]{color:#2e7d32}.balance-meta.negativo[_ngcontent-%COMP%]{color:#c62828}.pago-accion[_ngcontent-%COMP%]{padding:.5rem 1rem}.btn-registrar-pago[_ngcontent-%COMP%]{font-size:.75rem;color:var(--mat-sys-primary)!important}.pagos-section[_ngcontent-%COMP%]{padding:.5rem 0}.section-subtitle[_ngcontent-%COMP%]{font-size:.8125rem;font-weight:600;color:var(--mat-sys-on-surface);padding:.5rem 1rem;margin:0}.estado-pendiente[_ngcontent-%COMP%]{color:#e65100;font-weight:500}.estado-pagado[_ngcontent-%COMP%]{color:#2e7d32;font-weight:500}.btn-confirmar[_ngcontent-%COMP%]{font-size:.75rem;color:var(--mat-sys-primary)!important}.desglose-item[_ngcontent-%COMP%]{height:auto!important;padding:.75rem 0!important}.participaciones-line[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.25rem}.participacion-chip[_ngcontent-%COMP%]{font-size:.7rem;background-color:var(--mat-sys-surface-container);padding:.125rem .5rem;border-radius:4px;color:var(--mat-sys-on-surface-variant)}.acciones-bottom[_ngcontent-%COMP%]{display:flex;flex-direction:row;gap:1.5rem;margin-top:3rem}.btn-accion[_ngcontent-%COMP%]{flex:1;padding:1.25rem 2rem;font-size:1rem;font-weight:400;color:#fff;background-color:var(--mat-sys-primary);border:none;border-radius:8px;cursor:pointer;transition:background-color .2s ease,transform .1s ease}.btn-accion[_ngcontent-%COMP%]:hover{opacity:.9}.btn-accion[_ngcontent-%COMP%]:active{transform:scale(.98)}@media(max-width:768px){.content-grid[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:1.5rem}.acciones-bottom[_ngcontent-%COMP%]{flex-direction:column}}"]})};export{Ht as SalidaDetallePage};
