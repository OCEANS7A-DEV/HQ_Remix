import{a as E}from"/HQ_Remix/build/_shared/chunk-6GUA4ZHO.js";import{e as te,f as q}from"/HQ_Remix/build/_shared/chunk-LDKLFWFL.js";import{n as L}from"/HQ_Remix/build/_shared/chunk-CSSLBNQS.js";import{a as ae}from"/HQ_Remix/build/_shared/chunk-PKQOZDFD.js";import{c as Z,e as ee}from"/HQ_Remix/build/_shared/chunk-WBSU35WJ.js";import{a as F,b as M,c as W,e as X,p as K}from"/HQ_Remix/build/_shared/chunk-RTMQMJ27.js";var re=F(j=>{"use strict";Object.defineProperty(j,"__esModule",{value:!0});j.parseLengthAndUnit=ne;j.cssValue=ye;var be={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function ne(e){if(typeof e=="number")return{value:e,unit:"px"};var a,o=(e.match(/^[0-9.]*/)||"").toString();o.includes(".")?a=parseFloat(o):a=parseInt(o,10);var s=(e.match(/[^0-9]*$/)||"").toString();return be[s]?{value:a,unit:s}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(a,"px.")),{value:a,unit:"px"})}function ye(e){var a=ne(e);return"".concat(a.value).concat(a.unit)}});var se=F(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.createAnimation=void 0;var Oe=function(e,a,o){var s="react-spinners-".concat(e,"-").concat(o);if(typeof window>"u"||!window.document)return s;var i=document.createElement("style");document.head.appendChild(i);var f=i.sheet,b=`
    @keyframes `.concat(s,` {
      `).concat(a,`
    }
  `);return f&&f.insertRule(b,0),s};T.createAnimation=Oe});var ie=F(d=>{"use strict";var m=d&&d.__assign||function(){return m=Object.assign||function(e){for(var a,o=1,s=arguments.length;o<s;o++){a=arguments[o];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},m.apply(this,arguments)},Ne=d&&d.__createBinding||(Object.create?function(e,a,o,s){s===void 0&&(s=o);var i=Object.getOwnPropertyDescriptor(a,o);(!i||("get"in i?!a.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return a[o]}}),Object.defineProperty(e,s,i)}:function(e,a,o,s){s===void 0&&(s=o),e[s]=a[o]}),_e=d&&d.__setModuleDefault||(Object.create?function(e,a){Object.defineProperty(e,"default",{enumerable:!0,value:a})}:function(e,a){e.default=a}),De=d&&d.__importStar||function(e){if(e&&e.__esModule)return e;var a={};if(e!=null)for(var o in e)o!=="default"&&Object.prototype.hasOwnProperty.call(e,o)&&Ne(a,e,o);return _e(a,e),a},Pe=d&&d.__rest||function(e,a){var o={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&a.indexOf(s)<0&&(o[s]=e[s]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(e);i<s.length;i++)a.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(o[s[i]]=e[s[i]]);return o};Object.defineProperty(d,"__esModule",{value:!0});var B=De(W()),J=re(),we=se(),oe=(0,we.createAnimation)("MoonLoader","100% {transform: rotate(360deg)}","moon");function Le(e){var a=e.loading,o=a===void 0?!0:a,s=e.color,i=s===void 0?"#000000":s,f=e.speedMultiplier,b=f===void 0?1:f,C=e.cssOverride,Q=C===void 0?{}:C,U=e.size,v=U===void 0?60:U,g=Pe(e,["loading","color","speedMultiplier","cssOverride","size"]),y=(0,J.parseLengthAndUnit)(v),h=y.value,p=y.unit,S=Math.round(h/7),k=m({display:"inherit",position:"relative",width:"".concat("".concat(h+S*2).concat(p)),height:"".concat("".concat(h+S*2).concat(p)),animation:"".concat(oe," ").concat(.6/b,"s 0s infinite linear"),animationFillMode:"forwards"},Q),A=function(V){return{width:(0,J.cssValue)(V),height:(0,J.cssValue)(V),borderRadius:"100%"}},I=m(m({},A(S)),{backgroundColor:"".concat(i),opacity:"0.8",position:"absolute",top:"".concat("".concat(h/2-S/2).concat(p)),animation:"".concat(oe," ").concat(.6/b,"s 0s infinite linear"),animationFillMode:"forwards"}),R=m(m({},A(h)),{border:"".concat(S,"px solid ").concat(i),opacity:"0.1",boxSizing:"content-box",position:"absolute"});return o?B.createElement("span",m({style:k},g),B.createElement("span",{style:I}),B.createElement("span",{style:R})):null}d.default=Le});var l=M(W(),1);var ce=M(ie(),1);var t=M(K(),1),Ce=()=>{let e=new Date,a=e.getFullYear(),o=("0"+(e.getMonth()+1)).slice(-2),s=("0"+e.getDate()).slice(-2);return a+"/"+o+"/"+s},Ae=Ce();function le(){let[e,a]=(0,l.useState)([]),[o,s]=(0,l.useState)(!1),[i,f]=(0,l.useState)(null),[b,C]=(0,l.useState)([]),Q=`\u4ECA\u56DE\u306E\u5E97\u8217\u304B\u3089\u306E\u6CE8\u6587\u3092${Ae}\u3067\u7DE0\u3081\u5207\u308A\u307E\u3059\u304B\uFF1F`,U=19,[v,g]=(0,l.useState)(""),[y,h]=(0,l.useState)(null),[p,S]=(0,l.useState)(null),[k,A]=(0,l.useState)(null),[I,R]=(0,l.useState)(null),[V,ue]=(0,l.useState)([]),[Y,z]=(0,l.useState)(!1),O=X(),de=async()=>{let u=(await q()).filter(c=>c[1]==="FAX").map(c=>({value:c[0],label:c[0]}));A(u)},pe=async()=>{let u=(await q()).filter(c=>c[7]==="\u30AA\u30FC\u30B7\u30E3\u30F3").map(c=>({value:c[0],label:c[0]}));R(u)},$=async()=>{if(v===""){L.error("\u53D6\u5F97\u3059\u308B\u65E5\u4ED8\u304C\u5165\u529B\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002");return}z(!0);let n=await Z(v),r=await JSON.parse(localStorage.getItem("storeData")??"").flat(1);ue(n),[...new Set(n.map(N=>N[1]))].sort((N,H)=>r.indexOf(N)-r.indexOf(H));let c=[];r.map(N=>{let G=n.filter(x=>x[1]===N).map(x=>x[12]),_={storeName:N,process:""},D=G.includes("\u5370\u5237\u6E08"),P=G.includes("\u672A\u5370\u5237"),w=G.includes("\u6CE8\u6587\u7121");D&&!P&&!w?_.process="\u5370\u5237\u6E08":!D&&P&&!w?_.process="\u672A\u5370\u5237":D&&P&&!w?_.process="\u4E00\u90E8\u672A\u5370\u5237":!D&&!P&&!w?_.process="\u672A\u6CE8\u6587":w&&!D&&!P&&(_.process="\u6CE8\u6587\u7121"),c.push(_)}),a(c),z(!1)};(0,l.useEffect)(()=>{let n=async()=>{let r=await JSON.parse(localStorage.getItem("storeData")??""),u=[];for(let c=0;c<r.length;c++)u.push({value:r[c],label:r[c]});C(u),await te(u)};g(sessionStorage.getItem("setDATE")??""),n(),de(),pe()},[]),(0,l.useEffect)(()=>{v!==""&&$()},[v]),(0,l.useEffect)(()=>{let n=sessionStorage.getItem("printdate")??"";if(n!=="")g(n),$(n);else{let r=new Date,c=new Date(r.getTime()+9*60*60*1e3).toISOString().split("T")[0];g(c)}},[]),(0,l.useEffect)(()=>{if((sessionStorage.getItem("setDATE")??"")===""){let r=new Date,u=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`;g(u)}},[]);let Me=()=>{ee(),alert("\u78BA\u8A8D\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F"),s(!1)},Ee=()=>{alert("\u30AD\u30E3\u30F3\u30BB\u30EB\u3055\u308C\u307E\u3057\u305F"),s(!1)},me=async()=>{let n="";i&&(n=i.value);let r=sessionStorage.getItem("setDATE")??"",u=new URLSearchParams;r!==""&&n!==""&&(u.set("date",r),u.set("store",n),O(`/orderPrint?${u.toString()}`))},fe=async()=>{let n=e.filter(r=>r.process=="\u672A\u5370\u5237"||r.process=="\u4E00\u90E8\u672A\u5370\u5237");console.log(e),e.map(r=>{console.log(r.storeName)})},ve=async()=>{if(!y||!p){L.error("\u696D\u8005\u306E\u9078\u629E\u3001\u3082\u3057\u304F\u306F\u914D\u9001\u5148\u306E\u9078\u629E\u304C\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002");return}let n=sessionStorage.getItem("setDATE")??"",r=new URLSearchParams;r.set("date",n),r.set("address",y.value),r.set("vendor",p.value),p.value=="\u5927\u6D0B\u5546\u4F1A"?O(`/taiyo?${r.toString()}`):O(`/etcPrint?${r.toString()}`)},ge=()=>{let n=sessionStorage.getItem("setDATE")??"";if(n===""){L.error("\u53D6\u5F97\u3059\u308B\u65E5\u4ED8\u304C\u5165\u529B\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002");return}let r=new URLSearchParams;r.set("date",n),O(`/detailPrint?${r.toString()}`)},he=()=>{let n=sessionStorage.getItem("setDATE")??"";if(n===""){L.error("\u53D6\u5F97\u3059\u308B\u65E5\u4ED8\u304C\u5165\u529B\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002");return}let r=new URLSearchParams;r.set("date",n),O(`/elsecasePrint?${r.toString()}`)},Se=n=>{g(n),sessionStorage.setItem("setDATE",n)};return(0,t.jsxs)("div",{className:"check_window",children:[(0,t.jsx)("div",{className:"banner",children:(0,t.jsx)(ae,{})}),(0,t.jsxs)("div",{className:"chack_etc",children:[(0,t.jsxs)("div",{className:"check_area",children:[(0,t.jsxs)("div",{className:"check_set",children:[(0,t.jsx)("button",{type:"button",onClick:()=>$(),children:"\u53D6\u5F97"}),(0,t.jsx)("input",{type:"date",className:"insert_order_date",max:"9999-12-31",value:v,onChange:n=>Se(n.target.value)})]}),(0,t.jsx)("div",{className:"check",children:(0,t.jsxs)("table",{className:"check",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"\u5E97\u8217\u540D"}),(0,t.jsx)("th",{children:"\u51E6\u7406\u72B6\u6CC1"})]})}),(0,t.jsx)("tbody",{children:Y?(0,t.jsx)("tr",{children:(0,t.jsx)("td",{colSpan:2,children:(0,t.jsx)(ce.default,{loading:Y,color:"blue"})})}):e.map((n,r)=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"PCstoreName",children:n.storeName}),(0,t.jsx)("td",{className:"PCprocess",children:n.process})]},r))})]})})]}),(0,t.jsx)("div",{className:"operation_area",children:(0,t.jsx)("a",{className:"buttonUnderline",type:"button",onClick:()=>s(!0),children:"\u767A\u6CE8\u533A\u5207"})}),(0,t.jsxs)("div",{className:"print-set-area",children:[(0,t.jsx)("div",{className:"explanation",children:"\u5370\u5237\u306E\u969B\u306F\u4F59\u767D\u3092\u30C7\u30D5\u30A9\u30EB\u30C8\u306B\u3057\u3066\u304F\u3060\u3055\u3044"}),(0,t.jsxs)("div",{className:"print-select-area",children:[(0,t.jsxs)("div",{className:"order-print",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"title-explanation",children:"\u7D0D\u54C1\u66F8\u5370\u5237"}),(0,t.jsx)(E,{className:"store-select",placeholder:"\u5E97\u8217\u9078\u629E",isSearchable:!1,value:i,onChange:n=>f(n),options:b})]}),(0,t.jsx)("a",{className:"buttonUnderline",type:"button",onClick:()=>me(),children:"\u500B\u5225\u5370\u5237"}),(0,t.jsx)("a",{className:"buttonUnderline",type:"button",onClick:fe,children:"\u5168\u672A\u5370\u5237"})]}),(0,t.jsxs)("div",{className:"order-print-vendor",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"title-explanation",children:"\u696D\u8005\u3078\u306E\u767A\u6CE8\u66F8\u5370\u5237"}),(0,t.jsx)(E,{className:"store-select",placeholder:"\u696D\u8005\u9078\u629E",isSearchable:!1,value:p,onChange:n=>S(n),options:k})]}),(0,t.jsx)("div",{children:(0,t.jsx)(E,{className:"store-select",placeholder:"\u914D\u9001\u5148\u9078\u629E",isSearchable:!1,value:y,onChange:n=>h(n),options:I})}),(0,t.jsx)("a",{className:"buttonUnderline",type:"button",onClick:ve,children:"\u696D\u8005\u767A\u6CE8\u5370\u5237"})]}),(0,t.jsxs)("div",{className:"shortage-print",children:[(0,t.jsx)("a",{className:"buttonUnderline",type:"button",onClick:()=>O("/shortagePrint"),children:"\u30CD\u30C3\u30C8\u767A\u6CE8\u5206\u5370\u5237"}),(0,t.jsx)("a",{className:"buttonUnderline",type:"button",onClick:()=>ge(),children:"\u8A73\u7D30\u5370\u5237"}),(0,t.jsx)("a",{className:"buttonUnderline",type:"button",onClick:()=>he(),children:"\u5546\u54C1\u4E00\u89A7\u5916\u5370\u5237"})]})]})]})]})]})}export{le as default};
