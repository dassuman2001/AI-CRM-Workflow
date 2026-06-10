import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  getLead,
  deleteLead,
  analyzeLead,
} from "../../api/lead.api";


import LeadDetailsCard from "../../components/leads/LeadDetailsCard";

import EditLeadModal from "../../components/leads/EditLeadModal";

export default function LeadDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [lead, setLead] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [editOpen, setEditOpen] =
    useState(false);

  const [analyzing, setAnalyzing] =
    useState(false);
  const loadLead = async () => {

    try {

      const data =
        await getLead(
          Number(id)
        );

      setLead(data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    const fetchLead = async () => {

      try {

        const data =
          await getLead(
            Number(id)
          );

        setLead(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchLead();

  }, [id]);



  const handleAnalyze = async () => {

  try {

    setAnalyzing(true);

    await analyzeLead(
      Number(id)
    );

    await loadLead();

    alert(
      "Lead analyzed successfully"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Analysis failed"
    );

  } finally {

    setAnalyzing(false);

  }

};



  const handleDelete = async () => {

    const ok = window.confirm(
      "Delete this lead?"
    );

    if (!ok) return;

    try {

      await deleteLead(
        Number(id)
      );

      alert(
        "Lead deleted successfully"
      );

      navigate("/leads");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete lead"
      );

    }

  };

  return (

    <MainLayout>

      {loading ? (

        <p>
          Loading...
        </p>

      ) : (

        <>

          <div className="flex gap-3 mb-6">

  <button
    onClick={handleAnalyze}
    disabled={analyzing}
    className="bg-purple-600 text-white px-4 py-2 rounded"
  >
    {analyzing
      ? "Analyzing..."
      : "Analyze Lead"}
  </button>

  <button
    onClick={() =>
      setEditOpen(true)
    }
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Edit Lead
  </button>

  <button
    onClick={handleDelete}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete Lead
  </button>

</div>

          <LeadDetailsCard
            lead={lead}
          />

          <EditLeadModal
            open={editOpen}
            lead={lead}
            onClose={() =>
              setEditOpen(false)
            }
            onUpdated={async () => {

              await loadLead();

            }}
          />

        </>

      )}

    </MainLayout>

  );

}