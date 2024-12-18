import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;
