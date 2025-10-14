import { loadProductsFech } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { updateCartQunUi } from "./utils/cartQuanUi.js";

async function initCheckoutPage() {
  await loadProductsFech();
  renderOrderSummary();
  updateCartQunUi()
}

initCheckoutPage()