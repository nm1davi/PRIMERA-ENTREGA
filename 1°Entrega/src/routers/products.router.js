import { Router } from 'express';
import fs from "fs";

const router = Router();
const productsData = fs.readFileSync('./src/productos.json', 'utf-8');
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
        const productsForTemplate = limitedProducts.map(product => ({
          title: product.title,
          price: product.price,
          id: product.id,
          code: product.code,
          description: product.description,
          category: product.category,
          stock: product.stock,
        }));

        return res.render('home', {
          title: 'Lista de Productos (Limitada)',
          products: productsForTemplate,
        });
      }
    }
    const productsForTemplate = products.map(product => ({
      title: product.title,
      price: product.price,
      id: product.id,
      code: product.code,
      description: product.description,
      category: product.category,
      stock: product.stock,
    }));
    
    return res.render('home', {
      title: 'Lista de Productos',
      products: productsForTemplate,
    });
    
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
      return res.render('productDetail', {
        title: 'Detalle del Producto',
        product,
      });
    } else {
      // Si no se encontró el producto, muestra una vista de error
      return res.render('productNotFound', {
        title: 'Producto No Encontrado',
      });
    }
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).send({ error: 'Producto no encontrado' });
  }
});

// Lee los datos del archivo JSON y devuelve un array de productos
function readProductsFromFile() {
  const productsData = fs.readFileSync('./src/productos.json', 'utf-8');
  return JSON.parse(productsData);
}

// Escribe los datos en el archivo JSON
function writeProductsToFile(products) {
  fs.writeFileSync('./src/productos.json', JSON.stringify(products, null, 2), 'utf-8');
}

//Creamos un producto con Post
router.post('/products', myMiddleware, async (req, res) => {
  const { body } = req;
  const products = readProductsFromFile();

  const newProduct = {
    ...body,
    id: products.length + 1,
  };
  products.push(newProduct);
  writeProductsToFile(products);

  res.status(201).json(newProduct);
});

//Modificamos un producto con Put
router.put('/products/:productId', myMiddleware, async (req, res) => {
  const { productId } = req.params;
  const { body } = req;

  const products = readProductsFromFile();

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
    writeProductsToFile(products);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//Borramos un Producto con Delete
router.delete('/products/:productId', myMiddleware, async (req, res) => {
  const { productId } = req.params;
  const products = readProductsFromFile();

  try {
    const productIndex = products.findIndex((product) => product.id === parseInt(productId));

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];
    writeProductsToFile(products);
    
    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});


export default router;