let tiendaMascotas = []

function IniciarTarjetasDeProductos(productos) {
    let contenedorProductos = document.getElementById("catalogo")

    productos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.classList.add("tarjetaProducto")

        tarjetaProducto.innerHTML = `
            <h3>${producto.nombre} ${producto.cantidad} </h3>
            <img src="./imagenes/${producto.rutaImagen}" alt="${producto.nombre}" />
            <h4>Precio: $${producto.precio}</h4>
            <button>Agregar al carrito</button>
        `
        tarjetaProducto.querySelector("button").addEventListener("click", function () {
            agregarAlCarrito(producto, 1)
        })
        contenedorProductos.appendChild(tarjetaProducto)
    })
}

IniciarTarjetasDeProductos(tiendaMascotas)

document.addEventListener('DOMContentLoaded', function () {
    const botonBuscar = document.getElementById('botonBuscar')
    const inputBusqueda = document.getElementById('inputBusqueda')
    const filtrosAlimentos = document.querySelectorAll('#flush-collapseOne ul li')
    const filtrosJuguetes = document.querySelectorAll('#flush-collapseTwo ul li')

    botonBuscar.addEventListener('click', function () {
        const busqueda = inputBusqueda.value.trim().toLowerCase()
        if (busqueda === '') {
            mostrarResultados(tiendaMascotas)
        } else {
            buscarProducto(tiendaMascotas, busqueda)
        }
    })

    inputBusqueda.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const busqueda = inputBusqueda.value.trim().toLowerCase()
            if (busqueda === '') {
                mostrarResultados(tiendaMascotas)
            } else {
                buscarProducto(tiendaMascotas, busqueda)
            }
        }
    })

    filtrosAlimentos.forEach(filtro => {
        filtro.addEventListener('click', function () {
            const opcion = this.textContent.trim()
            switch (opcion) {
                case "Por kilogramos":
                    buscarProductos(tiendaMascotas, "alimentos", "kg")
                    break
                case "Por precio ascendente":
                    buscarProductos(tiendaMascotas, "alimentos", "asc")
                    break
                case "Precio descendente":
                    buscarProductos(tiendaMascotas, "alimentos", "desc")
                    break
            }
        })
    })

    filtrosJuguetes.forEach(filtro => {
        filtro.addEventListener('click', function () {
            const opcion = this.textContent.trim()
            switch (opcion) {
                case "Por precio ascendente":
                    buscarProductos(tiendaMascotas, "juguete", "asc")
                    break
                case "Por precio descendente":
                    buscarProductos(tiendaMascotas, "juguete", "desc")
                    break
                default:
                    buscarProductos(tiendaMascotas, "juguete", opcion)
                    break
            }
        })
    })
})

function buscarProducto(tiendaMascotas, busqueda) {
    if (!busqueda) return mostrarResultados(tiendaMascotas)
    const resultados = tiendaMascotas.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda)
    )
    mostrarResultados(resultados)
}

function buscarProductos(tiendaMascotas, categoria, tipo) {
    let resultados = tiendaMascotas.filter(producto =>
        producto.categoria === categoria
    )
    switch (tipo) {
        case "kg":
            resultados.sort((a, b) => parseFloat(a.cantidad) - parseFloat(b.cantidad))
            break
        case "asc":
            resultados.sort((a, b) => a.precio - b.precio)
            break
        case "desc":
            resultados.sort((a, b) => b.precio - a.precio)
            break
        default:
            resultados = resultados.filter(producto =>
                producto.mascota.toLowerCase() === tipo.toLowerCase()
            )
            break
    }
    mostrarResultados(resultados)
}


