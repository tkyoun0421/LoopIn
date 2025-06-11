# Shared Layer

Shared 레이어는 프로젝트 전반에서 공통으로 사용되는 리소스들을 관리하는 최하위 레이어입니다.

## 구조

```
shared/
├── ui/         # 공통 UI 컴포넌트
│   ├── Button/     # 버튼 컴포넌트
│   ├── Card/       # 카드 컴포넌트
│   ├── Table/      # 테이블 컴포넌트
│   ├── Skeleton/   # 스켈레톤 컴포넌트
│   ├── ErrorMessage/ # 에러 메시지 컴포넌트
│   └── Logo/       # 로고 컴포넌트
├── lib/        # 유틸리티 라이브러리
├── model/      # 공통 타입/모델
├── hooks/      # 공통 훅
├── configs/    # 공통 설정
└── stores/     # 글로벌 상태 관리
```

## 역할

- **재사용 가능한 컴포넌트**: 프로젝트 전반에서 사용되는 UI 컴포넌트
- **공통 유틸리티**: 여러 레이어에서 사용되는 헬퍼 함수
- **공통 타입**: 프로젝트 전반에서 사용되는 TypeScript 타입
- **글로벌 설정**: 환경 설정, 상수 등

## 의존성 규칙

- **어떤 레이어도 의존할 수 없음**: 완전히 독립적
- **외부 라이브러리만 사용 가능**: npm 패키지, 브라우저 API 등
- **순수 함수/컴포넌트**: 사이드 이펙트 최소화

## 폴더별 설명

### ui/

공통으로 사용되는 UI 컴포넌트들

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

### lib/

공통 유틸리티 함수들

- **api**: HTTP 클라이언트, 인터셉터
- **utils**: 포맷팅, 변환 함수
- **constants**: 앱 전반의 상수
- **validators**: 유효성 검사 함수

### model/

공통 타입 정의

- **api**: API 응답 타입
- **common**: 공통 인터페이스
- **error**: 에러 타입 정의

### hooks/

공통 커스텀 훅

- **useLocalStorage**: 로컬 스토리지 훅
- **useDebounce**: 디바운스 훅
- **useMediaQuery**: 미디어 쿼리 훅
- **useClickOutside**: 외부 클릭 감지 훅

### configs/

공통 설정

- **env**: 환경 변수 설정
- **api**: API 엔드포인트 설정
- **theme**: 테마 설정 (색상, 폰트 등)

### stores/

글로벌 상태 관리

- **theme**: 테마 상태 (다크/라이트 모드)
- **app**: 앱 전체 상태 (로딩, 에러 등)

## 개발 가이드라인

1. **순수성 유지**: 사이드 이펙트 없는 순수 함수/컴포넌트
2. **재사용성**: 여러 곳에서 사용 가능하도록 범용적 설계
3. **문서화**: 각 컴포넌트/함수는 JSDoc으로 문서화
4. **테스트**: 모든 공통 기능은 테스트 작성 필수
5. **타입 안전성**: 엄격한 TypeScript 타입 정의
6. **성능**: 불필요한 리렌더링 방지, 메모이제이션 활용

## 컴포넌트 작성 규칙

```typescript
// 예시: Button 컴포넌트
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  ...props
}) => {
  // 구현
};
```

## 네이밍 컨벤션

- **컴포넌트**: PascalCase (Button, Card)
- **함수**: camelCase (formatDate, validateEmail)
- **상수**: UPPER_SNAKE_CASE (API_BASE_URL)
- **타입**: PascalCase (UserProfile, ApiResponse)
