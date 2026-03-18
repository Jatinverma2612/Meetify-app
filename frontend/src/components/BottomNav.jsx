import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-100/90 backdrop-blur-lg border-t border-base-300/50 z-50 px-6 h-16 flex items-center justify-around pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <Link
        to="/"
        className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative px-4 py-2 rounded-xl ${
          currentPath === "/" 
            ? "text-primary bg-primary/10" 
            : "text-base-content/60 hover:text-base-content hover:bg-base-200/50 hover:-translate-y-1"
        }`}
      >
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full transition-all duration-300 ${currentPath === "/" ? "bg-primary" : "bg-transparent"}`} />
        <HomeIcon className="size-5" />
        <span className="text-[11px] font-semibold">Home</span>
      </Link>

      <Link
        to="/friends"
        className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative px-4 py-2 rounded-xl ${
          currentPath === "/friends" 
            ? "text-primary bg-primary/10" 
            : "text-base-content/60 hover:text-base-content hover:bg-base-200/50 hover:-translate-y-1"
        }`}
      >
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full transition-all duration-300 ${currentPath === "/friends" ? "bg-primary" : "bg-transparent"}`} />
        <UsersIcon className="size-5" />
        <span className="text-[11px] font-semibold">Friends</span>
      </Link>

      <Link
        to="/notifications"
        className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative px-4 py-2 rounded-xl ${
          currentPath === "/notifications" 
            ? "text-primary bg-primary/10" 
            : "text-base-content/60 hover:text-base-content hover:bg-base-200/50 hover:-translate-y-1"
        }`}
      >
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full transition-all duration-300 ${currentPath === "/notifications" ? "bg-primary" : "bg-transparent"}`} />
        <BellIcon className="size-5" />
        <span className="text-[11px] font-semibold">Alerts</span>
      </Link>
    </div>
  );
};

export default BottomNav;
