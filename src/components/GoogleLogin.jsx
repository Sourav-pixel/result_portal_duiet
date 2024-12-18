import  { useState } from 'react';
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info: ", user);
      // You can also save user info to your state or database here
    } catch (error) {
      console.error("Error during Google login: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <button 
        onClick={handleLogin} 
        disabled={isLoading}
        className="
          flex items-center justify-center 
          bg-white 
          text-gray-800 
          font-semibold 
          py-3 px-6 
          rounded-lg 
          shadow-md 
          hover:shadow-lg 
          transition-all 
          duration-300 
          border 
          border-gray-300 
          hover:border-gray-400 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:ring-opacity-50
          group
          min-w-[250px]
        "
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Logging in...
          </div>
        ) : (
          <div className="flex items-center">
            <svg 
              className="w-6 h-6 mr-3" 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 48 48"
            >
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.925l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Login with Google
          </div>
        )}
      </button>
    </div>
  );
};

export default GoogleLogin;