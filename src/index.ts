import "./config/module-alias";

import express, { Express, Request, Response } from "express";
import { indexRouter } from "@/routers";
import { config } from "@/config/config";
import logger from "@/logger/logger";
import schedulePing from "@/lib/cron";
import cors from "cors";
import session from "express-session";

const app: Express = express();
const port = config.port;

app.set("trust proxy", true);
app.use(
  cors({
    credentials: true,
    origin: config.frontend_url,
  })
);
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(port, async () => {
  config.nodeenv === "production" && await schedulePing.start();
  logger.info(`Server is running at http://localhost:${port}`);
});
