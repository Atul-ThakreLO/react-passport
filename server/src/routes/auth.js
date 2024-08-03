import bcrypt, { hash } from "bcrypt";
import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import db from "../db/db.js";
import env from "dotenv";

export const router = Router();
env.config({ path: "../../.env" });

// const saltRounds = process.env.SALT_ROUND || 10;

router.get("/auth", (req, res) => {
  console.log(req.session);
  console.log(req.session.passport);
  console.log(req.sessionID);
  console.log(req.signedCookies);
  console.log(req.cookies);
  if (req.isAuthenticated()) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

router.post("/signin", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  // console.log(email, password);
  // res.sendStatus(200);
  try {
    const userExist = db.query("SELECT * FROM users WHERE username = $1", [
      email,
    ]);
    const user = (await userExist).rows;
    if (user.length > 0) {
      res.send("user exists");
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          const result = await db.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          // console.log(user);
          req.logIn(user, (err) => {
            if (err) throw err;
          });
        }
      });
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth",
    failureRedirect: "/auth",
  })
);

passport.use(
  new Strategy(async (email, password, cb) => {
    try {
      const userExist = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [email]
      );
      if (userExist.rows.length > 0) {
        const user = userExist.rows[0];
        const storedPassword = user.password;
        bcrypt.compare(storedPassword, passport, (err, valid) => {
          if (err) {
            console.log("errr - compare-1", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        console.log("user not Found");
        return cb("User not found");
      }
    } catch (error) {
      console.log("error", error);
    }
  })
);
passport.deserializeUser((user, done) => {
  console.log(user);
  done(null, user);
});
passport.serializeUser((user, done) => {
  // console.log(user); 
  done(null, user);
});
