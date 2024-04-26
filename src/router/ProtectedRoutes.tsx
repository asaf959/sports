import { Navigate, Outlet } from "react-router-dom";

import { getCurrentUser } from "../utils/session";

import { dashboardPath } from "./path";
import { appRole } from "../interface";
interface props {
  allowedRoles: appRole[];
}

function ProtectedRoutes({ allowedRoles }: props) {
  const user = getCurrentUser();

  const isAllowed = allowedRoles.includes(user.role);

  return isAllowed ? <Outlet /> : <Navigate to={dashboardPath} />;
}

export default ProtectedRoutes;
