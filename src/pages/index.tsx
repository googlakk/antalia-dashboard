import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AddUsersList from "./add-users/UsersListPage";
import Admins from "./admins/AdminPage";
import { FC } from "react";
import GamePage from "./game/GamePage";
import Preview from "./preview/Preview";

const router = createBrowserRouter([
  {
    path: "/preview",
    element: <Preview />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "/admin",
    element: <Admins />,
  },
]);

const Routing: FC = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
