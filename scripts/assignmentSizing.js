//Seth Duffy CS 290
//Javascript file focusing on

//Grabs the current windows height and width
var sWidth = window.screen.width;
var images = document.getElementsByTagName('img');
//changes pending
for(var i = 0; i < images.length; i++) {
    if(sWidth < 500){
        images[i].style.maxWidth = "95%";
        images[i].style.maxHeight = "auto";
        images[i].style.margin = ".5% 2.3% .5% 2.3%"; 
    }
    else if (sWidth <= 807) {
        images[i].style.maxWidth = "47%";
        images[i].style.maxHeight = "auto";
        images[i].style.margin = ".5% 1.3% .5% 1.3%"; 
    }
    else {
        images[i].style.maxWidth = "31%";
        images[i].style.maxHeight = "auto";
        images[i].style.margin = ".3% 1% .3% 1%"; 
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