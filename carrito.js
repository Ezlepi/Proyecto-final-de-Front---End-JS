document.addEventListener("DOMContentLoaded", () => {

    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        productoEnCarrito(carrito);

        let seccionProdutos = document.getElementById("contenedor-carrito")
        seccionProdutos.innerHTML = "";

        if (!carrito.length) {
            let mensajeCarrito = document.createElement("p");
            mensajeCarrito.classList.add("mensaje-carrito");
            mensajeCarrito.textContent = "No hay productos en el carrito";

            seccionProdutos.appendChild(mensajeCarrito);

        } else {
            carrito.forEach((element, index) => {
                
                let tarjetaProducto = document.createElement("article");
                tarjetaProducto.classList.add ("producto-carrito");

                let imagenProducto = document.createElement("img");
                imagenProducto.src = element.images[0];

                let tituloProducto = document.createElement("h3");
                tituloProducto.textContent = element.title;

                let precioProducto = document.createElement("p")
                precioProducto.textContent = `$${element.price}`;

                let btnEliminar = document.createElement("button");
                btnEliminar.classList.add ("btn-eliminar-carrito");
                btnEliminar.textContent = "Eliminar";

                btnEliminar.addEventListener ("click", () => {
                    eliminarProducto (index);
                })

                tarjetaProducto.appendChild(imagenProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(btnEliminar);

                seccionProdutos.appendChild(tarjetaProducto);
;
            });
                
            }
        };

    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let divAcciones = document.getElementById("acciones-carrito");
        divAcciones.innerHTML = "";

        if (carrito.length){
            let btnVaciar = document.createElement("button");
            btnVaciar.textContent = "Vaciar carrito";

            btnVaciar.addEventListener ("click", () => {
                vaciarCarrito ();
            });

            let btnFinalizar = document.createElement ("button");
            btnFinalizar.textContent = "Finalizar compra";
            
            btnFinalizar.addEventListener("click", () => {
                let confirmado = confirm("Estas seguro que desea finalizar la compra?");
                if (confirmado) {
                    alert ("Gracias por su compra");
                    localStorage.removeItem("carrito");
                    window.location.href = "/index.html";
                }

            });

            divAcciones.appendChild(btnVaciar);
            divAcciones.appendChild(btnFinalizar);
            
        }
        
    };


    const productoEnCarrito = (carrito) => {
        let contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    };

    const eliminarProducto = indice => {
         let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
         carrito.splice(indice, 1);

         localStorage.setItem ("carrito", JSON.stringify(carrito));
         alert ("Eliminado");
         renderizarProductos();
         
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        alert ("Vaciando carrito");
        renderizarProductos();
    };

    renderizarProductos();


});