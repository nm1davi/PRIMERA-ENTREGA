import { Router } from 'express';
const router = Router();
import fs from "fs";
const productsData = fs.readFileSync('./src/productos.json', 'utf-8');
const products = JSON.parse(productsData);

router.get('/realtimeproducts', (req, res) => {
      const productsForTemplate = products.map(product => ({
            title: product.title,
            price: product.price,
            id: product.id,
            code: product.code,
            description: product.description,
            category: product.category,
            stock: product.stock,}));

      return res.render('realtimeproducts',{
            title: "Real-Time Products",
            products: productsForTemplate,
      })
});

export default router;