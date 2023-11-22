import { Server } from 'socket.io';
import fs from 'fs';
let io;
// Lee la lista de productos desde el archivo JSON
const productsData = fs.readFileSync('./src/productos.json', 'utf-8');
let products = JSON.parse(productsData);

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on('connection', (socketClient) => {
    console.log(`Nuevo cliente socket conectado ${socketClient.id} 🎊`);

    // Emitir la lista de productos al cliente cuando se conecta
    socketClient.emit('productsList', products);

    // Escucha el evento 'addProduct' para agregar un producto
    socketClient.on('addProduct', (product) => {
      // Agregar el nuevo producto a la lista de productos
      product.id = products.length + 1;
      products.push(product);

      // Actualiza el archivo JSON con la lista actualizada de productos
      fs.writeFileSync('./src/productos.json', JSON.stringify(products, null, 2), 'utf-8');
      
      // Emitir un evento 'productsList' con la lista actualizada de productos
      io.emit('productAdded', product);
    });

    // Escucha el evento 'deleteProduct' para eliminar un producto
    socketClient.on('deleteProduct', (productId) => {
      // Encuentra el índice del producto a eliminar en la lista de productos
      const index = products.findIndex((product) => product.id === productId);

      // Si se encontró el producto, elimínalo
      if (index !== -1) {
        products.splice(index, 1);

        // Actualiza el archivo JSON con la lista actualizada de productos
        fs.writeFileSync('./src/productos.json', JSON.stringify(products, null, 2), 'utf-8');

        // Emitir un evento 'productsList' con la lista actualizada de productos
        io.emit('productDeleted', productId);
      }
    });

  });
};

export const newProductFromApi = (product) =>{
      // Agregar el nuevo producto a la lista de productos
      product.id = products.length + 1;
      products.push(product);

      // Actualiza el archivo JSON con la lista actualizada de productos
      fs.writeFileSync('./src/productos.json', JSON.stringify(products, null, 2), 'utf-8');
      
      // Emitir un evento 'productsList' con la lista actualizada de productos
      io.emit('productAdded', product);
}