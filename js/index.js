class Articulo {
    constructor (codigo,rubro, nombre, descripcion, pack, precio, topeDescuento, descuento, imagen) {
        this.codigo= codigo;
        this.rubro= rubro;
        this.nombre= nombre;
        this.descripcion=descripcion;
        this.pack= pack;
        this.precio= precio;
        this.topeDescuento= topeDescuento;
        this.descuento= descuento;
        this.imagen= "./imgs/"+imagen;
    }

}

class Carrito {
    constructor (producto, cantidad=0) {
        this.producto= producto;
        this.cantidad= cantidad;
        this.precioCompra= 0
        this.total=0;
        this.comprar(0);
    }

    comprar(cantidadComprada){
        this.cantidad= this.cantidad+ cantidadComprada;
        this.precioCompra= this.producto.precio;
        if (this.cantidad*this.producto.pack>=this.producto.topeDescuento){
            this.precioCompra= this.producto.precio - this.producto.precio/100*this.producto.descuento;
        }
        this.total= this.cantidad* this.precioCompra;
    }
}


function crearTarjeta(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "botonComprar";
    botonAgregar.innerText = "Agregar";
  
    //Card body
    let tarjeta = document.createElement("article");
    tarjeta.className = "card col p-2";
    tarjeta.innerHTML = `
        <img src='${producto.imagen}'alt='' class='artImg'>
        <h4 class='artNombre'>${producto.nombre}</h4> <h6 class='artDescri'>${producto.descripcion}</h6>
        <p class='artPrecio'>Precio Pack x ${producto.pack}: \$${producto.precio}</p>
    `;

    tarjeta.append(botonAgregar);

    //Agregar evento al botonAgregar
    botonAgregar.onclick = () => {
         let lineaEnCarrito = pedido.find((elem) => elem.producto.codigo == producto.codigo);
    
        lineaEnCarrito ?  lineaEnCarrito.comprar(1) : pedido.push(new Carrito(producto, 1)) ;
        avisoCompra.innerHTML="";
        divAvisoCompra= document.createElement("div");
        divAvisoCompra.className="alert alert-info alert-dismissible ms-5 me-5";
        divAvisoCompra.innerHTML=`<p>Has agregado <Strong>${producto.nombre.trim()}</strong> a tu carrito.<p>
        <button type="button" class="btn-close position-absolute end-0 bottom-0" data-bs-dismiss="alert"></button>`;
        avisoCompra.appendChild(divAvisoCompra);
        guardarCarrito();
        mostrarCarrito();
    }

    return tarjeta
}

function guardarCarrito() {
    localStorage.clear();
    localStorage.setItem('pedido',JSON.stringify(pedido));

}


function mostrarCarrito() {
    containerCarrito.innerHTML = "";
    totalCompra= pedido.reduce( (acum,elemento)=> acum+ elemento.total,0);

    pedido.forEach(
        (elemento) => {
            let lineasCarrito= document.createElement("tr");
            //<td>${elemento.producto.codigo}</td>
            lineasCarrito.innerHTML = `
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.codigo}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 40px;"/></td>
                <td>${elemento.precioCompra}</td>
                <td>${elemento.total}</td>
                <td><button id="eliminar-producto-${elemento.producto.codigo}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
                
            `;

            containerCarrito.append(lineasCarrito);

            //Agregar evento a input de renglón en carrito
            let inputCantidadProducto = document.getElementById(`cantidad-producto-${elemento.producto.codigo}`);
            inputCantidadProducto.addEventListener('change', (ev) => {
                let vieCantidad= elemento.cantidad;
                let cantidadComprada= ev.target.value - vieCantidad;
                elemento.comprar(cantidadComprada);

                mostrarCarrito();
            });

            //Agregar evento a eliminar producto
            let botonEliminarProducto = document.getElementById(`eliminar-producto-${elemento.producto.codigo}`);
            botonEliminarProducto.addEventListener('click', () => {
                let indiceEliminar =  pedido.indexOf(elemento);
                pedido.splice(indiceEliminar,1);
                
                mostrarCarrito();
            });
            
        }
    );
    guardarCarrito();

    if(pedido.length == 0) {
        containerCarritoFooter.innerHTML = `<th scope="row" colspan="6">Carrito vacío - comience a comprar!</th>`;
    } else {
        containerCarritoFooter.innerHTML = `<th scope="row" colspan="6">Total de la compra: ${totalCompra}</th>`;
    }

}


