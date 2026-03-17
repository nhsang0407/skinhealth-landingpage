const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/subscribe", async (req, res) => {
  try {
    const { name, email, phone, business } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Vui long dien day du thong tin!"
      });
    }
    
    console.log("Dang ky moi:", { name, email, phone, business });
    
    res.json({
      success: true,
      message: "Dang ky thanh cong! Chung toi se lien he voi ban trong 24h.",
      data: { name, email, phone, business }
    });
    
  } catch (error) {
    console.error("Loi:", error);
    res.status(500).json({
      success: false,
      message: "Co loi xay ra!"
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log("Backend server running on http://localhost:" + PORT);
});