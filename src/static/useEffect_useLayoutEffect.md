---
title: 'useEffect vs useLayoutEffect (feat. react.dev, MUI의 useEnhancedEffect)'
date: '2023-12-21 00:00:00'
author: 'uiseop'
categories: [react]
summary: 'useEffect의 라이프 사이클을 알아보고 useLayoutEffect가 무엇인지, MUI에서는 useEnhancedEffect 커스텀 훅을 만들었는데 이게 어떻게 Enhanced(향상된) 된 결과를 주는지 살펴봅니다.'
---

## useEffect(setup, dependencies?)

리액트 공식문서에서는

> useEffect 훅을 [컴포넌트를 외부 시스템과 동기화](https://react-ko.dev/learn/synchronizing-with-effects) 할 수 있는 React 훅입니다.

라고 소개되어 있습니다. 또한, 당현스럽게도 `Hook`은 컴포넌트의 `최상위 레벨`에서 호출해야 하구요. 이는 커스텀훅들도 마찬가집니다. if문을 통해 분기문으로 `훅/커스텀훅`을 불러오려고 하면 react에서 경고를 주거든요.

### Parameters - setup & dependencies

- `setup`: React는 컴포넌트가 `DOM에 추가`되면! 이 `setup 함수를 실행`합니다. 의존성 배열에 있는 값이 변경되어 `다시 렌더링` 할 때에도 React는 먼저 `이전 값`으로 `클린업 함수를 실행`한 다음, `새 값`으로 `setup 함수를 실행`합니다. 컴포넌트가 `DOM에서 제거`되면, React는 마지막으로 `클린업 함수를 실행`합니다.
- `dependencies`: `setup 함수` 내에 참조된 모든 반응형 값의 목록입니다. 반응형 값은 props, state, 컴포넌트 내부에 직접 선언한 `모든 변수와 함수`를 포함합니다. 혹은, 어떤 값이 변화할 때 특정 로직이 실행될 수 있도록 하고 싶을 때에도 사용되곤 하죠. React는 각 의존성에 대해 [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)로 이전 값과 비교합니다. `Object.is`는 단순히 동등 연산자(`===`)와 비슷합니다. 이 말은, 단순히 얕은 비교만을 통해 객체의 값이 변화한지를 파악한다는 것 입니다. 차이점은 `부호가 있는 0의 비교` 그리고 `NaN`의 비교만 있다고 합니다. (비교적 정확한 얕은 비교 라고 생각하면 되겠네요.)
