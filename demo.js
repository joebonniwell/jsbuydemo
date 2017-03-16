console.log("Starting demo...");

function app() {
  console.log("Starting app...");

  const shopClient = ShopifyBuy.buildClient({
    accessToken: '468e62e2b13f9682f088e1d73193a4e6',
    domain: 'lcfjsbuydemo.myshopify.com',
    appId: '6'
  });

  shopClient.fetchAllProducts()
  .then(function (products) {
    console.log("Products retrieved:");

    var container = document.getElementsByClassName("container")[0];
    products.forEach(function (product) {
      console.log("Product: " + product.title);
    });
  })
  .catch(function () {
    console.log('Request failed');
  });
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
