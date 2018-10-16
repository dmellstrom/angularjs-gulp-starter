# AngularJS Starter Application

## Prerequisites

- `node`/`npm`

## Getting Started

    npm install
    npm start

The default gulp task will serve the application to `localhost:8888`, watch source files for changes, and livereload any recompiled assets.

## Preparing for Distribution

If the root module name has been changed from `myapp`, it is necessary to configure the new name in `package.json`. Then simply execute

    npm run build

The `build` script triggers minification and versioning of the JavaScript and CSS, outputting the results to the `dist` directory along with all other necessary assets.

The resulting build may be deployed as any routed AngularJS application -- by copying the contents of `dist/` to a serveable directory with `index.html` configured as the fallback.

## Previewing the Build

    npm run preview

The `preview` script serves the distribution build to `localhost:8888` so it may be examined before deployment.