interface Props {

  leads: any[];

}

export default function RecentLeadsTable({

  leads,

}: Props) {

  return (

    <div className="border rounded-lg p-4">

      <h2 className="font-bold mb-4">

        Recent Leads

      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th>Name</th>

            <th>Company</th>

            <th>Priority</th>

            <th>AI Score</th>

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

                  {lead.priority}

                </td>

                <td>

                  {lead.ai_score}

                </td>

              </tr>

            )

          )}

        </tbody>

      </table>

    </div>

  );

}