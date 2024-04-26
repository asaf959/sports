import { Outlet, Navigate } from "react-router-dom";

import { loginPath } from "./path";

const useAuth = () => {
  const user = { isLogginIn: true };

  return user && user.isLogginIn;
};

function PrivateRoutes() {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={loginPath} />;
}

export default PrivateRoutes;