function mostrarResultados(resultados) {
    const catalogo = document.getElementById('catalogo')
    catalogo.innerHTML = ''

    if (!resultados.length) {
        catalogo.textContent = 'No se encontraron resultados.'
    } else {
        resultados.forEach(producto => {
            const tarjetaProducto = document.createElement('div')
            tarjetaProducto.classList.add('tarjetaProducto')

            tarjetaProducto.innerHTML = `
                <h3>${producto.nombre} ${producto.cantidad}</h3>
                <img src="./imagenes/${producto.rutaImagen}" alt="${producto.nombre}" />
                <h4>Precio: $${producto.precio}</h4>
                <button>Agregar al carrito</button>
            `
            tarjetaProducto.querySelector("button").addEventListener("click", function () {
                agregarAlCarrito(producto, 1)
            })
            catalogo.appendChild(tarjetaProducto)
        })
    }
}

let carrito = []

function agregarAlCarrito(producto, cantidad) {
    const index = carrito.findIndex(item => item.producto.nombre === producto.nombre)
    avisoProductoAgregado("Producto agregado", "bottom", "right", 1500)
    if (index !== -1) {
        carrito[index].cantidad += cantidad
    } else {
        carrito.push({ producto, cantidad })
    }
    actualizarCarrito()
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1)
    actualizarCarrito()
}

function vaciarCarrito() {
    carrito = []
    actualizarCarrito()
}

function comprar() {
    if (carrito.length === 0) {
        AlertaCarritoVacio("No posee productos agregados", "", "info", 2500)
        return 
    }
    AlertaCompra("Gracias por su compra", "", "info", 5000)
    vaciarCarrito()
}

function mostrarCarrito() {
    const carritoContenido = document.getElementById("carritoContenido")
    carritoContenido.innerHTML = ""
    let total = 0

    if (!carrito.length) {
        carritoContenido.textContent = 'El carrito está vacío'
    } else {
        carrito.forEach((item, index) => {
            const itemHTML = document.createElement("div")
            const subtotal = item.producto.precio * item.cantidad
            total += subtotal

            itemHTML.textContent = `${index + 1}. ${item.cantidad} x ${item.producto.nombre}: ${subtotal} pesos`
            carritoContenido.appendChild(itemHTML)


            const btnEliminar = document.createElement("button")
            btnEliminar.textContent = "Eliminar"
            btnEliminar.classList.add("btn-eliminar") 
            btnEliminar.addEventListener("click", () => {
                eliminarDelCarrito(index)
            })
            itemHTML.appendChild(btnEliminar)
        })
    }

    const totalHTML = document.createElement("div")
    totalHTML.textContent = `TOTAL: ${total} pesos`
    carritoContenido.appendChild(totalHTML)

    const btnVaciar = document.createElement("button")
    btnVaciar.textContent = "VACIAR CARRITO"
    btnVaciar.classList.add("btn-vaciar")
    btnVaciar.addEventListener("click", vaciarCarrito)
    carritoContenido.appendChild(btnVaciar)

    const btnComprar = document.createElement("button")
    btnComprar.textContent = "COMPRAR"
    btnComprar.classList.add("btn-comprar") 
    btnComprar.addEventListener("click", comprar)
    carritoContenido.appendChild(btnComprar)
}

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito")
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado)
        mostrarCarrito()
    }
}

cargarCarritoDesdeLocalStorage()

function avisoProductoAgregado(text, gravity, position, duration) {
    Toastify({
        text,
        gravity,
        position,
        duration, 
        close: true,
        className: "tostada",
        backgroundColor: "green",
        style: {
            fontSize: "large",
            background: "white"
        },
        }).showToast();
}

function AlertaCompra(title, text, icon, timer) {
    Swal.fire({
        title, 
        text,
        icon: "success",
        showConfirmButton: true,
        timer: timer
    })
}

function AlertaCarritoVacio(title, text, icon, timer) {
    Swal.fire({
        title, 
        text,
        icon: "error",
        showConfirmButton: false,
        timer: timer
    })
}

function PedirInfo() {
    fetch ("./data.json")
    .then (response => response.json())
    .then (productos => {
        tiendaMascotas = productos
        IniciarTarjetasDeProductos(tiendaMascotas)
    })
}

PedirInfo()