/**
 * Creates a WebGL context in supported browsers and renders a
 * static sample drawing in any canvas tag with an id set to
 * "scene".
 */
(function(){

  'use strict';

  var gl;
  var scene = document.getElementById('scene');

  var shapes = new Objects();
  var cube = shapes.cube;

  // Check that the browser has WebGL support.
  try {

    gl = scene.getContext('webgl');
  } catch(e){
        
    if(!gl){
      alert(' WebGL could not be initialized.');
    }

    return;
  }

  gl.enable(gl.DEPTH_TEST);

  // Buffer containing coordinate data of a unit cube centered about the origin.
  var vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices), gl.STATIC_DRAW);

  // Buffer containing color data to be interpolated across the faces of a cube.
  var colorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.colors), gl.STATIC_DRAW);
 
  var instance = new Shaders(gl);  
  /*
  instance.compile();
  instance.link();  
  
  var shaderProgram = instance.retrieveProgram();
  */
  var shaderProgram = instance.create();

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.viewport(0, 0, scene.width, scene.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(shaderProgram);

  // Set up the matrices for the viewing transformation.
  var eye    = vec3.create();
  var center = vec3.create();
  var up     = vec3.create();

  vec3.set(eye, 1.0, 1.0, 3.0);
  vec3.set(center, 0.0, 0.0, 0.0);
  vec3.set(up, 0.0, 1.0, 0.0);

  var projection = mat4.create();
  var modelview  = mat4.create();

  mat4.frustum(projection, -0.5, 0.5, -0.5, 0.5, 1.0, 15.0);
  mat4.lookAt(modelview, eye, center, up);

  mat4.scale(modelview, modelview, [0.5, 0.5, 0.5]);

  shaderProgram.vertexAttribute = gl.getAttribLocation(shaderProgram, 'vertex');

  // Set the attribute locations and point them to the corresponding buffer data.
  gl.enableVertexAttribArray(shaderProgram.vertexAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexAttribute, 4, gl.FLOAT, false, 0, 0);

  shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, 'color');

  gl.enableVertexAttribArray(shaderProgram.colorAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(shaderProgram.colorAttribute, 4, gl.FLOAT, false, 0, 0);

  // Set the locations and data of uniform variables.
  shaderProgram.projectionUniform = gl.getUniformLocation(shaderProgram, 'projection');
  shaderProgram.modelviewUniform  = gl.getUniformLocation(shaderProgram, 'modelview');

  gl.uniformMatrix4fv(shaderProgram.projectionUniform, false, projection);
  gl.uniformMatrix4fv(shaderProgram.modelviewUniform, false, modelview);

  gl.drawArrays(gl.TRIANGLES, 0, 36);
})();
