import { client } from "@/lib/azure";
import { authorizationUrl, getToken } from "@/lib/googleOAuth";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const googleOAuthCallback = async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;

    const tokens = await getToken(code as unknown as string);

    const userData = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: "application/json",
        },
      }
    ).then((data) => data.json());

    console.log(userData);

    await client
      .database("EduNetwork")
      .container("users")
      .items.create({
        id: uuidv4(),
        name: userData.name,
        image: userData.picture ? userData.picture : "",
        email: userData.email,
        tokens,
      });

    res.status(200).json({ state });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured" });
  }
};
