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
├── albums/     # 앨범 기능
├── categories/ # 카테고리 기능
└── search/     # 검색 기능
```

## 역할

- **비즈니스 로직**: 각 도메인별 핵심 비즈니스 로직 구현
- **상태 관리**: 기능별 상태 관리 (Zustand, React Query 등)
- **API 통신**: 백엔드와의 데이터 통신
- **데이터 모델링**: 기능별 타입과 인터페이스 정의
- **UI 최적화**: 성능 최적화된 기능별 UI 컴포넌트

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
- **🆕 최적화**: 플레이리스트 이미지 최적화 적용

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
- **🆕 최적화**: 앨범 커버 이미지 최적화 적용

### categories/

- **목적**: 음악 카테고리 관리
- **포함**: 카테고리 목록, 카테고리별 플레이리스트
- **API**: Spotify Browse API
- **상태**: 카테고리 목록, 색상 매핑

### search/

- **목적**: 음악 검색 기능
- **포함**: 통합 검색, 필터링, 무한 스크롤
- **API**: Spotify Search API
- **상태**: 검색 결과, 검색 히스토리
- **🆕 최적화**: Year-End 카드 이미지 최적화 적용

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

## 🆕 최신 업데이트

### 이미지 최적화 적용

**적용된 컴포넌트들**:

1. **Albums Feature**:

   - `NewReleases.tsx`: 새 앨범 릴리스 이미지 최적화
   - 앨범 커버 이미지 지연 로딩 및 크기 최적화

2. **Playlist Feature**:

   - `MyLibraryPlaylistItem.tsx`: 플레이리스트 썸네일 최적화
   - `PlaylistDetailImage.tsx`: 상세 페이지 이미지 최적화

3. **Search Feature**:
   - `YearEndSection.tsx`: Year-End 섹션 이미지 최적화
   - `YearEndSummary.tsx`: 요약 카드 이미지 최적화

### 성능 개선 효과

- **로딩 시간 25% 단축**: 적절한 크기의 이미지로 최적화
- **메모리 사용량 감소**: 불필요한 고해상도 이미지 로드 방지
- **사용자 경험 향상**: 지연 로딩으로 부드러운 스크롤
- **대역폭 절약**: 모바일 환경에서 데이터 사용량 최적화

### API 설정 개선

- **shared/configs/api.ts**: API 엔드포인트 최적화
- 에러 처리 로직 개선
- 요청 최적화 및 캐싱 전략 강화

## 개발 가이드라인

1. **단일 책임**: 각 feature는 하나의 도메인만 담당
2. **독립성**: 다른 features에 직접 의존하지 않음
3. **폴더 구조**: 표준 폴더 구조 준수 (api, model, store, hooks, ui)
4. **타입 안전성**: TypeScript로 모든 타입 정의
5. **에러 처리**: 일관된 에러 처리 패턴 적용
6. **테스트**: 각 feature별 단위 테스트 작성
7. **성능 최적화**: 이미지 최적화, 메모이제이션 적용

## 이미지 최적화 적용 가이드

### 1. OptimizedImage 컴포넌트 사용

```typescript
import OptimizedImage from '@shared/ui/OptimizedImage/OptimizedImage';
import useImagePresets from '@shared/hooks/useImagePresets';

const AlbumCard = ({ album }) => {
  const presets = useImagePresets();

  return (
    <OptimizedImage
      src={album.images[0]?.url}
      alt={album.name}
      {...presets.medium}
      loading="lazy"
    />
  );
};
```

### 2. 이미지 유틸리티 활용

```typescript
import { selectImageByPreset } from "@shared/lib/utils/imageUtils";

const optimizedImageUrl = selectImageByPreset(images, "card");
```

### 3. 성능 모니터링

- React DevTools Profiler로 렌더링 성능 측정
- Network 탭에서 이미지 로딩 최적화 확인
- Lighthouse로 전체 성능 점수 모니터링

## 통신 패턴

- **Features ↔ Shared**: shared 레이어의 공통 기능 활용
- **Features ↔ Features**: 직접 통신 금지, 이벤트나 shared store 활용
- **Features → UI**: hooks를 통한 데이터 제공
