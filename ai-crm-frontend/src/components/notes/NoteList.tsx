import { Link } from "react-router-dom";

type Props = {

  notes: any[];

  onDelete: (
    id: number
  ) => void;

};

export default function NoteList({

  notes,

  onDelete,

}: Props) {

  if (!notes.length) {

    return (

      <div className="bg-white border rounded-lg p-10 text-center text-gray-500">

        No notes found.

      </div>

    );

  }

  return (

    <div className="grid gap-5">

      {notes.map((note) => (

        <div

          key={note.id}

          className="bg-white border rounded-lg p-5 shadow-sm"

        >

          <div className="flex justify-between items-start">

            <div className="flex-1">

              <h2 className="text-xl font-semibold">

                {note.title}

              </h2>

              <p className="text-gray-600 mt-3 whitespace-pre-wrap">

                {note.content}

              </p>

              <div className="mt-4 text-sm text-gray-500">

                Lead ID: {note.lead_id || "-"}

              </div>

            </div>

            <div className="flex gap-2 ml-4">

              <Link

                to={`/notes/${note.id}`}

                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"

              >

                View

              </Link>

              <Link

                to={`/notes/${note.id}/edit`}

                className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"

              >

                Edit

              </Link>

              <button

                onClick={() =>
                  onDelete(note.id)
                }

                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"

              >

                Delete

              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}