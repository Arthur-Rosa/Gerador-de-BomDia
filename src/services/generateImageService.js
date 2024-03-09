const jimp = require("jimp");
const path = require("path");
const getRandomPhrase = require("../utils/frases");
const { getExactlyDay } = require("../utils/index");

function searchImageUrl() {
  return `https://picsum.photos/400/400?random=${Math.random()}`;
}

function multiply(b, a = 1) {
  return a*b;
}

function getPartSatusOfTheDay(periodo) {
  if(periodo === "tarde") {
    return "Boa tarde";
  }
  return periodo === "noite" ?  "Boa noite!" : "Bom dia!";
}

const generateImageService = async (periodo) => {
  const link = searchImageUrl();
  const image = await jimp.read(link);

  const font78White = await jimp.loadFont(
    path.resolve("src", "public", "open-sans-64-white.fnt")
  );
  const font28White = await jimp.loadFont(
    path.resolve("src", "public", "open-sans-32-white.fnt")
  );

  const font78Black = await jimp.loadFont(
    path.resolve("src", "public", "open-sans-64-black.fnt")
  );
  const font28Black = await jimp.loadFont(
    path.resolve("src", "public", "open-sans-32-black.fnt")
  );

  const randomPhrase = getRandomPhrase();
  const dayText = await getExactlyDay();
  const text = getPartSatusOfTheDay(periodo);

  let border = multiply(1);

  const drawTextWithBorder = (
    fontBlack,
    fontWhite,
    x,
    y,
    text,
    borderWidth = border,
    maxWidth
  ) => {
    for (let i = -borderWidth; i <= borderWidth; i++) {
      for (let j = -borderWidth; j <= borderWidth; j++) {
        if (i !== 0 || j !== 0) {
          image.print(
            fontBlack,
            x + i,
            y + j,
            {
              text: text,
              alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
              alignmentY: jimp.VERTICAL_ALIGN_MIDDLE,
            },
            maxWidth
          );
        }
      }
    }
    image.print(
      fontWhite,
      x,
      y,
      {
        text: text,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE,
      },
      maxWidth
    );
  };

  const maxWidth = image.bitmap.width - 40;

  drawTextWithBorder(font78Black, font78White, 20, 20, text, 2, maxWidth);
  drawTextWithBorder(
    font28Black,
    font28White,
    20,
    100,
    randomPhrase,
    2,
    maxWidth
  );
  drawTextWithBorder(font28Black, font28White, 20, 340, dayText, 2, maxWidth);

  const imageBase64 = await image.getBase64Async(jimp.MIME_JPEG);
  return imageBase64;
};

module.exports = generateImageService;
