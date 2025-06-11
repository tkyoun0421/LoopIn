# 프로젝트 아키텍처 개요

## 프로젝트 소개

**Loop-In**은 Spotify API를 활용한 웹 음악 스트리밍 서비스입니다. 데스크탑 우선 환경에서 고음질 스트리밍과 미니멀리즘 UI를 통해 직관적이고 쾌적한 음악 감상 경험을 제공합니다.

## 기술 스택

### Frontend

- **React 19**: 컴포넌트 기반 UI 라이브러리
- **TypeScript**: 타입 안전성 확보
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **React Query**: 서버 상태 관리 및 데이터 페칭
- **Zustand**: 클라이언트 상태 관리
- **React Router**: 클라이언트 사이드 라우팅

### Development & Build

- **CRA(Create React App)**: 빠른 개발 서버 및 빌드 도구
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **Jest**: 단위 테스트 프레임워크

### External APIs

- **Spotify Web API**: 음악 데이터 및 스트리밍
- **Spotify OAuth 2.0**: 사용자 인증

### Deployment

- **Vercel**: 프론트엔드 배포 플랫폼

## 아키텍처 패턴

### Feature-Sliced Design (FSD)

프로젝트는 Feature-Sliced Design 아키텍처를 따릅니다. 이는 확장 가능하고 유지보수가 용이한 구조를 제공합니다.

```
app → pages → widgets → features → shared
```

#### 레이어별 역할

- **App**: 애플리케이션 초기화 및 글로벌 설정
- **Pages**: 라우트별 페이지 컴포넌트 조합
- **Widgets**: 재사용 가능한 독립적 UI 블록
- **Features**: 비즈니스 로직 및 도메인 기능
- **Shared**: 공통 리소스 및 유틸리티

### 상태 관리 전략

#### 1. 서버 상태 (React Query)

- API 데이터 캐싱 및 동기화
- 백그라운드 업데이트
- 에러 및 로딩 상태 관리

```typescript
// 예시: 플레이리스트 데이터 페칭
const usePlaylist = (id: string) => {
  return useQuery({
    queryKey: ["playlist", id],
    queryFn: () => spotifyApi.getPlaylist(id),
    staleTime: 5 * 60 * 1000, // 5분
  });
};
```

#### 2. 클라이언트 상태 (Zustand)

- 사용자 인터페이스 상태
- 사용자 설정 및 환경설정
- 전역 UI 상태

```typescript
// 예시: 인증 상태 관리
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
  login: token => {
    // 로그인 로직
  },
  logout: () => {
    // 로그아웃 로직
  },
}));
```

## 코딩 컨벤션

### 1. 네이밍 규칙

- **컴포넌트**: PascalCase (`HomePage`, `PlaylistCard`)
- **함수/변수**: camelCase (`getUserData`, `isLoading`)
- **상수**: UPPER_SNAKE_CASE (`API_BASE_URL`, `DEFAULT_TIMEOUT`)
- **파일명**: PascalCase (컴포넌트), camelCase (유틸리티)

### 2. 폴더 구조

```
Feature/
├── index.ts          # Public API
├── Feature.tsx       # 메인 컴포넌트
├── Feature.test.tsx  # 테스트 파일
└── types.ts          # 타입 정의
```

### 3. Import 순서

```typescript
// 1. React 관련
import React from "react";
import { useState, useEffect } from "react";

// 2. 외부 라이브러리
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

// 3. 내부 모듈 (상위 레이어부터)
import { Button } from "@/shared/ui";
import { useAuth } from "@/features/auth";

// 4. 상대 경로
import "./Component.css";
```

## 성능 최적화

### 1. 코드 분할

- React.lazy를 활용한 페이지별 코드 분할
- 동적 import로 필요시에만 모듈 로드

### 2. 이미지 최적화

- WebP 포맷 사용
- 적절한 크기의 이미지 제공
- Lazy loading 적용

### 3. 렌더링 최적화

- React.memo로 불필요한 리렌더링 방지
- useMemo, useCallback으로 값/함수 메모이제이션
- 가상화를 통한 긴 리스트 성능 개선

## 테스트 전략

### 1. 단위 테스트

- 공통 유틸리티 함수
- Custom hooks
- 핵심 비즈니스 로직

### 2. 통합 테스트

- API 연동 부분
- 상태 관리 로직
- 컴포넌트 상호작용

### 3. E2E 테스트

- 주요 사용자 플로우
- 인증 프로세스
- 음악 재생 기능

## 배포 및 CI/CD

### 배포 파이프라인

1. **개발**: 로컬 개발 환경
2. **스테이징**: Vercel Preview 배포
3. **프로덕션**: Vercel Production 배포

### 자동화

- GitHub Actions를 통한 CI/CD
- PR 생성 시 자동 테스트 실행
- main 브랜치 머지 시 자동 배포

## 보안 고려사항

### 1. 인증 보안

- OAuth 2.0 PKCE 플로우 사용
- 토큰 안전 저장 (httpOnly 쿠키 권장)
- 토큰 자동 갱신 메커니즘

### 2. API 보안

- CORS 설정
- Rate limiting 고려
- 민감 정보 환경 변수 관리

### 3. 클라이언트 보안

- XSS 방지 (React의 기본 이스케이핑 활용)
- 사용자 입력 검증
- 외부 링크 안전성 검증

## 향후 확장 계획

### 1. 기능 확장

- 음악 공유 기능
- 개인화 추천 시스템
- 오프라인 재생 지원

### 2. 기술적 개선

- PWA 지원
- 반응형 디자인 개선
- 접근성 향상

### 3. 성능 개선

- 서비스 워커 도입
- 고급 캐싱 전략
- 번들 크기 최적화
