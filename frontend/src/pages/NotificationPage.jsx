import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, declineFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon, XIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending: isAccepting } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const { mutate: declineRequestMutation, isPending: isDeclining } = useMutation({
    mutationFn: declineFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-base-100 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Notifications</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="space-y-10">
            {incomingRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-base-300 pb-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <UserCheckIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">
                    Friend Requests
                    <span className="badge badge-primary ml-3">{incomingRequests.length}</span>
                  </h2>
                </div>

                <div className="grid gap-4">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200/50 backdrop-blur-sm border border-base-300 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="card-body p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="avatar">
                              <div className="w-14 h-14 rounded-full ring-2 ring-base-300 group-hover:ring-primary/40 transition-all duration-300">
                                <img src={request.sender.profilePic} alt={request.sender.fullName} className="object-cover" />
                              </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">{request.sender.fullName}</h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="badge badge-secondary badge-outline bg-secondary/5 border-secondary/30 py-2 px-3 rounded-lg text-xs font-medium">
                                  Native: {request.sender.nativeLanguage}
                                </span>
                                <span className="badge badge-accent badge-outline bg-accent/5 border-accent/30 py-2 px-3 rounded-lg text-xs font-medium">
                                  Learning: {request.sender.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              className="btn btn-primary rounded-xl shadow-sm hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300 px-6 flex-1 sm:flex-none"
                              onClick={() => acceptRequestMutation(request._id)}
                              disabled={isAccepting || isDeclining}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-ghost rounded-xl border border-base-300 hover:border-error/40 hover:text-error transition-all duration-300"
                              onClick={() => declineRequestMutation(request._id)}
                              disabled={isAccepting || isDeclining}
                              title="Decline"
                            >
                              <XIcon className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACCEPTED REQS NOTIFICATIONS */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-base-300 pb-3">
                  <div className="p-2 bg-success/10 rounded-xl">
                    <BellIcon className="h-6 w-6 text-success" />
                  </div>
                  <h2 className="text-xl font-bold">New Connections</h2>
                </div>

                <div className="grid gap-4">
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="card bg-base-200/50 backdrop-blur-sm border border-base-300 shadow-sm hover:border-success/30 transition-all duration-300 group">
                      <div className="card-body p-5">
                        <div className="flex items-start gap-4">
                          <div className="avatar mt-1">
                            <div className="size-12 rounded-full ring-2 ring-base-300 group-hover:ring-success/40 transition-all duration-300">
                              <img
                                src={notification.recipient.profilePic}
                                alt={notification.recipient.fullName}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg group-hover:text-success transition-colors duration-300">{notification.recipient.fullName}</h3>
                            <p className="text-base-content/70 mt-1">
                              {notification.recipient.fullName} accepted your friend request
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                              <p className="text-xs flex items-center opacity-60 font-medium">
                                <ClockIcon className="h-3.5 w-3.5 mr-1" />
                                Recently
                              </p>
                              <div className="badge badge-success bg-success/10 border-success/20 text-success py-2 rounded-lg font-medium text-xs">
                                <MessageSquareIcon className="h-3 w-3 mr-1" />
                                New Friend
                              </div>
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
              <div className="pt-8">
                <NoNotificationsFound />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default NotificationsPage;