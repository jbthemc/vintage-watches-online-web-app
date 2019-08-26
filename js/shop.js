const API_URL = "http://localhost:8090";

window.Shop = {

    addProductToShoppingCart: function(productToBeAddedToChartId){
            //defining the customer (hardcoded) and product
            let body ={
                customerId: 5,
                productId: productToBeAddedToChartId
            };

            $.ajax({
                url: API_URL +"/shopping_cart",
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body),
            }).done(function(){
                //console.log('Product has been successfully added to chart.');
                window.location.replace("cart.html");
            })
    },

    getProducts: function () {
        $.ajax({
            url: API_URL + "/products",
            method: "GET"
        }).done(function (response) {
            console.log(response);
            Shop.displayProducts(response.content)
        });
    },

    getProductHtml: function (product) {
        return `<div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper" style="height: 250px; width: 300px;">
                            <img src=${product.imagePath} alt="">
                        </div>

                        <h2 style="width: 300px; height: 15px;"><a href="">${product.name}</a></h2>

                        <h2 style="width: 300px; height: 15px;"><a href="">Rating: ${product.productRate}</a></h2>
                        <p href=""style="height: 75px; width: 250px;">Description: ${product.productDescription}</p>
                        <div class="product-carousel-price">
                            <ins>Price: € ${product.price}</ins>
                        </div> 
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="${product.id}" rel="nofollow" href="/canvas/shop/?add-to-cart=70">Add watch to cart</a>
                        </div>                       
                    </div>
                </div>`
    },

    displayProducts: function (products) {
        let productsHtml = "";

        products.forEach(product => productsHtml += Shop.getProductHtml(product));

        // cssSelector
        $('#products-container').html(productsHtml);
    },

    bindEvents: function () {
        $('#products-container').delegate(
            '.add_to_cart_button', 'click', function (event) {
                event.preventDefault();
                let productId = $(this).data('product_id');
                Shop.addProductToShoppingCart(productId);
            }
        )
    }
};

Shop.getProducts();
Shop.bindEvents();