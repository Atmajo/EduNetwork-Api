import "./config/module-alias";

import express, { Express, Request, Response } from "express";
import { indexRouter } from "@/routers";
import { config } from "@/config/config";
import logger from "@/logger/logger";
import schedulePing from "@/lib/cron";
import { dbInit } from "./lib/dbInit";
import cors from "cors";

const app: Express = express();
const port = config.port;

app.set("trust proxy", true);
app.use(
  cors({
    credentials: true,
    origin: config.frontend_url,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(port, async () => {
  await schedulePing.start();
  await dbInit();
  logger.info(`Server is running at http://localhost:${port}`);
});
