import client from "./client";

export const getLeads = async () => {

  const response = await client.get(
    "/api/leads"
  );

  return response.data;

};

export const deleteLead = async (

  id: number

) => {

  const response = await client.delete(

    `/api/leads/${id}`

  );

  return response.data;

};

export const createLead = async (
  payload: any
) => {

  const response = await client.post(
    "/api/leads",
    payload
  );

  return response.data;

};

export const getLead = async (

  id: number

) => {

  const response = await client.get(

    `/api/leads/${id}`

  );

  return response.data;

};

export const updateLead = async (

  id: number,

  payload: any

) => {

  const response = await client.put(

    `/api/leads/${id}`,

    payload

  );

  return response.data;

};



export const analyzeLead = async (

  id: number

) => {

  const response = await client.post(

    `/api/leads/${id}/analyze`

  );

  return response.data;

};
