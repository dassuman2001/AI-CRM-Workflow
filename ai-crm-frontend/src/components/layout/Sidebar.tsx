import { Link } from "react-router-dom";

export default function Sidebar() {

  return (

    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">

      <h1 className="text-2xl font-bold mb-8">

        AI CRM

      </h1>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard">

          Dashboard

        </Link>

        <Link to="/leads">

          Leads

        </Link>

        <Link to="/companies">

          Companies

        </Link>

        <Link to="/tasks">

          Tasks

        </Link>

        <Link to="/notes">

          Notes

        </Link>

        <Link to="/copilot">

          AI Copilot

        </Link>

      </nav>

    </aside>

  );

}