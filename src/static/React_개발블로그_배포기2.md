---
title: 'React 개발 블로그 배포기 (Feat.GitHub Pages) - 2: 프레임워크 없이 순수 React로 서버사이드 렌더링(SSG) 방식으로 변경하기'
date: '2023-12-19 00:00:00'
author: 'uiseop'
categories: [react, trouble_shooting, deploy]
summary: 'CSR 방식에서 SSR 방식(정확히는 SSG)로 변경하면서 좌충우돌 겪었던 히스토리를 정리합니다.'
urlTitle: 'react-dev-blog-delpoy-feat-github-pages-chapter-2'
---

## Introduction

![카카오톡 캡쳐](https://github.com/uiseop/uiseop.github.io/blob/main/src/static/images/kakao404.png?raw=true)
_(미리보기가 안된다..?)_

[배포 1탄](https://uiseop.github.io/0)에서 신나게 배포를 하고, 새로고침해도 404가 뜨지 않도록 고쳤지만.. 이게 뭐람.. 이런 상태로는 내 개발 블로그를 자랑할 수 없어..!

이번 글은 위와 같은 문제를 해결해나가는 과정을 기록해보겠습니다.

### 결과 스포

![노션 미리보기](https://github.com/uiseop/uiseop.github.io/blob/main/src/static/images/notion_alt.png?raw=true)
_(🎉짜잔, 미리보기 성공🎉)_

---

## 문제상황

`GitHub Pages`를 통해 성공적으로 배포했지만, 위에서 처럼 친구들에게 링크를 보내주거나 링크를 삽입했을 때 `index.html`의 `title`로 설정된 정보만 보여주고 있었고, 심지어 다른 `routes`에서는 그마저도 보여주지 않고 있었습니다.

이는 이전 [배포 1탄](https://uiseop.github.io/0)에서 `루트(/)` 경로가 아닌 다른 경로에 대한 정보는 GitHub Pages에서는 제공하지 않기(모르기) 때문에 아무런 정보도 제공하지 못하고 있던 것 입니다.

이렇게 아무런 정보도 보여주지 않는 페이지는 뭐가 문제일까요?? 바로 `검색 엔진(Search Engine)`이 내 페이지를 검색 목록에 띄워주지 않는다는 것 입니다. 검색 엔진의 입장에서는

> **검색 엔진**: 음?? 이 페이지는 어떤 정보를 갖고 있지..? 뭐야.. 아무 정보도 없잖아?? 이거 이상한 페이지 아냐..? 신뢰할 수 없겠는걸..? 너는 다른 사람들에게 보여지도록 할 수 없겠어!

이렇게 되면 아무리 배포했다고 하더라도 개인 메모장에 끄적이는것과 다를바가 없습니다..

그리고 저는 사실 제 페이지의 메타 정보들을 제공하기 위해 이미 `react-helmet`을 적용해놓았습니다. 하지만 이 역시 아무 소용이 없었던거죠.

### 문제 원인

![CSR vs SSR](https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F20104019-ddc7-46a1-8f32-de24bb926d3e%2FGroup_1238.png&blockId=bc05b63e-fd80-40bb-b3e2-727322fbd90d)

그렇다면, 종합적으로 이번 문제의 원인은 뭘까요? 결국은 React의 `렌더링 방식의 한계`라고 생각했습니다. React는 기본적으로 Client단에서 App을 실행시켜 페이지를 차곡차곡 만들어냅니다. 때문에 아무리 `react-helmet`을 적용시켰다 한들 이 `react-helmet` 코드들 역시 Client단에서 실행되어야지만이 비로서 `index.html`의 head 영역에 메타 정보가 주입되는 것 입니다.

이런 문제에 대한 고민들을 이미 실력있는 개발자분들께서 우아하게 해결해주셔서 많은 프레임워크들이 존재하죠. `Vercel`의 Next.js라던지 `Gatsby`라던지 등등 다양한 프레임워크가 있습니다. 저 역시도 이전 프로젝트를 진행하면서 `ServerSide Rendering`을 기본적으로 제공하는 `Next.js`를 활용하여 손쉽게 최적화된 애플리케이션을 제작했던 경험이 있습니다.

하지만, 그런 프레임워크들을 사용하려면 지금까지 개발한 내용들을 다 갈아엎어야할 것 같고.. 그러기에는 너무나도 싫었고... 괜시리 그러한 프레임워크를 안쓰고는, `순수 React`만으로는 `ServerSide Rendering`이 안되는건지 궁금해졌습니다. 다행이도 Vite에는 [서버 사이드 렌더링에 관한 공식 문서](https://ko.vitejs.dev/guide/ssr.html)가 주어져있더라고요. 해당 공식 문서에는 React 뿐만 아니라 Vue, Vanilla, Svelte 등등 많이 사용되는 프레임워크들에 대한 SSR 방법들이 제공되어 있었습니다! 그래서 CSR에서 SSR로 변경시키는 여정을 떠났죠.

## SSR 변경하기

공식 문서를 간단히 요약해보면,

> `Node.js` 서버 프레임워크인 `Express.js`를 통해 `React` 환경을 구성하는 것

으로 요약할 수 있겠습니다. 그 과정에서 `package.json`도 변경하고 새로운 `javascript 코드`도 추가하는 과정이 있지만 생각보다 쉽게 SSR을 적용할 수 있었습니다!

SSR 관련해서 이 포스팅에 작성하기에는 글이 너무 길어질 것 같기 때문에 다음에 포스팅 하기로 하고..! 일단 공식 문서에 나온대로 적용해봤습니다.

공식 문서의 [React 탭](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react)을 클릭하면 기존에 없던 `server.js`, `/src/entry-client.jsx`, `/src/entry-server.jsx` 파일이 보입니다.

```js
// server.js
...

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
	const { createServer } = await import('vite');
	vite = await createServer({
		server: { middlewareMode: true },
		appType: 'custom',
		base,
	});
	app.use(vite.middlewares);
} else {
	const compression = (await import('compression')).default;
	const sirv = (await import('sirv')).default;
	app.use(compression());
	app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Serve HTML
app.use('*', async (req, res) => {
	try {
		const url = req.originalUrl.replace(base, '');

		let template;
		let render;
		if (!isProduction) {
			// Always read fresh template in development
			template = await fs.readFile('./index.html', 'utf-8');
			template = await vite.transformIndexHtml(url, template);
			render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
		} else {
			template = templateHtml;
			render = (await import('./dist/server/entry-server.js')).render;
		}

		const rendered = await render(url, ssrManifest);

		const html = template
			.replace(`<!--app-head-->`, rendered.head ?? '')
			.replace(`<!--app-html-->`, rendered.html ?? '');

		res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
	} catch (e) {
		vite?.ssrFixStacktrace(e);
		console.log(e.stack);
		res.status(500).end(e.stack);
	}
});

// Start http server
app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
```

`server.js` 에는 express를 실행시켜서 Production 환경일땐 build된 파일을, dev 환경에서는 src 파일을 사용해서 html 문서를 만들고, 응답으로 `express 서버`에서 만든 `html 문서`를 제공해서 `SSR`이 동작할 수 있습니다.

```bash
$ yarn add -D sirv compression express
$ npm i -D sirv compression express
```

이를 실행시키기 위해서는 여기서 사용하는 라이브러리인 `sirv`와 `compression`, `express`를 설치해줘야 합니다.

다음으론 `src/entry-client.jsx`인데, 얘는 사실 우리가 개발시에 사용했던 `index.tsx`입니다. 그래서 `index.tsx`를 다음과 같이 변경해줍니다.

```tsx
// before index.tsx
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);

// after index.tsx
const container = document.getElementById('root') as HTMLElement;
ReactDOM.hydrateRoot(
	container,
	<React.StrictMode>
		<HelmetProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</HelmetProvider>
	</React.StrictMode>,
);
```

그리고 `entry-server.jsx`는 다음과 같이 작성해줍니다.

```jsx
// entry-server.tsx
interface HelmetContextProps {
	helmet?: HelmetServerState;
}

export function render(url: string) {
	const helmetContext: HelmetContextProps = {};

	const html = ReactDOMServer.renderToString(
		<React.StrictMode>
			<HelmetProvider context={helmetContext}>
				<StaticRouter location={url}>
					<App />
				</StaticRouter>
			</HelmetProvider>
		</React.StrictMode>,
	);

	const { title, meta } = helmetContext.helmet || {};

	return { html, head: `${title}${meta}` };
}
```

### 문제 1. react-router-dom

이전에는 `react-router-dom v6`의 `createBrowswerRouter`를 사용했었습니다. 이렇게 하니까 Route에 관한 코드들이 App에서 명확하게 분리됐고, 내부적으로 중첩 경로에 대한 명시도 손 쉽게 처리할 수 있었어서 사용했었습니다. 하지만, SSR를 적용하면서 다음과 같은 문제가 발생하고 말았죠..

![문제-1](https://velog.velcdn.com/images%2Fhaebin%2Fpost%2F1895d62b-5888-49cd-8c1f-27048c5bd478%2Ferror_browser_history_need_a_dom.png)

이는 `BrowserRouter` 내부에서 router를 생성하는 과정에서 브라우저 history 객체를 생성합니다.

```js
// react-router-dom에서 인용
var BrowserRouter =
/*#__PURE__*/
function (_React$Component) {
  ...
  function BrowserRouter() {
    ...
    _this.history = history.createBrowserHistory(_this.props);  // 문제가 되는 부분
    return _this;
  }

  var _proto = BrowserRouter.prototype;

  _proto.render = function render() {
    return React.createElement(reactRouter.Router, {
      history: this.history,  // window.history를 바탕으로 한 history를 사용한다.
      children: this.props.children
    });
  };

  return BrowserRouter;
}(React.Component);
```

이 때, `history`의 `createBrowserHistory()` 함수는 `HTML DOM`과 `브라우저의 history 객체`를 필요로 하기 때문에 함수 초입 부분에서 `canUseDom 변수`로 이를 확인하는데,

```js
// history에서 인용
var canUseDOM = !!(typeof window !== 'undefined' && \
                   window.document && window.document.createElement);
...
...
function createBrowserHistory(props) {
  ...
  !canUseDOM ? invariant(false, 'Browser history needs a DOM') : void 0;
  var globalHistory = window.history;
  ...
}
```

SSR에서는 `Node.js 환경`에서 실행되기 때문에 Web API의 [window 인터페이스](https://developer.mozilla.org/ko/docs/Web/API/Window)가 존재하지 않아 `Browser history needs a DOM` 에러가 발생합니다.

### 문제 1 해결. StaticRouter 사용

[공식 문서](https://reactrouter.com/en/main/guides/ssr)를 바탕으로 이를 해결하려면 `SSR 시`에는 `StaticRouter` 혹은 `StaticRouterProvider`를 사용해야한다고 합니다.

`StaticRouter`는 window의 history 객체를 사용하지 않고 `express`의 요청으로 전달받은 `location prop`을 바탕으로 자체적으로 history를 생성하는 것을 확인했습니다.

```js
var StaticRouter =
/*#__PURE__*/
function (_React$Component) {
  ...
  _proto.render = function render() {
    var _this$props2 = this.props,
        _this$props2$basename = _this$props2.basename,
        basename = _this$props2$basename === void 0 ? "" : _this$props2$basename,
        _this$props2$context = _this$props2.context,
        context = _this$props2$context === void 0 ? {} : _this$props2$context,
        _this$props2$location = _this$props2.location,
        location = _this$props2$location === void 0 ? "/" : _this$props2$location,
        rest = _objectWithoutPropertiesLoose(_this$props2, [
          "basename", "context", "location"
        ]);

    var history$1 = {  // window.history 객체를 사용하지 않고 history 생성
      createHref: function createHref(path) {
        return addLeadingSlash(basename + createURL(path));
      },
      action: "POP",
      location: stripBasename(basename, history.createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };
    return React.createElement(Router, _extends({}, rest, {
      history: history$1,
      staticContext: context
    }));
  };

  return StaticRouter;
}(React.Component);
```

사실 제 블로그 프로젝트는 데이터를 저장하기 위한 서버나 API 요청같은 기능들이 없어 `Data Router`를 사용할 필요가 없었습니다. 때문에, `CSR`에서는 단순히 `BrowserRouter`로 관리하고, `SSR`에서는 `StaticRouter`로 관리하도록 변경했습니다.

### 문제 2. window is not defined 에러

이 역시 `SSR(Node.js)` 환경에서 `window`나 `document`와 같은 `Web API`를 제공하지 않음에 발생하는 문제였습니다.

이러한 문제는 Next.js에서 SSR할 때에도 많이들 겪는 문제로 보였고, 단순히 `document`를 사용하는 코드를 바로 사용하지 않고, `useEffect` 훅을 사용해서 브라우저에 렌더링 되는 시점에 코드를 실행시키도록 했습니다.

여담으로, `Next.js`의 공식문서에서는 이를 위해 [Dynamic Import](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr) 라는 기능도 제공한다고 하는데, 추후에 이를 더 살펴보도록 해야겠네요.

```tsx
export const ToastModal = ({ children }: ToastModalProps) => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	return mounted ? (
		createPortal(
			<Wrapper>{children as ReactNode}</Wrapper>,
			document.getElementById('modal') as HTMLElement,
		)
	) : (
		<></>
	);
};
```

저는 `ToastModal.tsx`에서 `createPortal`을 사용하기 위해 `document`의 `<div id="modal">` 인 부분을 찾아야 했습니다. 떄문에 여기서 Web API인 `document`를 사용했었죠. 하지만, 이를 `useEffect`훅 안에 분기로 다음과 같이 처리했습니다.

### 문제 3. Warning: Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code

이 문제도 구글링을 해 보니 [nfl/react-helmet#623](https://github.com/nfl/react-helmet/issues/623)에 비슷한 글이 있었습니다. 따봉을 가장 많이 받은 답변은 `react-helmet-async를 써라` 였습니다. 그래서 해당 라이브러리를 찾아봤죠. 라이브러리에선 다음과 같은 글귀가 적혀있었습니다.

> react-helmet relies on react-side-effect, which is not thread-safe. If you are doing anything asynchronous on the server, you need Helmet to encapsulate data on a per-request basis, this package does just that.

중요한 부분은 `react-helmet`이 `thread-safe`하지 않는다는 부분과 server에서 실행(SSR)시 이 패키지가 도움을 줄것이다. 라고 하네요. 사용법은 root 레벨에서 Provider를 제공하고 App 하위에서 Helmet과 동일하게 사용하면 됩니다! (`위의 index.tsx와 entry-server.tsx를 참고하세요!`)

### 문제 4. Express를 배포할 환경이 마땅치가 않다. (돈드는건 싫다.)

`Express`를 배포하려면 일단 `GitHub Pages`는 절대로 불가능합니다. 얘는 index.html을 불러다주기만 하지 서버 역할을 하지 못하죠.. 그럼.. 다른 손쉬운 플랫폼을 찾다가 `Vercel`이 굉장이 쉬웠어서 `Vercel 배포`를 시도해봤습니다.

하지만... Vercel 배포도 실패했습니다. 자명하신 `Chat GPT`의 답변을 인용하면..

> **GPT**: Vercel은 정적 파일 호스팅 및 Serverless Functions를 위한 플랫폼으로, Node.js 서버를 직접 호스팅하는 서비스는 아닙니다.

역시 Vercel로 여러번 시도했지만 계속해서 `404(Not Found)`에러를 마주했고 결국 해결하지 못했습니다. 그래서 다음으로는 `Heroku`를 기웃거려봤는데... 예전에는 무료였지만 이제는 더이상 무료가 아니라서 포기.

마지막으로는 `AWS`의 `Elastic Beanstalk`를 통해 배포를 시도해봤습니다. 하지만, `Free Tier`였기 때문에 배포하는데 굉장히 오랜 시간이 걸리더라고요.. 그래서 이것도 전혀 못쓰겠다고 생각하여 포기했습니다.

결국 돌고 돌아 `Github Pages`에 배포해야겠다고 생각했습니다. SSR이 안된다면 `SSG`으로 마지막으로 한 번 해보자! 안되면 Next로 갈아 엎자는 마인드로 [Vite 공식 문서의 SSG](https://ko.vitejs.dev/guide/ssr.html#ssr-target)를 참고했습니다.

여기서는 기존 `SSR`방식에다 `prerender.js` 파일 하나만 더 추가돼고, 해당 파일에는 pages 디렉터리 기반으로 정적인 페이지를 만들어주고 있었습니다.

```js
// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

// determine routes to pre-render from src/pages
const routesToPrerender = fs
	.readdirSync(toAbsolute('src/pages'))
	.map((file) => {
		const name = file.replace(/\.jsx$/, '').toLowerCase();
		return name === 'home' ? `/` : `/${name}`;
	});

(async () => {
	// pre-render each route...
	for (const url of routesToPrerender) {
		const context = {};
		const appHtml = await render(url, context);

		const html = template.replace(`<!--app-html-->`, appHtml);

		const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
		fs.writeFileSync(toAbsolute(filePath), html);
		console.log('pre-rendered:', filePath);
	}
})();
```

하지만, 이 경로는 제 블로그 형식과는 맞지 않습니다. 저는 동적으로 :postId에 대한 경로(예시: `https://uiseop.github.io/0`)를 통해 포스트의 경로를 설정하고 있기 때문이죠. 그렇기 때문에 코드를 다음과 같이 수정했습니다.

```js
...
const { filesInfo } = await import('./src/static/fileInfo.js');

// // determine routes to pre-render from src/pages
// const routesToPrerender = fs
// 	.readdirSync(toAbsolute('src/pages'))
// 	.map((file) => {
// 		const name = file.replace(/\.jsx$/, '').toLowerCase();
// 		return name === 'main' ? `/` : `/${name}`;
// 	});

const postIds = new Array(filesInfo.files.length)
	.fill(null)
	.map((_, idx) => `/${idx}`);

const routesToPrerender = ['/', '/about', '/posts', ...postIds];
...
```

이렇게 해서 직접 제 블로그의 경로에 대한 모든 페이지를 만들 수 있도록 설정해주었고, 성공적으로 정적인 페이지들을 만들 수 있었습니다.(여기서도 몇 가지 문제가 있었지만..)

어쩄든, 이렇게 해서 실제 잘 동작하는 빌드된 SSG 페이지들을 얻을 수 있었기 때문에 이제는 `정적 웹 호스팅 서비스`인 `Github Pages`를 사용할 수 있었습니다.

이렇게 `SSG`를 통해 모든 경로에 대한 페이지들을 `빌드 시점`에 제공하기 때문에 `head` 부분에 제가 넣고자 했던 페이지들의 `meta 정보`들도 성공적으로 담을 수 있었고,

![노션 미리보기](https://github.com/uiseop/uiseop.github.io/blob/main/src/static/images/notion_alt.png?raw=true)
_(🎉미리보기 성공🎉)_

이렇게 URL을 첨부했을 때, 성공적으로 해당 페이지에 대한 정보를 담을 수 있게 되어 당당하게 남에게 자랑할 수 있게 되었습니다.

## 참고

- [https://ko.vitejs.dev/guide/ssr.html#ssr-target](https://ko.vitejs.dev/guide/ssr.html#ssr-target)
- [호두파파님의 window-is-not-defined 처리](https://velog.io/@yunsungyang-omc/Next.js-%EC%97%90%EB%9F%AC%EB%A1%9C%EA%B7%B8-window-is-not-defined)
- [서해빈님 react-router-dom 처리](https://velog.io/@haebin/React-Router-Server-Rendering%EC%8B%9C-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%B2%98%EB%A6%AC)
- [https://ko.vitejs.dev/guide/ssr.html](https://ko.vitejs.dev/guide/ssr.html)
- [https://reactrouter.com/en/main/guides/ssr](https://reactrouter.com/en/main/guides/ssr)
- [https://developer.mozilla.org/ko/docs/Web/API/Window](https://developer.mozilla.org/ko/docs/Web/API/Window)
