              //Pointer lock
var canvas = document.getElementById('renderCanvas');
canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
};
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    console.log('Your pointer is locked');
  } else {
    console.log('Your pointer is unlocked');  
  }
}
