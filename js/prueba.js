let nombre = "";
let precio = "";
let cuotas = "";

class Juegos {

    constructor (nombre, precio){
    
    this.nombre = nombre.toUpperCase();
    
    this.precio = parseFloat(precio);
    
    }
};

const juegos = [
    {nombre: "Mario Kart", precio: 2000},
    {nombre: "Fifa 2022", precio:3500}];

    for(const item of juegos) {
        console.log(item);
      };

function dividir (precio, cuotas){
  console.log(nombre);    
    if (nombre === "Fifa 2022"){
        parseInt(prompt("ingrese precio del juego"));
    } else if (nombre === "Mario Kart"){
        parseInt(prompt("ingrese precio del juego"));
    } else {
        parseInt(prompt("Juego no disponible"));
    }

    switch(cuotas){
        case 3: 
        return precio / cuotas;
        break;
        case 6: 
        return precio / cuotas * 0.20;
        break;
        case 12: 
        return precio / cuotas * 0.20;
        break;
        default: 
        return 0;
        break;
    }
}; 

nombre = prompt("ingrese nombre del juego");
dividir()
cuotas = parseInt(prompt("ingrese cantidad de cuotas 3, 6 o 12 (6 y 12 interes del 20 %"));


alert(` El valor de la cuota es: ${resultado} `);