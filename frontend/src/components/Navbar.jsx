import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  LogOutIcon,
  ShipWheelIcon,
  MenuIcon,
  HomeIcon,
  UsersIcon,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const currentPath = location.pathname;

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-[9999] h-16 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-2">
            {!isChatPage && (
              <div className="dropdown lg:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm sm:btn-md">
                  <MenuIcon className="size-5 sm:size-6 text-primary" />
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-base-200 rounded-2xl w-52 border border-base-300 z-[9999]"
                >
                  <li>
                    <Link to="/" className={currentPath === "/" ? "text-primary font-semibold" : ""}>
                      <HomeIcon className="size-5" /> Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/friends"
                      className={currentPath === "/friends" ? "text-primary font-semibold" : ""}
                    >
                      <UsersIcon className="size-5" /> Friends
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/notifications"
                      className={
                        currentPath === "/notifications"
                          ? "text-primary font-semibold"
                          : ""
                      }
                    >
                      <BellIcon className="size-5" /> Notifications
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {/* LOGO - always visible */}
            <Link to="/" className="flex items-center gap-2">
              <ShipWheelIcon className="size-6 sm:size-7 text-primary" />
              <span className="text-lg sm:text-xl font-bold hidden xs:block sm:block">Meetify</span>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle btn-sm sm:btn-md">
                <BellIcon className="size-4 sm:size-5 opacity-70" />
              </button>
            </Link>

            <ThemeSelector />

            {/* Avatar */}
            <div className="avatar">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring ring-primary/20 flex-shrink-0">
                <img
                  src={authUser?.profilePic}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Logout */}
            <button
              className="btn btn-ghost btn-circle btn-sm sm:btn-md"
              onClick={logoutMutation}
            >
              <LogOutIcon className="size-4 sm:size-5 opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;