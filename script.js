// Everything that hides content waits for this class, so a script failure can
// never leave the page blank.
document.documentElement.classList.add("js");

const MODS=[
["Auto Eat","Player","Automatically eats food from your hotbar when hungry."],
["Auto Fish","Player","Throws the rod, reels in fish, looks up and recasts."],
["Auto Log","Player","Disconnects when your health drops below a threshold."],
["Auto Map Part","World","When you place an item frame, it automatically fills it with a randomly chosen filled map from your hotbar - map-art made instant, same tick you place the frame (delay configurable 0-20 ticks). Silent server-side swap keeps your visible hotbar unchanged."],
["Auto Wither","World","Aim anywhere and right-click to build a full wither (Trouser-Streak port): 2 soul sand columns + 3 skulls, air place, rotation lock, optional center skull, and the spawned wither gets automatically nametagged. Range setting controls how far away you can build; every block delay configurable, 0 = instant."],
["Auto Respawn","Player","Meteor's AutoRespawn rewritten: auto-clicks respawn on the death screen, then optionally runs commands or chat lines, one per tick."],
["Auto Responder","Utility","Meteor's AutoResponder rewritten: replies to chat automatically via trigger=response pairs, with an anti-loop cooldown."],
["Auto Walk Hold","Movement","Holds a key (default 2) down, even after screens open or the window loses focus."],
["Bed Aura","Combat","Places and pops beds in the Nether and the End and charged respawn anchors in the Overworld and the End - whichever the dimension lets explode, with a fallback to the other item when the first isn't in your inventory. Rotates to a cardinal direction so the bed's head half lands on the target block, charges an anchor with 1-4 glowstone and pops it with a glowstone-free use, silent switching, min-damage / max-self-damage / anti-suicide gating, pause on eat/drink/mine and a render box. Every numeric setting runs 0-10000."],
["Block Replacer","World","Places the same block back when one of your placed blocks gets mined or removed."],
["Speed Mine","World","Port of Homovore SpeedMine: your click is cancelled and the break is driven by our own packets, with the best tool held, progress predicted from the real break delta, and the stop sent once threshold (0.7) is reached. Grim decoy sends a second block-start 2000 blocks below the world so the pair of starts does not read as one fast break; a 275 ms delay budget keeps the cadence tolerable. Double break demotes a break to a second slot, break-ahead mines the block your ray continues into when it exits cleanly, rebreak keeps re-sending the stop, pause-on-eat never swaps mid-gap. Id is mf-speed-mine because Meteor has its own SpeedMine. AGPL-3.0 port, original vendored."],
["Boat Flight","Movement","Fly while riding a boat. Horizontal and vertical speed settings; jump goes up, sneak goes down."],
["British Chat","Utility","Tidies the chat you send: a capital at the start and after every sentence, a full stop at the end, and an optional grammar-correct pass over the words people mistype mid-fight (missing apostrophes, swapped letters, chat shorthand, doubled spaces, spaces before punctuation). Grammar correct is a fixed rule list, not a language model, so unknown words pass through untouched. It rewrites the message before it is signed, so the tidied text is what the server receives - nothing is sent twice."],
["Universal Cobweb Bypass","Bypasses","No-slow in webs: the cobweb movement multiplier is replaced client-side, fully or by percent. Profiles for what the server actually checks - Vanilla (full speed), NCP and Themis (speed under a per-axis cap), Grim (a short burst out of the web, because Grim re-simulates cobwebs itself) and Custom - plus a per-axis max speed, an all-stuck-blocks switch, a web-timer that multiplies horizontal walking speed inside webs only (vertical untouched, 1.0 = off), and a lagback watcher that falls back to vanilla slow when the server pulls you back, with lagback-limit (default 2, 0 = off): once the server has pulled you back more than that many times in the same cobweb it restarts the web clock (lagback-reset-timer) and/or drops sprint for the rest of that web (lagback-stop-sprint). Sprint Tweaks: stop-sprint-before releases your sprint a set number of ticks before a web is ahead, and start-sprint-after holds sprint off inside a web until that many ticks have passed, then turns it back on. Timer: timer-mode Constant uses timer-multiplier, or Graph follows graph-formula over the seconds you have spent in the web (timer = 1 + graph-scale * value, so a value of 0 is the normal 1x timer; scale 8.605 by default turns a value of 1 into 9.6x). The default formula 1 - exp(-t / 1.5) is fast at first and then flattens without ever slowing down, any expression of t works, and max-timer (default 10, 0 = off) caps the graph speed so a steep formula cannot hand the server a huge tick jump. reset-on-new-web restarts both clocks the moment you walk out of one web into another, even a touching one, and verbose narrates what the module enabled and what it is doing - entering and leaving webs, clock resets, the timer as it ramps, and what the sprint tweaks did. Both modes only run Meteor's Timer while you actually stand in a cobweb and hand it back when you leave."],
["Auto Chat Clear","Utility","Automatically does the vanilla F3+D chat clear after every N received messages. Keeps the visible backlog empty on busy servers without manual keypresses - scrollback history stays (optional wipe), purely client-side."],
["Chat Logger","Utility","Meteor-style ChatLogger rewritten: logs incoming and outgoing chat including commands to a file, fresh log per game join, custom path format."],
["Universal Click TP","Bypasses","Meteor's ClickTP rewritten: hold use while looking at a block to teleport there in configurable steps, with max distance, safe-landing check and delay."],
["Clicker","Combat","Meteor-style Clicker rewritten: left/right auto clicker with Nothing, Hold and Click modes and per-action tick delays."],
["Death Coords","Utility","Prints (and optionally copies) your coordinates the moment you die."],
["Death Commands","Utility","Meteor-style DeathCommands rewritten: sends a random message or command when you die, with delay range and chance settings."],

["Discord RPC","Utility","Fully customizable Discord Rich Presence: editable Line 1 / Line 2 with placeholders ({player}, {server}, {ping}, {pos}, {dimension}, {cps}, {version}, {health}), big image name & text, optional small image, timer, and a built-in crystals-per-second counter. .mfhelp prints the whole placeholder tutorial in chat. Set your own Discord Application ID to change the name shown by Discord and use your own images."],
["Elytra Flight","Movement","Controlled elytra flight without fireworks, with horizontal and vertical speed. Toggleable auto-forward: off = thrust only while holding the forward key."],
["Instant TNT","Combat","Ignites TNT just by looking at it, using a silent switch to flint & steel or fire charge. Click Through Walls ignites TNT behind walls and around corners. Falls back to placing a redstone block next to the TNT when you have no igniter (mined straight back during the fuse), and last of all shoots the TNT with a Flame bow."],
["Inventory Keeper","Player","Keeps your inventory in the layout you saved: press Save layout on the module screen and it re-checks on a refresh interval, swapping anything that moved back into its slot (option to keep only the hotbar). Never drops anything."],
["Mute","Utility","Hides chat messages from muted players or containing muted phrases (client-side)."],
["Packet Filter","Client Side","Holds a packets-per-second budget and drops the least important packet first: crystal/obsidian places, crystal breaks, totem swaps, swings and inventory clicks are critical and never dropped, movement only goes once the budget is stretched a quarter past its limit, and chat / sprint state / custom payloads go first. Preset CPvP ranks a fight's packets top, Generic keeps only inventory, use and respawn critical."],
["Packet Limiter","Client Side","Meteor-style PacketLimiter rewritten: caps outgoing packets per tick (keep-alive and pong always allowed) so laggy modules can't get you kicked for flooding."],
["Packet Stealer","Utility","Records everything the server sends your client about one player into <name>.json with ISO-8601 timestamps - movement and teleports, velocity, swings and criticals, totem pops, damage with its source, equipment changes and optionally raw data-tracker updates. A client never receives another player's own packets, so this is the visible side of their traffic, not their connection. Target by name or leave empty for the nearest player, with movement logging off by default because it is the bulk of the noise."],
["Path","Utility","Draws a line from you to a target set with .mfpath. Doesn't work yet."],
["Universal Wool Replace","Bypasses","Packet-only obsidian to wool: the server is told your hand holds wool for the one interaction where you place obsidian, then told it holds obsidian again. No wool, no hotbar swap, no checks, no settings. Your local inventory is never written, so you still see an obsidian block while the server has wool - a glitch block. Creative-inventory packets only, so a survival server ignores it."],
["Universal Pearl Phase","Bypasses","Full port of BlackOut's Auto Pearl (KassuK1/BlackOut, GPL-3.0 - the original is vendored in blackout/): pearl at your own block to clip inside walls. CC bypass places a block under you before the throw (their Constantiam anti-delay trick) with its own switch mode; switch modes Normal / Silent / PickSilent / InvSwitch pull the pearl from your hotbar or inventory and put it back; pitch 85 by default, instant rotation, keep rotation and swing toggles. Restores your view and inventory, then switches itself off."],
["Placer","World","Places whitelisted blocks everywhere around you - fills nearby air with the selected blocks from your inventory, nearest first. Radius, blocks-per-tick, silent rotation."],
["Ping Spoofer","Client Side","Changes your ping with three modes: Real (no change), More (genuinely adds latency by delaying replies) or Spoof (only fakes the tab-list ping)."],
["Screenshot","Utility","Copies a screenshot of the game straight to your clipboard instead of saving a file, so it can be pasted into Discord immediately. One-shot: bind a key, press it, and the module switches itself back off. Grabbed through vanilla's own screenshot code, so it matches an F2 screenshot exactly. The clipboard write runs on its own thread and failures are reported in chat."],
["Sound Muter","Client Side","Meteor's SoundBlocker rewritten: mutes specific sounds picked from a sound list, client-side."],
["Tab Complete Privacy","Utility","Meteor-style TabCompletePrivacy rewritten: cancels tab-complete packets that would leak private commands - block all, or block by prefixes, words or symbols."],
["Tab Logger","Utility","Meteor-style TabLogger rewritten: keeps a per-server history of every tab-list player (uuid, name, ping history) in a text file."],
["Place Travel","Movement","Travel for the nether roof: holds forward and sprint, jumps the instant you land (no jump cooldown) and lays a straight line of blocks ahead of you - distance setting, and a height setting for floor or above-head."],
["Universal VClip PhaseFill","Bypasses","Vclips you straight down (or up) a few blocks, fills the blocks your body was standing in before the clip so the server sees the spot as solid, then waits for its rubberband - if none arrives within the timeout it vclips you back. One-shot: it switches itself off when the sequence ends."],
["Totem Pop Pearl Phase","Bypasses","After your own totem pops (the server USE_TOTEM_OF_UNDYING status for you), it throws one pearl after a configurable delay. If a frame or painting is inside you it aims at the clear band around it - a corner or edge of the face it hangs on, outside its 12/16-wide box - and only uses a point that is outside every decoration box and in reach, so a covered face falls back to the plain throw. Nothing inside you means BlackOut own-block aim. Rotation is a look packet, stable-cam puts your view back the same tick, pearl comes from hand or silently from the hotbar, and it repeats on every pop."],
["Self Mine Out","Bypasses","When a phase leaves you inside blocks, it mines you back out: the block your head is in and/or the block your feet are in are handed to Speed Mine, so they clear at tool speed instead of by holding left click in a wall. Head and feet are separate toggles, only blocks with collision count (torches, signs, water ignored), a 2 tick delay stops it re-asking while one is breaking, and it works the same after a pearl or vclip. Needs mf-speed-mine enabled and says so once if not."],
["Universal Jump Pearl","Bypasses","Sneak, jump, throw the pearl partway up the jump - the whole module. jump-percent (default 55) is measured against the real vanilla jump arc (peak 1.2522 blocks), so 55% means the pearl leaves your hand about 0.69 blocks up instead of on an arbitrary tick; 0 throws on takeoff. If the jump never gets that high - ceiling, slab, low gravity - it says so and spends no pearl, because a throw from the floor is not a phase. BlackOut aim (own block centre turned 180, pitch 85), rotation sent as a look packet, and stable-cam (default on) puts your view straight back in the same tick so the screen never snaps; with it off the camera stays turned at the throw. Takes a pearl from your hand or the first one in your hotbar (silently selected and switched back), sneak holds the crouch until the throw."],
["Universal Flight","Bypasses","Vanilla creative flight with adjustable speed. Force it on all the time, or toggle it with a double-jump like creative (always-fly option)."],
["Waypoint","Utility","Stores waypoints added with .mfwaypoint and renders beacon-like beams to them."],
["Whitelist Fast Use","Player","Toggles Meteor's FastUse automatically based on the item you're holding."],
["World Origin","Utility","Example module that highlights the center of the world."],
["Auto Login","Player","Sends /login <password> (both configurable) automatically after joining a server, or when chat shows a trigger word like \"register\". Supports delays, cooldowns and repeats."],
["Client-Side Night Vision","Client Side","Night vision that only exists on your client. The server never sees the effect."],
["Break Reminder","Client Side","Reminds you to take a break every so many minutes - set the interval in minutes (default 45) and it speaks up in chat and as the big title text on screen. The clock is wall-clock, not ticks, and it restarts whenever the module is switched on."],
["Client Block Entities","Client Side","Pick any block entity types (chests, signs, beacons, spawners...) and their rendering becomes client-side only - replaced by a static box or hidden entirely. The block itself still renders normally."],
["Anti Drop Lagback","Client Side","Counts rubberband corrections (server position syncs that snap you back) inside a sliding time window; passing the cap pauses every other active module for a set amount of ticks so the cause stops, then resumes them. Chat notifier included, purely client-side."],
["Toggle Tab","Client Side","Keeps the player list open by making the game think you're holding Tab."],
["Universal Colored Chat","Client Side","Replaces every & in chat with the color code sign."],
["Auto Totem","Combat","Instantly refills a totem of undying into your offhand when it's used or pops. Packet level: refills through raw inventory click packets and reacts to the pop packet the same millisecond, with packet retries and a max-packets-per-second cap."],
["Crystal Aura","Combat","Full port of BlackOut's Auto Crystal+: their enemy / friend / self damage model with min-max ratios, force pop and anti-pop, min place and explode damage, place and explode speed models (plus slow speed under a damage threshold), instant place and instant attack, six switch modes (Disabled, Simple, Gapple, Silent, InvSilent, PickSilent) with a switch penalty, only-own / inhibit / existed / set-dead gates, and extrapolated hitboxes for the damage and range checks. Dropped from the original: ID Predict, the AutoMine/PistonCrystal compatibility group and the animated render styles."],
["Silent Aura","Combat","Attacks the nearest player without rotating or swinging your visible hand. Silent aim (body or head) plus a silent weapon switch. Pause while mining or eating."],
["TNT Placer","Combat","Traps the nearest player in (crying) obsidian, buries them in TNT and ignites it, non-stop."]
];
const CMDS=[
[".mfaddtext <text>","Show text only for you. Nothing is sent to the server. Purely a command - it has no module and saves nothing between sessions."],
[".mfautoeat <threshold>|off","Configure the Auto Eat module."],
[".mfautofish on|off|status","Toggle Auto Fish."],
[".mfautolog <health%>|off","Configure Auto Log."],
[".mfcoords","Copy your coordinates and print them."],
[".mfday","Show the in-game day and time."],
[".mfdurability","Durability of the item in your main hand."],
[".mfeffects","List your active potion effects."],
[".mfenchant","Toggle a fake enchant glow on the held item (visual only)."],
[".mffps","Current client FPS."],
[".mfpacketlimit test [packets-per-tick]|check","Measures the server's packet limit: test floods it with look packets (default 20 per tick) until it kicks you and reports how many went out and how fast - it will disconnect you, that is the measurement, and it stops itself after 60 s. check prints the Packet Filter budget, preset, sent/filtered/peak per second and the last test's result, which survives the kick."],
[".mfhelp","Discord RPC tutorial: prints every {} placeholder with a live value ({player}, {server}, {ping}, {pos}, {dimension}, {cps}, {version}, {health}), example lines to paste into the module, and how the name / logo / images work."],
[".mffakeplayer add [name] | remove | clear | list | tp | health <hp>","Spawns a fake player the client treats as a real player: own tab-list entry and registered in world.getPlayers(), so auras and player-only features target it. Spawns where you look and copies your inventory."],
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
[".mfwaypoint","Add, list or clear waypoints."],
[".mfwebspeed <max> [step] [negative] [verbose] | stop","Autoconfig for Cobweb Bypass: walks you into the nearest cobweb and tries every horizontal/vertical pair from 0 to your max (step default 20), timing how fast you leave the web. A lagback marks that combo as failed; the fastest combo with none is applied as Custom. negative adds -5..-1 (off by default); verbose prints every combo with its OK / FAILED / stuck verdict as the sweep runs; stop restores your settings."],
[".mfvisualizewebbypassgraph","Opens your browser with a chart of the Cobweb Bypass timer: the multiplier over the first 20 seconds in a web, sampled from the module's own formula, with a slider and hover to scrub the curve and a warning card if the formula does not parse."],
];
const cats=["All","Combat","Movement","Player","World","Client Side","Utility","Bypasses"];
// category icons (mini Minecraft-style SVGs: nether star, sign, end crystal, enchanted book)
const ICONS={
"Main":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="3" width="10" height="10" fill="#e8dcae" stroke="#6b5b3e" stroke-width=".7"/><rect x="3" y="3" width="10" height="10" fill="#e8dcae" stroke="#6b5b3e" stroke-width=".7" transform="rotate(45 8 8)"/><circle cx="8" cy="8" r="2.1" fill="#fff9e0"/></svg>',
"Client Side":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><rect x="7.2" y="8.2" width="1.6" height="6.2" fill="#8a6a3d"/><rect x="2.5" y="2.8" width="11" height="5.6" rx=".8" fill="#c29955" stroke="#7a5c33" stroke-width=".8"/><rect x="4" y="4.2" width="8" height=".9" fill="#7a5c33"/><rect x="4" y="5.7" width="5.5" height=".9" fill="#7a5c33"/></svg>',
"Combat":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><rect x="4.2" y="4.2" width="7.6" height="7.6" fill="#c05fd8" stroke="#7c2f9e" stroke-width=".7" transform="rotate(45 8 8)"/><rect x="5.9" y="5.9" width="4.2" height="4.2" fill="#8b2fc9" transform="rotate(45 8 8)"/><circle cx="8" cy="8" r="1.2" fill="#f5d9ff"/></svg>',
"Rewrite":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.4" y="2.4" width="9.2" height="11.2" rx="1" fill="#7c3aad" stroke="#4e1f70" stroke-width=".7"/><rect x="3.4" y="2.4" width="2.3" height="11.2" rx="1" fill="#5d2b85"/><rect x="5.7" y="6.1" width="6.9" height="1.6" fill="#e9b64d"/><path d="M11.2 3.2l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4z" fill="#ffe9a8"/></svg>',
"Movement":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.2 2.4c-3.6.2-6 1.3-7.6 3-1.5 1.5-2 3.3-2.3 5.4l-1 1c-.3.3-.1.8.3.7l2-.6c1.9 0 3.6-.7 4.9-2 1.7-1.7 2.8-4.2 3.7-7.5z" fill="#e8eef7" stroke="#9aa9bd" stroke-width=".7"/><path d="M3.4 12.6L9.6 6.4" stroke="#9aa9bd" stroke-width=".7"/></svg>',
"Player":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.4c2.4 0 4 1.5 4 3.6s-1.6 3.6-4 3.6-4-1.5-4-3.6S5.6 2.4 8 2.4z" fill="#f2c94c" stroke="#9c7a1c" stroke-width=".7"/><path d="M8 3.6v4.8" stroke="#9c7a1c" stroke-width=".7"/><path d="M6.2 2.9c.6-.9 1.1-1.3 1.8-1.3s1.2.4 1.8 1.3" fill="none" stroke="#5f9e3a" stroke-width=".9"/></svg>',
"World":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><rect x="2.6" y="3" width="10.8" height="4" fill="#6dbb45" stroke="#3f7a26" stroke-width=".7"/><rect x="2.6" y="7" width="10.8" height="6" fill="#9a6b45" stroke="#66432a" stroke-width=".7"/><rect x="4" y="8.4" width="1.6" height="1.6" fill="#7d5333"/><rect x="8.2" y="9.6" width="1.6" height="1.6" fill="#7d5333"/></svg>',
"Bypasses":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><ellipse cx="8" cy="8.4" rx="4.4" ry="4.9" fill="#3fae8f" stroke="#1f6d58" stroke-width=".8"/><path d="M5.6 6.6c1.1-1.3 2.5-1.7 3.7-1.1" stroke="#c8f7e6" stroke-width=".8" fill="none"/><path d="M9 11.4c-1 .6-2.2.4-2.8-.4" stroke="#1f6d58" stroke-width=".6" fill="none"/><path d="M11.6 3.4l1.5-1.5" stroke="#9fe8d3" stroke-width=".8"/></svg>',
"Utility":'<svg class="cico" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.4" fill="#cfd8e3" stroke="#7b8798" stroke-width=".8"/><circle cx="8" cy="8" r="3.4" fill="#eef3f9"/><path d="M10.6 5.4L8.9 8.9 5.4 10.6l1.7-3.5z" fill="#d64545" stroke="#8f2c2c" stroke-width=".5"/></svg>'
};

