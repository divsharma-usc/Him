
var type_arr = new Array("Paragliding","Riverrafing","Skiing","Skatting","Trecking");
var s_a = new Array();
s_a[0] = "";
s_a[1] = "birbilling|manali|dharamshala";
s_a[2] = "manali|rampur";
function populatelocation(typeElementId, locationElementId) {

    var selectedtypeIndex = document.getElementById(typeElementId).selectedIndex;

    var locationElement = document.getElementById(locationElementId);

    locationElement.length = 0; 
    locationElement.options[0] = new Option('Select location', '');
    locationElement.selectedIndex = 0;

    var location_arr = s_a[selectedtypeIndex].split("|");

    for (var i = 0; i < location_arr.length; i++) {
        locationElement.options[locationElement.length] = new Option(location_arr[i], location_arr[i]);
    }
}
function populatetype(typeElementId, locationElementId) {
    var typeElement = document.getElementById(typeElementId);
    typeElement.length = 0;
    typeElement.options[0] = new Option('Select Type', '-1');
    typeElement.selectedIndex = 0;
    for (var i = 0; i < type_arr.length; i++) {
        typeElement.options[typeElement.length] = new Option(type_arr[i], type_arr[i]);
    }

  

    if (locationElementId) {
        typeElement.onchange = function () {
            populatelocation(typeElementId, locationElementId);
        };
    }
}