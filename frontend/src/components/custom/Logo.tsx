import { GraduationCapIcon } from "lucide-react";
import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2 font-medium">
      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <GraduationCapIcon className="size-4" />
      </div>
      Edtech Platform
    </Link>
  );
};

export default AppLogo;
