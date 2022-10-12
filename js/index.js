class Articulo {
    constructor (producto) {
        this.codigo= producto.codigo;
        this.rubro= producto.rubro;
        this.nombre= producto.nombre;
        this.descripcion= producto.descripcion;
        this.pack= producto.pack;
        this.precio= parseInt(producto.precio.toFixed(0));
        this.topeDescuento= producto.topeDescuento;
        this.descuento= producto.descuento;
        this.imagen= "./imgs/"+producto.imagen; 
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
        this.cantidad+= cantidadComprada;
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
        <p class='artDesc'>Más de ${producto.topeDescuento} unid. ${producto.descuento}% Descuento</p>
    `;

    tarjeta.append(botonAgregar);

    //Agregar evento al botonAgregar
    botonAgregar.onclick = () => {
         let lineaEnCarrito = pedido.find((elem) => elem.producto.codigo == producto.codigo);
    
        lineaEnCarrito ?  lineaEnCarrito.comprar(1) : pedido.push(new Carrito(producto, 1)) ;
        Toastify({text :`Has agregado ${producto.nombre} al pedido.`, duration:2000}).showToast();
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
    let detPedido="";
    let cuentaCarrito=0;
    containerCarrito.innerHTML = "";
    totalCompra= pedido.reduce( (acum,elemento)=> acum+ elemento.total,0);
    pedido.forEach(
        (elemento) => {
            cuentaCarrito+=1
            let lineasCarrito= document.createElement("tr");

            lineasCarrito.innerHTML = `
            <div class="itemCarrito">
                <div class="itemCarritoImg"><img src="${elemento.producto.imagen}"></div>
                <div class="itemCarritoDet">
                    <div class="itemCarritoDetNom"><p>${elemento.producto.nombre}</p></div>
                    <div class="itemCarritoCompra">
                        <div class="itemCompraDato itemCarritoCantidad"><input id="cantidad-producto-${elemento.producto.codigo}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 40px;"/>Pack x ${elemento.producto.pack} Un.</div>
                        <div class="itemCompraDato itemCarritoPrecio">$${elemento.precioCompra}</div>
                        <div class="itemCompraDato itemCarritoTotal">$${elemento.total}</div>
                        <div class="itemCompraDato"><button id="eliminar-producto-${elemento.producto.codigo}" type="button" class="btn btn-danger">
                            <i class="bi bi-trash-fill"></i></button></div>
                    </div>
                </div> 
            </div>`;    

            detPedido=detPedido+`
            ${elemento.cantidad} ${elemento.producto.nombre} (id ${elemento.producto.codigo}) x $${elemento.precioCompra} = $${elemento.total}`;
            containerCarrito.append(lineasCarrito);

            //Agregar evento para 'escuchar' el cambio de cantidad en carrito
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
                let prodEliminado= elemento.nombre;
                let indiceEliminar =  pedido.indexOf(elemento);
                pedido.splice(indiceEliminar,1);
                Toastify({text :`Has eliminado ${prodEliminado} del pedido.`, duration:2000}).showToast();
                mostrarCarrito();
            });
        }
    );
    pedidoDetalle.value=detPedido;
    contadorCarrito.innerHTML= cuentaCarrito==0? "" : `[${cuentaCarrito}]`;
    guardarCarrito();

    if(pedido.length == 0) {
        containerCarritoFooter.innerHTML = `<th scope="row" colspan="6">Tu carrito está vacío!</th>`;
    } else {
        containerCarritoFooter.innerHTML = `<th scope="row" colspan="6">Total de la compra: ${totalCompra}</th>`;
        // Agrego accion al boton 
        botonEnviarPedido.addEventListener("click",enviarPedido);    
    }
}

function vaciarCarrito() {
    pedido.length=0;
    localStorage.clear();
    mostrarCarrito();
    botonEnviarPedido.removeEventListener("click",enviarPedido);
    carritoOffcanvas.hide;
}

function enviarPedido(ev) {
    ev.preventDefault();
    if (pedido.length>0 && document.getElementById("pedidoEmail").value) {

        // tengo pedido y tengo mail.  aca envio el mail.. (algun dia!!)
        
        botonEnviarPedido.value = 'Enviando...';
        const serviceID = 'default_service';
        const templateID = 'template_5lll6eb';
         emailjs.sendForm(serviceID, templateID, formPedido)
            .then(() => {
                botonEnviarPedido.value = 'Enviar Pedido';
                vaciarCarrito();
                swal("Verfique su correo electrónico!", "Le hemos enviado un mail. Respóndalo y nos comunicaremos a la brevedad para iniciar su trabajo.", "success");
            }, (err) => {
                botonEnviarPedido.value = 'Enviar Pedido';
                Toastify({text :JSON.stringify(err), duration:3000}).showToast();
                });

    }else{
        let detalleError= (pedido.length==0)? "Tu carrito está vacío. Carga algún producto antes de enviar." : "Por favor, ingresa tus datos antes de enviar.";
        swal("Upps! Algo salio mal", detalleError, "error");
    }
}

function mostrarProductos(filtro=""){
    // muestro los productos desde ini a Fin.
    console.log(filtro.length);
    catalogo= (filtro.length==0)? lista.map((x)=> x) : lista.filter(item=>item.rubro==filtro)

    largoCat= catalogo.length;
    ini=(pagina-1)*10;
    fin=ini + prodPorPagina -1;
 
    listaCatalogo.innerHTML ="";

    for (i=ini; i<fin+1 & i<largoCat;i++){
        // recorro lista de #ini a #fin ..
        let articleTarjeta= crearTarjeta(catalogo[i]);
        listaCatalogo.appendChild(articleTarjeta);
    }
   
    let catalogoFooter= document.createElement("article");
    catalogoFooter.className="row";
    catalogoFooter.innerHTML= `
    <div class="col-sm-3"></div>
    <div class="btn btn-dark col-sm-2 text-center ${(pagina>1)? " " : "disabled"}" id="botonAnterior">pagina anterior</div>
    <div class="col-sm-2 text-center align-middle bg-secondary text-warning font-weight-bold">de ${ini+1} a ${fin>largoCat?largoCat:fin+1}</div>
    <div class="btn btn-dark col-sm-2 text-center ${(largoCat>fin)? " " : "disabled"}" id="botonSiguiente">pagina siguiente</div>
    <div class="col-sm-3"></div>`
    listaCatalogo.appendChild(catalogoFooter);

    document.getElementById("botonAnterior").addEventListener("click",()=>{cambiarPagina(-1)});
    document.getElementById("botonSiguiente").addEventListener("click",()=>{cambiarPagina(+1)});
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
    filtro= (rubro==="Todos") ? "" : rubro 

    mostrarProductos(filtro);
}

const lista= [];   // Defino array para lista de productos a mostrar
let catalogo=[];   // defino array para subconjunto de lista a mostrar (si aplico filtros)
const pedido=[];   // Defino array para pedido.

// elementos HTML
const listaCatalogo = document.getElementById('listaProductos');
const containerCarrito = document.querySelector("#items");
const containerCarritoFooter = document.querySelector("#footer");
const botonEnviarPedido= document.getElementById("btnEnviarPedido");
const carritoOffcanvas = document.getElementById('carritoOffcanvas');
const pedidoDetalle = document.getElementById('pedidoDetalle');
const formPedido=document.getElementById('formPedido');
const contadorCarrito=document.getElementById('contadorCarrito');
pedidoDetalle.value="";

// Defino eventos para botones de barra superior.
document.getElementById("btnPulseras").addEventListener("click",()=>filtrar("Pulseras"));
document.getElementById("btnLlaveros").addEventListener("click",()=>filtrar("Llaveros"));
document.getElementById("btnEntradas").addEventListener("click",()=>filtrar("Entradas"));
document.getElementById("btnPromo").addEventListener("click",()=>filtrar("Promoción")); 
document.getElementById("btnTodos").addEventListener("click",()=>filtrar("Todos"));
//document.getElementById("btnCarrito").addEventListener("click",()=>mostrarCarrito());

// Leo los productos desde productos.json y los cargo al array lista 

    fetch("./productos.json")
    .then(response =>response.json())
    .then(data => {
        data.forEach(producto => { 
            lista.push(new Articulo(producto));
        })
        mostrarProductos("");
    })
    .catch(error => {
    listaCatalogo.innerHTML ="<p>Diantres!!  Algo ha fallado... </p><p>"+error+"</p";
    })
//mostrarProductos(""); 

// defino variables para paginación
let filtro="";
let pagina=1;
let prodPorPagina= 10;

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
            Toastify({text :`Perfecto! Ya tienes ${pedlocal.length} items en tu carrito.`, duration:2000}).showToast();
            mostrarCarrito();
        } else {
          localStorage.clear();
        }
      });
};

