import { useState } from "react";

interface Props {
  lead: any;
}

export default function LeadDetailsCard({
  lead,
}: Props) {

  const [copied, setCopied] =
    useState(false);

  const copyEmail = () => {

    navigator.clipboard.writeText(
      lead.followup_email || ""
    );

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  };

  return (

    <div className="space-y-6">

      <div className="bg-white border rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-4">

          {lead.name}

        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <strong>Email</strong>
            <p>{lead.email}</p>
          </div>

          <div>
            <strong>Phone</strong>
            <p>{lead.phone}</p>
          </div>

          <div>
            <strong>Company</strong>
            <p>{lead.company}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{lead.status}</p>
          </div>

          <div>
            <strong>Priority</strong>
            <p>{lead.priority}</p>
          </div>

          <div>
            <strong>AI Score</strong>
            <p>{lead.ai_score}</p>
          </div>

        </div>

      </div>

      <div className="bg-white border rounded-lg p-6">

        <h3 className="font-bold text-xl mb-3">

          AI Summary

        </h3>

        <p>

          {lead.ai_summary ||
            "No AI summary available"}

        </p>

      </div>

      <div className="bg-white border rounded-lg p-6">

        <h3 className="font-bold text-xl mb-3">

          Recommended Next Action

        </h3>

        <p>

          {lead.next_action ||
            "No recommendation available"}

        </p>

      </div>

      <div className="bg-white border rounded-lg p-6">

        <div className="flex justify-between items-center mb-4">

          <h3 className="font-bold text-xl">

            Follow Up Email

          </h3>

          <button
            onClick={copyEmail}
            className="
              text-red-400
              hover:text-red-600
              text-sm
              font-medium
              transition
            "
          >

            {copied
              ? "Copied ✓"
              : "Copy"}

          </button>

        </div>

        <pre
          className="
            whitespace-pre-wrap
            text-base
            leading-8
            overflow-auto
          "
        >

          {lead.followup_email ||
            "No email generated"}

        </pre>

      </div>

      <div className="bg-white border rounded-lg p-6">

        <h3 className="font-bold text-xl mb-3">

          Meeting Summary

        </h3>

        <p>

          {lead.meeting_summary ||
            "No meeting summary"}

        </p>

      </div>

    </div>

  );

}