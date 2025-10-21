import { orders } from "../data/orders.js";
import { loadProductsFech, products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { updateCartQunUi } from "./utils/cartQuanUi.js";

async function loadTrakingPage() {
  await loadProductsFech();
  updateCartQunUi();
  function renderTraking() {
    
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    const productId = url.searchParams.get("productId");

    const order = orders.find((order) => {
      return order.id === orderId;
    });

    const product = order.products.find((product) => {
      return product.productId === productId;
    });

    const matchingProduct = products.find((productItem) => {
      return productItem.id === productId;
    });

    const dateString = dayjs(product.estimatedDeliveryTime).format(
      "MMMM dddd D"
    );

    document.querySelector(".js-traking-detais").innerHTML = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${dateString}</div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">Quantity: ${product.quantity}</div>

        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
  }
  renderTraking();
}

loadTrakingPage();
