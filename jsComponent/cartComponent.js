// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
            animateClass: null
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.delJson(`/api/cart/${find.id_product}`, item)
                    .then(data => {
                        if (data.result === 1) {
                            if (find.quantity > 1) {
                                find.quantity--
                            } else {
                                this.cartItems.splice(this.cartItems.indexOf(find), 1);
                            }
                        }
                    });
            }
        },
        openCart() {
            this.showCart = !this.showCart
            this.animateClass = "scale-in-hor-right"
        },
        closeCart() {
            this.animateClass = "slide-out-bottom";
            setTimeout(() => {
                this.showCart = !this.showCart
            }, 1000);
        },
        qtyInCart() {
            return this.cartItems.reduce((p, c) => {
                return p + c.quantity
            }, 0)
        },
        totalCost() {
            return this.cartItems.reduce((p, c) => {
                return p + c.quantity * c.price
            }, 0)
        }
    },

    template:
        `<div> 
    <a href="#" class="btn-cart" @click="openCart()">
        <i class="fa-regular fa-cart-shopping">
        </i>
        <span class="cart-value">{{ qtyInCart() }}</span>
      </a>
  
      <nav class="cart-items-wrapper" :class="animateClass" v-show="showCart">
        <i class="fa-light fa-xmark cart-items-close" @click="closeCart"></i>
        <h3>КОРЗИНА</h3>
        <div class="cart-items-content">
          <div class="cart-items">
            <cart-item 
              v-for="item of cartItems" 
              :key="item.id_product" 
              :cart-item="item" 
              @remove="remove(item)">
            </cart-item>
          </div>
          <div class="cart-summary">
            <span>Товаров на сумму:</span>
            <span>{{ totalCost() }}</span>
          </div>
        </div>
      </nav>
    </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template:
        `<div class="cart-item">
        <div class="cart-item-left">
          <div class="product-desc">
            <h4 class="product-title">{{ cartItem.product_name }}</h4>
            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
            <div class="product-single-price">$ {{ cartItem.price }} each</div>
          </div>
        </div>
        <div class="cart-item-right">
          <div class="product-price">$ {{cartItem.quantity*cartItem.price}}</div>
            <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
          </div>    
      </div>`
})