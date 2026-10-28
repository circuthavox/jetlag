(() => {
"use strict";
const KEY="jetlag-team-dashboard-v2";
const CITIES={
 Brisbane:{network:"Translink SEQ region",station:"Brisbane Central Station",landmarks:[
  "Australia Zoo, Beerwah","Southport Broadwater Parklands, Gold Coast","Dreamworld, Coomera","Warner Bros. Movie World, Oxenford","Gold Coast Regional Botanic Gardens, Benowa","Redcliffe Lagoon, Redcliffe","Cleveland Point, Cleveland","Caboolture Historical Village, Caboolture","Beenleigh Historical Village, Beenleigh","Bribie Island Seaside Museum, Bongaree","Ipswich Railway Workshops Museum, Ipswich"
 ]},
 Sydney:{network:"Opal region",station:"Sydney Central Station",landmarks:[
  "Wollongong Harbour","Nan Tien Temple, Berkeley","Cronulla Beach","Royal National Park Visitor Centre, Audley","Australian Botanic Garden Mount Annan","Raging Waters Sydney, Prospect","Gosford Waterfront","Woy Woy Waterfront","Glenbrook Village Centre, Blue Mountains","Springwood Town Centre, Blue Mountains","Bald Hill Lookout, Stanwell Tops","Palm Beach, Northern Beaches"
 ]},
 Melbourne:{network:"myki network",station:"Flinders Street Station",landmarks:[
  "Geelong Waterfront","Eastern Beach Reserve, Geelong","Ballarat Wildlife Park","Sovereign Hill, Ballarat","Bendigo Botanic Gardens","Werribee Open Range Zoo","Warragul Town Centre","Seymour Railway Heritage Centre","Dandenong Ranges Botanic Garden, Olinda","Frankston Waterfront","Wendouree Lake and Gardens, Ballarat","Traralgon Railway Reservoir Conservation Reserve"
 ]},
 Adelaide:{network:"Adelaide Metro region",station:"Adelaide Railway Station",landmarks:[
  "Hahndorf Main Street","Glenelg Jetty","Semaphore Beach","Port Adelaide Lighthouse","Aldinga Beach","Hallett Cove Conservation Park","Gawler Heritage Centre","Mount Barker town centre","Moana Beach","Port Willunga Beach","Sellicks Beach","Noarlunga Centre and Onkaparinga River"
 ]},
 London:{network:"Oyster region · London fare zones",station:"London Waterloo",landmarks:[
  "Epping Forest, Chingford Plain","Upminster Windmill, Upminster","Chessington World of Adventures","Hainault Forest Country Park","Ruislip Lido","Havering Country Park","Danson Park, Bexleyheath","Eltham Palace, Greenwich","Hampton Court Palace","Bushy Park, Teddington","Kenley Common, Croydon","Farthing Downs, Coulsdon"
 ]},
 Paris:{network:"Navigo region · Île-de-France zones 1–5",station:"Châtelet–Les Halles",landmarks:[
  "Provins Medieval Town, Seine-et-Marne","Château de Fontainebleau","Rambouillet Forest and Château","Auvers-sur-Oise historic village","Dourdan historic centre","Étampes historic centre","Mantes-la-Jolie riverside and old town","Meaux historic centre","Île de loisirs de Cergy-Pontoise","Coulommiers historic centre","Forêt de Fontainebleau","Forêt de Rambouillet"
 ]}
};
const MODES=[{id:"rail",name:"Rail",price:15},{id:"local",name:"Local bus / tram / metro",price:5},{id:"plane",name:"Plane",price:100},{id:"ferry",name:"Ferry",price:10},{id:"bike",name:"Bike / scooter",price:1}];
const POWERS=[{id:"double",name:"Double Down",desc:"Doubles the coin reward from your next completed challenge."},{id:"cloak",name:"Cloak",desc:"Hide your tracker from the other team for 15 minutes. Coordinate this manually in Find My."},{id:"freeze",name:"Freeze",desc:"Freeze the other team for 45 minutes. It takes 5 minutes to charge; coordinate this manually."}];
const TASKS=[
 ["Estimate a city block","Estimation","Choose a city block. Estimate the length of its perimeter without measuring, then check using a public map or by walking it. Award the card only if your estimate is within 15%.",900],
 ["Seven heads in a row","Luck","Flip a coin until you get seven heads in a row. You may keep track on paper, but no app or online coin-flip tool.",600],
 ["Find a luxury car","Scavenger hunt","Find a real car that would cost at least AUD $150,000 new. Take a photo beside it without including strangers or touching the vehicle.",900],
 ["Visit a museum","Explore","Enter a museum, spend at least 20 minutes inside, and tell your team one thing you learned from an exhibit.",1000],
 ["Try a local snack","Food","Buy and try a snack made locally or strongly associated with this city. Show the packaging or menu and explain why you chose it.",600],
 ["Draw your surroundings","Creative","Spend 10 minutes drawing the view from where you are. Paper or a notes app is allowed; show the finished drawing.",600],
 ["Make a three-stop food crawl","Food","Buy one small item at each of three different counter-service food businesses: one savoury item, one drink, and one sweet item. Keep the total reasonable.",1000],
 ["Find an unusual public sign","Scavenger hunt","Find the strangest or funniest sign you can in a public place. Take a photo and explain why you picked it.",500],
 ["Guess the population","Estimation","Write down one guess for the population of the city or local government area. Then check a reliable published source. Your guess must be within 25%.",1000],
 ["Get to a train quickly","Transit","Board a scheduled train within 10 minutes of drawing this card, if a service is available and it is safe and practical. Show the ticket or station departure board as proof.",900],
 ["Go one kilometre away","Navigation","From your current position, estimate a point about one kilometre away in a direction chosen by a teammate. Walk there without using a measuring app, then check the straight-line distance. It must be within 30%.",1000],
 ["Find local public art","Explore","Find a public artwork or sculpture. Take a team photo with it and give it a one-sentence review.",600],
 ["Order something unfamiliar","Food","At a cafe or takeaway counter, order something you have never tried before. Try it and give it a genuine review. No need to eat anything that conflicts with allergies or dietary needs.",700],
 ["Make a tiny travel advert","Creative","Film a 15-second advert convincing someone to visit your current location. Include one real reason to visit and one dramatic sales pitch.",700],
 ["Coin toss challenge","Luck","Get a coin to land heads-up five times in a row. You can retry as often as needed, but every flip must be shown.",500],
 ["Find a historic date","Explore","Find a publicly accessible historic building or monument. Guess the century it dates from before checking its plaque or a reliable source.",800],
 ["Build a paper tower","Build","Using only paper and tape or paper folds, build a freestanding tower at least 50 cm tall. It must stand unsupported for 10 seconds.",700],
 ["Shop like a local","Food","Visit a local market stall, bakery or independent counter-service shop and buy one item. Explain what made the place feel local.",700],
 ["Make a human arrow","Teamwork","Using only your team's bodies and bags, create an arrow pointing toward your next planned direction of travel. Take a photo in a safe place without blocking anyone.",500],
 ["Find five things in one colour","Scavenger hunt","Photograph five different objects of the same chosen colour in one public area. Do not move or disturb the objects.",500],
 ["Make a landmark postcard","Creative","Take a photo of a local landmark and add a short postcard message to someone who has never visited this city.",500],
 ["Walk a route from memory","Navigation","Walk to a nearby public landmark using directions agreed on before putting your phone away. No one may check maps during the walk.",800],
 ["Spot a local speciality","Explore","Find a product, food or item that is strongly associated with the region. Photograph it and explain the connection using a sign or your own knowledge.",600],
 ["Do a 100-rep workout","Physical","Complete 100 squats, calf raises or another safe bodyweight movement as a team. You may split the reps and take breaks. Stop if anyone feels pain.",600],
 ["Make a paper map","Creative","Draw a rough map of the area around you, including your current location and three nearby landmarks. Show it to the team.",600],
 ["Find a public viewpoint","Explore","Reach a publicly accessible viewpoint and take a photo showing the view. No climbing barriers or entering closed areas.",700],
 ["Ask a teammate anything","Teamwork","Record a one-minute mini-interview with a teammate about the most surprising thing that has happened during the game.",500],
 ["Find an interesting shop window","Scavenger hunt","Find a shop window with an unusual display. Take a photo from the public footpath and explain the most interesting detail.",500],
 ["Estimate a walking time","Estimation","Choose a public destination within walking distance. Guess how long the walk will take before setting off. Your estimate must be within 25%, without rushing or running.",700],
 ["Create a team slogan","Creative","Invent a slogan for your team and perform it like a dramatic sports advertisement. Record the performance.",500]
];
const CARD_VARIANTS=[
 {name:"Captain's Call",rule:"Nominate a captain to organise the attempt; the captain must still follow the task instructions."},
 {name:"Fresh Leader",rule:"Choose someone who did not lead the previous challenge to lead this attempt."},
 {name:"Sixty-Second Plan",rule:"Before starting, take 60 seconds to agree on a simple plan."},
 {name:"Ten-Second Strategy",rule:"Before starting, explain your plan in ten seconds or less."},
 {name:"Independent Judge",rule:"A teammate who is not leading must check the result against the instructions before you claim it."},
 {name:"One-Take Proof",rule:"Capture one continuous piece of proof where practical; do not include strangers without permission."},
 {name:"Two-Angle Evidence",rule:"Show the result from two different angles, without entering restricted areas or disturbing anything."},
 {name:"Close-Up and Wide Shot",rule:"Provide one close view of the result and one wider view showing context; avoid filming strangers."},
 {name:"Role Split",rule:"Assign a planner, a person doing the task, and a proof-checker; combine roles if your team is small."},
 {name:"Everyone Contributes",rule:"Every teammate must contribute a practical part of the attempt where the task allows it."},
 {name:"Team Vote",rule:"Let everyone vote on the approach before starting, then follow the winning approach."},
 {name:"Three-Step Plan",rule:"Write or say a plan with exactly three steps before you begin."},
 {name:"Written Checklist",rule:"Make a short checklist of the task's requirements and check each one before claiming the reward."},
 {name:"Three-Check Finish",rule:"Before claiming, check safety, confirm the task is complete, and make sure the proof is clear."},
 {name:"Safe-Pace Rule",rule:"Keep the whole attempt at a safe walking pace. Never run, rush traffic, or take risks for the game."},
 {name:"Public-Space Rule",rule:"Only use places open to the public and obey signs, staff instructions, and access rules."},
 {name:"Leave No Trace",rule:"Leave the area as you found it; do not move, damage, or take anything that does not belong to you."},
 {name:"No Stranger in Proof",rule:"Your evidence must focus on your team and the task, not identifiable strangers."},
 {name:"No-Edit Evidence",rule:"Use unedited photo or video evidence, with no filters or additions that could change what it proves."},
 {name:"Peer Verification",rule:"Ask a teammate who did not perform the main action to verify the result against the task instructions."},
 {name:"Clock the Attempt",rule:"Record how long the task itself takes once you are ready to begin; there is no need to rush."},
 {name:"Quick Debrief",rule:"After finishing, take 20 seconds to say what worked well and what was difficult."},
 {name:"Surprise Report",rule:"After finishing, name one surprising or unexpected detail from the attempt."},
 {name:"One-Word Verdict",rule:"After the result is checked, each teammate gives a one-word verdict on the attempt."},
 {name:"Creative Caption",rule:"Give your proof a short, original caption that describes what your team achieved."},
 {name:"Team Slogan",rule:"Add a short team slogan to your final explanation or proof caption."},
 {name:"Swap the Recorder",rule:"Choose a different teammate from your usual proof-taker to document the result."},
 {name:"Explain the Result",rule:"Before claiming, explain in one sentence exactly how the evidence proves the task is complete."},
 {name:"No-Retake Recording",rule:"If you record video proof, make one attempt at the recording; never repeat an action unsafely just for footage."},
 {name:"Spending Limit",rule:"Do not make optional purchases for this variation; if the core task requires buying something, keep it modest."},
 {name:"Phones Away When Practical",rule:"Keep phones away during the activity unless the task, navigation, accessibility, or safety requires one."},
 {name:"Finish in Order",rule:"If the task has multiple steps, complete and show them in the order given in the instructions."},
 {name:"Agreed Rules First",rule:"Read the task out loud and make sure everyone agrees what counts as success before starting."},
 {name:"Three-Detail Recap",rule:"At the end, name three details that show how your team carried out the task."}
];
const $=(s,r=document)=>r.querySelector(s), esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])), descHtml=s=>esc(s).replace(/\n/g,"<br>");
function randomIndex(length){
 if(length<=1)return 0;
 if(typeof crypto!=="undefined"&&typeof crypto.getRandomValues==="function"){
  const range=0x100000000,limit=Math.floor(range/length)*length,buf=new Uint32Array(1);let value;
  do{crypto.getRandomValues(buf);value=buf[0];}while(value>=limit);
  return value%length;
 }
 return Math.floor(Math.random()*length);
}
const rand=a=>a[randomIndex(a.length)];
function usedChallengeCount(city=state.city){const prefix=`${city}-challenge-`;return state.usedChallengeIds.filter(id=>typeof id==="string"&&id.startsWith(prefix)).length;}
function fresh(){return {city:"Brisbane",role:null,coins:100,challengesWon:0,roundsWon:0,round:1,destination:null,challenge:null,challengeOpen:false,powerUsed:[],effects:[],minutes:{},usedChallengeIds:[],doubleNext:false,vetoUntil:0,roundStarted:Date.now()};}
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.city&&CITIES[s.city]){const merged={...fresh(),...s};merged.roundsWon=Number(merged.roundsWon)||0;merged.minutes={...(s.minutes||{})};merged.usedChallengeIds=[...new Set(Array.isArray(s.usedChallengeIds)?s.usedChallengeIds.filter(id=>typeof id==="string"):[])];if("hsr" in merged.minutes||"lsr" in merged.minutes){merged.minutes.rail=(Number(merged.minutes.rail)||0)+(Number(merged.minutes.hsr)||0)+(Number(merged.minutes.lsr)||0);delete merged.minutes.hsr;delete merged.minutes.lsr;}return merged;}}catch{}return fresh();}
let state=load(),drawTimer;
// A challenge counts as drawn as soon as it is dealt, even if a round ends before it is completed.
if(state.challenge&&state.challenge.id&&!state.usedChallengeIds.includes(state.challenge.id)){state.usedChallengeIds.push(state.challenge.id);save();}
// Replace old saved destinations (including formerly over-2-hour locations) after updating the app.
if(state.role==="runner"&&!CITIES[state.city].landmarks.includes(state.destination)){state.destination=rand(CITIES[state.city].landmarks);save();}
if(Number(state.vetoUntil)>Date.now()){state.challenge=null;state.challengeOpen=false;save();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}}
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");clearTimeout(drawTimer);drawTimer=setTimeout(()=>el.classList.remove("show"),2300);}
function generateChallenges(city){const out=[];const baseCount=Math.floor(1000/TASKS.length),extraCount=1000%TASKS.length;TASKS.forEach((t,ti)=>{const count=baseCount+(ti<extraCount?1:0);for(let vi=0;vi<count;vi++){const variant=CARD_VARIANTS[vi];out.push({id:`${city}-challenge-${ti}-${vi}`,title:`${t[0]} — ${variant.name}`,category:t[1],desc:`${t[2]}\n\n${variant.rule}`,coins:t[3]});}});return out;}
function roleView(){return `<section class="welcome"><div class="eyebrow">${esc(CITIES[state.city].network)} · TEAM DASHBOARD</div><h1>WHAT'S YOUR<br><em>ROLE?</em></h1><p>Choose the role for this phone. Each team keeps its own dashboard, coin balance.</p><div class="field"><label for="citySelect">PLAYING IN</label><select id="citySelect">${Object.entries(CITIES).map(([c,v])=>`<option value="${c}" ${state.city===c?'selected':''}>${c} — ${esc(v.network)}</option>`).join("")}</select></div><div class="role-buttons"><button class="role-card runner" data-action="role" data-role="runner"><span class="role-symbol">↗</span><strong>We're the runners</strong><small>Get a destination landmark and try to reach it.</small><span class="role-cta">CHOOSE RUNNERS →</span></button><button class="role-card chaser" data-action="role" data-role="chaser"><span class="role-symbol">◎</span><strong>We're the chasers</strong><small>Use your coin economy and power-ups to hunt the runners.</small><span class="role-cta">CHOOSE CHASERS →</span></button></div></section>`;}
function activeView(){const city=CITIES[state.city];const runner=state.role==="runner";const ch=state.challenge;const locked=vetoActive()||!!ch;const drawTitle=vetoActive()?"Challenges locked during veto":ch?"Challenge already drawn":"Draw challenge";const drawHint=vetoActive()?`Available in ${vetoClock()}`:ch?"Complete or fail your saved challenge first":`${usedChallengeCount()} of 1,000 used · no repeats until the pool is exhausted`;return `<section class="dashboard"><div class="cityline"><div><span class="eyebrow">${esc(city.network)}</span><h1>YOUR TEAM<br><em>DASHBOARD</em></h1><p class="subline">${esc(state.city)} · Start: ${esc(city.station)}</p></div></div><div class="role-banner ${runner?'runner-banner':'chaser-banner'}"><span class="role-dot"></span><div><small>YOUR ROLE</small><strong>${runner?'RUNNERS':'CHASERS'}</strong></div><span class="round-pill">ROUND ${state.round}</span></div>${vetoBanner()}${runner?`<section class="destination-card"><div class="eyebrow">YOUR WIN LOCATION</div><h2>${state.destination?esc(state.destination):'Destination needed'}</h2><p>The destination pool is limited to places intended to be reachable within two hours by typical public transport from the starting station. This app does not read live timetables, so check your departure time before setting off. The next destination is assigned only when a round ends.</p></section>`:`<section class="destination-card chaser-note"><div class="eyebrow">CHASE MODE</div><h2>Track the runners.</h2><p>Your dashboard does not reveal the runners' destination. Use Apple Find My separately for AirTag tracking.</p></section>`}<div class="stats-grid"><div class="stat-card"><span>ROUNDS WON</span><strong>${state.roundsWon||0}</strong><small>Your winning rounds</small></div><div class="stat-card"><span>CHALLENGES WON</span><strong>${state.challengesWon||0}</strong><small>Successful challenges claimed</small></div><div class="stat-card"><span>COIN BALANCE</span><strong>${state.coins}</strong><small>Virtual travel currency</small></div></div><div class="main-actions"><button class="big-action primary ${locked?'action-disabled':''}" data-action="draw" ${locked?'disabled aria-disabled="true"':''}><span class="action-icon">✦</span><span><strong>${drawTitle}</strong><small>${drawHint}</small></span><span class="arrow">${locked?'⏳':'→'}</span></button><button class="big-action" data-action="open-shop"><span class="action-icon">◈</span><span><strong>Travel shop</strong><small>Buy travel minutes with coins</small></span><span class="arrow">→</span></button><button class="big-action" data-action="open-powers"><span class="action-icon">⚡</span><span><strong>Power-ups</strong><small>Free · one use each per round</small></span><span class="arrow">→</span></button></div>${ch?savedChallengeCard(ch):''}<section class="round-controls"><div class="section-heading"><div><div class="eyebrow">ROUND CONTROL</div><h2>What happened?</h2></div><span class="small-note">Choose the outcome to reset</span></div><div class="end-buttons">${runner?`<button class="end-button tagged" data-action="tagged"><strong>I got tagged</strong><small>The chasers win · start next round</small></button><button class="end-button won" data-action="won"><strong>I won</strong><small>I reached my destination · start next round</small></button>`:`<button class="end-button tagged" data-action="tagged"><strong>I tagged them</strong><small>Chasers win · start next round</small></button><button class="end-button won" data-action="won"><strong>They won</strong><small>They reached their destination · start next round</small></button>`}</div></section>${ch&&state.challengeOpen?challengeCard(ch):''}</section>`;}
function savedChallengeCard(c){return `<section class="saved-challenge"><div class="saved-challenge-head"><div><span class="eyebrow">ACTIVE CHALLENGE · SAVED</span><h2>${esc(c.title)}</h2></div><span class="saved-badge">IN PROGRESS</span></div><div class="challenge-category">${esc(c.category)}</div><p>${descHtml(c.desc)}</p><div class="saved-challenge-bottom"><strong>Reward: +${c.coins*(state.doubleNext?2:1)} coins</strong><button class="btn primary" data-action="resume-challenge">Open challenge card</button></div><small>This challenge stays here until you claim it or fail it. Closing the card has no penalty.</small></section>`;}
function challengeCard(c){return `<div class="modal-backdrop" data-action="close-modal"><section class="modal challenge-modal" role="dialog" aria-modal="true" aria-label="Challenge card" data-modal-inner><div class="card-brand"><img src="./jetlag_favicon.jpg" alt=""><span>JET LAG CHALLENGE</span><span class="card-count">${Math.min(usedChallengeCount(),1000)}/1000</span></div><div class="challenge-body"><span class="challenge-category">${esc(c.category)}</span><h2>${esc(c.title)}</h2><p>${descHtml(c.desc)}</p><div class="reward"><span>COIN REWARD</span><strong>+${c.coins*(state.doubleNext?2:1)} coins</strong></div><button class="btn primary full" data-action="claim-challenge">Claim +${c.coins*(state.doubleNext?2:1)} coins</button><button class="btn fail full" data-action="fail-challenge">I failed this challenge · 15 min veto</button><button class="text-button full" data-action="close-challenge">Close card (no penalty)</button></div></section></div>`;}
function shopModal(){return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="Travel shop" data-modal-inner><div class="modal-head"><div><div class="eyebrow">COIN ECONOMY</div><h2>Travel shop</h2><p>Spend coins to add virtual travel minutes to your team's allowance.</p></div><button class="close-button" data-action="close-modal" aria-label="Close">×</button></div><div class="balance-strip">YOUR BALANCE <strong>${state.coins} coins</strong></div>${vetoActive()?`<div class="shop-veto">VETO ACTIVE — ${vetoClock()} remaining. You cannot use paid transport or draw challenges during this period.</div>`:""}<div class="shop-list">${MODES.map(m=>`<div class="shop-row"><div><strong>${esc(m.name)}</strong><small>${m.price} coins per minute</small></div><div class="buy-controls"><input type="number" min="1" max="1000" value="5" id="qty-${m.id}" aria-label="Minutes to buy" ${vetoActive()?"disabled":""}><button class="mini-buy ${vetoActive()?"disabled":""}" data-action="buy" data-mode="${m.id}" ${vetoActive()?"disabled":""}>${vetoActive()?"Veto":"Buy"}</button></div><small class="owned">Owned: ${state.minutes[m.id]||0} min</small></div>`).join("")}</div></section></div>`;}
function powerModal(){return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="Power-ups" data-modal-inner><div class="modal-head"><div><div class="eyebrow">NO COINS REQUIRED</div><h2>Power-ups</h2><p>Each power-up can be used once per round. Uses reset when you get tagged or win.</p></div><button class="close-button" data-action="close-modal" aria-label="Close">×</button></div><div class="power-list">${POWERS.map(p=>{const used=state.powerUsed.includes(p.id);return `<article class="power-row"><div class="power-mark">${p.id==='double'?'×2':p.id==='cloak'?'◌':'Ⅱ'}</div><div class="power-copy"><strong>${p.name}</strong><p>${p.desc}</p></div><button class="mini-buy ${used?'disabled':''}" data-action="use-power" data-power="${p.id}" ${used?'disabled':''}>${used?'Used this round':'Use free'}</button></article>`}).join("")}</div></section></div>`;}
function vetoActive(){return Number(state.vetoUntil)>Date.now();}
function vetoRemaining(){return Math.max(0,Math.ceil((Number(state.vetoUntil||0)-Date.now())/1000));}
function vetoClock(){const left=vetoRemaining();if(!left)return "00:00";return `${String(Math.floor(left/60)).padStart(2,"0")}:${String(left%60).padStart(2,"0")}`;}
function vetoBanner(){return vetoActive()?`<section class="veto-banner"><span class="veto-mark">!</span><div><strong>VETO ACTIVE · <span id="vetoTimer">${vetoClock()}</span> LEFT</strong><p>No paid transport and no challenges during the veto. Wait for the countdown to end.</p></div></section>`:"";}
function render(){const root=$("#app");root.innerHTML=state.role?activeView():roleView();$("#modalRoot").innerHTML=state.modal==='shop'?shopModal():state.modal==='powers'?powerModal():'';}
function changeRole(role){state.role=role;state.modal=null;state.challenge=null;state.challengeOpen=false;if(role==='runner')state.destination=rand(CITIES[state.city].landmarks);else state.destination=null;save();render();toast(role==='runner'?'Runner role selected':'Chaser role selected');}
function endRound(reason,won=false){if(won)state.roundsWon=(Number(state.roundsWon)||0)+1;state.role=state.role==='runner'?'chaser':'runner';state.round++;state.roundStarted=Date.now();state.powerUsed=[];state.effects=[];state.doubleNext=false;state.challenge=null;state.challengeOpen=false;state.modal=null;state.destination=state.role==='runner'?rand(CITIES[state.city].landmarks):null;save();render();toast(`${reason} — new round, role swapped${won?' · round win recorded':''}`);}
function drawChallenge(){if(vetoActive()){toast(`Veto active: challenges are locked for ${vetoClock()}.`);return;}if(state.challenge){toast("You already have a saved challenge. Complete or fail it before drawing another.");return;}const prefix=`${state.city}-challenge-`;const deck=generateChallenges(state.city);let available=deck.filter(c=>!state.usedChallengeIds.includes(c.id));if(!available.length){state.usedChallengeIds=state.usedChallengeIds.filter(id=>!id.startsWith(prefix));available=deck;toast("All 1,000 cards have been used. The challenge pool has been reshuffled.");}state.challenge=rand(available);if(!state.usedChallengeIds.includes(state.challenge.id))state.usedChallengeIds.push(state.challenge.id);state.challengeOpen=false;state.modal=null;save();render();const root=$("#app");const placeholder=document.createElement('div');placeholder.className='draw-overlay';placeholder.innerHTML=`<div class="draw-card"><img src="./jetlag_favicon.jpg" alt=""><span>SHUFFLING CHALLENGES</span></div>`;root.appendChild(placeholder);requestAnimationFrame(()=>placeholder.classList.add('flipping'));setTimeout(()=>{placeholder.remove();state.challengeOpen=true;save();render();},1050);}
function claimChallenge(){if(vetoActive()){state.challenge=null;state.challengeOpen=false;save();render();toast(`Veto active: challenges are locked for ${vetoClock()}.`);return;}const c=state.challenge;if(!c)return;const gain=c.coins*(state.doubleNext?2:1);state.coins+=gain;state.challengesWon=(state.challengesWon||0)+1;state.doubleNext=false;state.challengeOpen=false;state.challenge=null;save();render();toast(`Challenge complete: +${gain} coins`);}
function failChallenge(){if(vetoActive()){state.challenge=null;state.challengeOpen=false;save();render();toast(`Veto active: challenges are locked for ${vetoClock()}.`);return;}const c=state.challenge;if(!c)return;if(!confirm("Mark this challenge as failed? This starts a 15-minute veto: no paid transport of any kind can be used."))return;state.vetoUntil=Date.now()+15*60*1000;state.challengeOpen=false;state.challenge=null;save();render();toast("Challenge failed — 15-minute paid transport veto started");}
function buy(mode){if(vetoActive()){state.modal="shop";render();return toast(`Veto active: no paid transport for ${vetoClock()}.`);}const m=MODES.find(x=>x.id===mode),input=$("#qty-"+mode),qty=Math.floor(Number(input?.value));if(!m||!Number.isFinite(qty)||qty<1||qty>1000)return toast('Enter a valid number of minutes.');const cost=qty*m.price;if(cost>state.coins)return toast('Not enough coins.');state.coins-=cost;state.minutes[mode]=(state.minutes[mode]||0)+qty;save();render();state.modal='shop';render();toast(`Bought ${qty} ${m.name} minutes`);}
function usePower(id){if(state.powerUsed.includes(id))return toast('Already used this power-up this round.');state.powerUsed.push(id);if(id==='double')state.doubleNext=true;if(id==='cloak')state.effects.push({id:'cloak',expiresAt:Date.now()+15*60000});if(id==='freeze')state.effects.push({id:'freeze',activeAt:Date.now()+5*60000,expiresAt:Date.now()+50*60000});save();render();state.modal='powers';render();toast(id==='double'?'Double Down ready for your next challenge':id==='cloak'?'Cloak activated for 15 minutes':'Freeze charging — active in 5 minutes');}
document.addEventListener('change',e=>{if(e.target.id==='citySelect'){state.city=e.target.value;state.destination=null;save();}});
document.addEventListener('click',e=>{if(e.target.closest('[data-modal-inner]')&&!e.target.closest('[data-modal-inner] [data-action]'))return;const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;if(b.closest('[data-modal-inner]')&&a==='close-modal'){state.modal=null;render();return;}switch(a){case'role':changeRole(b.dataset.role);break;case'draw':drawChallenge();break;case'resume-challenge':if(state.challenge&&!vetoActive()){state.challengeOpen=true;save();render();}break;case'claim-challenge':claimChallenge();break;case'fail-challenge':failChallenge();break;case'close-challenge':state.challengeOpen=false;state.modal=null;save();render();toast('Challenge saved on your dashboard — no penalty.');break;case'open-shop':state.modal='shop';render();break;case'open-powers':state.modal='powers';render();break;case'close-modal':if(!b.closest('[data-modal-inner]')){if(state.challenge&&state.challengeOpen)state.challengeOpen=false;state.modal=null;save();render();}break;case'buy':buy(b.dataset.mode);break;case'use-power':usePower(b.dataset.power);break;case'tagged':{const teamWon=state.role==='chaser';const message=state.role==='runner'?'You got tagged. End this round and swap roles?':'You tagged the runners. Record a round win and start the next round?';if(confirm(message))endRound(teamWon?'Chasers tagged the runners':'Runners were tagged',teamWon);break;}case'won':{const teamWon=state.role==='runner';const message=state.role==='runner'?'You reached your destination. Record a round win and start the next round?':'The runners reached their destination. End this round and swap roles?';if(confirm(message))endRound(teamWon?'Runners reached the destination':'The runners reached the destination',teamWon);break;}}}
);

render();

// Installable PWA support. The ordinary website remains fully usable in a browser.
let pendingInstallPrompt = null;
const installButton = $("#installButton");
const resetGameButton = $("#resetGameButton");
if (resetGameButton) {
  resetGameButton.addEventListener("click", () => {
    if (!confirm("Reset the entire game? This will clear the current team's progress, coins, challenges, and round history on this device.")) return;
    state = fresh();
    save();
    render();
    toast("Game reset. Start a new game when you're ready.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  pendingInstallPrompt = event;
  if (installButton) installButton.textContent = "Install app ↗";
});
if (installButton) {
  installButton.addEventListener("click", async () => {
    if (!pendingInstallPrompt) {
      toast(/iphone|ipad|ipod/i.test(navigator.userAgent)
        ? "To install on iPhone or iPad: tap Share, then Add to Home Screen."
        : "Open your browser menu and choose Install app or Add to Home Screen.");
      return;
    }
    pendingInstallPrompt.prompt();
    const choice = await pendingInstallPrompt.userChoice;
    if (choice && choice.outcome === "accepted") toast("Jet Lag: The Game is being installed.");
    pendingInstallPrompt = null;
  });
}
window.addEventListener("appinstalled", () => {
  pendingInstallPrompt = null;
  if (installButton) installButton.textContent = "App installed ✓";
  toast("Jet Lag: The Game installed successfully.");
});
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // Installation is optional; the website still works if service workers are unavailable.
    });
  }, { once: true });
}

let vetoWasActive=vetoActive();
setInterval(()=>{const active=vetoActive();const timer=$("#vetoTimer");if(timer)timer.textContent=vetoClock();const shopTimer=$(".shop-veto");if(shopTimer&&active)shopTimer.textContent=`VETO ACTIVE — ${vetoClock()} remaining. You cannot use paid transport or draw challenges during this period.`;if(vetoWasActive&&!active){state.vetoUntil=0;save();render();toast("Veto ended — challenges and paid transport are available again.");}else if(active&&state.role){const drawButton=$('[data-action="draw"]');if(drawButton){drawButton.disabled=true;drawButton.classList.add("action-disabled");const strong=$("strong",drawButton),small=$("small",drawButton);if(strong)strong.textContent="Challenges locked during veto";if(small)small.textContent=`Available in ${vetoClock()}`;}}vetoWasActive=active;},1000);
})();