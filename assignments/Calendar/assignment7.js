
function addItem() {
    if(document.getElementById("textField").value != ""){
        const button = document.getElementById("todoButton");
        const ol = document.getElementsByTagName("ol");

        let words = document.getElementById("textField").value;
        document.getElementById("textField").value = "";
        const liNode = document.createElement("li");

        liNode.appendChild(document.createTextNode(words));

        ol[0].appendChild(liNode);
    }
}

function removeItem(){
    let num = document.getElementById("removeField").value;
    if(num != ""){
        const li = document.getElementsByTagName("li");
        li[parseInt(num)-1].parentNode.removeChild(li[parseInt(num)-1])
        document.getElementById("removeField").value = "";
    }
}

