function validarIngreso(mensaje) {
  let nuevaEntrada = prompt(mensaje);
  while (nuevaEntrada == "" || nuevaEntrada == null) {
    alert("☠️ Error! - no se ingresaron datos");
    nuevaEntrada = prompt(nombre);
  }
   return nuevaEntrada;
}

let nombre=validarIngreso("Bx - GAMES\n\nIngrese su nombre :");

alert('Bx - GAMES\n\n🎮 Bienvenido(a)  ' + nombre.toUpperCase());

let opcion=validarIngreso("Bx - GAMES\n\ningrese una opcion: \n1: Comprar juegos 🎮\n2: Salir");
alert(opcion);
    
    