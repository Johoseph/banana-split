const vw = g.getWidth();
const vh = g.getHeight();

const days = ["sun", "mon", "tues", "wed", "thur", "fri", "sat"];
const dayIndex = new Date().getDay();

let data, screenConfig, viewsData, graphData;

const swipePercentage = 0.3; // how far a user must swipe to get to next/prev screen
let touchPoint = null;
let currentScreen = 0;

const views = ["total", "daily", "monthly", "yearly"];
let currentView = [0, 1, 1];

let canDrag = true;
let canTwist = true; // Prevents twist being called on top/bottom taps

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
  width: 31,
  height: 32,
  bpp: 16,
  transparent: 1,
  buffer: require("heatshrink").decompress(
    atob(
      "gEBAKfOvOlimEiABf3v3FIN794NHznzBoIRBscMiGCPEo5BNIQAIkMEoUIBIsxkNaoV7kYBDtcGlWshOriUMoXuAIMy+EB1YBBlWvBYchw49JvOAAII3FkHAxeE7tm/1HAI+9tcDiwBBke2wv9AINlnYLE64LDH4I9FhFhA4Pa0PzgM44AHBwcjG5IBF7vJGIcTu4xDvvdhdWBodU7Q9JrXrA4NpoA9BAIPj8Y7PAIcbygxDtt8H4dEzILDAIMb28apw9F737WIeSkI9B/Y9K+1Hz0kx0kBIdst4vDlkYHoYBBlf4H4sBxY9F1t1A4MQsHNg3+g/90w7H60mk0hi0hpzHEXYoBBeoI/FP4K/DgOsHosQwQHB2lFVpo3BHYfGowNFPoozBXooBDJIMy1w9DH4UAoOBHZvmow7Bm0iXYIPH90IfYo/BrsbH49C9w9DjHjAoPE0o9NG4J1BXYIRL5uqhdVX4sj65BFHooDBmMhEpO80tioSJBwcj9vHHZesotR8Ux4sbmQ/FIYmVhOqHoorBEpINBjHAnOBhFgKII/JvcjCoMpkIVBgEhjVtH5MBxY9FW5I5BrVCA4Y5BFoIzBCYvdswhBzfkXokGKoOL42M50r2Y9DlWMHoqhJBZIvBNYLLHJIIVHtWjKY/N1Vzgw9PLoIJHPoILHBJKHDAIILHd4I9L3usqmUol27vqJZIBdHpettsD7QBD5vLHs9ioQ5B3v3AYPVTIUcjA5BxswPJUn8ni7nBAIftsg9VoOBHouj8gLBO4YbL8sC8sjIIJ7bG4IACgICBqPiBYML/I9BfIIbJPIJzXAIu0oo3BlNlHoYAB+vnvsRe4oBPZoL1ZvfvHoNa9YHBwalBo4/BP4YBPtnSHaflsy3GgPe/YGBiFgB4IfOgS5bdYIzBOoQ9CAINrtoLBoOBHtOj8gvBhFhHYoBDjHjB4LJBEJf183c0HUsABDI4IVJ9GE9VF6klWgetuo9J515JYQ/OAKY9BAIPYwkoHoWMuI9JH48xkPVgw9bwXjyFCH4OgsYpCww9LH4cpsqTDQIPlsztVkHAd4UAP4YnDHpoBDtdtC4iDCwcj4mlAIIzBJIIFBG4JRBiFgDIoAKHqABB737rXrYYYARnPnznzHr4BF1t1vfvFoIBBjHjAoZPBxlxKoIpVA="
    )
  ),
};

