import { findMatchingItem } from "../scripts/utils/findMatchingItem.js";

class Cart {
  cart;
  constructor() {
    this.cart = this.getFromLocal() || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }

  saveToLocal() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getFromLocal() {
    return JSON.parse(localStorage.getItem("cart"));
  }

  addToCart(productId, quantity) {
    const matchingItem = findMatchingItem(this.cart, productId, "productId");

    matchingItem
      ? (matchingItem.quantity += quantity)
      : this.cart.push({
          productId: productId,
          quantity: quantity,
          deliveryOptionId: "1",
        });
    this.saveToLocal();
  }

  showAddedMessage(message) {
    message.classList.add("show-message");
    setTimeout(() => {
      message.classList.remove("show-message");
    }, 1500);
  }

  getTotalQuantity() {
    return this.cart.reduce((acc, cartItem) => (acc += cartItem.quantity), 0);
  }

  updateBtnHandler(productId) {
    document
      .querySelector(`.js-cart-item-container[data-product-id="${productId}"]`)
      .classList.add("change-class");
  }

  saveBtnHandler(productId, newQuan) {
    document
      .querySelector(`.js-cart-item-container[data-product-id="${productId}"]`)
      .classList.remove("change-class");

    const matchingItem = findMatchingItem(this.cart, productId, "productId");

    if (matchingItem) {
      matchingItem.quantity = newQuan;
    }
    this.saveToLocal();
  }

  removeFromCart(productId) {
    const index = this.cart.findIndex(
      (cartItem) => cartItem.productId === productId
    );

    if (index !== -1) {
      this.cart.splice(index, 1);
    }

    this.saveToLocal();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = findMatchingItem(this.cart, productId, "productId");

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
    }
    this.saveToLocal();
  }
}

export const cart = new Cart();
