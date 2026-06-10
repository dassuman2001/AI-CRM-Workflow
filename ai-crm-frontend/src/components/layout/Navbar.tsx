import useAuth from "../../hooks/useAuth";

export default function Navbar() {

  const {

    logout,

  } = useAuth();

  return (

    <header className="h-16 border-b flex items-center justify-between px-6">

      <h2 className="font-bold">

        AI CRM Workflow

      </h2>

      <button

        onClick={logout}

        className="border px-4 py-2 rounded"

      >

        Logout

      </button>

    </header>

  );

}