const express = require('express');
const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/cart.router'); 

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} ✔`);
});
