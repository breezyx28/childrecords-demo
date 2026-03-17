import Logo from "@/components/logos/logo";
import { toast } from "sonner";

type ToasterProps = {
  className?: string;
  description?: string;
  duration?: number;
  icon?: React.ReactNode;
};

export const toaster = ({
  className = "toast",
  description = "description",
  duration = 5000,
  icon = <Logo />,
}: ToasterProps) =>
  toast("My toast", {
    className: className,
    description: description,
    duration: duration,
    icon: icon,
  });
