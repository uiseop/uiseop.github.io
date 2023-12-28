---
title: 'React 개발 블로그 배포기 (Feat.GitHub Pages) - 1'
date: '2023-12-15 00:00:00'
author: 'uiseop'
categories: [react, trouble_shooting, deploy]
summary: '개발한 React 환경의 개발 블로그를 GitHub Pages로 배포 과정을 정리합니다.'
urlTitle: 'react-dev-blog-delpoy-feat-github-pages-chapter-1'
---

## Introduction

나만의 개발 블로그를 만들겠다고 결심한 계기는 다음과 같습니다.

> - 수기로 학습한 내용들을 정리했는데 시간이 지날수록 풍화가 일어남
> - 시간이 지날수록 자료가 많아져 내가 정리한 내용을 빠르게 찾을 수 없음
> - 지금까지 다른 사람들의 블로그를 통해 많이 배웠기 때문에, 이제는 나도 내가 겪은 문제점들을 기록하여 혹여나 나의 글로 도움이 되길 바람
> - (**`뽐내기`**) 등..🤗

이러한 계기를 바탕으로 블로그 제작을 시작하였고, 처음에는 [강의](inflearn.com/course/gatsby-기술블로그)를 통해 Gatsby를 활용한 블로그를 제작해보았으나, 직접 처음부터 끝까지 스스로 개발하고자 하는 욕구가 생겨 여러 시행착오 끝에 드디어 배포까지 하게 되었네요..

