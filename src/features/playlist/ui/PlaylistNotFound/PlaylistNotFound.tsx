import { Home, Music, Search, AlertCircle } from "lucide-react";
import { JSX } from "react";
import { Link } from "react-router";

import Button from "@shared/ui/Button/Button";

const PlaylistNotFound = (): JSX.Element => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <div className="mx-auto max-w-md space-y-8 px-6 text-center">
          <div className="relative">
            <div className="flex items-center justify-center text-8xl font-bold text-[hsl(var(--primary)/0.6)] select-none dark:text-[hsl(var(--primary))]">
              <AlertCircle size={120} />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              요청하신 플레이리스트가 존재하지 않거나 삭제되었을 수 있습니다.
              <br />
              다른 멋진 플레이리스트를 찾아보시는 건 어떨까요?
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="outline" className="flex items-center gap-2">
              <Link to="/search" className="flex items-center gap-2">
                <Search size={18} />
                음악 검색하기
              </Link>
            </Button>
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
    </section>
  );
};

export default PlaylistNotFound;
