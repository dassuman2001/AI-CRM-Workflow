import { useState } from "react";

import { createLead }
from "../../api/lead.api";

interface Props {

  open: boolean;

  onClose: () => void;

  onCreated: () => void;

}

export default function CreateLeadModal({

  open,

  onClose,

  onCreated,

}: Props) {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [phone, setPhone] =
    useState("");

    const [message, setMessage] =
    useState("");

    const [error, setError] =
    useState("");

    const [saving, setSaving] =
    useState(false);

  if (!open) return null;

const submit = async () => {

  try {

    setSaving(true);

    setError("");

    setMessage("");

    await createLead({

      name,

      email,

      company,

      phone,

      status: "NEW",

      priority: "MEDIUM",

      source: "Website",

      estimated_value: 0,

    });

    setMessage(
      "Lead created successfully!"
    );

    onCreated();

    setTimeout(() => {

      onClose();

    }, 1200);

  } catch (err: any) {

    console.error(err);

    setError(

      err?.response?.data?.detail ||

      "Failed to create lead"

    );

  } finally {

    setSaving(false);

  }

};

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg w-[500px]">

        <h2 className="text-xl font-bold mb-4">

          Create Lead

        </h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e)=>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          placeholder="Company"
          className="border p-2 w-full mb-3"
          value={company}
          onChange={(e)=>
            setCompany(e.target.value)
          }
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full mb-3"
          value={phone}
          onChange={(e)=>
            setPhone(e.target.value)
          }
        />

        <div className="flex gap-3">

            {message && (

  <div className="mb-3 p-3 rounded bg-green-100 text-green-700">

    {message}

  </div>

)}

{error && (

  <div className="mb-3 p-3 rounded bg-red-100 text-red-700">

    {error}

  </div>

)}

        <button
            onClick={submit}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >

            {saving
                ? "Creating..."
                : "Create"}

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