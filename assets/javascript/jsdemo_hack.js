// This is necessary because of some screwed-up thing that jekyll and/or kramdown is doing to the html
// I can't have any attributes on tags (other than scripts, apparently? who knows why that works)
// so if I want to have this div tagged, I need to get clever
var divs = document.getElementsByTagName("div")
for(var i = 0; i < divs.length; i++) {
  if(divs[i].className == "") {
    if(divs[i].children.length == 1) { // 1 child element
      if(divs[i].children[0].tagName == "SCRIPT") { // and it's a script
        divs[i].className = "jsdemo";
      }
    }
  }
}
