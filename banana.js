g.clear();

const vw = g.getWidth();
const vh = g.getHeight();

const screenConfig = [
  {
    colour: "#CAFFBF",
  },
  {
    colour: "#9BF6FF",
  },
  {
    colour: "#BDB2FF",
  },
  {
    colour: "#FFC6FF",
  },
];

const sp = 0.4; // swipe percentage - how far a user must swipe to get to next/prev screen
let tp = null; // touch point
let cs = 1; // current screen

g.setColor(screenConfig[cs].colour);
g.fillRect(0, 0, vw, vh);

const handleDrag = (e) => {
  if (tp) {
    const diff = tp - e.x;
    if (diff < 0) {
      // Swipe to previous
      g.setColor(screenConfig[cs - 1].colour);
      g.fillRect(0, 0, -diff, vh);

      g.setColor(screenConfig[cs].colour);
      g.fillRect(-diff, 0, vw, vh);
    } else {
      // Swipe to next
      g.setColor(screenConfig[cs].colour);
      g.fillRect(0, 0, vw - diff, vh);

      g.setColor(screenConfig[cs + 1].colour);
      g.fillRect(vw - diff, 0, vw, vh);
    }
  } else tp = e.x;
};

const handleDrop = (e) => {
  const diff = tp - e.x;
  const newPage = Math.abs(diff / vw) >= 0.4;
  if (newPage) {
    if (diff < 0) {
      cs--;
      g.setColor(screenConfig[cs].colour);
    } else {
      cs++;
      g.setColor(screenConfig[cs].colour);
    }
  } else {
    g.setColor(screenConfig[cs].colour);
  }

  g.fillRect(0, 0, vw, vh);
  tp = null;
};

Bangle.on("drag", (e) => {
  if (e.b === 0) handleDrop(e);
  else handleDrag(e);
});
