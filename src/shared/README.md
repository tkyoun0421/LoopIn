# Shared Layer

Shared 레이어는 프로젝트 전반에서 공통으로 사용되는 리소스들을 관리하는 최하위 레이어입니다.

## 구조

```
shared/
├── ui/         # 공통 UI 컴포넌트
│   ├── Button/           # 버튼 컴포넌트
│   ├── Card/             # 카드 컴포넌트
│   ├── Table/            # 테이블 컴포넌트
│   ├── Skeleton/         # 스켈레톤 컴포넌트
│   ├── ErrorMessage/     # 에러 메시지 컴포넌트
│   ├── OptimizedImage/   # 🆕 최적화된 이미지 컴포넌트
│   └── Logo/             # 로고 컴포넌트
├── lib/        # 유틸리티 라이브러리
│   └── utils/
│       ├── imageUtils.ts     # 🆕 이미지 최적화 유틸리티
│       └── ...
├── hooks/      # 공통 훅
│   ├── useImagePresets.ts    # 🆕 이미지 프리셋 훅
│   └── ...
├── model/      # 공통 타입/모델
├── configs/    # 공통 설정
└── stores/     # 글로벌 상태 관리
```

## 역할

- **재사용 가능한 컴포넌트**: 프로젝트 전반에서 사용되는 UI 컴포넌트
- **공통 유틸리티**: 여러 레이어에서 사용되는 헬퍼 함수
- **공통 타입**: 프로젝트 전반에서 사용되는 TypeScript 타입
- **글로벌 설정**: 환경 설정, 상수 등
- **성능 최적화**: 이미지 최적화, 캐싱 전략 등

## 의존성 규칙

- **어떤 레이어도 의존할 수 없음**: 완전히 독립적
- **외부 라이브러리만 사용 가능**: npm 패키지, 브라우저 API 등
- **순수 함수/컴포넌트**: 사이드 이펙트 최소화

## 폴더별 설명

### ui/

공통으로 사용되는 UI 컴포넌트들

#### OptimizedImage/ 🆕

- **최적화된 이미지 컴포넌트**: 자동 크기 조정 및 지연 로딩
- **지원 기능**:
  - Intersection Observer를 활용한 지연 로딩
  - 자동 크기 최적화 (URL 파라미터 기반)
  - 플레이스홀더 및 폴백 이미지 지원
  - 반응형 이미지 (`sizes` 속성 지원)
  - 에러 처리 및 재시도 로직

```typescript
<OptimizedImage
  src="image-url"
  alt="설명"
  width={320}
  height={320}
  className="rounded-lg"
  loading="lazy" // 또는 "eager"
  objectFit="cover"
  onLoad={() => console.log('이미지 로드 완료')}
  onError={() => console.log('이미지 로드 실패')}
/>
```

#### Button/

- 기본 버튼 컴포넌트
- 다양한 variant (primary, secondary, outline 등)
- 크기별 옵션 (small, medium, large)

#### Card/

- 카드 레이아웃 컴포넌트
- 그림자, 테두리 등 스타일 옵션
- 헤더, 바디, 푸터 영역 지원

#### Table/

- 데이터 테이블 컴포넌트
- 정렬, 페이지네이션 기능
- 반응형 디자인 지원

#### Skeleton/

- 로딩 상태 스켈레톤 컴포넌트
- 다양한 형태 지원 (텍스트, 이미지, 블록)

#### ErrorMessage/

- 에러 메시지 표시 컴포넌트
- 다양한 에러 타입별 스타일
- 재시도 버튼 옵션

#### Logo/

- 앱 로고 컴포넌트
- 다양한 크기 지원
- 브랜드 가이드라인 준수

### lib/utils/ 🆕 이미지 최적화 유틸리티

#### imageUtils.ts

이미지 처리 및 최적화를 위한 유틸리티 함수들:

```typescript
// 최적 이미지 선택
selectOptimalImage(images, targetWidth, targetHeight?)

// 최소 품질 보장 이미지 선택
selectMinQualityImage(images, minWidth, minHeight?)

// srcSet 생성
generateSrcSet(images)

// 프리셋별 이미지 선택
selectImageByPreset(images, 'thumbnail' | 'small' | 'medium' | 'large')

// 이미지 프리로드
preloadImage(src)
preloadImages(urls[])

// 재시도 로더
createRetryImageLoader(imageUrls[], maxRetries)
```

