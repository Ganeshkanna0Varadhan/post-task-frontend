import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CreatePost from "../pages/CreatePost";
import CreateTag from "../pages/CreateTag";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "create-post",
        element: <CreatePost />
      },
      {
        path: "create-tag",
        element: <CreateTag />
      }
    ]
  }
]);

export default router;
