const path = require("path");
const express = require("express");
const cors = require("cors");
const expImg = require("express-fileupload");
const cron = require("node-cron");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const mongoose = require("./services/mongoose");
const MongoStore = require("connect-mongo");
const { port, mongo, secretKey } = require("./config");


const {
  uploadImage,
  UserRoute,
  ClassRoute,
  ResultRoute,
  ResultItemRoute,
  ScratchRoute,
  SessionRoute,
  StatsRoute,
  SubjectRoute,
  MessageRoute,
} = require("./routes");
const { Scratch } = require("./models/Scratch.model");

const db = mongoose.connection;
const app = express();

const corsOptions = {
  origin: "https://mock-school-backend.onrender.com",
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT','PATCH']
}



app.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: mongo.uri,
      collectionName: "usersessions",
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // secure: true,
    },
  })
);

app.use(cookieParser())
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
    

app.use(
  expImg({
    useTempFiles: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://main--resonance-test.netlify.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});


app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://main--resonance-test.netlify.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "*");
  res.status(200).end();
});


app.use("/stats", StatsRoute);
app.use("/users", UserRoute);
app.use("/class", ClassRoute);
app.use("/resItem", ResultItemRoute);
app.use("/result", ResultRoute);
app.use("/session", SessionRoute);
app.use("/subject", SubjectRoute);
app.use("/scratch", ScratchRoute);
app.use("/message", MessageRoute);

app.post("/scratch", async (req, res) => {
  let arr = [];
  const number = req.query.number || 10;
  // cron.schedule('* * * * *', () => {
  for (let i = 0; i < number; i++) {
    let str = uuidv4().split("-");
    str = "SMACADY" + str[str.length - 1];
    arr.push({
      user: null,
      usageCount: 0,
      card: str,
    });
  }
  const cards = await Scratch.insertMany(arr);
  return res.json(cards);
});
// })
// user, usageCount, card.

db.once("connected", function () {
  return console.log(`🍃 connected to ${mongo.uri}`);
});

app.listen(port, () => {
  console.log(`🚀 listening at http://localhost:${port}`);
});
