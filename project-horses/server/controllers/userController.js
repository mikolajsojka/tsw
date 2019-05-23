const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const users = [
    {
        id: 1,
        name: "Jude",
        email: "user@email.com",
        password: "password"
    },
    {
        id: 2,
        name: "Emma",
        email: "emma@email.com",
        password: "password2"
    }
];
exports.create_admin = (_req, res) => {
    User.findOne(
        {
            username: "admin"
        },
        (err, user) => {
            if (user) {
                res.status(200).send("OK");
            }
            else {
                const newUser = new User({
                    username: "admin",
                    password:
            "$2y$12$GnXV53KsMDhE7QMF1jL1.uHp7eo7EUjB5AYIgtAa4ZXWKwSX9aPua"
                });
                User.createUser(newUser, (err, user) => {
                    if (err) throw err;
                    console.log(user);
                });
                res.status(200).send("OK");
            }
        }
    );
};

exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, "Cannot log in", info]);
        }

        req.login(user, (_err) => {
            res.send("Logged in");
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();

    console.log("Wylogowano");

    return res.send();
};

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("You are not authenticated");
    }
    else {
        return next();
    }
};

exports.user = (authMiddleware,
(req, res) => {
    console.log(req.session.passport);

    res.status(200).send();
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);

    done(null, user);
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password"
        },

        (username, password, done) => {
            const user = users.find(
                user => user.name === username && user.password === password
            );

            if (user) {
                done(null, user);
            }
            else {
                done(null, false, { message: "Incorrect username or password" });
            }
        }
    )
);
