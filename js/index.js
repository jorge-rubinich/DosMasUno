class Articulo {
    constructor (codigo,rubro, nombre, descripcion, pack, precio, topeDescuento, descuento, imagen) {
        this.codigo= codigo;
        this.rubro= rubro;
        this.nombre= nombre;
        this.descripcion=descripcion;
        this.pack= pack;
        this.precio= precio.toFixed(0);
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

class Carrito {
    constructor (codigo,nombre,pack,precio,topeDescuento,descuento) {
        this.codigo= codigo;
        this.nombre= nombre;
        this.precioBase= precio;
        this.pack= pack;
        this.precioUnit=0;
        this.total= 0;
        this.cantidad= 0;
        this.topeDescuento=topeDescuento;
        this.descuento= descuento;
    }

    comprar(cantidadComprada){
        this.cantidad= this.cantidad+ cantidadComprada;
        this.precioUnit= this.precioBase;
        if (this.cantidad*this.pack>=this.topeDescuento){
            this.precioUnit= this.precioBase - this.precioBase/100*this.descuento;
        }
        this.total= this.cantidad* this.precioUnit;
    }
}

function agregarCarrito (codSolicitado){
    let index=0;
    // localizo el codigo en lista[], necesito sus datos para copiar.
    let codEnLista = lista.find(item => item.codigo===codSolicitado);
    if (codEnLista===undefined){
        // si el codigo no esta en la lista-> Algo grave ocurrió.
        ALERT("Apa! Algo salió mal. Vuelva a intentarlo, por favor");
        // aca deberia loguear el error e informarlo .
    }else{
        // Tengo el codigo. Busco si ya lo tengo cargado en el carrito.
        let codEnPedido= pedido.find(item => item.codigo===codSolicitado);
        if (codEnPedido===undefined){
            // El find no fue exitoso. debo agregar el producto al carrito.
            pedido.push(new Carrito(codEnLista.codigo,codEnLista.nombre,codEnLista.pack,codEnLista.precio,
                codEnLista.topeDescuento,codEnLista.descuento));
            // como es un nuevo elemento, index es longitud -1
            index=pedido.length-1;
        } else {
            // Lo encontre. Uso codEnPedido para encontrar la posicion en el array
            index=pedido.indexOf(codEnPedido);
        }
    }
    // aumento cantidad en (por ahora 1)
    pedido[index].comprar(1);
    mostrarCarrito();
}

function mostrarCarrito(){

    totalCompra= pedido.reduce( (acum,elemento)=> acum+ elemento.total,0);
    pedidoHTML=`<article id="tituloPedido" class="row">
    <div class="col-sm-1 itemCodigo">Código</div>
    <div class="col-sm-1 itemCantidad  text-end">Cant</div>
    <div class="col-sm-5 itemNombre">Producto Pedido</div>
    <div class="col-sm-2 itemPrecio  text-end">Precio </div>
    <div class="col-sm-2 itemPrecio  text-end">Final</div>
    <div class="col-sm-1 itemBorrar"></div>
    
    </article>`;
    for (i=0; i<pedido.length;i++){
        // recorro el array pedido..  ..
        pedidoHTML= `${pedidoHTML}<article class="row itemPedido">
            <div class="col-sm-1 itemCodigo">${pedido[i].codigo}</div>
            <div class="col-sm-1 itemCantidad text-end">${pedido[i].cantidad}</div>
            <div class="col-sm-5 itemNombre">${pedido[i].nombre}</div>
            <div class="col-sm-2 text-end">${pedido[i].precioUnit}</div>
            <div class="col-sm-2 text-end">${pedido[i].total}</div>    

            <div class="col-sm-1 itemBorrar"><button type="button" class="btnEliminar" onClick="borrarItem(${i})"><img src="./imgs/papelera.png"></button>
            
        </article>`

/*         <article>
        </article>`;
 */    }
    if (pedido.length>0){
        // tengo algo cargado. Muestro botón enviar pedido y total
        pedidoHTML= `${pedidoHTML}
        <article class="row">
        <div class="col-sm-9 text-center"><button class="botonEnviar" type="button" onClick="enviarPedido()">Enviar Pedido</button></div>
        <div class="col-sm-2 text-end border">$${totalCompra}</div>
        </article>`
    }

    document.getElementById("cuerpo").innerHTML= pedidoHTML;

}

function leoDB(tipo,codInicial,aumento) {

    // Creo la lista de Productos.. En un futuro se leerán  de una DB
 
    lista.push(new Articulo(codInicial, tipo, "Pulseras para eventos "+tipo,
        "Pulseras plásticas para eventos, a prueba de agua. Podes personalizarlas a tu gusto.",
        100,1200*aumento,500,20,"pulseras.svg"));
    lista.push(new Articulo(codInicial+1,tipo, "Llaveros cinta "+tipo,
    "Promociona tu negocio o emprendimientos con llaveros cinta full color.",
        50,1500*aumento,200,10,"llaveros.svg"));
    lista.push(new Articulo(codInicial+2,tipo, "Entradas para eventos "+tipo,
        "Entradas para eventos a todo color.",
        1000,1600*aumento,3000,20,"entradas.svg"));
    lista.push(new Articulo(codInicial+3,tipo, "Tazas personalizadas "+tipo,
        "Tazas para promoción. Forma y color a elección",
        2,3000*aumento,10,30,"tazas.svg"));
    lista.push(new Articulo(codInicial+4,tipo, "Tarjetas Personales "+tipo,
        "Pack de 120 tarjetas personales a precio IN-CRE-I-BLE!",
        120,450*aumento,1000,30,"tarjetas.svg"));
    lista.push(new Articulo(codInicial+5,tipo, "Folletos tamaño A5 "+tipo,
        "Promociona tu negocio o emprendimientos con llaveros cinta full color.",
        1000,3500*aumento,5000,25,"entradas.svg"));

}

function mostrarProductos(filtro=""){
    // muestro los productos desde ini a Fin.
    // Falta implementar paginación de muchos productos.
 
    if (!filtro.length==0){
       // tengo un filtro.. lo aplico
        catalogo=lista.filter(item=>item.rubro==filtro);
        console.log(catalogo);
    }else {
        // no tengo filtro..Copio la lista completa
        catalogo= lista.map((x)=> x);
    }
    largoCat= catalogo.length;
    ini=(pagina-1)*10;
    fin=ini + prodPorPagina -1;
     listaHTML=""
    for (i=ini; i<fin+1 & i<largoCat;i++){
        // recorro lista de #ini a #fin ..
        listaHTML= `${listaHTML}<article  class='card col p-2'>
         <img src='${catalogo[i].imagen}'alt='' class='artImg'>
        <h4 class='artNombre'>${catalogo[i].nombre}</h4> <h6 class='artDescri'>${catalogo[i].descripcion}</h6>
        <p class='artPrecio'>Precio Pack x ${catalogo[i].pack}: \$${catalogo[i].precio}</p>
        <p class='artDesc'>Mas de ${catalogo[i].topeDescuento} unid. ${catalogo[i].descuento}% Descuento</p>
        <button class="botonComprar" type="button" onClick="agregarCarrito(${catalogo[i].codigo})">Agregar</button>
        </article>`;
    }
        itemsPagina= "de "+(ini+1)+" a "+(fin>largoCat?largoCat:fin+1);
        botPagAnterior="";
        botPagSiguiente="";
        if (pagina>1){
            //Estoy en pagina distinta a la primera. Muestro botón para pagina anterior.
            botPagAnterior="<button class='botonPagAnterior' type='button' onClick='cambiarPagina(-1)'>Pagina Anterior</button>"
        }
        if (largoCat>fin){
            // tengo mas productos. Muestro boton de pagina siguiente
            botPagSiguiente="<button class='botonPagSiguiente' type='button' onClick='cambiarPagina(1)'>Pagina Siguiente</button>"

        }

        listaHTML= `${listaHTML}<article class='row'>
        <div class='col-sm-3'></div>
        <div class='col-sm-2 text-center'>${botPagAnterior}</div>
        <div class='col-sm-2 text-center'>${itemsPagina}</div>
        <div class='col-sm-2 text-center'>${botPagSiguiente}</div>
        <div class='col-sm-3'></div>   `; 

    document.getElementById("listaProductos").innerHTML= listaHTML;
    //alert("pausa para comprobar que SI filtra");
}

function cambiarPagina(cambio){
    pagina=pagina+cambio;
    mostrarProductos();
}
function borrarItem(item){
/*     alert("borrando articulo "+pedido[item].nombre); */
    pedido.splice(item,1);
    mostrarCarrito();
}

function filtrar(rubro){
    let filtro="";
    if (rubro==="Todos"){
        filtro="";
    }else {
        filtro=rubro;
    }
    mostrarProductos(filtro);
}

// Defino array para lista de productos a mostrar
const lista= [];
// defino array para subconjunto de lista a mostrar (si aplico filtros)
let catalogo=[];
// Defino array para pedido.
const pedido=[];

// truco para generar muchos articulos y poder implementar paginacion 
leoDB("Std",1,1);
leoDB("Vip",10,1.10);
leoDB("Premium",20,1.25);
leoDB("Gold",30,1.4);


// Defino eventos para botones de barra superior.
document.getElementById("btnFiltroStd").addEventListener("click",()=>filtrar("Std"));
document.getElementById("btnFiltroVip").addEventListener("click",()=>filtrar("Vip"));
document.getElementById("btnFiltroPrm").addEventListener("click",()=>filtrar("Premium"));
document.getElementById("btnFiltroGld").addEventListener("click",()=>filtrar("Gold"));
document.getElementById("btnFiltroAll").addEventListener("click",()=>filtrar("Todos"));

// defino variables para paginación
let filtro="";
let pagina=1;
let prodPorPagina= 10;

mostrarProductos(""); 