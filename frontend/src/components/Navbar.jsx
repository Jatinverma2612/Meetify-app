import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-100/80 backdrop-blur-lg border-b border-base-300/50 sticky top-0 z-30 h-16 flex items-center transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO (Mobile & Tablet only) */}
          <div className="flex lg:hidden items-center">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 group transition-transform hover:scale-105 duration-300">
              <div className="p-1 sm:p-1.5 bg-primary/10 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <ShipWheelIcon className="size-6 sm:size-8 text-primary relative z-10" />
              </div>
              <span className="text-[1.1rem] sm:text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">
                Meetify
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 lg:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-primary/10 hover:text-primary transition-colors">
                <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </Link>

            <ThemeSelector />

            <div className="avatar px-1 sm:px-2 cursor-pointer">
              <div className="w-8 sm:w-9 rounded-full ring-2 ring-transparent hover:ring-primary/50 transition-all duration-300">
                <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
              </div>
            </div>

            {/* Logout button */}
            <button 
              className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-error/10 hover:text-error transition-colors" 
              onClick={logoutMutation}
              title="Logout"
            >
              <LogOutIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;