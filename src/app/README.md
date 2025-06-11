# App Layer

App 레이어는 애플리케이션의 초기화와 글로벌 설정을 담당하는 최상위 레이어입니다.

## 구조

```
app/
├── routes/     # 라우팅 설정
├── configs/    # 앱 레벨 설정
├── entry/      # 앱 진입점
├── public/     # 정적 자산
└── styles/     # 글로벌 스타일
```

## 역할

- **애플리케이션 초기화**: React 앱의 루트 설정
- **라우팅 관리**: React Router를 통한 페이지 라우팅
- **글로벌 설정**: 환경 변수, API 설정 등
- **글로벌 스타일**: 전역 CSS, 테마 설정

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

### styles/

- 글로벌 CSS
- Tailwind CSS 설정
- 테마 변수
