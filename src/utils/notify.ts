import { toast } from "react-toastify";

type ToastType = "success" | "error" | "warning" | "info";

const showToast = (type: ToastType, msg: string, toastId?: string): void => {
  toast[type](msg, {
    toastId,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};

export default showToast;
