import { useMemo, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import useLeads from "../../hooks/useLeads";

import LeadTable from "../../components/leads/LeadTable";

import CreateLeadModal from "../../components/leads/CreateLeadModal";

import {

  exportLeadsCSV,

  downloadCSV,

} from "../../api/export.api";

export default function LeadsPage() {

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const pageSize = 10;

  const {

    leads,

    loading,

    reload,

  } = useLeads();

  const filteredLeads = useMemo(() => {

    return leads.filter((lead: any) =>

      `${lead.name} ${lead.company} ${lead.email}`

        .toLowerCase()

        .includes(search.toLowerCase())

    );

  }, [leads, search]);

  const totalPages = Math.ceil(

    filteredLeads.length / pageSize

  );

  const paginatedLeads = filteredLeads.slice(

    (page - 1) * pageSize,

    page * pageSize

  );

  const handleExport = async () => {

    const blob = await exportLeadsCSV();

    downloadCSV(

      blob,

      "leads.csv"

    );

  };

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">

            Leads

          </h1>

          <p className="text-gray-500 mt-1">

            Manage and track your sales leads

          </p>

        </div>

      </div>

      {loading ? (

        <div className="space-y-4">

          {[1, 2, 3, 4, 5].map((item) => (

            <div

              key={item}

              className="h-16 rounded-lg bg-gray-200 animate-pulse"

            />

          ))}

        </div>

      ) : (

        <>

          <div className="flex flex-wrap gap-3 justify-between items-center mb-6">

            <input

              value={search}

              onChange={(e) => {

                setSearch(e.target.value);

                setPage(1);

              }}

              placeholder="Search leads..."

              className="border rounded-lg px-4 py-2 w-80"

            />

            <div className="flex gap-3">

              <button

                onClick={handleExport}

                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

              >

                Export CSV

              </button>

              <button

                onClick={() => setOpen(true)}

                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"

              >

                + Create Lead

              </button>

            </div>

          </div>

          {filteredLeads.length === 0 ? (

            <div className="bg-white border rounded-xl p-16 text-center">

              <div className="text-6xl">

                📄

              </div>

              <h2 className="text-2xl font-semibold mt-4">

                No Leads Found

              </h2>

              <p className="text-gray-500 mt-2">

                Create your first lead to start managing your sales pipeline.

              </p>

              <button

                onClick={() => setOpen(true)}

                className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"

              >

                Create Lead

              </button>

            </div>

          ) : (

            <>

              <LeadTable

                leads={paginatedLeads}

              />

              <div className="flex justify-between items-center mt-6">

                <div className="text-sm text-gray-500">

                  Showing{" "}

                  {(page - 1) * pageSize + 1}

                  {" - "}

                  {Math.min(

                    page * pageSize,

                    filteredLeads.length

                  )}

                  {" of "}

                  {filteredLeads.length}

                  {" leads"}

                </div>

                <div className="flex gap-2">

                  <button

                    disabled={page === 1}

                    onClick={() =>

                      setPage(page - 1)

                    }

                    className="border px-4 py-2 rounded disabled:opacity-50"

                  >

                    Previous

                  </button>

                  <span className="px-4 py-2 border rounded bg-gray-100">

                    {page}

                  </span>

                  <button

                    disabled={

                      page === totalPages ||

                      totalPages === 0

                    }

                    onClick={() =>

                      setPage(page + 1)

                    }

                    className="border px-4 py-2 rounded disabled:opacity-50"

                  >

                    Next

                  </button>

                </div>

              </div>

            </>

          )}

          <CreateLeadModal

            open={open}

            onClose={() => setOpen(false)}

            onCreated={reload}

          />

        </>

      )}

    </MainLayout>

  );

}