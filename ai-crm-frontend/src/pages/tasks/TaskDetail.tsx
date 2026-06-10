import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { getTask } from "../../api/task.api";

export default function TaskDetail() {

  const { id } = useParams();

  const [task, setTask] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadTask();

  }, []);

  const loadTask = async () => {

    try {

      const data =
        await getTask(
          Number(id)
        );

      setTask(data);

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

  if (!task) {

    return (

      <MainLayout>

        <div className="text-center py-10">

          Task not found.

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">

          Task Details

        </h1>

        <Link

          to={`/tasks/${task.id}/edit`}

          className="bg-purple-600 text-white px-5 py-2 rounded"

        >

          Edit Task

        </Link>

      </div>

      <div className="bg-white border rounded-lg p-6 space-y-6">

        <div>

          <h3 className="text-sm text-gray-500">

            Title

          </h3>

          <p className="font-semibold">

            {task.title}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Description

          </h3>

          <p>

            {task.description || "-"}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Due Date

          </h3>

          <p>

            {task.due_date || "-"}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Status

          </h3>

          <span
            className={
              task.completed
                ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
            }
          >

            {task.completed
              ? "Completed"
              : "Pending"}

          </span>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Lead ID

          </h3>

          <p>

            {task.lead_id || "-"}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            User ID

          </h3>

          <p>

            {task.user_id || "-"}

          </p>

        </div>

        <div>

          <h3 className="text-sm text-gray-500">

            Created At

          </h3>

          <p>

            {task.created_at || "-"}

          </p>

        </div>

      </div>

    </MainLayout>

  );

}