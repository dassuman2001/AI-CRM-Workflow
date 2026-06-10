import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import TaskForm from "../../components/tasks/TaskForm";

import { createTask } from "../../api/task.api";

export default function CreateTask() {

  const navigate = useNavigate();

  const handleSubmit = async (

    values: any

  ) => {

    await createTask(

      values

    );

    navigate(

      "/tasks"

    );

  };

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">

        Create Task

      </h1>

      <TaskForm

        onSubmit={handleSubmit}

      />

    </MainLayout>

  );

}