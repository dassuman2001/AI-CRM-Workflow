import { useEffect, useState } from "react";

import {

  useNavigate,

  useParams,

} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import CompanyForm from "../../components/companies/CompanyForm";

import {

  getCompany,

  updateCompany,

} from "../../api/company.api";

export default function EditCompany() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [company, setCompany] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadCompany();

  }, []);

  const loadCompany = async () => {

    try {

      const data =
        await getCompany(Number(id));

      setCompany(data);

    } finally {

      setLoading(false);

    }

  };

  const handleSubmit = async (
    values: any
  ) => {

    await updateCompany(

      Number(id),

      values

    );

    navigate("/companies");

  };

  if (loading) {

    return (

      <MainLayout>

        <div className="text-center py-10">

          Loading...

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">

        Edit Company

      </h1>

      <CompanyForm

        initialValues={company}

        onSubmit={handleSubmit}

      />

    </MainLayout>

  );

}