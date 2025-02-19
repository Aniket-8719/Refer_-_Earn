const mysql = require("mysql");

const connectDB = () => {
  const db = mysql.createConnection({
    host: "localhost",
    port: 3307, 
    user: "root",
    password: "",
    database: "refferal_db",
  });

  db.connect((err) => {
    if (err) {
      console.error("❌ Database connection error:", err);
      process.exit(1);
    } else {
      console.log("✅ MySQL Database Connected Successfully!");
    }
  });

  return db;
};

module.exports = connectDB;
