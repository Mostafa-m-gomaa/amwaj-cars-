import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/UserContextProvider";
import { ThemeProvider } from "./context/ThemeContextProvider";
import DashBoardLayout from "./components/Layout/DashBoardLayout";
import DashboardHome from "./pages/dashboardHome/DashboardHome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersPage from "./pages/users/UsersPage";
import UserFormPage from "./pages/users/UserFormPage";
import { Toaster } from "./components/ui/toaster";
import CarsPage from "./pages/cars/CarsPage";
import CarFormPage from "./pages/cars/CarFormPage";
import AddReport from "./pages/reports/AddReport";
const queryClient = new QueryClient();


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/dashboard" element={<DashBoardLayout />}>
                <Route path="overview" element={<DashboardHome />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="users/:id" element={<UserFormPage />} />
                <Route path="cars" element={<CarsPage />} />
                <Route path="cars/:id" element={<CarFormPage />} />
                <Route path="reports/:id" element={<AddReport />} />
              </Route>
            </Routes>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
