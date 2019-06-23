const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const express = require("express");

const router = express.Router();

module.exports = (io) => {
    io.on("connect", (socket) => {
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

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            User.getUserById(id, (err, user) => {
                done(err, user);
            });
        });

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


        router.post("/login", passport.authenticate("local"),
            (req, res) => {
                console.log(req.user);
                res.send(req.user);
            });


        router.get("/logout", (req, res) => {
            req.logout();
            res.send(false);
        });


        router.get("/user", (req, res) => {
            res.status(200).json(req.user);
        });
    });

    return router;
};
