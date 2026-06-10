interface Props {

  notes: any[];

}

export default function RecentNotesTable({

  notes,

}: Props) {

  return (

    <div className="bg-white border rounded-xl p-5 shadow-sm">

      <h2 className="text-xl font-semibold mb-5">

        Recent Notes

      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="pb-3">

              Title

            </th>

          </tr>

        </thead>

        <tbody>

          {notes.map((note) => (

            <tr

              key={note.id}

              className="border-b"

            >

              <td className="py-3">

                {note.title}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}