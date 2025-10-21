import { formattCurrency } from "../scripts/utils/money.js";

class Products {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productsDetails) {
    this.id = productsDetails.id;
    this.name = productsDetails.name;
    this.image = productsDetails.image;
    this.rating = productsDetails.rating;
    this.keywords = productsDetails.keywords;
    this.priceCents = productsDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return formattCurrency(this.priceCents);
  }

  extraInfo() {
    return "";
  }
}

class Clothing extends Products {
  sizeChartLink;
  constructor(productsDetails) {
    super(productsDetails);
    this.sizeChartLink = productsDetails.sizeChartLink;
  }

  extraInfo() {
    return `<a href="${this.sizeChartLink}" class="size-chart-link" target="_blank">size Chart</a>`;
  }
}

export let products = [];

export async function loadProductsFech() {
  const res = await fetch("https://supersimplebackend.dev/products");
  const productsData = await res.json();
  products = productsData.map((productData) => {
    if (productData.type === "clothing") {
      return new Clothing(productData);
    }
    return new Products(productData);
  });
  return products;
}
