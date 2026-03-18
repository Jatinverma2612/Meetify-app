import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";

import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto bg-base-100"
      data-theme="forest"
    >
      <div className="border border-base-300 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden my-4">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-base-100">
          {/* LOGO */}
          <div className="mb-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-primary/10 rounded-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <ShipWheelIcon className="size-8 text-primary relative z-10" />
              </div>
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Meetify
              </span>
            </div>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4 shadow-sm border border-error/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error.response?.data?.message || "An error occurred"}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Create an Account</h2>
                <p className="text-sm text-base-content/70">
                  Join Meetify and start your language learning adventure!
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* FULLNAME */}
                <div className="form-control w-full relative">
                  <label className="label pb-1.5">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                  />
                </div>
                {/* EMAIL */}
                <div className="form-control w-full relative">
                  <label className="label pb-1.5">
                    <span className="label-text font-medium">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>
                {/* PASSWORD */}
                <div className="form-control w-full relative">
                  <label className="label pb-1.5">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                  <p className="text-[11px] text-base-content/60 mt-1.5 ml-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div className="form-control py-1">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary rounded" required />
                    <span className="text-[13px] leading-tight text-base-content/70">
                      I agree to the{" "}
                      <span className="text-primary hover:underline cursor-pointer font-medium">terms of service</span> and{" "}
                      <span className="text-primary hover:underline cursor-pointer font-medium">privacy policy</span>
                    </span>
                  </label>
                </div>

                <button 
                  className="btn btn-primary w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 mt-2" 
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-5 pt-4 border-t border-base-300/50">
                  <p className="text-sm text-base-content/70">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-semibold hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-bl from-primary/10 via-primary/5 to-secondary/10 items-center justify-center p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col items-center justify-center relative z-10 w-full max-w-md">
            {/* Illustration Container */}
            <div className="relative w-full aspect-square mb-8 drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl scale-90 -z-10"></div>
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full object-contain filter hue-rotate-15 contrast-105" />
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Connect with language partners worldwide</h2>
              <p className="text-base-content/70 leading-relaxed">
                Practice conversations, make friends, and improve your language skills together seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;