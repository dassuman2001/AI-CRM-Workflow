import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { getCompany } from "../../api/company.api";

export default function CompanyDetail() {

  const { id } = useParams();

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

  if (loading) {

    return (

      <MainLayout>

        <div className="text-center py-10">

          Loading...

        </div>

      </MainLayout>

    );

  }

  if (!company) {

    return (

      <MainLayout>

        <div className="text-center py-10">

          Company not found.

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">

          {company.name}

        </h1>

        <Link

          to={`/companies/${company.id}/edit`}

          className="bg-purple-600 text-white px-5 py-2 rounded"

        >

          Edit Company

        </Link>

      </div>

      <div className="bg-white border rounded-lg p-6 space-y-5">

        <div>

          <h3 className="text-sm text-gray-500">

            Company Name

          </h3>

          <p className="font-semibold">

            {company.name}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Email

          </h3>

          <p>

            {company.email || "-"}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Phone

          </h3>

          <p>

            {company.phone || "-"}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Website

          </h3>

          <p>

            {company.website || "-"}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Industry

          </h3>

          <p>

            {company.industry || "-"}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Address

          </h3>

          <p>

            {company.address || "-"}

          </p>

        </div>

      </div>

    </MainLayout>

  );

}