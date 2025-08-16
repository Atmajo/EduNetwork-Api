import { getToken } from "@/lib/googleOAuth";
import { redis } from "@/lib/redis";
import { Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    tokens?: any;
  }
}

export const googleOAuthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Authorization code not found.");
  }

  try {
    const tokens = await getToken(code as string);

    req.session.tokens = tokens;

    res.redirect("/profile");
  } catch (error) {
    console.error("Error getting tokens:", error);
    res.status(500).send("Authentication failed.");
  }
};
