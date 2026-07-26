import{a as u}from"./chunk-4QE722OS.js";import{l as we,o as Be,t as Ee,v as Ie}from"./chunk-BH4FBZBR.js";import{a as j,b as De,c as Re,e as P}from"./chunk-V4GPLOWT.js";import{b as ve,c as ge,f as ke}from"./chunk-UMJS5DOS.js";import{e as Me}from"./chunk-SUNZS7V5.js";import{a as ye,c as xe,d as Ae,e as O,o as Ce,t as Se}from"./chunk-RR2YCN3U.js";import{Ba as h,Bb as I,C as U,Ca as b,Da as te,Ma as _,N as V,Oa as x,Pa as ne,Qa as ae,Qb as T,T as Z,W as w,Wa as ie,Xa as re,Y as r,Ya as oe,Yb as de,a as l,aa as $,ba as G,bb as A,cb as v,db as C,ea as m,f as d,fa as Q,ga as W,h as L,hb as se,ja as X,jb as M,jc as me,k as q,kc as ue,l as k,lb as D,ma as K,mc as pe,nc as fe,o as z,oa as J,oc as he,pb as ce,qb as R,rb as B,rc as be,sa as Y,sc as _e,va as ee,x as H,xb as le,z as y,zb as E}from"./chunk-O6WD76AR.js";function Te(n,s){let e=s?.injector??r(m),t=new L(1),a=J(()=>{let i;try{i=n()}catch(o){T(()=>t.error(o));return}T(()=>t.next(i))},{injector:e,manualCleanup:!0});return e.get(W).onDestroy(()=>{a.destroy(),t.complete()}),t.asObservable()}var Oe=()=>{let n=r(u),s=r(ge),e=r(ee);return me(e)?n.initialized()?n.isAuthenticated()?!0:s.createUrlTree(["/login"]):Te(n.initialized).pipe(H(t=>t===!0),U(1),z(()=>n.isAuthenticated()?!0:s.createUrlTree(["/login"]))):!0};var je=[{path:"login",loadComponent:()=>import("./chunk-2GQ56IOU.js").then(n=>n.LoginPage)},{path:"registro",loadComponent:()=>import("./chunk-N33DDMM2.js").then(n=>n.RegistroPage)},{path:"",loadComponent:()=>import("./chunk-3IEAIZCC.js").then(n=>n.MainLayout),canActivate:[Oe],children:[{path:"perfil",loadComponent:()=>import("./chunk-CXDNO6GN.js").then(n=>n.PerfilPage)},{path:"dashboard",loadComponent:()=>import("./chunk-5NXHUV4J.js").then(n=>n.DashboardPage)},{path:"balance",loadComponent:()=>import("./chunk-PWDDSI2N.js").then(n=>n.BalancePage)},{path:"salidas/:id",loadComponent:()=>import("./chunk-QC4UFBKG.js").then(n=>n.SalidaDetallePage)},{path:"",redirectTo:"dashboard",pathMatch:"full"}]}];var Pe=(n,s)=>{let e=r(u),t=e.getToken(),a=t?n.clone({setHeaders:{Authorization:`Bearer ${t}`}}):n;return s(a).pipe(y(i=>(i.status===401&&!n.url.includes("/me")&&e.logout(),k(()=>i))))};function Ve(n,s){if(n&1){let e=se();A(0,"div",1)(1,"button",2),M("click",function(){$(e);let a=D();return G(a.action())}),E(2),v()()}if(n&2){let e=D();h(2),I(" ",e.data.action," ")}}var Ze=["label"];function $e(n,s){}var Ge=Math.pow(2,31)-1,g=class{_overlayRef;instance;containerInstance;_afterDismissed=new d;_afterOpened=new d;_onAction=new d;_durationTimeoutId;_dismissedByAction=!1;constructor(s,e){this._overlayRef=e,this.containerInstance=s,s._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(s){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(s,Ge))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},Fe=new w("MatSnackBarData"),p=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},Qe=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=x({type:n,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return n})(),We=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=x({type:n,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return n})(),Xe=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=x({type:n,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return n})(),Ke=(()=>{class n{snackBarRef=r(g);data=r(Fe);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=_({type:n,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(t,a){t&1&&(A(0,"div",0),E(1),v(),re(2,Ve,3,1,"div",1)),t&2&&(h(),I(" ",a.data.message,`
`),h(),oe(a.hasAction?2:-1))},dependencies:[Me,Qe,We,Xe],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return n})(),F="_mat-snack-bar-enter",N="_mat-snack-bar-exit",Je=(()=>{class n extends Re{_ngZone=r(X);_elementRef=r(Y);_changeDetectorRef=r(de);_platform=r(ye);_animationsDisabled=O();snackBarConfig=r(p);_document=r(Q);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=r(m);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new d;_onExit=new d;_onEnter=new d;_animationState="void";_live;_label;_role;_liveElementId=r(Se).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),t}attachTemplatePortal(e){this._assertNotAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),t}attachDomPortal=e=>{this._assertNotAttached();let t=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),t};onAnimationEnd(e){e===N?this._completeExit():e===F&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?b(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(F)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(F)},200)))}exit(){return this._destroyed?q(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?b(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(N)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(N),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,t=this.snackBarConfig.panelClass;t&&(Array.isArray(t)?t.forEach(o=>e.classList.add(o)):e.classList.add(t)),this._exposeToModals();let a=this._label.nativeElement,i="mdc-snackbar__label";a.classList.toggle(i,!a.querySelector(`.${i}`))}_exposeToModals(){let e=this._liveElementId,t=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let a=0;a<t.length;a++){let i=t[a],o=i.getAttribute("aria-owns");this._trackedModals.add(i),o?o.indexOf(e)===-1&&i.setAttribute("aria-owns",o+" "+e):i.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let t=e.getAttribute("aria-owns");if(t){let a=t.replace(this._liveElementId,"").trim();a.length>0?e.setAttribute("aria-owns",a):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,t=e.querySelector("[aria-hidden]"),a=e.querySelector("[aria-live]");if(t&&a){let i=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&t.contains(document.activeElement)&&(i=document.activeElement),t.removeAttribute("aria-hidden"),a.appendChild(t),i?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=_({type:n,selectors:[["mat-snack-bar-container"]],viewQuery:function(t,a){if(t&1&&ce(P,7)(Ze,7),t&2){let i;R(i=B())&&(a._portalOutlet=i.first),R(i=B())&&(a._label=i.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(t,a){t&1&&M("animationend",function(o){return a.onAnimationEnd(o.animationName)})("animationcancel",function(o){return a.onAnimationEnd(o.animationName)}),t&2&&le("mat-snack-bar-container-enter",a._animationState==="visible")("mat-snack-bar-container-exit",a._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!a._animationsDisabled)},features:[ne],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(t,a){t&1&&(A(0,"div",1)(1,"div",2,0)(3,"div",3),ae(4,$e,0,0,"ng-template",4),v(),C(5,"div"),v()()),t&2&&(h(5),ie("aria-live",a._live)("role",a._role)("id",a._liveElementId))},dependencies:[P],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2})}return n})(),Ye=new w("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new p}),Ne=(()=>{class n{_live=r(Ce);_injector=r(m);_breakpointObserver=r(xe);_parentSnackBar=r(n,{optional:!0,skipSelf:!0});_defaultConfig=r(Ye);_animationsDisabled=O();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=Ke;snackBarContainerComponent=Je;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(){}openFromComponent(e,t){return this._attach(e,t)}openFromTemplate(e,t){return this._attach(e,t)}open(e,t="",a){let i=l(l({},this._defaultConfig),a);return i.data={message:e,action:t},i.announcementMessage===e&&(i.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,i)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,t){let a=t&&t.viewContainerRef&&t.viewContainerRef.injector,i=m.create({parent:a||this._injector,providers:[{provide:p,useValue:t}]}),o=new j(this.snackBarContainerComponent,t.viewContainerRef,i),c=e.attach(o);return c.instance.snackBarConfig=t,c.instance}_attach(e,t){let a=l(l(l({},new p),this._defaultConfig),t),i=this._createOverlay(a),o=this._attachSnackBarContainer(i,a),c=new g(o,i);if(e instanceof te){let f=new De(e,null,{$implicit:a.data,snackBarRef:c});c.instance=o.attachTemplatePortal(f)}else{let f=this._createInjector(a,c),ze=new j(e,void 0,f),He=o.attachComponentPortal(ze);c.instance=He.instance}return this._breakpointObserver.observe(Ae.HandsetPortrait).pipe(V(i.detachments())).subscribe(f=>{i.overlayElement.classList.toggle(this.handsetCssClass,f.matches)}),a.announcementMessage&&o._onAnnounce.subscribe(()=>{this._live.announce(a.announcementMessage,a.politeness)}),this._animateSnackBar(c,a),this._openedSnackBarRef=c,this._openedSnackBarRef}_animateSnackBar(e,t){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),t.announcementMessage&&this._live.clear()}),t.duration&&t.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(t.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let t=new Be;t.direction=e.direction;let a=Ee(this._injector),i=e.direction==="rtl",o=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!i||e.horizontalPosition==="end"&&i,c=!o&&e.horizontalPosition!=="center";return o?a.left("0"):c?a.right("0"):a.centerHorizontally(),e.verticalPosition==="top"?a.top("0"):a.bottom("0"),t.positionStrategy=a,t.disableAnimations=this._animationsDisabled,Ie(this._injector,t)}_createInjector(e,t){let a=e&&e.viewContainerRef&&e.viewContainerRef.injector;return m.create({parent:a||this._injector,providers:[{provide:g,useValue:t},{provide:Fe,useValue:e.data}]})}static \u0275fac=function(t){return new(t||n)};static \u0275prov=Z({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Le=(n,s)=>{let e=r(Ne);return s(n).pipe(y(t=>{let a="Ha ocurrido un error inesperado. Por favor, intenta de nuevo.";return t.error instanceof ErrorEvent?a=`Error: ${t.error.message}`:t.status===401?a="Sesi\xF3n expirada o credenciales inv\xE1lidas.":t.status===403?a="No tienes permisos para realizar esta acci\xF3n.":t.status>=500?a="Error en el servidor. Estamos trabajando para solucionarlo.":t.error&&typeof t.error.message=="string"&&(a=t.error.message),e.open(a,"Cerrar",{duration:5e3,horizontalPosition:"center",verticalPosition:"bottom",panelClass:["error-snackbar"]}),k(()=>t)}))};var qe={providers:[K(),ke(je),pe(he(),fe([Pe,Le])),_e(be()),we()]};var S=class n{authService=r(u);constructor(){b(()=>{this.authService.autoLogin().subscribe()})}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=_({type:n,selectors:[["app-root"]],decls:1,vars:0,template:function(e,t){e&1&&C(0,"router-outlet")},dependencies:[ve],styles:["[_nghost-%COMP%]{display:block;height:100%}"]})};ue(S,qe).catch(n=>console.error(n));
