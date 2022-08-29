class Articulo {
    constructor (codigo,nombre, descripcion, pack, precio, topeDescuento, descuento, imagen) {
        this.codigo= codigo;
        this.nombre= nombre;
        this.descripcion=descripcion;
        this.pack= pack;
        this.precio= precio;
        this.topeDescuento= topeDescuento;
        this.descuento= descuento;
        this.imagen= "./imgs/"+imagen;
    }

    devolverPrecio (cantidad){
        precioCompra=this.precio*cantidad;
        cantidadItems= cantidad*this.pack;
        if (cantidadItems>=this.topeDescuento) {
            precioCompra= precioCompra - (precioCompra/100*descuento);
        }
        return precioCompra;

    }
}

function agregarCarrito (item){
    // agrego el item a la lista de Pedido por ahora..
    pedido.push(lista[item]);
    mostrarCarrito();
}

function mostrarCarrito(){
    pedidoHTML=""
    for (i=0; i<pedido.length;i++){
        // recorro el array pedido..  ..
        pedidoHTML= `${pedidoHTML}<article>${pedido[i].nombre}
        </article>`;
    }
    if (pedido.length>0){
        // tengo algo cargado. Muestro botón enviar pedido
        pedidoHTML= `${pedidoHTML}<article>
        <button class="botonEnviar" type="button" onClick="enviarPedido()">Enviar Pedido</button>
        </article>`
    }

    document.getElementById("cuerpo").innerHTML= pedidoHTML;

}

function leoDB() {

    // Creo la lista de Productos.. En un futuro se leerán  de una DB
    desc="Pulseras plásticas para eventos, a prueba de agua. Podes personalizarlas a tu gusto.";
    arti0= new Articulo(1045,"Pulseras para eventos",desc,100,1200,500,20,"pulseras.svg");
    desc="Promociona tu negocio o emprendimientos con llaveros cinta full color." ;  
    arti1= new Articulo(2254,"Llaveros cinta",desc,50,1500,200,10,"llaveros.svg");
    desc="Entradas para eventos a todo color.";
    arti2= new Articulo(1234,"Entradas para eventos",desc,1000,1600,3000,20,"entradas.svg");
    desc="Tazas para promoción. Forma y color a elección";
    arti3= new Articulo(654,"Tazas personalizadas",desc,2,3000,10,30,"tazas.svg");
    desc="Tazas para promoción. Forma y color a elección";
    arti4= new Articulo(3547,"Porros de Marihuana",desc,2,3000,10,30,"llaveros.svg");
    desc="Promociona tu negocio o emprendimientos con llaveros cinta full color." ;
    arti5= new Articulo(1234,"Folletos tamaño A5",desc,1000,3500,5000,25,"entradas.svg")

    lista.push(arti0, arti1, arti2, arti3,arti4,arti5);
}

function muestroProds(ini,fin){
// muestro los productos desde ini a Fin.
// Falta implementar paginación de muchos productos.

listaHTML=""
    for (i=ini; i<fin+1 & i<lista.length;i++){
        // recorro lista de #ini a #fin ..
        listaHTML= `${listaHTML}<article  class='card col p-2'>
         <img src='${lista[i].imagen}'alt='' class='artImg'>
        <h4 class='artNombre'>${lista[i].nombre}</h4> <h6 class='artDescri'>${lista[i].descripcion}</h6>
        <p class='artPrecio'>Precio Pack x ${lista[i].pack}: \$${lista[i].precio}</p>
        <p class='artDesc'>Mas de ${lista[i].topeDescuento} unid. ${lista[i].descuento}% Descuento</p>
        <button class="botonComprar" type="button" onClick="agregarCarrito(${i})">Agregar</button>
        </article>`;
    }

    document.getElementById("listaProductos").innerHTML= listaHTML;
}

// Defino array para lista de produtos a mostrar
const lista= [];
// Defino array para pedido.
const pedido=[];
leoDB();
muestroProds(0,9); 