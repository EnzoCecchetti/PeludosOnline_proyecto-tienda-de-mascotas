const tiendaMascotas = [
    { categoria: "alimentos", nombre: "Regular Fit", mascota: "Gatos", marca: "Royal Canin", precio: 61900, cantidad: "7.5 kg", rutaImagen: "RoyalRegularFit.png" },
    { categoria: "alimentos", nombre: "Regular Sensible", mascota: "Gatos", marca: "Royal Canin", precio: 22932, cantidad: "1.5 kg", rutaImagen: "RoyalRegularSensible.png" },
    { categoria: "alimentos", nombre: "Care Urinary", mascota: "Gatos", marca: "Royal Canin", precio: 25390, cantidad: "1.5 kg", rutaImagen: "RoyalCareUrinary.png" },
    { categoria: "alimentos", nombre: "Mother & Baby Cat", mascota: "Gatos", marca: "Royal Canin", precio: 8790, cantidad: "0.4 kg", rutaImagen: "RoyalMotherAndBabyCat.png" },
    { categoria: "alimentos", nombre: "Kitten", mascota: "Gatos", marca: "Royal Canin", precio: 55350, cantidad: "7.5 kg", rutaImagen: "RoyalKitten.png" },
    { categoria: "alimentos", nombre: "Royal Canin Medium Adult", mascota: "Perros", marca: "Royal Canin", precio: 20000, cantidad: "1 kg", rutaImagen: "RoyalMediumAdult.png" },
    { categoria: "alimentos", nombre: "Royal Canin Mini Junior", mascota: "Perros", marca: "Royal Canin", precio: 25500, cantidad: "1 kg", rutaImagen: "RoyalMiniJunior.png" },
    { categoria: "alimentos", nombre: "Purina Pro Plan Medium Puppy", mascota: "Perros", marca: "Purina", precio: 52600, cantidad: "5 kg", rutaImagen: "PurinaProPlanMediumPuppy.png" },
    { categoria: "alimentos", nombre: "Purina Dog Chow Adulto", mascota: "Perros", marca: "Purina", precio: 65300, cantidad: "10 kg", rutaImagen: "PurinaDogChowAdulto.png" },
    { categoria: "alimentos", nombre: "Royal Canin Maxi Adult", mascota: "Perros", marca: "Royal Canin", precio: 95000, cantidad: "10 kg", rutaImagen: "RoyalCaninMaxiAdult.png" },
    { categoria: "juguete", nombre: "Pelota de goma", mascota: "Perros", marca: "", precio: 8000, cantidad: "", rutaImagen: "PelotaGomaPerros.png" },
    { categoria: "juguete", nombre: "Frisbee", mascota: "Perros", marca: "", precio: 12000, cantidad: "", rutaImagen: "FrisbeePerros.png" },
    { categoria: "juguete", nombre: "Hueso masticable", mascota: "Perros", marca: "", precio: 4500, cantidad: "", rutaImagen: "HuesoMasticable.png" },
    { categoria: "juguete", nombre: "Dispensador de golosinas", mascota: "Perros", marca: "", precio: 180000, cantidad: "", rutaImagen: "DispensadorAlimento.png" },
    { categoria: "juguete", nombre: "Cuerda para tirar y morder", mascota: "Perros", marca: "", precio: 8000, cantidad: "", rutaImagen: "CuerdaParaTirar.png" },
    { categoria: "juguete", nombre: "Caña de pescar con plumas", mascota: "Gatos", marca: "", precio: 8000, cantidad: "", rutaImagen: "CanaDePescarPlumas.png" },
    { categoria: "juguete", nombre: "Pelota de catnip", mascota: "Gatos", marca: "", precio: 6000, cantidad: "", rutaImagen: "PelotaCatnip.png" },
    { categoria: "juguete", nombre: "Túnel", mascota: "Gatos", marca: "", precio: 18000, cantidad: "", rutaImagen: "TunelParaGatos.png" },
    { categoria: "juguete", nombre: "Ratón de peluche", mascota: "Gatos", marca: "", precio: 5000, cantidad: "", rutaImagen: "RatonPeluche.png" },
    { categoria: "juguete", nombre: "Puntero laser", mascota: "Gatos", marca: "", precio: 10000, cantidad: "", rutaImagen: "PunteroLaser.png" }
]

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
    btnVaciar.addEventListener("click", vaciarCarrito)
    carritoContenido.appendChild(btnVaciar)

    const btnComprar = document.createElement("button")
    btnComprar.textContent = "COMPRAR"
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





