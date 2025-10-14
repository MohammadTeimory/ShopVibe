import { cart } from "../../data/cart.js";

export function updateCartQunUi() {
  const totalQuan = cart.getTotalQuantity();

  const homeCartQuanElem = document.querySelector(".js-cart-quantity");
  if (homeCartQuanElem) {
    homeCartQuanElem.innerHTML = totalQuan;
  }

  const checkoutCartQuanElem = document.querySelector(
    ".js-checkout-cart-quantity"
  );
  if (checkoutCartQuanElem) {
    checkoutCartQuanElem.innerHTML = `${totalQuan} items`;
  }
}
