# AngularJS Starter Application

## Prerequisites

- `node >= 12.0.0`/`npm >= 6.9.0`

## Getting Started

    git clone --depth 1 git@github.com:dmellstrom/angularjs-gulp-starter
    cd angularjs-gulp-starter/
    npm install
    npm start

The default gulp task will serve the application to `localhost:8888`, watch source files for changes, and livereload any recompiled assets.

## Unit Testing

    npm test

Karma will launch configured web browsers (Chrome by default), watch the source, and re-run Jasmine specs on any change.

## End-to-End Testing

The end-to-end testing setup uses Protractor, which relies on Selenium, and thus requires JDK to be installed.
As another one-time prerequisite, install the latest WebDriver.

    npm run update-webdriver

With the default serve task running in the background, start Protractor to execute the test scenarios from the `e2e` directory against the served application.

    npm run e2e

It's also possible to run e2e tests against a distribution build. See 'Previewing the Build' below.

## Preparing for Distribution

    npm run build

The `build` script triggers minification and versioning of the JavaScript and CSS, outputting the results to the `dist` directory along with all other necessary assets.

The resulting build may be deployed as any routed AngularJS application -- by copying the contents of `dist/` to a serveable directory with `index.html` configured as the fallback.

## Previewing the Build

    npm run preview

The `preview` script serves the distribution build to `localhost:8888` so it may be examined before deployment.