import client from "./client";

export const getDashboard = async () => {

  const response = await client.get(
    "/api/dashboard"
  );

  return response.data;

};