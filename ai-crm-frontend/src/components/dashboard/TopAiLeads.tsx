interface Props {

  leads: any[];

}

export default function TopAiLeadsTable({

  leads,

}: Props) {

  return (

    <div className="border rounded-lg p-4">

      <h2 className="font-bold mb-4">

        Top AI Leads

      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th>Name</th>

            <th>Company</th>

            <th>Score</th>

          </tr>

        </thead>

        <tbody>

          {leads.map(

            (lead) => (

              <tr

                key={lead.id}

              >

                <td>

                  {lead.name}

                </td>

                <td>

                  {lead.company}

                </td>

                <td>

                  {lead.score}

                </td>

              </tr>

            )

          )}

        </tbody>

      </table>

    </div>

  );

}