Hola Profe realizo la Primera Entrega
Tengo mi app y mis routers
para comenzar tenemos que correr el codigo 'npm run dev'
La primera router es products.router.js 
Donde tengo mis peticiones de get:
http://localhost:8080/api/products/ => donde entrega todos mis productos 🚀
http://localhost:8080/api/products/(numero de Id del producto) => donde me entrega el producto con ese Id 🚀
http://localhost:8080/api/products?=(numero) => donde me limita a la cantidad de productos que coloque en ese numero 🚀
Donde tengo mi petición post:
En POSTMAN coloque en la url : http://localhost:8080/api/products 🚀
luego coloco algo asi : 
{
    "title": "Taladro Skill",
    "description": "Taladro de 18mm",
    "price": 63000,
    "thumbnail": "Sin imagen",
    "code": "SK118MM",
    "stock": 12,
    "category":"Taladros"
}
y creo mi producto nuevo con un Id que se genera solo.

Donde tengo mi petición put:
En POSTMAN coloque en la url : http://localhost:8080/api/products/(Id del producto que quiero modificar) 🚀
luego coloco algo asi : 
{
    "title": "Maquina de Cortar el Pasto",
    "description": "Maquina 2HP",
    "price": 165000,
    "thumbnail": "Sin imagen",
    "code": "PR40",
    "stock": 6,
    "category": "Jardinería",
    "status": true
}
y modifique el producto con el Id seleccionado

Donde tengo mi petición delete:
En POSTMAN coloque en la url : http://localhost:8080/api/products/(Id del producto que quiero eliminar) 🚀
elimina el producto con el Id seleccionado y me muestra cual es el producto eliminado.

La segunda router es cart.router.js 
Donde tengo mis petición de post:
En POSTMAN coloque en la url : http://localhost:8080/api/carts/ 🚀
me queda ago asi:
{
    "message": "Carrito creado con éxito",
    "cart": {
        "id": "bntrktkikv7",
        "products": []
    }
}
En POSTMAN coloque en la url : http://localhost:8080/api/carts/(ID DEL CARRITO)/product/(ID DEL PRODUCTO) 🚀
coloco algo asi:
{
    "quantity": 6
}
y me queda algo asi:
{
    "message": "Producto agregado al carrito con éxito",
    "cart": {
        "id": "yjvufx1j31",
        "products": [
            {
                "product": "4",
                "quantity": 6
            }
        ]
    }
}
Donde tengo mis petición de get:
En POSTMAN coloque en la url :http://localhost:8080/api/carts/(ID DEL CARRITO) 🚀
Me trae el carrito con sus productos y su cantidades

La persistencia de la información se implemento utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.

El proyecto esta probado en POSTMAN y me funciono. 👌