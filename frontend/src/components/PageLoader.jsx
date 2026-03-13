import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100/50 p-4">
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150"></div>
        <div className="bg-base-200/80 backdrop-blur-xl p-5 rounded-[1.5rem] border border-base-300 shadow-2xl relative z-10 flex">
          <LoaderIcon className="animate-spin size-10 text-primary" />
        </div>
        <p className="mt-6 text-base-content/60 font-medium animate-pulse relative z-10">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;