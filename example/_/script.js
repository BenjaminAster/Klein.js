(async()=>{Object.defineProperty(HTMLTemplateElement.prototype,"childNodes",{get(){return this.content.childNodes}});const e=(()=>{const e=t=>{let n=t;for(const[c,o]of[...t.childNodes].entries())n[c]=e(o);return n},t=e(document.documentElement);return(...e)=>e.reduce((e,t)=>e[t],t)})(),t=(t,n)=>{let c=t;const o=()=>{for(const[t,o]of Object.entries(n(c))){const n=e(...t.split(","));n&&(n.textContent=o)}};return setTimeout(o),{get _(){return c},set _(e){c=e,o()}}};{let n=t(5,e=>({[[1,0,2]]:e,[[1,1,2]]:e,[[1,4,2]]:e,[[1,4,10]]:e*c._})),c=t(10,e=>({[[1,2,2]]:e,[[1,3,2]]:e,[[1,4,6]]:e,[[1,4,10]]:e*n._}));console.log(n._,c._),e(1,0).addEventListener("click",()=>{n._++}),e(1,1).addEventListener("click",()=>{n._--}),e(1,2).addEventListener("click",()=>{c._++}),e(1,3).addEventListener("click",()=>{c._--})}})();
//# sourceMappingURL=data:application/javascript,%7B%22version%22:3,%22file%22:%22script.js%22,%22sources%22:%5B%22../$/.asterjs/script.ts%22%5D,%22mappings%22:%22AACA,WACIA,OAAOC,eAAeC,oBAAoBC,UAAW,aAAc,CAC/DC,MACI,OAAOC,KAAKC,QAAQC,cAG5B,MAAMC,EAAU,MACZ,MAAMC,EAAwBC,IAC1B,IAAIC,EAASD,EACb,IAAK,MAAOE,EAAGC,IAAc,IACtBH,EAAKH,YACVO,UACEH,EAAOC,GAAKH,EAAqBI,GAErC,OAAOF,GAELI,EAAcN,EAAqBO,SAASC,iBAClD,MAAO,IAAIC,IAAOA,EAAKC,OAAO,CAACC,EAAMC,IAAQD,EAAKC,GAC5CN,IAZM,GAeVO,EAAiB,CAACC,EAAcC,KAClC,IAAIC,EAAQF,EACZ,MAAMG,EAAS,KACX,IAAK,MAAOR,EAAMS,KAAgB3B,OAAOc,QAAQU,EAAWC,IAAQ,CAChE,MAAMf,EAAOF,KAAWU,EAAKU,MAAM,MAC/BlB,IACAA,EAAKmB,YAAcF,KAK/B,OADAG,WAAWJ,GACJ,CACHK,QACI,OAAON,GAEXM,MAAOC,GACHP,EAAQO,EACRN,OAIZ,CACI,IAAIO,EAAQX,EAAe,EAAIU,KACvB5B,CAAC,CACG,EACA,EACA,IACA4B,EACJ5B,CAAC,CACG,EACA,EACA,IACA4B,EACJ5B,CAAC,CACG,EACA,EACA,IACA4B,EACJ5B,CAAC,CACG,EACA,EACA,KACA4B,EAAWE,EAAYH,KAG/BG,EAAcZ,EAAe,GAAKU,KAC9B5B,CAAC,CACG,EACA,EACA,IACA4B,EACJ5B,CAAC,CACG,EACA,EACA,IACA4B,EACJ5B,CAAC,CACG,EACA,EACA,IACA4B,EACJ5B,CAAC,CACG,EACA,EACA,KACA4B,EAAWC,EAAMF,KAG7BI,QAAQC,IAAIH,EAAMF,EAAGG,EAAYH,GAE7BvB,EAAQ,EAAG,GAAG6B,iBAAiB,QAAS,KACpCJ,EAAMF,MAIVvB,EAAQ,EAAG,GAAG6B,iBAAiB,QAAS,KACpCJ,EAAMF,MAIVvB,EAAQ,EAAG,GAAG6B,iBAAiB,QAAS,KACpCH,EAAYH,MAIhBvB,EAAQ,EAAG,GAAG6B,iBAAiB,QAAS,KACpCH,EAAYH,QA3G5B%22%7D