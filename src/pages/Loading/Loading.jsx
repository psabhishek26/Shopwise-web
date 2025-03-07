import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Shopwise
        </h1>

        <div className="flex flex-col items-center gap-4">
          <Loader className="w-10 h-10 text-purple-400 animate-spin" />
          <p className="text-gray-400 animate-pulse">
            Loading your experience...
          </p>
        </div>

        <div className="flex gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