const fearFace = {
  width: 31,
  height: 32,
  bpp: 16,
  transparent: 1,
  buffer: require("heatshrink").decompress(
    atob(
      "gEBAKvOvOlimEiABF40YEq4BR3v3scMiGCMh8xw2UyQ5hoUIFosZksyldC9wBFkNnhFhCYZTBQ4I7ZvfvEYnDpdQus5wv9AJtcikhw6DFaYI7TOoppBG54BJsl2SIKBDUII7PlNlC4KfBtnXHbIBFZ4JjDP5ta9bpDvubDoN97tU/VEzMj69djYxJCYM0nE8rNM3VtvgNDnWNP4Y/J1t1O4olBG4MLq0DiwBDlf4HpNlnYTFAIJVBBYJ/Ff4I9HJIINBrkULIMb243FIYIjBJIKvLB4J5BPoJZFqnaUYMQ4YxBznzHYd794JBkOHEIMTu4ZBjeXTooBVTYY/DaoNkuwzCgg9DWYIJBBoIbBHIMj7BxNAKZ5BQII9BA4JvBPobzDjMlDY+233fr/nv/Pj22q/GiQBB70u80tAIIJD30T43dDIe+72OjopFqeyG4NKtNrtoFBoXuCIvXn//ABH++H+o4BIpP/3YXH+/fz1dYombG4IABnPnW4WWB4fO/odD88c40YH41qHo//zIPD62aDIv3P4yxBHIL1DBION/nOiIuBDIIfBiGCB4Mxw33zwmCmo9GtQzD0sUNYdjhgLD+3Tz0ZGYMp9IRDAAOV7PulZhCAAVzxwRFMomZHo2tDIdChAZFSwkzCoPGiVr94RFT4wACymSCIq/BBgV4Ho2MDIZ1BC4chgg9EiQXDwdFHplWDAeMuNrtu9+73E+D3I7gNB999DIfe/YZEtQVDuXDHIMpsoDB6sGb4z5CABFWHY67HABC3CAIdBwI5BrXrAYOj8glGH4N4D4hFBEIw/KzIZE7n+54THiFgHIOc+YDBqPiFZwBi4mlW4kBfIf184fRzfkTYJfBmMhb4Pt44dRsVCGoOMuI9BXYeDkYdPrQdCAA5DB5sGDpvlswXD737HoIDCD4QPBDpd7kY7JAAcg4A9NdYITBOoS3BAIVrtoLBUoIdLhFgHpoABY4IdJ0fkB4MIsI7FAIcY8YPBZIIdHU4I7PAAKNBDo/VDomtuo9J515JYQ/KALO0orlBFIKtCHZA/JmMhLII7bwcjO4bxHH5spsobDQIPlsw5TdoMg4AfDxlxHaIBFSIQAEQYJlB4mlAIIzBJIIFBG4JRBV4YABL4JjBHa4BD737S4LDDACI5BznzHLYBJ1t1vfvnPnAIMY8YFDJ4KtBKoInT"
    )
  ),
};

Array.prototype.at = function (int) {
  if (int >= 0) return this[int];
  return this[this.length + int];
};

