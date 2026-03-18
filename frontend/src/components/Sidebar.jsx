import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-100/90 backdrop-blur-md border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0 shadow-sm transition-all duration-300">
      <div className="p-6 border-b border-base-300/50">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105 duration-300">
          <div className="p-2 bg-primary/10 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <ShipWheelIcon className="size-8 text-primary relative z-10" />
          </div>
          <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Meetify
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
        <Link
          to="/"
          className={`btn justify-start w-full gap-4 px-4 normal-case transition-all duration-300 border-none font-medium text-[15px] ${
            currentPath === "/" 
              ? "bg-primary text-primary-content shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5" 
              : "btn-ghost text-base-content/70 hover:bg-base-200/50 hover:text-base-content"
          }`}
        >
          <HomeIcon className="size-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn justify-start w-full gap-4 px-4 normal-case transition-all duration-300 border-none font-medium text-[15px] ${
            currentPath === "/friends" 
              ? "bg-primary text-primary-content shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5" 
              : "btn-ghost text-base-content/70 hover:bg-base-200/50 hover:text-base-content"
          }`}
        >
          <UsersIcon className="size-5" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn justify-start w-full gap-4 px-4 normal-case transition-all duration-300 border-none font-medium text-[15px] ${
            currentPath === "/notifications" 
              ? "bg-primary text-primary-content shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5" 
              : "btn-ghost text-base-content/70 hover:bg-base-200/50 hover:text-base-content"
          }`}
        >
          <BellIcon className="size-5" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-5 border-t border-base-300/50 mt-auto bg-base-200/30">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-base-200 transition-colors cursor-pointer group">
          <div className="avatar">
            <div className="w-11 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 group-hover:ring-primary/50 transition-all duration-300">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1.5 mt-0.5 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;