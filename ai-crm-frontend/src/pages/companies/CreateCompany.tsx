import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import CompanyForm from "../../components/companies/CompanyForm";

import { createCompany } from "../../api/company.api";

export default function CreateCompany() {
  const navigate = useNavigate();

  const handleSubmit = async (
    data: any
  ) => {

    await createCompany(data);

    navigate("/companies");
  };

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Create Company
      </h1>

      <CompanyForm
        onSubmit={handleSubmit}
      />

    </MainLayout>
  );
}