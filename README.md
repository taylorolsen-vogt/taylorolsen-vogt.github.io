# Portfolio

Taylor Olsen-Vogt's public portfolio, served by GitHub Pages at https://taylorolsen-vogt.github.io.

## Pages
- `index.html` – the landing page: bio, contact, and the filterable project-tile grid, with the Serious/Unserious toggle and the Speak to Gideon drawer. Each tile opens a project panel (picture, summary, facts, links); the write-ups live in the `projects` object near the end of the page's script, and `/#<key>` (for example `/#mach1`) opens a panel directly, even in a tab already showing the site; `/#hardware`, `/#software`, `/#marketing` and `/#venture` show the tiles with that filter on; `/#commercial` goes to the commercial.
- The tile grid is built from square cells: the row height is computed from the column width, and every tile is placed by name (`grid-template-areas`) in one layout per screen size (5 columns on laptops and wider, 4 on tablets, 2 on phones) and per filter. Each photo tile spans the cells closest to its picture's shape (Mach 1 2×3, Archive 2×1, FORGE 2×2, LIDI 1×1, commercial 2×1) and is cropped to fill, never stretched. To add or move a tile, add its name to every layout so each row stays full.
- `serious.html` – currently an exact copy of `index.html`. If you edit one, copy the change to the other (or `cp index.html serious.html`).
- `network.html` – the Network page.
- `gideon-confirmation.html` – the page people land on after confirming their email; on an iPhone, iPad or Mac it opens the Gideon app (`gideon1://`), and goes back to the portfolio if the app does not open.
- `assets/gideon-answers.js` – what Speak to Gideon says on every page. Edit answers here, not in the pages.
- `assets/` – images, icons and the commercial video. `og-image.jpg` is the link-preview picture.
- `sitemap.xml`, `robots.txt` – search-engine files.

## Working on it
It is plain HTML, CSS and JavaScript with no build step. To preview, run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

Only finished projects go on the site. `npm test` (or `node .github/check-site.mjs`) fails if a tile, panel, Network-desk paper, link or chat answer points at a project that isn't on the finished list in `.github/check-site.mjs`, if a tile is labelled as unfinished ("In design", "Early concept", "Coming soon" ...), or if `serious.html` has drifted from `index.html`. It runs on GitHub for every push and pull request. To have it stop a commit or push on this computer too, run `git config core.hooksPath .github/hooks` once. When a project is finished and Taylor wants it shown, add its key to that list in the same change that adds its tile.

## Known gaps
- Power Beaming and Redstone have no picture yet.
- Only finished projects go on the site (Taylor, Nov 2026); planned ones stay in Gideon until they're ready. Black Book, the Drone, AirRemote and Mach 2 were taken off until they are; their tiles and write-ups are in the git history.
- Company names to show: Redstone Laboratories and LIDI.
- Not used by any page right now (kept in case they're wanted): `commercial1_thumbnail.png`, `commercial25.mov`, `IMG_5114.jpg`, `LIDI.png`, `pfp.png`, `resilife-commercial.mp4`.
