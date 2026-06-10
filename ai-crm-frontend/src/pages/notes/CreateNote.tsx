import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import NoteForm from "../../components/notes/NoteForm";

import { createNote } from "../../api/note.api";

export default function CreateNote() {

  const navigate = useNavigate();

  const handleSubmit = async (

    values: any

  ) => {

    await createNote(

      values

    );

    navigate(

      "/notes"

    );

  };

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">

        Create Note

      </h1>

      <NoteForm

        onSubmit={handleSubmit}

      />

    </MainLayout>

  );

}