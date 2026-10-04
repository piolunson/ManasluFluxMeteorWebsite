const MODS=[
["Auto Eat","Main","Automatically eats food from your hotbar when hungry."],
["Auto Fish","Main","Throws the rod, reels in fish, looks up and recasts."],
["Auto Log","Main","Disconnects when your health drops below a threshold."],
["Auto Respawn","Rewrite","Meteor's AutoRespawn rewritten: auto-clicks respawn on the death screen, then optionally runs commands or chat lines, one per tick."],
["Auto Responder","Rewrite","Meteor's AutoResponder rewritten: replies to chat automatically via trigger=response pairs, with an anti-loop cooldown."],
["Auto Walk Hold","Main","Holds a key (default 2) down, even after screens open or the window loses focus."],
["Block Replacer","Main","Places the same block back when one of your placed blocks gets mined or removed."],
["Boat Flight","Main","Fly while riding a boat. Horizontal and vertical speed settings; jump goes up, sneak goes down."],
["Chat Logger","Rewrite","Meteor-style ChatLogger rewritten: logs incoming and outgoing chat including commands to a file, fresh log per game join, custom path format."],
["Click TP","Rewrite","Meteor's ClickTP rewritten: hold use while looking at a block to teleport there in configurable steps, with max distance, safe-landing check and delay."],
["Clicker","Rewrite","Meteor-style Clicker rewritten: left/right auto clicker with Nothing, Hold and Click modes and per-action tick delays."],
["Death Coords","Main","Prints (and optionally copies) your coordinates the moment you die."],
["Death Commands","Rewrite","Meteor-style DeathCommands rewritten: sends a random message or command when you die, with delay range and chance settings."],
["Elytra Flight","Main","Controlled elytra flight without fireworks, with horizontal and vertical speed. Toggleable auto-forward: off = thrust only while holding the forward key."],
["Instant TNT","Main","Ignites TNT just by looking at it, using a silent switch to flint & steel or fire charge. Click Through Walls ignites TNT behind walls and around corners. Falls back to placing a redstone block next to the TNT when you have no igniter (mined straight back during the fuse), and last of all shoots the TNT with a Flame bow."],
["Mute","Main","Hides chat messages from muted players or containing muted phrases (client-side)."],
["Packet Limiter","Rewrite","Meteor-style PacketLimiter rewritten: caps outgoing packets per tick (keep-alive and pong always allowed) so laggy modules can't get you kicked for flooding."],
["Path","Main","Draws a line from you to a target set with .mfpath. Doesn't work yet."],
["Pearl Phase","Main","Port of BlackOut's Auto Pearl: one-shot pearl at your own block to clip inside walls. Rotates, throws, restores your view and hotbar, then toggles off. Instant rotation and keep-rotation options."],
["Placer","Main","Places whitelisted blocks everywhere around you - fills nearby air with the selected blocks from your inventory, nearest first. Radius, blocks-per-tick, silent rotation."],
["Ping Spoofer","Main","Changes your ping with three modes: Real (no change), More (genuinely adds latency by delaying replies) or Spoof (only fakes the tab-list ping)."],
["Sound Muter","Rewrite","Meteor's SoundBlocker rewritten: mutes specific sounds picked from a sound list, client-side."],
["Tab Complete Privacy","Rewrite","Meteor-style TabCompletePrivacy rewritten: cancels tab-complete packets that would leak private commands - block all, or block by prefixes, words or symbols."],
["Tab Logger","Rewrite","Meteor-style TabLogger rewritten: keeps a per-server history of every tab-list player (uuid, name, ping history) in a text file."],
["Universal Flight","Main","Vanilla creative flight with adjustable speed. Force it on all the time, or toggle it with a double-jump like creative (always-fly option)."],
["Waypoint","Main","Stores waypoints added with .mfwaypoint and renders beacon-like beams to them."],
["Whitelist Fast Use","Main","Toggles Meteor's FastUse automatically based on the item you're holding."],
["World Origin","Main","Example module that highlights the center of the world."],
["Add Text","Client Side","Local-only chat lines added with .mfaddtext, optionally kept across relogs."],
["Auto Login","Client Side","Sends /login <password> (both configurable) automatically after joining a server, or when chat shows a trigger word like \"register\". Supports delays, cooldowns and repeats."],
["Client-Side Night Vision","Client Side","Night vision that only exists on your client. The server never sees the effect."],
["Crystal Optimizer","Client Side","Renders every end crystal as a single static box instead of the full animated model - or hides them entirely. Big FPS boost with many crystals, purely client-side."],
["Toggle Tab","Client Side","Keeps the player list open by making the game think you're holding Tab."],
["Universal Colored Chat","Client Side","Replaces every & in chat with the color code sign."],
["Auto Totem","Combat","Instantly refills a totem of undying into your offhand when it's used or pops."],
["Crystal Aura","Combat","Port of Meteor's CrystalAura: simulates crystal damage for every base and pops the best one. Face place, support blocks, max self damage. Silent."],
["Silent Aura","Combat","Attacks the nearest player without rotating or swinging your visible hand. Silent aim (body or head) plus a silent weapon switch. Pause while mining or eating."],
["TNT Placer","Combat","Traps the nearest player in (crying) obsidian, buries them in TNT and ignites it, non-stop."]
];
const CMDS=[
[".mfaddtext <text>","Show text only for you. Nothing is sent to the server."],
[".mfautoeat <threshold>|off","Configure the Auto Eat module."],
[".mfautofish on|off|status","Toggle Auto Fish."],
[".mfautolog <health%>|off","Configure Auto Log."],
[".mfcoords","Copy your coordinates and print them."],
[".mfday","Show the in-game day and time."],
[".mfdurability","Durability of the item in your main hand."],
[".mfeffects","List your active potion effects."],
[".mfenchant","Toggle a fake enchant glow on the held item (visual only)."],
[".mffps","Current client FPS."],
[".mfheal","Food and health you're missing (client-side info)."],
[".mfjavascript [question]","Asks a yes/no question. YES crashes the game (real crash report), NO rains confetti for a few seconds."],
[".mfkill confirm","Kills your own player. Instant in singleplayer; on servers it sends /suicide."],
[".mfmute add|remove|list|clear [player]","Mute players, or phrases with “mfmute phrase …”."],
[".mfpath <x> <y> <z>|off","Point a beacon line at a position."],
[".mfping","Your latency to the server."],
[".mfrename <name>","Rename the item in your hand (client-side)."],
[".mfserver","Info about the server you're on."],
[".mfskin","Print your skin texture."],
[".mfsm <module> [on|off|toggle]","Situation module switcher with tab suggestions."],
[".mfstat","Level, XP progress, play time, deaths."],
[".mftrash confirm","Drop your entire inventory. Needs “confirm”."],
[".mfuuid","Show your in-game UUID."],
[".mfwaypoint","Add, list or clear waypoints."]
];
const cats=["All","Main","Client Side","Combat","Rewrite"];
// category icons (mini Minecraft-style SVGs: nether star, sign, end crystal, enchanted book)
const ICONS={
"Main":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="3" width="10" height="10" fill="#e8dcae" stroke="#6b5b3e" stroke-width=".7"/><rect x="3" y="3" width="10" height="10" fill="#e8dcae" stroke="#6b5b3e" stroke-width=".7" transform="rotate(45 8 8)"/><circle cx="8" cy="8" r="2.1" fill="#fff9e0"/></svg>',
"Client Side":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><rect x="7.2" y="8.2" width="1.6" height="6.2" fill="#8a6a3d"/><rect x="2.5" y="2.8" width="11" height="5.6" rx=".8" fill="#c29955" stroke="#7a5c33" stroke-width=".8"/><rect x="4" y="4.2" width="8" height=".9" fill="#7a5c33"/><rect x="4" y="5.7" width="5.5" height=".9" fill="#7a5c33"/></svg>',
"Combat":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><rect x="4.2" y="4.2" width="7.6" height="7.6" fill="#c05fd8" stroke="#7c2f9e" stroke-width=".7" transform="rotate(45 8 8)"/><rect x="5.9" y="5.9" width="4.2" height="4.2" fill="#8b2fc9" transform="rotate(45 8 8)"/><circle cx="8" cy="8" r="1.2" fill="#f5d9ff"/></svg>',
"Rewrite":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.4" y="2.4" width="9.2" height="11.2" rx="1" fill="#7c3aad" stroke="#4e1f70" stroke-width=".7"/><rect x="3.4" y="2.4" width="2.3" height="11.2" rx="1" fill="#5d2b85"/><rect x="5.7" y="6.1" width="6.9" height="1.6" fill="#e9b64d"/><path d="M11.2 3.2l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4z" fill="#ffe9a8"/></svg>'
};
let cat="All";
const $=s=>document.querySelector(s);
const tabs=$("#tabs"),grid=$("#grid"),q=$("#q");
cats.forEach(c=>{const b=document.createElement("button");b.className="tab";b.role="tab";b.innerHTML=(ICONS[c]||"")+c;
  b.onclick=()=>{cat=c;render()};tabs.append(b)});
