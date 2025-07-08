function agregarAlCarrito(productoId) {
      // Obtener carrito actual del localStorage
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      // Agregar ID al carrito
      carrito.push(productoId);

      // Guardar en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      console.log(localStorage)

      alert('Producto agregado al carrito');
    }