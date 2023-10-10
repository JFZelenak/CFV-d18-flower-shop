//current object formatter
const currencyFormater = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});

//select the products row and add items dynamically
let flowersRow = document.querySelector(".flowers");

for (let flower of flowers) {
  flowersRow.innerHTML += `
        <div class="card flower col my-4 myCard">
            <img class="card-img-top mt-2 px-3" src="${flower.image}" alt="${flower.name}">
            <div class="card-body px-3 py-0">
                <h5 class="card-title">${flower.name}</h5>
                <p class="card-text h3 text-end">${currencyFormater.format(
                  flower.price
                )}</p>
                <p class="card-text3 d-flex justify-content-end"><button class="btn w-75 flower-button"><i class="fs-4 bi bi-cart-plus"></i> Add to cart</button></p>
            </div>
        </div>
    `;
}

//product button selected
const addToCartBtn = document.querySelectorAll(".flower-button");

//add event to add to cart buttons
addToCartBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    addToCart(flowers[i]);
  });
});

//cart declared
const cart = [];

//adds product to cart
const addToCart = (flower) => {
  if (cart.find((val) => val.name == flower.name)) {
    // console.log(cart.find((val) => val.name == flower.name));
    flower.qtty++;
  } else {
    cart.push(flower);
  }
  console.table(cart);
  createRows();
  cartTotal();
};

//updates the cart total amount
const cartTotal = () => {
    let total = 0;
    for (let  item of cart) {
      total += item.price * item.qtty;
    }
    document.getElementById("price").innerHTML = currencyFormater.format(total);
   };

const createRows = () => {
    let result = "";
    for (let item of cart) {
        result += `
            <div class="cart-row row gx-0">
                <div class="cart-item col-6 col-sm-6 my-2 d-flex align-items-center justify-content-center">
                    <img class="cart-item-image" src="${item.image}" width="100" height="100" alt="${item.name}">
                    <div class="cart-item-title h5 ms-2">${item.name}</div>
                </div>
                <div class="cart-qtty-action col-2 d-flex justify-content-center align-items-center">
                    <div class="d-flex">
                        <i class="minus fs-5 bi bi-dash-circle-fill"></i>
                    </div>
                    <div class="text-center m-0 cart-quantity h4 w-25">${item.qtty}</div>
                    <div class="d-flex">
                        <i class="plus fs-5 bi bi-plus-circle-fill"></i>
                    </div>
                </div>
                <div class="col-1 d-flex justify-content-start align-items-center">
                    <i class="del fs-4 bi bi-trash3-fill text-danger"></i>
                </div>
                <div class="cart-price col-3 h5 my-auto text-end pe-5">${currencyFormater.format(item.price)}</div>
            </div>                    
        </div>
    `;
  }
  document.querySelector(".cart-items").innerHTML = result;
};
