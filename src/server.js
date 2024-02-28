const express = require("express");
const imageRoutes = require("./routes/imageRoutes");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const compression = require("compression");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.static('public'));

const corsOptions = {
  methods: "GET",
  origin: "*",
};

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors(corsOptions));
app.use(morgan("dev"));

/* ratelimit */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(hpp());

app.use(compression());

app.use("/api", imageRoutes);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use("/", (req, res) => {
  return res.status(200).json({
    name: "bomdia-generator",
    version: 0.9,
    status: "ok"
  })
});

app.use((req, res, next) => {
  res.status(404).json({ msg: "Não encontrado" });
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(405).json({ message: "Método não permitido" });
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
