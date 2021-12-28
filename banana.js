g.clear();

const vw = g.getWidth();
const vh = g.getHeight();

let data = require("Storage").readJSON("banana-split-storage") || [];

let fitCount = data.filter((rec) => rec[Object.keys(rec)[0]] === 1).length;

// TODO: Delete once testing is complete
const addMockStorage = () => {
  const obj = {};

  obj[new Date().toISOString()] = Math.random() > 0.5 ? 1 : 0;

  data.unshift(obj);

  require("Storage").writeJSON("banana-split-storage", data);
  console.log(data);
};

setWatch(addMockStorage, BTN1, true);

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

const partyFace = {
  width: 27,
  height: 27,
  bpp: 16,
  transparent: 1,
  buffer: require("heatshrink").decompress(
    atob(
      "gEBAJ+tutzx1ChABBGru9+4KHlNlwkQiGCBYtBwM5AIUZkkA4oBBkNnAIIHDhMnBIcIsI1HjFgnHAFosg4F7kfNg3+o4BFnfygcWkd1wv9AIMb24JBhd2BIchw41HvOA+cBrMgiFgxeEF44BFpkRFYMTFYlM3QJBAINU7Q1HAIJzBNYPq8I3B9kjGZoBBxnOFYdtvgrBvvdhdWBYcTy6nBGotrtoGBqOB+fj/fjFo/Wk1ekemooHB7vJFIcj65tDHYI3FcIQ1EkMETYPdsxhJGYMWkIBBGoYBBrlQTI5vDU4LfBGot794EBybPMM4IzBHIILFNoMLqo3JAIbXFiGCkHAZpuekhnFAIu9tY1DAIMsjDfDGouc+ZpL3mluXDwcjVpYLBB4NS48Lmo5Fid2keVhMnGINa9YDB8olGzfkhFgpPilMhcoPNgwRFA4ILBnOBCYMAsU7t43FAILXDnPnT5IzBFot7kdaoQRFF4OLQ4gXBDYLhBxnOnfyAIMZozXCgFBwI1HtWjA4vt44JHA44BBI44BBF4I1L1tt0tOZ5IBZGpPuhE0m8D7QBBA4I1jjHjAILXDxswGINc2fN5YZH8sj7nBAIf+k41RiFgnPnpVpNoP189s6Q1BC5PtwnlgRpX8tmF4Nrtuc+YFB0fkNYdk2fF1gBF2sq1mo3uLPJIBLyeEF4OtusAgLZDZ4Msa4gBN3usGqLPBhFhGYUBrXrG4PE0oPBztOvsRAIt86Fsl18+B/BJYIzPSoKfDGofe/Y9BIILbBa5Vk9tDTqYjBiFgNIoBDxlxIIMxkIfKk/c0Pc4IBDBIIRF/sm9Pl9kmEYLTGAIylDCYJvLAJo1B9HE9GEsA1CznzGpI3FU4LfDAKYXBjFg5Fj7GEEYM5841LU4azCgFBwLxBOZYLBB4ITBC4IABnEhuFChA1QAIPe/ZxDAAatBFIIBDZIYADFYQAGGqI5FOYNKtMY8YjFA4ILBB4ITBC4O9+4BF515EoYA="
    )
  ),
};

const screenConfig = [
  {
    colour: "#FDFFB6",
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
        font: `Vector:${data.length.toString().length >= 4 ? "52" : "76"}`,
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
    colour: "#CAFFBF",
    layout: [
      {
        type: "text",
        content: "TOTAL",
        font: "Vector:16",
        x: vw / 2,
        y: 20,
      },
      {
        type: "text",
        content: fitCount,
        font: "Vector:58",
        x: vw / 2,
        y: 65,
      },
      {
        type: "text",
        content: "fit",
        font: "Vector:24",
        x: 68,
        y: 113,
      },
      {
        type: "image",
        content: partyFace,
        x: 90,
        y: 98,
      },
      {
        type: "circle",
        fill: "#FFFFFF",
        x: 25,
        y: 150,
        rad: 15,
      },
      {
        type: "circle",
        fill: "#FFFFFF",
        x: 67,
        y: 150,
        rad: 15,
      },
      {
        type: "circle",
        x: 25,
        y: 150,
        rad: 15,
      },
      {
        type: "circle",
        x: 67,
        y: 150,
        rad: 15,
      },
      {
        type: "rect",
        fill: "#FFFFFF",
        x: [25, 67],
        y: [135, 165],
      },
      {
        type: "line",
        x: [25, 67],
        y: [135, 135],
      },
      {
        type: "line",
        x: [25, 67],
        y: [165, 165],
      },
      {
        type: "circle",
        fill: "#FFFFFF",
        x: vw - 25,
        y: 150,
        rad: 15,
      },
      {
        type: "circle",
        fill: "#FFFFFF",
        x: vw - 67,
        y: 150,
        rad: 15,
      },
      {
        type: "circle",
        x: vw - 25,
        y: 150,
        rad: 15,
      },
      {
        type: "circle",
        x: vw - 67,
        y: 150,
        rad: 15,
      },
      {
        type: "rect",
        fill: "#FFFFFF",
        x: [vw - 25, vw - 67],
        y: [135, 165],
      },
      {
        type: "line",
        x: [vw - 25, vw - 67],
        y: [135, 135],
      },
      {
        type: "line",
        x: [vw - 25, vw - 67],
        y: [165, 165],
      },
    ],
  },
  {
    colour: "#FFADAD",
    layout: [],
  },
  {
    colour: "#FDFFB6",
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
  g.setColor(content.colour || content.fill || "#333333");

  switch (content.type) {
    case "image":
      g.drawImage(content.content, content.x + distance, content.y);
      break;
    case "circle":
      if (content.fill) {
        g.fillCircle(content.x + distance, content.y, content.rad);
      } else {
        g.drawCircle(content.x + distance, content.y, content.rad);
      }
      break;
    case "rect":
      if (content.fill) {
        g.fillRect(
          content.x[0] + distance,
          content.y[0],
          content.x[1] + distance,
          content.y[1]
        );
      } else {
        g.drawRect(
          content.x[0] + distance,
          content.y[0],
          content.x[1] + distance,
          content.y[1]
        );
      }
      break;
    case "line":
      g.drawLine(
        content.x[0] + distance,
        content.y[0],
        content.x[1] + distance,
        content.y[1]
      );
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
let currentScreen = 1;

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
