import {

  useEffect,

  useState,

} from "react";

import {

  Link,

  useParams,

} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { getNote } from "../../api/note.api";

export default function NoteDetail() {

  const { id } = useParams();

  const [note, setNote] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadNote();

  }, []);

  const loadNote = async () => {

    try {

      const data =
        await getNote(
          Number(id)
        );

      setNote(data);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <MainLayout>

        <div className="text-center py-10">

          Loading...

        </div>

      </MainLayout>

    );

  }

  if (!note) {

    return (

      <MainLayout>

        <div className="text-center py-10">

          Note not found.

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">

          Note Details

        </h1>

        <Link

          to={`/notes/${note.id}/edit`}

          className="bg-purple-600 text-white px-5 py-2 rounded"

        >

          Edit Note

        </Link>

      </div>

      <div className="bg-white border rounded-lg p-6 space-y-6">

        <div>

          <h3 className="text-sm text-gray-500">

            Title

          </h3>

          <p className="font-semibold">

            {note.title}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Content

          </h3>

          <p className="whitespace-pre-wrap">

            {note.content}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Lead ID

          </h3>

          <p>

            {note.lead_id || "-"}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Created At

          </h3>

          <p>

            {note.created_at || "-"}

          </p>

        </div>

      </div>

    </MainLayout>

  );

}