import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {

  getNotes,

  deleteNote,

} from "../../api/note.api";

import NoteList from "../../components/notes/NoteList";

import {

  exportNotesCSV,

  downloadCSV,

} from "../../api/export.api";

export default function NotesPage() {

  const [notes, setNotes] =

    useState<any[]>([]);

  const [loading, setLoading] =

    useState(true);

  const [search, setSearch] =

    useState("");

  const [page, setPage] =

    useState(1);

  const pageSize = 10;

  useEffect(() => {

    loadNotes();

  }, []);

  const loadNotes = async () => {

    try {

      const data =

        await getNotes();

      setNotes(data);

    } finally {

      setLoading(false);

    }

  };

  const removeNote = async (

    id: number

  ) => {

    if (

      !window.confirm(

        "Delete this note?"

      )

    ) {

      return;

    }

    await deleteNote(id);

    loadNotes();

  };

  const handleExport = async () => {

    const blob =

      await exportNotesCSV();

    downloadCSV(

      blob,

      "notes.csv"

    );

  };

  const filteredNotes = useMemo(() => {

    return notes.filter(

      (note: any) =>

        note.title

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          ) ||

        note.content

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          )

    );

  }, [

    notes,

    search,

  ]);

  const totalPages = Math.ceil(

    filteredNotes.length /

      pageSize

  );

  const paginatedNotes =

    filteredNotes.slice(

      (page - 1) * pageSize,

      page * pageSize

    );

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">

            Notes

          </h1>

          <p className="text-gray-500 mt-1">

            Store and organize CRM notes

          </p>

        </div>

        <div className="flex gap-3">

          <button

            onClick={handleExport}

            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

          >

            Export CSV

          </button>

          <Link

            to="/notes/create"

            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"

          >

            + New Note

          </Link>

        </div>

      </div>

      <input

        value={search}

        onChange={(e) => {

          setSearch(

            e.target.value

          );

          setPage(1);

        }}

        placeholder="Search notes..."

        className="border rounded-lg w-full px-4 py-3 mb-6"

      />

      {loading ? (

        <div className="space-y-3">

          {[1,2,3,4,5].map(

            (item) => (

              <div

                key={item}

                className="h-24 bg-gray-200 rounded-lg animate-pulse"

              />

            )

          )}

        </div>

      ) : filteredNotes.length === 0 ? (

        <div className="bg-white border rounded-xl p-16 text-center">

          <div className="text-6xl">

            📝

          </div>

          <h2 className="text-2xl font-semibold mt-4">

            No Notes Found

          </h2>

          <p className="text-gray-500 mt-2">

            Create your first note to organize customer information.

          </p>

          <Link

            to="/notes/create"

            className="inline-block mt-6 bg-purple-600 text-white px-5 py-2 rounded-lg"

          >

            Create Note

          </Link>

        </div>

      ) : (

        <>

          <NoteList

            notes={

              paginatedNotes

            }

            onDelete={

              removeNote

            }

          />

          <div className="flex justify-between items-center mt-6">

            <div className="text-sm text-gray-500">

              Showing{" "}

              {

                (page - 1) *

                  pageSize +

                1

              }

              -

              {

                Math.min(

                  page *

                    pageSize,

                  filteredNotes.length

                )

              }

              {" "}of{" "}

              {

                filteredNotes.length

              }

              {" "}notes

            </div>

            <div className="flex gap-2">

              <button

                disabled={

                  page === 1

                }

                onClick={() =>

                  setPage(

                    page - 1

                  )

                }

                className="border px-4 py-2 rounded disabled:opacity-50"

              >

                Previous

              </button>

              <span className="border px-4 py-2 rounded bg-gray-100">

                {page}

              </span>

              <button

                disabled={

                  page ===

                    totalPages ||

                  totalPages ===

                    0

                }

                onClick={() =>

                  setPage(

                    page + 1

                  )

                }

                className="border px-4 py-2 rounded disabled:opacity-50"

              >

                Next

              </button>

            </div>

          </div>

        </>

      )}

    </MainLayout>

  );

}