'use strict';

class GoodsItem {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div class="goods-item">
        <img src="${this.img}">
      <h3>${this.title}</h3>
      <p>${this.price}</p>
      <button class="buy-btn">Купить</button>
      </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, img: "img/Shirt.jpg" },
            { title: 'Socks', price: 50, img: "img/Socks.jpg" },
            { title: 'Jacket', price: 350, img: "img/Jacket.jpg" },
            { title: 'Shoes', price: 250, img: "img/Shoes.jpg" },
        ];
    }

    render() {
        let listHtml = "";
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.img);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getSummPrice() {
        let totalPrice = 0;
        this.goods.forEach(good => totalPrice += Number(good.price));
        return totalPrice.innerText = `Итого  ${sum} рублей`;;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();

//Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. 
// Продумайте, какие методы понадобятся для работы с этими сущностями

class Cart {
    constructor() {
        this.goods = [];
    }
    //метод добавления товара в корзину
    CartItem(cartItem) {
        this.goods.push(cartItem);
    }

    //Метод для вывода итоговой суммы корзины
    getSummPrice() {
        let totalPrice = 0;
        this.goods.forEach(good => totalPrice += Number(good.price));
        return totalPrice.innerText = `Итого  ${sum} рублей`;;
    }

    deleteItem() {
        //удалить товар из корзины
        //рендер корзины для обновления данных
    }

    doOrder() {
        //оформить заказ
    }

    removeCart() {
        //очистить корзину
    }
}


class CartItem {
    constructor() {
    }

    plusCount() {
        //добавить количество товара в корзине
        //рендер корзины для обновления данных
    }

    minusCount() {
        //убавить количество товара в корзине
        //рендер корзины для обновления данных
    }

    goItem() {
        //перейти в карточку товара
    }
}
