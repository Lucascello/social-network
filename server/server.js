const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");

let sessionSecret = process.env.COOKIE_SECRET;

if (!sessionSecret) {
    sessionSecret = require("./secrets").COOKIE_SECRET;
}

////////////////prevent clickjacking/////////////////////////////
app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});
//////////////////////////////////////////////////////////////////

app.use(
    cookieSession({
        secret: sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(compression());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", function (req, res) {
    // Once you've setup your cookie middleware you
    // can comment in the below answer!!
    res.json({
        userId: req.session.userId,
    });
});

// add an app.post to run when your clientside wants to register a user
// in this route you want to
/* 
    register your users:
        hash their password (remember to setup bcrypt!)
        and then insert all values submitted to the db -> need to setup our database 
        stuff (module, as well as db) check your petition project !!
        IF the user registers successfully let the client side know 
        IF sth goes wrong let the client side know
  */
app.post("/register.json", (req, res) => {
    const { first, last, email, password } = req.body;
    console.log("requested body:", req.body);
    hash(password)
        .then((hashedPw) => {
            // console.log("hashedPWd :", hashedPw);
            db.addUsers(first, last, email, hashedPw)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                })
                .catch((error) => {
                    console.log("Error in adding user : ", error);
                    res.json({ success: false });
                });
        })
        .catch((error) => {
            console.log("Error In Hashing Password: ", error);
            res.json({ success: false });
        });
});

// any routes that we are adding where the client is requesting or sending over
// data to store in the database have to go ABOVE the star route below!!!!
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