function render(){
  [...tabs.children].forEach(b=>b.setAttribute("aria-selected",b.textContent===cat));
  const t=q.value.trim().toLowerCase();
  const list=MODS.filter(m=>(cat==="All"||m[1]===cat)&&(m[0]+m[2]).toLowerCase().includes(t));
  grid.innerHTML="";
  if(!list.length){grid.innerHTML='<p class="empty">No modules match that search.</p>';return}
  list.forEach(m=>{const e=document.createElement("button");e.className="mod";e.setAttribute("aria-expanded","false");
    const h=document.createElement("h3");h.textContent=m[0];
    const p=document.createElement("p");p.textContent=m[2];
    const s=document.createElement("small");s.innerHTML=(ICONS[m[1]]||"")+m[1];
    e.append(h,p,s);
    e.onclick=()=>e.setAttribute("aria-expanded",e.getAttribute("aria-expanded")==="false");
    grid.append(e)});
}
q.oninput=()=>render();render();

const cm=$("#cmds");
CMDS.forEach(([c,d])=>{const b=document.createElement("button");b.className="cmd";
  const k=document.createElement("code");k.textContent=c;const s=document.createElement("span");s.textContent=d;
  b.append(k,s);
  b.onclick=()=>{navigator.clipboard?.writeText(c.split(" ")[0]);b.classList.add("copied");
    s.dataset.t=s.textContent;s.textContent="Copied";setTimeout(()=>{b.classList.remove("copied");s.textContent=s.dataset.t},1000)};
  cm.append(b)});

