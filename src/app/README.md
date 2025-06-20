# App Layer

App 레이어는 애플리케이션의 초기화와 글로벌 설정을 담당하는 최상위 레이어입니다.

## 구조

```
app/
├── routes/     # 라우팅 설정
├── configs/    # 앱 레벨 설정
├── entry/      # 앱 진입점
├── public/     # 정적 자산 (HTML, favicon 등)
└── styles/     # 글로벌 스타일
```

## 역할

- **애플리케이션 초기화**: React 앱의 루트 설정
- **라우팅 관리**: React Router를 통한 페이지 라우팅
- **글로벌 설정**: 환경 변수, API 설정 등
- **글로벌 스타일**: 전역 CSS, 테마 설정
- **SEO 최적화**: 메타 태그, Open Graph 설정

## 의존성 규칙

- 모든 하위 레이어(pages, widgets, features, shared)를 import 가능
- 애플리케이션 전체의 진입점 역할

## 파일 설명

### routes/

- `App.tsx`: 메인 라우팅 컴포넌트

### configs/

- 환경별 설정 파일
- API 엔드포인트 설정
- 앱 상수 정의

### entry/

- 애플리케이션 진입점
- 초기 설정 및 providers 설정

### public/ 🆕 업데이트됨

- `index.html`: 메인 HTML 템플릿
- **SEO 최적화**: 메타 태그, Open Graph, Twitter Card 설정
- **성능 최적화**: 프리로드, DNS 프리페치 설정
- **접근성**: 뷰포트 설정, 언어 설정

**주요 개선사항**:

- Open Graph 메타 태그 추가 (소셜 미디어 공유 최적화)
- Twitter Card 지원
- SEO 최적화된 메타 태그
- 성능 최적화를 위한 리소스 힌트

### styles/

- 글로벌 CSS
- Tailwind CSS 설정
- 테마 변수

## 🆕 최신 업데이트

### HTML 최적화

- **SEO 개선**: 더 나은 검색 엔진 최적화를 위한 메타 태그 강화
- **소셜 미디어**: Open Graph와 Twitter Card로 소셜 공유 최적화
- **성능 향상**: 리소스 프리로드 및 DNS 프리페치 설정

### 개발 환경 개선

- 더 나은 개발자 도구 지원
- 디버깅 최적화
