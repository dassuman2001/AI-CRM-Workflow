import {

  useEffect,

  useState,

} from "react";

import {

  useNavigate,

  useParams,

} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import NoteForm from "../../components/notes/NoteForm";

import {

  getNote,

  updateNote,

} from "../../api/note.api";

export default function EditNote() {

  const { id } = useParams();

  const navigate = useNavigate();

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

  const handleSubmit = async (

    values: any

  ) => {

    await updateNote(

      Number(id),

      values

    );

    navigate(

      "/notes"

    );

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

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">

        Edit Note

      </h1>

      <NoteForm

        initialValues={note}

        onSubmit={handleSubmit}

      />

    </MainLayout>

  );

}