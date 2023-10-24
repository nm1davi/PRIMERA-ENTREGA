const { Router } = require('express');
const router = Router();
const fs = require('fs');
const productsData = fs.readFileSync('D:\\CODER\\BackEnd\\PRIMERA ENTREGA\\1°Entrega\\src\\productos.json', 'utf-8');
const products = JSON.parse(productsData);


const myMiddleware = (req, res, next) => {
  console.log("Se ha recibido una nueva solicitud de Products");
  next();
};

router.get('/products', myMiddleware ,async (req, res) => {
  const { limit } = req.query;
  try {
    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit) && parsedLimit >= 0) {
        const limitedProducts = products.slice(0, parsedLimit);
        const htmlResponse = `
        <html>
          <head>
            <title>Lista de Productos</title>
          </head>
          <body>
            <h1>Lista de Productos</h1>
            <ul>
              ${limitedProducts.map(product => `<li>${product.title} - Precio: $${product.price} - Id: ${product.id}</li> - Codigo: ${product.code} - Descripción: ${product.description} - Categoria: ${product.category} - Stock: ${product.stock}` ).join('')}
            </ul>
          </body>
        </html>
      `;
        return res.send(htmlResponse);
      }
    }
    const htmlResponse = `
    <html>
      <head>
        <title>Lista de Productos</title>
      </head>
      <body>
        <h1>Lista de Productos</h1>
        <ul>
          ${products.map(product => `<li>${product.title} - Precio: $${product.price} - Id: ${product.id}</li> - Codigo: ${product.code} - Descripción: ${product.description} - Categoria: ${product.category} - Stock: ${product.stock}`).join('')}
        </ul>
      </body>
    </html>
  `;
    return res.send(htmlResponse);
  } catch (error) {
    console.error('Error: ', error);
  }
});

router.get('/products/:productId', myMiddleware, async (req, res) => {
  const { productId } = req.params;
  try {
    // Busca el producto por ID
    const product = products.find((product) => product.id === parseInt(productId));
    
    if (product) {
      // Si se encontró el producto, devuelve solo ese producto
      const htmlResponse = `
      <html>
        <head>
          <title>Detalles del Producto</title>
        </head>
        <body>
          <h1>Detalles del Producto</h1>
          <ul>
            <li>Nombre: ${product.title}</li>
            <li>Precio: $${product.price}</li>
            <li>ID: ${product.id}</li>
            <li>Código: ${product.code}</li>
            <li>Stock: ${product.stock}</li>
            <li>Categoria: ${product.category}</li>
          </ul>
        </body>
      </html>
    `;
      return res.send(htmlResponse);
    } else {
      // Si no se encontró el producto, devuelve un mensaje de error
      const htmlResponseError = `
      <html>
        <head>
          <title>Detalles del Producto</title>
        </head>
        <body>
          <h1 style="color: red;">ERROR</h1>
          <p>Producto NO encontrado. Solicite un ID correcto</p>
        </body>
      </html>
    `;
      return res.send(htmlResponseError);
    }
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).send({ error: 'Producto no encontrado' });
  }
});

//Creamos un producto con Post
router.post('/products', myMiddleware, async (req, res) => {
  const { body } = req;
  const newProduct = {
    ...body,
    id: products.length + 1,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

//Modificamos un producto con Put
router.put('/products/:productId', myMiddleware, async (req, res) => {
  const { productId } = req.params;
  const { body } = req;

  try {
    const productIndex = products.findIndex((product) => product.id === parseInt(productId));
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id: parseInt(productId), 
    };
    products[productIndex] = updatedProduct;
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//Borramos un Producto con Delete
router.delete('/products/:productId', myMiddleware, async (req, res) => {
  const { productId } = req.params;

  try {
    const productIndex = products.findIndex((product) => product.id === parseInt(productId));

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});


module.exports = router;