'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
};

class GoodsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getJson()
            .then(data => {
                this.goods = data;
                this.render()
            });
    }
    async _getJson() {
        try {
            const result = await fetch(`${API_URL}/catalogData.json`);
            return await result.json();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new GoodItem(product);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
    }
}


class GoodItem {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
    }
    render() {
        return `<div class="goods-item" data-id="${this.id}">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
            </div>`
    }
}


class Cart extends GoodsList {
    constructor(container = '.cart', url = '/catalogData.json') {
        // this.total = 0;
        super(url);
        this._getJson()
            .then(data => {
                this.goods = data.contents;
                this.render()
            });
    }
    async _getJson() {
        try {
            const result = await fetch(`${API_URL}/catalogData.json`);
            return await result.json();
        } catch (error) {
            console.log(error);
        }
    }

    async _getTotal() {
        let totalText = document.querySelector('.cart-text');
        let total = 0;
        this.goods.forEach(good => total += good.price);
        totalText.textContent = `В корзине ${this.goods.length} товара на сумму ${total} $`
    }


    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new CartItem(product);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
        this._getTotal();
    }
}

class CartItem {
    constructor(product, quantity = 1) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <p class="quantity">${this.quantity} шт</p>
            </div>`
    }
}


document.querySelector('.cart-button').addEventListener('click', () => {
    let cartElemsClass = document.querySelector('.cart').classList.toggle('basket-hide');
})


let list = new GoodsList();
let cart = new Cart()