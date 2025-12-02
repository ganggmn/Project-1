import express from "express";
import { db } from "./db.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));



app.post("/register", async (req, res) => {
    const { student_id, password, username, birth, birth_first, phone, carrier } = req.body;

    // 비밀번호 암호화
    const hash = await bcrypt.hash(password, 10);

    try {
        await db.query(
            "INSERT INTO users (student_id, password, username, birth, birth_first, phone, carrier) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [student_id, hash, username, birth, birth_first, phone, carrier]
        );

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});



app.post("/login", async (req, res) => {
    const { student_id, password } = req.body;

    const [rows] = await db.query(
        "SELECT * FROM users WHERE student_id = ?",
        [student_id]
    );

    if (rows.length === 0) {
        return res.json({ success: false, msg: "존재하지 않는 계정" });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);

    if (!ok) return res.json({ success: false, msg: "비밀번호 불일치" });

    return res.json({ success: true, user });
});


app.listen(3000, () => console.log("Server running on 3000"));
