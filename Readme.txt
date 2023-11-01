Profe corregi lo de la 1° Entrega que me dijiste. (cuando agregas un producto se agrega al json y en el carrito se agrega con la cantidad y si se repite el pedido se aumenta en cantidad y no se repite)
Ahora agregue una vista “home.handlebars” la cual contiene una lista de todos los productos agregados hasta el momento con un estilo para que se vea un poco mejor.
Ademas cree otras vistas como la del carrito y la de los productos no encontrados
Ademas cree mi server.js y mi utils.js
Además, cree una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint “/realtimeproducts” en mi views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.
Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.


