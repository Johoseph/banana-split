g.clear();

const vw = g.getWidth();
const vh = g.getHeight();

let data = require("Storage").readJSON("banana-count") || [];

const screenConfig = [
  {
    colour: "#CAFFBF",
    layout: [
      {
        text: "TOTAL",
        font: "6x8:3x3",
        x: vw / 2,
        y: 30,
      },
      {
        text: data.length,
        font: "6x8:9x9",
        x: vw / 2,
        y: vh / 2,
      },
      {
        text: "eaten",
        font: "6x8:3x3",
        x: 110,
        y: 150,
      },
    ],
  },
  {
    colour: "#9BF6FF",
    layout: [
      {
        text: "GUNK",
        font: "6x8:7x7",
        x: vw / 2,
        y: vh / 2,
      },
    ],
  },
  {
    colour: "#BDB2FF",
    layout: [],
  },
  {
    colour: "#FFC6FF",
    layout: [],
  },
];

const hexToRgb = (hex) => {
  return hex
    .replace("#", "")
    .match(/.{1,2}/g)
    .map((rgb) => parseInt(rgb, 16));
};

const swipePercentage = 0.3; // how far a user must swipe to get to next/prev screen
let touchPoint = null;
let currentScreen = 0;

g.setColor(screenConfig[currentScreen].colour);
g.fillRect(0, 0, vw, vh);

// Render screen content
g.setColor("#333333");
g.setFontAlign(0, 0);

screenConfig[currentScreen].layout.forEach((item) => {
  g.setFont(item.font);
  g.drawString(item.text, item.x, item.y);
});

// @dir: "next" | "prev"
const drawScreens = (dir, distance) => {
  // Background
  g.setColor(
    screenConfig[dir === "prev" ? currentScreen - 1 : currentScreen].colour
  );
  g.fillRect(0, 0, distance, vh);

  g.setColor(
    screenConfig[dir === "prev" ? currentScreen : currentScreen + 1].colour
  );
  g.fillRect(distance, 0, vw, vh);

  // Content
  g.setColor("#333333");
  screenConfig[
    dir === "prev" ? currentScreen - 1 : currentScreen
  ].layout.forEach((item) => {
    g.setFont(item.font);
    g.drawString(item.text, item.x + distance - vw, item.y);
  });

  screenConfig[
    dir === "prev" ? currentScreen : currentScreen + 1
  ].layout.forEach((item) => {
    g.setFont(item.font);
    g.drawString(item.text, item.x + distance, item.y);
  });
};

const handleDrag = (e) => {
  if (touchPoint) {
    const diff = touchPoint - e.x;

    // Backwards swipe
    if (diff < 0 && screenConfig[currentScreen - 1]) drawScreens("prev", -diff);

    // Forwards swipe
    if (diff >= 0 && screenConfig[currentScreen + 1])
      drawScreens("next", vw - diff);
  } else {
    touchPoint = e.x;
  }
};

const handleDrop = (e) => {
  let diff = touchPoint - e.x;
  const newPage = Math.abs(diff / vw) >= swipePercentage;

  if (newPage) {
    // Go to previous
    if (diff < 0 && screenConfig[currentScreen - 1]) {
      let interval = setInterval(() => {
        if (-diff <= vw) {
          drawScreens("prev", -diff);
          diff = -(diff - 2) > vw ? diff - 1 : diff - 2;
        } else {
          currentScreen--;
          clearInterval(interval);
        }
      }, [1]);
    }

    // Go to next
    if (diff >= 0 && screenConfig[currentScreen + 1]) {
      let interval = setInterval(() => {
        if (diff <= vw) {
          drawScreens("next", vw - diff);
          diff = diff + 2 > vw ? diff + 1 : diff + 2;
        } else {
          currentScreen++;
          clearInterval(interval);
        }
      }, [1]);
    }
  } else {
    if (diff < 0 && screenConfig[currentScreen - 1]) {
      let interval = setInterval(() => {
        if (-diff >= 0) {
          drawScreens("prev", -diff);
          diff = diff + 2 > 0 ? diff + 1 : diff + 2;
        } else {
          clearInterval(interval);
        }
      }, [1]);
    }

    if (diff >= 0 && screenConfig[currentScreen + 1]) {
      let interval = setInterval(() => {
        if (diff >= 0) {
          drawScreens("next", vw - diff);
          diff = diff - 2 > 0 ? diff - 1 : diff - 2;
        } else {
          clearInterval(interval);
        }
      }, [1]);
    }
  }

  touchPoint = null;
};

Bangle.on("drag", (e) => {
  if (e.b === 0) handleDrop(e);
  else handleDrag(e);
});
