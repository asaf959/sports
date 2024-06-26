import { Outlet, Navigate } from "react-router-dom";

import { dashboardPath } from "./path";
import { getSportFromSession } from "../utils/utils";

export const removeTeamsOnSpecificRoutes = () => {
  const currentSport = getSportFromSession();
  const l1 = currentSport.league !== "cfl"
  const l2 = currentSport.league !== "tournament"
  const l3 = currentSport.league !== "f1"
  const l4 = currentSport.league !== "ufc"
  const removeTeams = !(l1 && l2 && l3 && l4)
  return removeTeams;
}

const useAuth = () => {
  return !removeTeamsOnSpecificRoutes();
};

function PrivateRoutes() {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={dashboardPath} />;
}

export default PrivateRoutes;
