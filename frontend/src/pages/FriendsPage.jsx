import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { UsersIcon } from "lucide-react";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { Link } from "react-router";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="w-full min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-8">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <UsersIcon className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Your Friends</h1>
          </div>

          <Link
            to="/notifications"
            className="btn btn-outline btn-sm sm:btn-md rounded-xl"
          >
            <UsersIcon className="size-4 mr-2" />
            Friend Requests
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
