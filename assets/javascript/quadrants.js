function demo(container) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  container.appendChild(canvas);
  
  var diagMode = document.createElement("input");
  diagMode.type = "radio";
  diagMode.name = "mode";
  diagMode.checked = true;
  var rectMode = document.createElement("input");
  rectMode.type = "radio";
  rectMode.name = "mode";
  
  container.appendChild(diagMode);
  container.appendChild(rectMode);
  
  diagMode.addEventListener("changed", function(event) {
    if(diagMode.selected)
      mode = "diagonal";
    else
      mode = "rectangle";
  });
  
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
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width, 0);
      context.closePath();
      context.stroke();
      // left
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(0, canvas.height);
      context.closePath();
      context.stroke();
      // bottom
      context.beginPath();
      context.moveTo(0, canvas.height);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width, canvas.height);
      context.closePath();
      context.stroke();
      // right
      context.beginPath();
      context.moveTo(canvas.width, 0);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width, canvas.height);
      context.closePath();
      context.stroke();
    }
    if(mode === "rectangle") {
      // topleft
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width / 2, 0);
      context.closePath();
      context.stroke();
      // bottomleft
      context.beginPath();
      context.moveTo(0, canvas.height / 2);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width / 2, canvas.height);
      context.closePath();
      context.stroke();
      // bottomright
      context.beginPath();
      context.moveTo(canvas.width, canvas.height / 2);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width / 2, canvas.height);
      context.closePath();
      context.stroke();
      // topright
      context.beginPath();
      context.moveTo(canvas.width / 2, 0);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width, canvas.height / 2);
      context.closePath();
      context.stroke();
    }
    
    requestAnimationFrame(drawQuadrants);
  }
  
  canvas.addEventListener("mousemove", onMouseMove);
  
  drawQuadrants();
}