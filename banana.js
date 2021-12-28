const vw = g.getWidth();
const vh = g.getHeight();

let data, screenConfig, viewsData;

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
let currentScreen = 0;

const views = ["total", "daily", "monthly", "yearly"];
let currentView = 0;

const render = () => {
  g.clear();

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
    (entry) => entry.dt.substr(0, 10) === new Date().toISOString().substr(0, 10)
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
    (entry) => entry.dt.substr(0, 10) === new Date().toISOString().substr(0, 10)
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
    (entry) => entry.dt.substr(0, 10) === new Date().toISOString().substr(0, 10)
  ).length;

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
          content: viewsData.eaten[views[currentView]],
          font: `Vector:${data.length.toString().length >= 4 ? "52" : "76"}`,
          x: vw / 2,
          y: vh / 2 + 8,
        },
        {
          type: "text",
          content: views[currentView].toUpperCase(),
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
          content: viewsData.fit[views[currentView]],
          font: `Vector:${data.length.toString().length >= 4 ? "52" : "76"}`,
          x: vw / 2,
          y: vh / 2 + 8,
        },
        {
          type: "text",
          content: views[currentView].toUpperCase(),
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
          content: viewsData.split[views[currentView]],
          font: `Vector:${data.length.toString().length >= 4 ? "52" : "76"}`,
          x: vw / 2,
          y: vh / 2 + 8,
        },
        {
          type: "text",
          content: views[currentView].toUpperCase(),
          font: "Vector:20",
          x: vw / 2,
          y: 148,
        },
      ],
    },
    {
      colour: "#FDFFB6",
      layout: [],
    },
  ];

  g.setColor(screenConfig[currentScreen].colour);
  g.fillRect(0, 0, vw, vh);

  // Render screen content
  g.setColor("#333333");
  g.setFontAlign(0, 0);

  screenConfig[currentScreen].layout.forEach(
    (content) => drawContent(content, 0) // No defaults for functions
  );
};

render();

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
};

const handleTouch = () => {
  console.log("Touch");
  g.setColor(screenConfig[currentScreen].colour);

  g.fillRect(0, 50, vw, vh);

  if (currentView === views.length - 1) currentView = 0;
  else currentView++;
};

// @doesFit: 0 | 1;
const addBanana = (doesFit) => {
  const entry = {
    dt: new Date().toISOString(),
    fit: doesFit,
  };

  data.unshift(entry);

  require("Storage").writeJSON("banana-split-storage", data);
  render();
};

Bangle.on("drag", (e) => {
  if (e.b === 0) {
    if (Math.abs(touchPoint - e.x) > 2) handleDrop(e);
    else handleTouch();

    touchPoint = null;
  } else {
    handleDrag(e);
  }
});

Bangle.on("tap", (tap) => {
  if (tap.dir === "right") {
    addBanana(tap.double ? 1 : 0);
    Bangle.buzz(200, 1);
    if (tap.double) setTimeout(() => Bangle.buzz(200, 1), 400);
  }

  if (tap.dir === "left") {
    // Check whether there are bananas to remove
  }
});

// TODO: Remove once Bangle.on("tap") is verified
setWatch(() => addBanana(Math.random() > 0.5 ? 0 : 1), BTN1, true);
