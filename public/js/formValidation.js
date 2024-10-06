//SCRIPT 1: ADDRESS (Province and City) Script
// Crear el selector pasandole los elementos del dom.
var prov = document.getElementById('ps-prov');
var mun = document.getElementById('ps-mun');
new Pselect().create(prov, mun);

//Custom modification: add style{display:none} too all options not in Cataluña
const ProvinceOptions = document.querySelectorAll('#ps-prov option');   
// Mostrar solo los primeros 4
ProvinceOptions.forEach((province, index) => {
    if (index >= 4) {
    province.style.display = 'none'; //Hide all options not in cataluña
    }
});

//Get textContent from Province and City field (since value is a number)
const provinceCode = document.querySelector('#ps-prov').value;
const cityCode = document.querySelector('#ps-mun').value;

//Fill value of hidden inputs value for Province and City field
document.querySelector('#provinceName').value = provinceName;
document.querySelector('#cityName').value = cityName;