/* ------------------------------------------------------------------ *
 * Motion
 * Springs, not fixed durations: everything the pointer drives (tab ink,
 * card tilt) can be retargeted mid-flight and keeps its velocity, so it
 * is always interruptible. `response` is seconds, `damping` 1 = no overshoot.
 * ------------------------------------------------------------------ */
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

function makeSpring({value=0,response=.35,damping=1,onUpdate}){
  let x=value,v=0,raf=0,last=0,target=value,running=false;
  const w=2*Math.PI/response;
  function frame(now){
    const dt=Math.min((now-last)/1000,.05)||1/120; last=now;
    const n=Math.max(1,Math.min(20,Math.ceil(dt/(1/240)))),h=dt/n;
    for(let i=0;i<n;i++){ const a=-w*w*(x-target)-2*damping*w*v; v+=a*h; x+=v*h; }
    if(Math.abs(x-target)<.0005&&Math.abs(v)<.006){ x=target;v=0;running=false;onUpdate(x);return }
    onUpdate(x);
    raf=requestAnimationFrame(frame);
  }
  function start(){ if(running)return; running=true; last=performance.now(); raf=requestAnimationFrame(frame) }
  return {
    // jump straight to a value (used for the first, unanimated layout)
    set(t){ target=x=t; v=0; running=false; cancelAnimationFrame(raf); onUpdate(x) },
    // spring toward a value; called again mid-flight it retargets from the live value and velocity
    to(t){ target=t; if(REDUCED){ this.set(t); return } start() },
    stop(){ running=false; cancelAnimationFrame(raf) }
  };
}

