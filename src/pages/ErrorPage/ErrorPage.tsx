import { Headphones, Home, Music } from "lucide-react";
import { JSX } from "react";
import { Link, useLocation } from "react-router";

import Button from "@shared/ui/Button/Button";
import Logo from "@shared/ui/Logo/Logo";

interface ErrorState {
  error?: string;
  details?: string;
}

const ErrorPage = (): JSX.Element => {
  const location = useLocation();
  const state = location.state as ErrorState | null;

  const errorMessage = state?.error || "예상치 못한 오류가 발생했습니다";
  const errorDetails = state?.details;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <header className="container p-6">
        <Logo />
      </header>
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <div className="mx-auto max-w-md space-y-8 px-6 text-center">
          <div className="relative">
            <div className="text-8xl font-bold text-gray-200 select-none dark:text-gray-800">
              5
              <span className="mx-2 inline-block animate-bounce">
                <Music size={80} className="text-purple-500" />
              </span>
              0
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse">
                <Headphones size={40} className="text-pink-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {errorMessage}
            </h1>
            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              {errorDetails ||
                "오류가 발생했습니다. 잠시 후 다시 시도해주세요."}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Link to="/" className="flex items-center gap-2">
                <Home size={18} />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>

          <div className="relative h-20 overflow-hidden">
            <div
              className="absolute animate-bounce"
              style={{
                left: "10%",
                animationDelay: "0s",
                animationDuration: "2s",
              }}
            >
              <Music size={20} className="text-purple-400 opacity-60" />
            </div>
            <div
              className="absolute animate-bounce"
              style={{
                left: "30%",
                animationDelay: "0.5s",
                animationDuration: "2.5s",
              }}
            >
              <Music size={16} className="text-pink-400 opacity-60" />
            </div>
            <div
              className="absolute animate-bounce"
              style={{
                left: "50%",
                animationDelay: "1s",
                animationDuration: "2s",
              }}
            >
              <Music size={18} className="text-purple-500 opacity-60" />
            </div>
            <div
              className="absolute animate-bounce"
              style={{
                left: "70%",
                animationDelay: "1.5s",
                animationDuration: "2.5s",
              }}
            >
              <Music size={14} className="text-pink-500 opacity-60" />
            </div>
            <div
              className="absolute animate-bounce"
              style={{
                left: "90%",
                animationDelay: "2s",
                animationDuration: "2s",
              }}
            >
              <Music size={16} className="text-purple-400 opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
