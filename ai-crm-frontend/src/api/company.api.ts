import client from "./client";

export const getCompanies = async () => {
  const response = await client.get("/api/companies");
  return response.data;
};

export const getCompany = async (id: number) => {
  const response = await client.get(`/api/companies/${id}`);
  return response.data;
};

export const createCompany = async (payload: any) => {
  const response = await client.post("/api/companies", payload);
  return response.data;
};

export const updateCompany = async (
  id: number,
  payload: any
) => {
  const response = await client.put(
    `/api/companies/${id}`,
    payload
  );

  return response.data;
};

export const deleteCompany = async (id: number) => {
  const response = await client.delete(`/api/companies/${id}`);
  return response.data;
};

export const searchCompanies = async (keyword: string) => {
  const companies = await getCompanies();

  if (!keyword.trim()) {
    return companies;
  }

  const search = keyword.toLowerCase();

  return companies.filter((company: any) => {
    return (
      company.name?.toLowerCase().includes(search) ||
      company.email?.toLowerCase().includes(search) ||
      company.phone?.toLowerCase().includes(search) ||
      company.website?.toLowerCase().includes(search) ||
      company.industry?.toLowerCase().includes(search)
    );
  });
};