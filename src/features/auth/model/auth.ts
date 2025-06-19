export type ClientAuthTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type AuthUrlParams = {
  response_type: "code";
  client_id: string;
  scope: string;
  code_challenge_method: "S256";
  code_challenge: string;
  redirect_uri: string;
};

export type ExchangeTokenResponse = ClientAuthTokenResponse & {
  refresh_token: string;
  scope: string;
};

export type OAuthError =
  | "access_denied"
  | "invalid_request"
  | "invalid_client"
  | "invalid_grant"
  | "unauthorized_client"
  | "unsupported_grant_type"
  | "invalid_scope";

export const getOAuthErrorMessage = (
  error: string,
): { title: string; description: string } => {
  const errorMap: Record<OAuthError, { title: string; description: string }> = {
    access_denied: {
      title: "인증이 취소되었습니다",
      description: "Spotify 로그인이 취소되었습니다. 다시 시도해주세요.",
    },
    invalid_request: {
      title: "잘못된 요청입니다",
      description:
        "인증 요청에 문제가 있습니다. 페이지를 새로고침 후 다시 시도해주세요.",
    },
    invalid_client: {
      title: "클라이언트 오류",
      description:
        "애플리케이션 설정에 문제가 있습니다. 잠시 후 다시 시도해주세요.",
    },
    invalid_grant: {
      title: "인증 코드 오류",
      description: "인증 코드가 유효하지 않습니다. 다시 로그인해주세요.",
    },
    unauthorized_client: {
      title: "권한이 없습니다",
      description: "이 애플리케이션은 해당 인증 방법을 사용할 권한이 없습니다.",
    },
    unsupported_grant_type: {
      title: "지원하지 않는 인증 방식",
      description: "지원하지 않는 인증 방식입니다.",
    },
    invalid_scope: {
      title: "잘못된 권한 범위",
      description: "요청한 권한 범위가 잘못되었습니다.",
    },
  } as const;

  return (
    errorMap[error as OAuthError] || {
      title: "OAuth 인증 오류",
      description: "인증 중 알 수 없는 오류가 발생했습니다.",
    }
  );
};
