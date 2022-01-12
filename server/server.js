const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");
// const aws = require("aws-sdk");
const { sendEmail } = require("./ses.js");
const cryptoRandom = require("crypto-random-string");

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
    res.json({
        userId: req.session.userId,
    });
});

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

app.post("/login.json", (req, res) => {
    const { email, password } = req.body;

    // console.log("req.body:", req.body);
    if (email && password) {
        db.getPasswords(email).then(({ rows }) => {
            console.log("My rows in /login.json", rows);
            compare(password, rows[0].password)
                .then((match) => {
                    if (match) {
                        console.log(
                            "Whats the requestin /login.json",
                            req.body
                        );
                        req.session.userId = rows[0].id;
                        res.json({ success: true });
                    }
                })
                .catch((error) => {
                    console.log(
                        "Error In Comparing Passwords For Login: ",
                        error
                    );
                    res.json({ success: false });
                });
        });
    } else {
        res.json({ success: false });
    }
});

app.post("/requestCode.json", (req, res) => {
    const { email } = req.body;

    console.log("requested body in requestCode", req.body);
    db.getUsersInfoEmail(email).then(({ rows }) => {
        console.log("rows for the post requestCode:", rows);
        if (rows.length) {
            console.log(
                "random characters for the code:",
                cryptoRandom({ length: 6 })
            );
            db.setCode(cryptoRandom({ length: 6 }), rows[0].email).then(
                (result) => {
                    console.log(
                        "result from setting a code for reseting the password: ",
                        result
                    );
                    // console.log(
                    //     "users email to retrive code: ",
                    //     result.rows[0].email
                    // );
                    const email = result.rows[0].email;
                    const code = `Dear user, this is the code to reset your password: ${result.rows[0].code}`;
                    const subject = "Reseting your password";
                    sendEmail(subject, code, email).then(() => {
                        res.json({ success: true });
                    });
                }
            );
        } else {
            res.json({ success: false });
        }
    });
});

app.post("/resetPassword.json", (req, res) => {
    const { code, password, email } = req.body;

    console.log("requested body in resetPassword", req.body);

    db.getResetPasswordCode(code).then(({ rows }) => {
        if (code === rows[0].code) {
            hash(password).then((hashedPw) => {
                console.log("hashedPWd :", hashedPw);
                console.log("email :", email);
                console.log("password :", password);
                db.updatePassword(hashedPw, email)
                    .then(({ rows }) => {
                        res.json({ success: true });
                    })
                    .catch((error) => {
                        console.log("Error in updating password : ", error);
                        res.json({ success: false });
                    });
            });
        }
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
