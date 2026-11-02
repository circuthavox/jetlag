(() => {
"use strict";
const KEY="jetlag-team-dashboard-v2";
const CITIES={
 Brisbane:{network:"Translink SEQ region",station:"Brisbane Central Station",landmarks:[
  "Australia Zoo, Beerwah","Southport Broadwater Parklands, Gold Coast","Dreamworld, Coomera","Warner Bros. Movie World, Oxenford","Gold Coast Regional Botanic Gardens, Benowa","Redcliffe Lagoon, Redcliffe","Cleveland Point, Cleveland","Caboolture Historical Village, Caboolture","Beenleigh Historical Village, Beenleigh","Bribie Island Seaside Museum, Bongaree","Ipswich Railway Workshops Museum, Ipswich",
  "Lone Pine Koala Sanctuary, Fig Tree Pocket",
  "Mount Coot-tha Lookout, Toowong",
  "Queensland Museum Kurilpa, South Brisbane",
  "Gallery of Modern Art, South Brisbane",
  "South Bank Parklands, South Brisbane",
  "Roma Street Parkland, Brisbane",
  "New Farm Park, New Farm",
  "Eat Street Northshore, Hamilton",
  "Shorncliffe Pier, Shorncliffe",
  "Sandgate Foreshore, Sandgate",
  "Sir Thomas Brisbane Planetarium, Mount Coot-tha",
  "Manly Harbour Village, Manly",
  "Wynnum Wading Pool, Wynnum",
  "Nudgee Beach Reserve, Nudgee",
  "Fort Lytton National Park, Lytton",
  "Ormiston House, Ormiston",
  "Old Cleveland Lighthouse, Cleveland",
  "Tamborine Mountain Skywalk, Mount Tamborine",
  "North Stradbroke Island Museum, Dunwich",
  "Queensland Air Museum, Caloundra"
 ]},
 Sydney:{network:"Opal region",station:"Sydney Central Station",landmarks:[
  "Wollongong Harbour","Nan Tien Temple, Berkeley","Cronulla Beach","Royal National Park Visitor Centre, Audley","Australian Botanic Garden Mount Annan","Sydney Action Park, Prospect","Gosford Waterfront","Woy Woy Waterfront","Glenbrook Village Centre, Blue Mountains","Springwood Town Centre, Blue Mountains","Bald Hill Lookout, Stanwell Tops","Palm Beach, Northern Beaches",
  "Sydney Opera House, Circular Quay",
  "Taronga Zoo, Mosman",
  "Bondi Beach, Bondi",
  "Manly Beach, Manly",
  "Luna Park, Milsons Point",
  "Barangaroo Reserve, Barangaroo",
  "Darling Harbour, Sydney",
  "Australian National Maritime Museum, Darling Harbour",
  "Powerhouse Museum, Ultimo",
  "Sydney Olympic Park, Homebush",
  "Parramatta Park, Parramatta",
  "Elizabeth Farm, Rosehill",
  "Blue Mountains Botanic Garden, Mount Tomah",
  "Three Sisters Lookout, Katoomba",
  "Wentworth Falls Lookout, Wentworth Falls",
  "Kiama Blowhole, Kiama",
  "Berry Historic Village, Berry",
  "Newcastle Ocean Baths, Newcastle",
  "Australian Reptile Park, Somersby",
  "Featherdale Sydney Wildlife Park, Doonside"
 ]},
 Melbourne:{network:"myki network",station:"Flinders Street Station",landmarks:[
  "Geelong Waterfront","Eastern Beach Reserve, Geelong","Ballarat Wildlife Park","Sovereign Hill, Ballarat","Bendigo Botanic Gardens","Werribee Open Range Zoo","Warragul Town Centre","Seymour Railway Heritage Centre","Dandenong Ranges Botanic Garden, Olinda","Frankston Waterfront","Wendouree Lake and Gardens, Ballarat","Traralgon Railway Reservoir Conservation Reserve",
  "Royal Botanic Gardens Victoria, Melbourne",
  "Melbourne Museum, Carlton",
  "Melbourne Zoo, Parkville",
  "Scienceworks, Spotswood",
  "St Kilda Pier, St Kilda",
  "Brighton Beach Bathing Boxes, Brighton",
  "Williamstown Beach, Williamstown",
  "Werribee Mansion, Werribee",
  "Puffing Billy Railway, Belgrave",
  "Healesville Sanctuary, Healesville",
  "Yarra Valley Chocolaterie, Yarra Glen",
  "Lake Mountain Alpine Resort, Marysville",
  "Phillip Island Penguin Parade, Summerlands",
  "Cape Woolamai, Phillip Island",
  "Point Nepean National Park, Portsea",
  "Mornington Pier, Mornington",
  "Castlemaine Historic Town Centre, Castlemaine",
  "Bendigo Tramways, Bendigo",
  "Ararat Regional Art Gallery, Ararat",
  "Lake Daylesford, Daylesford"
 ]},
 Adelaide:{network:"Adelaide Metro region",station:"Adelaide Railway Station",landmarks:[
  "Hahndorf Main Street","Glenelg Jetty","Semaphore Beach","Port Adelaide Lighthouse","Aldinga Beach","Hallett Cove Conservation Park","Gawler Heritage Centre","Mount Barker town centre","Moana Beach","Port Willunga Beach","Sellicks Beach","Noarlunga Centre and Onkaparinga River",
  "Adelaide Botanic Garden, Adelaide",
  "Adelaide Zoo, Adelaide",
  "South Australian Museum, Adelaide",
  "Art Gallery of South Australia, Adelaide",
  "Adelaide Central Market, Adelaide",
  "National Railway Museum, Port Adelaide",
  "South Australian Maritime Museum, Port Adelaide",
  "Carrick Hill, Springfield",
  "Cleland Wildlife Park, Crafers",
  "Mount Lofty Summit, Crafers",
  "Belair National Park, Belair",
  "Morialta Conservation Park, Woodforde",
  "Thorndon Park Reserve, Paradise",
  "Grange Beach, Grange",
  "Henley Beach Jetty, Henley Beach",
  "West Beach Parks, West Beach",
  "Brighton Jetty, Brighton",
  "Victor Harbor Granite Island, Victor Harbor",
  "Monarto Safari Park, Monarto",
  "Barossa Valley Chocolate Company, Tanunda",
  "Adelaide Hills Farmers Market, Mount Barker"
 ]},
 London:{network:"Oyster region · London fare zones",station:"London Waterloo",landmarks:[
  "Epping Forest, Chingford Plain","Upminster Windmill, Upminster","Chessington World of Adventures","Hainault Forest Country Park","Ruislip Lido","Havering Country Park","Danson Park, Bexleyheath","Eltham Palace, Greenwich","Hampton Court Palace","Bushy Park, Teddington","Kenley Common, Croydon","Farthing Downs, Coulsdon",
  "Tower of London, Tower Hill",
  "British Museum, Bloomsbury",
  "Natural History Museum, South Kensington",
  "Science Museum, South Kensington",
  "Victoria and Albert Museum, South Kensington",
  "Houses of Parliament, Westminster",
  "Buckingham Palace, Westminster",
  "Hyde Park, Westminster",
  "Kew Gardens, Richmond",
  "Greenwich Royal Observatory, Greenwich",
  "Cutty Sark, Greenwich",
  "Wembley Stadium, Wembley",
  "Alexandra Palace, Wood Green",
  "Hampstead Heath, Hampstead",
  "Regent's Park, Marylebone",
  "Richmond Park, Richmond",
  "Crystal Palace Park, Crystal Palace",
  "Battersea Park, Battersea",
  "Imperial War Museum, Lambeth",
  "Royal Air Force Museum, Colindale",
  "Museum of London Docklands, Canary Wharf"
 ]},
 Paris:{network:"Navigo region · Île-de-France zones 1–5",station:"Châtelet–Les Halles",landmarks:[
  "Provins Medieval Town, Seine-et-Marne","Château de Fontainebleau","Rambouillet Forest and Château","Auvers-sur-Oise historic village","Dourdan historic centre","Étampes historic centre","Mantes-la-Jolie riverside and old town","Meaux historic centre","Île de loisirs de Cergy-Pontoise","Coulommiers historic centre","Forêt de Fontainebleau","Forêt de Rambouillet",
  "Eiffel Tower, Paris",
  "Louvre Museum, Paris",
  "Notre-Dame Cathedral, Paris",
  "Arc de Triomphe, Paris",
  "Sacré-Cœur Basilica, Montmartre",
  "Palace of Versailles, Versailles",
  "Disneyland Paris, Marne-la-Vallée",
  "Parc Astérix, Plailly",
  "Musée d'Orsay, Paris",
  "Jardin du Luxembourg, Paris",
  "Jardin des Tuileries, Paris",
  "Panthéon, Paris",
  "Château de Vincennes, Vincennes",
  "Bois de Boulogne, Paris",
  "Bois de Vincennes, Paris",
  "Grande Arche de la Défense, La Défense",
  "Stade de France, Saint-Denis",
  "Basilica of Saint-Denis, Saint-Denis",
  "Château de Malmaison, Rueil-Malmaison",
  "Parc de Sceaux, Sceaux",
  "Château de Saint-Germain-en-Laye, Saint-Germain-en-Laye"
 ]}
};
const MODES=[{id:"rail",name:"Rail",price:15},{id:"local",name:"Local bus / tram / metro",price:5},{id:"plane",name:"Plane",price:100},{id:"ferry",name:"Ferry",price:10},{id:"bike",name:"Bike / scooter",price:1}];
const POWERS=[{id:"double",name:"Double Down",desc:"Doubles the coin reward from your next completed challenge."},{id:"cloak",name:"Cloak",desc:"Hide your tracker from the other team for 15 minutes. Coordinate this manually in Find My."},{id:"freeze",name:"Freeze",desc:"Freeze the other team for 45 minutes. It takes 5 minutes to charge; coordinate this manually."}];
const TASKS=window.JETLAG_CHALLENGES;


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
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.city&&CITIES[s.city]){const merged={...fresh(),...s};merged.roundsWon=Number(merged.roundsWon)||0;merged.minutes={...(s.minutes||{})};merged.usedChallengeIds=[...new Set(Array.isArray(s.usedChallengeIds)?s.usedChallengeIds.filter(id=>{if(typeof id!=="string")return false;const match=/-challenge-(\d+)$/.exec(id);return !!match&&Number(match[1])<TASKS.length;}):[])];if("hsr" in merged.minutes||"lsr" in merged.minutes){merged.minutes.rail=(Number(merged.minutes.rail)||0)+(Number(merged.minutes.hsr)||0)+(Number(merged.minutes.lsr)||0);delete merged.minutes.hsr;delete merged.minutes.lsr;}return merged;}}catch{}return fresh();}
let state=load(),drawTimer;
// A challenge counts as drawn as soon as it is dealt, even if a round ends before it is completed.
if(state.challenge&&state.challenge.id&&!state.usedChallengeIds.includes(state.challenge.id)){state.usedChallengeIds.push(state.challenge.id);save();}
// Replace old saved destinations (including formerly over-2-hour locations) after updating the app.
if(state.role==="runner"&&!CITIES[state.city].landmarks.includes(state.destination)){state.destination=rand(CITIES[state.city].landmarks);save();}
if(Number(state.vetoUntil)>Date.now()){state.challenge=null;state.challengeOpen=false;save();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}}
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");clearTimeout(drawTimer);drawTimer=setTimeout(()=>el.classList.remove("show"),2300);}
function getChallenges(city){return TASKS.map((card,index)=>({id:`${city}-challenge-${index}`,title:card[0],category:card[1],desc:card[2],coins:card[3]}));}
function roleView(){return `<section class="welcome"><div class="eyebrow">${esc(CITIES[state.city].network)} · TEAM DASHBOARD</div><h1>WHAT'S YOUR<br><em>ROLE?</em></h1><p>Choose the role for this phone. Each team keeps its own dashboard, coin balance.</p><div class="field"><label for="citySelect">PLAYING IN</label><select id="citySelect">${Object.entries(CITIES).map(([c,v])=>`<option value="${c}" ${state.city===c?'selected':''}>${c} — ${esc(v.network)}</option>`).join("")}</select></div><div class="role-buttons"><button class="role-card runner" data-action="role" data-role="runner"><span class="role-symbol">↗</span><strong>We're the runners</strong><small>Get a destination landmark and try to reach it.</small><span class="role-cta">CHOOSE RUNNERS →</span></button><button class="role-card chaser" data-action="role" data-role="chaser"><span class="role-symbol">◎</span><strong>We're the chasers</strong><small>Use your coin economy and power-ups to hunt the runners.</small><span class="role-cta">CHOOSE CHASERS →</span></button></div></section>`;}
function activeView(){const city=CITIES[state.city];const runner=state.role==="runner";const ch=state.challenge;const locked=vetoActive()||!!ch;const drawTitle=vetoActive()?"Challenges locked during veto":ch?"Challenge already drawn":"Draw challenge";const drawHint=vetoActive()?`Available in ${vetoClock()}`:ch?"Complete or fail your saved challenge first":`${usedChallengeCount()} of ${TASKS.length} used · no repeats until every challenge has been used`;return `<section class="dashboard"><div class="cityline"><div><span class="eyebrow">${esc(city.network)}</span><h1>YOUR TEAM<br><em>DASHBOARD</em></h1><p class="subline">${esc(state.city)} · Start: ${esc(city.station)}</p></div></div><div class="role-banner ${runner?'runner-banner':'chaser-banner'}"><span class="role-dot"></span><div><small>YOUR ROLE</small><strong>${runner?'RUNNERS':'CHASERS'}</strong></div><span class="round-pill">ROUND ${state.round}</span></div>${vetoBanner()}${runner?`<section class="destination-card"><div class="eyebrow">YOUR WIN LOCATION</div><h2>${state.destination?esc(state.destination):'Destination needed'}</h2><p>The destination pool is limited to places intended to be reachable within two hours by typical public transport from the starting station. This app does not read live timetables, so check your departure time before setting off. The next destination is assigned only when a round ends.</p></section>`:`<section class="destination-card chaser-note"><div class="eyebrow">CHASE MODE</div><h2>Track the runners.</h2><p>Your dashboard does not reveal the runners' destination. Use Apple Find My separately for AirTag tracking.</p></section>`}<div class="stats-grid"><div class="stat-card"><span>ROUNDS WON</span><strong>${state.roundsWon||0}</strong><small>Your winning rounds</small></div><div class="stat-card"><span>CHALLENGES WON</span><strong>${state.challengesWon||0}</strong><small>Successful challenges claimed</small></div><div class="stat-card"><span>COIN BALANCE</span><strong>${state.coins}</strong><small>Virtual travel currency</small></div></div><div class="main-actions"><button class="big-action primary ${locked?'action-disabled':''}" data-action="draw" ${locked?'disabled aria-disabled="true"':''}><span class="action-icon">✦</span><span><strong>${drawTitle}</strong><small>${drawHint}</small></span><span class="arrow">${locked?'⏳':'→'}</span></button><button class="big-action" data-action="open-shop"><span class="action-icon">◈</span><span><strong>Travel shop</strong><small>Buy travel minutes with coins</small></span><span class="arrow">→</span></button><button class="big-action" data-action="open-powers"><span class="action-icon">⚡</span><span><strong>Power-ups</strong><small>Free · one use each per round</small></span><span class="arrow">→</span></button></div>${ch?savedChallengeCard(ch):''}<section class="round-controls"><div class="section-heading"><div><div class="eyebrow">ROUND CONTROL</div><h2>What happened?</h2></div><span class="small-note">Choose the outcome to reset</span></div><div class="end-buttons">${runner?`<button class="end-button tagged" data-action="tagged"><strong>I got tagged</strong><small>The chasers win · start next round</small></button><button class="end-button won" data-action="won"><strong>I won</strong><small>I reached my destination · start next round</small></button>`:`<button class="end-button tagged" data-action="tagged"><strong>I tagged them</strong><small>Chasers win · start next round</small></button><button class="end-button won" data-action="won"><strong>They won</strong><small>They reached their destination · start next round</small></button>`}</div></section>${ch&&state.challengeOpen?challengeCard(ch):''}</section>`;}
function savedChallengeCard(c){return `<section class="saved-challenge"><div class="saved-challenge-head"><div><span class="eyebrow">ACTIVE CHALLENGE · SAVED</span><h2>${esc(c.title)}</h2></div><span class="saved-badge">IN PROGRESS</span></div><div class="challenge-category">${esc(c.category)}</div><p>${descHtml(c.desc)}</p><div class="saved-challenge-bottom"><strong>Reward: +${c.coins*(state.doubleNext?2:1)} coins</strong><button class="btn primary" data-action="resume-challenge">Open challenge card</button></div><small>This challenge stays here until you claim it or fail it. Closing the card has no penalty.</small></section>`;}
function challengeCard(c){return `<div class="modal-backdrop" data-action="close-modal"><section class="modal challenge-modal" role="dialog" aria-modal="true" aria-label="Challenge card" data-modal-inner><div class="card-brand"><img src="./jetlag_favicon.jpg" alt=""><span>JET LAG CHALLENGE</span><span class="card-count">${Math.min(usedChallengeCount(),TASKS.length)}/${TASKS.length}</span></div><div class="challenge-body"><span class="challenge-category">${esc(c.category)}</span><h2>${esc(c.title)}</h2><p>${descHtml(c.desc)}</p><div class="reward"><span>COIN REWARD</span><strong>+${c.coins*(state.doubleNext?2:1)} coins</strong></div><button class="btn primary full" data-action="claim-challenge">Claim +${c.coins*(state.doubleNext?2:1)} coins</button><button class="btn fail full" data-action="fail-challenge">I failed this challenge · 15 min veto</button><button class="text-button full" data-action="close-challenge">Close card (no penalty)</button></div></section></div>`;}
function shopModal(){return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="Travel shop" data-modal-inner><div class="modal-head"><div><div class="eyebrow">COIN ECONOMY</div><h2>Travel shop</h2><p>Spend coins to add virtual travel minutes to your team's allowance.</p></div><button class="close-button" data-action="close-modal" aria-label="Close">×</button></div><div class="balance-strip">YOUR BALANCE <strong>${state.coins} coins</strong></div>${vetoActive()?`<div class="shop-veto">VETO ACTIVE — ${vetoClock()} remaining. You cannot use paid transport or draw challenges during this period.</div>`:""}<div class="shop-list">${MODES.map(m=>`<div class="shop-row"><div><strong>${esc(m.name)}</strong><small>${m.price} coins per minute</small></div><div class="buy-controls"><input type="number" min="1" max="1000" value="5" id="qty-${m.id}" aria-label="Minutes to buy" ${vetoActive()?"disabled":""}><button class="mini-buy ${vetoActive()?"disabled":""}" data-action="buy" data-mode="${m.id}" ${vetoActive()?"disabled":""}>${vetoActive()?"Veto":"Buy"}</button></div><small class="owned">Owned: ${state.minutes[m.id]||0} min</small></div>`).join("")}</div></section></div>`;}
function powerModal(){return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="Power-ups" data-modal-inner><div class="modal-head"><div><div class="eyebrow">NO COINS REQUIRED</div><h2>Power-ups</h2><p>Each power-up can be used once per round. Uses reset when you get tagged or win.</p></div><button class="close-button" data-action="close-modal" aria-label="Close">×</button></div><div class="power-list">${POWERS.map(p=>{const used=state.powerUsed.includes(p.id);return `<article class="power-row"><div class="power-mark">${p.id==='double'?'×2':p.id==='cloak'?'◌':'Ⅱ'}</div><div class="power-copy"><strong>${p.name}</strong><p>${p.desc}</p></div><button class="mini-buy ${used?'disabled':''}" data-action="use-power" data-power="${p.id}" ${used?'disabled':''}>${used?'Used this round':'Use free'}</button></article>`}).join("")}</div></section></div>`;}
function vetoActive(){return Number(state.vetoUntil)>Date.now();}
function vetoRemaining(){return Math.max(0,Math.ceil((Number(state.vetoUntil||0)-Date.now())/1000));}
function vetoClock(){const left=vetoRemaining();if(!left)return "00:00";return `${String(Math.floor(left/60)).padStart(2,"0")}:${String(left%60).padStart(2,"0")}`;}
function vetoBanner(){return vetoActive()?`<section class="veto-banner"><span class="veto-mark">!</span><div><strong>VETO ACTIVE · <span id="vetoTimer">${vetoClock()}</span> LEFT</strong><p>No paid transport and no challenges during the veto. Wait for the countdown to end.</p></div></section>`:"";}
function render(){const root=$("#app");root.innerHTML=state.role?activeView():roleView();$("#modalRoot").innerHTML=state.modal==='shop'?shopModal():state.modal==='powers'?powerModal():'';}
function changeRole(role){state.role=role;state.modal=null;state.challenge=null;state.challengeOpen=false;if(role==='runner')state.destination=rand(CITIES[state.city].landmarks);else state.destination=null;save();render();toast(role==='runner'?'Runner role selected':'Chaser role selected');}
function endRound(reason,won=false){if(won)state.roundsWon=(Number(state.roundsWon)||0)+1;state.role=state.role==='runner'?'chaser':'runner';state.round++;state.roundStarted=Date.now();state.powerUsed=[];state.effects=[];state.doubleNext=false;state.challenge=null;state.challengeOpen=false;state.modal=null;state.destination=state.role==='runner'?rand(CITIES[state.city].landmarks):null;save();render();toast(`${reason} — new round, role swapped${won?' · round win recorded':''}`);}
function drawChallenge(){if(vetoActive()){toast(`Veto active: challenges are locked for ${vetoClock()}.`);return;}if(state.challenge){toast("You already have a saved challenge. Complete or fail it before drawing another.");return;}const prefix=`${state.city}-challenge-`;const deck=getChallenges(state.city);let available=deck.filter(c=>!state.usedChallengeIds.includes(c.id));if(!available.length){state.usedChallengeIds=state.usedChallengeIds.filter(id=>!id.startsWith(prefix));available=deck;toast("All challenges have been used. Starting a fresh challenge cycle.");}state.challenge=rand(available);if(!state.usedChallengeIds.includes(state.challenge.id))state.usedChallengeIds.push(state.challenge.id);state.challengeOpen=false;state.modal=null;save();render();const root=$("#app");const placeholder=document.createElement('div');placeholder.className='draw-overlay';placeholder.innerHTML=`<div class="draw-card"><img src="./jetlag_favicon.jpg" alt=""><span>SHUFFLING CHALLENGES</span></div>`;root.appendChild(placeholder);requestAnimationFrame(()=>placeholder.classList.add('flipping'));setTimeout(()=>{placeholder.remove();state.challengeOpen=true;save();render();},1050);}
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
