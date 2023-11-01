import { Router } from 'express';
import fs from "fs";

const router = Router();
const productsData = fs.readFileSync('./src/productos.json', 'utf-8');
const products = JSON.parse(productsData);
const carritosFilePath = './src/carrito.json';
const carritosData = fs.readFileSync(carritosFilePath, 'utf-8');

const myMiddleware = (req, res, next) => {
  console.log("Se ha recibido una nueva solicitud de Cart");
  next();
};


// Middleware para verificar si un carrito existe
function findCart(cartId) {
  const carts = JSON.parse(carritosData);
  return carts.find((cart) => cart.id === cartId);
}

router.post('/', myMiddleware, async (req, res) => {
  try {
    // Lee los datos actuales de carritos
    const carritosData = fs.readFileSync(carritosFilePath, 'utf-8');
    const carritos = JSON.parse(carritosData);

    // Crea un nuevo carrito
    const newCart = {
      id: Math.random().toString(36).substring(2), // Genera un ID aleatorio
      products: [],
    };

    // Agrega el nuevo carrito a la lista de carritos
    carritos.push(newCart);

    // Escribe los datos actualizados en el archivo JSON
    fs.writeFileSync(carritosFilePath, JSON.stringify(carritos, null, 2), 'utf-8');

    res.status(201).json({ message: 'Carrito creado con éxito', cart: newCart });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/:cid', myMiddleware, (req, res) => {
  const { cid } = req.params;
  const cart = findCart(cid);

  if (cart) {
    res.render('cart', {
      title: "Carrito",
      cartId: cart.id,
      products: cart.products,
    });
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});


// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', myMiddleware, async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    // Lee los datos actuales de carritos
    const carritosData = fs.readFileSync(carritosFilePath, 'utf-8');
    const carritos = JSON.parse(carritosData);

    // Encuentra el carrito correspondiente por ID
    const cart = carritos.find((cart) => cart.id === cid);

    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
    }

    // Busca el producto por su ID
    const product = products.find((p) => p.id === parseInt(pid));

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    // Verifica si el producto ya está en el carrito
    const existingCartItem = cart.products.find((item) => item.product === pid);

    if (existingCartItem) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      existingCartItem.quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agrégalo
      cart.products.push({ product: pid, quantity: quantity });
    }

    // Escribe los datos actualizados de carritos en el archivo JSON
    fs.writeFileSync(carritosFilePath, JSON.stringify(carritos, null, 2), 'utf-8');

    res.status(201).json({ message: 'Producto agregado al carrito con éxito', cart });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


export default router;
