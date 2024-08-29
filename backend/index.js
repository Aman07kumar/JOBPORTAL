import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Correct CORS configuration
const corsOptions = {
    origin: 'https://66d0598929e790f57210bf5e--astonishing-brioche-986f01.netlify.app/', 
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Error Handling Middleware (Optional but recommended)
app.use((err, req, res, next) => {
    if (err instanceof cors.CorsError) {
        res.status(401).json({ success: false, message: 'CORS Error: ' + err.message });
    } else {
        res.status(500).json({ success: false, message: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
