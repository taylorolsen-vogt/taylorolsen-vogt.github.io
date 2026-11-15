// Shared behaviour for the three design directions: project filters,
// the Speak to Gideon drawer, the commercial video and the contact form.
// Same logic as the live index.html; each direction only restyles it.
(function () {
  const grid = document.getElementById('grid');
  const filters = document.querySelectorAll('.filt');

  filters.forEach((b) => {
    b.addEventListener('click', () => {
      filters.forEach((x) => { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); });
      b.classList.add('active');
      b.setAttribute('aria-pressed', 'true');
      const f = b.dataset.f;
      grid.dataset.filter = f;
      grid.querySelectorAll('[data-cat]').forEach((t) => {
        t.hidden = !(f === 'all' || t.dataset.cat === f);
      });
    });
  });

  const gDrawer = document.getElementById('gDrawer');
  const gClose = document.getElementById('gClose');
  const gInput = document.getElementById('gInput');
  const gSend = document.getElementById('gSend');
  const gMsgs = document.getElementById('gMsgs');
  const gPrompts = document.getElementById('gPrompts');

  function openGideon() {
    gDrawer.classList.add('open');
    requestAnimationFrame(() => gInput.focus());
  }
  function closeGideon() { gDrawer.classList.remove('open'); }

  function addGideonMessage(text, isUser) {
    const m = document.createElement('div');
    m.className = 'g-msg' + (isUser ? ' user' : '');
    m.textContent = text;
    gMsgs.appendChild(m);
    gMsgs.scrollTop = gMsgs.scrollHeight;
  }

  const gideonAnswers = [
    { re: /mach\s*2/i, a: 'Mach 2 is the next robot, currently in design. Mach 1 is the one that exists today.' },
    { re: /mach|robot|hardware|drone|power|beam/i, a: 'Hardware: Mach 1 is the working robot, Mach 2 is in design, and there are early tiles for a drone and for power beaming research. Use the Hardware filter to see them together.' },
    { re: /archive/i, a: 'The Archive shows Earth, the Moon and the sky as they were at any moment, built from public scientific data. It is live; click its tile to open it.' },
    { re: /airremote|air\s*remote|airpod/i, a: 'AirRemote is a software project in progress. See its tile for the latest.' },
    { re: /gideon|agent|task|iphone|mac\b/i, a: 'I am Gideon, an agent and task manager on iPhone and Mac. My tile has the details.' },
    { re: /resilife|commercial|video|quote|calculator/i, a: 'ResiLife is an app, and its commercial plays from its tile. The Quote Calculators tile links to the commercial and retainer quote calculators.' },
    { re: /lidi|redstone|venture|company|business|hire|work with/i, a: 'Taylor runs Redstone Laboratories, LLC, also known as LIDI (lidisolutions.ai). For work together, use the contact details on this page.' },
    { re: /contact|email|phone|reach/i, a: 'The contact details are in the Contact section of this page.' },
    { re: /software|app|code/i, a: 'Software highlights: The Archive, Gideon, FORGE, ResiLife, the Quote Calculators, Black Book and AirRemote. Use the Software filter to see them together.' },
  ];

  function gideonReply(text) {
    const hit = gideonAnswers.find((x) => x.re.test(text));
    return hit ? hit.a : 'Start with The Archive: Earth, the Moon and the sky as they were at any moment, built from public scientific data. Then Mach 1, and me: Gideon, an agent and task manager on iPhone and Mac.';
  }

  function sendToGideon() {
    const text = gInput.value.trim();
    if (!text) return;
    addGideonMessage(text, true);
    gInput.value = '';
    const typing = document.createElement('div');
    typing.className = 'g-msg';
    typing.innerHTML = '<div class="g-typing"><span></span><span></span><span></span></div>';
    gMsgs.appendChild(typing);
    gMsgs.scrollTop = gMsgs.scrollHeight;
    setTimeout(() => { typing.remove(); addGideonMessage(gideonReply(text)); }, 420);
  }

  document.querySelectorAll('[data-open-gideon]').forEach((b) => b.addEventListener('click', openGideon));
  gClose.addEventListener('click', closeGideon);
  gSend.addEventListener('click', sendToGideon);
  gInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendToGideon(); });
  if (gPrompts) {
    gPrompts.querySelectorAll('.g-prompt').forEach((btn) => {
      btn.addEventListener('click', () => { gInput.value = btn.dataset.q || ''; sendToGideon(); });
    });
  }

  const videoOverlay = document.getElementById('videoOverlay');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoClose = document.getElementById('videoClose');
  const videoFallback = document.getElementById('videoFallback');

  function openVideo() {
    videoOverlay.classList.add('open');
    videoFallback.style.display = 'none';
    videoPlayer.style.display = 'block';
    const p = videoPlayer.play();
    if (p) p.catch(() => { videoPlayer.style.display = 'none'; videoFallback.style.display = 'block'; });
  }
  function closeVideo() {
    videoOverlay.classList.remove('open');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  document.querySelectorAll('.tile-video').forEach((tile) => {
    tile.addEventListener('click', openVideo);
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(); }
    });
  });
  videoClose.addEventListener('click', closeVideo);
  videoOverlay.addEventListener('click', (e) => { if (e.target === videoOverlay) closeVideo(); });
  videoPlayer.addEventListener('error', () => { videoPlayer.style.display = 'none'; videoFallback.style.display = 'block'; });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (videoOverlay.classList.contains('open')) closeVideo();
    else if (gDrawer.classList.contains('open')) closeGideon();
  });

  const contactForm = document.getElementById('contact-form');
  const statusMsg = document.getElementById('status-msg');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      statusMsg.textContent = 'Sending…';
      statusMsg.classList.add('show');
    });
  }
})();
