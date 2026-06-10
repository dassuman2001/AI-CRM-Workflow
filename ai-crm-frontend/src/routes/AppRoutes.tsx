import {

 Routes,

 Route,

 Navigate,

} from "react-router-dom";

import LoginPage

from "../pages/auth/LoginPage";

import RegisterPage
from "../pages/auth/RegisterPage";

import DashboardPage

from "../pages/dashboard/DashboardPage";

import ProtectedRoute

from "../components/layout/ProtectedRoute";

import LeadsPage

from "../pages/leads/LeadsPage";

import LeadDetailsPage

from "../pages/leads/LeadDetailsPage";

import CopilotPage
from "../pages/ai/CopilotPage";

import CompaniesPage from "../pages/companies/CompaniesPage";
import CompanyDetail from "../pages/companies/CompanyDetail";
import CreateCompany from "../pages/companies/CreateCompany";
import EditCompany from "../pages/companies/EditCompany";

import TasksPage from "../pages/tasks/TasksPage";
import TaskDetail from "../pages/tasks/TaskDetail";
import CreateTask from "../pages/tasks/CreateTask";
import EditTask from "../pages/tasks/EditTask";

import NotesPage from "../pages/notes/NotesPage";
import CreateNote from "../pages/notes/CreateNote";
import EditNote from "../pages/notes/EditNote";





export default function AppRoutes() {

 return (

  <Routes>

   <Route

    path="/"

    element={

     <LoginPage />

    }

   />



    <Route

  path="/register"

  element={

    <RegisterPage />

  }

/>


   <Route

    path="/dashboard"

    element={

     <ProtectedRoute>

      <DashboardPage />

     </ProtectedRoute>

    }

   />

   <Route

    path="*"

    element={

     <Navigate

      to="/"

     />

    }

   />


<Route

 path="/leads"

 element={

  <ProtectedRoute>

   <LeadsPage />

  </ProtectedRoute>

 }

/>

<Route

 path="/leads/:id"

 element={

  <ProtectedRoute>

   <LeadDetailsPage />

  </ProtectedRoute>

 }

/>


<Route

 path="/copilot"

 element={

  <ProtectedRoute>

    <CopilotPage />

  </ProtectedRoute>

 }

/>


<Route
 path="/companies"
 element={
  <ProtectedRoute>
   <CompaniesPage />
  </ProtectedRoute>
 }
/>

<Route
 path="/companies/create"
 element={
  <ProtectedRoute>
   <CreateCompany />
  </ProtectedRoute>
 }
/>

<Route
 path="/companies/:id"
 element={
  <ProtectedRoute>
   <CompanyDetail />
  </ProtectedRoute>
 }
/>

<Route
 path="/companies/:id/edit"
 element={
  <ProtectedRoute>
   <EditCompany />
  </ProtectedRoute>
 }
/>


<Route
 path="/tasks"
 element={
  <ProtectedRoute>
   <TasksPage />
  </ProtectedRoute>
 }
/>

<Route
 path="/tasks/create"
 element={
  <ProtectedRoute>
   <CreateTask />
  </ProtectedRoute>
 }
/>

<Route
 path="/tasks/:id"
 element={
  <ProtectedRoute>
   <TaskDetail />
  </ProtectedRoute>
 }
/>

<Route
 path="/tasks/:id/edit"
 element={
  <ProtectedRoute>
   <EditTask />
  </ProtectedRoute>
 }
/>

<Route
 path="/notes"
 element={
  <ProtectedRoute>
   <NotesPage />
  </ProtectedRoute>
 }
/>

<Route
 path="/notes/create"
 element={
  <ProtectedRoute>
   <CreateNote />
  </ProtectedRoute>
 }
/>

<Route
 path="/notes/:id/edit"
 element={
  <ProtectedRoute>
   <EditNote />
  </ProtectedRoute>
 }
/>


<Route
 path="*"
 element={
  <Navigate to="/" />
 }
/>

  </Routes>


 );

}