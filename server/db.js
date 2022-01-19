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

module.exports.getUserInfoId = (id) => {
    const q = `SELECT * FROM users WHERE id = $1`;
    return db.query(q, [id]);
};

module.exports.getUsersLatestRequest = (email) => {
    const q = `SELECT * FROM reset_password
WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`;
    return db.query(q, [email]);
};

module.exports.getPasswords = (email) => {
    const q = "SELECT id, password FROM users WHERE email = $1";
    return db.query(q, [email]);
};

module.exports.getResetPasswordCode = (code) => {
    const q = `SELECT code FROM reset_password 
    WHERE code = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`;
    return db.query(q, [code]);
};

module.exports.setCode = (code, email) => {
    const q = `INSERT INTO reset_password (code, email)
            VALUES ($1, $2)
            ON CONFLICT (email)
            DO UPDATE SET code = $1, created_at = CURRENT_TIMESTAMP
            RETURNING code, email;`;
    const params = [code, email];
    return db.query(q, params);
};

module.exports.updatePassword = (password, email) => {
    const q = `UPDATE users SET password = $1 WHERE email = $2`;
    const params = [password, email];
    return db.query(q, params);
};

module.exports.uploadProfilePic = (url, id) => {
    const q = `UPDATE users SET url = $1 WHERE id=$2 RETURNING url`;
    const params = [url, id];
    return db.query(q, params);
};

module.exports.updateUsersBio = (bio, id) => {
    const q = `UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio`;
    const params = [bio, id];
    return db.query(q, params);
};

// module.exports.updateUsersBio = (bio, id) => {
//     const q = `INSERT INTO users (bio, id)
//                 VALUES ($1, $2)
//                 ON CONFLICT (id)
//                 DO UPDATE SET bio = $1 RETURNING bio`;
//     const params = [bio, id];
//     return db.query(q, params);
// };

module.exports.findOtherUsers = (val) => {
    const q = `SELECT * FROM users WHERE first ILIKE $1 OR last ILIKE $1 LIMIT 20`;
    const params = [val + "%"];
    return db.query(q, params);
};

module.exports.getLatestUsers = () => {
    const q = "SELECT * FROM users ORDER BY id DESC LIMIT 4";
    return db.query(q);
};

module.exports.selectFriends = (sender_id, recipient_id) => {
    const q = `SELECT * FROM friendships 
                WHERE (sender_id = $1 AND recipient_id = $2) 
                OR (sender_id = $2 AND recipient_id = $1)`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.startFriendship = (sender_id, recipient_id) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING *`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.endFriendship = (sender_id, recipient_id) => {
    const q = `DELETE FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.acceptFriendship = (sender_id, recipient_id) => {
    const q = `UPDATE friendships SET accepted = true WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) RETURNING sender_id, recipient_id`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};
