const mysql = require("mysql2");

const connectDB = () => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  db.connect((err) => {
    if (err) {
        console.error("❌ Database connection error:", err);
        process.exit(1);
    } else {
        console.log("✅ MySQL Database Connected Successfully!");
    }
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS referrals (
        id SERIAL PRIMARY KEY,
        referrerName VARCHAR(255) NOT NULL,
        referrerEmail VARCHAR(255) NOT NULL UNIQUE,
        refereeName VARCHAR(255) NOT NULL,
        refereeEmail VARCHAR(255) NOT NULL,
        courseName VARCHAR(255) NOT NULL,
        notes TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );  
`;
 

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error("❌ Error creating table:", err);
    } else {
        console.log("✅ Referrals table is ready!");
    }
});

return db;
};


module.exports = connectDB;
