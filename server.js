const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expImg = require("express-fileupload");
const cron = require("node-cron");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const mongoose = require("./services/mongoose");
const MongoStore = require("connect-mongo");
const { port, mongo, secretKey } = require("./config");
const db = mongoose.connection;
const app = express();
// app.use(cors())
app.set("port", port);
app.use(
  cors({
    // origin: ["http://localhost:5000"],
    origin: true,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,

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
// app.use(express.static(path.join(__dirname, "public")));

app.use(
  expImg({
    useTempFiles: true,
  })
);

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

app.use("/stats", StatsRoute);
app.use("/users", UserRoute);
app.use("/class", ClassRoute);
app.use("/resItem", ResultItemRoute);
app.use("/result", ResultRoute);
app.use("/session", SessionRoute);
app.use("/subject", SubjectRoute);
app.use("/scratch", ScratchRoute);
app.use("/message", MessageRoute);

app.use('/', (req, res)=>{
  res.send('Api is running')
})
// app.use(function (error, req, res, next) {
//   if (error instanceof SyntaxError) {
//     //Handle SyntaxError here.
//     return res.status(500).send({ data: "Invalid data" });
//   } else {
//     next();
//   }
// });

// cron.schedule('* * * * *', () => {
//   for (let i = 0; i < 20; i++) {
//     let str = uuidv4().split('-')
//     str = 'SMACADY' + str[str.length - 1]
//     console.log(str)
//   }
// })

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
  // console.log(cards);
  return res.json(cards);
  // const scratchObj = {user: null, usageCount: 0, card: }
  // res.json('this is for the card')
});
// })
// user, usageCount, card.

db.once("connected", function () {
  return console.log(`🍃 connected to ${mongo.uri}`);
});

app.listen(port, () => {
  console.log(`🚀 listening at http://localhost:${port}`);
});
