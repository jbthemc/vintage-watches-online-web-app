const API_URL = "http://localhost:8090";

window.Cart = {

    getCart: function () {
        let customerId = 12;

        $.ajax({
            url: API_URL + "/cart/" + customerId,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            Cart.displayProducts(response.products)
        });
    },

    getProductHtml: function (product) {
        return `<tr class="cart_item">
                                            <td class="product-remove">
                                                <a title="Remove this item" class="remove" href="#">×</a> 
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/product-thumb-2.jpg"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="single-product.html">${product.name}</a> 
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">£${product.price}</span> 
                                            </td>

                                            <td class="product-quantity">
                                                <div class="quantity buttons_added">
                                                    <input type="button" class="minus" value="-">
                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
                                                    <input type="button" class="plus" value="+">
                                                </div>
                                            </td>

                                            <td class="product-subtotal">
                                                <span class="amount">£${product.price}</span> 
                                            </td>
                                        </tr>`
    },

    displayProducts: function (products) {
        let productsHtml = "";

        products.forEach(product => productsHtml += Cart.getProductHtml(product));

        // cssSelector
        $('.shop_table.cart tbody').html(productsHtml);
    },

};

Cart.getCart();
