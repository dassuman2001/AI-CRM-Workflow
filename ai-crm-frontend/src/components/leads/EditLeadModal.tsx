import { useState, useEffect } from "react";

import { updateLead }
from "../../api/lead.api";

interface Props {

  open: boolean;

  lead: any;

  onClose: () => void;

  onUpdated: () => void;

}

export default function EditLeadModal({

  open,

  lead,

  onClose,

  onUpdated,

}: Props) {

  const [name,setName] =
    useState("");

  const [email,setEmail] =
    useState("");

  const [company,setCompany] =
    useState("");

  const [phone,setPhone] =
    useState("");

  useEffect(() => {

    if (!lead) return;

    setName(lead.name || "");

    setEmail(lead.email || "");

    setCompany(lead.company || "");

    setPhone(lead.phone || "");

  }, [lead]);

  if (!open || !lead) return null;

  const submit = async () => {

    await updateLead(

      lead.id,

      {
        name,
        email,
        company,
        phone,
      }

    );

    onUpdated();

    onClose();

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg w-[500px]">

        <h2 className="text-xl font-bold mb-4">

          Edit Lead

        </h2>

        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <div className="flex gap-3">

          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}