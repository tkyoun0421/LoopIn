import { JSX, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import LoadingPage from "@pages/LoadingPage/LoadingPage";

import useExchangeToken from "@features/auth/hooks/useExchangeToken";
import { useTokenStore } from "@features/auth/store/useTokenStore";

const CallbackPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  const { setToken } = useTokenStore();

  const { mutate: exchangeToken } = useExchangeToken({
    onSuccess: data => {
      setToken(data);
      navigate("/");
    },
    onError: error => {
      console.error("❌ 토큰 교환 실패:", error);
    },
  });

  useEffect(() => {
    if (code) {
      exchangeToken(code);
    }
  }, [code, exchangeToken, navigate]);

  return <LoadingPage />;
};

export default CallbackPage;
