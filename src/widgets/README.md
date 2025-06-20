# Widgets Layer

Widgets 레이어는 독립적인 UI 블록들을 관리하는 레이어입니다. 페이지에서 조합되어 사용되는 큰 단위의 컴포넌트들을 포함합니다.

## 구조

```
widgets/
├── Header/         # 헤더 위젯
├── Navigation/     # 네비게이션 위젯
├── SideBar/        # 사이드바 위젯
├── MyLibrary/      # 내 라이브러리 위젯
└── MobileFooter/   # 모바일 푸터 위젯
```

## 역할

- **독립적인 UI 블록**: 여러 페이지에서 재사용 가능한 UI 단위
- **비즈니스 로직 포함**: features를 활용하여 기능적인 UI 블록 구성
- **컴포넌트 조합**: shared UI 컴포넌트들을 조합하여 복합 위젯 생성
- **반응형 디자인**: 모바일/데스크톱에 최적화된 레이아웃 제공

## 의존성 규칙

- features, shared 레이어만 import 가능
- app, pages 레이어는 import 불가
- 다른 widgets 간 직접 의존성 금지

## 위젯별 설명

### Header/

- 앱 상단 헤더 컴포넌트
- 로고, 검색바, 사용자 프로필 등 포함
- 모든 페이지에서 공통으로 사용
- **반응형**: 모바일에서는 간소화된 헤더 표시

### Navigation/

- 주요 네비게이션 메뉴
- 홈, 검색, 라이브러리 등 메인 메뉴
- 현재 페이지 하이라이트 기능
- **접근성**: 키보드 네비게이션 및 ARIA 지원

### SideBar/

- 좌측 사이드바 컴포넌트
- 플레이리스트 목록, 바로가기 등
- 접기/펼치기 기능 제공
- **성능**: 가상화를 통한 대량 플레이리스트 렌더링 최적화

### MyLibrary/

- 사용자 라이브러리 위젯
- 저장된 음악, 플레이리스트 등
- 개인화된 컨텐츠 표시
- **🆕 최적화**: 이미지 최적화로 썸네일 로딩 성능 향상

### MobileFooter/

- 모바일 전용 하단 네비게이션
- 주요 기능들의 빠른 접근 제공
- 슬라이딩 백그라운드 애니메이션
- **터치 친화적**: 터치 기반 인터랙션 최적화

## 🆕 최신 업데이트

### 성능 최적화

1. **이미지 최적화**:

   - 모든 위젯에서 OptimizedImage 컴포넌트 적용
   - 위젯별 이미지 프리셋 사용
   - 지연 로딩으로 초기 렌더링 성능 향상

2. **렌더링 최적화**:

   - React.memo 적용으로 불필요한 리렌더링 방지
   - useMemo, useCallback 활용한 최적화
   - 가상화(Virtualization) 적용 (대량 데이터 렌더링)

3. **상태 관리 개선**:
   - Zustand 스토어 활용한 효율적인 전역 상태 관리
   - 컴포넌트별 로컬 상태 최적화

### 사용자 경험 개선

- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- **다크 모드**: 모든 위젯에서 테마 지원
- **애니메이션**: 부드러운 전환 효과 및 마이크로 인터랙션
- **접근성**: WCAG 가이드라인 준수

### 모바일 최적화

- **터치 인터페이스**: 터치 기반 인터랙션 최적화
- **모바일 네비게이션**: 하단 네비게이션으로 사용성 개선
- **제스처 지원**: 스와이프, 탭 제스처 지원

## 개발 가이드라인

1. **독립성 유지**: 각 위젯은 독립적으로 동작해야 함
2. **재사용성**: 여러 페이지에서 사용 가능하도록 설계
3. **기능 중심**: 단순한 UI가 아닌 기능적인 블록으로 구성
4. **상태 관리**: 필요시 features의 store를 활용
5. **폴더 구조**: 각 위젯은 폴더 단위로 구성하고 index 파일로 export
6. **성능 최적화**: 이미지 최적화, 메모이제이션 적용
7. **반응형**: 모든 위젯은 반응형 디자인 지원

## 위젯 vs 컴포넌트 구분

- **Widgets**: 비즈니스 로직을 포함한 독립적인 UI 블록
- **Shared UI**: 순수한 재사용 가능한 UI 컴포넌트
- **Features UI**: 특정 기능에 종속된 UI 컴포넌트

## 위젯 최적화 패턴

### 1. 이미지 최적화

```typescript
import OptimizedImage from '@shared/ui/OptimizedImage/OptimizedImage';
import useImagePresets from '@shared/hooks/useImagePresets';

const PlaylistWidget = ({ playlist }) => {
  const presets = useImagePresets();

  return (
    <div className="playlist-widget">
      <OptimizedImage
        src={playlist.images[0]?.url}
        alt={playlist.name}
        {...presets.thumbnail}
        loading="lazy"
      />
      <h3>{playlist.name}</h3>
    </div>
  );
};
```

### 2. 메모이제이션 활용

```typescript
import { memo, useMemo } from 'react';

const MyLibrary = memo(({ playlists }) => {
  const sortedPlaylists = useMemo(
    () => playlists.sort((a, b) => a.name.localeCompare(b.name)),
    [playlists]
  );

  return (
    <div>
      {sortedPlaylists.map(playlist => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
});
```

### 3. 가상화 적용

```typescript
import { FixedSizeList as List } from 'react-window';

const PlaylistList = ({ playlists }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <PlaylistItem playlist={playlists[index]} />
    </div>
  );

  return (
    <List
      height={400}
      itemCount={playlists.length}
      itemSize={60}
    >
      {Row}
    </List>
  );
};
```

### 4. 반응형 디자인

```typescript
import { useMediaQuery } from '@shared/hooks/useMediaQuery';

const Navigation = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileNavigation /> : <DesktopNavigation />;
};
```

## 성능 모니터링

### 측정 지표

- **First Contentful Paint (FCP)**: 첫 콘텐츠 페인트 시간
- **Largest Contentful Paint (LCP)**: 최대 콘텐츠 페인트 시간
- **Cumulative Layout Shift (CLS)**: 누적 레이아웃 이동
- **Time to Interactive (TTI)**: 인터랙션 가능 시점

### 최적화 체크리스트

- [ ] 이미지 최적화 적용
- [ ] React.memo 적용
- [ ] useMemo/useCallback 활용
- [ ] 불필요한 리렌더링 방지
- [ ] 가상화 적용 (대량 데이터)
- [ ] 코드 분할 적용
- [ ] 접근성 준수
- [ ] 반응형 디자인 구현

## 테스트 전략

### 단위 테스트

```typescript
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('헤더가 올바르게 렌더링된다', () => {
  render(<Header />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
```

### 성능 테스트

```typescript
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("대량 데이터 렌더링 성능", () => {
  const { result } = renderHook(() => useLargeDataset());

  act(() => {
    // 성능 측정 로직
  });

  expect(result.current.renderTime).toBeLessThan(100);
});
```
