import client from "./client";

export const copilotChat = async (

  message: string

) => {

  const response = await client.post(

    "/api/copilot/chat",

    {
      message,
    }

  );

  return response.data;

};