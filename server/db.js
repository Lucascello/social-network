const spicedPg = require("spiced-pg");
const database = "social-network";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);
console.log(`[db] connecting to:${database}`);

module.exports.addUsers = (firstName, lastName, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
                VALUES ($1, $2, $3, $4)
                RETURNING id`;
    const params = [firstName, lastName, email, password];
    return db.query(q, params);
};

module.exports.getUsersInfo = () => {
    const q = "SELECT COUNT(*) FROM users";
    return db.query(q);
};

module.exports.getUsersInfoEmail = (email) => {
    const q = `SELECT * FROM users WHERE email = $1`;
    return db.query(q, [email]);
};

module.exports.getPasswords = (email) => {
    const q = "SELECT id, password FROM users WHERE email = $1";
    return db.query(q, [email]);
};

module.exports.resetPasswordCode = () => {
    const q = `SELECT * FROM reset_password 
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`;
    return db.query(q);
};

module.exports.setCode = (code, email) => {
    const q = `INSERT INTO reset_password (code, email)
                VALUES ($1, $2)
                RETURNING created_at`;
    const params = [code, email];
    return db.query(q, params);
};
