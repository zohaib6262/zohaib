import React from "react";
import SignForm from "./components/SignupForm/SignForm";
import LoginForm from "./components/LoginForm/LoginForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import Home from "./components/Home/Home";
import InterestPage from "./components/IntersetPage/InterestPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "signup", element: <SignForm /> },
        { path: "login", element: <LoginForm /> },
        { path: "interestRate", element: <InterestPage /> },
      ],
    },
  ]);

  // const isLoggedIn = localStorage?.getItem("token");
  // return <>{isLoggedIn ? <LoginForm /> : <SignForm />}</>;
  return <RouterProvider router={router} />;
};

export default App;
