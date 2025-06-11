# Features Layer

Features 레이어는 비즈니스 로직과 기능을 담당하는 레이어입니다. 각 기능별로 독립적인 모듈을 구성하여 관리합니다.

## 구조

```
features/
├── auth/       # 인증 기능
│   ├── api/    # 인증 관련 API
│   ├── model/  # 인증 타입/모델
│   ├── store/  # 인증 상태 관리
│   ├── hooks/  # 인증 커스텀 훅
│   └── ui/     # 인증 UI 컴포넌트
├── playlist/   # 플레이리스트 기능
│   ├── api/    # 플레이리스트 API
│   ├── model/  # 플레이리스트 타입/모델
│   ├── hooks/  # 플레이리스트 훅
│   └── ui/     # 플레이리스트 UI
├── user/       # 사용자 기능
└── albums/     # 앨범 기능
```

## 역할

- **비즈니스 로직**: 각 도메인별 핵심 비즈니스 로직 구현
- **상태 관리**: 기능별 상태 관리 (Zustand, React Query 등)
- **API 통신**: 백엔드와의 데이터 통신
- **데이터 모델링**: 기능별 타입과 인터페이스 정의

## 의존성 규칙

- shared 레이어만 import 가능
- app, pages, widgets는 import 불가
- 다른 features 간 직접 의존성 금지 (shared를 통해 통신)

## Feature별 설명

### auth/

- **목적**: Spotify OAuth 인증 처리
- **포함**: 로그인/로그아웃, 토큰 관리, 인증 상태 확인
- **API**: Spotify OAuth 엔드포인트
- **상태**: 사용자 인증 상태, 토큰 정보

### playlist/

- **목적**: 플레이리스트 관리 기능
- **포함**: 플레이리스트 CRUD, 곡 추가/삭제
- **API**: Spotify Playlist API
- **상태**: 플레이리스트 목록, 선택된 플레이리스트

### user/

- **목적**: 사용자 정보 관리
- **포함**: 프로필 정보, 사용자 설정
- **API**: Spotify User API
- **상태**: 사용자 프로필, 설정 정보

### albums/

- **목적**: 앨범 관련 기능
- **포함**: 앨범 검색, 상세 정보, 즐겨찾기
- **API**: Spotify Albums API
- **상태**: 앨범 목록, 검색 결과

## 폴더별 구조

### api/

- API 호출 함수들
- HTTP 클라이언트 설정
- 에러 처리 로직

### model/

- TypeScript 타입 정의
- 인터페이스 및 enum
- 도메인 모델 정의

### store/

- Zustand 스토어
- 상태 관리 로직
- 액션 정의

### hooks/

- React Query 훅
- 커스텀 훅
- 비즈니스 로직 훅

### ui/

- 기능별 UI 컴포넌트
- 폼, 모달, 리스트 등
- 기능에 특화된 컴포넌트

## 개발 가이드라인

1. **단일 책임**: 각 feature는 하나의 도메인만 담당
2. **독립성**: 다른 features에 직접 의존하지 않음
3. **폴더 구조**: 표준 폴더 구조 준수 (api, model, store, hooks, ui)
4. **타입 안전성**: TypeScript로 모든 타입 정의
5. **에러 처리**: 일관된 에러 처리 패턴 적용
6. **테스트**: 각 feature별 단위 테스트 작성

## 통신 패턴

- **Features ↔ Shared**: shared 레이어의 공통 기능 활용
- **Features ↔ Features**: 직접 통신 금지, 이벤트나 shared store 활용
- **Features → UI**: hooks를 통한 데이터 제공
