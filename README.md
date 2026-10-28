# Jet Lag: The Game — team dashboard

A mobile-first static website for GitHub Pages. It uses no GPS, no journey-planning API, and no server.

## Files
- `index.html` — app shell
- `styles.css` — responsive styling using the requested Jet Lag palette
- `app.js` — role selection, team coin economy, challenge deck, round controls and free power-ups
- `jetlag.png` — full logo
- `jetlag_favicon.jpg` — favicon and challenge-card animation artwork

## Publish on GitHub Pages
1. Upload all files to the root of your repository.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.

## Gameplay notes
- Each phone is a private dashboard for one team. Coins, challenge count, travel minutes, veto countdown and round state are stored in that browser.
- Select **Runners** to receive a destination landmark, or **Chasers** to hide the destination.
- Round controls change with the selected role: runners choose **I got tagged** or **I won**; chasers choose **I tagged them** or **They won**. Only a successful outcome for your current role increments the persistent **Rounds Won** counter. Each outcome swaps roles, starts the next round, and refreshes the per-round power-up allowance.
- Each city has a pool of 1,000 unique challenge cards, built from the challenge objectives and 34 distinct rule variations. Challenge cards show the challenge category but do not list a location. Draw Challenge animates the favicon before revealing a random card. Successfully claim a challenge to add its displayed reward directly to your coin balance (Double Down doubles the next successful coin reward). If you fail a challenge, choose the fail button to start a 15-minute veto; no paid transport of any kind can be used during the veto. The countdown persists if you reload the page or start a new round.
- Power-ups are free and can each be used once per round. Double Down doubles the next successfully claimed challenge's coin reward. Cloak and Freeze are timed rule reminders; tracking and freeze coordination must be handled by the players in Apple Find My / agreement, as the website cannot control Find My or another team's phone.
- The travel shop purchases virtual minutes at the displayed coin rates: Rail 15 coins/minute; local bus / tram / metro 5 coins/minute; plane 100 coins/minute; ferry 10 coins/minute; bike / scooter 1 coin/minute. These are game resources, not real fares. All purchases are blocked while a veto is active, and players must not use any paid transport during that period, including previously purchased minutes.
- A static GitHub Pages site cannot sync separate phones automatically. Each team uses its own local dashboard and should coordinate round changes with the other team.


## Latest gameplay rules and polish
- The only round-reset controls are **I got tagged** and **I won**; the manual destination reroll, role-change control, and header reset button have been removed.
- Destinations are selected from farther-out regional landmarks intended to require a substantial journey (roughly an hour or more from the central starting station; actual journey time varies by service and time of day).
- Failing a challenge starts a 15-minute veto. During veto, both paid transport and drawing/completing challenges are blocked. The challenge button shows a countdown and unlocks automatically when the veto expires.
- Closing a challenge card without penalty keeps that exact challenge saved and visible on the dashboard, including its instructions and reward. The team can reopen it later; drawing another challenge is locked until the saved challenge is claimed or failed. Failing clears the challenge and starts the 15-minute veto.

- Rail is a single transport category at 15 coins per minute; the former high-speed and low-speed rail options have been removed. Existing saved high-speed and low-speed rail minutes are combined into the new Rail balance automatically.
