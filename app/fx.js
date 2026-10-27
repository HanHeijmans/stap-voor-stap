// Confetti: a small burst when a round is finished, a big shower when the daily goal is reached.
let CFT=0;
function confetti(big){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||(!big&&Date.now()-CFT<4e3))return;
  if(big)CFT=Date.now();
  const cv=document.createElement('canvas'),x=cv.getContext('2d'),w=innerWidth,h=innerHeight,r=devicePixelRatio||1,end=Date.now()+(big?4200:1900);
  cv.className='cf';cv.width=w*r;cv.height=h*r;x.scale(r,r);document.body.appendChild(cv);
  const cols=['#1f3a93','#5b78c9','#c8580f','#f2a65a','#1d7a52','#9fb4e8'],rnd=(a,b)=>a+Math.random()*(b-a);
  const ps=Array.from({length:big?260:80},(_,i)=>{const side=big?i%3:1,x0=side==0?0:side==2?w:w/2,ang=side==0?rnd(-1.35,-.6):side==2?rnd(-2.55,-1.8):rnd(-2.2,-.95),sp=big?rnd(9,19):rnd(7,13);
    return {x:x0,y:big&&i%5==0?-10:h+5,vx:Math.cos(ang)*sp,vy:big&&i%5==0?rnd(1,3):Math.sin(ang)*sp*(h>700?1.1:.9),s:rnd(5,10),a:rnd(0,6),va:rnd(-.3,.3),c:cols[i%cols.length]}});
  if(big)ps.forEach((p,i)=>{if(i%5==0){p.x=rnd(0,w);p.vx=rnd(-1,1)}});
  (function f(){
    x.clearRect(0,0,w,h);
    ps.forEach(p=>{p.vy+=.28;p.vx*=.985;p.vy*=.985;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore()});
    Date.now()<end?requestAnimationFrame(f):cv.remove();
  })();
}