// Inject graph points into screenConfig
const injectGraphPoints = () => {
  const px = (vw - 25 - 15) / 6;
  const py = (vw - 25 - 15) / 4;

  graphData.forEach((entry, index) => {
    const ox = index * px;
    const oyf = entry.fit * py;
    const oys = entry.split * py;

    if (index !== graphData.length - 1) {
      const nox = (index + 1) * px;
      const noyf = graphData[index + 1].fit * py;
      const noys = graphData[index + 1].split * py;

      screenConfig[3].layout.push(
        // 'Split' lines
        {
          type: "line",
          colour: screenConfig[2].colour,
          x: [25 + ox, 25 + nox],
          y: [vh - 25 - oys, vh - 25 - noys],
        },
        {
          type: "line",
          colour: screenConfig[2].colour,
          x: [26 + ox, 26 + nox],
          y: [
            vh - 25 - oys + (oys > noys ? -1 : 1),
            vh - 25 - noys + (oys > noys ? -1 : 1),
          ],
        },

        // 'Split' lines
        {
          type: "line",
          colour: screenConfig[1].colour,
          x: [25 + ox, 25 + nox],
          y: [vh - 25 - oyf, vh - 25 - noyf],
        },
        {
          type: "line",
          colour: screenConfig[1].colour,
          x: [26 + ox, 26 + nox],
          y: [
            vh - 25 - oyf + (oyf > noyf ? -1 : 1),
            vh - 25 - noyf + (oyf > noyf ? -1 : 1),
          ],
        }
      );
    }

    screenConfig[3].layout.push(
      // 'Split' points
      {
        type: "rect",
        fill: screenConfig[2].colour,
        x: [22 + ox, 29 + ox],
        y: [vh - 22 - oys, vh - 29 - oys],
      },

      // 'Fit' points
      {
        type: "rect",
        fill: screenConfig[1].colour,
        x: [22 + ox, 29 + ox],
        y: [vh - 22 - oyf, vh - 29 - oyf],
      }
    );
  });
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

const render = (fetch, noConfig) => {
  g.clear();

  if (fetch) {
    data = require("Storage").readJSON("banana-split-storage") || [];

    viewsData = {
      eaten: {},
      fit: {},
      split: {},
    };

    // Set 'eaten' view data
    viewsData.eaten.total = data.length;
    viewsData.eaten.yearly = data.filter(
      (entry) => entry.dt.substr(0, 4) === new Date().toISOString().substr(0, 4)
    ).length;
    viewsData.eaten.monthly = data.filter(
      (entry) => entry.dt.substr(0, 7) === new Date().toISOString().substr(0, 7)
    ).length;
    viewsData.eaten.daily = data.filter(
      (entry) =>
        entry.dt.substr(0, 10) === new Date().toISOString().substr(0, 10)
    ).length;

    // Set 'fit' view data
    const fitData = data.filter((entry) => entry.fit === 1);

    viewsData.fit.total = fitData.length;
    viewsData.fit.yearly = fitData.filter(
      (entry) => entry.dt.substr(0, 4) === new Date().toISOString().substr(0, 4)
    ).length;
    viewsData.fit.monthly = fitData.filter(
      (entry) => entry.dt.substr(0, 7) === new Date().toISOString().substr(0, 7)
    ).length;
    viewsData.fit.daily = fitData.filter(
      (entry) =>
        entry.dt.substr(0, 10) === new Date().toISOString().substr(0, 10)
    ).length;

    // Set 'split' view data
    const splitData = data.filter((entry) => entry.fit === 0);

    viewsData.split.total = splitData.length;
    viewsData.split.yearly = splitData.filter(
      (entry) => entry.dt.substr(0, 4) === new Date().toISOString().substr(0, 4)
    ).length;
    viewsData.split.monthly = splitData.filter(
      (entry) => entry.dt.substr(0, 7) === new Date().toISOString().substr(0, 7)
    ).length;
    viewsData.split.daily = splitData.filter(
      (entry) =>
        entry.dt.substr(0, 10) === new Date().toISOString().substr(0, 10)
    ).length;

    // Set graph data
    graphData = [];

    for (let i = 0; i < 7; i++) {
      let dt = new Date();
      dt.setDate(new Date().getDate() - i);

      const dateData = data.filter(
        (entry) => entry.dt.substr(0, 10) === dt.toISOString().substr(0, 10)
      );

      graphData.push({
        fit: dateData.filter((entry) => entry.fit === 1).length,
        split: dateData.filter((entry) => entry.fit === 0).length,
      });
    }

    graphData.reverse();
  }

  if (!noConfig) {
    screenConfig = [
      {
        colour: "#FDFFB6",
        layout: [
          {
            type: "image",
            content: banana,
            x: 24,
            y: 16,
          },
          {
            type: "text",
            content: "eaten",
            font: "Vector:32",
            x: 110,
            y: 34,
          },
          {
            type: "text",
            content: viewsData.eaten[views[currentView[0]]],
            font: `Vector:${data.length.toString().length >= 4 ? "52" : "76"}`,
            x: vw / 2,
            y: vh / 2 + 8,
          },
          {
            type: "text",
            content: views[currentView[0]].toUpperCase(),
            font: "Vector:20",
            x: vw / 2,
            y: 148,
          },
        ],
      },
      {
        colour: "#CAFFBF",
        layout: [
          {
            type: "text",
            content: "fit",
            font: "Vector:32",
            x: 65,
            y: 34,
          },
          {
            type: "image",
            content: partyFace,
            x: 93,
            y: 16,
          },
          {
            type: "text",
            content: viewsData.fit[views[currentView[1]]],
            font: `Vector:${data.length.toString().length >= 4 ? "52" : "76"}`,
            x: vw / 2,
            y: vh / 2 + 8,
          },
          {
            type: "text",
            content: views[currentView[1]].toUpperCase(),
            font: "Vector:20",
            x: vw / 2,
            y: 148,
          },
        ],
      },
      {
        colour: "#FFADAD",
        layout: [
          {
            type: "text",
            content: "split",
            font: "Vector:32",
            x: 67,
            y: 34,
          },
          {
            type: "image",
            content: fearFace,
            x: 109,
            y: 16,
          },
          {
            type: "text",
            content: viewsData.split[views[currentView[2]]],
            font: `Vector:${data.length.toString().length >= 4 ? "52" : "76"}`,
            x: vw / 2,
            y: vh / 2 + 8,
          },
          {
            type: "text",
            content: views[currentView[2]].toUpperCase(),
            font: "Vector:20",
            x: vw / 2,
            y: 148,
          },
        ],
      },
      {
        colour: "#FFFFFF",
        layout: [
          // Axis
          {
            type: "rect",
            fill: "#333333",
            x: [25, 26],
            y: [15, vh - 25],
          },
          {
            type: "rect",
            fill: "#333333",
            x: [25, vw - 15],
            y: [vh - 25, vh - 24],
          },
          // Grid lines
          {
            type: "line",
            fill: "#858585",
            x: [25, vw - 15],
            y: [15, 15],
          },
          {
            type: "line",
            fill: "#858585",
            x: [25, vw - 15],
            y: [15 + (vw - 40) / 4, 15 + (vw - 40) / 4],
          },
          {
            type: "line",
            fill: "#858585",
            x: [25, vw - 15],
            y: [15 + (vw - 40) / 2, 15 + (vw - 40) / 2],
          },
          {
            type: "line",
            fill: "#858585",
            x: [25, vw - 15],
            y: [15 + ((vw - 40) / 4) * 3, 15 + ((vw - 40) / 4) * 3],
          },
          // Legend
          {
            type: "text",
            content: 2,
            font: "Vector:14",
            x: 15,
            y: (vh - 10) / 2,
          },
          {
            type: "text",
            content: 4,
            font: "Vector:14",
            x: 15,
            y: 15,
          },
          {
            type: "text",
            content: days.at(dayIndex - 6),
            font: "Vector:14",
            x: 25,
            y: vh - 10,
          },
          {
            type: "text",
            content: days.at(dayIndex - 3),
            font: "Vector:14",
            x: (vw + 10) / 2,
            y: vh - 10,
          },
          {
            type: "text",
            content: days.at(dayIndex),
            font: "Vector:14",
            x: vh - 15,
            y: vh - 10,
          },
        ],
      },
    ];

    injectGraphPoints();
  }

  g.setColor(screenConfig[currentScreen].colour);
  g.fillRect(0, 0, vw, vh);

  // Render screen content
  g.setColor("#333333");
  g.setFontAlign(0, 0);

  screenConfig[currentScreen].layout.forEach(
    (content) => drawContent(content, 0) // No defaults for functions
  );

  Bangle.setLCDPower(1);
};

const handleDrag = (e) => {
  if (touchPoint) {
    const diff = touchPoint - e.x;

    // Backwards swipe
    if (diff < 0 && currentScreen !== 0 && currentScreen !== 3)
      drawScreens("prev", -diff);

    // Forwards swipe
    if (diff >= 0 && currentScreen !== 2 && currentScreen !== 3)
      drawScreens("next", vw - diff);
  } else {
    touchPoint = e.x;
  }
};

const handleDrop = (e) => {
  let diff = touchPoint - e.x;
  const newPage = Math.abs(diff / vw) >= swipePercentage;
  const pxPerDraw = 25;
  const time = 50;

  if (newPage) {
    // Go to previous
    if (diff < 0 && currentScreen !== 0 && currentScreen !== 3) {
      let interval = setInterval(() => {
        if (-diff < vw) {
          drawScreens("prev", -diff);
          diff = -(diff - pxPerDraw) > vw ? -vw : diff - pxPerDraw;
        } else {
          drawScreens("prev", vw);
          currentScreen--;
          clearInterval(interval);
        }
      }, time);
    }

    // Go to next
    if (diff >= 0 && currentScreen !== 2 && currentScreen !== 3) {
      let interval = setInterval(() => {
        if (diff < vw) {
          drawScreens("next", vw - diff);
          diff = diff + pxPerDraw > vw ? vw : diff + pxPerDraw;
        } else {
          drawScreens("next", 0);
          currentScreen++;
          clearInterval(interval);
        }
      }, time);
    }
  } else {
    if (diff < 0 && currentScreen !== 0 && currentScreen !== 3) {
      let interval = setInterval(() => {
        if (-diff > 0) {
          drawScreens("prev", -diff);
          diff = diff + pxPerDraw > 0 ? 0 : diff + pxPerDraw;
        } else {
          drawScreens("prev", 0);
          clearInterval(interval);
        }
      }, time);
    }

    if (diff >= 0 && currentScreen !== 2 && currentScreen !== 3) {
      let interval = setInterval(() => {
        if (diff > 0) {
          drawScreens("next", vw - diff);
          diff = -(diff - pxPerDraw) > 0 ? 0 : diff - pxPerDraw;
        } else {
          drawScreens("next", vw);
          clearInterval(interval);
        }
      }, time);
    }
  }
};

const handleTouch = () => {
  if (currentScreen !== 3) {
    if (currentView[currentScreen] === views.length - 1)
      currentView[currentScreen] = 0;
    else currentView[currentScreen]++;
    render(false);
  }
};

// @doesFit: 0 | 1;
const addBanana = (doesFit) => {
  const entry = {
    dt: new Date().toISOString(),
    fit: doesFit,
  };

  data.unshift(entry);

  require("Storage").writeJSON("banana-split-storage", data);
  currentScreen = doesFit === 1 ? 1 : 2;
  render(true);

  confettiCannon(doesFit);
};

const removeBanana = (doesFit) => {
  const remove = data.findIndex((entry) => {
    return (
      entry.fit === doesFit &&
      entry.dt.substr(0, 10) === new Date().toISOString().substr(0, 10)
    );
  });

  if (remove !== -1) data.splice(remove, 1);

  require("Storage").writeJSON("banana-split-storage", data);
  currentScreen = doesFit === 1 ? 1 : 2;
  render(true);
};

const getY = (x, index) => {
  switch (index) {
    case 1:
      return Math.pow(x - 144, 2) / 240 + 90;
    case 2:
      return Math.pow(x - 134, 2) / 170 + 70;
    case 3:
      return Math.pow(x - 110, 2) / 40 + 70;
    case 5:
      return Math.pow(x - 55, 2) / 150 + 60;
    case 0:
    case 4:
    default:
      return Math.pow(x - 88, 2) / 102 + 100;
  }
};

const confettiCannon = (doesFit) => {
  // Do not run confetti cannon on intensive screens
  if (currentScreen === 3) return;

  canDrag = false;

  const dx = 30;
  const time = 150;
  let points = [];

  for (let i = 0; i < 6; i++) {
    points.push({
      x: i < 3 ? 0 : vw,
      rotate: 0,
      image: doesFit === 2 ? banana : doesFit === 1 ? partyFace : fearFace,
    });
  }

  let interval = setInterval(() => {
    render(false, true);
    for (let i = 0; i < 6; i++) {
      const p = points[i];
      g.drawImage(p.image, p.x, getY(p.x, i), { rotate: p.rotate });

      if (i < 3) p.x += dx;
      else p.x -= dx;
      if (i % 2 === 0) p.rotate += 0.1;
      else p.rotate -= 0.1;
    }
  }, time);

  setTimeout(() => {
    canDrag = true;
    render(false);
    clearInterval(interval);
  }, 1200);
};

Bangle.on("drag", (e) => {
  if (e.b === 0) {
    if (Math.abs(touchPoint - e.x) > 2) handleDrop(e);
    else handleTouch();

    touchPoint = null;
  } else {
    if (canDrag) handleDrag(e);
  }
});

Bangle.on("tap", (tap) => {
  canTwist = false;
  setTimeout(() => (canTwist = true), 2000);

  if (tap.dir === "top") {
    addBanana(tap.double ? 1 : 0);
    Bangle.buzz(200, 1);
    if (tap.double) setTimeout(() => Bangle.buzz(200, 1), 300);
  }

  if (tap.dir === "bottom") {
    let canRemove = false;

    // Remove 'fit' banana
    if (tap.double) canRemove = viewsData.fit.daily > 0;
    // Remove 'split' banana
    else canRemove = viewsData.split.daily > 0;

    if (canRemove) {
      removeBanana(tap.double ? 1 : 0);
      Bangle.buzz(200, 1);
      if (tap.double) setTimeout(() => Bangle.buzz(200, 1), 400);
    }
  }
});

Bangle.on("twist", () => setTimeout(() => canTwist && confettiCannon(2), 500));

setWatch(
  () => {
    if (currentScreen === 3) currentScreen = 0;
    else currentScreen = 3;
    render(false);
  },
  BTN1,
  true
);

render(true);
