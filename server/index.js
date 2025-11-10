// server/index.js
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 

// Đảm bảo cổng là 3306
process.env.DATABASE_URL = "mysql://root:mysecretpassword@mysql_db:3306/tedishop";
process.env.JWT_SECRET = "bi_mat_cua_ban_hay_thay_doi_sau"; 

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

// --- API SẢN PHẨM ---

// Endpoint 1: GET /api/products (Lấy TẤT CẢ)
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({ 
      include: { category: true },
      orderBy: { createdAt: 'desc' } 
    });
    res.json(products);
  } catch (error) { 
    console.error("Lỗi khi lấy tất cả sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" }); 
  }
});

// Endpoint 2: GET /api/products/category/:slug (Lọc theo danh mục)
app.get("/api/products/category/:slug", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { category: { slug: req.params.slug } },
      include: { category: true },
    });
    res.json(products);
  } catch (error) { 
    console.error(`Lỗi khi lấy sản phẩm theo slug (${req.params.slug}):`, error);
    res.status(500).json({ message: "Lỗi server" }); 
  }
});

// Endpoint 3: GET /api/products/:id (Lấy 1 sản phẩm)
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });
    if (product) res.json(product);
    else res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  } catch (error) { 
    console.error(`Lỗi khi lấy sản phẩm theo ID (${req.params.id}):`, error);
    res.status(500).json({ message: "Lỗi server" }); 
  }
});

// Endpoint 4 (API BẠN ĐANG BỊ THIẾU): GET /api/products/hot
app.get("/api/products/hot", async (req, res) => {
  try {
    const hotProducts = await prisma.product.findMany({
      where: { isHot: true }, // <-- CHỈ LẤY NHỮNG GAME 'isHot' = true
      include: { category: true },
    });
    res.json(hotProducts);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm hot:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// --- API XÁC THỰC ---

// Endpoint 5: POST /api/register
app.post("/api/register", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email và Mật khẩu là bắt buộc" });
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email này đã được sử dụng" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name: name || null },
    });
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Endpoint 6: POST /api/login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập Email và Mật khẩu" });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});


// --- KHỞI ĐỘNG SERVER ---
app.listen(port, () => {
  console.log(`✅ Server (Express) đang chạy tại http://localhost:${port}`);
});