import { JSX, useEffect } from "react";
import { useSearchParams } from "react-router";

import LoadingPage from "@pages/LoadingPage/LoadingPage";

import useExchangeToken from "@features/auth/hooks/useExchangeToken";

const CallbackPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code) {
      exchangeToken(code);
    }
  }, [code, exchangeToken]);

  return <LoadingPage />;
};

export default CallbackPage;