const $=s=>document.querySelector(s);

/* ---------------------------------------------------------------- *
 * Menu: progress line, hide-on-scroll-down (with hysteresis),
 * and a current-section marker so the page always answers "where am I".
 * ---------------------------------------------------------------- */
const menu=$("#menu"),bar=$(".progress");
const links=[...document.querySelectorAll(".menu .lnk")];
let lastY=scrollY,hidden=false;
function onScroll(){
  const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform=`scaleX(${max>0?y/max:0})`;
  menu.classList.toggle("solid",y>60);
  // 2px of travel before direction counts: hysteresis, so jitter can't flip it
  if(y<80||y<lastY-2)hidden=false;
  else if(y>lastY+2&&y>320)hidden=true;
  menu.classList.toggle("away",hidden);
  if(y<80)markCurrent(null);
  lastY=y;
}
addEventListener("scroll",onScroll,{passive:true});
onScroll();
function markCurrent(id){
  links.forEach(a=>{
    if(id&&a.getAttribute("href")==="#"+id)a.setAttribute("aria-current","page");
    else a.removeAttribute("aria-current");
  });
}
const spy=new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting) markCurrent(e.target.id) });
},{rootMargin:"-15% 0px -75% 0px"});
document.querySelectorAll("main > section[id]").forEach(s=>spy.observe(s));

