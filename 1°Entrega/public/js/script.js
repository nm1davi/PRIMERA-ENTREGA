// En tu archivo script.js
const socket = io();


// Evento para agregar un producto
document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();

        const productTitle = document.getElementById('productTitle').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productCode = document.getElementById('productCode').value;
        const productDescription = document.getElementById('productDescrpition').value;
        const productCategory = document.getElementById('productCategory').value;
        const productStock = parseInt(document.getElementById('productStock').value);
        const productData = {
            title: productTitle,
            price: productPrice,
            code: productCode,
            description: productDescription,
            category: productCategory,
            stock: productStock,
            status: true,
            thumbail: "sin imagen",
        };
    socket.emit('addProduct', productData);
    window.alert("Producto Agregado con éxito ✔");
    document.getElementById('productTitle').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCode').value = '';
    document.getElementById('productDescrpition').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productStock').value = '';
});


// Evento para eliminar un producto
document.getElementById('deleteProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const productIdToDelete = parseInt(document.getElementById('productIdToDelete').value);
  socket.emit('deleteProduct', productIdToDelete);
  document.getElementById('productIdToDelete').value = '';
});

// Escucha el evento 'productDeleted' para eliminar el producto de la lista
socket.on('productDeleted', (deletedProductId) => {
  const productToDelete = document.querySelector(`[data-product-id="${deletedProductId}"]`);
  if (productToDelete) {
      productToDelete.remove(); // Elimina el elemento correspondiente al producto eliminado
      window.alert("Producto Eliminado con éxito ✔");
  }
});


socket.on('productAdded', (newProduct) => {
  // Obtener el contenedor de la lista de productos
  const productListContainer = document.getElementById('productList');

  // Crear un nuevo elemento para el producto
  const productItem = document.createElement('div');
  productItem.classList.add('product');
  productItem.innerHTML = `
      <h2>${newProduct.title}</h2>
      <p>Precio: $${newProduct.price}</p>
      <p>Id: ${newProduct.id}</p>
      <p>Código: ${newProduct.code}</p>
      <p>Descripción: ${newProduct.description}</p>
      <p>Categoría: ${newProduct.category}</p>
      <p>Stock: ${newProduct.stock}</p>
  `;

  // Agregar el nuevo elemento a la lista de productos en la interfaz
  productListContainer.appendChild(productItem);
});

