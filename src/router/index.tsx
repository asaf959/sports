import { Outlet, RouteObject } from "react-router-dom";

import * as path from "./path";
import Dashboard from "../pages/dashboard";
import Error from "../pages/error";
import Layout from "../pages/global/layout";
import Teams from "../lazaLoad/Teams";
import Matches from "../lazaLoad/Matches";
import Combination from "../lazaLoad/Combination";
import Sports from "../pages/sports";
import Users from "../pages/users";
import ManageAccount from "../pages/manageAccount";
import Channels from "../pages/Channels";
import AlternateLinks from "../pages/AlternateLinks";
import PrivateRoutes from "./PrivateRoutes";


const teamsRoutes: RouteObject[] = [
  {
    path: path.teamsPath,
    element: <Teams />,
  },
];
const matchesRoutes: RouteObject[] = [
  {
    path: path.matchPath,
    element: <Matches />,
  },
];
const combinationRoutes: RouteObject[] = [
  {
    path: path.combinationPath,
    element: <Combination />,
  },
];
const usersRoutes: RouteObject[] = [
  {
    path: path.usersPath,
    element: <Users />,
  },
];
const channelsRoutes: RouteObject[] = [
  {
    path: path.channelPath,
    element: <Channels />,
  },
];
const alternateLinksRoutes: RouteObject[] = [
  {
    path: path.alternateLinksPath,
    element: <AlternateLinks />,
  },
];
const manageAccountRoutes: RouteObject[] = [
  {
    path: path.manageAccountPath,
    element: <ManageAccount />,
  },
];

const router: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        // path: path.sportsPath,
        index: true,
        element: <Sports />,
      },
      {
        path: "/dashboard",
        element: <Layout />,
        children: [
          {
            errorElement: <Error />,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                element: <PrivateRoutes />,
                children: [
                  ...teamsRoutes,
                ]
              },
              ...matchesRoutes,
              ...combinationRoutes,
              ...usersRoutes,
              ...channelsRoutes,
              ...alternateLinksRoutes,
              ...manageAccountRoutes,
              ...usersRoutes
            ],
          },
        ],
      },
    ],
  },
];

export default router;
