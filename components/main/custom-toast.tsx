import { toast } from "sonner";
import { FaCircleCheck } from "react-icons/fa6";

interface ToastProps {
  text: string;
  description: string;
}

const SuccessToast = ({ text, description }: ToastProps) => {
  toast.success(text, {
    description,
    duration: 3000,
    icon: <FaCircleCheck className="text-green-700" />,
    cancel: {
      label: "Cerrar",
      onClick: () => {},
    },
  });
};

export default SuccessToast;
