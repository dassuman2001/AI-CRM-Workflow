import { useEffect, useState } from "react";

type Props = {
  initialValues?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function CompanyForm({
  initialValues,
  onSubmit,
  loading = false,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    industry: "",
    address: "",
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        email: initialValues.email || "",
        phone: initialValues.phone || "",
        website: initialValues.website || "",
        industry: initialValues.industry || "",
        address: initialValues.address || "",
      });
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg border p-6 space-y-5"
    >
      <div>
        <label className="block mb-2 text-sm font-medium">
          Company Name
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Phone
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Website
          </label>

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Industry
          </label>

          <input
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Address
        </label>

        <textarea
          rows={4}
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Company"}
        </button>
      </div>
    </form>
  );
}