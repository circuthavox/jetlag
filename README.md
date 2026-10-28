# Jet Lag: The Game — team dashboard

A mobile-first static website for GitHub Pages. It uses no GPS, no journey-planning API, and no server.

## Files
- `index.html` — app shell
- `styles.css` — responsive styling using the requested Jet Lag palette
- `app.js` — role selection, team coin economy, challenge deck, round controls and free power-ups
- `jetlag.png` — full logo
- `jetlag_favicon.jpg` — favicon and challenge-card animation artwork
- `manifest.webmanifest` — PWA name, display mode, theme and app icons
- `service-worker.js` — offline app-shell caching for repeat visits (cache version bumped when app content changes)
- `icons/` — install icons in 192px and 512px sizes, including a maskable icon

## Publish on GitHub Pages
1. Upload all files to the root of your repository.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.
4. Open the published site over HTTPS. The service worker activates automatically; after the first successful load, the app shell is cached for offline reopening.


## Install as an app (PWA)
- The project remains a normal website and can also be installed as a Progressive Web App (PWA) on supported browsers.
- On supported Chromium browsers, use **Install app** in the header. On iPhone/iPad, open the site in Safari, tap **Share**, then **Add to Home Screen**. On other browsers, use the browser menu's install or Add to Home Screen option if available.
- GitHub Pages serves over HTTPS, which is required for service workers. The offline cache keeps the site's static files available after the first successful load; team dashboards remain stored locally on each device and do not sync between phones.
- To test locally, serve the project with a local web server (for example, `python3 -m http.server`) rather than opening `index.html` as a `file://` URL.

## Gameplay notes
- Each phone is a private dashboard for one team. Coins, challenge count, travel minutes, veto countdown and round state are stored in that browser.
- Select **Runners** to receive a destination landmark, or **Chasers** to hide the destination.
- Round controls change with the selected role: runners choose **I got tagged** or **I won**; chasers choose **I tagged them** or **They won**. Only a successful outcome for your current role increments the persistent **Rounds Won** counter. Each outcome swaps roles, starts the next round, and refreshes the per-round power-up allowance.
- Each city has a pool of 1,000 unique challenge cards, built from the challenge objectives and 34 distinct instruction variations. Cards are selected with strong browser randomness without replacement, so a card will not repeat until all 1,000 cards in that city have been drawn. A card is marked as drawn immediately, even if the round ends before it is completed. The card instructions flow together without an “Extra rule” heading. Challenge cards show the category but do not list a location. Draw Challenge animates the favicon before revealing a random card. Successfully claim a challenge to add its displayed reward directly to your coin balance (Double Down doubles the next successful coin reward). If you fail a challenge, choose the fail button to start a 15-minute veto; no paid transport of any kind can be used during the veto. The countdown persists if you reload the page or start a new round.
- Power-ups are free and can each be used once per round. Double Down doubles the next successfully claimed challenge's coin reward. Cloak and Freeze are timed rule reminders; tracking and freeze coordination must be handled by the players in Apple Find My / agreement, as the website cannot control Find My or another team's phone.
- The travel shop purchases virtual minutes at the displayed coin rates: Rail 15 coins/minute; local bus / tram / metro 5 coins/minute; plane 100 coins/minute; ferry 10 coins/minute; bike / scooter 1 coin/minute. These are game resources, not real fares. All purchases are blocked while a veto is active, and players must not use any paid transport during that period, including previously purchased minutes.
- A static GitHub Pages site cannot sync separate phones automatically. Each team uses its own local dashboard and should coordinate round changes with the other team.


## Latest gameplay rules and polish
- The only round-reset controls are **I got tagged** and **I won**; the manual destination reroll, role-change control, and header reset button have been removed.
- Destination pools are constrained to each city's relevant ticketing region: Brisbane uses Translink SEQ, Sydney uses the Opal network, Melbourne uses myki-valid destinations, Adelaide uses Adelaide Metro destinations, London uses Oyster-valid London fare areas, and Paris uses the Navigo / Île-de-France region (zones 1–5). Out-of-region destinations such as Brighton, Oxford, Cambridge, Chartres, Reims and Rouen have been removed. The pools focus on farther-out landmarks intended to fit within the two-hour journey limit on typical public transport routes. This is a static game and does not check live timetables or fare acceptance for individual services, so players should verify the complete route and ticket coverage before beginning a round.
- Failing a challenge starts a 15-minute veto. During veto, both paid transport and drawing/completing challenges are blocked. The challenge button shows a countdown and unlocks automatically when the veto expires.
- Closing a challenge card without penalty keeps that exact challenge saved and visible on the dashboard, including its instructions and reward. The team can reopen it later; drawing another challenge is locked until the saved challenge is claimed or failed. Failing clears the challenge and starts the 15-minute veto.

- Rail is a single transport category at 15 coins per minute; the former high-speed and low-speed rail options have been removed. Existing saved high-speed and low-speed rail minutes are combined into the new Rail balance automatically.
