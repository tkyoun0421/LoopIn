import { Lock } from "lucide-react";
import { JSX } from "react";

import LoginButton from "@features/auth/ui/LoginButton";

const PlaylistLoginRequired = (): JSX.Element => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-10 py-16 shadow-xl dark:border-neutral-800 dark:bg-[hsl(var(--secondary))]">
        <Lock size={48} className="mb-4 text-purple-500" />
        <h2 className="mb-2 text-center text-xl font-extrabold md:text-2xl">
          아직 로그인을 하지 않으셨네요
        </h2>
        <p className="text-muted-foreground mb-6 text-center text-sm md:text-base">
          플레이리스트를 보려면
          <br />
          Spotify 계정으로 로그인 해주세요
        </p>
        <LoginButton />
      </div>
    </div>
  );
};

export default PlaylistLoginRequired;
