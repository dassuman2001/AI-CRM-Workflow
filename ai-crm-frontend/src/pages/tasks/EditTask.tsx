import {

  useEffect,

  useState,

} from "react";

import {

  useNavigate,

  useParams,

} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import TaskForm from "../../components/tasks/TaskForm";

import {

  getTask,

  updateTask,

} from "../../api/task.api";

export default function EditTask() {

  const { id } = useParams();

  const navigate = useNavigate();

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

  const handleSubmit = async (

    values: any

  ) => {

    await updateTask(

      Number(id),

      values

    );

    navigate(

      "/tasks"

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

        Edit Task

      </h1>

      <TaskForm

        initialValues={task}

        onSubmit={handleSubmit}

      />

    </MainLayout>

  );

}