/* ---------------------------------------------------------------- *
 * Reveal sections, and count the hero stats up once they are on screen
 * ---------------------------------------------------------------- */
const reveal=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.classList.add("in");
    reveal.unobserve(e.target);
    if(e.target.classList.contains("hero"))countUp();
  });
},{threshold:.12});
document.querySelectorAll(".reveal,.hero").forEach(el=>reveal.observe(el));

let counted=false;
function countUp(){
  if(counted)return; counted=true;
  document.querySelectorAll("[data-count]").forEach((el,i)=>{
    const n=+el.dataset.count;
    if(REDUCED){ el.textContent=n; return }
    const s=makeSpring({response:1.05,damping:1,onUpdate:v=>{el.textContent=Math.round(v)}});
    setTimeout(()=>s.to(n),i*90);
  });
}

/* ---------------------------------------------------------------- *
 * Hero title: one spring per letter, in sequence (no bounce - nothing
 * was thrown, so overshoot here would feel wrong).
 * ---------------------------------------------------------------- */
(()=>{
  const h=$("#title");if(!h)return;
  const letters=[];
  h.querySelectorAll("span").forEach(part=>{
    const t=part.textContent;part.textContent="";
    [...t].forEach(c=>{
      const i=document.createElement("i");
      i.className="ch";i.style.fontStyle="normal";i.textContent=c;
      i.setAttribute("aria-hidden","true");
      part.append(i);letters.push(i);
    });
  });
  if(REDUCED){ letters.forEach(l=>l.classList.add("on")); return }
  letters.forEach((el,i)=>{
    const s=makeSpring({value:30,damping:1,response:.6,onUpdate:v=>{el.style.transform=`translateY(${v.toFixed(2)}px)`}});
    setTimeout(()=>{ el.classList.add("on"); s.to(0) },140+i*36);
  });
})();

