import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-base-100/50"
      data-theme="forest"
    >
      <div className="border border-base-300 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-200/40 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden hover:shadow-primary/5 transition-shadow duration-500">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-8 flex items-center justify-start gap-3 hover:opacity-80 transition-opacity w-fit">
            <div className="p-2.5 bg-primary/10 rounded-2xl">
              <ShipWheelIcon className="size-8 text-primary" />
            </div>
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Meetify
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-6 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
              <span>{error.response?.data?.message || "An error occurred"}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
                  <p className="text-base-content/60 mt-2">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="form-control w-full space-y-2">
                    <label className="label py-0">
                      <span className="label-text font-medium ml-1">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full rounded-xl bg-base-100/50 focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label py-0">
                      <span className="label-text font-medium ml-1">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full rounded-xl bg-base-100/50 focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-full rounded-xl mt-2 h-12 text-base shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300" 
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-base-content/70">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary font-medium hover:underline hover:text-primary-focus transition-colors">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/10 via-base-200/50 to-secondary/10 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
          <div className="max-w-md w-full relative z-10 flex flex-col items-center">
            {/* Illustration */}
            <div className="relative aspect-square w-full max-w-[320px] mx-auto filter drop-shadow-2xl hover:scale-105 transition-transform duration-700">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full object-contain" />
            </div>

            <div className="text-center space-y-4 mt-10 bg-base-100/40 backdrop-blur-md p-6 rounded-2xl border border-base-100/50 shadow-xl">
              <h2 className="text-2xl font-bold tracking-tight text-primary">Connect Globally</h2>
              <p className="text-base-content/80 font-medium leading-relaxed">
                Practice conversations, make friends, and improve your language skills with partners worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;