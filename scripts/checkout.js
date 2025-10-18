import { loadProductsFech } from "../data/products.js";
import {
  renderOrderSummary,
  orderSummaryEvents,
} from "./checkout/orderSummary.js";
import {
  paymentSummaryEvents,
  renderPaymentSummary,
} from "./checkout/paymentSummary.js";
import { updateCartQunUi } from "./utils/cartQuanUi.js";

async function initCheckoutPage() {
  await loadProductsFech();
  renderOrderSummary();
  updateCartQunUi();
  orderSummaryEvents();
  renderPaymentSummary();
  paymentSummaryEvents();
}

initCheckoutPage();
