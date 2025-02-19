const connectDB = require("../config/database");
const sendReferralEmail = require("../utils/sendReferralEmail");

exports.submitReferral = async (req, res) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail, courseName, notes } = req.body;

    console.log("Data received:", referrerName, referrerEmail, refereeName, refereeEmail, courseName, notes);

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !courseName) {
        return res.status(400).json({ message: "All required fields must be filled!" });
    }

    const db = connectDB();

    // Check if the referrer email already exists
    const checkSql = "SELECT * FROM referrals WHERE referrerEmail = ?";
    db.query(checkSql, [referrerEmail], (err, results) => {
        if (err) { 
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            console.log("⚠️ Duplicate referrer email found:", referrerEmail);
            return res.status(400).json({ message: "This email has already been used for referral!" });
        }

        // If no duplicate, proceed with inserting data
        const insertSql =
            "INSERT INTO referrals (referrerName, referrerEmail, refereeName, refereeEmail, courseName, notes) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [referrerName, referrerEmail, refereeName, refereeEmail, courseName, notes];

        db.query(insertSql, values, async (err, result) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ message: "Database error" });
            } 

            console.log("✅ Referral saved in database, sending email...");
            await sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail, courseName);

            res.status(201).json({ message: "Referral submitted successfully!", referralId: result.insertId });

            db.end();
        });
    });
};

