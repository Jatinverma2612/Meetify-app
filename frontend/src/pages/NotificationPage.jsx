import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-100 border border-base-300 hover:border-primary/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="card-body p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="avatar size-12 sm:size-14 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                              <img src={request.sender?.profilePic} alt={request.sender?.fullName || "User"} className="object-cover rounded-full" />
                            </div>
                            <div>
                              <h3 className="font-bold text-base sm:text-lg">{request.sender?.fullName || "A User"}</h3>
                              <div className="flex flex-wrap gap-2 mt-1.5">
                                <span className="badge badge-secondary badge-sm sm:badge-md">
                                  Native: {request.sender?.nativeLanguage || "Unknown"}
                                </span>
                                <span className="badge badge-outline badge-sm sm:badge-md">
                                  Learning: {request.sender?.learningLanguage || "Unknown"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-primary w-full sm:w-auto shadow-sm hover:shadow-md transition-all"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            Accept Request
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACCEPTED REQS NOTIFICATONS */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4 pt-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="card bg-base-100 border border-base-300 hover:border-success/30 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="card-body p-4 sm:p-5">
                        <div className="flex items-start sm:items-center gap-4">
                          <div className="avatar size-10 sm:size-12 rounded-full ring overflow-hidden ring-success/20 ring-offset-base-100 ring-offset-1">
                            <img
                              src={notification.recipient?.profilePic}
                              alt={notification.recipient?.fullName || "User"}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm sm:text-base truncate">{notification.recipient?.fullName || "A User"}</h3>
                            <p className="text-sm opacity-80 mt-0.5 break-words">
                              Accepted your friend request
                            </p>
                            <p className="text-xs flex items-center opacity-60 mt-1 font-medium">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <div className="badge badge-success badge-md whitespace-nowrap shadow-sm bg-success/10 text-success border-success/20">
                              <MessageSquareIcon className="size-3.5 mr-1.5" />
                              New Friend
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default NotificationPage;