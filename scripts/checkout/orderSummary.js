import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { findMatchingItem } from "../utils/findMatchingItem.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formattCurrency } from "../utils/money.js";
import { updateCartQunUi } from "../utils/cartQuanUi.js";

const cartItemsContainer = document.querySelector(".js-order-summary");
export function renderOrderSummary() {
  cartItemsContainer.innerHTML = cart.cart
    .map((cartItem) => {
      const matchingItem = findMatchingItem(products, cartItem.productId, "id");
      return `
      <article class="cart-item-container js-cart-item-container"
      data-product-id="${cartItem.productId}">
          <div class="delivery-date">Delivery date: Tuesday, June 21</div>

          <div class="cart-item-details-grid">
            <div class="product-image-container">
              <img
                class="product-image"
                src="${matchingItem.image}"
              />
            </div>

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">$${matchingItem.getPrice()}</div>
              <div class="product-quantity">
                <span> Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span> </span>

                <span class="update-quantity-link link-primary js-update-btn"
                data-product-id="${cartItem.productId}">
                  Update
                </span>

                <span>
                  <input class="update-quantity-input js-update-quantity-input"
                  data-product-id="${cartItem.productId}"/>
                </span>

                <span class="save-quantity-link link-primary js-save-btn"
                data-product-id="${cartItem.productId}">
                  Save
                </span>

                <span class="delete-quantity-link link-primary js-delete-btn"
                data-product-id="${cartItem.productId}">
                  Delete
                </span>

              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
             
            ${renderDeliveryOptions(cartItem)}
            </div>
          </div>
        </article>
    `;
    })
    .join("");
}

function renderDeliveryOptions(cartItem) {
  return deliveryOptions
    .map((option) => {
      const today = dayjs();
      const deliveryDate = today
        .add(option.deliveryDays, "day")
        .format("dddd , MMMM D");

      const shippingPrice =
        option.priceCents === 0
          ? "FREE "
          : `$${formattCurrency(option.priceCents)}`;

      const isChecked = option.optionId === cartItem.deliveryId;

      return `
     <div class="delivery-option">
        <input
        ${isChecked ? "checked" : ""}
          type="radio"
          class="delivery-option-input"
          name="delivery-option-${cartItem.productId}"
        />
        <div>
          <div class="delivery-option-date">${deliveryDate}</div>
          <div class="delivery-option-price">${shippingPrice} - Shipping</div>
        </div>
      </div>
`;
    })
    .join("");
}

export function orderSummaryEvents() {
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-update-btn")) {
      const productId = e.target.dataset.productId;
      const inputElem = document.querySelector(
        `.js-update-quantity-input[data-product-id="${productId}"]`
      );

      cart.updateBtnHandler(productId);
      inputElem.focus();
      input.select();
    }

    if (e.target.classList.contains("js-save-btn")) {
      const productId = e.target.dataset.productId;
      const newQuan = +document.querySelector(
        `.js-update-quantity-input[data-product-id="${productId}"]`
      ).value;

      cart.saveBtnHandler(productId, newQuan);
      updateCartQunUi();
      renderOrderSummary();
    }

    if (e.target.classList.contains("js-delete-btn")) {
      const productId = e.target.dataset.productId;

      cart.removeFromCart(productId);
      renderOrderSummary();
      updateCartQunUi();
    }
  });
}
