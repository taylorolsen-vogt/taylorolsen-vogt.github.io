// Speak to Gideon: the answers, shared by index.html (and its copy serious.html) and network.html.
// Each answer can offer one next step: open a project's panel (open), play the commercial (video),
// filter the tiles (filter) or scroll to a part of the landing page (go). Each page turns these into buttons itself.
const gideonAnswers = [
  { re: /\bmach\s*-?\s*2\b|\bmach\s*two\b/i, open: 'mach2', a: 'Mach 2 is the next robot, currently in design. Mach 1 is the one that exists today, and in November 2026 it delivered its first socks into the laundry basket on its own.' },
  { re: /\bmach\b|\bsocks?\b|laundry|\brobots?\b|robotics/i, open: 'mach1', a: 'Mach 1 is a home robot with an arm and cameras, and its first job is putting socks in the laundry basket. In November 2026 it delivered its first socks on its own. It looks with its wrist camera before turning its wheels, and stops and backs off if its arm meets resistance. Next it gets a small AI model running on board, and then comes Mach 2.' },
  { re: /\bdrones?\b/i, open: 'drone', a: 'The drone is Taylor’s own design, still at the concept stage.' },
  { re: /power\s*beam|beaming|wireless\s*power/i, open: 'pb', a: 'Power Beaming is electrical engineering research into sending power through the air, without wires.' },
  { re: /black\s*book/i, open: 'blackbook', a: 'Black Book is a software project. A fuller write-up and screenshots are on the way.' },
  { re: /archive/i, open: 'archive', a: 'The Archive puts public scientific data about Earth, the Solar System and the stars side by side, so things never looked at together can be cross-referenced and new questions answered. It is live in any browser and in VR headsets.' },
  { re: /air\s*remote|airpods?/i, open: 'airremote', a: 'AirRemote turns a pair of AirPods into a remote for a Mac and an iPad. It is on hold for now while the hardware side is worked out.' },
  { re: /forge|\bstl\b|sculpt|3d\s*print/i, open: 'forge', a: 'FORGE is a 3D model editor for 3D printing that runs in the browser. Open an STL, sculpt it with push, pull and smooth brushes, or describe the change in plain words and its Claude assistant makes it. Then export it, ready to print.' },
  { re: /\bquotes?\b|calculator|\bpric(e|es|ing)\b|\bretainer/i, open: 'quotes', a: 'The Quote Calculators price client work on the spot: one for AI-made commercials (length, revisions, turnaround, voiceover, music), one for short advisory retainers.' },
  { re: /resilife|commercial|\bvideo\b|\bad\b|marketing/i, video: true, a: 'ResiLife is an iPhone app, built for a client, that brings personal fitness programming to premium apartment buildings: workouts that adapt to each resident, and one place for the building to run its fitness offering. It is live on the App Store, and the commercial that launched it is here too.' },
  { re: /\bgideon\b|\b(who|what)\s+are\s+you\b|\bwhat\s+(do|can)\s+you\b|\bagents?\b|task\s*(list|manager|board)/i, open: 'gideon', a: 'I am Gideon, an agent and task manager on iPhone and Mac. Since November 2026 I also work through a team’s shared task board on my own: I pick the next story, build and test it, and put it up for review. New users can create an account on the Mac and hand me a first task, using the coding agent they already have.' },
  { re: /\blidi\b|consult/i, open: 'lidi', a: 'LIDI is a software and AI consultancy, building websites, apps and AI systems for clients. Taylor runs it together with Redstone Laboratories.' },
  { re: /redstone|\blab\b|venture|compan(y|ies)|business/i, open: 'redstone', a: 'Taylor runs Redstone Laboratories, LLC, an applied engineering lab, and LIDI (lidisolutions.ai), a software and AI consultancy. Most of the hardware and software on this page comes out of Redstone.' },
  { re: /contact|e-?mail|\bphone\b|reach|\bhire\b|work\s*with|get\s*in\s*touch|message/i, go: 'contact', a: 'Email taylor.olsen@outlook.com, or send a message with the form at the bottom of this page.' },
  { re: /taylor|\bwho\b|about\s*(him|her|them)|background|experience|\bbased\b|where|boston|engineer/i, go: 'main', a: 'Taylor Olsen-Vogt is a software and hardware engineer based in Boston, a principal engineer and co-founder. Taylor builds robots, iOS apps and AI systems, and runs Redstone Laboratories and LIDI.' },
  { re: /hardware|electr/i, filter: 'hardware', a: 'Hardware: Mach 1 is the working robot, Mach 2 is in design, and there are early tiles for a drone and for power beaming research.' },
  { re: /software|\bapps?\b|\bcode\b|coding|\bai\b|ios/i, filter: 'software', a: 'Software highlights: The Archive, Gideon, FORGE, ResiLife, the Quote Calculators, Black Book and AirRemote.' },
  { re: /^\s*(hi|hello|hey|yo|hiya|good\s*(morning|afternoon|evening))\b/i, a: 'Hello. Ask me about any project on this page, about Taylor, or how to get in touch.' },
  { re: /thank/i, a: 'You’re welcome. Ask me anything else about the projects.' },
];

const gideonStart = { open: 'archive', a: 'Start with The Archive: public scientific data about Earth, the Solar System and the stars, side by side for cross-referencing. Then Mach 1, and me: Gideon, an agent and task manager on iPhone and Mac.' };