/* ---------------------------------------------------------------- *
 * Tabs: a single square "ink" springs between the category buttons.
 * Clicking another tab mid-flight retargets it from where it is.
 * ---------------------------------------------------------------- */
const tabsEl=$("#tabs"),grid=$("#grid"),q=$("#q"),count=$("#modcount");
const ink=document.createElement("span");ink.className="ink";ink.setAttribute("aria-hidden","true");
tabsEl.append(ink);
const inkX=makeSpring({response:.34,damping:1,onUpdate:v=>{ink.style.transform=`translateX(${v.toFixed(2)}px)`}});
const inkW=makeSpring({response:.34,damping:1,onUpdate:v=>{ink.style.width=Math.max(0,v).toFixed(2)+"px"}});
function placeInk(instant){
  const b=[...tabsEl.children].find(c=>c.classList.contains("tab")&&c.getAttribute("aria-selected")==="true");
  if(!b)return;
  if(instant){ inkX.set(b.offsetLeft); inkW.set(b.offsetWidth); return }
  inkX.to(b.offsetLeft); inkW.to(b.offsetWidth);
}
let cat="All";
cats.forEach(c=>{
  const b=document.createElement("button");
  b.className="tab";b.type="button";b.setAttribute("role","tab");
  b.innerHTML=(ICONS[c]||"")+c;
  b.onclick=()=>{ cat=c; render() };
  tabsEl.append(b);
});

