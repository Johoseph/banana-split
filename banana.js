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

g.setColor(screenConfig[1].colour);
g.fillRect(0, 0, vw, vh);

let touchPoint = null;

const handleDrag = (e) => {
  if (touchPoint) {
    const diff = touchPoint - e.x;
    if (diff < 0) {
      g.setColor(screenConfig[0].colour);
      g.fillRect(0, 0, -diff, vh);

      g.setColor(screenConfig[1].colour);
      g.fillRect(-diff, 0, vw, vh);
    } else {
      g.setColor(screenConfig[1].colour);
      g.fillRect(0, 0, vw - diff, vh);

      g.setColor(screenConfig[2].colour);
      g.fillRect(vw - diff, 0, vw, vh);
    }
  } else touchPoint = e.x;
};

const handleDrop = (e) => {
  const diff = touchPoint - e.x;

  if (diff / vw >= 0.4) {
    console.log("next screen");
  } else {
    console.log("same screen");
  }

  touchPoint = null;
};

Bangle.on("drag", (e) => {
  if (e.b === 0) handleDrop(e);
  else handleDrag(e);
});
