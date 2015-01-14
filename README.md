# Scene Template

Setting up even a simple scene with WebGL requires a lot of steps and is difficult to debug. This module encapsulates an isolated JavaScript function that can render a static scene. Having the code in one place makes it easy to learn the minimal requirements for getting started with the HTML5 *canvas* tag and customizing a 3D scene in a web browser.

## Setup

The dependencies are the [gl-matrix](https://github.com/toji/gl-matrix), matrix and vector javascript library, along with the [qunit](http://qunitjs.com), unit testing framework. To avoid downloading these packages manually, the command

    bower install

from the root directory, will fetch the required libraries and place them into the default folder *bower* downloads dependencies to. Install [node.js](http://nodejs.org) to get [bower](http://bower.io). Run

    npm install -g bower

to install it globally. For the [Grunt](http://gruntjs.com/getting-started) tasks, [grunt-cli](https://github.com/gruntjs/grunt-cli) has to be installed.

    npm install -g grunt-cli

Also, make sure to download all the npm packages.

    npm install

## Viewing

Running this application locally can be done with a Grunt task.

    grunt connect

To check how the template is rendering, navigate to the index file in the root directory with any browser that has WebGL support. Alternatively, check out the [project site](http://eugenekadish.github.io/scene-template/) to compare the widget. The tests can be run in the browser as well, by opening *runner.html* in *tests*.
