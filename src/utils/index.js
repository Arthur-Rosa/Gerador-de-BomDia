const moment = require("moment");
require('moment/locale/pt-br');

async function getImageDimension(image) {
  const width = await image.getWidth();
  const height = await image.getHeight();

  return { width, height };
}
async function getTextDimension({ font, text }) {
  const width = await jimp.measureText(font, text);
  const height = await jimp.measureTextHeight(font, text, width);

  return { width, height };
}

function getDimensionCentralPosition({ imgDimension, txtDimension }) {
  return imgDimension / 2.2 - txtDimension / 1.5;
}

async function getExactlyDay() {
  moment.locale("pt-br");

  const numberDay = await moment().format("d");
  let weekDay;

  if (numberDay == 6 || numberDay == 0) {
    const day = await moment().format("dddd");
    weekDay = `um ótimo ${day}`;
  } else {
    const day = await moment().format("dddd");
    weekDay = `uma ótima ${day}`;
  }

  return weekDay;
}

module.exports = {
  getExactlyDay,
  getDimensionCentralPosition,
  getTextDimension,
  getImageDimension,
};
