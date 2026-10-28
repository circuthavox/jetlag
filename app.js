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
 ["Create a team slogan","Creative","Invent a slogan for your team and perform it like a dramatic sports advertisement. Record the performance.",500],
 ["Identify a train operator","Transit","Find a train and identify the operator from its branding or station information. Explain how you verified it.",600],
 ["Read a departure board","Transit","Choose a departing service and correctly state its destination, platform and scheduled departure time.",600],
 ["Find an accessible station feature","Transit","Locate a lift, ramp or tactile paving at a station and explain whom it helps.",600],
 ["Compare two routes","Transit","Use an official journey planner to compare two public-transport routes to the same nearby destination.",900],
 ["Spot a service pattern","Transit","Observe a departure board and identify two services sharing a route, line or destination.",600],
 ["Find a transport map","Transit","Locate a public network map and identify three stops or stations on one line.",600],
 ["Find a transfer point","Transit","Identify a place where passengers can transfer between two transport modes.",600],
 ["Check a fare rule","Transit","Find an official fare rule for your city and explain it in your own words.",600],
 ["Find a station clock","Transit","Find a public clock at a transport hub and photograph it without including identifiable strangers.",600],
 ["Explain a platform sign","Transit","Choose a platform or wayfinding sign and explain what a first-time visitor should do.",600],
 ["Navigate by street names","Navigation","Reach a nearby public landmark using street names and signs, checking your route only at the end.",600],
 ["Plan a three-turn route","Navigation","Plan a safe walking route with exactly three turns and follow it with your team.",800],
 ["Find a north indicator","Navigation","Find a map or sign showing north and use it to describe the direction of a nearby landmark.",600],
 ["Estimate a straight-line distance","Navigation","Estimate the straight-line distance to a visible landmark, then verify it on a map.",600],
 ["Find a public directory","Navigation","Use a public directory to locate a named facility in a shopping centre or transport hub.",600],
 ["Follow accessible wayfinding","Navigation","Follow official signs to a public facility and report which signs helped you.",600],
 ["Choose a meeting point","Navigation","Pick a safe, obvious public meeting point and explain why it is easy to find.",600],
 ["Map a short loop","Navigation","Draw a route that starts and ends at your current public location, passing two landmarks.",600],
 ["Compare walking routes","Navigation","Find two walking routes to a nearby destination and explain which is simpler.",800],
 ["Give verbal directions","Navigation","Give a teammate clear directions to a nearby public feature without pointing.",600],
 ["Find a circular object","Scavenger hunt","Photograph three circular public objects without moving or touching them.",600],
 ["Spot a local logo","Scavenger hunt","Find a logo associated with a local organisation and identify the organisation.",600],
 ["Find a public mural","Scavenger hunt","Photograph a mural and describe one detail that might be easy to miss.",600],
 ["Find a clock face","Scavenger hunt","Locate a public clock and estimate the time before checking it.",600],
 ["Spot a bilingual sign","Scavenger hunt","Find a sign using two languages, if available, and identify both languages.",600],
 ["Find a public sculpture detail","Scavenger hunt","Photograph a close-up detail of a sculpture from a safe public position.",600],
 ["Find an unusual roof","Scavenger hunt","Find a building with an unusual roof shape and describe its design.",600],
 ["Spot a patterned pavement","Scavenger hunt","Find a public paving pattern and sketch a small section of it.",600],
 ["Find a public noticeboard","Scavenger hunt","Locate a public noticeboard and report what kind of information it displays.",600],
 ["Find a landmark reflection","Scavenger hunt","Photograph a landmark reflected in a window or water, where safe and permitted.",600],
 ["Estimate a building height","Estimation","Estimate the height of a public building, then compare it with a reliable published figure if available.",900],
 ["Estimate a queue length","Estimation","Estimate the length of a queue from a respectful distance without photographing people, then check by pacing an empty nearby distance.",600],
 ["Estimate a station platform length","Estimation","Estimate a platform's length using map or official information; do not enter restricted areas.",600],
 ["Estimate a tree height","Estimation","Estimate the height of a tree from a safe distance, then explain your method.",600],
 ["Estimate a journey duration","Estimation","Predict the duration of a public-transport journey before checking the official timetable.",600],
 ["Estimate steps to a landmark","Estimation","Predict how many ordinary walking steps it takes to reach a nearby landmark, then count them.",600],
 ["Estimate a plaza area","Estimation","Estimate the area of a public square and explain the assumptions you used.",600],
 ["Estimate a bridge length","Estimation","Estimate the length of a publicly accessible bridge from a safe viewpoint, then verify if published.",600],
 ["Estimate a shopfront width","Estimation","Estimate the width of a shopfront from the public footpath without obstructing anyone.",600],
 ["Estimate the number of floors","Estimation","Estimate how many floors a building has, then verify from a public source or visible count.",600],
 ["Visit a public library","Explore","Enter a public library if open and find a section related to local history or travel.",600],
 ["Find a heritage plaque","Explore","Read a public heritage plaque and summarise one fact it gives.",600],
 ["Explore a civic square","Explore","Visit a public square and identify three features designed for visitors.",600],
 ["Find a community facility","Explore","Locate a public community facility and explain what it is used for.",600],
 ["Find a local history display","Explore","Find a local history display and share one surprising detail.",800],
 ["Visit a public garden","Explore","Visit a public garden and identify three different plant types without picking them.",600],
 ["Find a memorial","Explore","Visit a publicly accessible memorial and explain what it commemorates using its signage.",600],
 ["Find a public fountain","Explore","Locate a public fountain and describe how it fits into the surrounding space.",600],
 ["Find a market","Explore","Visit a public market if operating and identify one product made or grown locally.",600],
 ["Discover a free attraction","Explore","Find a free public attraction and explain what a visitor can do there.",600],
 ["Make a six-word travel story","Creative","Write a travel story using exactly six words inspired by your current location.",600],
 ["Design a station poster","Creative","Sketch a poster encouraging people to use public transport responsibly.",600],
 ["Create a landmark logo","Creative","Draw a simple logo inspired by a nearby landmark, using no more than three shapes.",600],
 ["Make a sound postcard","Creative","Record 10 seconds of ambient sound where recording is permitted, without capturing private conversations.",600],
 ["Write a tourist slogan","Creative","Write a slogan of eight words or fewer for a nearby public place.",600],
 ["Create a photo composition","Creative","Take a photo using symmetry or leading lines, avoiding identifiable strangers.",600],
 ["Invent a new station name","Creative","Invent a suitable name for a nearby stop and explain the reasoning.",600],
 ["Draw a route icon","Creative","Create a simple symbol that could represent your current area on a tourist map.",800],
 ["Write a mini review","Creative","Write a three-sentence review of a public place you visited.",600],
 ["Create a travel quiz","Creative","Write three quiz questions about your city and provide the answers separately.",600],
 ["Silent line-up","Teamwork","Without speaking, line up by birth month, then verify the order together.",600],
 ["Team memory test","Teamwork","Study five nearby public details for 30 seconds, look away, and list them from memory.",600],
 ["Build a human compass","Teamwork","In a safe open space, arrange your team to show north, south, east and west.",600],
 ["Give a one-minute briefing","Teamwork","Brief your team on the next planned leg of the journey in under one minute.",600],
 ["Team word association","Teamwork","Take turns naming words associated with the city for 30 seconds without repeating.",600],
 ["Pass the story","Teamwork","Each teammate adds one sentence to a travel story until it reaches eight sentences.",600],
 ["Explain a landmark","Teamwork","One teammate describes a landmark while another draws it without seeing it.",600],
 ["Team observation challenge","Teamwork","Each person names one detail others have not noticed at the current location.",600],
 ["Plan a group route","Teamwork","Agree on a safe route to a nearby public destination and explain the team's choice.",900],
 ["Create a team handshake","Teamwork","Create a simple handshake or gesture and demonstrate it without blocking pedestrian traffic.",600],
 ["Find a local bakery item","Food","Find a bakery item associated with the area and explain the connection using a menu or sign.",600],
 ["Compare two menus","Food","Compare two public menus and identify one difference in price, ingredients or style.",800],
 ["Find a vegetarian option","Food","Find a clearly labelled vegetarian option on a menu and note its name; buying it is optional.",600],
 ["Find a regional drink","Food","Identify a drink associated with the region from a shop or menu and explain the association.",600],
 ["Read a food label","Food","Read the origin information on a packaged food and identify where it was made.",600],
 ["Find a market ingredient","Food","Identify an ingredient commonly sold at a local market and name a dish that uses it.",600],
 ["Compare snack prices","Food","Compare the prices of the same type of snack at two shops without needing to buy either.",800],
 ["Find a food tradition","Food","Find a menu or sign describing a local food tradition and summarise it.",600],
 ["Choose a budget snack","Food","Find a snack option within a team-agreed budget and show its listed price.",800],
 ["Review a takeaway menu","Food","Choose one menu item and give a fair review based on its description, without making a purchase required.",600],
 ["Capture a leading line","Photography","Take a photo where a path, railing or building edge leads the viewer's eye toward a subject.",600],
 ["Photograph a reflection","Photography","Take a photo of a reflection in a safe public place, avoiding private interiors.",600],
 ["Find symmetry","Photography","Take a photo of a symmetrical building, doorway or public feature.",600],
 ["Capture contrasting textures","Photography","Photograph two contrasting textures in one frame.",600],
 ["Frame a landmark","Photography","Use a doorway, arch or other public feature to frame a landmark in a photo.",600],
 ["Find three shades","Photography","Take a photo showing three distinct shades of one colour in the same area.",600],
 ["Photograph a shadow","Photography","Take a photo where a shadow creates an interesting shape.",600],
 ["Capture a repeating pattern","Photography","Photograph a repeating pattern in architecture or public design.",600],
 ["Take a detail shot","Photography","Photograph an interesting architectural detail and explain where it is found.",600],
 ["Create a before-and-after pair","Photography","Photograph the same public scene from two angles and explain how the perspective changes.",600],
 ["Identify a building material","Architecture","Find a public building and identify two visible construction materials.",600],
 ["Spot an arch","Architecture","Find an arch in public architecture and photograph it from a permitted area.",600],
 ["Find a modern building","Architecture","Identify a modern building and describe two features of its design.",600],
 ["Find an older building","Architecture","Find an older building and look for a date or heritage information on public signage.",600],
 ["Compare window styles","Architecture","Compare window designs on two nearby buildings and describe a difference.",800],
 ["Find a column","Architecture","Locate a public building with columns and describe their arrangement.",600],
 ["Spot a roofline","Architecture","Find two different rooflines and sketch their outlines.",600],
 ["Find adaptive reuse","Architecture","Look for a building that appears to have been reused for a new purpose and verify with signage if possible.",600],
 ["Find a covered walkway","Architecture","Locate a covered public walkway and explain how it helps pedestrians.",600],
 ["Describe a facade","Architecture","Describe a building facade using three precise visual details.",600],
 ["Identify three birds","Nature","Observe and identify three birds from a public area without feeding or disturbing them.",600],
 ["Find leaf shapes","Nature","Find three different leaf shapes and sketch them without picking leaves.",600],
 ["Listen for nature","Nature","Spend one quiet minute identifying natural sounds you can hear.",600],
 ["Find a pollinator-friendly plant","Nature","Find a flowering plant that may attract pollinators and observe it without disturbing insects.",600],
 ["Spot cloud types","Nature","Observe the sky and describe the cloud shapes you see.",600],
 ["Find a habitat feature","Nature","Identify a feature that provides shelter for wildlife, such as a tree hollow or planted area.",600],
 ["Find a water feature","Nature","Locate a stream, pond or fountain and describe one way it changes the surroundings.",600],
 ["Observe tree bark","Nature","Compare the bark of two trees from a safe public path.",600],
 ["Find a seed pod","Nature","Find a fallen seed pod or leaf on the ground and photograph it without collecting it.",600],
 ["Find a green space","Nature","Locate a public green space and identify three ways people can use it responsibly.",600],
 ["Find a street name story","History","Look for a public source explaining a street name and summarise the story.",600],
 ["Identify a founding date","History","Find a reliable source for when a local public institution was established.",600],
 ["Find a historic transport clue","History","Find a historic transport feature or photograph on public display and describe it.",600],
 ["Compare old and new","History","Find an official historic image of a nearby place and identify one visible change.",800],
 ["Find a commemorative date","History","Read a public plaque or display and explain why its date matters.",600],
 ["Identify a historic style","History","Find a building described as historic and identify one feature of its architectural style.",900],
 ["Find a local first","History","Research a documented local first, such as a first station, bridge or public service.",600],
 ["Find an old map","History","Find a publicly displayed or online historic map and compare it with a current map.",600],
 ["Learn a person's contribution","History","Find a public memorial or plaque about a person and summarise their contribution.",600],
 ["Find an industrial relic","History","Identify a publicly accessible remnant of local industry and explain its former use.",600],
 ["Count a train's carriages","Transit observation","From a safe public platform position, count the carriages of a train without approaching the edge.",600],
 ["Compare vehicle designs","Transit observation","Observe two public-transport vehicles and note two differences in their design.",800],
 ["Identify a bus route","Transit observation","Find a bus route number and use official information to identify its destination or route.",800],
 ["Spot a transfer sign","Transit observation","Find a sign directing passengers between transport services and explain its meaning.",600],
 ["Find a ticket machine","Transit observation","Locate a ticket machine and identify which payment methods its instructions mention.",600],
 ["Observe an interchange","Transit observation","Find an interchange and list the transport modes passengers can connect between.",600],
 ["Find a service announcement","Transit observation","Listen to a public service announcement and summarise its useful information.",600],
 ["Identify priority seating","Transit observation","Find priority seating signs and explain who should be offered those seats.",600],
 ["Find real-time information","Transit observation","Locate a public real-time departure display and explain how it helps passengers.",600],
 ["Spot a bicycle facility","Transit observation","Find a bike rack or bicycle carriage information near a transport stop.",600],
 ["Solve a number pattern","Puzzle","Write a number sequence with at least six terms and have a teammate work out the rule.",600],
 ["Make a word ladder","Puzzle","Create a word ladder with at least four steps, changing one letter at a time.",600],
 ["Solve a local riddle","Puzzle","Write a riddle whose answer is a nearby public landmark and let a teammate solve it.",600],
 ["Create a code","Puzzle","Encode a short message using a simple substitution cipher and have a teammate decode it.",600],
 ["Find five anagrams","Puzzle","Make five anagrams from words related to travel or your city.",600],
 ["Mental maths sprint","Puzzle","Complete five mental arithmetic questions set by a teammate without using a calculator.",600],
 ["Spot a pattern","Puzzle","Find a repeating pattern in a public design and describe its repeating unit.",600],
 ["Create a logic question","Puzzle","Write a small logic puzzle with a single correct answer and test it on your team.",600],
 ["Remember a sequence","Puzzle","Study six safe, ordinary objects for 20 seconds, then list them from memory.",600],
 ["Solve a map clue","Puzzle","Write three clues that lead a teammate to a nearby public feature.",600],
 ["Find a public toilet sign","Public services","Locate public toilet wayfinding and identify whether accessible facilities are indicated.",600],
 ["Find a drinking fountain","Public services","Locate a public drinking fountain and check any posted usage instructions.",600],
 ["Locate visitor information","Public services","Find an official visitor information point or website and identify one useful service.",600],
 ["Find an accessible entrance","Public services","Locate public signage for an accessible entrance without entering restricted areas.",600],
 ["Find a public seating area","Public services","Locate a public seating area and describe how it supports visitors.",600],
 ["Identify an emergency marker","Public services","Find a public emergency or help-point sign and explain its purpose without activating it.",600],
 ["Find a recycling station","Public services","Locate a public recycling bin and identify which material it accepts.",600],
 ["Find a pedestrian crossing","Public services","Locate a marked pedestrian crossing and explain the safe way to use it.",600],
 ["Find a public map legend","Public services","Read a public map legend and explain two symbols.",600],
 ["Find a quiet public space","Public services","Identify a public space where people can sit quietly and explain why it is suitable.",600],
 ["Learn a local greeting","Language","Learn a common local greeting from a reliable source and teach it to your team.",500],
 ["Decode a public sign","Language","Translate or interpret a public sign using visible context or an approved translation tool.",500],
 ["Find a place-name origin","Language","Research the origin or meaning of a local place name from a reliable source.",500],
 ["Spot borrowed words","Language","Find three words on public signs that are borrowed from another language, if available.",500],
 ["Make a bilingual label","Language","Write a simple label for a landmark in English and another language you know.",500],
 ["Learn a polite phrase","Language","Learn a polite phrase useful to visitors and explain when it should be used.",500],
 ["Find language options","Language","Find a public information source offering multiple languages and list two options.",500],
 ["Explain a transport abbreviation","Language","Find a transport abbreviation on public signage and explain what it stands for.",500],
 ["Create a travel glossary","Language","Write five useful travel words and define them in plain English.",500],
 ["Identify a script","Language","Find public text in a writing system you can identify and name the script.",500],
 ["Plan a low-cost outing","Budget","Plan a short outing using only free attractions and public transport information.",600],
 ["Compare ticket types","Budget","Compare two official public-transport ticket types and explain one difference.",800],
 ["Find a free museum day","Budget","Check an official museum page for free entry information or free public exhibits.",800],
 ["Build a snack budget","Budget","Create a snack plan for your team within a budget set before starting.",800],
 ["Compare walking and transit","Budget","Compare the cost of walking versus taking public transport for a nearby trip.",800],
 ["Find a refill option","Budget","Find a place where visitors can refill a water bottle, if available.",600],
 ["Compare attraction prices","Budget","Compare listed admission prices for two nearby attractions without buying tickets.",800],
 ["Find a discount rule","Budget","Find an official discount or concession rule and explain who qualifies.",600],
 ["Estimate a day budget","Budget","Estimate the cost of a simple day out and compare it with published prices.",800],
 ["Find a free viewpoint","Budget","Find a public viewpoint that does not require paid admission.",600],
 ["Notice five sounds","Observation","List five distinct sounds you can hear from a safe public place.",500],
 ["Find three shapes","Observation","Identify three geometric shapes in nearby architecture or street furniture.",500],
 ["Spot a colour theme","Observation","Find a public place that uses a consistent colour scheme and describe it.",500],
 ["Count public benches","Observation","Count visible public benches in one small area without entering private property.",500],
 ["Find a repeating number","Observation","Spot a number repeated on public signs or displays and explain where it appears.",500],
 ["Observe pedestrian flow","Observation","From a safe position, observe how people move through a public space without recording individuals.",500],
 ["Find contrasting signs","Observation","Compare two signs with different purposes and explain how their designs differ.",500],
 ["Spot a design for rain","Observation","Find a feature of the built environment that helps people stay dry in rain.",500],
 ["Find a wayfinding landmark","Observation","Identify a feature that helps people orient themselves in the area.",500],
 ["Describe the atmosphere","Observation","Describe the mood of a public space using five specific observations.",500],
 ["Complete a walking interval","Fitness","Walk briskly for three minutes, then at a comfortable pace for two minutes, if safe and suitable for everyone.",600],
 ["Balance challenge","Fitness","Each teammate balances on one foot for up to 20 seconds in a safe, clear space.",600],
 ["Team step count","Fitness","Count a short walk's steps as a team and estimate the total before checking your combined count.",600],
 ["Stretch break","Fitness","Complete a gentle, comfortable group stretch routine for two minutes; stop if anything hurts.",600],
 ["Find a walking route","Fitness","Plan a safe five-minute walk using footpaths and crossings.",800],
 ["Do a coordination challenge","Fitness","Pass a soft item around the team in a chosen pattern for 30 seconds without dropping it.",600],
 ["Mirror movements","Fitness","One teammate leads slow, safe movements for 30 seconds while others mirror them.",600],
 ["Pace a distance","Fitness","Walk a short marked distance and estimate how long it would take to cover twice that distance.",600],
 ["Team reaction game","Fitness","Play a simple verbal reaction game for one minute in a clear area.",600],
 ["Find an outdoor exercise feature","Fitness","Locate public exercise equipment or a marked fitness route and read its instructions.",600],
 ["Verify opening hours","Digital research","Use an official venue source to check opening hours and report the source.",800],
 ["Find an official map","Digital research","Locate an official map for a local attraction and identify its entrance.",600],
 ["Check a service alert","Digital research","Find the official transport service-alert page and report whether an alert is listed.",600],
 ["Research a landmark fact","Digital research","Verify one interesting fact about a nearby landmark using a reliable source.",800],
 ["Find an accessibility guide","Digital research","Locate an official accessibility guide for a public venue and summarise one feature.",600],
 ["Find a local event","Digital research","Find an officially listed upcoming public event and report its date.",600],
 ["Check a place's history","Digital research","Use a museum, council or heritage source to verify a historical claim.",800],
 ["Compare two sources","Digital research","Check one local fact against two credible sources and report whether they agree.",800],
 ["Find a visitor rule","Digital research","Find an official visitor rule for a public attraction and explain why it matters.",600],
 ["Identify a source date","Digital research","Find a web page about a local place and identify when it was published or updated, if shown.",600]
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
function usedChallengeCount(city=state.city){const prefix=`${city}-challenge-`;return state.usedChallengeIds.filter(id=>typeof id==="string"&&id.startsWith(prefix)&&/^\d+$/.test(id.slice(prefix.length))).length;}
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
function generateChallenges(city){return TASKS.map((t,ti)=>({id:`${city}-challenge-${ti}`,title:t[0],category:t[1],desc:t[2],coins:t[3]}));}
function roleView(){return `<section class="welcome"><div class="eyebrow">${esc(CITIES[state.city].network)} · TEAM DASHBOARD</div><h1>WHAT'S YOUR<br><em>ROLE?</em></h1><p>Choose the role for this phone. Each team keeps its own dashboard, coin balance.</p><div class="field"><label for="citySelect">PLAYING IN</label><select id="citySelect">${Object.entries(CITIES).map(([c,v])=>`<option value="${c}" ${state.city===c?'selected':''}>${c} — ${esc(v.network)}</option>`).join("")}</select></div><div class="role-buttons"><button class="role-card runner" data-action="role" data-role="runner"><span class="role-symbol">↗</span><strong>We're the runners</strong><small>Get a destination landmark and try to reach it.</small><span class="role-cta">CHOOSE RUNNERS →</span></button><button class="role-card chaser" data-action="role" data-role="chaser"><span class="role-symbol">◎</span><strong>We're the chasers</strong><small>Use your coin economy and power-ups to hunt the runners.</small><span class="role-cta">CHOOSE CHASERS →</span></button></div></section>`;}
function activeView(){const city=CITIES[state.city];const runner=state.role==="runner";const ch=state.challenge;const locked=vetoActive()||!!ch;const drawTitle=vetoActive()?"Challenges locked during veto":ch?"Challenge already drawn":"Draw challenge";const drawHint=vetoActive()?`Available in ${vetoClock()}`:ch?"Complete or fail your saved challenge first":`${usedChallengeCount()} of ${TASKS.length} used · no repeats until the pool is exhausted`;return `<section class="dashboard"><div class="cityline"><div><span class="eyebrow">${esc(city.network)}</span><h1>YOUR TEAM<br><em>DASHBOARD</em></h1><p class="subline">${esc(state.city)} · Start: ${esc(city.station)}</p></div></div><div class="role-banner ${runner?'runner-banner':'chaser-banner'}"><span class="role-dot"></span><div><small>YOUR ROLE</small><strong>${runner?'RUNNERS':'CHASERS'}</strong></div><span class="round-pill">ROUND ${state.round}</span></div>${vetoBanner()}${runner?`<section class="destination-card"><div class="eyebrow">YOUR WIN LOCATION</div><h2>${state.destination?esc(state.destination):'Destination needed'}</h2><p>The destination pool is limited to places intended to be reachable within two hours by typical public transport from the starting station. This app does not read live timetables, so check your departure time before setting off. The next destination is assigned only when a round ends.</p></section>`:`<section class="destination-card chaser-note"><div class="eyebrow">CHASE MODE</div><h2>Track the runners.</h2><p>Your dashboard does not reveal the runners' destination. Use Apple Find My separately for AirTag tracking.</p></section>`}<div class="stats-grid"><div class="stat-card"><span>ROUNDS WON</span><strong>${state.roundsWon||0}</strong><small>Your winning rounds</small></div><div class="stat-card"><span>CHALLENGES WON</span><strong>${state.challengesWon||0}</strong><small>Successful challenges claimed</small></div><div class="stat-card"><span>COIN BALANCE</span><strong>${state.coins}</strong><small>Virtual travel currency</small></div></div><div class="main-actions"><button class="big-action primary ${locked?'action-disabled':''}" data-action="draw" ${locked?'disabled aria-disabled="true"':''}><span class="action-icon">✦</span><span><strong>${drawTitle}</strong><small>${drawHint}</small></span><span class="arrow">${locked?'⏳':'→'}</span></button><button class="big-action" data-action="open-shop"><span class="action-icon">◈</span><span><strong>Travel shop</strong><small>Buy travel minutes with coins</small></span><span class="arrow">→</span></button><button class="big-action" data-action="open-powers"><span class="action-icon">⚡</span><span><strong>Power-ups</strong><small>Free · one use each per round</small></span><span class="arrow">→</span></button></div>${ch?savedChallengeCard(ch):''}<section class="round-controls"><div class="section-heading"><div><div class="eyebrow">ROUND CONTROL</div><h2>What happened?</h2></div><span class="small-note">Choose the outcome to reset</span></div><div class="end-buttons">${runner?`<button class="end-button tagged" data-action="tagged"><strong>I got tagged</strong><small>The chasers win · start next round</small></button><button class="end-button won" data-action="won"><strong>I won</strong><small>I reached my destination · start next round</small></button>`:`<button class="end-button tagged" data-action="tagged"><strong>I tagged them</strong><small>Chasers win · start next round</small></button><button class="end-button won" data-action="won"><strong>They won</strong><small>They reached their destination · start next round</small></button>`}</div></section>${ch&&state.challengeOpen?challengeCard(ch):''}</section>`;}
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
function drawChallenge(){if(vetoActive()){toast(`Veto active: challenges are locked for ${vetoClock()}.`);return;}if(state.challenge){toast("You already have a saved challenge. Complete or fail it before drawing another.");return;}const prefix=`${state.city}-challenge-`;const deck=generateChallenges(state.city);let available=deck.filter(c=>!state.usedChallengeIds.includes(c.id));if(!available.length){state.usedChallengeIds=state.usedChallengeIds.filter(id=>!id.startsWith(prefix));available=deck;toast(`All ${TASKS.length} tasks have been used. The challenge pool has been reshuffled.`);}state.challenge=rand(available);if(!state.usedChallengeIds.includes(state.challenge.id))state.usedChallengeIds.push(state.challenge.id);state.challengeOpen=false;state.modal=null;save();render();const root=$("#app");const placeholder=document.createElement('div');placeholder.className='draw-overlay';placeholder.innerHTML=`<div class="draw-card"><img src="./jetlag_favicon.jpg" alt=""><span>SHUFFLING CHALLENGES</span></div>`;root.appendChild(placeholder);requestAnimationFrame(()=>placeholder.classList.add('flipping'));setTimeout(()=>{placeholder.remove();state.challengeOpen=true;save();render();},1050);}
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