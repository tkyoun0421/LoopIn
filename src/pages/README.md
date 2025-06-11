# Pages Layer

Pages 레이어는 각 라우트에 대응하는 페이지 컴포넌트들을 관리하는 레이어입니다.

## 구조

```
pages/
├── Layout/             # 레이아웃 컴포넌트
├── HomePage/           # 홈 페이지
├── SearchPage/         # 검색 페이지
├── PlaylistDetailPage/ # 플레이리스트 상세 페이지
├── CallbackPage/       # OAuth 콜백 페이지
├── LoadingPage/        # 로딩 페이지
└── NotFoundPage/       # 404 페이지
```

## 역할

- **페이지 컴포넌트 조합**: widgets와 features를 조합하여 완전한 페이지 구성
- **라우팅 대응**: 각 URL 경로에 대응하는 페이지 제공
- **레이아웃 관리**: 공통 레이아웃과 페이지별 레이아웃 관리

## 의존성 규칙

- widgets, features, shared 레이어만 import 가능
- app 레이어나 다른 pages는 import 불가
- 각 페이지는 독립적이어야 함

## 페이지별 설명

### Layout/

- 공통 레이아웃 컴포넌트
- 헤더, 사이드바, 네비게이션 등을 포함

### HomePage/

- 메인 홈 페이지
- 추천 음악, 인기 차트 등 표시

### SearchPage/

- 음악 검색 페이지
- 검색 결과 표시 및 필터링

### PlaylistDetailPage/

- 플레이리스트 상세 페이지
- 플레이리스트 내 곡 목록 및 재생

### CallbackPage/

- Spotify OAuth 콜백 처리 페이지
- 인증 완료 후 리다이렉트 처리

### LoadingPage/

- 로딩 상태 페이지
- 앱 초기화 중 표시

### NotFoundPage/

- 404 에러 페이지
- 존재하지 않는 경로 접근 시 표시

## 개발 가이드라인

1. 각 페이지는 폴더 단위로 구성
2. 페이지별로 필요한 widgets와 features만 import
3. 페이지 간 직접적인 의존성은 금지
4. 공통 로직은 shared 레이어 활용
