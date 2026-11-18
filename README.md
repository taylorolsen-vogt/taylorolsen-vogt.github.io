# Portfolio

Taylor Olsen-Vogt's public portfolio, served by GitHub Pages at https://taylorolsen-vogt.github.io.

## Pages
- `index.html` – the landing page: bio, contact, and the filterable project-tile grid, with the Serious/Unserious toggle and the Speak to Gideon drawer. Each tile opens a project panel (picture, summary, facts, links); the write-ups live in the `projects` object near the end of the page's script, and `/#<key>` (for example `/#mach1`) opens a panel directly, even in a tab already showing the site; `/#hardware`, `/#software`, `/#marketing` and `/#venture` show the tiles with that filter on; `/#commercial` goes to the commercial.
- `serious.html` – currently an exact copy of `index.html`. If you edit one, copy the change to the other (or `cp index.html serious.html`).
- `network.html` – the Network page.
- `gideon-confirmation.html` – the page people land on after confirming their email; on an iPhone, iPad or Mac it opens the Gideon app (`gideon1://`), and goes back to the portfolio if the app does not open.
- `assets/gideon-answers.js` – what Speak to Gideon says on every page. Edit answers here, not in the pages.
- `assets/` – images, icons and the commercial video. `og-image.jpg` is the link-preview picture.
- `sitemap.xml`, `robots.txt` – search-engine files.

## Working on it
It is plain HTML, CSS and JavaScript with no build step. To preview, run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Known gaps
- Power Beaming and Redstone have no picture yet.
- Only finished projects go on the site (Taylor, Nov 2026); planned ones stay in Gideon until they're ready. Black Book, the Drone, AirRemote and Mach 2 were taken off until they are; their tiles and write-ups are in the git history.
- Company names to show: Redstone Laboratories and LIDI.
- Not used by any page right now (kept in case they're wanted): `commercial1_thumbnail.png`, `commercial25.mov`, `IMG_5114.jpg`, `LIDI.png`, `pfp.png`, `resilife-commercial.mp4`.
