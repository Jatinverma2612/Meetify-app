import { UsersIcon } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-base-200/40 backdrop-blur-sm border border-base-300 rounded-[2rem] shadow-sm">
      <div className="size-16 rounded-full bg-base-300/60 flex items-center justify-center mb-5 ring-4 ring-base-100/50">
        <UsersIcon className="size-8 text-base-content/40" />
      </div>
      <h3 className="font-bold text-xl mb-2 text-base-content">No friends yet</h3>
      <p className="text-base-content/60 max-w-sm font-medium">
        Connect with language partners below to start practicing together!
      </p>
    </div>
  );
};

export default NoFriendsFound;