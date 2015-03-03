function demo(container) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  container.appendChild(canvas);
  
  canvas.width = 200;
  canvas.height = 200;
  
  var mode = "diagonal";
  var cursorX = 0;
  var cursorY = 0;
  
  var rectQuadrants = [
    ["top", "bottom"],
    ["left", "right"]
  ];
  var diagQuadrants = [
    ["left", "bottom"],
    ["top", "right"]
  ];
  
  function onMouseMove(event) {
  	var rect = canvas.getBoundingClientRect();
    cursorX = event.clientX - rect.left;
    cursorY = event.clientY - rect.top;
  }
  
  function drawQuadrants() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(mode === "diagonal") {
      // top
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(this.canvas.width / 2, this.canvas.height / 2);
      context.lineTo(this.canvas.width, 0);
      context.closePath();
      context.stroke();
    }
    
    requestAnimationFrame(drawQuadrants);
  }
  
  canvas.addEventListener("mousemove", onMouseMove);
  
  drawQuadrants();
}