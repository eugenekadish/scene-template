/**
 * Tests what is used to render what is in "scene", and
 * the final image.
 */
(function(){

  'use strict';

  var gl     = document.getElementById('scene').getContext('webgl');
  var pixels = new Uint8Array(512 * 512 * 4);

  // Check that the browser has WebGL support.
  try {

    gl = scene.getContext('webgl');
  } catch(e){

    if(!gl){
      alert(' WebGL could not be initialized.');
    }

    return;
  }

  gl.readPixels(0, 0, 512, 512, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  /**
   * Test what is rendered.
   */
  QUnit.test(' Check properties getting passed to the WebGL context.', function(assert){

    var shapes = new Objects();
    var cube = shapes.cube;

    assert.deepEqual(cube.vertices,
                      [
                        -1.0, -1.0,  1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,
                         1.0,  1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0, -1.0, -1.0,  1.0,  1.0,
                         1.0,  1.0, -1.0,  1.0,  1.0, -1.0, -1.0,  1.0, -1.0, -1.0, -1.0,  1.0,
                         1.0,  1.0, -1.0,  1.0, -1.0,  1.0, -1.0,  1.0, -1.0, -1.0, -1.0,  1.0,
                        -1.0,  1.0, -1.0,  1.0, -1.0, -1.0, -1.0,  1.0, -1.0,  1.0,  1.0,  1.0,
                        -1.0,  1.0,  1.0,  1.0, -1.0, -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,  1.0,
                         1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0, -1.0,  1.0,
                         1.0,  1.0,  1.0,  1.0,  1.0, -1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
                         1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0, -1.0,  1.0, -1.0,  1.0,
                        -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0, -1.0,  1.0,
                         1.0, -1.0,  1.0,  1.0, -1.0, -1.0, -1.0,  1.0,  1.0, -1.0, -1.0,  1.0,
                        -1.0, -1.0,  1.0,  1.0, -1.0, -1.0, -1.0,  1.0,  0.5, -1.0,  1.0,  1.0
                      ], ' Checked the vertex coordinates.');

    assert.deepEqual(cube.colors,
                      [
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
                      ], ' Checked the vertex coordinates.');
  });


  /**
   * Test portions of the rendered image.
   */
  QUnit.test(' Checking specific pixel colors.', function(assert){

    assert.deepEqual([
                        pixels[0],
                        pixels[1],
                        pixels[2],
                        pixels[3]
                     ], [0, 0, 0, 255], ' Checked a pixel.');

    assert.deepEqual([
                        pixels[512 * 256 * 4 - 220 * 4 + 0],
                        pixels[512 * 256 * 4 - 220 * 4 + 1],
                        pixels[512 * 256 * 4 - 220 * 4 + 2],
                        pixels[512 * 256 * 4 - 220 * 4 + 3]
                     ], [255, 0, 255, 255], ' Checked a pixel.');

    assert.deepEqual([
                        pixels[512 * 256 * 4 - 180 * 4 + 0],
                        pixels[512 * 256 * 4 - 180 * 4 + 1],
                        pixels[512 * 256 * 4 - 180 * 4 + 2],
                        pixels[512 * 256 * 4 - 180 * 4 + 3]
                      ], [0, 255, 255, 255], ' Checked a pixel.');
  });
})();
