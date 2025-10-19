import { cart } from "../../data/cart.js";
import { findMatchingItem } from "../utils/findMatchingItem.js";
import { products } from "../../data/products.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { formattCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.cart.map((cartItem) => {
    const matchingItem = findMatchingItem(products, cartItem.productId, "id");

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    productPriceCents += cartItem.quantity * matchingItem.priceCents;
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  document.querySelector(".js-payment-summary").innerHTML = `
  <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
    <div>Items (${cart.getTotalQuantity()}):</div>
        <div class="payment-summary-money">
            ${formattCurrency(productPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formattCurrency(
          shippingPriceCents
        )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formattCurrency(
          totalBeforeTaxCents
        )}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formattCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
        $${formattCurrency(totalCents)}
        </div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
        Place your order
    </button>
  `;
}

export function paymentSummaryEvents() {
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("js-place-order-button")) {
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

      addOrder(order);

      window.location.href = "orders.html";
    }
  });
}
