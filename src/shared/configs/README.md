# React Query 캐싱 전략 가이드

## 캐싱 설정 타입

### 1. `PERMANENT_CACHE_CONFIG` - 영구 캐싱

- **용도**: 설정값, 상수, 거의 변하지 않는 정적 데이터
- **staleTime**: `Infinity` (무한히 fresh)
- **gcTime**: `24시간`
- **사용 예시**: API 설정, 앱 상수 등

### 2. `LONG_CACHE_CONFIG` - 장기간 캐싱

- **용도**: 검색 결과, 카테고리, 앨범 정보 등 변화가 드문 데이터
- **staleTime**: `30분`
- **gcTime**: `2시간`
- **사용 예시**:
  - 검색 결과 (`useGetSearchForItem`, `useGetInfiniteSearchForItem`)
  - 카테고리 목록 (`useGetSeveralBrowseCategories`)

### 3. `MEDIUM_CACHE_CONFIG` - 중간 캐싱

- **용도**: 자주 바뀌지 않지만 완전히 정적이지 않은 데이터
- **staleTime**: `15분`
- **gcTime**: `30분`
- **사용 예시**:
  - 새로운 릴리스 (`useGetNewReleases`)

### 4. `SHORT_CACHE_CONFIG` - 단기간 캐싱

- **용도**: 사용자 상태, 실시간 데이터 등 자주 변하는 데이터
- **staleTime**: `5분`
- **gcTime**: `10분`
- **사용 예시**:
  - 사용자 프로필, 플레이리스트 등

## 사용 방법

```typescript
import { LONG_CACHE_CONFIG } from "@shared/configs/cacheConfig";

const useMyQuery = () => {
  return useQuery({
    queryKey: ["my-data"],
    queryFn: fetchMyData,
    ...LONG_CACHE_CONFIG, // 캐싱 설정 적용
  });
};
```

## 캐싱 전략 선택 기준

1. **데이터 변경 빈도**: 얼마나 자주 바뀌는가?
2. **사용자 경험**: 실시간성이 중요한가?
3. **API 비용**: 불필요한 요청을 줄여야 하는가?
4. **네트워크 환경**: 사용자의 네트워크가 불안정한가?

## 주요 옵션 설명

### staleTime

- 데이터가 "fresh"한 상태를 유지하는 시간
- 이 시간 동안은 재요청하지 않음
- `0`: 즉시 stale 상태 (기본값)
- `Infinity`: 영원히 fresh 상태

### gcTime (구 cacheTime)

- 메모리에서 캐시를 보관하는 시간
- 컴포넌트가 언마운트되고 이 시간이 지나면 가비지 컬렉션
- 기본값: `5분`

### refetchOnWindowFocus

- 윈도우 포커스시 자동 재요청 여부
- 실시간 데이터: `true`
- 정적 데이터: `false`

### refetchOnMount

- 컴포넌트 마운트시 재요청 여부
- 캐시된 데이터가 stale할 때만 적용

## 성능 모니터링

React Query Devtools를 사용하여 캐싱 효과를 모니터링할 수 있습니다:

1. 캐시 히트율 확인
2. 불필요한 재요청 감지
3. 메모리 사용량 모니터링

## 팁

1. **보수적으로 시작**: 짧은 캐시 시간부터 시작해서 점진적으로 늘리기
2. **사용자 피드백 고려**: 데이터 신선도와 성능 사이의 균형 찾기
3. **환경별 설정**: 개발/스테이징/프로덕션 환경별로 다른 설정 고려
