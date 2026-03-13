import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-200 border-t border-base-300 z-50 px-4 h-16 flex items-center justify-around">
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 transition-colors ${
          currentPath === "/" ? "text-primary" : "text-base-content opacity-70"
        }`}
      >
        <HomeIcon className="size-6" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>

      <Link
        to="/friends"
        className={`flex flex-col items-center gap-1 transition-colors ${
          currentPath === "/friends" ? "text-primary" : "text-base-content opacity-70"
        }`}
      >
        <UsersIcon className="size-6" />
        <span className="text-[10px] font-medium">Friends</span>
      </Link>

      <Link
        to="/notifications"
        className={`flex flex-col items-center gap-1 transition-colors ${
          currentPath === "/notifications" ? "text-primary" : "text-base-content opacity-70"
        }`}
      >
        <BellIcon className="size-6" />
        <span className="text-[10px] font-medium">Alerts</span>
      </Link>
    </div>
  );
};

export default BottomNav;