**주요 기능**:

- **스마트 이미지 선택**: 타겟 크기에 가장 적합한 이미지 자동 선택
- **품질 보장**: 최소 품질 기준을 만족하는 이미지 선택
- **반응형 지원**: srcSet 생성으로 다양한 화면 크기 대응
- **프리로드**: 이미지 미리 로딩으로 사용자 경험 향상
- **에러 처리**: 이미지 로드 실패 시 재시도 및 폴백 처리

### hooks/

#### useImagePresets.ts 🆕

다양한 용도별 이미지 프리셋을 제공하는 훅:

```typescript
const presets = useImagePresets();

// 사용 가능한 프리셋
presets.thumbnail; // 48x48 - 작은 썸네일
presets.small; // 96x96 - 작은 이미지
presets.medium; // 192x192 - 중간 크기
presets.large; // 320x320 - 큰 이미지
presets.banner; // 640x192 - 배너 형태
presets.profile; // 80x80 - 프로필 이미지 (원형)
presets.card; // 160x160 - 카드용 이미지
```

각 프리셋은 다음을 포함:

- `width`, `height`: 최적 크기
- `sizes`: 반응형 이미지 크기 설정
- `className`: Tailwind CSS 클래스

#### 기존 훅들

- **useLocalStorage**: 로컬 스토리지 훅
- **useDebounce**: 디바운스 훅
- **useMediaQuery**: 미디어 쿼리 훅
- **useClickOutside**: 외부 클릭 감지 훅

### configs/

공통 설정

- **env**: 환경 변수 설정
- **api**: API 엔드포인트 설정
- **cacheConfig**: React Query 캐싱 전략
- **theme**: 테마 설정 (색상, 폰트 등)

### stores/

글로벌 상태 관리

- **theme**: 테마 상태 (다크/라이트 모드)
- **app**: 앱 전체 상태 (로딩, 에러 등)

## 🆕 이미지 최적화 시스템

### 사용 방법

1. **기본 사용법**:

```typescript
import OptimizedImage from '@shared/ui/OptimizedImage/OptimizedImage';

<OptimizedImage
  src={imageUrl}
  alt="앨범 커버"
  width={320}
  height={320}
/>
```

2. **프리셋 활용**:

```typescript
import useImagePresets from '@shared/hooks/useImagePresets';
import { selectImageByPreset } from '@shared/lib/utils/imageUtils';

const presets = useImagePresets();
const optimizedUrl = selectImageByPreset(images, 'medium');

<OptimizedImage
  src={optimizedUrl}
  alt="앨범 커버"
  {...presets.medium}
/>
```

### 성능 개선 효과

- **로딩 시간 단축**: 적절한 크기의 이미지만 로드
- **대역폭 절약**: 불필요한 고해상도 이미지 로드 방지
- **사용자 경험**: 지연 로딩으로 초기 페이지 로드 개선
- **반응형 최적화**: 디바이스별 최적 이미지 제공

## 개발 가이드라인

1. **순수성 유지**: 사이드 이펙트 없는 순수 함수/컴포넌트
2. **재사용성**: 여러 곳에서 사용 가능하도록 범용적 설계
3. **성능 최적화**: 이미지 최적화, 메모이제이션 활용
4. **문서화**: 각 컴포넌트/함수는 JSDoc으로 문서화
5. **테스트**: 모든 공통 기능은 테스트 작성 필수
6. **타입 안전성**: 엄격한 TypeScript 타입 정의

## 컴포넌트 작성 규칙

```typescript
// 예시: OptimizedImage 컴포넌트
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  // ... 기타 props
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  loading = "lazy",
  ...props
}) => {
  // 최적화 로직 구현
};
```

## 네이밍 컨벤션

- **컴포넌트**: PascalCase (Button, OptimizedImage)
- **함수**: camelCase (selectOptimalImage, preloadImages)
- **상수**: UPPER_SNAKE_CASE (API_BASE_URL)
- **타입**: PascalCase (ImagePreset, OptimizedImageProps)
