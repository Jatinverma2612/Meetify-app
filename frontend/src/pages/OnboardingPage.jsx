import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/5 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="card bg-base-100/80 backdrop-blur-xl w-full max-w-3xl shadow-2xl border border-base-300 flex-col lg:flex-row overflow-hidden relative z-10 transition-all duration-300 hover:shadow-primary/10">
        
        {/* LEFT SIDE - VISUAL */}
        <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-br from-primary/10 to-secondary/10 flex-col items-center justify-center p-8 border-r border-base-300">
          <div className="w-24 h-24 mb-6 rounded-2xl bg-primary/20 flex items-center justify-center shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <ShipWheelIcon className="size-12 text-primary relative z-10" />
          </div>
          <h2 className="text-xl font-bold text-center mb-3 text-base-content tracking-tight">Set up your Meetify Profile</h2>
          <p className="text-sm text-center text-base-content/70 flex-1 flex items-center px-4 leading-relaxed">
            Personalize your account to find the best language exchange partners from around the globe.
          </p>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="card-body p-6 sm:p-10 lg:w-2/3">
          <div className="lg:hidden flex items-center justify-center mb-4 gap-3">
             <div className="p-2 bg-primary/10 rounded-lg">
                <ShipWheelIcon className="size-6 text-primary" />
             </div>
             <h2 className="text-xl font-bold tracking-tight">Meetify Setup</h2>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden lg:block">Complete Your Profile</h1>
          <p className="text-center text-base-content/60 text-sm mb-8 hidden lg:block">Tell us a built about yourself</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4 bg-base-200/50 p-6 rounded-2xl border border-base-300/50">
              {/* IMAGE PREVIEW */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-30 group-hover:opacity-75 blur transition duration-300"></div>
                <div className="size-28 sm:size-32 rounded-full bg-base-100 overflow-hidden relative z-10 border-4 border-base-100 shadow-sm">
                  {formState.profilePic ? (
                    <img
                      src={formState.profilePic}
                      alt="Profile Preview"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-base-200">
                      <CameraIcon className="size-10 text-base-content opacity-30" />
                    </div>
                  )}
                </div>
              </div>

              {/* Generate Random Avatar BTN */}
              <button 
                type="button" 
                onClick={handleRandomAvatar} 
                className="btn btn-sm sm:btn-md btn-accent btn-outline shadow-sm hover:shadow-md transition-all gap-2"
              >
                <ShuffleIcon className="size-4" />
                Randomize Avatar
              </button>
            </div>

            {/* FULL NAME */}
            <div className="form-control w-full relative">
              <label className="label pb-1.5 pt-2">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                placeholder="What should we call you?"
              />
            </div>

            {/* BIO */}
            <div className="form-control w-full relative">
              <label className="label pb-1.5">
                <span className="label-text font-medium">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24 bg-base-200/30 focus:bg-base-100 focus:ring-2 focus:ring-primary/30 transition-all duration-300 resize-none"
                placeholder="Tell others about yourself and your language goals..."
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* NATIVE LANGUAGE */}
              <div className="form-control w-full relative">
                <label className="label pb-1.5">
                  <span className="label-text font-medium">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full bg-base-200/30 focus:bg-base-100 focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                >
                  <option value="" disabled>Select Language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control w-full relative">
                <label className="label pb-1.5">
                  <span className="label-text font-medium">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full bg-base-200/30 focus:bg-base-100 focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                >
                  <option value="" disabled>Select Language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control w-full relative pb-4">
              <label className="label pb-1.5">
                <span className="label-text font-medium">Current Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3.5 size-4.5 text-base-content opacity-50" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10 bg-base-200/30 focus:bg-base-100 focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                  placeholder="e.g. Tokyo, Japan"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="border-t border-base-300/50 pt-6 mt-2">
              <button 
                className="btn btn-primary w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 h-12 text-base" 
                disabled={isPending} 
                type="submit"
              >
                {!isPending ? (
                  <>
                    <ShipWheelIcon className="size-5 mr-2" />
                    Complete Profile
                  </>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-5 mr-2" />
                    Saving changes...
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default OnboardingPage;