import { authorizationUrl } from "@/lib/googleOAuth";
import { Request, Response } from "express";

export const googleOAuth = async (req: Request, res: Response) => {
  try {
    const authUrl = authorizationUrl;
    
    res.status(200).redirect(authUrl)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured" });
  }
};
