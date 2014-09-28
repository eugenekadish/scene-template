/**
 * Creates a WebGL context in supported browsers and renders a 
 * static sample drawing in any canvas tag with an id set to
 * "scene".
 */
(function(){
  
  var gl;
  var scene = document.getElementById('scene');  

  // Check that the browser has WebGL support.
  try {
    gl = scene.getContext('webgl');
  } catch(e){
    if(!gl){
      alert(' WebGL could not be initialized.');
    }
  }

  gl.enable(gl.DEPTH_TEST);

  // Buffer containing coordinate data of a unit cube centered about the origin.
  var vertexBuffer = gl.createBuffer();
    
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, 
                    new Float32Array([
                                        -0.5, -0.5,  0.5,  1.0,  0.5, -0.5,  0.5,  1.0,  0.5,  0.5,  0.5,  1.0,
                                         0.5,  0.5,  0.5,  1.0, -0.5,  0.5,  0.5,  1.0, -0.5, -0.5,  0.5,  1.0,
                                         0.5,  0.5, -0.5,  1.0,  0.5, -0.5, -0.5,  1.0, -0.5, -0.5, -0.5,  1.0, 
                                         0.5,  0.5, -0.5,  1.0, -0.5,  0.5, -0.5,  1.0, -0.5, -0.5, -0.5,  1.0,
                                        -0.5,  0.5, -0.5,  1.0, -0.5, -0.5, -0.5,  1.0, -0.5,  0.5,  0.5,  1.0, 
                                        -0.5,  0.5,  0.5,  1.0, -0.5, -0.5, -0.5,  1.0, -0.5, -0.5,  0.5,  1.0,
                                         0.5,  0.5, -0.5,  1.0,  0.5,  0.5,  0.5,  1.0,  0.5, -0.5, -0.5,  1.0,
                                         0.5,  0.5,  0.5,  1.0,  0.5, -0.5, -0.5,  1.0,  0.5, -0.5,  0.5,  1.0,
                                         0.5,  0.5,  0.5,  1.0,  0.5,  0.5, -0.5,  1.0, -0.5,  0.5, -0.5,  1.0,
                                        -0.5,  0.5,  0.5,  1.0,  0.5,  0.5,  0.5,  1.0, -0.5,  0.5, -0.5,  1.0,
                                         0.5, -0.5,  0.5,  1.0, -0.5, -0.5, -0.5,  1.0,  0.5, -0.5, -0.5,  1.0, 
                                        -0.5, -0.5,  0.5,  1.0, -0.5, -0.5, -0.5,  1.0,  0.5, -0.5,  0.5,  1.0 
                                      ]), 
                  		        gl.STATIC_DRAW);
          
  // Buffer containing color data to be interpolated across the faces of a cube.
  var colorBuffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
                    new Float32Array([  
                                        1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0,
                                        1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 
                                        0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0,
                                        0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0,
                                        1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0,
                                        1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0,
                                        0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0,
                                        0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0,
                                        1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 
                                        1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0,
                                        0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0
                         	            ]),
                 	            gl.STATIC_DRAW);
  
  // Define and create the shaders.
  var sources = [];
  var shaders = [];

  sources[0] = 'attribute vec4 vertex;' +
               'attribute vec4 color;' +

               'uniform mat4 projection;' +
               'uniform mat4 modelview;' + 

               'varying vec4 c;' +

               'void main(){' +
               '  c = color;' +
               '  gl_Position = projection * modelview * vertex;' +
               '}';

  sources[1] = 'precision mediump float;' +

               'varying vec4 c;' +
                   
               'void main(){' +
               '  gl_FragColor = c;' +
               '}';

  shaders[0] = gl.createShader(gl.VERTEX_SHADER);
  shaders[1] = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(shaders[0], sources[0]);
  gl.compileShader(shaders[0]);

  gl.shaderSource(shaders[1], sources[1]);
  gl.compileShader(shaders[1]);

  // Check to see that the shaders compiled.
  for(var i = 0; i < shaders.length; i++){
    var shader = shaders[i];
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      alert(gl.getShaderInfoLog(shader));
    }
  }

  var shaderProgram = gl.createProgram();
      
  gl.attachShader(shaderProgram, shaders[0]);
  gl.attachShader(shaderProgram, shaders[1]);
  gl.linkProgram(shaderProgram);

  // Check to see if the program linked.
  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
    alert(' The shaders could not be initialized.');
  }

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
