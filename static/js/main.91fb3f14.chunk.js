(this["webpackJsonpfull-throttle-poc"]=this["webpackJsonpfull-throttle-poc"]||[]).push([[0],{60:function(e,t,a){e.exports=a(71)},65:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(7),c=a.n(r),i=(a(65),a(40)),o=a.n(i),m=a(18),u=a(46),s=a(19),p=a(105),d=a(108),f=a(114),g=a(118),h=a(115),b=a(109),y=a(113),v=a(111),E=a(112),O=a(3),j=a(116),w=a(110),x=Object(p.a)((function(e){return{margin:{margin:e.spacing(1)},textField:{flexBasis:200}}}));function S(e){var t=x(),a={amount:"$",month:"M",interest:"\u211b",monthly_payment:"$",payments:" "};Object.freeze(a);var n={amount:"Range: 500-5000",month:"Range: 6-24"};return Object.freeze(n),l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:Object(O.a)(t.width)},l.a.createElement(j.a,{id:"filled-adornment-".concat(e.type),type:"number",className:Object(O.a)(t.margin,t.textField),variant:"filled",label:e.label,value:e.value,onChange:function(t){e.getValue(""===t.target.value?"":Number(t.target.value))},disabled:e.disabled,helperText:e.isValid?l.a.createElement("div",null):n[e.type],InputProps:{startAdornment:l.a.createElement(w.a,{position:"start"},a[e.type])}})))}var k=a(119),N=Object(p.a)((function(e){return{margin:{margin:e.spacing(1)},slider:{flexBasis:200}}}));function V(e){var t=N();return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:Object(O.a)(t.width)},l.a.createElement(k.a,{className:Object(O.a)(t.margin,t.slider),value:"number"===typeof e.value?e.value:0,onChange:function(t,a){e.getValue(a)},"aria-labelledby":"input-slider",min:e.min,max:e.max})))}var C=Object(p.a)((function(e){return{paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary,display:"flex"},margin:{margin:e.spacing(1)},list:{width:250},width:{width:"fit-content",paddingRight:"30px"}}}));var I=function(){var e=C(),t=l.a.useState(0),a=Object(s.a)(t,2),n=a[0],r=a[1],c=l.a.useState(0),i=Object(s.a)(c,2),p=i[0],O=i[1],j=l.a.useState(0),w=Object(s.a)(j,2),x=w[0],k=w[1],N=l.a.useState(0),I=Object(s.a)(N,2),A=I[0],F=I[1],J=l.a.useState(0),P=Object(s.a)(J,2),R=P[0],T=P[1],B=l.a.useState(!0),M=Object(s.a)(B,2),$=M[0],z=M[1],H=l.a.useState({left:!1}),W=Object(s.a)(H,2),_=W[0],D=W[1],K=l.a.useState(localStorage.length),q=Object(s.a)(K,2),G=q[0],L=q[1],Q=l.a.useCallback(function(e,t){var a;return function(){for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];var c=this;a&&clearTimeout(a),a=setTimeout((function(){a=null,e.apply(c,l)}),t)}}(ee,400),[]),U=G,X=function(e){F(e),Z(e,R)&&Q(e,R),re("amount",e)},Y=function(e){T(e),re("month",e),Z(A,e)&&Q(A,e)},Z=function(e,t){return e>=500&&e<=5e3&&t>=6&&t<=24};function ee(e,t){return te.apply(this,arguments)}function te(){return(te=Object(u.a)(o.a.mark((function e(t,a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://ftl-frontend-test.herokuapp.com/interest?amount=".concat(t,"&numMonths=").concat(a));case 2:e.sent.json().then((function(e){localStorage.setItem("".concat(U),JSON.stringify({amount:t,months:a})),r(e.interestRate),k(e.monthlyPayment.amount),O(e.numPayments),L(++U)}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ae,ne=function(e,t){return function(a){("keydown"!==a.type||"Tab"!==a.key&&"Shift"!==a.key)&&D(Object(m.a)({},e,t))}},le=function(e){var t=JSON.parse(localStorage.getItem(e.currentTarget.getAttribute("value"))),a=t.amount,n=t.months;z(!0),F(a),T(n),ee(a,n)},re=function(e,t){switch(e){case"amount":z(t>=500&&t<=5e3);break;case"month":z(t>=6&&t<=24)}};return l.a.createElement(l.a.Fragment,null,l.a.createElement(f.a,{container:!0,spacing:3,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"100vh"}},l.a.createElement(h.a,{onClick:ne("left",!0)},"Open History"),l.a.createElement(g.a,{open:_.left,onClose:ne("left",!1)},(ae="left",l.a.createElement("div",{className:e.list,onClick:ne(ae,!1),onKeyDown:ne(ae,!1)},l.a.createElement(b.a,null,Object.keys(localStorage).sort((function(e,t){return t-e})).map((function(e,t){var a=JSON.parse(localStorage.getItem(e)),n=a.amount,r=a.months;return l.a.createElement("div",{key:t},l.a.createElement(v.a,{button:!0,value:e,onClick:le},l.a.createElement(E.a,{primary:e}),l.a.createElement(E.a,{primary:n}),l.a.createElement(E.a,{primary:r})),l.a.createElement(y.a,null))})))))),l.a.createElement(f.a,{item:!0,xs:6},l.a.createElement(d.a,{className:e.paper},l.a.createElement("div",{className:e.width},l.a.createElement(S,{getValue:X,value:A,type:"amount",disabled:!1,label:"Amount",isValid:$}),l.a.createElement(V,{getValue:X,value:A,max:5e3,min:500})),l.a.createElement("div",null,l.a.createElement(S,{getValue:Y,value:R,type:"month",disabled:!1,label:"Months",isValid:$}),l.a.createElement(V,{getValue:Y,value:R,max:24,min:6})))),l.a.createElement(f.a,{item:!0,xs:6},l.a.createElement(d.a,{className:e.paper},l.a.createElement(S,{type:"interest",label:"Interest Rate",value:n,disabled:!0}),l.a.createElement(S,{type:"monthly_payment",label:"Monthly Payment",value:x,disabled:!0}),l.a.createElement(S,{type:"payments",label:"Number of Payments",value:p,disabled:!0})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[60,1,2]]]);
//# sourceMappingURL=main.91fb3f14.chunk.js.map