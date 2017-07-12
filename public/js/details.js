
var type_arr = new Array("Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6","Slot 7");
function populatetype(typeElementId,lastindex) {
	console.log(lastindex);
    var typeElement= document.getElementById(typeElementId);
    typeElement.length = 0;
    typeElement.options[0] = new Option('Select Type', '-1');
    typeElement.selectedIndex = 0;
    for (var i = 0; i <lastindex; i++) {
        typeElement.options[typeElement.length] = new Option(type_arr[i], type_arr[i]);
    }
}