const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: "/catalogData.json",
        goods: [],
        filtered: [],
        cart: [],
        searchLine: "",
        show: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then((result) => result.json())
                .catch((error) => {
                    console.log(error);
                });
        },

        addProduct(obj) {
            const cartIndex = this.cart.findIndex(
                (p) => p.id_product == obj.id_product
            );

            if (cartIndex > -1) {
                this.cart[cartIndex].quantity += 1;
            } else {
                obj.quantity = 1;
                this.cart.push(obj);
            }
        },

        cartSummary() {
            return this.cart.reduce((p, c) => p + c.price * c.quantity, 0);
        },

        removeProduct(obj) {
            const cartIndex = this.cart.findIndex(
                (p) => p.id_product == obj.id_product
            );
            console.log(this.cart, cartIndex);
            this.cart.splice(cartIndex, 1);
        },
    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`).then((data) => {
            for (let el of data) {
                this.goods.push(el);
            }
        });
    },

    computed: {
        filteredList: function () {
            return this.goods.filter((product) => {
                return product.product_name
                    .toLowerCase()
                    .includes(this.searchLine.toLowerCase());
            });
        },
    },
});