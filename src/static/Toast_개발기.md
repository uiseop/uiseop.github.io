---
title: 'React 개발 블로그 - Toast 개발기'
date: '2023-12-28'
author: 'uiseop'
categories: [react, trouble_shooting, deploy]
summary: '특정 버튼을 눌렀을 때 페이지 하단에 띠용하고 등장하는 Toast 컴포넌트 개발기를 작성합니다.'
urlTitle: 'react-dev-blog-how-i-made-my-toast-component'
---

## Introduction

![복사하기 버튼 클릭 캡쳐](https://github.com/uiseop/uiseop.github.io/blob/main/src/static/images/copybutton.png?raw=true)
_(코드 복사하기 버튼을 클릭했을 때 복사 완료 알림)_

위 이미지와 같이 `Copy` 컴포넌트를 클릭했을 때의 동작인 `Toast` 컴포넌트가 등장하면 좋겠다고 생각했습니다. 

`Tistory`나 `Velog` 등과 같은 유명 블로깅 사이트(?)에서는 이미 이러한 기능들이 제공되고 있었고 저도 만들어보고 싶은 마음에 해당 기능을 추가해보고 싶었답니다.

또한 근래 `객체 지향`적인 관점에 관심이 생기면서 프론트엔드에서도 백엔드에서 처럼 우아하게 `SOLID` 개념을 활용하고 있었고, 저 또한 단순히 반복되는 코드를 줄이기만 해서 클린 코드를 만들기 보다는 한 단계 발전시켜 제 코드를 좀 더 우아하게 만들고자 하는 욕심으로 해당 컴포넌트를 만들고자 다짐했습니다.

