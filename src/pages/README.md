# Pages Layer

Pages 레이어는 각 라우트에 대응하는 페이지 컴포넌트들을 관리하는 레이어입니다.

## 구조

```
pages/
├── Layout/             # 레이아웃 컴포넌트
├── HomePage/           # 홈 페이지
├── SearchPage/         # 검색 페이지
├── SearchDetailPage/   # 검색 상세 페이지
├── PlaylistPage/       # 플레이리스트 목록 페이지
├── PlaylistDetailPage/ # 플레이리스트 상세 페이지
├── CallbackPage/       # OAuth 콜백 페이지
├── LoadingPage/        # 로딩 페이지
├── ErrorPage/          # 에러 페이지
└── NotFoundPage/       # 404 페이지
```

## 역할

- **페이지 컴포넌트 조합**: widgets와 features를 조합하여 완전한 페이지 구성
- **라우팅 대응**: 각 URL 경로에 대응하는 페이지 제공
- **레이아웃 관리**: 공통 레이아웃과 페이지별 레이아웃 관리
- **성능 최적화**: 페이지별 이미지 최적화 및 로딩 최적화

## 의존성 규칙

- widgets, features, shared 레이어만 import 가능
- app 레이어나 다른 pages는 import 불가
- 각 페이지는 독립적이어야 함

## 페이지별 설명

### Layout/

- **AppLayout**: 공통 레이아웃 컴포넌트 (헤더, 사이드바, 푸터)
- **SearchLayout**: 검색 페이지 전용 레이아웃
- 헤더, 사이드바, 네비게이션 등을 포함

### HomePage/

- 메인 홈 페이지
- 추천 음악, 인기 차트, 새로운 릴리스 등 표시
- **🆕 최적화**: 이미지 최적화 적용으로 로딩 성능 향상

### SearchPage/

- 음악 검색 메인 페이지
- 검색 바, 카테고리, Year-End 콘텐츠 등

### SearchDetailPage/

- 상세 검색 결과 페이지
- 검색 결과 표시 및 필터링
- 무한 스크롤 및 탭 기반 결과 표시

### PlaylistPage/

- 사용자 플레이리스트 목록 페이지
- 내 라이브러리, 플레이리스트 관리
- **🆕 최적화**: 플레이리스트 썸네일 이미지 최적화

### PlaylistDetailPage/

- 플레이리스트 상세 페이지
- 플레이리스트 내 곡 목록 및 재생
- **🆕 최적화**: 플레이리스트 커버 이미지 최적화

### CallbackPage/

- Spotify OAuth 콜백 처리 페이지
- 인증 완료 후 리다이렉트 처리

### LoadingPage/

- 로딩 상태 페이지
- 앱 초기화 중 표시

### ErrorPage/

- 일반 에러 페이지
- 예기치 않은 오류 발생 시 표시

### NotFoundPage/

- 404 에러 페이지
- 존재하지 않는 경로 접근 시 표시

## 🆕 최신 업데이트

### 성능 최적화

1. **이미지 최적화**:

   - 모든 페이지에서 OptimizedImage 컴포넌트 사용
   - 페이지별 이미지 프리셋 적용
   - 지연 로딩으로 초기 로딩 시간 단축

2. **렌더링 최적화**:

   - React.memo 적용으로 불필요한 리렌더링 방지
   - 코드 스플리팅으로 페이지별 번들 크기 최적화

3. **데이터 페칭 최적화**:
   - React Query 캐싱 전략 적용
   - 페이지별 데이터 프리페칭

### 사용자 경험 개선

- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- **접근성**: ARIA 라벨, 키보드 네비게이션 지원
- **다크 모드**: 모든 페이지에서 다크/라이트 테마 지원

### 라우팅 개선

- **동적 라우팅**: 플레이리스트 ID 기반 라우팅
- **중첩 라우팅**: 레이아웃 기반 라우팅 구조
- **에러 바운더리**: 페이지별 에러 처리

## 개발 가이드라인

1. **페이지 구조**: 각 페이지는 폴더 단위로 구성
2. **의존성 관리**: 페이지별로 필요한 widgets와 features만 import
3. **독립성**: 페이지 간 직접적인 의존성은 금지
4. **공통 로직**: shared 레이어 활용
5. **성능**: 이미지 최적화, 코드 스플리팅 적용
6. **SEO**: 메타 태그, 페이지별 title 설정

## 페이지별 성능 최적화 팁

### 1. 이미지 최적화

```typescript
import OptimizedImage from '@shared/ui/OptimizedImage/OptimizedImage';
import useImagePresets from '@shared/hooks/useImagePresets';

const PlaylistDetailPage = () => {
  const presets = useImagePresets();

  return (
    <OptimizedImage
      src={playlist.images[0]?.url}
      alt={playlist.name}
      {...presets.large}
      loading="eager" // 중요한 이미지는 즉시 로딩
    />
  );
};
```

### 2. 코드 스플리팅

```typescript
import { lazy, Suspense } from 'react';
import LoadingPage from './LoadingPage/LoadingPage';

const PlaylistDetailPage = lazy(() => import('./PlaylistDetailPage/PlaylistDetailPage'));

const App = () => (
  <Suspense fallback={<LoadingPage />}>
    <PlaylistDetailPage />
  </Suspense>
);
```

### 3. 데이터 프리페칭

```typescript
import { useQueryClient } from "@tanstack/react-query";

const HomePage = () => {
  const queryClient = useQueryClient();

  // 중요한 데이터 미리 로딩
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["new-releases"],
      queryFn: fetchNewReleases,
    });
  }, []);
};
```

## 라우팅 구조

```typescript
// 라우팅 예시
const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'search/:query', element: <SearchDetailPage /> },
      { path: 'playlist', element: <PlaylistPage /> },
      { path: 'playlist/:id', element: <PlaylistDetailPage /> },
    ],
  },
  { path: '/callback', element: <CallbackPage /> },
  { path: '*', element: <NotFoundPage /> },
];
```
