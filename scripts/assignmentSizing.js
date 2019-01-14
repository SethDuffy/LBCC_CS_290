//Seth Duffy CS 290
//Javascript file focusing on the assignment pages sizing

//Gets all img tags and stores them in an array
var images = document.getElementsByTagName('img');
//gets screen width
var sWidth = window.screen.width;

if(sWidth < 500){
    setSize(95, .5, 2.3, .5, 2.3);
}
else if (sWidth <= 807) {
    setSize(47, .5, 1.3, .5, 1.3);
}
else {
    setSize(31, .3, 1, .3, 1);
}
function setSize(maxWidthPercent, marginTop, marginLeft, marginBottom, marginRight){
    for(var i = 0; i < images.length; i++){
        images[i].style.maxWidth = (maxWidthPercent + "%");
        images[i].style.maxHeight = "auto";
        images[i].style.margin = (marginTop + "% " + marginLeft + "% " + marginBottom + "% " + marginRight + "%"); 
    }
}
/*function cssCreate(cssFileLocation) {
    var oldFile = document.getElementsByTagName("link").item(0);
    var newFile = document.createElement("link");
    
    newFile.setAttribute("rel", "stylesheet");
    newFile.setAttribute("type", "text/css");
    newFile.setAttribute("href", cssFileLocation);
    
    document.getElementsByTagName("head").item(0).replaceChild(newFile, oldFile);
}*/