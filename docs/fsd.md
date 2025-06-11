# Feature-Sliced Design (FSD) Architecture

## 프로젝트 구조

```bash
src/
├── app/                    # Application Layer (앱 초기화 및 설정)
│   ├── routes/            # 라우팅 설정
│   │   └── App.tsx
│   ├── configs/           # 앱 레벨 설정
│   ├── entry/             # 앱 진입점
│   ├── public/            # 정적 자산
│   └── styles/            # 글로벌 스타일
├── pages/                  # Pages Layer (페이지별 조합)
│   ├── Layout/            # 레이아웃 컴포넌트
│   ├── HomePage/          # 홈 페이지
│   ├── SearchPage/        # 검색 페이지
│   ├── PlaylistDetailPage/# 플레이리스트 상세 페이지
│   ├── CallbackPage/      # OAuth 콜백 페이지
│   ├── LoadingPage/       # 로딩 페이지
│   └── NotFoundPage/      # 404 페이지
├── widgets/               # Widgets Layer (UI 블록)
│   ├── Header/            # 헤더 위젯
│   ├── Navigation/        # 네비게이션 위젯
│   ├── SideBar/           # 사이드바 위젯
│   └── MyLibrary/         # 내 라이브러리 위젯
├── features/              # Features Layer (비즈니스 기능)
│   ├── auth/              # 인증 기능
│   │   ├── api/           # 인증 API
│   │   ├── model/         # 인증 모델/타입
│   │   ├── store/         # 인증 상태 관리
│   │   ├── hooks/         # 인증 훅
│   │   └── ui/            # 인증 UI 컴포넌트
│   ├── playlist/          # 플레이리스트 기능
│   │   ├── api/           # 플레이리스트 API
│   │   ├── model/         # 플레이리스트 모델/타입
│   │   ├── hooks/         # 플레이리스트 훅
│   │   └── ui/            # 플레이리스트 UI 컴포넌트
│   ├── user/              # 사용자 기능
│   └── albums/            # 앨범 기능
└── shared/                # Shared Layer (공통 리소스)
    ├── ui/                # 공통 UI 컴포넌트
    │   ├── Button/        # 버튼 컴포넌트
    │   ├── Card/          # 카드 컴포넌트
    │   ├── Table/         # 테이블 컴포넌트
    │   ├── Skeleton/      # 스켈레톤 컴포넌트
    │   ├── ErrorMessage/  # 에러 메시지 컴포넌트
    │   └── Logo/          # 로고 컴포넌트
    ├── lib/               # 유틸리티 라이브러리
    ├── model/             # 공통 타입/모델
    ├── hooks/             # 공통 훅
    ├── configs/           # 공통 설정
    └── stores/            # 글로벌 상태 관리
```

## FSD 레이어별 설명

### 1. App Layer (앱 레이어)

- **목적**: 애플리케이션 초기화, 라우팅, 글로벌 설정
- **규칙**: 다른 모든 레이어를 의존할 수 있음
- **포함**: 라우터 설정, 글로벌 스타일, 환경 설정

### 2. Pages Layer (페이지 레이어)

- **목적**: 페이지별 컴포넌트 조합 및 라우팅
- **규칙**: widgets, features, shared만 의존 가능
- **포함**: 각 라우트에 대응하는 페이지 컴포넌트

### 3. Widgets Layer (위젯 레이어)

- **목적**: 독립적인 UI 블록 (헤더, 사이드바 등)
- **규칙**: features, shared만 의존 가능
- **포함**: 재사용 가능한 UI 블록

### 4. Features Layer (기능 레이어)

- **목적**: 비즈니스 로직과 기능
- **규칙**: shared만 의존 가능
- **포함**: 각 기능별 API, 모델, 훅, UI

### 5. Shared Layer (공유 레이어)

- **목적**: 프로젝트 전반에서 사용되는 공통 리소스
- **규칙**: 어떤 레이어도 의존할 수 없음
- **포함**: 공통 컴포넌트, 유틸리티, 타입, 설정

## 의존성 규칙

```
app → pages → widgets → features → shared
```

- 상위 레이어는 하위 레이어만 import 가능
- 같은 레이어 내에서는 상호 의존 금지
- shared는 다른 레이어를 import할 수 없음

## 장점

1. **확장성**: 새로운 기능 추가 시 명확한 위치
2. **유지보수성**: 레이어별 역할이 명확하여 코드 파악 용이
3. **재사용성**: shared 레이어를 통한 코드 재사용
4. **독립성**: 각 feature는 독립적으로 개발/테스트 가능
