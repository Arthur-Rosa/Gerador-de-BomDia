const { validationResult } = require("express-validator");
const generateImageService = require("../services/generateImageService");
// const Contador = require("../models/Contador");

exports.generateImage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { periodo, tipo } = req.query;
    const imageBase64 = await generateImageService(periodo, tipo);
    const contentType = `image/${tipo}`;
    res.setHeader("Content-Type", contentType);
    res.send(Buffer.from(imageBase64.split("base64,")[1], "base64"));
  } catch (error) {
    console.error("Erro ao gerar a imagem:", error);
    res.status(500).send("Erro ao gerar a imagem");
  }
};

exports.count = async (req, res) => {
  try {
    // const contador = await Contador.findOne();

    console.log(contador);

    return res.status(200).json(contador);
  } catch (error) {
    console.error("Erro ao contar:", error);
    res.status(500).send("Erro ao contar");
  }
};
