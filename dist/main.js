(()=>{class t{constructor(t,e,n,i){this.name=t,this.input=e,this.type=n,this.options=i}createLabel(){const t=document.createElement("label");return t.setAttribute("for",this.name),t.textContent=this.name,t}createInput(){const t=["type","id","name"],e=document.createElement(this.input);for(let n=0;n<t.length;n++)0===n?e.setAttribute(t[n],this.type):e.setAttribute(t[n],this.name);if("select"===this.input){e.removeAttribute("type");for(let t=0;t<this.options.length;t++){const n=document.createElement("option");n.setAttribute("value",this.options[t]),n.textContent=this.options[t],e.appendChild(n)}}return e}}const e=document.body;document.querySelector(".fas"),e.appendChild(function(){const e=document.createElement("form"),n=[];e.className="submit-form",[["Title","input","text"],["Date","input","date"],["Prority","select","",["High","Normal","Low"]],["Description","textarea"]].forEach((e=>{let i=new t,o=Object.keys(i);for(let t=0;t<e.length;t++)i[o[t]]=e[t];n.push(i)}));for(let t=0;t<n.length;t++)e.appendChild(n[t].createLabel()),e.appendChild(n[t].createInput());return e}())})();