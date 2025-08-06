"use client";

import { useState } from "react";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import { ImageCarousel } from "./image-carousel";
import { Button } from "@/components/ui/button";

export default function AuthContainer() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="relative min-h-screen justify-center">
      <div className="w-full max-w-full h-full overflow-hidden">
        {/* Form Section */}
        <div
          className={`absolute top-0 w-1/2 h-full flex items-center justify-center p-8 transition-all duration-700 ease-in-out ${
            isSignUp ? "left-0" : "left-1/2"
          }`}
        >
          {isSignUp ? (
            <SignUpForm onToggleMode={toggleMode} />
          ) : (
            <SignInForm onToggleMode={toggleMode} />
          )}
        </div>

        {/* Image Carousel Section */}
        <div
          className={`absolute top-0 w-1/2 h-full transition-all duration-700 ease-in-out ${
            isSignUp ? "right-0" : "right-1/2"
          }`}
        >
          <ImageCarousel isSignUp={isSignUp} />
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleMode}
          className={`absolute top-6 right-6 z-30 px-4 py-2 rounded-full transition-all duration-300 font-medium ${
            isSignUp
              ? "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              : "bg-black text-white hover:bg-gray-800 shadow-lg"
          }`}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
