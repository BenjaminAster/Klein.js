(async()=>{Object.defineProperty(HTMLTemplateElement.prototype,"childNodes",{get(){return this.content.childNodes}}),HTMLElement.prototype.on=function(...t){return this.addEventListener(...t)};const t=(()=>{const t=e=>{let n=e;for(const[o,c]of[...e.childNodes].entries())n[o]=t(c);return n},e=t(document.documentElement);return(...t)=>t.reduce((t,e)=>t[e],e)})(),e=e=>{let n=e,o=[],c=[];const r=()=>{for(const[e,n]of o){const o=t(...e);o&&(o.textContent=n())}for(const t of c)t()};return window.setTimeout(r),{$:(t,...e)=>(e.length?o.push([e,t]):c.push(t),[t,...e]),get _(){return n},set _(t){n=t,r()}}};{let n=e(5),o=e(10);console.log(n._,o._),n.$(()=>n._,1,0,2),t(1,0).on("click",()=>{n._++}),n.$(()=>n._,1,1,2),t(1,1).on("click",()=>{n._--}),o.$(()=>o._,1,2,2),t(1,2).on("click",()=>{o._++}),o.$(()=>o._,1,3,2),t(1,3).on("click",()=>{o._--}),n.$(()=>n._,1,4,2),o.$(()=>o._,1,4,6),n.$(...o.$(()=>n._*o._,1,4,10))}})();
//# sourceMappingURL=data:application/javascript,%7B%22version%22:3,%22file%22:%22script.js%22,%22sources%22:%5B%22../$/.asterjs/script.ts%22%5D,%22mappings%22:%22AACA,WACIA,OAAOC,eAAeC,oBAAoBC,UAAW,aAAc,CAC/DC,MACI,OAAOC,KAAKC,QAAQC,cAQ5BC,YAAYL,UAAUM,GAAK,YAAYC,GACnC,OAAOL,KAAKM,oBAAoBD,IAEpC,MAAME,EAAU,MACZ,MAAMC,EAAwBC,IAC1B,IAAIC,EAASD,EACb,IAAK,MAAOE,EAAGC,IAAc,IACtBH,EAAKP,YACVW,UACEH,EAAOC,GAAKH,EAAqBI,GAErC,OAAOF,GAELI,EAAcN,EAAqBO,SAASC,iBAClD,MAAO,IAAIC,IAAOA,EAAKC,OAAO,CAACC,EAAMC,IAAQD,EAAKC,GAC5CN,IAZM,GAeVO,EAAkBC,IACpB,IAAIC,EAAQD,EACRE,EAAS,GACTC,EAAoB,GACxB,MAAMC,EAAS,KACX,IAAK,MAAOT,EAAMU,KAAkBH,EAAO,CACvC,MAAMf,EAAOF,KAAWU,GACpBR,IACAA,EAAKmB,YAAcD,KAG3B,IAAK,MAAME,KAAoBJ,EAC3BI,KAIR,OADAC,OAAOC,WAAWL,GACX,CACHM,EAAE,CAACC,KAAmBhB,KACdA,EAAKiB,OACLV,EAAOW,KAAK,CACRlB,EACAgB,IAGJR,EAAkBU,KAAKF,GAEpB,CACHA,KACGhB,IAGXmB,QACI,OAAOb,GAEXa,MAAOC,GACHd,EAAQc,EACRX,OAIZ,CAaI,IAAIY,EAAQjB,EAAe,GACvBkB,EAAclB,EAAe,IACjCmB,QAAQC,IAAIH,EAAMF,EAAGG,EAAYH,GAE7BE,EAAMN,EAAE,IAAIM,EAAMF,EAChB,EAAG,EAAG,GACR7B,EAAQ,EAAG,GAAGH,GAAG,QAAS,KACtBkC,EAAMF,MAIVE,EAAMN,EAAE,IAAIM,EAAMF,EAChB,EAAG,EAAG,GACR7B,EAAQ,EAAG,GAAGH,GAAG,QAAS,KACtBkC,EAAMF,MAIVG,EAAYP,EAAE,IAAIO,EAAYH,EAC5B,EAAG,EAAG,GACR7B,EAAQ,EAAG,GAAGH,GAAG,QAAS,KACtBmC,EAAYH,MAIhBG,EAAYP,EAAE,IAAIO,EAAYH,EAC5B,EAAG,EAAG,GACR7B,EAAQ,EAAG,GAAGH,GAAG,QAAS,KACtBmC,EAAYH,MAIhBE,EAAMN,EAAE,IAAIM,EAAMF,EAChB,EAAG,EAAG,GACRG,EAAYP,EAAE,IAAIO,EAAYH,EAC5B,EAAG,EAAG,GACRE,EAAMN,KAAKO,EAAYP,EAAE,IAAIM,EAAMF,EAAIG,EAAYH,EACjD,EAAG,EAAG,OAvHpB%22%7D