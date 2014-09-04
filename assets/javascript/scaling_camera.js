function demo(container) {
  var canvas = document.createElement("canvas")
  var context = canvas.getContext("2d")
  container.appendChild(canvas)
  
  canvas.width = 200
  canvas.height = 200
  
  var camera = {x: canvas.width/2, y: canvas.height/2, xScale: 1, yScale: 1, speed: 0.1}
  function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    
    context.translate(canvas.width / 2 - camera.x * camera.xScale,
                      canvas.height / 2 - camera.y * camera.yScale);
    
    context.scale(camera.xScale, camera.yScale);
    
    drawGrid(10, 10);
    drawSquare();
    
    context.restore();
    
    requestAnimationFrame(drawFrame);
  }
  
  function drawSquare() {
    context.fillStyle = "black";
    context.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
    
    
    context.fillStyle = "white";
    context.font = "10pt Alegreya Sans SC";
    context.fillText("Scroll to zoom", canvas.width / 4 + 10, canvas.height / 2 - 20);
    context.fillText("Click to drag", canvas.width / 4 + 15, canvas.height / 2 + 30);
  }
  
  function drawGrid(gridWidth, gridHeight) {
    for(var x = 0; x <= canvas.width; x += canvas.width / gridWidth) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.closePath();
      context.stroke();
    }
    for(var y = 0; y <= canvas.height; y += canvas.height / gridHeight) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.closePath();
      context.stroke();
    }
  }
  var isDragging = false;
  var startX, startY;
  canvas.addEventListener("mousedown", function(event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
  });
  canvas.addEventListener("mouseup", function(event) {
    isDragging = false;
  });
  canvas.addEventListener("mouseout", function(event) {
    isDragging = false;
  });
  canvas.addEventListener("mousemove", function(event) {
    if(isDragging) {
      camera.x += (startX - event.clientX) / camera.xScale;
      camera.y += (startY - event.clientY) / camera.yScale;
      startX = event.clientX;
      startY = event.clientY;
      cameraXInput.value = +camera.x.toFixed(2);
      cameraYInput.value = +camera.y.toFixed(2);
    }
    return false;
  });
  canvas.addEventListener("mousewheel", function(event) {
    var diff = event.wheelDelta
    if(diff < 0) {
      camera.xScale -= camera.speed * camera.xScale;
      camera.yScale -= camera.speed * camera.yScale;
    }
    if(diff > 0) {
      camera.xScale += camera.speed * camera.xScale;
      camera.yScale += camera.speed * camera.yScale;
    }
    cameraXScaleInput.value = camera.xScale.toFixed(2);
    cameraYScaleInput.value = camera.yScale.toFixed(2);
    
    event.preventDefault();
    return false;
  });
  
  var variableForm = document.createElement("form");
  
  var cameraXInput = document.createElement("input");
  var cameraYInput = document.createElement("input");
  var cameraXScaleInput = document.createElement("input");
  var cameraYScaleInput = document.createElement("input");
  
  cameraXInput.type = "number";
  cameraYInput.type = "number";
  cameraXScaleInput.type = "number";
  cameraYScaleInput.type = "number";
  
  cameraXScaleInput.step = 0.1;
  cameraYScaleInput.step = 0.1;
  
  cameraXInput.value = camera.x;
  cameraYInput.value = camera.y;
  cameraXScaleInput.value = camera.xScale;
  cameraYScaleInput.value = camera.yScale;
  
  variableForm.appendChild(cameraXInput);
  variableForm.appendChild(cameraYInput);
  variableForm.appendChild(cameraXScaleInput);
  variableForm.appendChild(cameraYScaleInput);
  container.appendChild(variableForm);
  
  cameraXInput.addEventListener("input", function(event) {
    camera.x = cameraXInput.value
  });
  cameraYInput.addEventListener("input", function(event) {
    camera.y = cameraYInput.value
  });
  cameraXScaleInput.addEventListener("input", function(event) {
    camera.xScale = cameraXScaleInput.value
  });
  cameraYScaleInput.addEventListener("input", function(event) {
    camera.yScale = cameraYScaleInput.value
  });
  requestAnimationFrame(drawFrame);
}
