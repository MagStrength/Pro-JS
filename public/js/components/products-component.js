Vue.component('ProductsComponent', {
    data() {
        return {
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<section class="products">
                  <single-product-component v-for="item of filtered" 
                  :key="item.id_product" 
                  :img="item.img"
                  :product="item"
                  @add-product="$parent.$refs.cart.addProduct"></single-product-component>
                 </section>`
});
Vue.component('SingleProductComponent', {
    props: ['product', 'img'],
    template:
        `<div class="product-item">
                <h3>{{product.product_name}}</h3>
                <img :src="product.img" />
                <span>{{product.price}}</span>
                <button class="product-item-btn" @click="$emit('add-product', product)">В корзину</button>
              </div>`

})