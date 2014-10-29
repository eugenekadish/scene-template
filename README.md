# Scene Template

Setting up even a simple scene with WebGL requires a lot of steps and is difficult to debug. This module encapsulates an isolated javascript function that can render a static scene. Having the code in one place makes it easy to learn the minimal requirements for getting started with the HTML5 *canvas* tag and customizing a 3D scene in a web browser.

## Setup

The dependencies are [gl-matrix](https://github.com/toji/gl-matrix), matrix and vector javascript library, along with the [qunit](http://qunitjs.com), unit testing framework. To avoid downloading these packages manually, the command

    bower install

will fetch the required libraries and place them into the *components* folder at the root directory. The [bower](http://bower.io) command requires [node.js](http://nodejs.org) to be installed.

    npm install bower

will download the package.

## Viewing

With [grunt-cli](https://github.com/gruntjs/grunt-cli) installed,

    npm install

will retrieve all the [grunt](http://gruntjs.com) dependencies. Then running this application locally is a simple task.

    grunt connect

To check how the template is rendering simply navigate to the index file in the root directory with any browser that has WebGL support. Alternatively, check out the [project site](http://eugenekadish.github.io/scene-template/) to compare the widget. The tests can be run in the browser as well, by opening *runner.html* in *tests*.
