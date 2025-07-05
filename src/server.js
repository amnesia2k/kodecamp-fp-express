import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoute from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/v1", productRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
