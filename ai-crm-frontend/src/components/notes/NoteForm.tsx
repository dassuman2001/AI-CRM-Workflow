import { useEffect, useState } from "react";

type Props = {

  initialValues?: any;

  onSubmit: (
    values: any
  ) => void;

};

export default function NoteForm({

  initialValues,

  onSubmit,

}: Props) {

  const [form, setForm] =
    useState({

      title: "",

      content: "",

      lead_id: "",

    });

  useEffect(() => {

    if (initialValues) {

      setForm({

        title:
          initialValues.title || "",

        content:
          initialValues.content || "",

        lead_id:
          initialValues.lead_id || "",

      });

    }

  }, [initialValues]);

  const handleChange = (
    e: any
  ) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

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

          Content

        </label>

        <textarea

          rows={6}

          name="content"

          value={form.content}

          onChange={handleChange}

          className="w-full border rounded px-4 py-2"

          required

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

      <button

        type="submit"

        className="bg-purple-600 text-white px-6 py-2 rounded"

      >

        Save Note

      </button>

    </form>

  );

}