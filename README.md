# AngularJS Starter Application

## Prerequisites

- `node >= 8.0.0`/`npm >= 5.0.0`

## Getting Started

    npm install
    npm start

The default gulp task will serve the application to `localhost:8888`, watch source files for changes, and livereload any recompiled assets.

## Unit Testing

    npm test

Karma will launch configured web browsers (Chrome by default), watch the source, and re-run Jasmine specs on any change.

## Preparing for Distribution

    npm run build

The `build` script triggers minification and versioning of the JavaScript and CSS, outputting the results to the `dist` directory along with all other necessary assets.

The resulting build may be deployed as any routed AngularJS application -- by copying the contents of `dist/` to a serveable directory with `index.html` configured as the fallback.

## Previewing the Build

    npm run preview

The `preview` script serves the distribution build to `localhost:8888` so it may be examined before deployment.