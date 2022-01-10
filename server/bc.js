const bcrypt = require("bcryptjs");
let { genSalt, hash, compare } = bcrypt;

module.exports.compare = compare;
module.exports.hash = (plainTextPw) =>
    genSalt().then((salt) => hash(plainTextPw, salt));
