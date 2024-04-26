import { AxiosError } from "axios";
import { useRouteError } from "react-router-dom";

import ErrorTemplate from "../../components/errorTemplate";

function Error() {
  const error = useRouteError() as AxiosError;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ErrorTemplate status={error.response?.status} message={(error.response?.data as any)?.message} />;
}

export default Error;
