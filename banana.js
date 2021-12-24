g.clear();

const vw = g.getWidth();
const vh = g.getHeight();

let data = require("Storage").readJSON("banana-count") || [];

const banana = {
  width: 31,
  height: 32,
  bpp: 16,
  transparent: 1,
  buffer: require("heatshrink").decompress(
    atob(
      "gEBAIe1y2EiABBAoINFANfOvMhghKHmOGHdve/cQwQ1BoOjvdHAIMg4I/vrXrGINSgn+14BD91OmNCBoOc+Y9pPIfl9o9FAIO0xQNBnPnPtQACHY4BDfwg94oOjB4Otuo93yfIB4Na9Y9391OXZOlimEiFChABBscMBII9lAINiwoRBvfvG4MQwRHEAA0hgm9+49RjHjDIP2pw9L7vNGI9BsGLoG8AIWbwAJBB4Y/RnPnCoPFhZ9RiFgGoP94ABJwXgP4Y9PtdtCoOT5A9NPoMY4HM0A7LAIcxPoWtuo9NxlxCYJrBHpoBB3ljHZ59FvfvHpve/YTBkHBHp/9PIn1sAxBeIIBDuWAHqoBBjHjfKGNNotR4CsCAAg/BHq75DXZ1rHYftsEQsA9JQ4Mg0AHBznzHp67DiFh+1OHp4BB5mgH44HFlNlHZ4BDrXrDINy8w9RH4ZxDAAolCHaQBBscMDofNg3+gn98Q3HAI6/BWoIdDEYKjCHaT3DTIJlBG54BJxdAXIpBReoYAB6g7aAIfdW4MgX4sxw2UyRDJPIdywAjF+tg0eA6lgAJIPBIJtqwCDFAANChBDBHoZLBPJNR4ALB1Y/M9sA/qVO1fgQoJDFiGC515A4YZHBYcIoGC4A/L7mA9tAZKPM0ExYog9PAAdqkA/LIIWgIISDO9tgYo49PAAMoUILBMIY0A+tgAIPc4OK0oDBFoNy0AnBlNlAYOz8A9PAAdR0G7YZgBH4fhyXF3fBA4NZ8AjBznzX4RTCP45JBKId798IsJBDoNgycAIKYBB4kAhFAEAUBPocg0Gj0HlYIXU0BJBAAOMuIVB737rXrQo5DBtUgIoOboDNJBoLbBC4M584nBH4oAJBoQTCAIqZBDZonVEoNKtInDJoKzBHZIBH3v3CoIZBAIbPFAoIJBT4YBBA"
    )
  ),
};

const screenConfig = [
  {
    colour: "#CAFFBF",
    layout: [
      {
        type: "text",
        content: "TOTAL",
        font: "Vector:20",
        x: vw / 2,
        y: 30,
      },
      {
        type: "text",
        content: data.length,
        font: "Vector:76",
        x: vw / 2,
        y: vh / 2,
      },
      {
        type: "image",
        content: banana,
        x: 24,
        y: 128,
      },
      {
        type: "text",
        content: "eaten",
        font: "Vector:32",
        x: 110,
        y: 146,
      },
    ],
  },
  {
    colour: "#9BF6FF",
    layout: [
      {
        type: "text",
        content: ">.<",
        font: "Vector:76",
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

const drawContent = (content, distance) => {
  switch (content.type) {
    case "image":
      g.drawImage(content.content, content.x + distance, content.y);
      break;
    case "text":
    default:
      g.setFont(content.font);
      g.drawString(content.content, content.x + distance, content.y);
      break;
  }
};

const swipePercentage = 0.3; // how far a user must swipe to get to next/prev screen
let touchPoint = null;
let currentScreen = 0;

g.setColor(screenConfig[currentScreen].colour);
g.fillRect(0, 0, vw, vh);

// Render screen content
g.setColor("#333333");
g.setFontAlign(0, 0);

screenConfig[currentScreen].layout.forEach(
  (content) => drawContent(content, 0) // No defaults for functions
);

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
  ].layout.forEach((content) => drawContent(content, distance - vw));

  screenConfig[
    dir === "prev" ? currentScreen : currentScreen + 1
  ].layout.forEach((content) => drawContent(content, distance));
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
