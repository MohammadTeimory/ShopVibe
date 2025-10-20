import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formattCurrency } from "./utils/money.js";
import { findMatchingItem } from "./utils/findMatchingItem.js";
import { loadProductsFech, products } from "../data/products.js";
import { cart } from "../data/cart.js";
import { updateCartQunUi } from "./utils/cartQuanUi.js";

async function loadPage() {
  await loadProductsFech();
  renderOrdersPage();
  orderPageEvents();
  updateCartQunUi();
}

const mainContainer = document.querySelector(".js-orders-grid");
function renderOrdersPage() {
  mainContainer.innerHTML = orders
    .map((order) => {
      const orderTimeString = dayjs(order.orderTime).format("MMMM D");
      return `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formattCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${renderOrdersDetails(order)}
          </div>
        </div>
    `;
    })
    .join("");
}

function renderOrdersDetails(order) {
  return order.products
    .map((productDetails) => {
      const matchingItem = findMatchingItem(
        products,
        productDetails.productId,
        "id"
      );

      return `
        <div class="product-image-container">
            <img
            src="${matchingItem.image}"
            />
        </div>

        <div class="product-details">
            <div class="product-name">${matchingItem.name}</div>
            <div class="product-delivery-date">
                Arriving on:${dayjs(
                  productDetails.estimatedDeliveryTime
                ).format("MMMM D")}
            </div>
            <div class="product-quantity">Quantity: ${
              productDetails.quantity
            }</div>
            <button class="buy-again-button button-primary js-buy-again-button"
                data-product-id="${matchingItem.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message ">Buy it again</span>
            </button>
        </div>

        <div class="product-actions">
            <a 
                href="tracking.html?orderId=${order.id}&productId=${
                matchingItem.id
                }">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
            </a>
        </div>
`;
    })
    .join("");
}

function orderPageEvents() {
  mainContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".js-buy-again-button");
    if (button) {
      const productId = button.dataset.productId;
      cart.addToCart(productId, 1);
      updateCartQunUi();
      button.innerHTML = "Added";
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    }
  });
}

loadPage();

//الان باید دکمه ی پیگیری سفارش پویا کنم
