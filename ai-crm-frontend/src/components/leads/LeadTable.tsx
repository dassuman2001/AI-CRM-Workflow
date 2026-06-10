import {

  Link,

} from "react-router-dom";

interface Props {
  leads: any[];
}

export default function LeadTable({
  leads,
}: Props) {

  return (

    <div className="bg-white border rounded-lg overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left px-6 py-4">
              Name
            </th>

            <th className="text-left px-6 py-4">
              Company
            </th>

            <th className="text-left px-6 py-4">
              Status
            </th>

            <th className="text-left px-6 py-4">
              Priority
            </th>

            <th className="text-left px-6 py-4">
              AI Score
            </th>

            <th className="text-left px-6 py-4">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (

            <tr
              key={lead.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {lead.name}
              </td>

              <td className="px-6 py-4">
                {lead.company}
              </td>

              <td className="px-6 py-4">

                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm">

                  {lead.status}

                </span>

              </td>

              <td className="px-6 py-4">

                <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-sm">

                  {lead.priority}

                </span>

              </td>

              <td className="px-6 py-4 font-semibold">

                {lead.ai_score}

              </td>

              <td className="px-6 py-4">

                <Link

                  to={`/leads/${lead.id}`}

                  className="text-blue-600"

                >

                  View

                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
