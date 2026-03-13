import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <button
      onClick={handleVideoCall}
      className="btn btn-primary btn-sm flex items-center gap-2 hover:scale-105 transition-transform"
    >
      <VideoIcon className="size-4" />
      Video Call
    </button>
  );
}

export default CallButton;
