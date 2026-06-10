import client from "./client";

export const exportLeadsCSV = async () => {

  const response = await client.get(

    "/api/export/leads/csv",

    {

      responseType: "blob",

    }

  );

  return response.data;

};

export const exportCompaniesCSV = async () => {

  const response = await client.get(

    "/api/export/companies/csv",

    {

      responseType: "blob",

    }

  );

  return response.data;

};

export const exportTasksCSV = async () => {

  const response = await client.get(

    "/api/export/tasks/csv",

    {

      responseType: "blob",

    }

  );

  return response.data;

};

export const exportNotesCSV = async () => {

  const response = await client.get(

    "/api/export/notes/csv",

    {

      responseType: "blob",

    }

  );

  return response.data;

};

export const downloadCSV = (

  blob: Blob,

  filename: string

) => {

  const url = window.URL.createObjectURL(

    blob

  );

  const link = document.createElement(

    "a"

  );

  link.href = url;

  link.download = filename;

  document.body.appendChild(

    link

  );

  link.click();

  document.body.removeChild(

    link

  );

  window.URL.revokeObjectURL(

    url

  );

};