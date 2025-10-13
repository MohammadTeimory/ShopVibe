import { findMatchingItem } from "../scripts/utils/findMatchingItem.js";

class Cart {
  cart;
  constructor() {
    this.cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryId: "2",
      },
    ];
  }

  addToCart(productId, quantity) {
    const matchingItem = findMatchingItem(this.cart, productId, "productId");

    matchingItem
      ? (matchingItem.quantity += quantity)
      : this.cart.push({
          productId: productId,
          quantity: quantity,
          deliveryId: "1",
        });
  }

  showAddedMessage(message) {
    message.classList.add("show-message");
    setTimeout(() => {
      message.classList.remove("show-message");
    }, 1500);
  }
}

export const cart = new Cart();
