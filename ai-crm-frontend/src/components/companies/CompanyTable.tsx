import { Link } from "react-router-dom";

type Props = {

  companies: any[];

  onDelete: (
    id: number
  ) => void;

};

export default function CompanyTable({

  companies,

  onDelete,

}: Props) {

  if (!companies.length) {

    return (

      <div className="bg-white border rounded-lg p-10 text-center text-gray-500">

        No companies found.

      </div>

    );

  }

  return (

    <div className="bg-white border rounded-lg overflow-hidden">

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

              Phone

            </th>

            <th className="text-left p-4">

              Website

            </th>

            <th className="text-left p-4">

              Industry

            </th>

            <th className="text-center p-4">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {companies.map(

            (company) => (

              <tr

                key={company.id}

                className="border-t hover:bg-gray-50"

              >

                <td className="p-4 font-medium">

                  {company.name}

                </td>

                <td className="p-4">

                  {company.email ||
                    "-"}

                </td>

                <td className="p-4">

                  {company.phone ||
                    "-"}

                </td>

                <td className="p-4">

                  {company.website ||
                    "-"}

                </td>

                <td className="p-4">

                  {company.industry ||
                    "-"}

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <Link
                      to={`/companies/${company.id}`}
                      className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                    >
                      View
                    </Link>

                    <Link
                      to={`/companies/${company.id}/edit`}
                      className="px-3 py-1 rounded bg-purple-600 text-white text-sm"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(
                          company.id
                        )
                      }
                      className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            )

          )}

        </tbody>

      </table>

    </div>

  );

}