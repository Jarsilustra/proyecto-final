// Diccionario de productos
const productos = {
  "p001": {
    nombre: "Torta Red Velvet",
    precio: 55000,
    imagen: "TODO LO DE MI PAGINA WEB/torta 3.jpg"
  },
  "p002": {
    nombre: "Torta de Chocolate",
    precio: 60000,
    imagen: "TODO LO DE MI PAGINA WEB/torta 10.jpg"
  },
  "p003": {
    nombre: "Torta de Naranja",
    precio: 60000,
    imagen: "TODO LO DE MI PAGINA WEB/torta 6.jpg"
  },
  "p004": {
    nombre: "Torta de Zanahoria",
    precio: 65000,
    imagen: "TODO LO DE MI PAGINA WEB/torta 9.jpg"
  }
};

// Obtener carrito desde localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Contar la cantidad de cada producto
function contarProductos(carrito) {
  const contador = {};
  carrito.forEach(id => {
    contador[id] = (contador[id] || 0) + 1;
  });
  return contador;
}

// Mostrar carrito en tabla
function mostrarCarrito() {
  const tbody = document.querySelector('#tabla-carrito tbody');
  if (!tbody) {
    console.error("No se encontró el tbody con id 'tabla-carrito'");
    return;
  }

  tbody.innerHTML = ''; // Limpiar tabla
  const carrito = obtenerCarrito();
  const contador = contarProductos(carrito);
  let totalFinal = 0;

  Object.keys(contador).forEach(id => {
    const cantidad = contador[id];
    const producto = productos[id];

    if (producto) {
      const total = producto.precio * cantidad;
      totalFinal += total;

      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td><img src="${producto.imagen}" alt="${producto.nombre}" width="80"></td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toLocaleString()}</td>
        <td>
          <button onclick="cambiarCantidad('${id}', -1)">–</button>
          ${cantidad}
          <button onclick="cambiarCantidad('${id}', 1)">+</button>
        </td>
        <td>$${total.toLocaleString()}</td>
        <td><button onclick="eliminarProducto('${id}')">Eliminar</button></td>
      `;
      tbody.appendChild(fila);
    }
  });

  document.getElementById('total-final').textContent = `Total a pagar: $${totalFinal.toLocaleString()}`;
}

// Cambiar cantidad de un producto
function cambiarCantidad(id, delta) {
  let carrito = obtenerCarrito();
  if (delta > 0) {
    carrito.push(id);
  } else {
    const index = carrito.indexOf(id);
    if (index !== -1) {
      carrito.splice(index, 1);
    }
  }

  if (carrito.includes(id)) {
    guardarCarrito(carrito);
  } else {
    eliminarProducto(id); // Si se queda en cero, eliminar
  }

  mostrarCarrito();
}

// Eliminar producto completamente
function eliminarProducto(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(pid => pid !== id);
  guardarCarrito(carrito);
  mostrarCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
  localStorage.removeItem('carrito');
  mostrarCarrito();
}

// Finalizar compra
function comprar() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("¡Compra realizada con éxito!");
  vaciarCarrito();
}

// Inicializar carrito al cargar la página
mostrarCarrito();
