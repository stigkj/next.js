# Layout component example

This example shows a very common use case when building websites where you need to repeat some sort of layout for all your pages. Our pages are: `home`, `about` and `contact` and they all share the same `<head>` settings, the `<nav>` and the `<footer>`. Further more, the title (and potentially other head elements) can be sent as a prop to the layout component so that it's customizable in all pages.

## Deploy your own

Deploy the example using [ZEIT Now](https://zeit.co/now):

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/zeit/next.js/tree/canary/examples/layout-component)

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npm init next-app --example layout-component layout-component-app
# or
yarn create next-app --example layout-component layout-component-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/layout-component
cd layout-component
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download)):

```bash
now
```
