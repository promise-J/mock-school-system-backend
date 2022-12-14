const path = require("path");
const express = require("express");
const cors = require("cors");
const expImg = require("express-fileupload");
const cron = require("node-cron");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const mongoose = require("./services/mongoose");
const MongoStore = require("connect-mongo");
const { port, mongo, secretKey, Environment } = require("./config");


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

app.set("port", port);
app.set("trust proxy", 1);
// app.use(cors({origin: "*", credentials: true}))
app.use(cors({origin: ['http://localhost:3000'], credentials: true}))


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

// app.use(
//   session({
//     name: 'schoolID',
//     secret: secretKey,
//     resave: true,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: mongo.uri,
//       collectionName: "usersessions"
//     }),
//     cookie: {
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       secret: process.env.NODE_ENV === "production",
//       // secure: true,
//     },
//   })
//   );
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // if (true) {
    
    // app.use(express.static(path.join(__dirname, "public")));

app.use(
  expImg({
    useTempFiles: true,
  })
);


app.use("/stats", StatsRoute);
app.use("/users", UserRoute);
app.use("/class", ClassRoute);
app.use("/resItem", ResultItemRoute);
app.use("/result", ResultRoute);
app.use("/session", SessionRoute);
app.use("/subject", SubjectRoute);
app.use("/scratch", ScratchRoute);
app.use("/message", MessageRoute);


if (Environment === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
// var http = require("http");
// setInterval(function() {
//     http.get("https://resonancee.herokuapp.com");
// }, 300000); // every 5 minutes (300000)

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
  return console.log(`???? connected to ${mongo.uri}`);
});

app.listen(port, () => {
  console.log(`???? listening at http://localhost:${port}`);
});
