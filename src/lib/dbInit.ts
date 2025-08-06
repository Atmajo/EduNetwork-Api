import { client } from "./azure";

export const dbInit = async () => {
  try {
    await client.databases.createIfNotExists({ id: "EduNetwork" });
    await client.database("EduNetwork").containers.createIfNotExists({ id: "users" });
  } catch (error) {
    console.log(error);
  }
};
