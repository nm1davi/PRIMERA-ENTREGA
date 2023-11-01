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
    window.alert("Producto Agregado con exito recargar página para ver el resultado ✔");
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
    window.alert("Producto Eliminado con exito, recargar página para ver resultado ✔");
    document.getElementById('deleteProductForm').value = '';
});

socket.on('productsList', (updatedProducts) => {
      // Actualizamos la lista de productos en la vista con los datos recibidos
    
      const productListContainer = document.getElementById('productList');
      while (productListContainer.firstChild) {
        productListContainer.removeChild(productListContainer.firstChild);
      }
    
      updatedProducts.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product');
        productItem.innerHTML = `
          <h2>${product.title}</h2>
          <p>Precio: $${product.price}</p>
          <p>Id: ${product.id}</p>
          <p>Código: ${product.code}</p>
          <p>Descripción: ${product.description}</p>
          <p>Categoría: ${product.category}</p>
          <p>Stock: ${product.stock}</p>
        `;
        productListContainer.appendChild(productItem);
      });
    });