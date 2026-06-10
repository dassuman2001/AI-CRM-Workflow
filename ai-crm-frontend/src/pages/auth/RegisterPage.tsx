import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerApi } from "../../api/auth.api";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    first_name: "",

    last_name: "",

    email: "",

    password: "",

    confirm_password: "",

  });

  const updateField = (

    e: React.ChangeEvent<HTMLInputElement>

  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const submit = async () => {

    if (

      !form.first_name ||

      !form.last_name ||

      !form.email ||

      !form.password

    ) {

      alert("Please fill all fields");

      return;

    }

    if (

      form.password !== form.confirm_password

    ) {

      alert("Passwords do not match");

      return;

    }

    try {

      setLoading(true);

      await registerApi({

        first_name: form.first_name,

        last_name: form.last_name,

        email: form.email,

        password: form.password,

      });

      alert(

        "Account created successfully. Please login."

      );

      navigate("/");

    } catch (error: any) {

      alert(

        error?.response?.data?.detail ||

          "Registration failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-[460px]">

        <h1 className="text-3xl font-bold mb-2">

          AI CRM

        </h1>

        <p className="text-gray-500 mb-8">

          Create your account

        </p>

        <div className="space-y-4">

          <input

            name="first_name"

            placeholder="First Name"

            value={form.first_name}

            onChange={updateField}

            className="w-full border rounded-lg p-3"

          />

          <input

            name="last_name"

            placeholder="Last Name"

            value={form.last_name}

            onChange={updateField}

            className="w-full border rounded-lg p-3"

          />

          <input

            name="email"

            placeholder="Email"

            value={form.email}

            onChange={updateField}

            className="w-full border rounded-lg p-3"

          />

          <input

            type="password"

            name="password"

            placeholder="Password"

            value={form.password}

            onChange={updateField}

            className="w-full border rounded-lg p-3"

          />

          <input

            type="password"

            name="confirm_password"

            placeholder="Confirm Password"

            value={form.confirm_password}

            onChange={updateField}

            className="w-full border rounded-lg p-3"

          />

          <button

            onClick={submit}

            disabled={loading}

            className="w-full bg-slate-900 text-white rounded-lg p-3 hover:bg-slate-800 transition"

          >

            {loading

              ? "Creating Account..."

              : "Create Account"}

          </button>

        </div>

        <div className="text-center mt-6 text-sm">

          Already have an account?

          <Link

            to="/"

            className="text-blue-600 ml-2"

          >

            Login

          </Link>

        </div>

      </div>

    </div>

  );

}