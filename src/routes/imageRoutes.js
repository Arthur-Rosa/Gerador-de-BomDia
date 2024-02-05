const express = require('express');
const { query } = require('express-validator');
const imageController = require('../controllers/imageController');

const router = express.Router();

router.get('/gerar-imagem',
  [
    query('periodo').default('manha').isIn(['manha', 'tarde', 'noite']).withMessage("Período inválido, por favor use 'manha', 'tarde' ou 'noite'."),
    query('tipo').default('png').isIn(['png', 'jpg']).withMessage("Tipo inválido, por favor use 'png', 'jpg' ou 'svg'.")
  ],
  imageController.generateImage
);

router.get('/count', (req, res) => {
    imageController.count(req, res)
});

module.exports = router;
