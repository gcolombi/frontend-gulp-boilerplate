# Frontend gulp boilerplate

[![node)](https://img.shields.io/badge/node->=14-informational?style=for-the-badge)](https://nodejs.org/)
![gulp-current](https://img.shields.io/badge/gulp-v4.0.2-informational?style=for-the-badge&logo=gulp)
[![GitHub License](https://img.shields.io/github/license/gcolombi/frontend-gulp-boilerplate?color=informational&style=for-the-badge)](https://github.com/gcolombi/frontend-gulp-boilerplate/blob/master/LICENSE)
[![barba](https://img.shields.io/badge/barba-v2.9.7-green?style=for-the-badge)](https://github.com/barbajs/barba)
[![loadx](https://img.shields.io/badge/loadx-v0.1.1-green?style=for-the-badge)](https://github.com/cesarwbr/loadx)
[![locomotive-scroll](https://img.shields.io/badge/locomotive--scroll-v4.1.4-green?style=for-the-badge)](https://github.com/locomotivemtl/locomotive-scroll)
[![vanilla-lazyload](https://img.shields.io/badge/vanilla--lazyload-v17.8.3-green?style=for-the-badge)](https://github.com/verlok/vanilla-lazyload)

<div align="center">
    <img src="https://github.com/devicons/devicon/blob/master/icons/gulp/gulp-plain.svg" title="Gulp" alt="Gulp" width="300" height="300"/>
</div>

<div align="center">
    <img src="https://github.com/devicons/devicon/blob/master/icons/sass/sass-original.svg" title="Saas" alt="Saas" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="Javascript" alt="Javascript" width="40" height="40"/>&nbsp;
    <img src="https://github.com/evanw/esbuild/blob/a846a60af6bf679e158e486b9da82dcf270fc613/images/logo.svg" title="Esbuild" alt="Esbuild" width="40" height="40"/>
</div>

## Features

* Uses [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) for detection of elements in viewport & smooth scrolling with parallax effects.
* Uses [Barba](https://github.com/barbajs/barba) to create fluid and smooth transitions between your website's pages.
* Uses [Vanilla lazyload](https://github.com/verlok/vanilla-lazyload) to speed up your web application by deferring the loading of your below-the-fold images.
* **CSS architecture** containing generic and base style, custom configuration, grid, utilities, mixins etc.
* **Dynamic javascript modules** rendering (example.js file as a reference).
* Configuration per **environment**
    * `development` - [`sourcemaps`](https://github.com/gulp-sourcemaps/gulp-sourcemaps), [`browser synced developmentment server`](https://browsersync.io/docs/gulp)
    * `production` - [`css minification`](https://github.com/scniro/gulp-clean-css), [`js minification`](https://github.com/terinjokes/gulp-uglify)
* The built CSS / JavaScript files will respect the **configured supported browser versions** using the following tools:
    * [`autoprefixer`](https://github.com/sindresorhus/gulp-autoprefixer) - automatically adds vendor prefixes to CSS rules.
    * [`esbuild`](https://esbuild.github.io/api/#target) - It tells esbuild to transform JavaScript syntax that is too new for these environments into older JavaScript syntax that will work.
* Support for **assets optimization** for production environment with ability to configure:
    * **Code Minification** of *JavaScript* and *CSS* processed files.
    * **Optimize Assets Loading** - images / fonts.
* Latest [Gulp 4](https://github.com/gulpjs/gulp) - *Front-end* task runner.
* Latest [SASS/gulp-sass](https://github.com/sass/sass) compiler based on Dart `sass`.
* [gulp-esbuild](https://github.com/ym-project/gulp-esbuild) JavaScript bundler.
* Configured and ready to use **Browsersync Server** plugin for faster local development - [`browser-sync`](https://github.com/BrowserSync/browser-sync)

## Requirements

* `node`: `>=14`
* `yarn` or `npm`

## Installation

Yarn
```sh 
git clone git@github.com:gcolombi/frontend-gulp-boilerplate.git project-name
cd project-name
yarn install
```

NPM
```sh 
git clone git@github.com:gcolombi/frontend-gulp-boilerplate.git project-name
cd project-name
npm install
```

Replace the original remote repository with your project's repository.

Update the following files to suit your project:

* [`README.md`](https://github.com/gcolombi/frontend-gulp-boilerplate/blob/master/README.md)
* [`package.json`](https://github.com/gcolombi/frontend-gulp-boilerplate/blob/master/package.json):
    * name: `frontend-gulp-boilerplate`
    * description: `Starter project template boilerplate ...`
    * author: `Gérard Colombi`
* [`site.webmanifest`](https://github.com/gcolombi/frontend-gulp-boilerplate/blob/master/src/assets/images/favicons/site.webmanifest)
    * name: `Frontend gulp boilerplate`
    * short_name: `Boilerplate`

# Development

## Assets Source

* _SASS/SCSS_: `src/assets/styles/`
* _JavaScript_: `src/assets/scripts/`
* _Images_: `src/assets/images/`
* _Fonts_: `src/assets/fonts/`
* _HTML_: `src/templates/`

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📂favicons
 ┃ ┃ ┣ 📂svg
 ┃ ┃ ┗ 📜example.jpg
 ┃ ┣ 📂scripts
 ┃ ┃ ┣ 📂base
 ┃ ┃ ┣ 📂modules
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜app.js
 ┃ ┃ ┣ 📜lifecycle.js
 ┃ ┃ ┗ 📜store.js
 ┃ ┗ 📂styles
 ┗📂templates
   ┣ 📜container.html
   ┣ 📜form.html
   ┣ 📜grid.html
   ┣ 📜images.html
   ┣ 📜index.html
   ┗ 📜spacing.html
 ```

## Build/Compile Assets

### Start a development server

Yarn
```sh
yarn dev
```

NPM
```sh
npm run dev
```

### One time build assets

Yarn
```sh
yarn build
```

NPM
```sh
npm run build
```

### Compile and watch assets

Yarn
```sh
yarn watch
```

NPM
```sh
npm run watch
```

# Production 

## Build Assets

Yarn
```sh
yarn production
```

NPM
```sh
npm run production
```

## Built Assets Source

* _CSS_: `dist/assets/`
* _JavaScript_: `dist/assets/`
* _Images_: `dist/assets/images/`
* _Fonts_: `dist/assets/fonts/`
* _HTML_: `dist/`

```
📦dist
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📂favicons
 ┃ ┃ ┣ 📂svg
 ┃ ┃ ┣ 📂webp
 ┃ ┃ ┗ 📜example.jpg
 ┃ ┣ 📜app.js
 ┃ ┣ 📜app.js.map
 ┃ ┣ 📜example.css
 ┃ ┣ 📜example.css.map
 ┃ ┣ 📜example.js
 ┃ ┣ 📜example.js.map
 ┃ ┣ 📜forminput.js
 ┃ ┣ 📜forminput.js.map
 ┃ ┣ 📜style.css
 ┃ ┗ 📜style.css.map
 ┣ 📜container.html
 ┣ 📜form.html
 ┣ 📜grid.html
 ┣ 📜images.html
 ┣ 📜index.html
 ┗ 📜spacing.html
 ```