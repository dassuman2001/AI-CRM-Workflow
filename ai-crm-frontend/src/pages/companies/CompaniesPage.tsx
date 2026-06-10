import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  getCompanies,
  deleteCompany,
} from "../../api/company.api";

import {
  exportCompaniesCSV,
  downloadCSV,
} from "../../api/export.api";

export default function CompaniesPage() {

  const [companies, setCompanies] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const pageSize = 10;

  const loadCompanies = async () => {

    try {

      const data = await getCompanies();

      setCompanies(data);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadCompanies();

  }, []);

  const handleDelete = async (

    id: number

  ) => {

    const confirmDelete = window.confirm(

      "Delete this company?"

    );

    if (!confirmDelete) return;

    await deleteCompany(id);

    setCompanies((prev) =>

      prev.filter(

        (item) => item.id !== id

      )

    );

  };

  const handleExport = async () => {

    const blob = await exportCompaniesCSV();

    downloadCSV(

      blob,

      "companies.csv"

    );

  };

  const filtered = useMemo(() => {

    return companies.filter(

      (company) =>

        company.name

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          ) ||

        company.email

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          ) ||

        company.industry

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          )

    );

  }, [

    companies,

    search,

  ]);

  const totalPages = Math.ceil(

    filtered.length / pageSize

  );

  const paginated = filtered.slice(

    (page - 1) * pageSize,

    page * pageSize

  );

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">

            Companies

          </h1>

          <p className="text-gray-500 mt-1">

            Manage your business companies

          </p>

        </div>

        <div className="flex gap-3">

          <button

            onClick={handleExport}

            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

          >

            Export CSV

          </button>

          <Link

            to="/companies/create"

            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"

          >

            Add Company

          </Link>

        </div>

      </div>

      <input

        placeholder="Search companies..."

        value={search}

        onChange={(e) => {

          setSearch(

            e.target.value

          );

          setPage(1);

        }}

        className="border rounded-lg w-full px-4 py-3 mb-6"

      />

      {loading ? (

        <div className="space-y-3">

          {[1,2,3,4,5].map(

            (item)=>(

              <div

                key={item}

                className="h-16 bg-gray-200 rounded-lg animate-pulse"

              />

            )

          )}

        </div>

      ) : filtered.length === 0 ? (

        <div className="bg-white border rounded-xl p-16 text-center">

          <div className="text-6xl">

            🏢

          </div>

          <h2 className="text-2xl font-semibold mt-4">

            No Companies Found

          </h2>

          <p className="text-gray-500 mt-2">

            Create your first company.

          </p>

          <Link

            to="/companies/create"

            className="inline-block mt-6 bg-purple-600 text-white px-5 py-2 rounded-lg"

          >

            Add Company

          </Link>

        </div>

      ) : (

        <>

          <div className="bg-white rounded-xl border overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="text-left p-4">

                    Company

                  </th>

                  <th className="text-left p-4">

                    Email

                  </th>

                  <th className="text-left p-4">

                    Industry

                  </th>

                  <th className="text-left p-4">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                {paginated.map(

                  (company) => (

                    <tr

                      key={company.id}

                      className="border-t hover:bg-gray-50"

                    >

                      <td className="p-4 font-medium">

                        {company.name}

                      </td>

                      <td className="p-4">

                        {company.email}

                      </td>

                      <td className="p-4">

                        {company.industry}

                      </td>

                      <td className="p-4 flex gap-3">

                        <Link

                          to={`/companies/${company.id}`}

                          className="text-blue-600"

                        >

                          View

                        </Link>

                        <Link

                          to={`/companies/${company.id}/edit`}

                          className="text-green-600"

                        >

                          Edit

                        </Link>

                        <button

                          onClick={()=>

                            handleDelete(

                              company.id

                            )

                          }

                          className="text-red-600"

                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  )

                )}

              </tbody>

            </table>

          </div>

          <div className="flex justify-between items-center mt-6">

            <div className="text-sm text-gray-500">

              Showing

              {" "}

              {(page-1)*pageSize+1}

              -

              {

                Math.min(

                  page*pageSize,

                  filtered.length

                )

              }

              {" "}of{" "}

              {

                filtered.length

              }

              {" "}companies

            </div>

            <div className="flex gap-2">

              <button

                disabled={page===1}

                onClick={()=>

                  setPage(page-1)

                }

                className="border px-4 py-2 rounded disabled:opacity-50"

              >

                Previous

              </button>

              <span className="border px-4 py-2 rounded bg-gray-100">

                {page}

              </span>

              <button

                disabled={

                  page===totalPages ||

                  totalPages===0

                }

                onClick={()=>

                  setPage(page+1)

                }

                className="border px-4 py-2 rounded disabled:opacity-50"

              >

                Next

              </button>

            </div>

          </div>

        </>

      )}

    </MainLayout>

  );

}