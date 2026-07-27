import{a as Pt,c as jt}from"./chunk-SUNZS7V5.js";import{a as Gt}from"./chunk-6EZDNMIA.js";import{a as $,e as Lt,k as Ht,t as Z,z as $e}from"./chunk-RR2YCN3U.js";import{$b as Nt,Ab as Rt,Ba as f,Bc as Q,Dc as zt,Ea as Dt,Ec as De,Fa as j,Ga as l,H as yt,Ib as u,L as xt,Ma as ie,N as Ct,Na as E,Nb as Ot,Oa as d,Pa as m,Q as ve,Qa as xe,Qb as N,Rb as R,S as D,Sa as Ft,T as be,Ta as Mt,U as A,W as c,Wa as S,Wb as oe,Xa as v,Xb as Tt,Y as s,Ya as b,Yb as Ce,Zb as ae,a as _,ab as W,b as C,bb as y,bc as qe,c as ht,cb as x,db as ne,eb as wt,ec as kt,f as L,fb as Vt,gb as He,i as pt,ia as O,ib as re,j as gt,ja as T,jb as I,lb as G,mb as ze,na as B,nb as w,o as _e,oa as ye,ob as At,pa as H,pb as je,qa as z,qb as p,rb as g,sa as M,sb as Et,tb as St,u as _t,ub as Ge,vb as Ue,vc as We,w as vt,wc as Bt,x as bt,xb as F,zb as It}from"./chunk-O6WD76AR.js";var Xt=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,n){this._renderer=e,this._elementRef=n}setProperty(e,n){this._renderer.setProperty(this._elementRef.nativeElement,e,n)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(n){return new(n||t)(l(j),l(M))};static \u0275dir=d({type:t})}return t})(),Kt=(()=>{class t extends Xt{static \u0275fac=(()=>{let e;return function(r){return(e||(e=z(t)))(r||t)}})();static \u0275dir=d({type:t,features:[m]})}return t})(),pe=new c("");var Gi={provide:pe,useExisting:D(()=>Jt),multi:!0};function Ui(){let t=qe()?qe().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var qi=new c(""),Jt=(()=>{class t extends Xt{_compositionMode;_composing=!1;constructor(e,n,r){super(e,n),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!Ui())}writeValue(e){let n=e??"";this.setProperty("value",n)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(n){return new(n||t)(l(j),l(M),l(qi,8))};static \u0275dir=d({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(n,r){n&1&&I("input",function(a){return r._handleInput(a.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(a){return r._compositionEnd(a.target.value)})},standalone:!1,features:[u([Gi]),m]})}return t})();function Xe(t){return t==null||Ke(t)===0}function Ke(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var P=new c(""),ge=new c(""),Wi=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Me=class{static min(i){return ei(i)}static max(i){return ti(i)}static required(i){return $i(i)}static requiredTrue(i){return Zi(i)}static email(i){return Qi(i)}static minLength(i){return Yi(i)}static maxLength(i){return ii(i)}static pattern(i){return ni(i)}static nullValidator(i){return we()}static compose(i){return di(i)}static composeAsync(i){return ci(i)}};function ei(t){return i=>{if(i.value==null||t==null)return null;let e=parseFloat(i.value);return!isNaN(e)&&e<t?{min:{min:t,actual:i.value}}:null}}function ti(t){return i=>{if(i.value==null||t==null)return null;let e=parseFloat(i.value);return!isNaN(e)&&e>t?{max:{max:t,actual:i.value}}:null}}function $i(t){return Xe(t.value)?{required:!0}:null}function Zi(t){return t.value===!0?null:{required:!0}}function Qi(t){return Xe(t.value)||Wi.test(t.value)?null:{email:!0}}function Yi(t){return i=>{let e=i.value?.length??Ke(i.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function ii(t){return i=>{let e=i.value?.length??Ke(i.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function ni(t){if(!t)return we;let i,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),i=new RegExp(e)):(e=t.toString(),i=t),n=>{if(Xe(n.value))return null;let r=n.value;return i.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function we(t){return null}function ri(t){return t!=null}function oi(t){return Mt(t)?gt(t):t}function ai(t){let i={};return t.forEach(e=>{i=e!=null?_(_({},i),e):i}),Object.keys(i).length===0?null:i}function si(t,i){return i.map(e=>e(t))}function Xi(t){return!t.validate}function li(t){return t.map(i=>Xi(i)?i:e=>i.validate(e))}function di(t){if(!t)return null;let i=t.filter(ri);return i.length==0?null:function(e){return ai(si(e,i))}}function Je(t){return t!=null?di(li(t)):null}function ci(t){if(!t)return null;let i=t.filter(ri);return i.length==0?null:function(e){let n=si(e,i).map(oi);return _t(n).pipe(_e(ai))}}function et(t){return t!=null?ci(li(t)):null}function Ut(t,i){return t===null?[i]:Array.isArray(t)?[...t,i]:[t,i]}function ui(t){return t._rawValidators}function fi(t){return t._rawAsyncValidators}function Ze(t){return t?Array.isArray(t)?t:[t]:[]}function Ve(t,i){return Array.isArray(t)?t.includes(i):t===i}function qt(t,i){let e=Ze(i);return Ze(t).forEach(r=>{Ve(e,r)||e.push(r)}),e}function Wt(t,i){return Ze(i).filter(e=>!Ve(t,e))}var Ae=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(i){this._rawValidators=i||[],this._composedValidatorFn=Je(this._rawValidators)}_setAsyncValidators(i){this._rawAsyncValidators=i||[],this._composedAsyncValidatorFn=et(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(i){this._onDestroyCallbacks.push(i)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(i=>i()),this._onDestroyCallbacks=[]}reset(i=void 0){this.control?.reset(i)}hasError(i,e){return this.control?this.control.hasError(i,e):!1}getError(i,e){return this.control?this.control.getError(i,e):null}},k=class extends Ae{name;get formDirective(){return null}get path(){return null}},V=class extends Ae{_parent=null;name=null;valueAccessor=null},Ee=class{_cd;constructor(i){this._cd=i}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Sr=(()=>{class t extends Ee{constructor(e){super(e)}static \u0275fac=function(n){return new(n||t)(l(V,2))};static \u0275dir=d({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,r){n&2&&F("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[m]})}return t})(),Ir=(()=>{class t extends Ee{constructor(e){super(e)}static \u0275fac=function(n){return new(n||t)(l(k,10))};static \u0275dir=d({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(n,r){n&2&&F("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},standalone:!1,features:[m]})}return t})();var se="VALID",Fe="INVALID",Y="PENDING",le="DISABLED",U=class{},Se=class extends U{value;source;constructor(i,e){super(),this.value=i,this.source=e}},ce=class extends U{pristine;source;constructor(i,e){super(),this.pristine=i,this.source=e}},ue=class extends U{touched;source;constructor(i,e){super(),this.touched=i,this.source=e}},X=class extends U{status;source;constructor(i,e){super(),this.status=i,this.source=e}},Ie=class extends U{source;constructor(i){super(),this.source=i}},me=class extends U{source;constructor(i){super(),this.source=i}};function tt(t){return(ke(t)?t.validators:t)||null}function Ki(t){return Array.isArray(t)?Je(t):t||null}function it(t,i){return(ke(i)?i.asyncValidators:t)||null}function Ji(t){return Array.isArray(t)?et(t):t||null}function ke(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function mi(t,i,e){let n=t.controls;if(!(i?Object.keys(n):n).length)throw new ve(1e3,"");if(!n[e])throw new ve(1001,"")}function hi(t,i,e){t._forEachChild((n,r)=>{if(e[r]===void 0)throw new ve(-1002,"")})}var K=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(i,e){this._assignValidators(i),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(i){this._rawValidators=this._composedValidatorFn=i}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(i){this._rawAsyncValidators=this._composedAsyncValidatorFn=i}get parent(){return this._parent}get status(){return N(this.statusReactive)}set status(i){N(()=>this.statusReactive.set(i))}_status=R(()=>this.statusReactive());statusReactive=B(void 0);get valid(){return this.status===se}get invalid(){return this.status===Fe}get pending(){return this.status===Y}get disabled(){return this.status===le}get enabled(){return this.status!==le}errors;get pristine(){return N(this.pristineReactive)}set pristine(i){N(()=>this.pristineReactive.set(i))}_pristine=R(()=>this.pristineReactive());pristineReactive=B(!0);get dirty(){return!this.pristine}get touched(){return N(this.touchedReactive)}set touched(i){N(()=>this.touchedReactive.set(i))}_touched=R(()=>this.touchedReactive());touchedReactive=B(!1);get untouched(){return!this.touched}_events=new L;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(i){this._assignValidators(i)}setAsyncValidators(i){this._assignAsyncValidators(i)}addValidators(i){this.setValidators(qt(i,this._rawValidators))}addAsyncValidators(i){this.setAsyncValidators(qt(i,this._rawAsyncValidators))}removeValidators(i){this.setValidators(Wt(i,this._rawValidators))}removeAsyncValidators(i){this.setAsyncValidators(Wt(i,this._rawAsyncValidators))}hasValidator(i){return Ve(this._rawValidators,i)}hasAsyncValidator(i){return Ve(this._rawAsyncValidators,i)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(i={}){let e=this.touched===!1;this.touched=!0;let n=i.sourceControl??this;i.onlySelf||this._parent?.markAsTouched(C(_({},i),{sourceControl:n})),e&&i.emitEvent!==!1&&this._events.next(new ue(!0,n))}markAllAsDirty(i={}){this.markAsDirty({onlySelf:!0,emitEvent:i.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(i))}markAllAsTouched(i={}){this.markAsTouched({onlySelf:!0,emitEvent:i.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(i))}markAsUntouched(i={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let n=i.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:i.emitEvent,sourceControl:n})}),i.onlySelf||this._parent?._updateTouched(i,n),e&&i.emitEvent!==!1&&this._events.next(new ue(!1,n))}markAsDirty(i={}){let e=this.pristine===!0;this.pristine=!1;let n=i.sourceControl??this;i.onlySelf||this._parent?.markAsDirty(C(_({},i),{sourceControl:n})),e&&i.emitEvent!==!1&&this._events.next(new ce(!1,n))}markAsPristine(i={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let n=i.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:i.emitEvent})}),i.onlySelf||this._parent?._updatePristine(i,n),e&&i.emitEvent!==!1&&this._events.next(new ce(!0,n))}markAsPending(i={}){this.status=Y;let e=i.sourceControl??this;i.emitEvent!==!1&&(this._events.next(new X(this.status,e)),this.statusChanges.emit(this.status)),i.onlySelf||this._parent?.markAsPending(C(_({},i),{sourceControl:e}))}disable(i={}){let e=this._parentMarkedDirty(i.onlySelf);this.status=le,this.errors=null,this._forEachChild(r=>{r.disable(C(_({},i),{onlySelf:!0}))}),this._updateValue();let n=i.sourceControl??this;i.emitEvent!==!1&&(this._events.next(new Se(this.value,n)),this._events.next(new X(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(C(_({},i),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(i={}){let e=this._parentMarkedDirty(i.onlySelf);this.status=se,this._forEachChild(n=>{n.enable(C(_({},i),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:i.emitEvent}),this._updateAncestors(C(_({},i),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(i,e){i.onlySelf||(this._parent?.updateValueAndValidity(i),i.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(i){this._parent=i}getRawValue(){return this.value}updateValueAndValidity(i={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===se||this.status===Y)&&this._runAsyncValidator(n,i.emitEvent)}let e=i.sourceControl??this;i.emitEvent!==!1&&(this._events.next(new Se(this.value,e)),this._events.next(new X(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),i.onlySelf||this._parent?.updateValueAndValidity(C(_({},i),{sourceControl:e}))}_updateTreeValidity(i={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(i)),this.updateValueAndValidity({onlySelf:!0,emitEvent:i.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?le:se}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(i,e){if(this.asyncValidator){this.status=Y,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:i!==!1};let n=oi(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:i})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let i=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,i}return!1}setErrors(i,e={}){this.errors=i,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(i){let e=i;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((n,r)=>n&&n._find(r),this)}getError(i,e){let n=e?this.get(e):this;return n?.errors?n.errors[i]:null}hasError(i,e){return!!this.getError(i,e)}get root(){let i=this;for(;i._parent;)i=i._parent;return i}_updateControlsErrors(i,e,n){this.status=this._calculateStatus(),i&&this.statusChanges.emit(this.status),(i||n)&&this._events.next(new X(this.status,e)),this._parent&&this._parent._updateControlsErrors(i,e,n)}_initObservables(){this.valueChanges=new O,this.statusChanges=new O}_calculateStatus(){return this._allControlsDisabled()?le:this.errors?Fe:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Y)?Y:this._anyControlsHaveStatus(Fe)?Fe:se}_anyControlsHaveStatus(i){return this._anyControls(e=>e.status===i)}_anyControlsDirty(){return this._anyControls(i=>i.dirty)}_anyControlsTouched(){return this._anyControls(i=>i.touched)}_updatePristine(i,e){let n=!this._anyControlsDirty(),r=this.pristine!==n;this.pristine=n,i.onlySelf||this._parent?._updatePristine(i,e),r&&this._events.next(new ce(this.pristine,e))}_updateTouched(i={},e){this.touched=this._anyControlsTouched(),this._events.next(new ue(this.touched,e)),i.onlySelf||this._parent?._updateTouched(i,e)}_onDisabledChange=[];_registerOnCollectionChange(i){this._onCollectionChange=i}_setUpdateStrategy(i){ke(i)&&i.updateOn!=null&&(this._updateOn=i.updateOn)}_parentMarkedDirty(i){return!i&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(i){return null}_assignValidators(i){this._rawValidators=Array.isArray(i)?i.slice():i,this._composedValidatorFn=Ki(this._rawValidators)}_assignAsyncValidators(i){this._rawAsyncValidators=Array.isArray(i)?i.slice():i,this._composedAsyncValidatorFn=Ji(this._rawAsyncValidators)}},J=class extends K{constructor(i,e,n){super(tt(e),it(n,e)),this.controls=i,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(i,e){return this.controls[i]?this.controls[i]:(this.controls[i]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(i,e,n={}){this.registerControl(i,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}removeControl(i,e={}){this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),delete this.controls[i],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(i,e,n={}){this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),delete this.controls[i],e&&this.registerControl(i,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}contains(i){return this.controls.hasOwnProperty(i)&&this.controls[i].enabled}setValue(i,e={}){hi(this,!0,i),Object.keys(i).forEach(n=>{mi(this,!0,n),this.controls[n].setValue(i[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(i,e={}){i!=null&&(Object.keys(i).forEach(n=>{let r=this.controls[n];r&&r.patchValue(i[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(i={},e={}){this._forEachChild((n,r)=>{n.reset(i?i[r]:null,C(_({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new me(this))}getRawValue(){return this._reduceChildren({},(i,e,n)=>(i[n]=e.getRawValue(),i))}_syncPendingControls(){let i=this._reduceChildren(!1,(e,n)=>n._syncPendingControls()?!0:e);return i&&this.updateValueAndValidity({onlySelf:!0}),i}_forEachChild(i){Object.keys(this.controls).forEach(e=>{let n=this.controls[e];n&&i(n,e)})}_setUpControls(){this._forEachChild(i=>{i.setParent(this),i._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(i){for(let[e,n]of Object.entries(this.controls))if(this.contains(e)&&i(n))return!0;return!1}_reduceValue(){let i={};return this._reduceChildren(i,(e,n,r)=>((n.enabled||this.disabled)&&(e[r]=n.value),e))}_reduceChildren(i,e){let n=i;return this._forEachChild((r,o)=>{n=e(n,r,o)}),n}_allControlsDisabled(){for(let i of Object.keys(this.controls))if(this.controls[i].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(i){return this.controls.hasOwnProperty(i)?this.controls[i]:null}};var Qe=class extends J{};var ee=new c("",{factory:()=>Pe}),Pe="always";function pi(t,i){return[...i.path,t]}function he(t,i,e=Pe){nt(t,i),i.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&i.valueAccessor.setDisabledState?.(t.disabled),tn(t,i),rn(t,i),nn(t,i),en(t,i)}function Re(t,i,e=!0){let n=()=>{};i?.valueAccessor?.registerOnChange(n),i?.valueAccessor?.registerOnTouched(n),Te(t,i),t&&(i._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function Oe(t,i){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(i)})}function en(t,i){if(i.valueAccessor.setDisabledState){let e=n=>{i.valueAccessor.setDisabledState(n)};t.registerOnDisabledChange(e),i._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function nt(t,i){let e=ui(t);i.validator!==null?t.setValidators(Ut(e,i.validator)):typeof e=="function"&&t.setValidators([e]);let n=fi(t);i.asyncValidator!==null?t.setAsyncValidators(Ut(n,i.asyncValidator)):typeof n=="function"&&t.setAsyncValidators([n]);let r=()=>t.updateValueAndValidity();Oe(i._rawValidators,r),Oe(i._rawAsyncValidators,r)}function Te(t,i){let e=!1;if(t!==null){if(i.validator!==null){let r=ui(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==i.validator);o.length!==r.length&&(e=!0,t.setValidators(o))}}if(i.asyncValidator!==null){let r=fi(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==i.asyncValidator);o.length!==r.length&&(e=!0,t.setAsyncValidators(o))}}}let n=()=>{};return Oe(i._rawValidators,n),Oe(i._rawAsyncValidators,n),e}function tn(t,i){i.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&gi(t,i)})}function nn(t,i){i.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&gi(t,i),t.updateOn!=="submit"&&t.markAsTouched()})}function gi(t,i){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),i.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function rn(t,i){let e=(n,r)=>{i.valueAccessor.writeValue(n),r&&i.viewToModelUpdate(n)};t.registerOnChange(e),i._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function _i(t,i){t==null,nt(t,i)}function on(t,i){return Te(t,i)}function rt(t,i){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(i,e.currentValue)}function an(t){return Object.getPrototypeOf(t.constructor)===Kt}function vi(t,i){t._syncPendingControls(),i.forEach(e=>{let n=e.control;n.updateOn==="submit"&&n._pendingChange&&(e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1)})}function ot(t,i){if(!i)return null;Array.isArray(i);let e,n,r;return i.forEach(o=>{o.constructor===Jt?e=o:an(o)?n=o:r=o}),r||n||e||null}function sn(t,i){let e=t.indexOf(i);e>-1&&t.splice(e,1)}var ln={provide:k,useExisting:D(()=>at)},de=Promise.resolve(),at=(()=>{class t extends k{callSetDisabledState;get submitted(){return N(this.submittedReactive)}_submitted=R(()=>this.submittedReactive());submittedReactive=B(!1);_directives=new Set;form;ngSubmit=new O;options;constructor(e,n,r){super(),this.callSetDisabledState=r,this.form=new J({},Je(e),et(n))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){de.then(()=>{let n=this._findContainer(e.path);e.control=n.registerControl(e.name,e.control),he(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){de.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){de.then(()=>{let n=this._findContainer(e.path),r=new J({});_i(r,e),n.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){de.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,n){de.then(()=>{this.form.get(e.path).setValue(n)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),vi(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Ie(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(n){return new(n||t)(l(P,10),l(ge,10),l(ee,8))};static \u0275dir=d({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(n,r){n&1&&I("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[u([ln]),m]})}return t})();function $t(t,i){let e=t.indexOf(i);e>-1&&t.splice(e,1)}function Zt(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var fe=class extends K{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(i=null,e,n){super(tt(e),it(n,e)),this._applyFormState(i),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),ke(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Zt(i)?this.defaultValue=i.value:this.defaultValue=i)}setValue(i,e={}){this.value=this._pendingValue=i,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(n=>n(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(i,e={}){this.setValue(i,e)}reset(i=this.defaultValue,e={}){this._applyFormState(i),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new me(this))}_updateValue(){}_anyControls(i){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(i){this._onChange.push(i)}_unregisterOnChange(i){$t(this._onChange,i)}registerOnDisabledChange(i){this._onDisabledChange.push(i)}_unregisterOnDisabledChange(i){$t(this._onDisabledChange,i)}_forEachChild(i){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(i){Zt(i)?(this.value=this._pendingValue=i.value,i.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=i}};var dn=t=>t instanceof fe;var cn={provide:V,useExisting:D(()=>un)},Qt=Promise.resolve(),un=(()=>{class t extends V{_changeDetectorRef;callSetDisabledState;control=new fe;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new O;constructor(e,n,r,o,a,h){super(),this._changeDetectorRef=a,this.callSetDisabledState=h,this._parent=e,this._setValidators(n),this._setAsyncValidators(r),this.valueAccessor=ot(this,o)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let n=e.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),rt(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){he(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){Qt.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let n=e.isDisabled.currentValue,r=n!==0&&ae(n);Qt.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?pi(e,this._parent):[e]}static \u0275fac=function(n){return new(n||t)(l(k,9),l(P,10),l(ge,10),l(pe,10),l(Ce,8),l(ee,8))};static \u0275dir=d({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[u([cn]),m,H]})}return t})();var Or=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return t})(),fn={provide:pe,useExisting:D(()=>mn),multi:!0},mn=(()=>{class t extends Kt{writeValue(e){let n=e??"";this.setProperty("value",n)}registerOnChange(e){this.onChange=n=>{e(n==""?null:parseFloat(n))}}static \u0275fac=(()=>{let e;return function(r){return(e||(e=z(t)))(r||t)}})();static \u0275dir=d({type:t,selectors:[["input","type","number","formControlName",""],["input","type","number","formControl",""],["input","type","number","ngModel",""]],hostBindings:function(n,r){n&1&&I("input",function(a){return r.onChange(a.target.value)})("blur",function(){return r.onTouched()})},standalone:!1,features:[u([fn]),m]})}return t})();var Ye=class extends K{constructor(i,e,n){super(tt(e),it(n,e)),this.controls=i,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(i){return this.controls[this._adjustIndex(i)]}push(i,e={}){Array.isArray(i)?i.forEach(n=>{this.controls.push(n),this._registerControl(n)}):(this.controls.push(i),this._registerControl(i)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(i,e,n={}){this.controls.splice(i,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:n.emitEvent})}removeAt(i,e={}){let n=this._adjustIndex(i);n<0&&(n=0),this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),this.controls.splice(n,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(i,e,n={}){let r=this._adjustIndex(i);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),e&&(this.controls.splice(r,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(i,e={}){hi(this,!1,i),i.forEach((n,r)=>{mi(this,!1,r),this.at(r).setValue(n,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(i,e={}){i!=null&&(i.forEach((n,r)=>{this.at(r)&&this.at(r).patchValue(n,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(i=[],e={}){this._forEachChild((n,r)=>{n.reset(i[r],C(_({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new me(this))}getRawValue(){return this.controls.map(i=>i.getRawValue())}clear(i={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:i.emitEvent}))}_adjustIndex(i){return i<0?i+this.length:i}_syncPendingControls(){let i=this.controls.reduce((e,n)=>n._syncPendingControls()?!0:e,!1);return i&&this.updateValueAndValidity({onlySelf:!0}),i}_forEachChild(i){this.controls.forEach((e,n)=>{i(e,n)})}_updateValue(){this.value=this.controls.filter(i=>i.enabled||this.disabled).map(i=>i.value)}_anyControls(i){return this.controls.some(e=>e.enabled&&i(e))}_setUpControls(){this._forEachChild(i=>this._registerControl(i))}_allControlsDisabled(){for(let i of this.controls)if(i.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(i){i.setParent(this),i._registerOnCollectionChange(this._onCollectionChange)}_find(i){return this.at(i)??null}};var hn=(()=>{class t extends k{callSetDisabledState;get submitted(){return N(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=R(()=>this._submittedReactive());_submittedReactive=B(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,n,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(n)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Te(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let n=this.form.get(e.path);return he(n,e,this.callSetDisabledState),n.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),n}getControl(e){return this.form.get(e.path)}removeControl(e){Re(e.control||null,e,!1),sn(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,n){this.form.get(e.path).setValue(n)}onReset(){this.resetForm()}resetForm(e=void 0,n={}){this.form.reset(e,n),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,vi(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new Ie(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let n=e.control,r=this.form.get(e.path);n!==r&&(Re(n||null,e),dn(r)&&(he(r,e,this.callSetDisabledState),e.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let n=this.form.get(e.path);_i(n,e),n.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let n=this.form?.get(e.path);n&&on(n,e)&&n.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){nt(this.form,this),this._oldForm&&Te(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(n){return new(n||t)(l(P,10),l(ge,10),l(ee,8))};static \u0275dir=d({type:t,features:[m,H]})}return t})();var st=new c(""),pn={provide:V,useExisting:D(()=>gn)},gn=(()=>{class t extends V{_ngModelWarningConfig;callSetDisabledState;viewModel;form;set isDisabled(e){}model;update=new O;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,n,r,o,a){super(),this._ngModelWarningConfig=o,this.callSetDisabledState=a,this._setValidators(e),this._setAsyncValidators(n),this.valueAccessor=ot(this,r)}ngOnChanges(e){if(this._isControlChanged(e)){let n=e.form.previousValue;n&&Re(n,this,!1),he(this.form,this,this.callSetDisabledState),this.form.updateValueAndValidity({emitEvent:!1})}rt(e,this.viewModel)&&(this.form.setValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.form&&Re(this.form,this,!1)}get path(){return[]}get control(){return this.form}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_isControlChanged(e){return e.hasOwnProperty("form")}static \u0275fac=function(n){return new(n||t)(l(P,10),l(ge,10),l(pe,10),l(st,8),l(ee,8))};static \u0275dir=d({type:t,selectors:[["","formControl",""]],inputs:{form:[0,"formControl","form"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},exportAs:["ngForm"],standalone:!1,features:[u([pn]),m,H]})}return t})();var _n={provide:V,useExisting:D(()=>vn)},vn=(()=>{class t extends V{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(e){}model;update=new O;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,n,r,o,a){super(),this._ngModelWarningConfig=a,this._parent=e,this._setValidators(n),this._setAsyncValidators(r),this.valueAccessor=ot(this,o)}ngOnChanges(e){this._added||this._setUpControl(),rt(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return pi(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(n){return new(n||t)(l(k,13),l(P,10),l(ge,10),l(pe,10),l(st,8))};static \u0275dir=d({type:t,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[u([_n]),m,H]})}return t})();var bn={provide:k,useExisting:D(()=>lt)},lt=(()=>{class t extends hn{form=null;ngSubmit=new O;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return(e||(e=z(t)))(r||t)}})();static \u0275dir=d({type:t,selectors:[["","formGroup",""]],hostBindings:function(n,r){n&1&&I("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[u([bn]),m]})}return t})();function yn(t){return typeof t=="number"?t:parseInt(t,10)}function bi(t){return typeof t=="number"?t:parseFloat(t)}var Le=(()=>{class t{_validator=we;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let n=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(n),this._validator=this._enabled?this.createValidator(n):we,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t,features:[H]})}return t})(),xn={provide:P,useExisting:D(()=>Cn),multi:!0},Cn=(()=>{class t extends Le{max;inputName="max";normalizeInput=e=>bi(e);createValidator=e=>ti(e);static \u0275fac=(()=>{let e;return function(r){return(e||(e=z(t)))(r||t)}})();static \u0275dir=d({type:t,selectors:[["input","type","number","max","","formControlName",""],["input","type","number","max","","formControl",""],["input","type","number","max","","ngModel",""]],hostVars:1,hostBindings:function(n,r){n&2&&S("max",r._enabled?r.max:null)},inputs:{max:"max"},standalone:!1,features:[u([xn]),m]})}return t})(),Dn={provide:P,useExisting:D(()=>Fn),multi:!0},Fn=(()=>{class t extends Le{min;inputName="min";normalizeInput=e=>bi(e);createValidator=e=>ei(e);static \u0275fac=(()=>{let e;return function(r){return(e||(e=z(t)))(r||t)}})();static \u0275dir=d({type:t,selectors:[["input","type","number","min","","formControlName",""],["input","type","number","min","","formControl",""],["input","type","number","min","","ngModel",""]],hostVars:1,hostBindings:function(n,r){n&2&&S("min",r._enabled?r.min:null)},inputs:{min:"min"},standalone:!1,features:[u([Dn]),m]})}return t})();var Mn={provide:P,useExisting:D(()=>wn),multi:!0},wn=(()=>{class t extends Le{maxlength;inputName="maxlength";normalizeInput=e=>yn(e);createValidator=e=>ii(e);static \u0275fac=(()=>{let e;return function(r){return(e||(e=z(t)))(r||t)}})();static \u0275dir=d({type:t,selectors:[["","maxlength","","formControlName",""],["","maxlength","","formControl",""],["","maxlength","","ngModel",""]],hostVars:1,hostBindings:function(n,r){n&2&&S("maxlength",r._enabled?r.maxlength:null)},inputs:{maxlength:"maxlength"},standalone:!1,features:[u([Mn]),m]})}return t})(),Vn={provide:P,useExisting:D(()=>An),multi:!0},An=(()=>{class t extends Le{pattern;inputName="pattern";normalizeInput=e=>e;createValidator=e=>ni(e);static \u0275fac=(()=>{let e;return function(r){return(e||(e=z(t)))(r||t)}})();static \u0275dir=d({type:t,selectors:[["","pattern","","formControlName",""],["","pattern","","formControl",""],["","pattern","","ngModel",""]],hostVars:1,hostBindings:function(n,r){n&2&&S("pattern",r._enabled?r.pattern:null)},inputs:{pattern:"pattern"},standalone:!1,features:[u([Vn]),m]})}return t})();var yi=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=E({type:t});static \u0275inj=A({})}return t})();function Yt(t){return!!t&&(t.asyncValidators!==void 0||t.validators!==void 0||t.updateOn!==void 0)}var Tr=(()=>{class t{useNonNullable=!1;get nonNullable(){let e=new t;return e.useNonNullable=!0,e}group(e,n=null){let r=this._reduceControls(e),o={};return Yt(n)?o=n:n!==null&&(o.validators=n.validator,o.asyncValidators=n.asyncValidator),new J(r,o)}record(e,n=null){let r=this._reduceControls(e);return new Qe(r,n)}control(e,n,r){let o={};return this.useNonNullable?(Yt(n)?o=n:(o.validators=n,o.asyncValidators=r),new fe(e,C(_({},o),{nonNullable:!0}))):new fe(e,n,r)}array(e,n,r){let o=e.map(a=>this._createControl(a));return new Ye(o,n,r)}_reduceControls(e){let n={};return Object.keys(e).forEach(r=>{n[r]=this._createControl(e[r])}),n}_createControl(e){if(e instanceof fe)return e;if(e instanceof K)return e;if(Array.isArray(e)){let n=e[0],r=e.length>1?e[1]:null,o=e.length>2?e[2]:null;return this.control(n,r,o)}else return this.control(e)}static \u0275fac=function(n){return new(n||t)};static \u0275prov=be({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Nr=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:ee,useValue:e.callSetDisabledState??Pe}]}}static \u0275fac=function(n){return new(n||t)};static \u0275mod=E({type:t});static \u0275inj=A({imports:[yi]})}return t})(),kr=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:st,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:ee,useValue:e.callSetDisabledState??Pe}]}}static \u0275fac=function(n){return new(n||t)};static \u0275mod=E({type:t});static \u0275inj=A({imports:[yi]})}return t})();var En=["notch"],Sn=["matFormFieldNotchedOutline",""],In=["*"],xi=["iconPrefixContainer"],Ci=["textPrefixContainer"],Di=["iconSuffixContainer"],Fi=["textSuffixContainer"],Rn=["textField"],On=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],Tn=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function Nn(t,i){t&1&&ne(0,"span",21)}function kn(t,i){if(t&1&&(y(0,"label",20),w(1,1),v(2,Nn,1,0,"span",21),x()),t&2){let e=G(2);W("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),S("for",e._control.disableAutomaticLabeling?null:e._control.id),f(2),b(!e.hideRequiredMarker&&e._control.required?2:-1)}}function Pn(t,i){if(t&1&&v(0,kn,3,5,"label",20),t&2){let e=G();b(e._hasFloatingLabel()?0:-1)}}function Ln(t,i){t&1&&ne(0,"div",7)}function Bn(t,i){}function Hn(t,i){if(t&1&&xe(0,Bn,0,0,"ng-template",13),t&2){G(2);let e=Ue(1);W("ngTemplateOutlet",e)}}function zn(t,i){if(t&1&&(y(0,"div",9),v(1,Hn,1,1,null,13),x()),t&2){let e=G();W("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),f(),b(e._forceDisplayInfixLabel()?-1:1)}}function jn(t,i){t&1&&(y(0,"div",10,2),w(2,2),x())}function Gn(t,i){t&1&&(y(0,"div",11,3),w(2,3),x())}function Un(t,i){}function qn(t,i){if(t&1&&xe(0,Un,0,0,"ng-template",13),t&2){G();let e=Ue(1);W("ngTemplateOutlet",e)}}function Wn(t,i){t&1&&(y(0,"div",14,4),w(2,4),x())}function $n(t,i){t&1&&(y(0,"div",15,5),w(2,5),x())}function Zn(t,i){t&1&&ne(0,"div",16)}function Qn(t,i){t&1&&(y(0,"div",18),w(1,6),x())}function Yn(t,i){if(t&1&&(y(0,"mat-hint",22),It(1),x()),t&2){let e=G(2);W("id",e._hintLabelId),f(),Rt(e.hintLabel)}}function Xn(t,i){if(t&1&&(y(0,"div",19),v(1,Yn,2,2,"mat-hint",22),w(2,7),ne(3,"div",23),w(4,8),x()),t&2){let e=G();f(),b(e.hintLabel?1:-1)}}var dt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t,selectors:[["mat-label"]]})}return t})(),Ii=new c("MatError"),Kn=(()=>{class t{id=s(Z).getId("mat-mdc-error-");constructor(){}static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t,selectors:[["mat-error"],["","matError",""]],hostAttrs:[1,"mat-mdc-form-field-error","mat-mdc-form-field-bottom-align"],hostVars:1,hostBindings:function(n,r){n&2&&re("id",r.id)},inputs:{id:"id"},features:[u([{provide:Ii,useExisting:t}])]})}return t})(),ct=(()=>{class t{align="start";id=s(Z).getId("mat-mdc-hint-");static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(n,r){n&2&&(re("id",r.id),S("align",null),F("mat-mdc-form-field-hint-end",r.align==="end"))},inputs:{align:"align",id:"id"}})}return t})(),Jn=new c("MatPrefix");var Ri=new c("MatSuffix"),er=(()=>{class t{set _isTextSelector(e){this._isText=!0}_isText=!1;static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[u([{provide:Ri,useExisting:t}])]})}return t})(),Oi=new c("FloatingLabelParent"),Mi=(()=>{class t{_elementRef=s(M);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=s(Gt);_ngZone=s(T);_parent=s(Oi);_resizeSubscription=new ht;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return tr(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(n,r){n&2&&F("mdc-floating-label--float-above",r.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function tr(t){let i=t;if(i.offsetParent!==null)return i.scrollWidth;let e=i.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let n=e.scrollWidth;return e.remove(),n}var wi="mdc-line-ripple--active",Be="mdc-line-ripple--deactivating",Vi=(()=>{class t{_elementRef=s(M);_cleanupTransitionEnd;constructor(){let e=s(T),n=s(j);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=n.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Be),e.add(wi)}deactivate(){this._elementRef.nativeElement.classList.add(Be)}_handleTransitionEnd=e=>{let n=this._elementRef.nativeElement.classList,r=n.contains(Be);e.propertyName==="opacity"&&r&&n.remove(wi,Be)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),Ai=(()=>{class t{_elementRef=s(M);_ngZone=s(T);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,n=e.querySelector(".mdc-floating-label");n?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(n.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>n.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let n=this._notch.nativeElement;!this.open||!e?n.style.width="":n.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=ie({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(n,r){if(n&1&&je(En,5),n&2){let o;p(o=g())&&(r._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(n,r){n&2&&F("mdc-notched-outline--notched",r.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:Sn,ngContentSelectors:In,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(n,r){n&1&&(ze(),He(0,"div",1),wt(1,"div",2,0),w(3),Vt(),He(4,"div",3))},encapsulation:2,changeDetection:0})}return t})(),ut=(()=>{class t{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t})}return t})();var ft=new c("MatFormField"),ir=new c("MAT_FORM_FIELD_DEFAULT_OPTIONS"),Ei="fill",nr="auto",Si="fixed",rr="translateY(-50%)",Ti=(()=>{class t{_elementRef=s(M);_changeDetectorRef=s(Ce);_platform=s($);_idGenerator=s(Z);_ngZone=s(T);_defaults=s(ir,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=oe("iconPrefixContainer");_textPrefixContainerSignal=oe("textPrefixContainer");_iconSuffixContainerSignal=oe("iconSuffixContainer");_textSuffixContainerSignal=oe("textSuffixContainer");_prefixSuffixContainers=R(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=Tt(dt);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=Q(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||nr}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let n=e||this._defaults?.appearance||Ei;this._appearanceSignal.set(n)}_appearanceSignal=B(Ei);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||Si}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||Si}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new L;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Lt();constructor(){let e=this._defaults,n=s(zt);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),ye(()=>this._currentDirection=n.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=R(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let n=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),n.controlType&&this._elementRef.nativeElement.classList.add(r+n.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=n.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=n.stateChanges.pipe(xt([void 0,void 0]),_e(()=>[n.errorState,n.userAriaDescribedBy]),yt(),bt(([[o,a],[h,te]])=>o!==h||a!==te)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),n.ngControl&&n.ngControl.valueChanges&&(this._valueChanges=n.ngControl.valueChanges.pipe(Ct(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),vt(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){Nt({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=R(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let n=this._control?this._control.ngControl:null;return n&&n[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(h=>h.align==="start"):null,a=this._hintChildren?this._hintChildren.find(h=>h.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let n=this._control.describedByIds,r;if(n){let o=this._describedByIds||e;r=e.concat(n.filter(a=>a&&!o.includes(a)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,n=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,a=e?.getBoundingClientRect().width??0,h=n?.getBoundingClientRect().width??0,te=r?.getBoundingClientRect().width??0,q=o?.getBoundingClientRect().width??0,Li=this._currentDirection==="rtl"?"-1":"1",Bi=`${a+h}px`,Hi=`calc(${Li} * (${Bi} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,zi=`var(--mat-mdc-form-field-label-transform, ${rr} translateX(${Hi}))`,ji=a+h+te+q;return[zi,ji]}_writeOutlinedLabelStyles(e){if(e!==null){let[n,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=n),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let n=e.getRootNode();return n&&n!==e}return document.documentElement.contains(e)}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=ie({type:t,selectors:[["mat-form-field"]],contentQueries:function(n,r,o){if(n&1&&(Et(o,r._labelChild,dt,5),At(o,ut,5)(o,Jn,5)(o,Ri,5)(o,Ii,5)(o,ct,5)),n&2){Ge();let a;p(a=g())&&(r._formFieldControl=a.first),p(a=g())&&(r._prefixChildren=a),p(a=g())&&(r._suffixChildren=a),p(a=g())&&(r._errorChildren=a),p(a=g())&&(r._hintChildren=a)}},viewQuery:function(n,r){if(n&1&&(St(r._iconPrefixContainerSignal,xi,5)(r._textPrefixContainerSignal,Ci,5)(r._iconSuffixContainerSignal,Di,5)(r._textSuffixContainerSignal,Fi,5),je(Rn,5)(xi,5)(Ci,5)(Di,5)(Fi,5)(Mi,5)(Ai,5)(Vi,5)),n&2){Ge(4);let o;p(o=g())&&(r._textField=o.first),p(o=g())&&(r._iconPrefixContainer=o.first),p(o=g())&&(r._textPrefixContainer=o.first),p(o=g())&&(r._iconSuffixContainer=o.first),p(o=g())&&(r._textSuffixContainer=o.first),p(o=g())&&(r._floatingLabel=o.first),p(o=g())&&(r._notchedOutline=o.first),p(o=g())&&(r._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(n,r){n&2&&F("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[u([{provide:ft,useExisting:t},{provide:Oi,useExisting:t}])],ngContentSelectors:Tn,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(n,r){if(n&1&&(ze(On),xe(0,Pn,1,1,"ng-template",null,0,Ot),y(2,"div",6,1),I("click",function(a){return r._control.onContainerClick(a)}),v(4,Ln,1,0,"div",7),y(5,"div",8),v(6,zn,2,2,"div",9),v(7,jn,3,0,"div",10),v(8,Gn,3,0,"div",11),y(9,"div",12),v(10,qn,1,1,null,13),w(11),x(),v(12,Wn,3,0,"div",14),v(13,$n,3,0,"div",15),x(),v(14,Zn,1,0,"div",16),x(),y(15,"div",17),v(16,Qn,2,0,"div",18)(17,Xn,5,1,"div",19),x()),n&2){let o;f(2),F("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),f(2),b(!r._hasOutline()&&!r._control.disabled?4:-1),f(2),b(r._hasOutline()?6:-1),f(),b(r._hasIconPrefix?7:-1),f(),b(r._hasTextPrefix?8:-1),f(2),b(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),f(2),b(r._hasTextSuffix?12:-1),f(),b(r._hasIconSuffix?13:-1),f(),b(r._hasOutline()?-1:14),f(),F("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let a=r._getSubscriptMessageType();f(),b((o=a)==="error"?16:o==="hint"?17:-1)}},dependencies:[Mi,Ai,kt,Vi,ct],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2,changeDetection:0})}return t})();var mt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=E({type:t});static \u0275inj=A({imports:[Ht,Ti,De]})}return t})();var or=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275cmp=ie({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(n,r){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2,changeDetection:0})}return t})(),ar={passive:!0},Ni=(()=>{class t{_platform=s($);_ngZone=s(T);_renderer=s(Dt).createRenderer(null,null);_styleLoader=s(Bt);_monitoredElements=new Map;constructor(){}monitor(e){if(!this._platform.isBrowser)return pt;this._styleLoader.load(or);let n=We(e),r=this._monitoredElements.get(n);if(r)return r.subject;let o=new L,a="cdk-text-field-autofilled",h=q=>{q.animationName==="cdk-text-field-autofill-start"&&!n.classList.contains(a)?(n.classList.add(a),this._ngZone.run(()=>o.next({target:q.target,isAutofilled:!0}))):q.animationName==="cdk-text-field-autofill-end"&&n.classList.contains(a)&&(n.classList.remove(a),this._ngZone.run(()=>o.next({target:q.target,isAutofilled:!1})))},te=this._ngZone.runOutsideAngular(()=>(n.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(n,"animationstart",h,ar)));return this._monitoredElements.set(n,{subject:o,unlisten:te}),o}stopMonitoring(e){let n=We(e),r=this._monitoredElements.get(n);r&&(r.unlisten(),r.subject.complete(),n.classList.remove("cdk-text-field-autofill-monitored"),n.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(n))}ngOnDestroy(){this._monitoredElements.forEach((e,n)=>this.stopMonitoring(n))}static \u0275fac=function(n){return new(n||t)};static \u0275prov=be({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ki=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=E({type:t});static \u0275inj=A({})}return t})();var Pi=new c("MAT_INPUT_VALUE_ACCESSOR");var sr=["button","checkbox","file","hidden","image","radio","range","reset","submit"],lr=new c("MAT_INPUT_CONFIG"),Uo=(()=>{class t{_elementRef=s(M);_platform=s($);ngControl=s(V,{optional:!0,self:!0});_autofillMonitor=s(Ni);_ngZone=s(T);_formField=s(ft,{optional:!0});_renderer=s(j);_uid=s(Z).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=s(lr,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new L;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=Q(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Me.required)??!1}set required(e){this._required=Q(e)}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&$e().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=Q(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>$e().has(e));constructor(){let e=s(at,{optional:!0}),n=s(lt,{optional:!0}),r=s(Pt),o=s(Pi,{optional:!0,self:!0}),a=this._elementRef.nativeElement,h=a.nodeName.toLowerCase();o?Ft(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=a,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(a,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new jt(r,this.ngControl,n,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=h==="select",this._isTextarea=h==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=a.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&ye(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let n=this._elementRef.nativeElement;n.type==="number"?(n.type="text",n.setSelectionRange(0,0),n.type="number"):n.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let n=this._elementRef.nativeElement;this._previousPlaceholder=e,e?n.setAttribute("placeholder",e):n.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){sr.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,n=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&n&&n.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let n=this._elementRef.nativeElement;e.length?n.setAttribute("aria-describedby",e.join(" ")):n.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let n=e.target;!n.value&&n.selectionStart===0&&n.selectionEnd===0&&(n.setSelectionRange(1,1),n.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(n){return new(n||t)};static \u0275dir=d({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(n,r){n&1&&I("focus",function(){return r._focusChanged(!0)})("blur",function(){return r._focusChanged(!1)})("input",function(){return r._onInput()}),n&2&&(re("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),S("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),F("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",ae]},exportAs:["matInput"],features:[u([{provide:ut,useExisting:t}]),H]})}return t})(),qo=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=E({type:t});static \u0275inj=A({imports:[mt,mt,ki,De]})}return t})();export{pe as a,Jt as b,P as c,Me as d,V as e,Sr as f,Ir as g,J as h,at as i,fe as j,un as k,Or as l,mn as m,gn as n,vn as o,lt as p,Cn as q,Fn as r,wn as s,An as t,Tr as u,Nr as v,kr as w,dt as x,Kn as y,ct as z,er as A,ut as B,ft as C,Ti as D,mt as E,Pi as F,Uo as G,qo as H};
