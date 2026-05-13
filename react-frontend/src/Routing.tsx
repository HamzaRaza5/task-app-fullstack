import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActiveTasks from "./pages/ActiveTasks";
import CompeletedTasks from "./pages/CompletedTasks";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import UsersPage from "./pages/UserPage";
import SignUp from "./pages/SignUp";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          autoClose={3000}
          position={"top-center"}
          hideProgressBar={true}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route
            path="/active"
            element={
              <ProtectedRoute>
                <ActiveTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/completed"
            element={
              <ProtectedRoute>
                <CompeletedTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          {/* Default Page Active Todos */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ActiveTasks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