// count-up stats
document.querySelectorAll("[data-count]").forEach(el=>{
  const n=+el.dataset.count;let i=0;
  const t=setInterval(()=>{el.textContent=++i;if(i>=n)clearInterval(t)},50);
});

// falling cherry petals
const cv=$("#petals"),cx=cv.getContext("2d");
let W,H,P=[];
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight}
size();addEventListener("resize",size);
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const mk=()=>({x:Math.random()*W,y:Math.random()*-H,s:4+Math.random()*7,v:.5+Math.random()*1.1,
  w:Math.random()*6.28,r:Math.random()*6.28,c:["#ffb7d1","#ff8fb8","#ffd6e5"][Math.random()*3|0]});
for(let i=0;i<(reduce?0:55);i++){const p=mk();p.y=Math.random()*H;P.push(p)}
(function loop(){
  cx.clearRect(0,0,W,H);
  for(const p of P){
    p.y+=p.v;p.w+=.02;p.x+=Math.sin(p.w)*.8+.3;p.r+=.02;
    if(p.y>H+20||p.x>W+20){Object.assign(p,mk(),{y:-20})}
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.globalAlpha=.85;
    cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.7);cx.restore();
  }
  requestAnimationFrame(loop);
})();

/* ===== extra animations ===== */
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;

// split title into animated letters
(()=>{const h=$("#title");let i=0;
  h.querySelectorAll("em,span").forEach(el=>{
    const t=el.textContent;el.textContent="";
    [...t].forEach(c=>{const s=document.createElement("i");s.className="ch";s.style.fontStyle="normal";s.style.setProperty("--i",i++);s.textContent=c;s.setAttribute("aria-hidden","true");el.append(s)});
  });
  h.querySelector("em").style.fontStyle="normal";
})();

// stagger index on cards (re-applied after every filter)
function stagger(){document.querySelectorAll(".grid .mod").forEach((e,i)=>e.style.setProperty("--i",i));
  document.querySelectorAll(".cmds .cmd").forEach((e,i)=>e.style.setProperty("--i",i));
  document.querySelectorAll(".hudrow article").forEach((e,i)=>e.style.setProperty("--i",i))}
const _render=render;render=function(){_render();stagger()};
render();

// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".panel").forEach(p=>io.observe(p));
document.querySelectorAll(".log li").forEach((l,i)=>l.style.setProperty("--i",i));

// scroll progress, nav hide/solid, bg parallax
const bar=$(".progress"),nav=$(".nav"),bg=$(".bg");
let lastY=0,mx=0,my=0;
function onScroll(){
  const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform=`scaleX(${max>0?y/max:0})`;
  nav.classList.toggle("solid",y>40);
  nav.classList.toggle("hide",y>lastY&&y>300);
  lastY=y;paintBg();
}
function paintBg(){if(still)return;bg.style.transform=`translate3d(${mx*-18}px,${mx*0+my*-12-scrollY*.06}px,0) scale(1.04)`}
addEventListener("scroll",onScroll,{passive:true});onScroll();

// cursor glow, bg parallax, card tilt + spotlight
const glow=$(".glow");let pmx=-999,pmy=-999;
addEventListener("pointermove",e=>{
  pmx=e.clientX;pmy=e.clientY;
  glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
  mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;paintBg();
  const c=e.target.closest?.(".mod,.hudrow article");
  if(c&&!still){const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    c.style.setProperty("--ry",(x-.5)*12+"deg");c.style.setProperty("--rx",(.5-y)*12+"deg");
    c.style.setProperty("--mx",x*100+"%");c.style.setProperty("--my",y*100+"%")}
});
document.addEventListener("pointerout",e=>{const c=e.target.closest?.(".mod,.hudrow article");
  if(c){c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")}});

// button ripple
document.addEventListener("click",e=>{const b=e.target.closest(".btn");if(!b||still)return;
  const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,d=document.createElement("span");
  d.className="rip";d.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
  b.append(d);setTimeout(()=>d.remove(),650)});

// petals scatter away from the cursor
(function scatter(){
  for(const p of P){const dx=p.x-pmx,dy=p.y-pmy,d=Math.hypot(dx,dy);
    if(d<140&&d>0){p.x+=dx/d*(140-d)*.06;p.y+=dy/d*(140-d)*.06;p.r+=.08}}
  requestAnimationFrame(scatter);
})();
// occasional gust
if(!still)setInterval(()=>{const g=(Math.random()<.5?-1:1)*(2+Math.random()*3);P.forEach(p=>p.x+=g*p.v*3)},7000);
