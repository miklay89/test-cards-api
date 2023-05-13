import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import errorHandler from "./utils/errorHandler";
import cardsRoutes from "./routes/cards";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/cards", cardsRoutes);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server has been started on port ${process.env.PORT || 5000}...`);
});
