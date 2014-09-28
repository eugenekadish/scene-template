var gl     = document.getElementById('scene').getContext('webgl');
var pixels = new Uint8Array(500 * 500 * 4);

gl.readPixels(0, 0, 500, 500, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

/**
 * Test portions of the rendered image.
 */
QUnit.test(' Checking specific pixel colors.', function(assert){

  assert.deepEqual([pixels[0], pixels[1], pixels[2], pixels[3]], [0, 0, 0, 255], ' Checked a pixel.');
  assert.deepEqual([
                      pixels[500 * 250 * 4 - 250 * 4 + 0], 
                      pixels[500 * 250 * 4 - 250 * 4 + 1], 
                      pixels[500 * 250 * 4 - 250 * 4 + 2], 
                      pixels[500 * 250 * 4 - 250 * 4 + 3]
                   ], [255, 0, 255, 255], ' Checked a pixel.');
});
