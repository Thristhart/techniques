// eeeeviiiilll hacks
// this works because the script is executed immediately upon being loaded by the browser
// and therefore, at time of execution, it is the most recently loaded script tag
var myScriptTag = document.scripts[document.scripts.length - 1];
var container = myScriptTag.parentElement;
container.className = "demo"

demo(container);
