import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import { TokenService } from "../../services/token.service";

export default function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {

    const token = TokenService.getToken();

    if (token) {

      navigate("/dashboard");

    }

  }, [navigate]);

  const submit = async () => {

    if (!email || !password) {

      alert("Please enter email and password");

      return;

    }

    try {

      setLoading(true);

      await login(

        email,

        password,

      );

      navigate(

        "/dashboard"

      );

    } catch (error: any) {

      alert(

        error?.response?.data?.detail ||

        "Invalid credentials"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-[430px]">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">

            AI CRM

          </h1>

          <p className="text-gray-500 mt-2">

            Sign in to continue

          </p>

        </div>

        <div className="space-y-4">

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>

              setEmail(e.target.value)

            }

            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>

              setPassword(e.target.value)

            }

            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

          />

          <button

            onClick={submit}

            disabled={loading}

            className="w-full bg-slate-900 text-white rounded-lg p-3 hover:bg-slate-800 transition"

          >

            {

              loading

              ?

              "Signing In..."

              :

              "Login"

            }

          </button>

        </div>

        <div className="text-center mt-6 text-sm">

          Don't have an account?

          <Link

            to="/register"

            className="text-blue-600 ml-2 font-medium"

          >

            Create Account

          </Link>

        </div>

      </div>

    </div>

  );

}