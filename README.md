# Jet Lag: The Game

### A fan made Jet Lag: The Game website to play it yourself in Brisbane, Sydney, Melbourne, Adelaide, London or Paris.

Inspired by [Jet Lag: The Game's]([url](https://www.youtube.com/c/jetlagthegame)) [Tag Eur It (All Stars)](https://www.youtube.com/playlist?list=PLB7ZcpBcwdC7X7UoXDLnT8pPbAH6a45jM)


## Editing challenge cards

All challenge cards are stored in `challenges.js`. Each row is one complete,
standalone card in this format:

`["Title", "Category", "Instructions", coinReward]`

To add a card, copy a row, edit its four values, and add it inside the
`window.JETLAG_CHALLENGES` array. There are no card variations or generated
variant combinations. The game draws each card once before starting a new
cycle, so cards do not repeat until the full list has been used.


## Local challenge editor

`edit.html` provides a GUI for adding, editing, and removing standalone challenge
cards. It deliberately refuses to run on GitHub Pages or on `github.com`; it
only enables on `localhost`, `127.0.0.1`, or `::1` over HTTP.

From the repository root on your computer, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/edit.html`. The editor reads `challenges.js`
from that local repository copy. After editing, click **Download challenges.js**
and replace the repository's existing `challenges.js` with the downloaded file,
then commit/push it to GitHub. A regular browser page cannot silently overwrite
files in your local repository.
