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
        this.cantidad=0;
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
    // Busco si ya lo tengo.
    index= pedido.indexOf(lista[item])

    if (index===-1){
        // agrego un nuevo producto
        pedido.push(lista[item]);
        // pongo index en la posición del producto agregado
        index=pedido.length-1;
    }
    // aumento cantidad en 1
    pedido[index].cantidad= pedido[index].cantidad +1;
    mostrarCarrito();
}

function mostrarCarrito(){
    pedidoHTML=`<article id="tituloPedido" class="row">
    <div class="col-sm-1 itemCodigo">Código</div>
    <div class="col-sm-2 itemCantidad">Cant</div>
    <div class="col-sm-6 itemNombre">Producto Pedido</div>
    <div class="col-sm-2 itemPrecio">Precio Final</div>
    <div class="col-sm-1 itemBorrar"></div>
    
    </article>`;
    for (i=0; i<pedido.length;i++){
        // recorro el array pedido..  ..
        pedidoHTML= `${pedidoHTML}<article class="row itemPedido">
            <div class="col-sm-1 itemCodigo">${pedido[i].codigo}</div>
            <div class="col-sm-2 itemCantidad">${pedido[i].cantidad}</div>
            <div class="col-sm-6 itemNombre">${pedido[i].nombre}</div>
            <div class="col-sm-2 itemPrecio">${pedido[i].precio}</div>
            <div class="col-sm-1 itemBorrar"><button type="button" class="btnEliminar" onClick="borrarItem(${i})"><img src="./imgs/papelera.png"></button>
            
        </article>`

/*         <article>
        </article>`;
 */    }
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
    arti5= new Articulo(1238,"Folletos tamaño A5",desc,1000,3500,5000,25,"entradas.svg")

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

function borrarItem(item){
/*     alert("borrando articulo "+pedido[item].nombre); */
    pedido.splice(item,1);
    mostrarCarrito();
}

// Defino array para lista de produtos a mostrar
const lista= [];
// Defino array para pedido.
const pedido=[];
leoDB();
muestroProds(0,9); 