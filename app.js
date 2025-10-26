import express from "express";
import "dotenv/config";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import indexRouter from "./routes/indexRouter.js";
import { nextTick } from "node:process";

dotenv.config({});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(assetsPath));
app.use("/", indexRouter);

//Error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) throw err;

  console.log("Message server running on PORT : ", PORT);
});
