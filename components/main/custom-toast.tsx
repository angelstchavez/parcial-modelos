import { toast } from "sonner";
import { VscError } from "react-icons/vsc";
import { FaCircleCheck } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";

interface ToastProps {
  type: "success" | "error" | "info";
  text: string;
  description: string;
}

const CustomToast = ({ type, text, description }: ToastProps) => {
  const icon = {
    error: <VscError />,
    success: <FaCircleCheck />,
    info: <FiInfo />,
  }[type];

  toast[type](text, {
    description,
    duration: 3000,
    icon,
    cancel: {
      label: "Cerrar",
      onClick: () => {},
    },
  });
};

export default CustomToast;
