import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export const config = {
  port: process.env.PORT ? process.env.PORT : 3000,
  jwtsecret: process.env.JWT_SECRET!,
  url: process.env.URL ? process.env.URL : "http://localhost:3000",
  dburl: process.env.DATABASE_URL,
  dbkey: process.env.DATABASE_KEY,
  cronjob: process.env.NODE_ENV === "dev" ? "* * * * *" : "*/5 * * * *",
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_redirect_url: process.env.GOOGLE_REDIRECT_URL,
  meta_client_id: process.env.META_CLIENT_ID,
  meta_client_secret: process.env.META_CLIENT_SECRET,
  meta_redirect_url: process.env.META_REDIRECT_URL,
};
