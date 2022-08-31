

function precio(){
    let precio ;
    do{
        precio = parseInt(prompt ("Elige el Procesador \n1 Ryzen 7 $45000 \n2 Ryzen 5 $40000 \n3 Core I7 $50000 \n4 Core I5 $45000"));
    }while (precio !== 1 && precio !== 2 && precio !== 3 && precio !==4){}
    switch(precio){
        case 1:
            alert("Ryzen 7 $45000");
            return 45000;
        case 2:
            alert("Ryzen 5 $40000");
            return 40000;
        case 3:
            alert("Core I7 $50000");
            return 50000;
        case 4: 
            alert(" Core I5 $43000");
            return 43000;
    }
    }
    function debito (precioProducto){
        return precioProducto - (precioProducto *0.05);       
    }
    
    function credito (precioProducto){
        return precioProducto + (precioProducto *0.10);       
    }
    
   alert("Gracias por visitar Neo Digital");
    let precioProducto = precio ()
    let cobro = parseInt(prompt("Como desea abonar? \n1 débito (5% de descuento) \n2 Crédito (10%recargo)"));
    if(cobro === 1){
        precioFinal=debito (precioProducto);
    }else{
        precioFinal=credito(precioProducto);
    }

   alert(`Importe a pagar ${precioFinal} Gracias por su compra)`) 
    
    
    
    
        
    
    