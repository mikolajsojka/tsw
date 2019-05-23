const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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
    const user = users.find(user => user.id === req.session.passport.user);

    console.log([user, req.session]);

    res.send({ user });
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
