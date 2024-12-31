# dev
1. Clonar el repositorio
2. Usar React Vite con TypeScript
3. Una vez creado Laravel con Composer realizar las migraciones con php artisan migrate
4. Ejecutar npm run dev para la copilación del frontend.
5. Ejecutar php artisan serve para levantar el backend.

# Funcionamiento

1. ``Posee autenticación, hay que registrarse y luego loguearse.``
![1](https://imgur.com/z8E3UwO.png)

![2](https://imgur.com/W94dJ0w.png)

![3](https://imgur.com/3POd7SR.png)

2. ``Secciión de mesas.``

![4](https://imgur.com/noNOlwV.png)

A través del backend que envía al frontend, las mesas pueden desocuparse y volverse a ocupar a través de los clientes que están disponibles.
También se filtra aquellos clientes que tienen una mesa ya ocupada, y aquellos clientes que no cumplen la cantidad de sillas que poseen las mesas, al menos que la mesa sea editada.

![5](https://imgur.com/dZClsd1.png)

Formulario para poder crear la mesa

![6](https://imgur.com/CDoBZog.png)

3. ``Sección de Menú``

CRUD de la sección de Menú, que sirvé más adelante, en la relación con el Pedido/Plato del cliente.

![7](https://imgur.com/wbT62y9.png)

![8](https://imgur.com/G1u2VDp.png)

![9](https://imgur.com/kblqLRt.png)

4. ```Sección de Clientes```

![10](https://imgur.com/DTfGGkL.png)

![11](https://imgur.com/gaBVSct.png)

5. ```Sección de Pedidos```

En esta sección para poder seleccionar los Pedidos se aplica la relación en casi todo. Donde el cliente debe estar en una mesa, elegir a futuro un plato del Menú para luego poder pagarlo.

![12](https://imgur.com/hgvkf6h.png)

Para crear el Pedido se debe seleccionar el Cliente, y en caso de que el cliente no sea el mismo que la Mesa en la que se úbica el formulario dará error. Lo mismo que al seleccionar el Mozo.

![13](https://imgur.com/A92K5QB.png)

![14](https://imgur.com/OuoPv7A.png)

Para agregar el Plato del Menú se mapea los que estan disponibles, y se puede agregar la cantidad que se desee. Estos se van a multiplicar la cantidad por el valor de los platos, para sumar la totalidad. Para tener un segundo botón para confimar la elección.

![15](https://imgur.com/o7JfeW3.png)

![16](https://imgur.com/8NA8VDT.png)

6. ```Sección de Pagos en relación a Pedidos```

Una vez que un pedido está creado, y con el Menú agregado, se debe agregar con un formulario el monto del Pedido.

![17](https://imgur.com/x0qVaJJ.png)

Con el valor en su totalidad.

![18](https://imgur.com/dXpvKgN.png)

Y para el final de la sección, a través del backend sumo la cantidad de todos los Pedidos:

![19](https://imgur.com/5FWDuOT.png)


