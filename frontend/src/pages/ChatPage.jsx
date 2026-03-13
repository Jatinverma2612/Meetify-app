import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useMessageContext,
} from "stream-chat-react";

import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CustomMessage = () => {
  const { message, isMyMessage } = useMessageContext();
  const mine = isMyMessage();

  return (
    <div className={`flex w-full mb-4 px-3 ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-2 max-w-[92%] sm:max-w-[70%] ${
          mine ? "flex-row-reverse" : ""
        }`}
      >
        {/* avatar */}
        <div className="hidden sm:block">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-base-300">
            <img
              src={message.user?.image || "https://avatar.iran.liara.run/public"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* message */}
        <div className="flex flex-col">
          <div className="text-xs opacity-60 mb-1 flex gap-2">
            <span>{message.user?.name}</span>
            <span>
              {new Date(message.created_at || Date.now()).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              )}
            </span>
          </div>

          <div
            className={`px-4 py-2 rounded-2xl text-sm break-words shadow-sm
            ${
              mine
                ? "bg-primary text-primary-content rounded-br-sm"
                : "bg-base-200 border border-base-300 rounded-bl-sm"
            }`}
          >
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use a ref to track the client so the cleanup function always has the latest reference
  const chatClientRef = useRef(null);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = new StreamChat(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        // Store client in ref so cleanup can always access the latest instance
        chatClientRef.current = client;
        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Chat init error:", error);
        toast.error("Chat connection failed");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      // Use ref — not the stale closure — to ensure we always disconnect the actual client
      if (chatClientRef.current) {
        chatClientRef.current.disconnectUser();
        chatClientRef.current = null;
      }
    };
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;

    channel.sendMessage({
      text: `I've started a video call. Join me here: ${callUrl}`,
    });

    toast.success("Video call link sent");
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[calc(100dvh-4rem)] w-full bg-base-100 flex flex-col">
      <div className="flex-1 h-full max-w-7xl w-full mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-col">

        <div
          className="
          border border-base-300
          rounded-xl sm:rounded-2xl
          overflow-hidden
          flex flex-col
          flex-1
          min-h-0
          bg-base-100
          [&_.str-chat]:!bg-base-100
          [&_.str-chat__container]:!bg-base-100
          [&_.str-chat__main-panel]:!bg-base-100
          [&_.str-chat__message-list]:!bg-base-100
          [&_.str-chat__channel-header]:!bg-transparent
          [&_.str-chat__channel-header]:!border-none
          [&_.str-chat__channel-header]:!shadow-none
          [&_.str-chat__channel-header]:!p-0
          "
        >
          <Chat client={chatClient}>
            <Channel channel={channel}>

              <div className="flex flex-col h-full">

                {/* header */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-base-200 border-b border-base-300 min-h-[56px] sm:min-h-[64px] flex-shrink-0">

                  {/* avatar + name */}
                  <div className="flex items-center gap-2 min-w-0 flex-1 mr-2 bg-base-100 border border-base-300 rounded-xl sm:rounded-2xl px-2 sm:px-3 py-1.5 shadow-sm hover:border-primary/30 transition-colors duration-200 overflow-hidden">
                    <ChannelHeader />
                  </div>

                  <div className="flex-shrink-0">
                    <CallButton handleVideoCall={handleVideoCall} />
                  </div>

                </div>

                {/* messages */}
                <div className="flex-1 overflow-y-auto bg-base-100 min-h-0">
                  <MessageList Message={CustomMessage} />
                </div>

                {/* input */}
                <div className="border-t border-base-300 p-2 sm:p-3 bg-base-100 flex-shrink-0">

                  <div className="bg-base-200 rounded-full border border-base-300 px-3 py-2">

                    <MessageInput focus />

                  </div>

                </div>

              </div>

              <Thread />

            </Channel>
          </Chat>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;