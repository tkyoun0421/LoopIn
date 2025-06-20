# Shared Configs

공통 설정 파일들을 관리하는 디렉토리입니다.

## 구조

```
configs/
├── api.ts           # API 엔드포인트 설정
├── cacheConfig.ts   # React Query 캐싱 전략
├── clientConfig.ts  # 클라이언트 설정
├── env.ts          # 환경 변수 설정
└── scope.ts        # Spotify API 스코프 설정
```

## 파일별 설명

### api.ts 🆕 업데이트됨

Spotify Web API 엔드포인트 설정을 관리합니다.

**주요 개선사항**:

- API 엔드포인트 최적화
- 요청 헤더 최적화
- 에러 처리 로직 개선
- 성능 개선을 위한 요청 최적화

```typescript
// API 베이스 URL 및 엔드포인트 설정
export const API_CONFIG = {
  BASE_URL: "https://api.spotify.com/v1",
  ENDPOINTS: {
    // 최적화된 엔드포인트들
    SEARCH: "/search",
    PLAYLISTS: "/playlists",
    ALBUMS: "/albums",
    // ...
  },
};
```

### cacheConfig.ts

React Query 캐싱 전략을 정의합니다.

**캐싱 타입별 설정**:

1. **PERMANENT_CACHE_CONFIG** - 영구 캐싱

   - 설정값, 상수, 거의 변하지 않는 정적 데이터
   - `staleTime`: `Infinity`
   - `gcTime`: `24시간`

2. **LONG_CACHE_CONFIG** - 장기간 캐싱

   - 검색 결과, 카테고리, 앨범 정보
   - `staleTime`: `30분`
   - `gcTime`: `2시간`

3. **MEDIUM_CACHE_CONFIG** - 중간 캐싱

   - 자주 바뀌지 않지만 완전히 정적이지 않은 데이터
   - `staleTime`: `15분`
   - `gcTime`: `30분`

4. **SHORT_CACHE_CONFIG** - 단기간 캐싱
   - 사용자 상태, 실시간 데이터
   - `staleTime`: `5분`
   - `gcTime`: `10분`

### clientConfig.ts

클라이언트 애플리케이션 설정을 관리합니다.

```typescript
export const CLIENT_CONFIG = {
  APP_NAME: "Loop-In",
  VERSION: "1.0.0",
  SUPPORTED_LOCALES: ["ko", "en"],
  DEFAULT_LOCALE: "ko",
};
```

### env.ts

환경 변수 설정을 관리합니다.

```typescript
export const ENV = {
  SPOTIFY_CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  REDIRECT_URI: process.env.REACT_APP_REDIRECT_URI,
  NODE_ENV: process.env.NODE_ENV,
};
```

### scope.ts

Spotify API 스코프 설정을 관리합니다.

```typescript
export const SPOTIFY_SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
];
```

## 🆕 최신 업데이트

### API 설정 개선

1. **성능 최적화**:

   - API 요청 최적화
   - 중복 요청 방지
   - 요청 헤더 최적화

2. **에러 처리 강화**:

   - 상세한 에러 분류
   - 재시도 로직 개선
   - 사용자 친화적 에러 메시지

3. **보안 강화**:
   - 토큰 관리 개선
   - 요청 검증 강화
   - CORS 설정 최적화

### 캐싱 전략 최적화

**사용 예시**:

```typescript
// 검색 결과 - 장기간 캐싱
const useSearchResults = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchTracks(query),
    ...LONG_CACHE_CONFIG,
  });
};

// 사용자 프로필 - 단기간 캐싱
const useUserProfile = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: fetchUserProfile,
    ...SHORT_CACHE_CONFIG,
  });
};
```

## 설정 사용 가이드

### 1. API 엔드포인트 사용

```typescript
import { API_CONFIG } from "@shared/configs/api";

const fetchAlbums = async () => {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALBUMS}`,
  );
  return response.json();
};
```

### 2. 캐싱 설정 적용

```typescript
import { MEDIUM_CACHE_CONFIG } from "@shared/configs/cacheConfig";

const useNewReleases = () => {
  return useQuery({
    queryKey: ["albums", "new-releases"],
    queryFn: fetchNewReleases,
    ...MEDIUM_CACHE_CONFIG,
  });
};
```

### 3. 환경 변수 접근

```typescript
import { ENV } from "@shared/configs/env";

const spotifyAuth = new SpotifyAuth({
  clientId: ENV.SPOTIFY_CLIENT_ID,
  redirectUri: ENV.REDIRECT_URI,
});
```

## 개발 환경별 설정

### Development

- 캐시 시간 단축 (빠른 개발을 위해)
- 상세한 로깅 활성화
- 디버그 모드 활성화

### Production

- 최적화된 캐시 시간
- 에러 로깅만 활성화
- 성능 최적화 모드

## 성능 모니터링

### 캐시 효율성 측정

```typescript
// React Query Devtools 활용
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 캐시 히트율 모니터링
const cacheHitRate = (hits: number, total: number) => {
  return (hits / total) * 100;
};
```

### API 성능 모니터링

```typescript
// API 응답 시간 측정
const measureApiResponse = async (apiCall: () => Promise<any>) => {
  const start = performance.now();
  const result = await apiCall();
  const end = performance.now();

  console.log(`API 응답 시간: ${end - start}ms`);
  return result;
};
```

## 설정 최적화 팁

1. **캐싱 전략 선택**:

   - 데이터 변경 빈도에 따른 적절한 캐시 시간 설정
   - 사용자 경험과 성능의 균형 고려

2. **API 요청 최적화**:

   - 필요한 필드만 요청 (GraphQL 스타일)
   - 페이지네이션 활용
   - 중복 요청 방지

3. **환경별 설정 분리**:

   - 개발/스테이징/프로덕션 환경별 설정
   - 환경 변수를 통한 동적 설정

4. **보안 고려사항**:
   - API 키 및 시크릿 안전한 관리
   - CORS 설정 최적화
   - 요청 검증 로직 구현
