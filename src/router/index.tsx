import { useContext } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import Campaigns from "../pages/Campaigns";
import ProfileList from "../pages/ProfileList";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { AuthContext } from "../providers/AuthProvider";

import Layout from "../themes";

function Router() {
  const { isLogin } = useContext(AuthContext);

  const routes = [
    {
      path: "/",
      element: isLogin ? <Layout /> : <Navigate to="/login" />,
      children: [
        {
          path: "campaigns",
          element: <Campaigns />,
        },
        {
          path: "campaign/:id",
          element: <ProfileList />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
