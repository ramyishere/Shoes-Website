let aboutImageone = document.getElementById("image1")
let aboutImagetwo = document.getElementById("image2")
let aboutImagethree = document.getElementById("image3")
let aboutImagefour = document.getElementById("image4")
let aboutMainimage = document.getElementById("mainImage")


aboutImageone.addEventListener("click", () => {
    let aboutAttribute = aboutImageone.getAttribute("src")
    aboutMainimage.setAttribute("src", aboutAttribute)
})

aboutImagetwo.addEventListener("click", () => {
    let aboutAttribute = aboutImagetwo.getAttribute("src")
    aboutMainimage.setAttribute("src", aboutAttribute)
})



aboutImagethree.addEventListener("click", () => {
    let aboutAttribute = aboutImagethree.getAttribute("src")
    aboutMainimage.setAttribute("src", aboutAttribute)
})

aboutImagefour.addEventListener("click", () => {
    let aboutAttribute = aboutImagefour.getAttribute("src")
    aboutMainimage.setAttribute("src", aboutAttribute)
})

let iconCart = document.getElementById("cart");
let close = document.getElementById("cartCancel");
let cartContainer = document.getElementById("cartContainer");
let redCircle = document.getElementById("redCircle");
let cartItems = document.getElementById("cartItems");
let cartObject = {};

redCircle.innerText = 0;

iconCart.addEventListener("click", () => {
    cartContainer.classList.toggle("cartToggle");
});

close.addEventListener("click", () => {
    cartContainer.classList.toggle("cartToggle");
});

function updateTotalPrice() {
    let totalPrice = Object.values(cartObject).reduce((sum, item) => sum + item.totalPrice, 0);
    document.getElementById("totalPrice").innerText = `Total Price: ${totalPrice} $`;
}




let closeAlert = document.getElementById("closeAlert")
closeAlert.addEventListener("click", () => {
    let alertItem = document.getElementById("alertItem")
    alertItem.style.display = "none";
})

function addToCart(productName, productPrice, productImage) {
    if (!cartObject[productName]) {
        cartObject[productName] = {
            quantity: 0,
            totalPrice: 0,
            element: null
        };
    }

    cartObject[productName].quantity += 1;
    cartObject[productName].totalPrice += productPrice;
    redCircle.innerText = parseInt(redCircle.innerText) + 1;

    if (!cartObject[productName].element) {
        let cartItem = document.createElement("div");
        cartItem.className = "cartItem";

        let itemImage = document.createElement("img");
        itemImage.src = productImage;

        let cartContent = document.createElement("div");
        cartContent.className = "cartContent";

        let itemName = document.createElement("h1");
        itemName.innerText = productName;

        let itemPrice = document.createElement("h3");
        itemPrice.innerText = `${cartObject[productName].totalPrice} $`;

        let quantityButtonsContainer = document.createElement("div");
        quantityButtonsContainer.className = "quantityButtonsContainer";

        let decrease = document.createElement("button");
        decrease.innerText = "-";
        decrease.className = "quantityButton";

        let itemQuantity = document.createElement("h4");
        itemQuantity.innerText = cartObject[productName].quantity;

        let increase = document.createElement("button");
        increase.innerText = "+";
        increase.className = "quantityButton";

        let trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        trashButton.className = "trashButton";

        increase.addEventListener("click", () => {
            cartObject[productName].quantity += 1;
            cartObject[productName].totalPrice += productPrice;
            itemQuantity.innerText = cartObject[productName].quantity;
            itemPrice.innerText = `${cartObject[productName].totalPrice} $`;
            redCircle.innerText = parseInt(redCircle.innerText) + 1;
            updateTotalPrice();
        });

        decrease.addEventListener("click", () => {
            if (cartObject[productName].quantity > 1) {
                cartObject[productName].quantity -= 1;
                cartObject[productName].totalPrice -= productPrice;
                itemQuantity.innerText = cartObject[productName].quantity;
                itemPrice.innerText = `${cartObject[productName].totalPrice} $`;
                redCircle.innerText = parseInt(redCircle.innerText) - 1;
                updateTotalPrice();
            }
        });

        trashButton.addEventListener("click", () => {
            cartItems.removeChild(cartItem);
            redCircle.innerText = parseInt(redCircle.innerText) - cartObject[productName].quantity;
            delete cartObject[productName];
            updateTotalPrice();
        });

        quantityButtonsContainer.appendChild(decrease);
        quantityButtonsContainer.appendChild(itemQuantity);
        quantityButtonsContainer.appendChild(increase);

        cartContent.appendChild(itemName);
        cartContent.appendChild(itemPrice);

        cartItem.appendChild(itemImage);
        cartItem.appendChild(cartContent);
        cartItem.appendChild(quantityButtonsContainer);
        cartItem.appendChild(trashButton);
        cartItems.appendChild(cartItem);

        cartObject[productName].element = cartItem;
    } else {
        let existingItem = cartObject[productName].element;
        existingItem.querySelector("h3").innerText = `${cartObject[productName].totalPrice} $`;
        existingItem.querySelector("h4").innerText = cartObject[productName].quantity;
    }

    updateTotalPrice();
}
document.getElementById("checkout").addEventListener("click", () => {
    cartItems.innerHTML=``
    
    let alertItem = document.getElementById("alertItem")
    alertItem.style.display = "flex";
    let alertText = document.getElementById("alertText")
    updateTotalPrice()
    alertText.innerText = document.getElementById("totalPrice").innerText;
    document.getElementById("totalPrice").innerText = `Thanks for your Trust`;
});
let favouriteIconCircle = document.getElementById("favouriteIconCircle")
favouriteIconCircle.innerText = 0
let favouriteIcon = document.getElementById("favouriteIcon")
let favouriteContainer = document.getElementById("favouriteContainer")
let favouriteItems = document.getElementById("favouriteItems")

let favCancel = document.getElementById("favCancel")

favouriteIcon.addEventListener("click", () => {
    favouriteContainer.classList.toggle("favToggle");
});

favCancel.addEventListener("click", () => {
    favouriteContainer.style.display = "none";
})

const favObject = {}

function addToFavourite(productName, productPrice, productImage) {
    if (!favObject[productName]) {
        favouriteIconCircle.innerText++

        let favItem = document.createElement("div");
        favItem.className = "favItem";

        let itemImage = document.createElement("img");
        itemImage.src = productImage;


        let itemName = document.createElement("h1");
        itemName.innerText = productName;

        let itemPrice = document.createElement("h3");
        itemPrice.innerText = `${productPrice} $`;

        let itemContent = document.createElement("div")
        itemContent.appendChild(itemName)
        itemContent.appendChild(itemPrice)
        itemContent.className = "itemContent"

        let trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        trashButton.className = "trashButton";

        let addToCarticon = document.createElement("i")
        addToCarticon.innerHTML = `<i class="fa-solid fa-cart-shopping" style="color: #c72092;"></i>`;
        addToCarticon.addEventListener("click", () => addToCart(productName, productPrice, productImage));

        favItem.appendChild(itemImage);
        favItem.appendChild(itemContent);
        favItem.appendChild(addToCarticon)
        favItem.appendChild(trashButton);
        favouriteItems.appendChild(favItem);

        favObject[productName] = { productPrice, productImage };
        trashButton.addEventListener("click", () => {
            favouriteItems.removeChild(favItem);
            favouriteIconCircle.innerText--;
            delete favObject[productName];
        });

    }


}


let backToTopBtn = document.getElementById("backToTopBtn");


window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
};


backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
