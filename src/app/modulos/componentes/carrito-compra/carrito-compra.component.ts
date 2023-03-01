import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent {

  // Lista de productos en el carrito
  cartItems: any[] = [
    {
      id: 1,
      name: 'Producto 1',
      image: 'https://via.placeholder.com/50x50',
      price: 10,
      quantity: 1
    },
    {
      id: 2,
      name: 'Producto 2',
      image: 'https://via.placeholder.com/50x50',
      price: 20,
      quantity: 2
    },
    {
      id: 3,
      name: 'Producto 2',
      image: 'https://via.placeholder.com/50x50',
      price: 35,
      quantity: 3
    },
    {
      id: 3,
      name: 'Producto 2',
      image: 'https://via.placeholder.com/50x50',
      price: 35,
      quantity: 3
    }
  ];

  constructor() { }

  // Para actualizar la cantidad de un producto al carrito
  actualizarProducto(item: any) {
    const index = this.cartItems.indexOf(item);
    this.cartItems[index].quantity = item.quantity;
  }

  // para eliminar productos del carrito
  eliminarProducto(item: any) {
    const index = this.cartItems.indexOf(item);
    this.cartItems.splice(index, 1);
  }

  // para obtener el total de la compra
  obtenerTotal() {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  }

}
