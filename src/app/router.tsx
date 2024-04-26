import { RouterProvider, createBrowserRouter } from "react-router-dom";

import router from "../router";

function Router() {
  const routes = createBrowserRouter(router);

  return <RouterProvider router={routes} />;
}

export default Router;
