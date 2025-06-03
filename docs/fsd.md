src/
├── app/
│ ├── providers/ # React Query, Zustand 등 전역 상태 관리 및 프로바이더
│ ├── routes/ # 라우팅 설정 및 라우터 컴포넌트
│ ├── configs/ # 환경 설정
│ ├── entry/ # 앱 진입점 (index.tsx 등)
│ ├── public/ # index.html
│ └── styles/ # 글로벌 스타일, Tailwind 설정
│
├── pages/
│ ├── Layout
│ │ └── AppLayout.tsx # / App 레이아웃 컴포넌트
│ ├── HomePage.tsx # 홈 페이지 컴포넌트 (라우트 단위, UI 컴포넌트 없음)
│ ├── SearchPage.tsx # 검색 페이지 컴포넌트
│ ├── PlaylistPage.tsx # 플레이리스트 페이지 컴포넌트
│ ├── LoadingPage.tsx # 로딩 페이지 컴포넌트
│ └── LoginPage.tsx # 로그인 페이지 컴포넌트
│
├── features/
│ ├── auth/
│ │ ├── api/ # Spotify OAuth 관련 API 호출 함수
│ │ ├── model/ # Zustand 기반 인증 상태관리 (토큰, 로그인 상태)
│ │ ├── ui/ # 로그인 버튼, 프로필 컴포넌트 등 UI
│ │ └── hooks/ # 인증 관련 커스텀 훅 (useAuth 등)
│ │
│ ├── music/
│ │ ├── api/ # Spotify 음악 API 래퍼 (트랙 검색, 재생 정보 등)
│ │ ├── model/ # 음악 재생 상태 (현재 재생곡, 플레이 상태 등)
│ │ ├── ui/ # 곡 리스트, 트랙 카드 등 UI 컴포넌트
│ │ ├── hooks/ # 재생 및 검색 훅
│ │ └── utils/ # 재생 관련 유틸 함수 (시간 포맷터, 볼륨 조절 등)
│ │
│ ├── playlist/
│ │ ├── api/ # 플레이리스트 관련 API 호출 함수
│ │ ├── model/ # 플레이리스트 상태관리 (곡 리스트, 즐겨찾기 등)
│ │ ├── ui/ # 플레이리스트 편집, 리스트 UI 컴포넌트 및 Aside 컴포넌트
│ │ └── hooks/ # 플레이리스트 훅 (추가, 삭제, 편집)
│ │
│ └── player/
│ ├── ui/ # 재생 컨트롤 버튼, 시크바 등 UI 컴포넌트
│ ├── model/ # 재생 상태 (재생 위치, 반복/셔플 모드 등)
│ └── hooks/ # 재생 제어 훅 (play, pause, seek 등)
│ │
│ └── components/ # 공통 레이아웃 컴포넌트
│ │ ├── Header / # 헤더
│ │ └── MyLibrary / # 라이브러리
│ │
├── shared/
│ ├── ui/ # 재사용 가능한 공통 UI 컴포넌트 (버튼, 모달, 폼 등)
│ ├── lib/ # 공통 라이브러리 함수 (API 클라이언트, 포맷터 등)
│ ├── types/ # 타입 정의 (TS 인터페이스, 타입 등)
│ ├── hooks/ # 공통 훅 (useTheme, useMediaQuery 등)
│ └── assets/ # 이미지, 아이콘, 글로벌 스타일 파일 등
