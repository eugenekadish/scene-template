/**
 * Defines assets and properties used to render polygons in the WebGL context.
 */
function Shaders(gl, index){

  'use strict';

  index = index || 0;

  var sources = {};
  var shaders = [];

  var shaderProgram = gl.createProgram();

  // TODO: Load aditional shader sources, and from an external resource.
  var shaderResource = [
                        {
                          vertex: 'attribute vec4 vertex;' +
                                  'attribute vec4 color;' +

                                  'uniform mat4 projection;' +
                                  'uniform mat4 modelview;' +

                                  'varying vec4 c;' +

                                  'void main(){' +
                                  '  c = color;' +
                                  '  gl_Position = projection * modelview * vertex;' +
                                  '}',
                          fragment: 'precision mediump float;' +

                                    'varying vec4 c;' +

                                    'void main(){' +
                                    '  gl_FragColor = c;' +
                                    '}'
                        }
                      ];

  shaders[0] = gl.createShader(gl.VERTEX_SHADER);
  shaders[1] = gl.createShader(gl.FRAGMENT_SHADER);

  sources = shaderResource[index];

  /**
   * Compiles a vertex and fragment shader.
   */
  this.compile = function(){

    gl.shaderSource(shaders[0], sources.vertex);
    gl.compileShader(shaders[0]);

    gl.shaderSource(shaders[1], sources.fragment);
    gl.compileShader(shaders[1]);

    // Check to see that the shaders compiled.
    for(var i = 0; i < shaders.length; i++){
      var shader = shaders[i];
      if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(shader));
      }
    }
  };

  /**
   * Links compiled shaders into a WebGL program.
   */
  this.link = function(){

    gl.attachShader(shaderProgram, shaders[0]);
    gl.attachShader(shaderProgram, shaders[1]);
    gl.linkProgram(shaderProgram);

    // Check to see if the program linked.
    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
      alert(' The shaders could not be initialized.');
    }
  };

  /**
   * Returns the local shader program.
   *
   * @return {WebGLProgram} Shader program that can be attached to the WebGL context.
   */
  this.retrieveProgram = function(){
    return shaderProgram;
  };

  /**
   * Performs all steps required to create and return a shader program.
   *
   * @return {WebGLProgram} Shader program that can be attached to the WebGL context.
   */
  this.create = function(){

    this.compile();
    this.link();

    return shaderProgram;
  };
}
