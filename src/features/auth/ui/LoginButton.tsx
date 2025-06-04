import { JSX } from "react";

import getSpotifyAuth from "@features/auth/api/getSpotifyAuth";

import Button from "@shared/ui/Button/Button";

const LoginButton = (): JSX.Element => {
  return (
    <Button
      onClick={getSpotifyAuth}
      className="h-10 bg-[hsl(var(--primary))] bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium hover:bg-[hsl(var(--primary)/0.9)] hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600"
    >
      로그인
    </Button>
  );
};

export default LoginButton;
