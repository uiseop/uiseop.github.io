---
title: '왜 setState는 side effect를 야기할까?'
date: '2023-12-25'
author: 'uiseop'
categories: [react, javascript]
summary: '함수형 컴포넌트에서 그림자와 같이 사용되는 useState훅의 setState는 어째서 sideEffect를 야기하는 함수로 취급되는것일까? 그 내부 이야기를 살펴 보자'
urlTitle: '왜-setState훅은-sideEffect를-야기할까'
---

## Class형 컴포넌트의 상태 관리

```jsx
const [state, setState] = useState(0);
```

`useState`가 리턴하는 Tuple에서 2번째 값으로 제공되는 함수는 상태를 업데이트하고 다시 렌더링을 일으킵니다. useState는 컴포넌트 내부에서 상태를 관리하니까 상관 없는거 아니냐 하실 수도 있겠지만 사실 엄밀하게는 그렇지 않습니다.

함수 컴포넌트 자체는 JSX를 리턴하는 함수일 뿐이지만 setState 함수는 **1) 컴포넌트 외부에 존재하는 상태(React 내부에서 클로저를 활용하여 저장해두는 값)**를 **2) 어떠한 요소(React) 컴포넌트를 다시 렌더링** 하도록 기능합니다.

Class 컴포넌트가 상태를 갖는 건 자연스럽습니다. Class가 인스턴스화 된 이후에 멤버 변수로 state를 저장합니다. 인스턴스화는 추상적 요소에 생명을 부여하는 일입니다. 그러므로 `constructor`, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 같은 생명주기 메서드 같은 것들이 존재해야 했습니다.

다음 예시는 컴포넌트가 생성되었을 때, 인스턴스 내부에 저장된 state라는 객체의 값을 1 증가시키는 기능에 대한 예시 코드입니다.

```jsx
class App extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			count: 0
		}
	}

	componentDidMount() {
		this.increaseCount();
	}

	increaseCount = () = {
		this.setState({ count: this.state.count + 1 });
	}

	render() {
		return <div>{this.state.count}</div>
	}
}
```

하지만 함수 컴포넌트는 `상태`를 가질 수 없습니다. 당연한 일입니다. 함수는 실행이 끝나면 사용되었던 값들을 `메모리에서 정리(Garbage Collection)`하기 때문입니다.

그래서 Hooks 등장 이전에 사용되었던 Container / Presenter 패턴에서는 상태나 로직을 갖는 요소들은 Class형 컴포넌트로 만들고, View를 담당하는 부분이나 파생 로직들에 대해서는 함수 컴포넌트로 만들었습니다.

## 함수 컴포넌트가 상태를 저장하는 방법, ‘클로저(Closure)’

그런데 우리는 어떻게 함수 컴포넌트와 상태를 함께 사용할 수 있는걸까요?

함수 컴포넌트가 상태를 가질 수 있게 된 것은 React 16.8버전에서 Hooks가 등장한 이후의 일 입니다. 함수는 `인스턴스`가 아니므로 실행(렌더링)이 마무리 된 이후 내부에 상태를 유지할 수 없습니다. 하지만 `클로저(Closure, 함수 실행 이후에도 참조 카운트가 남아 있어 데이터가 GC되지 않는 현상)` 를 사용하면 이게 가능해집니다.

클로저란, 함수와 그 함수가 선언될 때의 `렉시컬 환경(Lexical Environment - 실행 컨텍스트의 일부)`의 조합입니다. 간단히 말해, 클로저는 함수와 그 함수가 생성될 때의 주변 상태를 '기억'하는 함수입니다.

많은 설명들이 클로저 내부에서 클로저에 의해 참조 되는 변수들이 ‘기억’ 된다고 설명하지만 사실 이는 비유적인 표현입니다. 정확히는 V8 자바스크립트 엔진의 GC(가비지 컬렉터)는 참조 카운트가 0인, 즉 더 이상 참조되지 않는 변수들을 일정 주기마다 메모리에서 제거합니다.

하지만 클로저에서 참조하고 있는 변수들은 비록 자신을 둘러싸고 있던 함수의 실행은 끝났지만 클로저에 의해 여전히 참조되고 있기 때문에 참조 카운트가 0이 되지 않고, 사라지지 못하고 남아있다는 설명이 좀 더 사실에 부합합니다.

```jsx
function createHook(initialValue) {
	let state = initialValue; // 상태를 클로저 내부에 저장 (1001 주소에 저장 - 참조 카운트가 1)

	function useState() {
		function setState(newState) {
			state = newState; // 상태 업데이트
			console.log('새로운 상태:', state);
		}

		return [state, setState];
	}

	return useState;
}

// 컴포넌트를 모방하는 함수
function MyComponent() {
	const useState = createHook(0); // 초기 상태는 0
	const [count, setCount] = useState();

	console.log('현재 상태:', count);

	return {
		increment: () => setCount(count + 1), // 상태 증가 함수
	};
}

// 컴포넌트 사용
const component = MyComponent();
component.increment(); // 상태를 1로 증가
component.increment(); // 상태를 2로 증가
```

다시 돌아와 정리해보겠습니다. 우리가 useState로부터 불러오는 ‘상태’란, 사실 컴포넌트 외부이자 React 내부에 저장된 `클로저`에서 읽어오고 있는 값입니다. 따라서 컴포넌트 외부에 존재하는 값에 영향을 주고 리렌더링을 일으키는 setState 함수는 컴포넌트 함수 입장에서는 당연하게도 부수 효과인 것이죠.
