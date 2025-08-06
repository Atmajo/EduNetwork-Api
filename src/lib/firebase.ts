import { initializeApp, refreshToken } from "firebase-admin/app";

let app;
export const firebaseInit = (refresh_token: string) => {
  app = initializeApp({
    credential: refreshToken(refresh_token),
    
  });
};
