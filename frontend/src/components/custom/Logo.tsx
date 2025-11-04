// import { GraduationCapIcon } from "lucide-react";
import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2 font-medium">
      {/* Logo 1 */}
      {/* <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <GraduationCapIcon className="size-4" />
      </div>
      Edtech Platform */}

      {/* Logo 2 */}
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-gradient-to-r from-indigo-500 to-emerald-400 p-2 text-white font-bold">EDU</div>
        <div className="font-semibold">Education Portal</div>
      </div>
    </Link>
  );
};

export default AppLogo;
