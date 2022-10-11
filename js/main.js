const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        userSearch: "",
        catalogUrl: "/catalogData.json",
        cartUrl: "/getBasket.json",
        cartItems: [],
        filtered: [],
        cart: [],
        products: [],
        cartTotal: 0,
        show: false,
        error: false,
        imgCatalog: 'https://via.placeholder.com/150x120',
    },

    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product =>
                regexp.test(product.product_name));
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.error = true;
                })
        },

        addProduct(product) {
            const find = this.cart
                .find(item => item.id_product == product.id_product);
            if (find) {
                find.quantity++
                this.cartTotal += find.price;
            } else {
                const good = Object.assign({ quantity: 1 }, product);
                this.cart.push(good);
                this.cartTotal += good.price;
            }
        },

        removeProduct(item) {
            if (item.quantity > 1) {
                item.quantity--;
                this.cartTotal -= item.price;
            } else {
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id_product == item.id_product) {
                        this.cartTotal -= this.cart[i].price;
                        this.cart.splice(i, 1)
                    }
                }
            }
        },

    },

    mounted() {
        this.getJson(`${API + this.cartUrl}`).then((data) => {
            for (let item of data.contents) {
                this.$data.cartItems.push(item);
            }
        });

        this.getJson(`${API + this.catalogUrl}`).then((data) => {
            for (let item of data) {
                this.$data.products.push(item);
                this.$data.filtered.push(item);
            }
        });
    },
});