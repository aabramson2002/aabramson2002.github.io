(()=>{"use strict";var e,t,n,o,c,r,a,l,i=function(e,t,n,o){return void 0===o&&(o=1),"rgba(".concat(e,",").concat(t,",").concat(n,",").concat(o,")")};!function(e){e[e.gain=.5]="gain",e[e.numSamples=256]="numSamples"}(e||(e={}));var s=function(e){n.src=e},u=function(e){e?(c.frequency.setValueAtTime(1e3,t.currentTime),c.gain.setValueAtTime(25,t.currentTime)):c.gain.setValueAtTime(0,t.currentTime)},h=function(e){e?(r.frequency.setValueAtTime(1e3,t.currentTime),r.gain.setValueAtTime(15,t.currentTime)):r.gain.setValueAtTime(0,t.currentTime)},d=function(){function e(e,t,n,o){Object.assign(this,{p1:e,p2:t,p3:n,fillColor:o})}return e.prototype.update=function(){this.p1++,this.p2++,this.p3++},e.prototype.draw=function(e){e.save(),e.beginPath(),e.translate(100,0),e.rotate(Math.PI/4),e.moveTo(this.p1,this.p2),e.lineTo(this.p2,this.p3),e.lineTo(this.p3,this.p1),e.closePath(),e.fillStyle=this.fillColor,e.fill(),e.restore()},e}();const g=d;var f,p,m,v,y,w,S;!function(e){e.sound1="media/New Adventure Theme.mp3"}(S||(S={}));var b={showGradient:!0,showBars:!0,showCircles:!0,showTriangles:!1,showNoise:!1,showInvert:!1},q=function(){var i,u;i=S.sound1,t=new AudioContext,n=new Audio,s(i),o=t.createMediaElementSource(n),(a=t.createAnalyser()).fftSize=e.numSamples,(c=t.createBiquadFilter()).type="highshelf",(r=t.createBiquadFilter()).type="lowshelf",(l=t.createGain()).gain.value=e.gain,o.connect(c),c.connect(r),r.connect(a),a.connect(l),l.connect(t.destination),console.log("init called"),console.log("Testing utils.getRandomColor() import: ".concat("rgba(".concat((u=function(){return 185*Math.random()+35})(),",").concat(u(),",").concat(u(),",1)")));var h=document.querySelector("canvas");T(h),function(e,t){f=e.getContext("2d"),p=e.width,m=e.height,v=function(e,t,n,o,c,r){for(var a=e.createLinearGradient(0,0,0,c),l=0,i=[{percent:0,color:"silver"},{percent:.25,color:"cyan"},{percent:.5,color:"skyblue"},{percent:.75,color:"blue"},{percent:1,color:"green"}];l<i.length;l++){var s=i[l];a.addColorStop(s.percent,s.color)}return a}(f,0,0,0,m),y=t,w=new Uint8Array(y.fftSize/2)}(h,a),k()},T=function(e){document.querySelector("#btn-fs").onclick=function(){var t;console.log("goFullscreen() called"),(t=e).requestFullscreen?t.requestFullscreen():t.mozRequestFullscreen?t.mozRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullscreen&&t.webkitRequestFullscreen()};var o=document.querySelector("#btn-play");o.onclick=function(e){console.log("audioCtx.state before = ".concat(t.state));var o=e.target;"suspended"==t.state&&t.resume(),console.log("audioCtx.state after = ".concat(t.state)),"no"==o.dataset.playing?(n.play(),o.dataset.playing="yes"):(n.pause(),o.dataset.playing="no")};var c=document.querySelector("#slider-volume"),r=document.querySelector("#label-volume");c.oninput=function(e){var t,n=e.target;t=n.value,t=Number(t),l.gain.value=t,r.innerHTML=String(Math.round(+n.value/2*100))},c.dispatchEvent(new Event("input")),document.querySelector("#select-track").onchange=function(e){var t=e.target;s(t.value),"yes"==o.dataset.playing&&o.dispatchEvent(new MouseEvent("click"))};var a=document.querySelector("#cb-gradient"),i=document.querySelector("#cb-bars"),d=document.querySelector("#cb-circles"),g=document.querySelector("#cb-noise"),f=document.querySelector("#cb-invert"),p=document.querySelector("#cb-triangles"),m=document.querySelector("#cb-highshelf"),v=document.querySelector("#cb-lowshelf");a.checked=!0,i.checked=!0,d.checked=!0,a.onchange=function(){b.showGradient=a.checked},i.onchange=function(){b.showBars=i.checked},d.onchange=function(){b.showCircles=d.checked},g.onchange=function(){b.showNoise=g.checked},f.onchange=function(){b.showInvert=f.checked},p.onchange=function(){b.showTriangles=p.checked},m.onchange=function(){u(m.checked)},v.onchange=function(){h(v.checked)},u(m.checked),h(v.checked)},k=function(){setTimeout(k,1e3/60),function(e){if(y.getByteFrequencyData(w),f.save(),f.fillStyle="black",f.globalAlpha=.1,f.fillRect(0,0,p,m),f.restore(),e.showGradient&&(f.save(),f.fillStyle=v,f.globalAlpha=.3,f.fillRect(0,0,p,m),f.restore()),e.showBars){var t=(p-4*w.length-10)/w.length;f.save(),f.fillStyle="rgba(255,255,255,0.50)",f.strokeStyle="rgba(0,0,0,0.50)";for(var n=0;n<w.length;n++)f.fillRect(5+n*(t+4),-156+w[n],t,200),f.strokeRect(5+n*(t+4),-156+w[n],t,200);f.restore()}if(e.showCircles){var o=m/4;for(f.save(),f.globalAlpha=.5,n=0;n<w.length;n++){var c=w[n]/255,r=c*o;f.beginPath(),f.fillStyle=i(200,200,0,.34-c/3),f.arc(p/2,m/2,r,0,2*Math.PI,!1),f.fill(),f.closePath(),f.beginPath(),f.fillStyle=i(255,111,111,.1-c/10),f.arc(p/2,m/2,1.5*r,0,2*Math.PI,!1),f.fill(),f.closePath(),f.save(),f.beginPath(),f.fillStyle=i(100,50,0,.5-c/5),f.arc(p/2,m/2,.5*r,0,2*Math.PI,!1),f.fill(),f.closePath(),f.restore()}f.restore()}if(e.showTriangles){var a=[];a.push(new g(100,200,30,"yellow")),a.push(new g(50,100,0,"orange")),a.forEach((function(e){e.draw(f),e.update()}))}var l=f.getImageData(0,0,p,m),s=l.data,u=s.length;for(l.width,n=0;n<u;n+=4)if(e.showNoise&&Math.random()<.05&&(s[n]=s[n+1]=s[n+2]=0,s[n+2]=255),e.showInvert){var h=s[n],d=s[n+1],S=s[n+2];s[n]=255-h,s[n+1]=255-d,s[n+2]=255-S}f.putImageData(l,0,0)}(b)};window.onload=function(){var e,t;console.log("window.onload called"),e=document.querySelector("#select-track"),(t=new XMLHttpRequest).onload=function(t){var n=t.target;console.log("HTTP Staus Code: ".concat(n.status));var o,c=n.responseText;try{o=JSON.parse(c)}catch(e){return void console.log("JSON.parse Failed!")}document.querySelector("#title").innerHTML=o.title;for(var r="",a=0,l=o.songs;a<l.length;a++){var i=l[a];r+='<option value="'.concat(i.link,'">').concat(i.name,"</option>")}e.innerHTML=r,document.querySelector("#instructions").innerHTML=o.instructions},t.onerror=function(){},t.open("GET","data/data-av.json"),t.send(),q()}})();
//# sourceMappingURL=bundle.js.map