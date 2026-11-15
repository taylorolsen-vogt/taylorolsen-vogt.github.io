# Portfolio

Taylor Olsen-Vogt's public portfolio, served by GitHub Pages at https://taylorolsen-vogt.github.io.

## Pages
- `index.html` – the landing page: bio, contact, and the filterable project-tile grid, with the Serious/Unserious toggle and the Speak to Gideon drawer. Each tile opens a project panel (picture, summary, facts, links); the write-ups live in the `projects` object near the end of the page's script, and `/#<key>` (for example `/#mach1`) opens a panel directly.
- `serious.html` – currently an exact copy of `index.html`. If you edit one, copy the change to the other (or `cp index.html serious.html`).
- `network.html` – the Network page.
- `gideon-confirmation.html` – the page people land on after confirming their email; it opens the Gideon app, with a fallback.
- `assets/` – images, icons and the commercial video. `og-image.jpg` is the link-preview picture.
- `sitemap.xml`, `robots.txt` – search-engine files.

## Working on it
It is plain HTML, CSS and JavaScript with no build step. To preview, run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Known gaps
- Drone, Power Beaming, Mach 2, Black Book, AirRemote and Redstone have no picture yet; Black Book and Drone also need a fuller write-up.
- Company names to show: Redstone Laboratories and LIDI.
- Not used by any page right now (kept in case they're wanted): `commercial1_thumbnail.png`, `commercial25.mov`, `IMG_5114.jpg`, `LIDI.png`, `pfp.png`, `resilife-commercial.mp4`.
