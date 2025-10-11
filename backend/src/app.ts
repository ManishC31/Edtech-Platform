import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

// import routes
import authRoutes from "./routes/auth.route";

const app: Express = express();

// middlewares
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Application is completely healthy",
  });
});

export default app;
