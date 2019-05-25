const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const express = require("express");

const router = express.Router();

router.get("/createadmin", (_req, res) => {
    User.findOne(
        {
            username: "admin"
        },
        (_err, user) => {
            if (user) {
                res.status(200).send("OK");
            }
            else {
                let newUser = new User({
                    username: "administrator",
                    password:
            "$2y$12$GlsWA92yzaErHSKv.6HXeeSv0wBVt7Xeoi0hGhFozFjWZ9ROp3QuK"
                });
                User.createUser(newUser, (err, user) => {
                    if (err) throw err;
                    console.log(user);
                });
                res.status(200).send("OK");
            }
        }
    );
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, "Cannot log in", info]);
        }

        req.login(user, (_err) => {
            res.send(user);
        });
    })(req, res, next);
});

router.get("/logout", (req, res) => {
    req.logout();

    console.log("Wylogowano");

    return res.send();
});

let authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("You are not authenticated");
    }
    else {
        return next();
    }
};

router.get("/user", (req, res) => {
    // console.log(req.session);

    res.status(200).json(req.user);
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy((username, password, done) => {
        User.getUserByUsername(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: "Niepoprawny login lub hasło" });
            }

            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                }
                return done(null, false, { message: "Niepoprawny login lub hasło" });
            });
        });
    })
);

module.exports = router;