/* ---------------------------------------------------------------- *
 * Module grid
 * ---------------------------------------------------------------- */
const tilt=new WeakMap();
function tiltFor(el){
  let s=tilt.get(el);
  if(!s){
    // X and Y are separate springs: one 2D spring desyncs when the two axes differ
    s={
      rx:makeSpring({response:.28,damping:1,onUpdate:v=>el.style.setProperty("--rx",v.toFixed(2)+"deg")}),
      ry:makeSpring({response:.28,damping:1,onUpdate:v=>el.style.setProperty("--ry",v.toFixed(2)+"deg")}),
      corner:makeSpring({value:45,response:.3,damping:1,onUpdate:v=>{const c=el.querySelector(".corner");if(c)c.style.transform=`rotate(${v.toFixed(1)}deg)`}})
    };
    tilt.set(el,s);
  }
  return s;
}

function render(){
  [...tabsEl.children].forEach(b=>{
    if(b.classList.contains("tab"))b.setAttribute("aria-selected",b.textContent===cat);
  });
  const term=q.value.trim().toLowerCase();
  const list=MODS.filter(m=>(cat==="All"||m[1]===cat)&&(m[0]+m[2]).toLowerCase().includes(term));
  grid.innerHTML="";
  if(!list.length){
    grid.innerHTML='<p class="empty">No modules match that search.</p>';
  }else{
    list.forEach(m=>{
      const el=document.createElement("button");
      el.className="mod";el.type="button";el.setAttribute("aria-expanded","false");
      const h=document.createElement("h3");h.textContent=m[0];
      const p=document.createElement("p");p.textContent=m[2];
      const tag=document.createElement("small");tag.innerHTML=(ICONS[m[1]]||"")+m[1];
      const corner=document.createElement("i");
      corner.className="corner";corner.setAttribute("aria-hidden","true");
      el.append(h,corner,p,tag);
      el.onclick=()=>{
        const open=el.getAttribute("aria-expanded")!=="true";
        el.setAttribute("aria-expanded",String(open));
        const s=tiltFor(el); s.corner.to(open?-135:45);
      };
      grid.append(el);
    });
  }
  if(count)count.textContent=`${list.length} / ${MODS.length} shown`;
  stagger();
  placeInk();
  if(REDUCED)return;
}