여담은 여기까지 하기로 하고, 블로그 제작기는 [다음 포스트](https://uiseop.github.io/posts)에 작성하기로 하고 일단은 배포 과정을 봅시다.

## 배포하기

이 블로그는 빌드 도구로 `Vite`를 사용했으며 [공식문서](https://ko.vitejs.dev/guide/static-deploy.html)에 여러 환경에 대한 배포 방법을 잘 문서화 해 놨기에 공식문서를 바탕으로 배포를 진행했습니다.

대부분의 개인 기술 블로그의 경우 GitHub Pages를 많이들 사용했고, GitHub Pages를 통해 배포된 기술 블로그의 주소(`https://<USERNAME>.github.io/`)를 갖고싶었기 때문에 저 역시 GitHub Pages를 통해 배포를 진행했습니다.

![배포 CI/CD 이미지](https://github.com/uiseop/uiseop.github.io/blob/main/src/static/images/image.png?raw=true)

공식문서를 차례대로 따라하면 CI/CD 경험까지 할 수 있었는데요, `GitHub Actions`를 통해 공식문서에 나온 `.yml` 코드를 나만의 `workflow`로 새로 생성하고, 변경 내역들을 push 하면 자동으로 변경사항이 적용된 코드로 새로이 build 및 deploy가 진행되는 것을 확인할 수 있었습니다.

위와 같이 성공적으로 배포가 완료되면 비로서 저만의 기술 블로그가 세상에 배포될 수 있었고, 이 글을 읽으시는 여러분에게까지 닿을 수 있게 되었습니다.

하지만... 개발을 하다보면 뭐든 단 한 번에 되는 법이 없었고... 이번에도 역시 문제가 발생했었습니다.

## 문제상황

[https://uiseop.github.io/](https://uiseop.github.io/)로 접근했을 때에는 문제 없이 정상적으로 페이지 전환 및 동작이 문제 없이 동작했습니다. 하지만, 다음과 같은 상황에서 문제가 됐죠.

1. 루트 경로가 아닌 하위 경로에서 새로고침
2. 하위 경로를 복사해서 url에 입력 -> 엔터로 접근

![404 page image](https://blog.kakaocdn.net/dn/srbXN/btriWMqpavd/x9u9eQ0vxvSnwmJYyZaUbK/img.png)

위의 두 가지 방식으로 페이지를 접근하면 `404(Not Found)` 에러로 정상적으로 접근되지 못하는 문제가 있었습니다.

여타 다른 블로그들에서 배포하던 방식(`gh-page` 브랜치를 만들어서.. build한 파일들을 해당 브랜치에 넣고...)과 달라 그 방식대로 해 보아도 문제는 해결되지 않았습니다. 오히려 위 방식으로 하니까 더 햇갈리더라구요. `명령어를 치면 된다!` 라고 해결하는 방식은 어딘가 가려운 부분이 계속해서 남았습니다.

그래서 다시 공식문서로 되돌린 후 구글링을 한 결과 역시 저와 같은 문제로 고통을 받는 분의 질문을 찾을 수 있었습니다.

[404 Error on refresh with SPA React Router app in GitHub Pages](https://stackoverflow.com/questions/63462828/404-error-on-refresh-with-spa-react-router-app-in-github-pages)로 Stack overflow에 올라온 질문이였고 해당 질문의 답변을 간단히 요약하면 다음과 같습니다.

> GitHub Pages는 HTML5의 history API를 지원하지 않는다고 합니다. 때문에 `react-router-dom`으로 라우팅을 설정한 제 App에서 설정한 경로 `https://user.github.io/posts`에서 `/posts` 와 같은 하위 경로는 frontend 측(React App 에서 이해할 수 있는) 경로일뿐, GitHub Pages 서버에서는 `/posts` 라는 경로에 대해 아무것도 파악하지 못하기 때문에 `404(Not Found)` 상태 코드를 반환하고, 저는 `404.html` 파일을 명시하지 않았기 때문에 GitHub 측에서 제공하는 `default 404.html` 파일을 바라보게 되는 것 입니다.

때문에, 저는 다음 세 가지 방식의 해결 방법을 확인했습니다.

1. HTML5의 History API를 사용하지 않고 `Hash Routes`를 사용한다.
2. build된 index.html로 redirecting 시켜주는 `404.html`를 제공한다.
3. 아예 HTML5의 History API를 제공하는 Vercel이나 Nestify와 같은 다른 서버에 배포한다.

`1의 방식(Hash Router)`은 URL이 길어지고 조금 더 복잡해지기(예를 들어, `http://user.github.io/#/posts/42?_k=yknaj`) 때문에 내키지가 않았습니다. 또한, 단순히 배포만을 위해 수정해야하는 부분이 굉장히 많았(`hashHistory`로 교체)기 때문에 귀찮이즘이 발동하고 말았죠..

`3의 방식(Vercel, Nestify ...)`은 스스로 문제를 피하는 느낌이 들어 괜시리 또 싫어지더라구요..

그렇게 해서 `2의 방식(404 Page)`으로 해결해보고자 했습니다. (그리고 생각보다 어렵지 않더라구요.)

## 해결

답글에서는 Github 내 한 [레포지토리](https://github.com/rafgraph/spa-github-pages)를 링크로 남겨두었는데 설명이 굉장히 상세합니다. 한 번 읽어봐도 괜찮더라구요.저는 긴 글들에서 핵심, 그리고 Vite 환경에서 설정하는 방식을 추가해서 기록 하겠습니다.

### 1. 404.html 파일 만들기

설명에서는 redirect 하는 script를 담은 404.html 문서를 제공하고, index.html에서 redirect 한 URL을 Parsing하는 script를 추가해서 404 Page를 index.html로 대체하는 코드를 담고 있습니다.

```html
<!-- 404.html -->
<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Single Page Apps for GitHub Pages</title>
		<script type="text/javascript">
			// Single Page Apps for GitHub Pages
			// MIT License
			// https://github.com/rafgraph/spa-github-pages
			// This script takes the current url and converts the path and query
			// string into just a query string, and then redirects the browser
			// to the new url with only a query string and hash fragment,
			// e.g. https://www.foo.tld/one/two?a=b&c=d#qwe, becomes
			// https://www.foo.tld/?/one/two&a=b~and~c=d#qwe
			// Note: this 404.html file must be at least 512 bytes for it to work
			// with Internet Explorer (it is currently > 512 bytes)

			// If you're creating a Project Pages site and NOT using a custom domain,
			// then set pathSegmentsToKeep to 1 (enterprise users may need to set it to > 1).
			// This way the code will only replace the route part of the path, and not
			// the real directory in which the app resides, for example:
			// https://username.github.io/repo-name/one/two?a=b&c=d#qwe becomes
			// https://username.github.io/repo-name/?/one/two&a=b~and~c=d#qwe
			// Otherwise, leave pathSegmentsToKeep as 0.
			var pathSegmentsToKeep = 0;

			var l = window.location;
			l.replace(
				l.protocol +
					'//' +
					l.hostname +
					(l.port ? ':' + l.port : '') +
					l.pathname
						.split('/')
						.slice(0, 1 + pathSegmentsToKeep)
						.join('/') +
					'/?/' +
					l.pathname
						.slice(1)
						.split('/')
						.slice(pathSegmentsToKeep)
						.join('/')
						.replace(/&/g, '~and~') +
					(l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
					l.hash,
			);
		</script>
	</head>
	<body></body>
</html>
```

`404.html` 파일은 위와 같은 내용의 코드들이 담겨 있는데 여기서 중요한건 pathSegmentsToKeep 변순데요, 만약 배포하신 깃헙 페이지의 주소가 다음과 같으면(`https://username.github.io/repo-name/`), `1` 혹은 그 이상의 값으로 설정하라고 되어 있네요.

저는 `https://username.github.io/` 형식으로 배포할것이기 때문에 `0`으로 설정해두었습니다.

### 2. index.html에 스크립트 추가하기

```html
<!-- index.html -->
<!doctype html>
<html lang="ko">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>CHUG ALONG 개발 블로그</title>
		<script type="text/javascript">
			// Single Page Apps for GitHub Pages
			// https://github.com/rafrex/spa-github-pages
			// Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
			// ----------------------------------------------------------------------
			// This script checks to see if a redirect is present in the query string
			// and converts it back into the correct url and adds it to the
			// browser's history using window.history.replaceState(...),
			// which won't cause the browser to attempt to load the new url.
			// When the single page app is loaded further down in this file,
			// the correct url will be waiting in the browser's history for
			// the single page app to route accordingly.
			(function (l) {
				if (l.search) {
					var q = {};
					l.search
						.slice(1)
						.split('&')
						.forEach(function (v) {
							var a = v.split('=');
							q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
						});
					if (q.p !== undefined) {
						window.history.replaceState(
							null,
							null,
							l.pathname.slice(0, -1) +
								(q.p || '') +
								(q.q ? '?' + q.q : '') +
								l.hash,
						);
					}
				}
			})(window.location);
		</script>
	</head>
	<body>
		<div id="root"></div>
		<div id="modal"></div>
		<script type="module" src="/src/index.tsx"></script>
	</body>
</html>
```

그리고 `index.html` 파일에도 위와 같이 script를 추가해서 redirect됐을 때 URL을 parsing해서 가고자 하는 위치로 이동합니다.

그런 다음 Vite에 build 때 저희가 만들어 놓은 404.hmtl 파일도 같이 포함해달라고 알려줘야지만이 `dist` 디렉터리에 404.html 이 포함됩니다.

### 3. 빌드 설정에 추가된 정보 알려주기

이는 [여기](https://stackoverflow.com/questions/75911586/vite-insert-base-url-in-404-html)를 참고해서 `vite.config.ts` 설정을 완료했습니다.

```ts
// vite.config.ts
function entryPoints(...paths) {
	const entries = paths.map(parse).map((entry) => {
		const { dir, base, name } = entry;
		const key = join(dir, name);
		const path = resolve(__dirname, dir, base);
		return [key, path];
	});

	const config = Object.fromEntries(entries);
	return config;
}

// https://vitejs.dev/config/
export default defineConfig({
	// ...
	build: {
		rollupOptions: {
			input: entryPoints('index.html', '404.html'),
			// ...
		},
	},
});
```

이렇게 설정해서 다시 `push` 하면 build를 통해 dist디렉터리 안에 `404.html` 파일을 올려놓을 수 있게 되었고, GitHub Pages에서 모른다고 파악한 경로에 대해서는 만들어놓은 `404.html` 파일을 불러올 수 있게 되었습니다. `404.html` 파일에는 다시 현재 경로를 파악해서 `index.html`으로 redirect 될 수 있도록 javascript 코드를 실행시키게 되겠죠!

---

## 마치며..

이렇게 해서 제 첫 개발 블로그를 성공적으로 출범시킬 수 있었습니다. 부족하지만 제 블로그 타이틀인 **CHUG ALONG**(=천천히 그리고 꾸준히) 가꿔나가보도록 해보겠습니다.
