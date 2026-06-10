import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {

  getTasks,

  deleteTask,

} from "../../api/task.api";

import TaskTable from "../../components/tasks/TaskTable";

import {

  exportTasksCSV,

  downloadCSV,

} from "../../api/export.api";

export default function TasksPage() {

  const [tasks, setTasks] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {

    loadTasks();

  }, []);

  const loadTasks = async () => {

    try {

      const data = await getTasks();

      setTasks(data);

    } finally {

      setLoading(false);

    }

  };

  const removeTask = async (

    id: number

  ) => {

    if (

      !window.confirm(

        "Delete this task?"

      )

    )

      return;

    await deleteTask(id);

    loadTasks();

  };

  const handleExport = async () => {

    const blob = await exportTasksCSV();

    downloadCSV(

      blob,

      "tasks.csv"

    );

  };

  const filteredTasks = useMemo(() => {

    return tasks.filter(

      (task: any) =>

        task.title

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          ) ||

        task.description

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          )

    );

  }, [

    tasks,

    search,

  ]);

  const totalPages = Math.ceil(

    filteredTasks.length / pageSize

  );

  const paginatedTasks = filteredTasks.slice(

    (page - 1) * pageSize,

    page * pageSize

  );

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">

            Tasks

          </h1>

          <p className="text-gray-500 mt-1">

            Manage your daily CRM tasks

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

            to="/tasks/create"

            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"

          >

            + New Task

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

        placeholder="Search tasks..."

        className="border rounded-lg w-full px-4 py-3 mb-6"

      />

      {loading ? (

        <div className="space-y-3">

          {[1,2,3,4,5].map(

            (item) => (

              <div

                key={item}

                className="h-16 bg-gray-200 rounded-lg animate-pulse"

              />

            )

          )}

        </div>

      ) : filteredTasks.length === 0 ? (

        <div className="bg-white border rounded-xl p-16 text-center">

          <div className="text-6xl">

            📋

          </div>

          <h2 className="text-2xl font-semibold mt-4">

            No Tasks Found

          </h2>

          <p className="text-gray-500 mt-2">

            Create your first task to stay organized.

          </p>

          <Link

            to="/tasks/create"

            className="inline-block mt-6 bg-purple-600 text-white px-5 py-2 rounded-lg"

          >

            Create Task

          </Link>

        </div>

      ) : (

        <>

          <TaskTable

            tasks={paginatedTasks}

            onDelete={removeTask}

          />

          <div className="flex justify-between items-center mt-6">

            <div className="text-sm text-gray-500">

              Showing

              {" "}

              {(page - 1) * pageSize + 1}

              -

              {

                Math.min(

                  page * pageSize,

                  filteredTasks.length

                )

              }

              {" "}of{" "}

              {

                filteredTasks.length

              }

              {" "}tasks

            </div>

            <div className="flex gap-2">

              <button

                disabled={page === 1}

                onClick={() =>

                  setPage(page - 1)

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

                  page === totalPages ||

                  totalPages === 0

                }

                onClick={() =>

                  setPage(page + 1)

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