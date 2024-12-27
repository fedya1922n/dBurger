// const user = {
//     name: 'Вася',
//     surname: 'Васильев',
//     get fullName(){
//         return `${this.name} ${this.surname}`
//     },
//     set fullName(val) {
//         let arr = val.split(' ')
//         console.log(arr);
//         this.name = arr[0];
//         this.surname = arr[1];
//     }
// }

// console.log(user);
// user.fullName = 'Петя Петров';
// console.log(user.fullName);


const products = {
    crazy: {
        name: 'Crazy', 
        img: 'images/products/burger-1.png',
        price: 31000,
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light', 
        img: 'images/products/burger-2.png',
        price: 26000,
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger', 
        img: 'images/products/burger-3.png',
        price: 29000,
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger', 
        img: 'images/products/burger-4.png',
        price: 24000,
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

// products.dburger.amount = 2
// console.log(products.dburger.totalSum);
const basketBtn = document.querySelector('.wrapper__navbar-btn');
const basketModal = document.querySelector('.wrapper__navbar-basket');

basketBtn.addEventListener('click', function () {  
    basketModal.classList.toggle('active')
})

const basketClose = document.querySelector('.wrapper__navbar-close');
basketClose.addEventListener('click', function () {  
    basketModal.classList.remove('active')
})

const productBtns = document.querySelectorAll('.wrapper__list-btn');
productBtns.forEach((elem)=>{
    elem.addEventListener('click', function () {  
        plus(elem)
    })
})

function plus(btn) {
    const parent = btn.closest('.wrapper__list-card')
    // setAttribute('id', 'value')
    // removeAttribute('id')
    // hasAttribute('id') // true / false
    const parentId = parent.getAttribute('id');
    products[parentId].amount++
    basket()
}

const basketChecklist = document.querySelector('.wrapper__navbar-checklist');
const totalCount = document.querySelector('.warapper__navbar-count');
const totalSum = document.querySelector('.wrapper__navbar-totalprice');
function basket() {
    const productsArr = [];
    let totalCountNum = 0;
    let totalSumNum = 0;
    for (const key in products) {
        const obj = products[key]
        const productCard = document.querySelector(`#${key}`);
        const cardCount = productCard.querySelector('.wrapper__list-count');
        cardCount.innerHTML = obj.amount;
        if (obj.amount > 0) {
            cardCount.classList.add('active');
            productsArr.push(obj);
            totalCountNum += obj.amount;
            totalSumNum += obj.totalSum;
        } else {
            cardCount.classList.remove('active')            
        }
    }
    totalCount.innerHTML = totalCountNum;
    totalSum.innerHTML = totalSumNum.toLocaleString();
    if (totalCountNum > 0) {
        totalCount.classList.add('active');
    } else {
        totalCount.classList.remove('active');        
    }
    basketChecklist.innerHTML = ''
    productsArr.forEach((elem)=>{
        basketChecklist.innerHTML += basketCard(elem)
    })
}
function basketCard(elem) {
    let {name, img, amount, totalSum} = elem;
    return `
    <div class="wrapper__navbar-product">
    <div class="wrapper__navbar-info">
        <img class="wrapper__navbar-productImage" src="${img}" alt="">
        <div class="wrapper__navbar-infoSub">
            <p class="wrapper__navbar-infoName">${name}</p>
            <p class="wrapper__navbar-infoPrice"><span>${totalSum.toLocaleString()}</span> сум</p>
        </div>
    </div>
    <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
        <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
        <output class="wrapper__navbar-count">${amount}</output>
        <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
    </div>
</div>
    `
}

// basketBtn.addEventListener("click", function (event){
//     console.log("basket");
// })
document.addEventListener("click", function (event) {
    const btn = event.target;
    if (btn.classList.contains("wrapper__navbar-symbol")){
        let attr = btn.getAttribute("data-symbol");
        let parent = btn.closest(".wrapper__navbar-option")
        let parentId = parent.getAttribute('id').split("_")[0]
        if (attr == "-") {
            products [parentId].amount-- 
        } else {
            products [parentId].amount++
        }
        basket()
    }
})
const printBody = document.querySelector(".print__body");
const printFooter = document.querySelector(".print__footer");
const printBtn = document.querySelector(".wrapper__navbar-bottom");
printBtn.addEventListener("click", function () {
    printBody.innerHtml = "";
    let totalPrice = 0;
    for (const key in products){
        const obj = products[key];
        let {name, amount, totalSum} = obj;
        if (amount > 0 ){
         printBody.innerHTML += `
         <div class="print__body-item">
                <p class="print__body-item_name">
                    <span class="name">${name}</span>
                    <span class="count">${amount}</span>
                </p>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
         `
        }
    }
    printFooter.innerHTML = totalPrice;
    window.print()
})