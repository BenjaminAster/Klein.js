(async()=>{HTMLElement.prototype.on=function(...e){return this.addEventListener(...e)};const e=(()=>{const e=n=>{let o={_:n};for(const[t,c]of[..."TEMPLATE"===n.nodeName?(n.remove(),n.content.childNodes):n.childNodes].entries())o[t]=e(c);return o},n=e(document.documentElement);return(...e)=>e.reduce((e,n)=>e?.[n],n)?._})(),n=n=>{let o=n,t=[],c=[],r=[];const s=()=>{console.log("update",c);for(const[n,o,t,s,d]of c){const c=[...e(...n).childNodes].slice(...t());for(const e of c)e.remove();const d=new DocumentFragment;r.filter(([e])=>console.log(e)),o(function*(){for(;;)yield e=>{const n=s.cloneNode(!0);e?.((e,...o)=>{o.reduce((e,n)=>e?.childNodes?.[n],n).textContent=e}),d.append(n)}}());const l=e(...n).childNodes[t()[1]];l.parentNode.insertBefore(d,l)}for(const[n,o]of t){const t=e(...n);t&&(t.textContent=o())}};return{$:(n,o,d,l,i)=>((()=>{if(!n)return s();if(!d)return void t.push([n,o]);if(!l)return void r.push([n,o,d]);const u=()=>[d,d+i+1].map((o,t)=>{return[...(c=e(...n,o)).parentNode.childNodes].indexOf(c)+1-t;var c});e(...n,d).data=i;const _=new DocumentFragment;_.append(...[...e(...n).childNodes].slice(...u()).slice(0,l).map(e=>e.cloneNode(!0))),c.push([n,o,u,_,d])})(),[n,o,d,l,i]),get _(){return o},set _(e){o=e,s()}}};{let o=n(5),t=n(0);o.$([1,0,2],()=>o._),e(1,0).on("click",()=>{o._++}),o.$([1,1,2],()=>o._),e(1,1).on("click",()=>{o._--}),t.$([1,2,2],()=>t._),e(1,2).on("click",()=>{t._++}),t.$([1,3,2],()=>t._),e(1,3).on("click",()=>{t._--}),o.$([1,4,2],()=>o._),t.$([1,4,6],()=>t._),o.$(...t.$([1,4,10],()=>o._*t._)),o.$(...t.$([1],e=>{o._>t._&&e.next().value()},5,1,1)),t.$([1],e=>{for(let n=2;n<t._+10;n++)e.next().value(e=>{e(n,0,2)})},8,1,5),o.$(),t.$()}})();
//# sourceMappingURL=./script.js.map