console.log("Starting demo...");

function app() {
  console.log("Starting app...");

  var allProducts;
  var currentProduct;

  document.getElementById('yes-button').onclick = function () {
    // TODO: add current product to cart
    currentProduct = nextProduct(allProducts, currentProduct);
    displayProduct(currentProduct)
  };
  document.getElementById('no-button').onclick = function () {
    currentProduct = nextProduct(allProducts, currentProduct);
    displayProduct(currentProduct)
  };

  const shopClient = ShopifyBuy.buildClient({
    accessToken: '468e62e2b13f9682f088e1d73193a4e6',
    domain: 'lcfjsbuydemo.myshopify.com',
    appId: '6'
  });

  shopClient.fetchAllProducts()
  .then(function (products) {
    console.log("Products retrieved:");
    products.forEach(function (product) {
      console.log("Product: " + product.title);
    });

    allProducts = products;
    currentProduct = products[0];

    displayProduct(currentProduct);
  })
  .catch(function () {
    console.log('Request failed');
  });
}

function displayProduct (product) {
  var productTitleElement = document.getElementsByClassName("product-title-container")[0];
  productTitleElement.innerHTML = product.title;

  var productImageElement = document.getElementsByClassName('product-image')[0];
  productImageElement.src = ''; // This clears the image to make it clear to the user that the new product image is loading, otherwise the old one stays while it loads and looks laggy
  productImageElement.src = product.images[0].src;
}

function nextProduct (products, currentProduct) {
  var nextProductIndex = products.indexOf(currentProduct) + 1;
  if (nextProductIndex >= products.length) {
    nextProductIndex = 0;
  }
  return products[nextProductIndex];
}

window.onload = function () {
    var jsBuyScript = document.createElement("script");
    jsBuyScript.type = "text/javascript";
    jsBuyScript.onload = function () {
      jsBuyScript.onload = null // Clear onload
      app();
    }

    var head = document.getElementsByTagName("head")[0];
    head.appendChild(jsBuyScript);
    jsBuyScript.src = "http://sdks.shopifycdn.com/js-buy-sdk/v0/latest/shopify-buy.umd.polyfilled.min.js";
};
