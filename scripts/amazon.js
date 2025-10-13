import { loadProductsFech } from "../data/products.js";
import { cart } from "../data/cart.js";

loadProductsFech().then((products) => {
  renderAmazonPage(products);
  amazonEvents();
});

function renderAmazonPage(products) {
  document.querySelector(".js-products-grid").innerHTML = products
    .map((product) => {
      return `
        <article class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-input-quantity"
            data-product-id="${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart"
          data-product-id="${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id="${product.id}">Add to Cart</button>
        </article>

    `;
    })
    .join("");
}

function amazonEvents() {
  document.querySelectorAll(".js-add-to-cart-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.productId;
      const inputElem = document.querySelector(
        `.js-input-quantity[data-product-id='${productId}']`
      );
      const quantity = +inputElem.value;
      const message = document.querySelector(
        `.js-added-to-cart[data-product-id="${productId}"]`
      );

      inputElem.value = 1;

      cart.addToCart(productId, quantity);
      cart.showAddedMessage(message);
      
    });
  });
}
