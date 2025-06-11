import { JSX, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

import LoadingPage from "@pages/LoadingPage/LoadingPage";

import useExchangeToken from "@features/auth/hooks/useExchangeToken";
import useLogout from "@features/auth/hooks/useLogout";
import { getOAuthErrorMessage } from "@features/auth/model/auth";

const CallbackPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (error) {
      console.error("OAuth 에러:", { error, errorDescription });
      if (error === "access_denied") {
        console.log("사용자가 Spotify 인증을 거부했습니다.");
        logout();
        return;
      }
      const errorMessage = getOAuthErrorMessage(error);
      navigate("/error", {
        replace: true,
        state: {
          error: errorMessage.title,
          details: errorDescription || errorMessage.description,
        },
      });
      return;
    }
    if (code) {
      exchangeToken(code);
      return;
    }
    navigate("/", { replace: true });
  }, [code, error, errorDescription, exchangeToken, logout, navigate]);

  return <LoadingPage />;
};

export default CallbackPage;
