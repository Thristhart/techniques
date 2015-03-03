function demo(container) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  container.appendChild(canvas);
  
  var modeForm = document.createElement("form");
  
  var diagMode = document.createElement("input");
  diagMode.type = "radio";
  diagMode.name = "mode";
  diagMode.checked = true;
  diagMode.value = "Diagonal";
  var rectMode = document.createElement("input");
  rectMode.type = "radio";
  rectMode.name = "mode";
  rectMode.value = "Rectangular";
  
  var rectLabel = document.createElement("label");
  rectLabel.innerText = "Rectangular";
  var diagLabel = document.createElement("label");
  diagLabel.innerText = "Diagonal";
  
  diagLabel.appendChild(diagMode);
  rectLabel.appendChild(rectMode);
  
  modeForm.appendChild(diagLabel);
  modeForm.appendChild(rectLabel);
  
  container.appendChild(modeForm);
  
  modeForm.addEventListener("change", function(event) {
    if(diagMode.checked)
      mode = "diagonal";
    else
      mode = "rectangle";
  });
  
  canvas.width = 200;
  canvas.height = 200;
  
  var mode = "diagonal";
  var cursorX = 0;
  var cursorY = 0;
    
  function onMouseMove(event) {
  	var rect = canvas.getBoundingClientRect();
    cursorX = event.clientX - rect.left;
    cursorY = event.clientY - rect.top;
  }
  
  function findDiagonalQuadrant(x, y, width, height) {
    var diagQuadrants = [
      ["left", "bottom"],
      ["top", "right"]
    ];
    var corner = [];
    var slope = height / width;
    var edgeHeight = slope * x;
    if(y > edgeHeight) {
      corner = diagQuadrants[0]; // bottomLeft
    }
    else {
      corner = diagQuadrants[1]; // topright
    }
    
    if(y < -edgeHeight + height) {
      return corner[0]; // left or top
    }
    else {
      return corner[1]; // bottom or right
    }
  }
  function findRectangularQuadrant(x, y, width, height) {
    var vertical;
    if(y < height / 2) {
      vertical = "top";
    }
    else {
      vertical = "bottom";
    }
    if(x < width / 2) {
      horizontal = "left";
    }
    else {
      horizontal = "right";
    }
    return vertical + horizontal;
  }
  
  function drawQuadrants() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(mode === "diagonal") {
      var quad = findDiagonalQuadrant(cursorX, cursorY, canvas.width, canvas.height);
      // top
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width, 0);
      context.closePath();
      context.stroke();
      if(quad === "top")
        context.fill();
      // left
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(0, canvas.height);
      context.closePath();
      context.stroke();
      if(quad === "left")
        context.fill();
      // bottom
      context.beginPath();
      context.moveTo(0, canvas.height);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width, canvas.height);
      context.closePath();
      context.stroke();
      if(quad === "bottom")
        context.fill();
      // right
      context.beginPath();
      context.moveTo(canvas.width, 0);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      context.lineTo(canvas.width, canvas.height);
      context.closePath();
      context.stroke();
      if(quad === "right")
        context.fill();
    }
    if(mode === "rectangle") {
      var quad = findRectangularQuadrant(cursorX, cursorY, canvas.width, canvas.height);
      //topleft
      if(quad === "topleft")
        context.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
      else
        context.strokeRect(0, 0, canvas.width / 2, canvas.height / 2);
      //bottomleft
      if(quad === "bottomleft")
        context.fillRect(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
      else
        context.strokeRect(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
      //bottomright
      if(quad === "bottomright")
        context.fillRect(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
      else
        context.strokeRect(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
      //topright
      if(quad === "topright")
        context.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);
      else
        context.strokeRect(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);
    }
    
    requestAnimationFrame(drawQuadrants);
  }
  
  canvas.addEventListener("mousemove", onMouseMove);
  
  drawQuadrants();
}