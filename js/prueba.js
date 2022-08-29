let nombre = prompt("cual es tu nombre?")
let edad = parseInt(prompt("cual es tu edad?"))
let costo;
//costo segun la edad
function afiliado(edad) {
    if (edad < 21) {
        
       
    } else if (edad >= 21 && edad < 36) {
        costo = 6200
    } else if (edad >= 36 && edad < 60) {
        costo = 8000
    } else {
        costo = 10000
    }
    return costo;
}

let opción = parseInt(prompt("Ingresá el número de tu opción de afiliación: 1-Obligatoria 2-Voluntaria"))
alert(afiliado(edad))
function recargo() {
    if (opción === 1) {
        alert(`${nombre}, tu costo de afiliación es de ${costo}`)
        
    } else if (opción === 2) {
        alert(`${nombre}, tu costo de afiliación es de ${costo * 1.2}`)
        
    } else {
        alert(`${nombre}, por favor ingresa una opción valida`)
    }
}