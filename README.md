# Loop-In 🎵

Spotify Web API를 활용한 음악 검색 및 플레이리스트 관리 애플리케이션

## 📍 배포 사이트

**https://loop-in-five.vercel.app/**

## ✨ 주요 기능

- **🔍 음악 검색**: 트랙, 아티스트, 앨범 검색
- **📱 플레이리스트 관리**: 생성, 편집, 곡 추가/삭제
- **🎨 반응형 디자인**: 모바일/데스크톱 최적화
- **⚡ 이미지 최적화**: 자동 이미지 크기 최적화 및 지연 로딩
- **🌙 다크 모드**: 라이트/다크 테마 지원
- **🔐 Spotify OAuth**: 안전한 인증 시스템

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript
- **상태 관리**: Zustand, TanStack Query (React Query)
- **라우팅**: React Router v6
- **스타일링**: Tailwind CSS
- **API**: Spotify Web API
- **배포**: Vercel

## 📁 프로젝트 구조

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 기반으로 구성되어 있습니다.

```
src/
├── app/        # 애플리케이션 초기화
├── pages/      # 페이지 컴포넌트
├── widgets/    # 독립적인 UI 블록
├── features/   # 비즈니스 로직
└── shared/     # 공통 리소스
```

## 🚀 최신 업데이트

### 이미지 최적화 시스템 추가

- **OptimizedImage 컴포넌트**: 자동 이미지 최적화 및 지연 로딩
- **이미지 프리셋**: 다양한 크기별 이미지 프리셋 제공
- **성능 개선**: 이미지 로딩 최적화로 페이지 성능 향상

### 사용자 경험 개선

- 플레이리스트 상세 페이지 이미지 최적화
- 앨범 카드 이미지 로딩 개선
- Year-End 섹션 성능 최적화

## 💡 개발 가이드

각 레이어별 자세한 가이드는 해당 폴더의 README.md를 참고하세요:

- [App Layer](src/app/README.md)
- [Pages Layer](src/pages/README.md)
- [Widgets Layer](src/widgets/README.md)
- [Features Layer](src/features/README.md)
- [Shared Layer](src/shared/README.md)

## 🎯 성능 최적화

- **이미지 최적화**: 자동 크기 조정 및 지연 로딩
- **코드 분할**: 라우트별 코드 스플리팅
- **캐싱 전략**: React Query를 활용한 효율적인 데이터 캐싱
- **번들 최적화**: 트리 쉐이킹 및 최적화된 빌드
