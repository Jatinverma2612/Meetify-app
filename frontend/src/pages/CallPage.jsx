import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  PaginatedGridLayout,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    let videoClient = null;

    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();

    return () => {
      if (videoClient) {
        videoClient.disconnectUser();
      }
    };
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-[calc(100dvh-4rem)] flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="w-full h-full max-w-6xl border border-base-300 rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl relative bg-base-200/70 backdrop-blur-xl flex items-center justify-center">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="p-4 bg-error/10 rounded-2xl text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-xl font-bold">Could not initialize call.</p>
            <p className="text-base-content/60">
              Please refresh or try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  if (callingState === CallingState.LEFT) return null;

  return (
    <StreamTheme className="h-full w-full bg-base-200 flex items-center justify-center relative overflow-hidden">

      {/* Desktop layout */}
      <div className="hidden md:flex w-full h-full items-center justify-center pb-36 px-4">
        <PaginatedGridLayout />
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden w-full h-full items-center justify-center pb-28 px-2">
        <SpeakerLayout participantsBarPosition="bottom" />
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 md:bottom-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-base-100/70 backdrop-blur-2xl border border-base-300 shadow-xl flex items-center gap-3">
        <CallControls />
      </div>

    </StreamTheme>
  );
};

export default CallPage;
