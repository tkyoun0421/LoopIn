import { JSX, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import LoadingPage from "@pages/LoadingPage/LoadingPage";

import useExchangeToken from "@features/auth/hooks/useExchangeToken";
import { useTokenStore } from "@features/auth/store/useTokenStore";

const CallbackPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  const { setAccessToken, setRefreshToken } = useTokenStore();

  const { mutate: exchangeToken } = useExchangeToken({
    onSuccess: data => {
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      navigate("/");
    },
    onError: error => {
      console.error("❌ 토큰 교환 실패:", error);
    },
  });

  useEffect(() => {
    if (code) {
      console.log("실행");
      exchangeToken(code);
    } else {
      console.log("오류");
    }
    return () => {
      console.log("언마운트 코드: ", code);
      console.log("언마운트");
    };
  }, [code, exchangeToken, navigate]);

  return <LoadingPage />;
};

export default CallbackPage;
