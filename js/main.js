'use strict';

const goods = [
    { title: 'Shirt', price: 200 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title, price) => {
    return `<div class="goods-item">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="buy-btn">Купить</button>
    </div>`;

};
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);
