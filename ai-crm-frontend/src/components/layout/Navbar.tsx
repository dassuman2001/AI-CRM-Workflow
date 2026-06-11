import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {

  const { logout } = useAuth();

const navigate = useNavigate();

const handleLogout = () => {
  console.log("Logout clicked");

  logout();

  navigate("/", {
    replace: true,
  });
};
  return (

    <header className="h-16 border-b flex items-center justify-between px-6">

      <h2 className="font-bold">

        AI CRM Workflow

      </h2>

      <button
  onClick={handleLogout}
  className="border px-4 py-2 rounded">
  Logout
</button>

    </header>

  );

}