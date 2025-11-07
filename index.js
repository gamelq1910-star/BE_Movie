import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import seedAdmin from "./src/seed/seedAdmin.js";
import seedMovies from "./src/seed/seedMovies.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import movieRoutes from "./src/routes/movieRoutes.js";
import showtimeRoutes from "./src/routes/showtimeRoutes.js";
import cinemaSystemRoutes from "./src/routes/cinemaSystemRoutes.js";
import cinemaRoutes from "./src/routes/cinemaRoutes.js";
import roomRoutes from "./src/routes/roomRoutes.js";
import seatLockRoutes from "./src/routes/seatLockRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import comboRoutes from "./src/routes/comboRoutes.js";
import seedCombos from "./src/seed/seedCombo.js";
import path from "path";
import {
  verifyToken,
  requireAdmin,
  requireSuperAdmin,
} from "./src/middleware/authMiddleware.js";

dotenv.config();

const app = express();

// ===== Connect DB & Seed SuperAdmin =====
connectDB()
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedAdmin();
    await seedMovies();
    await seedCombos();
  })
  .catch((err) => console.error("DB connection error:", err));

// ===== CORS configuration =====
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://fe-movie.vercel.app", // ✅ thêm domain FE trên Vercel
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);

// ===== Body parsing middleware =====
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ===== Static uploads =====
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ===== Debug middleware =====
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// ===== Routes =====
app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is healthy",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/cinema-systems", cinemaSystemRoutes);
app.use("/api/cinemas", cinemaRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/seat-locks", seatLockRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/combos", comboRoutes);

// ===== Protected routes =====
app.get("/api/admin/data", verifyToken, requireAdmin, (req, res) => {
  res.json({ msg: "Chỉ admin mới xem được" });
});

app.get("/api/superadmin/data", verifyToken, requireSuperAdmin, (req, res) => {
  res.json({ msg: "Chỉ superadmin mới xem được" });
});

// ===== Catch-all 404 =====
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", status: "fail" });
});

// ✅ KHÔNG DÙNG app.listen()
export default app;
