import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/UserContextProvider";
import UserAuthForm from "./components/UserAuthForm";

const Login = () => {
  const { user, token } = useAuth();
  if (user?.role === "admin" && token) {
    return <Navigate to="/dashboard/cars" />;
  }
  return (
    <>
      <div className="relative flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative flex-col hidden h-full p-10 bg-foreground text-muted dark:border-r lg:flex">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mr-2"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Amwaj
          </div>
          <div className="relative z-20 mt-auto">
            Welcome back! Please log in to your account.
          </div>
        </div>
        <div className="flex items-center h-full p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email address and password below to continue
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
