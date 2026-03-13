import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";

import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  SparklesIcon,
} from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  // friends
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // recommended users
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  // outgoing friend requests
  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();

    if (outgoingFriendReqs?.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
    }

    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingFriendReqs]);

  return (
    <div className="w-full min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-12">

        {/* FRIENDS SECTION */}

        <section className="space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-3">

            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <UsersIcon className="size-6 text-primary" />
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Your Friends
              </h2>
            </div>

            <Link
              to="/notifications"
              className="btn btn-outline btn-sm sm:btn-md rounded-xl"
            >
              <UsersIcon className="size-4 mr-2" />
              Friend Requests
            </Link>
          </div>

          {loadingFriends ? (
            <div className="flex justify-center py-10">
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
        </section>

        {/* RECOMMENDED USERS */}

        <section className="space-y-6">

          <div className="border-b border-base-300 pb-3">

            <div className="flex items-start gap-3">

              <div className="p-2 bg-secondary/10 rounded-xl mt-1">
                <SparklesIcon className="size-6 text-secondary" />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  Meet New Learners
                </h2>

                <p className="text-sm sm:text-base opacity-70 mt-1">
                  Discover perfect language exchange partners
                </p>
              </div>

            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-lg text-secondary" />
            </div>
          ) : recommendedUsers.length === 0 ? (

            <div className="card bg-base-200 border border-base-300 p-8 text-center rounded-2xl">

              <div className="flex justify-center mb-4">
                <div className="p-4 bg-base-300 rounded-full">
                  <SparklesIcon className="size-8 opacity-50" />
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>

              <p className="opacity-70">
                Check back later for new language partners!
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {recommendedUsers.map((user) => {

                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-all duration-300 hover:shadow-xl"
                  >

                    <div className="card-body p-5 space-y-4">

                      {/* USER INFO */}

                      <div className="flex items-start gap-3">

                        <div className="avatar">
                          <div className="w-14 h-14 rounded-full overflow-hidden ring ring-base-300">
                            <img
                              src={user.profilePic}
                              alt={user.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-1">

                          <h3 className="font-semibold text-base sm:text-lg">
                            {user.fullName}
                          </h3>

                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}

                        </div>
                      </div>

                      {/* LANGUAGES */}

                      <div className="flex flex-wrap gap-2">

                        <span className="badge badge-secondary badge-outline">
                          {getLanguageFlag(user.nativeLanguage)}
                          <span className="ml-1">
                            Native: {capitialize(user.nativeLanguage)}
                          </span>
                        </span>

                        <span className="badge badge-accent badge-outline">
                          {getLanguageFlag(user.learningLanguage)}
                          <span className="ml-1">
                            Learning: {capitialize(user.learningLanguage)}
                          </span>
                        </span>

                      </div>

                      {user.bio && (
                        <p className="text-sm opacity-80 bg-base-300/40 p-3 rounded-xl">
                          {user.bio}
                        </p>
                      )}

                      {/* BUTTON */}

                      <button
                        className={`btn w-full rounded-xl ${
                          hasRequestBeenSent
                            ? "btn-disabled"
                            : "btn-primary"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >

                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}

                      </button>

                    </div>
                  </div>
                );
              })}
            </div>

          )}
        </section>

      </div>
    </div>
  );
};

export default HomePage;