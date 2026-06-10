import client from "./client";

export const loginApi = async (

  email: string,

  password: string,

) => {

  const response = await client.post(

    "/api/auth/login",

    {

      email,

      password,

    }

  );

  return response.data;

};

export const registerApi = async (

  payload: {

    first_name: string;

    last_name: string;

    email: string;

    password: string;

  }

) => {

  const response = await client.post(

    "/api/auth/register",

    payload

  );

  return response.data;

};

export const meApi = async () => {

  const response = await client.get(

    "/api/auth/me"

  );

  return response.data;

};