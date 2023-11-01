import express  from 'express';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/cart.router.js';
import indexRouter from './routers/index.router.js';
import realtimeProductsRouter from './routers/realtimeProductsRouter.js'
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js'

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../public')));

app.use('/', indexRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido ❌: ${error.message}`;
  console.error(message);
  res.status(500).json({message});
});
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/api/', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', realtimeProductsRouter);


export default app;

