---
title: 'React 개발 블로그 배포기 (Feat.GitHub Pages) - 3: 동적 경로에 대한 404 에러 처리'
date: '2023-12-20 00:00:00'
author: 'uiseop'
categories: [react, trouble_shooting, deploy]
summary: 'CSR 방식에서 SSR 방식(정확히는 SSG)로 변경하면서 좌충우돌 겪었던 히스토리를 정리합니다.'
---

## 문제 상황

![404 page image](https://blog.kakaocdn.net/dn/srbXN/btriWMqpavd/x9u9eQ0vxvSnwmJYyZaUbK/img.png)
_(또다시 만난 404 에러..)_

이는 네비게이션바에 존재하는 카테고리들(`ALL`, `REACT`, `TROUBLE_SHOOTING` 등...)을 클릭하면 현재 주소에 `:category`를 추가해주도록 하고 있습니다. 하지만, 정적 페이지를 만들 당시 해당 경로에 대한 파일이 만들어지지 않고 있어서 문제가 되던것이죠.

## 문제 해결

![디렉터리 없음 캡쳐](https://github.com/uiseop/uiseop.github.io/blob/main/src/static/images/notFound.png?raw=true)

이는 위와 같이 `SSG` 과정에서 static 하위 경로인 posts 디렉터리가 없기 때문에 문제가 발생했습니다.

```js
// prerender.js
(async () => {
	// pre-render each route...
	for (const url of routesToPrerender) {
		try {
			const context = {};
			const appHtml = await render(url, context);

			const html = template
				.replace(`<!--app-html-->`, appHtml.html)
				.replace(`<!--app-head-->`, appHtml.head);

			const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
			fs.writeFileSync(toAbsolute(filePath), html);
			console.log('pre-rendered:', filePath);
		} catch (err) {
			console.log(err);
		}
	}
})();

// package.json의 script
"generate": "vite build --outDir dist/static && npm run build:server && node prerender",

```

`SSG`의 메인 비즈니스 로직 코드입니다. 여기서 `url`을 파싱하여 `filePath`를 가져오는데, 동적으로 생성된 카테고리의 경우 `dist/static/posts/react.html` 과 같은 형태로 파일이 생성되어야 하는데 build 과정에서 build 결과물이 `dists/static`의 경로로 생성되게 설정했을 뿐 `posts` 디렉터리에 대한 명시가 없기 때문에 `fs.writeFileSync`에서 없는 경로를 참조하고 있어 해당 경로에 대한 정적인 파일(`html`)이 만들어지지 못했던 것 입니다.

그럼 문제의 원인은 파악했으니 문제를 해결해보죠. `build 과정`에서 `posts 디렉터리`가 없는것이기 때문에 단순히 posts 디렉터리만 만들어주면 되겠다고 생각했습니다.

때문에 `SSG`를 담당하는 `prerender.js`에 다음과 같은 코드를 추가해서 `posts 디렉터리`가 동적으로 코드를 추가해줍니다

```js
// prerender.js
...
const postsDir = path.join(__dirname, './dist/static/posts');

fs.mkdirSync(postsDir, { recursive: true });
...
```

![build 결과 캡쳐](https://github.com/uiseop/uiseop.github.io/blob/main/src/static/images/buildResult.png?raw=true)

이렇게 하면 동적으로 해당 폴더(디렉터리)가 없을 경우 recursive 하게 해당 폴더를 생성해줄 수 있었고, build를 통해 해당 경로에 정적인 html 파일들이 성공적으로 생성됨을 확인할 수 있었습니다.

이로써 다시 한 번 `404(Not Found)`에 대한 문제를 모두 해결할 수 있게 되었습니다!
