# react-init

CRA 없이 React 환경을 구축합니다.

Babel / Webpack / Typescript / 절대경로 설정 / React-router-dom V6

## 나만의 규칙

- 함수형 컴포넌트는 화살표 함수로 표현한다.
- util성 함수나 비즈니스 로직을 담당하는 함수는 명시적으로 함수 선언형(`function`)으로 호출한다.
- 컴포넌트 내부에서 사용되는 핸들러의 경우 `handle` prefix를 붙여서 사용하도록 한다. `ex) handleClick, handleHover, handleMouseLeave 등..`
- 상위 컴포넌트로부터 의존성 주입되는 비즈니스 로직의 경우 `on` prefix를 붙여서 받아오도록 한다. `ex) onClick, onHover 등...`
