import express from "express";
import env from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { router } from "./src/routes/auth.js";
import bodyParser from "body-parser";

env.config();
const port = 3000;
const app = express();
const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  Credential: true,
  optionsSuccessStatus: 204,
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "lax"
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
