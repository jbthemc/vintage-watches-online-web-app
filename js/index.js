const API_URL = "http://localhost:8090";

window.Index = {

    addProductToCart: function (productId) {
        let body = {
            customerId: 44,
            productId: productId
        };

        $.ajax({
            url: API_URL + "/cart",
            method: "PUT",
            // MIME type
            contentType: "application/json",
            data: JSON.stringify(body)
        }).done(function () {
            window.location.replace("cart.html");
        });
    },

    getProducts: function () {
        $.ajax({
            url: API_URL + "/products",
            method: "GET"
        }).done(function (response) {
            console.log(response);
            Index.displayProducts(response.content)
        });
    },

    getProductHtml: function (product) {
        return `<div class="single-product">
                    <div class="product-f-image">
                        <img src=${product.imagePath} alt="">
                        <div class="product-hover">
                            <a href="#" class="add-to-cart-link"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                            <a href="single-product.html" class="view-details-link"><i class="fa fa-link"></i> See details</a>
                        </div>
                    </div>
                    
                    <h2><a href="single-product.html">${product.name}</a></h2>
                    
                    <div class="product-carousel-price">
                        <ins>${product.price}</ins> <del>$7000.00</del>
                    </div> 
                </div>`
    },

    displayProducts: function (products) {
        let productsHtml = "";

        products.forEach(product => productsHtml += Index.getProductHtml(product));

        // cssSelector
        $('#products-container').html(productsHtml);
    },

    bindEvents: function () {
        $('#products-container').delegate(
            '.add_to_cart_button', 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data('product_id');
                Index.addProductToCart(productId);
            });
    }
};

Index.getProducts();
Index.bindEvents();