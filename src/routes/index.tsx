import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CreateMovie from "../pages/CreateMovie";
import ReadMovie from "../pages/ReadMovie";
import UpdateMovie from "../pages/UpdateMovie";
import DeleteMovie from "../pages/DeleteMovie";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create",
        element: <CreateMovie />,
      },
      {
        path: "read/:id",
        element: <ReadMovie />,
      },
      {
        path: "update",
        element: <UpdateMovie />,
      },
      {
        path: "delete",
        element: <DeleteMovie />,
      },
    ],
  },
]);