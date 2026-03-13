import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-[280px] bg-base-200/50 backdrop-blur-xl border-r border-base-300/50 hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-300">
      <div className="p-6 border-b border-base-300/50">
        <Link to="/" className="flex items-center gap-3 hover:scale-[1.02] transition-transform duration-300">
          <div className="p-2 bg-primary/10 rounded-xl">
            <ShipWheelIcon className="size-7 text-primary" />
          </div>
          <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Meetify
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-4 px-4 h-12 normal-case rounded-xl transition-all duration-300 ${
            currentPath === "/" 
              ? "bg-primary/10 text-primary border-primary/20 shadow-sm" 
              : "hover:bg-primary/5 hover:text-primary opacity-80 hover:opacity-100"
          }`}
        >
          <HomeIcon className={`size-5 ${currentPath === "/" ? "text-primary" : "text-base-content/70"}`} />
          <span className="font-medium text-[15px]">Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-4 px-4 h-12 normal-case rounded-xl transition-all duration-300 ${
            currentPath === "/friends" 
              ? "bg-primary/10 text-primary border-primary/20 shadow-sm" 
              : "hover:bg-primary/5 hover:text-primary opacity-80 hover:opacity-100"
          }`}
        >
          <UsersIcon className={`size-5 ${currentPath === "/friends" ? "text-primary" : "text-base-content/70"}`} />
          <span className="font-medium text-[15px]">Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-4 px-4 h-12 normal-case rounded-xl transition-all duration-300 ${
            currentPath === "/notifications" 
              ? "bg-primary/10 text-primary border-primary/20 shadow-sm" 
              : "hover:bg-primary/5 hover:text-primary opacity-80 hover:opacity-100"
          }`}
        >
          <BellIcon className={`size-5 ${currentPath === "/notifications" ? "text-primary" : "text-base-content/70"}`} />
          <span className="font-medium text-[15px]">Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-base-300/50 mt-auto bg-base-200/30">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-300/50 transition-colors duration-300 cursor-pointer border border-transparent hover:border-base-300">
          <div className="avatar">
            <div className="w-11 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
              <img src={authUser?.profilePic} alt="User Avatar" className="object-cover" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{authUser?.fullName}</p>
            <p className="text-xs text-emerald-500 font-medium flex items-center gap-1.5 mt-0.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;