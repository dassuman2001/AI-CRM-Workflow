import client from "./client";

export const getNotes = async () => {

  const response = await client.get(
    "/api/notes"
  );

  return response.data;

};

export const getNote = async (

  id: number

) => {

  const response = await client.get(

    `/api/notes/${id}`

  );

  return response.data;

};

export const createNote = async (

  payload: any

) => {

  const response = await client.post(

    "/api/notes",

    payload

  );

  return response.data;

};

export const updateNote = async (

  id: number,

  payload: any

) => {

  const response = await client.put(

    `/api/notes/${id}`,

    payload

  );

  return response.data;

};

export const deleteNote = async (

  id: number

) => {

  const response = await client.delete(

    `/api/notes/${id}`

  );

  return response.data;

};