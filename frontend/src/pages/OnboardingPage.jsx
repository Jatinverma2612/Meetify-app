import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
} from "lucide-react";
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
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;

    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}&t=${Date.now()}`;

    setFormState((prev) => ({
      ...prev,
      profilePic: randomAvatar,
    }));

    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-base-200 via-base-100 to-base-100 flex items-center justify-center p-4 py-12">
      <div className="card bg-base-200/50 backdrop-blur-xl border border-base-300 w-full max-w-2xl shadow-2xl rounded-3xl overflow-hidden">
        <div className="card-body p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block mb-3">
              Complete Your Profile
            </h1>
            <p className="text-base-content/70 font-medium">
              Almost there! Tell us a bit more about yourself to get the best
              matches.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-5 bg-base-100/30 p-6 rounded-2xl border border-base-300/50">
              {/* IMAGE PREVIEW */}
              <div className="relative group">
                <div className="w-36 h-36 rounded-full bg-base-300 overflow-hidden ring-4 ring-base-100 shadow-xl flex items-center justify-center">
                  {formState.profilePic ? (
                    <img
                      src={formState.profilePic}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                      onLoad={() => console.log("image loaded")}
                      onError={() => console.log("image failed")}
                    />
                  ) : (
                    <CameraIcon className="size-14 text-base-content/30" />
                  )}
                </div>
              </div>

              {/* Generate Random Avatar BTN */}
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn btn-primary btn-outline btn-sm rounded-xl px-6 hover:shadow-primary/20 hover:scale-105 transition-all"
              >
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            <div className="space-y-5">
              {/* FULL NAME */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-base-content/80 ml-1">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState({ ...formState, fullName: e.target.value })
                  }
                  className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/20 bg-base-100/50 focus:bg-base-100 transition-all font-medium"
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* BIO */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-base-content/80 ml-1">
                    Bio
                  </span>
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) =>
                    setFormState({ ...formState, bio: e.target.value })
                  }
                  className="textarea textarea-bordered h-28 rounded-xl focus:ring-2 focus:ring-primary/20 bg-base-100/50 focus:bg-base-100 transition-all resize-none text-[15px]"
                  placeholder="Tell others about yourself and your language learning goals..."
                  required
                />
              </div>

              {/* LANGUAGES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* NATIVE LANGUAGE */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-medium text-base-content/80 ml-1">
                      Native Language
                    </span>
                  </label>
                  <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        nativeLanguage: e.target.value,
                      })
                    }
                    className="select select-bordered w-full rounded-xl focus:ring-2 focus:ring-secondary/20 bg-base-100/50 focus:bg-base-100 transition-all cursor-pointer font-medium"
                    required
                  >
                    <option value="" disabled>
                      Select native language
                    </option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* LEARNING LANGUAGE */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-medium text-base-content/80 ml-1">
                      Learning Language
                    </span>
                  </label>
                  <select
                    name="learningLanguage"
                    value={formState.learningLanguage}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        learningLanguage: e.target.value,
                      })
                    }
                    className="select select-bordered w-full rounded-xl focus:ring-2 focus:ring-accent/20 bg-base-100/50 focus:bg-base-100 transition-all cursor-pointer font-medium"
                    required
                  >
                    <option value="" disabled>
                      Select language learning
                    </option>
                    {LANGUAGES.map((lang) => (
                      <option
                        key={`learning-${lang}`}
                        value={lang.toLowerCase()}
                      >
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LOCATION */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-base-content/80 ml-1">
                    Location
                  </span>
                </label>
                <div className="relative group">
                  <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3.5 size-5 text-base-content/40 group-focus-within:text-primary transition-colors duration-300" />
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={(e) =>
                      setFormState({ ...formState, location: e.target.value })
                    }
                    className="input input-bordered w-full pl-11 rounded-xl focus:ring-2 focus:ring-primary/20 bg-base-100/50 focus:bg-base-100 transition-all font-medium"
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 mt-6 border-t border-base-300">
              <button
                className="btn btn-primary w-full h-14 rounded-xl text-[16px] shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
                disabled={isPending}
                type="submit"
              >
                {!isPending ? (
                  <>
                    <ShipWheelIcon className="size-6 mr-2" />
                    Complete Profile
                  </>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-6 mr-2" />
                    Saving details...
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