function mostrarCarritoVie(){

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
    }else {
        // no tengo filtro..Copio la lista completa
        catalogo= lista.map((x)=> x);
    }
    largoCat= catalogo.length;
    ini=(pagina-1)*10;
    fin=ini + prodPorPagina -1;
 
    listaCatalogo.innerHTML ="";

    for (i=ini; i<fin+1 & i<largoCat;i++){
        // recorro lista de #ini a #fin ..
        let articleTarjeta= crearTarjeta(catalogo[i]);
        listaCatalogo.appendChild(articleTarjeta);
    }

    //Items paginas
    itemsPagina = document.createElement("div");
    itemsPagina.className = 'col-sm-2 text-center';
    itemsPagina.innerText = "de "+(ini+1)+" a "+(fin>largoCat?largoCat:fin+1);

    //botPagAnterior
    botAnterior = document.createElement("div");
    botAnterior.className = 'col-sm-2 text-center';
    botAnterior.innerText = "";
    
    //botPagSiguiente
    botSiguiente = document.createElement("div");
    botSiguiente.className = 'col-sm-2 text-center';
    botSiguiente.innerText = "";

    if (pagina>1){
        //Estoy en pagina distinta a la primera. Muestro botón para pagina anterior.
        botAnterior.innerText="Pagina Anterior";
    }
    if (largoCat>fin){
        // tengo mas productos. Muestro boton de pagina siguiente
        botSiguiente.innerText = "Pagina Siguiente";
    }

    divMargenes= document.createElement("div");
    divMargenes.className="col-sm-3";
    let catalogoFooter= document.createElement("article");
    catalogoFooter.className="row";
    catalogoFooter.appendChild(divMargenes);
    catalogoFooter.appendChild(botAnterior);
    catalogoFooter.appendChild(itemsPagina);
    catalogoFooter.appendChild(botSiguiente);
    catalogoFooter.appendChild(divMargenes);

}

function cambiarPagina(cambio){
    pagina=pagina+cambio;
    mostrarProductos();
}
function borrarItem(item){
/*     alert("borrando articulo "+pedido[item].nombre); */
    pedido.splice(item,1);
    guardarCarrito();
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

const listaCatalogo = document.getElementById('listaProductos');
const avisoCompra = document.getElementById("avisoCompra")
const containerCarrito = document.querySelector("#items");
const containerCarritoFooter = document.querySelector("#footer");

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
//document.getElementById("btnCarrito").addEventListener("click",()=>mostrarCarrito());
// defino variables para paginación
let filtro="";
let pagina=1;
let prodPorPagina= 10;

mostrarProductos(""); 

const pedlocal=JSON.parse(localStorage.getItem('pedido')) || [];

if (pedlocal.length!=0) {
    swal({
        title: "Continuamos la compra?",
        text: "Encontramos un carrito abandonado. ¿Quieres continuar con él?",
        icon: "warning",
        buttons: true,
      })
      .then((continuar) => {
        if (continuar) {
            pedlocal.forEach(ele => pedido.push(new Carrito(ele.producto, ele.cantidad)));
            avisoCompra.innerHTML="";
            divAvisoCompra= document.createElement("div");
            divAvisoCompra.className="alert alert-info alert-dismissible ms-5 me-5";
            divAvisoCompra.innerHTML=`<p>Perfecto! Ya tienes <Strong>${pedlocal.length}</strong> items en tu carrito.<p>
            <button type="button" class="btn-close position-absolute end-0 bottom-0" data-bs-dismiss="alert"></button>`;
            avisoCompra.appendChild(divAvisoCompra);
            mostrarCarrito();
        } else {
          localStorage.clear();
        }
      });
};



