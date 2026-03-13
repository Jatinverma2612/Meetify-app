import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 bg-base-100/50">
      <div className="flex flex-col items-center justify-center bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-[2rem] p-12 shadow-2xl relative overflow-hidden w-full max-w-sm mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150"></div>
            <div className="bg-base-100/80 p-4 rounded-[1.5rem] ring-4 ring-base-100/50 shadow-xl relative z-10 backdrop-blur-md">
              <LoaderIcon className="animate-spin size-10 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2">Connecting to chat</h3>
          <p className="text-base-content/60 font-medium text-sm">Securing your conversation...</p>
        </div>
      </div>
    </div>
  );
}

export default ChatLoader;