---
title: 'useEffect / 나는 과연 잘 쓰고 있었던걸까?'
date: '2023-12-23 00:00:00'
author: 'uiseop'
categories: [react]
summary: 'useEffect의 라이프 사이클을 알아보고 useEffect 훅이 무엇인지, 언제 어떻게 실행되는지 공식 문서를 바탕으로 다시 공부해보도록 합니다.'
---

## useEffect(setup, dependencies?)

리액트 공식문서에서는 다음과 같은 설명이 있습니다.

> useEffect 훅을 [컴포넌트를 외부 시스템과 동기화](https://react-ko.dev/learn/synchronizing-with-effects) 할 수 있는 React 훅입니다.

라고 소개되어 있습니다. 또한, `Hook`은 컴포넌트의 `최상위 레벨`에서 호출해야 한다네요. 이는 커스텀훅들도 마찬가집니다. if문을 통해 분기문으로 `훅/커스텀훅`을 불러오려고 하면 react에서 경고를 주거든요. 더 봅시다.

### Parameters - setup & dependencies

- `setup`: React는 컴포넌트가 `DOM에 추가`되면! 이 1️⃣`setup 함수를 실행`합니다. 의존성 배열에 있는 값이 변경되어 `다시 렌더링` 할 때에도 React는 먼저 `이전 값`으로 `클린업 함수를 실행`한 다음, `새 값`으로 2️⃣`setup 함수를 실행`합니다. 컴포넌트가 `DOM에서 제거`되면, React는 마지막으로 `클린업 함수를 실행`합니다.
- `dependencies`: `setup 함수` 내에 참조된 모든 반응형 값의 목록입니다. 반응형 값은 props, state, 컴포넌트 내부에 직접 선언한 `모든 변수와 함수`를 포함합니다. 혹은, 어떤 값이 변화할 때 특정 로직이 실행될 수 있도록 하고 싶을 때에도 사용되곤 하죠. React는 각 의존성에 대해 [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)로 이전 값과 비교합니다. `Object.is`는 단순히 동등 연산자(`===`)와 비슷합니다. 이 말은, 단순히 얕은 비교만을 통해 객체의 값이 변화한지를 파악한다는 것 입니다. 차이점은 `부호가 있는 0의 비교` 그리고 `NaN`의 비교만 있다고 합니다. (비교적 정확한 얕은 비교 라고 생각하면 되겠네요.)

### Class형 컴포넌트와 비교하기

![클래스형 컴포넌트 라이프사이클](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcaIKlN%2FbtqMegW9wxb%2FQC3u528aHT79iFiK7VdJI0%2Fimg.png)
_(클래스형 컴포넌트의 생명 주기)_

useEffect내의 `setup`함수가 실행되는 경우는 위에서 살펴보듯이 `두 가지`의 경우의 수가 있었고, `클린업`함수가 실행되는 경우도 마찬가지로 `두 가지`의 경우의 수가 있었습니다. 그럼 각 경우가 위의 클래스형 라이프사이클의 어느 부분에 속하는지 비교해보죠.

#### 1. `컴포넌트가 DOM에 추가될 때.`

이때는 `ComponentDidMount`가 호출되고 나서겠군요. React가 DOM에 해당 컴포넌트를 추가해서 실제 DOM을 변경하고 해당 DOM요소에 대한 `ref`값을 알게 되고 난 후 비로서 `setup`함수가 실행되는가 봅니다. 그럼 확인해보죠.

```jsx
const headerRef = useRef(null);

useEffect(() => {
	if (headerRef.current) {
		// ✅ 여기가 호출됩니다!
		console.log(headerRef.current);
	} else {
		console.log('nothing better');
	}
}, []);

return (
	<header ref={headerRef}>
		<Title>CHUG ALONG</Title>
		<Author>by Seop_ee</Author>
	</header>
);
```

제가 이해한대로라면 `header` 컴포넌트가 DOM에 반영되기 전까지 `setup`함수가 실행되지 않을것이고, `header`컴포넌트와 null로 초기화한 `headerRef`의 값을 실제 DOM에서 가져온 후에 `setup`함수가 실행될것이기 때문에 콘솔에는 `<header>...</header>`가 찍혀있을 것이고, 예상과 동일한 결과를 얻을 수 있었습니다.

이를 통해 `setup`함수의 호출은 클래스형의 `componentDidMount`가 호출된 후에 실행되는 로직을 담당할 수 있겠네요!

#### 2. `의존성 배열이 변경되었을 때.`

이때는 React가 `snapshot`으로 관리하던 값들이 변화할 때를 말합니다. `new Props`를 받거나 `setState`함수를 호출하거나 `forceUpdate`함수를 호출하면 React가 이를 감지하고 `getDerivedStateFromPorps`를 통해 새로운 값을 가져오고, `shouldComponentUpdate`함수를 통해 실제 update를 해야한다면 실행되겠군요.

그렇다면 여기서는 `새 값`들을 통해 `render을 하기 전`에 `이전의 값`을 바탕으로 `클린업`함수를 실행하고, `render`후에(DOM에 컴포넌트의 변경된 내용이 적용된 후에) `setup`함수를 실행하게 되겠군요. 이것도 간단하게 확인해보면

```tsx
const headerRef = useRef<HTMLElement>(null);
const [count, setCount] = useState(0);

useEffect(() => {
	console.log(count, headerRef.current?.style); // 3️⃣ 1 red 출력

	return () => {
		console.log('cleanup 호출!', count); // 2️⃣ cleanup 호출! 0 출력
	};
}, [count]);

function handleClick() {
	// 1️⃣ 클릭 함수 실행
	headerRef.current!.style.backgroundColor = 'red';
	setCount((cur) => cur + 1);
}

return (
	<header onClick={handleClick} ref={headerRef}>
		<Title>CHUG ALONG</Title>
		<Author>by Seop_ee</Author>
	</header>
);
```

![useEffect 결과](https://github.com/uiseop/uiseop.github.io/blob/main/src/static/images/useEffectTest.png?raw=true)

`click 핸들러`를 통해 `setState()`함수를 호출하면 우선 render 하기 전에 `이전의 값`을 통해 cleanup함수를 실행하고, render하고 난 뒤에 `setup`함수를 호출하는것을 확인할 수 있었습니다. `componentUnMount` 시점에서 다시 한 번 `클린업`함수가 실행되는것은 따로 확인하지 않겠습니다. 이렇게 useEffect가 언제 실행되는지 그 시점을 파악하고 나니 조금이나마 useEffect를 언제 적절히 사용해야할지 감을 잡을 수 있겠네요.

다음으로는 useEffect 사용시의 주의할 점을 살펴보겠습니다.

## 주의사항

### 1. 외부 시스템과 동기화하려는 목적이 아니라면 [Effect가 필요하지 않을지도 모릅니다.](https://react-ko.dev/learn/you-might-not-need-an-effect)

useEffect가 필요하지 않은 흔한 경우는 두 가지가 있습니다.

#### 1-1. State나 Props로 관리되는 데이터를 계산하기 위해 useEffect를 사용하는 것

useEffect는 State나 Props의 변경을 감지하면 우선 `오래된 값`을 통해 클린업 함수를 실행시키고 변경된 값들을 바탕으로 화면을 `render`합니다. 그 후에 `setup`함수를 실행시키는데, 데이터를 계산하기 위해 `setup`함수를 호출하는 것은 결국 또 다시 `클린업 - render` 과정을 호출하게 됩니다. 결국 총 두 번의 `render`가 발생하게 되겠지요. 우리는 최대한 `render` 횟수를 줄이려고 노력해야합니다. 그러기 위해서는 모든 데이터 변환을 컴포넌트단에서 진행하면 됩니다. `useEffect`를 호출하지 말고요!

#### 1-2. 사용자의 이벤트를 처리하는 데에는 useEffect가 필요하지 않습니다.

예를 들어, 사용자가 제품을 구매할 때 `/api/buy POST` 요청을 전송하고 알림을 표시하고 싶다고 합시다. 구매 `버튼 클릭` 이벤트 핸들러에서는 정확히 어떤 일이 일어났는지 알 수 있습니다. 때문에 일반적으로 명확한 사용자 이벤트를 `useEffect` 안에서 호출하기 보다는 해당 `이벤트 핸들러`에서 처리합니다.

올바른 직관을 얻기 위해 몇 가지 일반적인 구체적인 예를 살펴봅시다!

#### `Props`나 `State`로 부터 `파생되는 데이터`를 `state`로 관리하지 말자

Props나 State로 관리되는 리액트 내의 `snapshoted` 데이터들은 해당 값이 변경될 때 다시 렌더링 되기 때문에 이들로 부터 파생된 데이터는 렌더링 과정에서 계산될 수 있습니다. 때문에 useEffect 안에 의존성을 두는것은 불필요한 재렌더링을 발생시키는 잘못된 예시라고 소개합니다.

코드로 함께 보시죠.

```jsx
const [firstName, setFirstName] = useState('Uiseop');
const [lastName, setLastName] = useState('LEE');

// 🔴 이러지 마세요: 중복 state 및 불필요한 Effect
const [fullName, setFullName] = useState('');
useEffect(() => {
	setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);
// ...

// ✅ 좋습니다: 렌더링 과정 중에 계산됩니다.
const fullName = firstName + ' ' + lastName;
// ...
```

#### props이 변경될 때 모든 State를 재설정하지 말자. 대신 key 사용

예시에는 다음과 같은 코드가 주어져 있습니다.

```jsx
export default function ProfilePage({ userId }) {
	const [comment, setComment] = useState('');

	// 🔴 이러지 마세요: prop 변경시 Effect에서 state 재설정 수행
	useEffect(() => {
		setComment('');
	}, [userId]);
	// ...
}
```

이렇게 되어 있을 때 `props`인 `userId`가 변경되도 해당 컴포넌트가 재렌더링 되는 것 일 뿐이기 때문에 여전히 관리하고 있던 `snapshot`데이터인 comment가 설정되어 있는 문제가 있다고 합니다. 때문에 이러한 일들을 방지하고자 props가 변경되면 useEffect로 초기화해주는 로직을 생각할 수 있는데 이러면 해당 컴포넌트 뿐만 아니라 `하위 모든 자식들까지`도 모두 재렌더링되기 때문에 굉장히 `비효율적`입니다.

```jsx
export default function ProfilePage({ userId }) {
	return <Profile userId={userId} key={userId} />;
}

function Profile({ userId }) {
	// ✅ key가 변하면 이 컴포넌트 및 모든 자식 컴포넌트의 state가 자동으로 재설정됨
	const [comment, setComment] = useState('');
	// ...
}
```

우리는 이미 자연스럽게 이러한 문제를 해결하곤 했습니다. 바로 컴포넌트에게 unique한 `key`를 주는 것 입니다. 동일한 컴포넌트를 여러개 만들 때 `map`고차함수를 통해 컴포넌트를 그리고, 그 컴포넌트에 고유한 `key`값을 주곤 하시죠?? 이 `key` 속성은 `map`함수에서만 쓰이는것이 아니라 이렇게 해당 컴포넌트의 식별자 역할을 하는데 사용됩니다. 때문에 해당 `key`값이 변경되면 아예 새로운 컴포넌트가 `init`되는것이고 이로인해 useEffect로 인한 과도한 재렌더링 비용과 혹여나 실수로 초기화하지 못했던 값들이 생기지 않겠습니다.

#### 그렇다면 props가 변경될 때 일부 state 조정하려면?

다음의 List 컴포넌트는 items 목록을 prop으로 받고, selection state 변수에 선택된 항목을 유지합니다. items prop이 다른 배열을 받을 때마다 selection을 null로 재설정하고 싶습니다:

```jsx
function List({ items }) {
	const [isReverse, setIsReverse] = useState(false);
	const [selection, setSelection] = useState(null);

	// 🔴 이러지 마세요: prop 변경시 Effect에서 state 조정
	useEffect(() => {
		setSelection(null);
	}, [items]);
	// ...
}

function List({ items }) {
	const [isReverse, setIsReverse] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	// ✅ 가장 좋음: 렌더링 중에 모든 값을 계산
	const selection = items.find((item) => item.id === selectedId) ?? null;
	// ...
}
```

시작으로는 `useEffect를 지우는 것`으로 시작합니다. useEffect를 통해 state를 관리하는 것은 해당 컴포넌트 뿐만 아니라 하위 모든 자식들까지도 모두 재렌더링되기 때문에 굉장히 비효울적이기 때문입니다. 때문에 `대부분의 경우 props나 state들을 바탕으로 state	를 관리하는 것은 비효율적이며 데이터 흐름을 이해하는데 더욱 어려움`을 줄것입니다. 때문에 `항상 key로 모든 state를 재설정` 하거나 `렌더링 중에 모두 계산할 수 있도록` 고민해야겠습니다.

여기서는 선택한 item의 Id를 state로 관리해서 렌더링 과정에서 `선택된 아이템(selection)`을 저장하도록 수정하여 최적화를 진행할 수 있겠습니다.

#### 애플리케이션 초기화 하기

어플리케이션이 실행될 때 한 번 실행되어야 하는 비즈니스 로직이 있을 수 있습니다. 하지만 useEffect는 위와 같은 이유로 개발 중에 두 번 실행되게 됩니다. 때문에 이럴 경우앤 최상위 변수를 추가하여 이미 실행되었는지 여부를 추적하거나 모듈 초기화 중 이나 앱 렌더링 전에 실행시킬 수 있습니다.

```jsx
function App() {
	// 🔴 이러지 마세요: 한 번만 실행되어야 하는 로직이 포함된 Effect
	useEffect(() => {
		loadDataFromLocalStorage();
		checkAuthToken();
	}, []);
	// ...
}

// Solution 1

let didInit = false;

function App() {
	useEffect(() => {
		if (!didInit) {
			didInit = true;
			// ✅ 앱 로드당 한 번만 실행됨
			loadDataFromLocalStorage();
			checkAuthToken();
		}
	}, []);
	// ...
}

// Solution 2 - useEffect 사용 안하고

// 브라우저에서 실행중인지 확인
if (typeof window !== 'undefined') {
	// ✅ 앱 로드당 한 번만 실행됨
	checkAuthToken();
	loadDataFromLocalStorage();
}

function App() {
	// ...
}
```

### 2. Strict 모드가 켜져 있으면 React는 첫 번째 실제 셋업 전에 개발 전용의 셋업+클린업 사이클을 한 번 더 실행합니다. 이는 클린업 로직이 셋업 로직을 “미러링”하고 셋업이 수행 중인 모든 작업을 중지하거나 취소하는지를 확인하는 스트레스 테스트입니다. 문제가 발생하면 [클린업 기능을 구현해야 합니다.](클린업 기능을 구현해야 합니다.)

#### Fetching Data

특정 컴포넌트는 외부의 데이터를 가져오기 위해 useEffect를 사용합니다. 이와 같은 데이터 페칭 Effect를 작성하는것은 매우 일반적이고, 저 또한 많이 작성해오곤 했습니다.

```jsx
function SearchResults({ query }) {
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		// 🔴 이러지 마세요: 클린업 없이 fetch 수행
		fetchResults(query, page).then((json) => {
			setResults(json);
		});
	}, [query, page]);

	function handleNextPageClick() {
		setPage(page + 1);
	}
	// ...
}
```

위 코드는 검색창에 `검색어(query)`를 입력할때마다 아래 추천 검색어 목록을 보여주는 예시로 생각하면 됩니다. useEffect의 dependency 배열에 `query, page 값`이 들어있다고 한들 중요한 것은 fetchResults로 인해 받아온 외부 데이터인 results의 [동기화](https://react-ko.dev/learn/synchronizing-with-effects)입니다. 이것이 useEffect의 이유죠. useEffect는 `외부 데이터와 동기화 하려는 목적`을 갖습니다.

하지만, 위 코드는 버그가 있습니다. 우리가 `"hello"`를 빠르게 입력한다고 합시다. 물론 데이터가 입력되는 순서는 "h"에서 "he", "hel", "hell", "hello" 순서대로 들어오겠지만, 네트워크의 세계는 어떤지 알 수 없기 때문에 응답 데이터가 순서대로 도착하지 않을 수 있습니다. 이를 운영체제 시간에 배웠던 ["경쟁 조건(race condition)"](https://en.wikipedia.org/wiki/Race_condition)이라고 하죠. 이러한 버그를 방지하고, 정확한 `외부 데이터와의 동기화`를 위해 우리는 클린업 함수를 적절히 작성해줘야 합니다.

경쟁 조건을 해결하기 위해서는 오래된 응답을 무시할 수 있도록 클린업 함수를 작성하면 됩니다.

```jsx
function SearchResults({ query }) {
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);
	useEffect(() => {
		let ignore = false;
		fetchResults(query, page).then((json) => {
			if (!ignore) {
				setResults(json);
			}
		});
		return () => {
			ignore = true;
		};
	}, [query, page]);

	function handleNextPageClick() {
		setPage(page + 1);
	}
	// ...
}
```

`setup`함수에서 선언한 `ignore` 변수는 이제 해당 함수가 리턴하는 `클린업` 함수에서 여전히 참조하여 `클로저`가 생성됩니다. query가 변화할 때 해당 클린업 함수가 실행되고, ignore 변수를 공유하던 클린업 함수에서 값을 참으로 변경해줌으로써 오래된 응답에서의 `setResult`가 호출되지 않도록 막았습니다. 이렇게 useEffect 내부에서는 `closure` 개념을 활용하여 안전핳게 외부 데이터와의 동기화를 진행할 수 있습니다.

### 3. 의존성 중 일부가 컴포넌트 내부에 정의된 [객체](https://react-ko.dev/reference/react/useEffect#removing-unnecessary-object-dependencies) 또는 [함수](https://react-ko.dev/reference/react/useEffect#removing-unnecessary-function-dependencies)인 경우 Effect가 필요 이상으로 자주 다시 실행될 위험이 있습니다. 이 문제를 해결하려면 불필요한 객체 및 함수 의존성을 제거하세요. 혹은 Effect 외부에서 [state 업데이트 추출](https://react-ko.dev/reference/react/useEffect#updating-state-based-on-previous-state-from-an-effect) 및 [비반응형 로직](https://react-ko.dev/reference/react/useEffect#reading-the-latest-props-and-state-from-an-effect)을 제거할 수도 있습니다.

여기서는 아직 실험중인 기능인 useEffectEvent의 소개가 있습니다. 아직 [작업중(23.12.23 기준)](https://react-ko.dev/reference/react/experimental_useEffectEvent)이라고 뜨네요...

### 4. Effect가 상호작용(예: 클릭)으로 인한 것이 아니라면, React는 브라우저가 Effect를 실행하기 전에 업데이트된 화면을 먼저 그리도록 합니다. Effect가 시각적인 작업(예: 툴팁 위치 지정)을 하고 있고, 지연이 눈에 띄는 경우(예: 깜박임), useEffect를 [useLayoutEffect](https://react-ko.dev/reference/react/useLayoutEffect)로 대체해야 합니다.

(아래와 동일)

### 5. 상호작용(예:클릭)으로 인해 Effect가 발생한 경우에도, 브라우저는 Effect 내부의 state 업데이트를 처리하기 전에 화면을 다시 그릴 수 있습니다. 보통 이게 기대하는 동작일 것입니다. 만약 브라우저가 화면을 다시 칠하지 못하도록 차단해야 하는 경우라면 useEffect를 [useLayoutEffect](https://react-ko.dev/reference/react/useLayoutEffect)로 바꿔야 합니다.

> **useLayoutEffect**: 브라우저가 화면을 다시 채우기 전에 실행되는 버전의 useEffect 입니다.

layoutEffect는 브라우저가 화면을 실제 `그리기 전에(before paint)` 실행하는 `reflow` 과정을 훅을 통해 접근할 수 있게 해줍니다.

> **reflow 과정**에서는 DOM 요소들의 레이아웃을 측정하여 해당 DOM 요소들이 어디에, 어떻게 위치하는지 그 크기/너비를 측정하기 때문에 렌더링 과정에서 비용이 많이 드는 단계입니다. 때문에 JS를 통해 이러한 정보에 접근하거나 변경을 하면 reflow가 일어나 이로인한 시간 지연이 발생하고 이로인해 화면 깜빡임과 같은 증상이 발생할 수 있죠. 때문에, reflow를 최소화 시키기 위해 reflow를 야기시키는 로직들을 일괄적으로 처리하는 방식이 도움이 될 수 있습니다.

layoutEffect는 해당 컴포넌트를 `DOM에 배치`하고 실제 해당 컴포넌트가 `Paint 되기 전`에 `setup`함수를 실행시켜 배치된 DOM 요소들의 정보에 미리 접근할 수 있습니다. 이렇게 하면 두 번의 단계로 렌더링을 진행해야 했던 과정을 한 번으로 줄일 수 있게 됩니다.

### 6. Effects는 클라이언트에서만 실행됩니다. 서버 렌더링 중에는 실행되지 않습니다.

layoutEffect는 reflow 이후 DOM요소들의 레이아웃 정보에 접근할 수 있도록 도와줍니다. 하지만, 서버에서는 DOM의 레이아웃에 접근할 수 없죠. 이를 해결하려면 간단하게 useEffect로 바꾸는 방법과 해당 컴포넌트를 클라이언트 전용으로 표시하면 됩니다.

클라이언트 전용으로 바꾸는 것은 React.18에서 공식적으로 출시된 `<Suspense></Suspense>` Hook을 통해 컴포넌트를 감싸주면 된다고 합니다.

```jsx
<Suspense fallback={<Loading />}>
	<Chat />
</Suspense>;

function Chat() {
	if (typeof window === 'undefined') {
		throw Error('Chat should only render on the client.');
	}
	// ...
}
```

이렇게 하면 서버 HTML에는 `로딩바`가 포함되고, 이 로딩바는 클라이언트에서는 `Chat 컴포넌트`로 대체됩니다.

---

## 후기

리액트를 접할 때 가장 먼저 배우는 종합 세트 상품 중 하나인 useEffect를 이번 기회에 자세히 들여다 볼 수 있었습니다. 처음 공식문서를 살펴 보겠다고 마음 먹게 된 이유는 MUI의 코드를 뜯어보다가 `useEnhancedEffect` 훅을 보게 되었고, 내부적으로 클라이언트 환경이면 useLayoutEffect를 아니면 useEffect를 사용하는 훅이 있었습니다. 그래서 `'useLayoutEffect가 뭐지?'` 에 대한 고민이 이렇게 공식문서의 useEffect를 자세히 살펴볼 수 있는 기회로 다가왔네요.

평소에 아무 생각 없이, 단순히 외부 데이터를 호출하는데 급급하게 사용하던 useEffect 혹은 반응형으로 동작하게 하고 싶어 남발하던 useEffect를 어떻게 좀 더 효과적으로 사용할 수 있을지를 내부 라이프 사이클을 정리하고, `setup` 함수와 `클린업` 함수의 호출 시점을 살펴봄으로써 앞으로 조금이나마 더 잘 쓸 수 있지 않을까 생각합니다.

리액트 공식문서 하단에 useEffect에 관한 과제들이 몇 개 주어져 있더라구요. 해당 과제를 수행하면서 공식문서를 제대로 이해했는지, 지금 내 블로그 프로젝트에서는 useEffect를 잘 사용하고 있었는지 한번 돌이켜 봐야겠습니다.

감사합니다.

### 출처

- [리액트 공식문서 - 한글판](https://react-ko.dev/reference/react/useEffect)
