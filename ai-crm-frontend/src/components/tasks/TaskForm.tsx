import { useEffect, useState } from "react";

type Props = {

  initialValues?: any;

  onSubmit: (
    values: any
  ) => void;

};

export default function TaskForm({

  initialValues,

  onSubmit,

}: Props) {

  const [form, setForm] =
    useState({

      title: "",

      description: "",

      due_date: "",

      completed: false,

      lead_id: "",

    });

  useEffect(() => {

    if (initialValues) {

      setForm({

        title:
          initialValues.title || "",

        description:
          initialValues.description || "",

        due_date:
          initialValues.due_date || "",

        completed:
          initialValues.completed || false,

        lead_id:
          initialValues.lead_id || "",

      });

    }

  }, [initialValues]);

  const handleChange = (
    e: any
  ) => {

    const {

      name,

      value,

      type,

      checked,

    } = e.target;

    setForm({

      ...form,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };

  const submit = (
    e: any
  ) => {

    e.preventDefault();

    onSubmit(form);

  };

  return (

    <form
      onSubmit={submit}
      className="bg-white border rounded-lg p-6 space-y-5"
    >

      <div>

        <label className="block mb-2 font-medium">

          Title

        </label>

        <input

          name="title"

          value={form.title}

          onChange={handleChange}

          className="w-full border rounded px-4 py-2"

          required

        />

      </div>

      <div>

        <label className="block mb-2 font-medium">

          Description

        </label>

        <textarea

          name="description"

          value={form.description}

          onChange={handleChange}

          rows={4}

          className="w-full border rounded px-4 py-2"

        />

      </div>

      <div>

        <label className="block mb-2 font-medium">

          Due Date

        </label>

        <input

          type="date"

          name="due_date"

          value={form.due_date}

          onChange={handleChange}

          className="w-full border rounded px-4 py-2"

        />

      </div>

      <div>

        <label className="block mb-2 font-medium">

          Lead ID

        </label>

        <input

          type="number"

          name="lead_id"

          value={form.lead_id}

          onChange={handleChange}

          className="w-full border rounded px-4 py-2"

        />

      </div>

      <div className="flex items-center gap-3">

        <input

          type="checkbox"

          name="completed"

          checked={form.completed}

          onChange={handleChange}

        />

        <span>

          Completed

        </span>

      </div>

      <button

        type="submit"

        className="bg-purple-600 text-white px-6 py-2 rounded"

      >

        Save Task

      </button>

    </form>

  );

}