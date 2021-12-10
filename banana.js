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

const swipePercentage = 0.4; // how far a user must swipe to get to next/prev screen
let touchPoint = null;
let currentScreen = 1;

g.setColor(screenConfig[currentScreen].colour);
g.fillRect(0, 0, vw, vh);

const handleDrag = (e) => {
  if (touchPoint) {
    const diff = touchPoint - e.x;

    // Backwards swipe
    if (diff < 0 && screenConfig[currentScreen - 1]) {
      g.setColor(screenConfig[currentScreen - 1].colour);
      g.fillRect(0, 0, -diff, vh);

      g.setColor(screenConfig[currentScreen].colour);
      g.fillRect(-diff, 0, vw, vh);
    }

    // Forwards swipe
    if (diff >= 0 && screenConfig[currentScreen + 1]) {
      g.setColor(screenConfig[currentScreen].colour);
      g.fillRect(0, 0, vw - diff, vh);

      g.setColor(screenConfig[currentScreen + 1].colour);
      g.fillRect(vw - diff, 0, vw, vh);
      return;
    }
  } else {
    touchPoint = e.x;
  }
};

const handleDrop = (e) => {
  const diff = touchPoint - e.x;
  const newPage = Math.abs(diff / vw) >= swipePercentage;

  if (newPage) {
    // Go to previous
    if (diff < 0 && screenConfig[currentScreen - 1]) {
      currentScreen--;
      g.setColor(screenConfig[currentScreen].colour);
    }

    // Go to next
    if (diff >= 0 && screenConfig[currentScreen + 1]) {
      currentScreen++;
      g.setColor(screenConfig[currentScreen].colour);
    }
  } else {
    g.setColor(screenConfig[currentScreen].colour);
  }

  g.fillRect(0, 0, vw, vh);
  touchPoint = null;
};

Bangle.on("drag", (e) => {
  if (e.b === 0) handleDrop(e);
  else handleDrag(e);
});
