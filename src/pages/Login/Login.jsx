import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Loader } from "lucide-react";
import AuthenticationService from "../../services/AuthenticationService";
import { useDispatch } from "react-redux";
import { GeneralAction } from "../../actions";
import { StorageService } from "../../services";
import UserService from "../../services/UserService";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and Password are required!");
      return;
    }

    let user = {
      email,
      password,
    };

    setIsLoading(true);
    try {
      const response = await AuthenticationService.login(user);
      setIsLoading(false);

      if (response?.status) {
        StorageService.setToken(response?.data);
        dispatch(GeneralAction.setToken(response?.data));
        UserService.getUserData().then((userResponse) => {
          if (userResponse?.status) {
            if (userResponse?.data?.data?.role !== "shop") {
              setErrorMessage("Only shop users are allowed!");
              return;
            }
            dispatch(GeneralAction.setUserData(userResponse?.data));
            navigation.navigate("/");
          }
        });
      } else {
        setErrorMessage(response?.message || "Invalid email or password.");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8 border border-gray-700">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-600 text-white p-3 rounded-md text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100 transition duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100 transition duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-purple-400 hover:text-purple-300 transition duration-200"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition duration-200 transform hover:scale-[1.02] flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-purple-400 hover:text-purple-300 transition duration-200"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
