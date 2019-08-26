const API_URL = "http://localhost:8090";

window.Cart = {

    getCart: function () {
        //hardcode customer Id
        let customerId = 1;
        $.ajax({
            url: API_URL + "/shopping_cart/" + customerId,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            Cart.displayProducts(response.products);
            Cart.displayProducts2(response.products);
        });
    },

    getProductHtml: function (product) {
        return `<tr class="cart_item">
                                            <td class="product-remove">
                                                <a title="Remove this item" class="remove" href="#">×</a> 
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="${product.imagePath}"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="single-product.html">${product.name}</a> 
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">$${product.price}</span> 
                                            </td>

                                            <td class="product-quantity">
                                                <div class="quantity buttons_added">
                                                    <input type="button" class="minus" value="-">
                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
                                                    <input type="button" class="plus" value="+">
                                                </div>
                                            </td>

                                            <td class="product-subtotal">
                                                <span class="amount">$${product.price}</span> 
                                            </td>
                                        </tr>`
    },

    displayProducts: function (products) {
        let productsHtml = "";

        products.forEach(product => productsHtml += Cart.getProductHtml(product));

        // cssSelector
        $('.shop_table.cart tbody').html(productsHtml);
    },


    getProductHtml2: function (product) {
        return `<div class="thubmnail-recent">
                    <img src="${product.imagePath}" class="recent-thumb" alt="">
                    <h2><a href="single-product.html">${product.name}</a></h2>
                    <div class="product-sidebar-price">
                        <ins>$${product.price}</ins>
                    </div>                             
                </div>`
    },

    displayProducts2: function (products) {
        let productsHtml2 = "";

        products.forEach(product => productsHtml2 += Cart.getProductHtml2(product));

        // cssSelector
        $('#recent').html(productsHtml2);
    },

};
Cart.getCart();