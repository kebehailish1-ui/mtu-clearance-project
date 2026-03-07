const express = require('express');
const cors = require('cors');
const sql = require('mssql/msnodesqlv8'); 
const app = express();

app.use(cors());
app.use(express.json());

// በምስል fe31e477 መሠረት የተስተካከለ የግንኙነት መረጃ
const config = {
    // ሰርቨርህ 'HI' መሆኑን በምስል fe31e477 አይተናል
    server: 'localhost', 
    database: 'MTU_Clearance',
    options: {
        encrypt: true, 
        trustServerCertificate: true
    },
    // ይህ መስመር ስህተቱን ይፈታዋል
    driver: 'msnodesqlv8' 
};
app.get('/status/:id', async (req, res) => {
    try {
        const studentID = req.params.id;
        let pool = await sql.connect(config);
        
        // የሰንጠረዡ ስም clearancestatus1 መሆኑን አረጋግጥ
        let result = await pool.request()
            .input('id', sql.VarChar, studentID)
            .query("SELECT * FROM clearancestatus1 WHERE StudentID = @id");

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: "ተማሪው አልተገኘም!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "የዳታቤዝ ግንኙነት ስህተት!" });
    }
});

app.listen(3000, () => console.log("ሰርቨሩ በ 3000 ላይ ስራ ጀምሯል! - backend.js:42"));