// staggered entrance (opacity only, so it never fights the spring-driven tilt)
function stagger(){
  grid.querySelectorAll(".mod").forEach((e,i)=>e.style.setProperty("--i",i));
  document.querySelectorAll(".cmds .cmd").forEach((e,i)=>e.style.setProperty("--i",i));
  document.querySelectorAll(".hudrow article").forEach((e,i)=>e.style.setProperty("--i",i));
}
q.oninput=()=>render();
render();
addEventListener("resize",()=>placeInk(true));
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>placeInk(true));

// 1:1 spotlight tracking + spring-smoothed tilt; the springs return to rest on leave
document.addEventListener("pointermove",e=>{
  const c=e.target.closest?.(".mod");
  if(!c)return;
  const r=c.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  c.style.setProperty("--mx",(x*100).toFixed(1)+"%");
  c.style.setProperty("--my",(y*100).toFixed(1)+"%");
  if(REDUCED)return;
  const s=tiltFor(c);
  s.ry.to((x-.5)*9);
  s.rx.to((.5-y)*9);
},{passive:true});
document.addEventListener("pointerout",e=>{
  const c=e.target.closest?.(".mod");
  if(!c)return;
  const s=tilt.get(c);
  if(!s)return;
  s.rx.to(0);s.ry.to(0);
});

