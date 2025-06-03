import { JSX } from "react";

const LoadingPage = (): JSX.Element => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-white to-pink-100 dark:from-gray-900 dark:via-purple-900/30 dark:to-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
        <span className="text-lg font-semibold text-purple-600 dark:text-purple-300">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
