import { toast } from "react-hot-toast";

const useNotification = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  return {
    notifySuccess,
    notifyError,
  };
};

export default useNotification;
