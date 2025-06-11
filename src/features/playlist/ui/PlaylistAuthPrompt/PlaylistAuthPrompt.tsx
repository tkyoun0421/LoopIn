import { josa } from "es-hangul";
import { AlertOctagon, ArrowRight } from "lucide-react";
import { JSX } from "react";

import Button from "@shared/ui/Button/Button";

interface PlaylistAuthPromptProps {
  onLoginClick?: () => void;
  playlistName?: string;
}

const PlaylistAuthPrompt = ({
  onLoginClick,
  playlistName = "이 플레이리스트",
}: PlaylistAuthPromptProps): JSX.Element => {
  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center px-2 py-12">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-8 space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            로그인을 하면
            <br />
            {josa(playlistName, "을/를")} 바로 감상할 수 있어요
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Spotify 계정으로 로그인하고
            <br />
            무료로 음악을 스트리밍하세요
          </p>
        </div>
        <div className="space-y-4">
          <Button
            onClick={handleLoginClick}
            className="group w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-3 font-medium text-white transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.32 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Spotify로 로그인
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Button>
        </div>
        <div className="mt-8 rounded-lg border border-gray-200 bg-blue-50/50 p-4 dark:border-gray-700 dark:bg-blue-900/20">
          <div className="flex items-start gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
              <AlertOctagon />
            </div>
            <div className="text-left text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium">왜 로그인이 필요한가요?</p>
              <p className="mt-1 text-blue-600 dark:text-blue-300">
                Spotify API를 통해 음악을 재생하고 플레이리스트를 관리하기
                위해서는 사용자 인증이 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistAuthPrompt;