/* ---------------------------------------------------------------- *
 * Commands: copy on click, confirm on the same frame as the copy
 * ---------------------------------------------------------------- */
const cm=$("#cmds");
CMDS.forEach(([c,d])=>{
  const b=document.createElement("button");
  b.className="cmd";b.type="button";
  const k=document.createElement("code");k.textContent=c;
  const s=document.createElement("span");s.textContent=d;
  b.append(k,s);
  b.onclick=()=>{
    navigator.clipboard?.writeText(c.split(" ")[0]);
    if(b.classList.contains("copied"))return;
    b.classList.add("copied");
    s.dataset.t=s.textContent;s.textContent="Copied";
    setTimeout(()=>{b.classList.remove("copied");s.textContent=s.dataset.t},1000);
  };
  cm.append(b);
});
stagger();

/* ---------------------------------------------------------------- *
 * Petals: the existing flourish, quieter, and off entirely under
 * reduced motion. They react to the pointer, which is the feedback.
 * ---------------------------------------------------------------- */
const cv=$("#petals"),cx=cv&&cv.getContext("2d");
let W=0,H=0,P=[];
function size(){if(!cv)return;W=cv.width=innerWidth;H=cv.height=innerHeight}
if(cv){
  size();addEventListener("resize",size);
  const mk=()=>({x:Math.random()*W,y:Math.random()*-H,s:3+Math.random()*5,v:.35+Math.random()*.7,
    w:Math.random()*6.28,r:Math.random()*6.28,c:["#ffb7d1","#ff8fb8","#ffd6e5"][Math.random()*3|0]});
  if(!REDUCED)for(let i=0;i<34;i++){const p=mk();p.y=Math.random()*H;P.push(p)}
  let px=-999,py=-999;
  addEventListener("pointermove",e=>{px=e.clientX;py=e.clientY},{passive:true});
  (function loop(){
    if(REDUCED){cx.clearRect(0,0,W,H);return}
    cx.clearRect(0,0,W,H);
    for(const p of P){
      p.y+=p.v;p.w+=.018;p.x+=Math.sin(p.w)*.7+.25;p.r+=.018;
      const dx=p.x-px,dy=p.y-py,d=Math.hypot(dx,dy);
      if(d<110&&d>0){p.x+=dx/d*(110-d)*.05;p.y+=dy/d*(110-d)*.05;p.r+=.07}
      if(p.y>H+20||p.x>W+20||p.x<-20)Object.assign(p,mk(),{y:-20});
      cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.globalAlpha=.8;
      cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.7);cx.restore();
    }
    requestAnimationFrame(loop);
  })();
}
