import client from "./client";

export const getTasks = async () => {

  const response = await client.get(
    "/api/tasks"
  );

  return response.data;

};

export const getTask = async (

  id: number

) => {

  const response = await client.get(

    `/api/tasks/${id}`

  );

  return response.data;

};

export const createTask = async (

  payload: any

) => {

  const response = await client.post(

    "/api/tasks",

    payload

  );

  return response.data;

};

export const updateTask = async (

  id: number,

  payload: any

) => {

  const response = await client.put(

    `/api/tasks/${id}`,

    payload

  );

  return response.data;

};

export const deleteTask = async (

  id: number

) => {

  const response = await client.delete(

    `/api/tasks/${id}`

  );

  return response.data;

};