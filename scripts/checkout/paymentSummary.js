import { cart } from "../../data/cart.js";
import { findMatchingItem } from "../utils/findMatchingItem.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formattCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productsPrice = 0;
  let shippingCost = 0;
  cart.cart.map((cartItem) => {
    const matchingItem = findMatchingItem(products, cartItem.productId, "id");
    const matchingdeliveryOption = findMatchingItem(
      deliveryOptions,
      cartItem.deliveryId,
      "deliveryId"
    );

    productsPrice += cartItem.quantity * matchingItem.priceCents;
    shippingCost += matchingdeliveryOption.priceCents;
  });
  const totalBeforTax = productsPrice + shippingCost;
  const tax = totalBeforTax * 0.1;
  const orderTotalPrice = totalBeforTax + tax;

  document.querySelector(".js-payment-summary").innerHTML = `
  <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
    <div>Items (${cart.getTotalQuantity()}):</div>
        <div class="payment-summary-money">
            ${formattCurrency(productsPrice)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formattCurrency(
          shippingCost
        )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formattCurrency(
          totalBeforTax
        )}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formattCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
        $${formattCurrency(orderTotalPrice)}
        </div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
        Place your order
    </button>
  `;
}

export function paymentSummaryEvents() {
  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", async () => {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart.cart,
        }),
      });

      const order = await response.json();
      console.log(order);
    });
}
