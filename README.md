# Turborepo starter

useRefフックとscrollToを使用する:
新しい要素が追加される前のスクロール位置を保存し、要素追加後に元の位置に戻すことができます[4]。

```jsx
const containerRef = useRef(null);

// 要素追加前
const scrollPosition = containerRef.current.scrollTop;

// 要素追加後
containerRef.current.scrollTo(0, scrollPosition);
```

window.scrollToを使う方法
window.scrollTo()メソッドを使うと、ページ全体を指定した位置にスクロールさせることができます。
javascript
// ページトップにスクロール
window.scrollTo(0, 0);

// スムーズにスクロール
window.scrollTo({
  top: 0,
  behavior: 'smooth'
});

Element.scrollIntoViewを使う方法
特定の要素まで自動的にスクロールさせたい場合は、Element.scrollIntoView()メソッドが便利です。
javascript
const element = document.getElementById('target');
element.scrollIntoView({behavior: 'smooth'});

要素内でスクロールする方法
特定の要素内でスクロールさせたい場合は、その要素のscrollTopプロパティを操作します。
javascript
const element = document.querySelector('#scrollable-element');
element.scrollTop = 1000; // 1000ピクセル下にスクロール

scrollByを使う方法
現在の位置から相対的にスクロールさせたい場合は、scrollBy()メソッドが使えます。
javascript
// 現在の位置から100px下にスクロール
window.scrollBy(0, 100);

これらの方法を使い分けることで、様々なスクロール操作を実現できます。ブラウザの互換性や具体的な要件に応じて、最適な方法を選択してください。

This is an official starter Turborepo.

## Using this example

Install dependencies:

```sh
cd monorepo
pnpm install
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `client`: a [React](https://vitejs.dev/) frontend
- `server`: a [Hono](https://hono.dev/) backend
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Biome](https://biomejs.dev/ja/) for code linting and code formatting

### Build

To build all apps and packages, run the following command:

```sh
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
pnpm dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
